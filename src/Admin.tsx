import { useCallback, useEffect, useState, type FormEvent } from 'react'
import type { Session } from '@supabase/supabase-js'
import { Trash2, Plus, Upload, LogOut, ArrowLeft } from 'lucide-react'
import { supabase } from './lib/supabase'
import { fromRow, seedRecords, type ProjectImage, type ProjectRecord, type Row } from './lib/projects'
import { statusLabel, type Status } from './data'

const BUCKET = 'project-images'

interface Draft {
  id?: string; title: string; status: Status; desc_es: string; desc_en: string; tech: string
  planned: boolean; repo_url: string; live_url: string; images: ProjectImage[]; primary_index: number; sort_order: number
}
const empty = (order: number): Draft => ({ title: '', status: 'dev', desc_es: '', desc_en: '', tech: '', planned: false, repo_url: '', live_url: '', images: [], primary_index: 0, sort_order: order })

/** Reduce la imagen a 1600px máx. y la convierte a WebP para ahorrar almacenamiento. */
async function compress(file: File): Promise<Blob> {
  const bmp = await createImageBitmap(file)
  const scale = Math.min(1, 1600 / Math.max(bmp.width, bmp.height))
  const canvas = document.createElement('canvas')
  canvas.width = Math.round(bmp.width * scale); canvas.height = Math.round(bmp.height * scale)
  canvas.getContext('2d')!.drawImage(bmp, 0, 0, canvas.width, canvas.height)
  return new Promise((res, rej) => canvas.toBlob((b) => (b ? res(b) : rej(new Error('No se pudo procesar la imagen'))), 'image/webp', 0.85))
}

export default function Admin() {
  if (!supabase) {
    return (
      <Shell>
        <h1 className="display text-5xl">Falta configurar Supabase</h1>
        <p className="mt-4 max-w-xl">Crea un archivo <code className="mono">.env</code> con <code className="mono">VITE_SUPABASE_URL</code> y <code className="mono">VITE_SUPABASE_ANON_KEY</code> (mira <code className="mono">.env.example</code> y el README) y reinicia <code className="mono">pnpm dev</code>.</p>
      </Shell>
    )
  }
  return <AdminApp />
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto min-h-screen max-w-4xl px-6 py-10">
      <a href="/" className="mono mb-8 inline-flex items-center gap-2 text-xs uppercase tracking-widest muted hover:text-[var(--accent)]"><ArrowLeft size={14} /> Volver al sitio</a>
      {children}
    </div>
  )
}

function AdminApp() {
  const sb = supabase!
  const [session, setSession] = useState<Session | null>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    sb.auth.getSession().then(({ data }) => { setSession(data.session); setReady(true) })
    const { data } = sb.auth.onAuthStateChange((_e, s) => setSession(s))
    return () => data.subscription.unsubscribe()
  }, [sb])

  if (!ready) return null
  return <Shell>{session ? <Panel onLogout={() => sb.auth.signOut()} /> : <Login />}</Shell>
}

function Login() {
  const sb = supabase!
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [err, setErr] = useState('')
  const submit = async (e: FormEvent) => {
    e.preventDefault(); setErr('')
    const { error } = await sb.auth.signInWithPassword({ email, password })
    if (error) setErr(error.message)
  }
  return (
    <form onSubmit={submit} className="hard max-w-sm space-y-4 border-[1.5px] p-6 rule" style={{ background: 'var(--card)' }}>
      <h1 className="display text-4xl">Acceso</h1>
      <div><label className="label">Correo</label><input className="input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required /></div>
      <div><label className="label">Contraseña</label><input className="input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required /></div>
      {err && <p className="accent text-sm">{err}</p>}
      <button className="btn btn-solid" type="submit">Entrar</button>
    </form>
  )
}

function Panel({ onLogout }: { onLogout: () => void }) {
  const sb = supabase!
  const [list, setList] = useState<ProjectRecord[]>([])
  const [draft, setDraft] = useState<Draft | null>(null)
  const [busy, setBusy] = useState(false)
  const [msg, setMsg] = useState('')

  const load = useCallback(async () => {
    const { data, error } = await sb.from('projects').select('*').order('sort_order').order('created_at')
    if (error) setMsg(error.message)
    else setList((data as Row[]).map(fromRow))
  }, [sb])
  useEffect(() => { load() }, [load])

  const edit = (p: ProjectRecord) => setDraft({
    id: p.id, title: p.title, status: p.status, desc_es: p.desc.es, desc_en: p.desc.en, tech: p.tech.join(', '),
    planned: p.planned, repo_url: p.repo_url ?? '', live_url: p.live_url ?? '', images: p.images, primary_index: p.primary_index, sort_order: p.sort_order,
  })

  const upload = async (files: FileList | null) => {
    if (!files || !draft) return
    setBusy(true); setMsg('')
    try {
      const added: ProjectImage[] = []
      for (const f of Array.from(files)) {
        const blob = await compress(f)
        const path = `${crypto.randomUUID()}.webp`
        const { error } = await sb.storage.from(BUCKET).upload(path, blob, { contentType: 'image/webp' })
        if (error) throw error
        added.push({ url: sb.storage.from(BUCKET).getPublicUrl(path).data.publicUrl, path })
      }
      setDraft({ ...draft, images: [...draft.images, ...added] })
    } catch (e) { setMsg((e as Error).message) }
    setBusy(false)
  }

  const removeImage = async (i: number) => {
    if (!draft) return
    const im = draft.images[i]
    if (im.path) await sb.storage.from(BUCKET).remove([im.path])
    const images = draft.images.filter((_, k) => k !== i)
    const primary = draft.primary_index === i ? 0 : draft.primary_index > i ? draft.primary_index - 1 : draft.primary_index
    setDraft({ ...draft, images, primary_index: primary })
  }

  const save = async (e: FormEvent) => {
    e.preventDefault()
    if (!draft) return
    setBusy(true); setMsg('')
    const payload = {
      title: draft.title.trim(), status: draft.status, desc_es: draft.desc_es.trim(), desc_en: draft.desc_en.trim(),
      tech: draft.tech.split(',').map((s) => s.trim()).filter(Boolean), tech_planned: draft.planned,
      repo_url: draft.repo_url.trim() || null, live_url: draft.live_url.trim() || null,
      images: draft.images, primary_index: draft.primary_index, sort_order: draft.sort_order,
    }
    const { error } = draft.id ? await sb.from('projects').update(payload).eq('id', draft.id) : await sb.from('projects').insert(payload)
    setBusy(false)
    if (error) return setMsg(error.message)
    setDraft(null); setMsg('Guardado.'); load()
  }

  const remove = async (p: ProjectRecord) => {
    if (!confirm(`¿Eliminar "${p.title}"? Esto también borra sus imágenes.`)) return
    const paths = p.images.map((i) => i.path).filter(Boolean) as string[]
    if (paths.length) await sb.storage.from(BUCKET).remove(paths)
    const { error } = await sb.from('projects').delete().eq('id', p.id)
    if (error) setMsg(error.message); else load()
  }

  const importSeed = async () => {
    const rows = seedRecords.map((p) => ({
      title: p.title, status: p.status, desc_es: p.desc.es, desc_en: p.desc.en, tech: p.tech, tech_planned: p.planned, sort_order: p.sort_order,
    }))
    const { error } = await sb.from('projects').insert(rows)
    if (error) setMsg(error.message); else load()
  }

  const set = <K extends keyof Draft>(k: K, v: Draft[K]) => setDraft((d) => (d ? { ...d, [k]: v } : d))

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <h1 className="display text-5xl">Proyectos</h1>
        <div className="flex gap-2">
          <button className="btn btn-solid btn-sm" onClick={() => setDraft(empty(list.length))}><Plus size={15} /> Nuevo</button>
          <button className="btn btn-sm" onClick={onLogout}><LogOut size={15} /> Salir</button>
        </div>
      </div>
      {msg && <p className="accent mt-3 text-sm">{msg}</p>}

      {!draft && (
        <div className="mt-8 border-t-[1.5px] rule">
          {list.length === 0 && (
            <div className="py-8">
              <p className="muted">Aún no hay proyectos en la base de datos (el sitio muestra los iniciales de <code className="mono">data.ts</code>).</p>
              <button className="btn mt-4" onClick={importSeed}>Importar los 5 proyectos iniciales</button>
            </div>
          )}
          {list.map((p) => (
            <div key={p.id} className="flex flex-wrap items-center justify-between gap-3 border-b-[1.5px] py-4 rule">
              <div>
                <p className="display text-2xl">{p.title}</p>
                <p className="mono muted text-xs">{statusLabel[p.status].es} · {p.images.length} imagen(es){p.repo_url ? ' · con repo' : ''}</p>
              </div>
              <div className="flex gap-2">
                <button className="btn btn-sm" onClick={() => edit(p)}>Editar</button>
                <button className="btn btn-sm" onClick={() => remove(p)} aria-label="Eliminar"><Trash2 size={15} /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      {draft && (
        <form onSubmit={save} className="mt-8 space-y-5">
          <div className="grid gap-5 sm:grid-cols-[1fr_auto]">
            <div><label className="label">Nombre</label><input className="input" value={draft.title} onChange={(e) => set('title', e.target.value)} required /></div>
            <div><label className="label">Estado</label>
              <select className="input" value={draft.status} onChange={(e) => set('status', e.target.value as Status)}>
                {(Object.keys(statusLabel) as Status[]).map((s) => <option key={s} value={s}>{statusLabel[s].es}</option>)}
              </select>
            </div>
          </div>
          <div><label className="label">Descripción (español)</label><textarea className="input min-h-32" value={draft.desc_es} onChange={(e) => set('desc_es', e.target.value)} required /></div>
          <div><label className="label">Descripción (inglés, opcional)</label><textarea className="input min-h-32" value={draft.desc_en} onChange={(e) => set('desc_en', e.target.value)} /></div>
          <div><label className="label">Tecnologías (separadas por coma)</label><input className="input" value={draft.tech} onChange={(e) => set('tech', e.target.value)} placeholder="React, Vite, Supabase" />
            <label className="mt-2 flex items-center gap-2 text-sm"><input type="checkbox" checked={draft.planned} onChange={(e) => set('planned', e.target.checked)} /> Son tecnologías previstas (el proyecto no está terminado)</label>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <div><label className="label">Repositorio de GitHub</label><input className="input" type="url" value={draft.repo_url} onChange={(e) => set('repo_url', e.target.value)} placeholder="https://github.com/L-R0QU3/..." /></div>
            <div><label className="label">Demo en vivo (opcional)</label><input className="input" type="url" value={draft.live_url} onChange={(e) => set('live_url', e.target.value)} /></div>
          </div>

          <div>
            <label className="label">Imágenes — marca la principal</label>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {draft.images.map((im, i) => (
                <div key={im.url} className="border-[1.5px] rule" style={{ outline: i === draft.primary_index ? '3px solid var(--accent)' : 'none' }}>
                  <img src={im.url} alt="" className="aspect-video w-full object-cover" />
                  <div className="flex items-center justify-between p-2 text-xs">
                    <label className="flex cursor-pointer items-center gap-1"><input type="radio" name="primary" checked={i === draft.primary_index} onChange={() => set('primary_index', i)} /> Principal</label>
                    <button type="button" onClick={() => removeImage(i)} aria-label="Quitar imagen"><Trash2 size={14} /></button>
                  </div>
                </div>
              ))}
              <label className="flex aspect-video cursor-pointer flex-col items-center justify-center gap-1 border-[1.5px] border-dashed text-xs rule">
                <Upload size={18} /> {busy ? 'Subiendo…' : 'Subir imágenes'}
                <input type="file" accept="image/*" multiple hidden disabled={busy} onChange={(e) => { upload(e.target.files); e.target.value = '' }} />
              </label>
            </div>
          </div>

          <div><label className="label">Orden (menor = primero)</label><input className="input w-28" type="number" value={draft.sort_order} onChange={(e) => set('sort_order', Number(e.target.value))} /></div>
          <div className="flex gap-3">
            <button className="btn btn-solid" disabled={busy} type="submit">Guardar</button>
            <button className="btn" type="button" onClick={() => setDraft(null)}>Cancelar</button>
          </div>
        </form>
      )}
    </>
  )
}
