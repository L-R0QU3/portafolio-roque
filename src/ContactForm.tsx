import { useState, type FormEvent } from 'react'
import { Send } from 'lucide-react'
import { profile, t3, type Lang } from './data'

/** Clave pública de Web3Forms (se obtiene gratis con tu correo y define a dónde llegan los mensajes). */
const KEY = import.meta.env.VITE_WEB3FORMS_KEY as string | undefined

export default function ContactForm({ lang }: { lang: Lang }) {
  const f = t3[lang].form
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'error'>('idle')

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    if (data.get('botcheck')) return // anti-spam
    const name = String(data.get('name'))
    const email = String(data.get('email'))
    const message = String(data.get('message'))
    const subject = `Contacto desde el portafolio — ${name}`

    if (!KEY) {
      // Sin clave configurada: abre el cliente de correo con el mensaje listo.
      window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`${message}\n\n${name} <${email}>`)}`
      return
    }
    setStatus('sending')
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ access_key: KEY, subject, from_name: 'Portafolio RØQUE', name, email, message }),
      })
      const json = await res.json()
      if (json.success) { setStatus('ok'); form.reset() } else setStatus('error')
    } catch { setStatus('error') }
  }

  return (
    <form onSubmit={submit} className="glass space-y-4 rounded-3xl p-6 text-left sm:p-8" style={{ background: 'var(--card)' }}>
      <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" className="hidden" />
      <div className="grid gap-4 sm:grid-cols-2">
        <div><label className="label" htmlFor="cf-name">{f.name}</label><input id="cf-name" name="name" className="input" required maxLength={80} /></div>
        <div><label className="label" htmlFor="cf-email">{f.email}</label><input id="cf-email" name="email" type="email" className="input" required maxLength={120} /></div>
      </div>
      <div><label className="label" htmlFor="cf-msg">{f.message}</label><textarea id="cf-msg" name="message" className="input min-h-36" required maxLength={2000} /></div>
      <button type="submit" className="btn btn-solid w-full sm:w-auto" disabled={status === 'sending'}>
        <Send size={16} /> {status === 'sending' ? f.sending : f.send}
      </button>
      <p aria-live="polite" className="text-sm" style={{ color: status === 'error' ? 'var(--coral)' : 'var(--accent-ink)' }}>
        {status === 'ok' && f.ok}{status === 'error' && f.err}
      </p>
    </form>
  )
}
