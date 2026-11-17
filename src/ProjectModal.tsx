import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { X, ExternalLink } from 'lucide-react'
import { statusLabel, t2, type Lang } from './data'
import type { ProjectRecord } from './lib/projects'

export function Placeholder({ title, label }: { title: string; label: string }) {
  const initials = title.split(/[\s—-]+/).filter(Boolean).slice(0, 2).map((w) => w[0]).join('')
  const tints = ['var(--indigo)', 'var(--coral)', 'var(--sky)', 'var(--accent)']
  const tint = tints[[...title].reduce((n, c) => n + c.charCodeAt(0), 0) % tints.length]
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden" style={{ background: tint, color: '#0a0b0e' }}>
      <span className="display select-none text-[7rem] leading-none opacity-90">{initials}</span>
      <span className="mono absolute bottom-3 left-4 text-[11px] uppercase tracking-widest opacity-80">{label}</span>
    </div>
  )
}

export default function ProjectModal({ project, lang, onClose }: { project: ProjectRecord; lang: Lang; onClose: () => void }) {
  const tx = t2[lang]
  const [active, setActive] = useState(Math.min(project.primary_index, Math.max(project.images.length - 1, 0)))

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = prev }
  }, [onClose])

  const img = project.images[active]

  return (
    <motion.div className="fixed inset-0 z-[70] flex items-end justify-center p-0 sm:items-center sm:p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <motion.div
        role="dialog" aria-modal="true" aria-label={project.title}
        className="hard relative flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border sm:max-h-[88vh]"
        style={{ background: 'var(--bg)', borderColor: 'var(--ink)' }}
        initial={{ y: 60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 40, opacity: 0 }} transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        <div className="flex items-center justify-between border-b-[1.5px] px-5 py-3 rule">
          <span className="mono accent text-xs uppercase tracking-widest">{statusLabel[project.status][lang]}</span>
          <button onClick={onClose} className="btn btn-sm" aria-label={tx.close}><X size={16} /> {tx.close}</button>
        </div>

        <div className="overflow-y-auto">
          <div className="aspect-[16/9] w-full border-b-[1.5px] rule" style={{ background: 'var(--card)' }}>
            {img ? <img src={img.url} alt={project.title} className="h-full w-full object-cover" /> : <Placeholder title={project.title} label={tx.noImg} />}
          </div>

          {project.images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto border-b-[1.5px] p-3 rule">
              {project.images.map((im, i) => (
                <button key={im.url} onClick={() => setActive(i)} aria-label={`${tx.gallery} ${i + 1}`}
                  className="h-16 w-24 shrink-0 overflow-hidden border-[1.5px] transition-opacity"
                  style={{ borderColor: i === active ? 'var(--accent)' : 'var(--ink)', opacity: i === active ? 1 : 0.6 }}>
                  <img src={im.url} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}

          <div className="p-6 sm:p-8">
            <h3 className="display text-5xl leading-none sm:text-6xl">{project.title}</h3>
            <p className="mt-6 max-w-2xl whitespace-pre-line leading-relaxed">{project.desc[lang]}</p>

            <p className="mono muted mt-8 text-xs uppercase tracking-widest">{project.planned ? tx.planned : tx.stackOf}</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {project.tech.map((n) => <li key={n} className="mono border-[1.5px] px-2.5 py-1 text-xs rule">{n}</li>)}
            </ul>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 border-t-[1.5px] px-5 py-4 rule" style={{ background: 'var(--card)' }}>
          {project.repo_url ? (
            <a href={project.repo_url} target="_blank" rel="noreferrer" className="btn btn-solid">
              <i className="devicon-github-original" aria-hidden /> {tx.repo}
            </a>
          ) : (
            <span className="muted text-sm">{tx.noRepo}</span>
          )}
          {project.live_url && (
            <a href={project.live_url} target="_blank" rel="noreferrer" className="btn"><ExternalLink size={16} /> {tx.demo}</a>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}
