import { useEffect, useState, type ReactNode } from 'react'
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import { Moon, Sun, ArrowUpRight, ArrowRight, ArrowDown, MessageCircle, Hourglass, Server, Network, Database, Workflow, Code2, Award, LayoutTemplate, Wrench, GraduationCap } from 'lucide-react'
import { profile, stack, extra, experience, certs, education, statusLabel, t, t3, type Lang, type Tech } from './data'
import { loadProjects, primaryImage, seedRecords, type ProjectRecord } from './lib/projects'
import ProjectModal, { Placeholder } from './ProjectModal'
import ContactForm from './ContactForm'

const fallbackIcons: Record<string, typeof Server> = { Render: Server, 'REST APIs': Network, SQL: Database, 'CI/CD': Workflow }
const serviceIcons = [Code2, LayoutTemplate, Wrench, GraduationCap]
const serviceColors = ['var(--accent)', 'var(--indigo)', 'var(--coral)', 'var(--sky)']
const AVATAR_SOURCES = ['/avatar.jpg', '/avatar.jpeg', '/avatar.png', '/avatar.webp', 'https://i.ibb.co/PvYwLn7j/image.png']

function TechIcon({ tech, size = 22 }: { tech: Tech; size?: number }) {
  const Fallback = fallbackIcons[tech.name] ?? Code2
  return tech.icon
    ? <i className={`${tech.icon} ${tech.mono ? '' : 'colored'} leading-none`} style={{ fontSize: size }} aria-hidden />
    : <Fallback size={size - 2} className="accent" aria-hidden />
}

function Reveal({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div className={className} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  )
}

function Head({ chip, children, right }: { chip: string; children: ReactNode; right?: ReactNode }) {
  return (
    <Reveal className="flex flex-wrap items-end justify-between gap-4">
      <div>
        <span className="chip">{chip}</span>
        <h2 className="display mt-4 text-4xl leading-tight sm:text-5xl">{children}</h2>
      </div>
      {right}
    </Reveal>
  )
}

function Hl({ children }: { children: ReactNode }) { return <span className="accent">{children}</span> }

function Portrait() {
  const [i, setI] = useState(0)
  return (
    <div className="relative mx-auto w-full max-w-sm">
      <svg viewBox="0 0 200 200" className="absolute -bottom-10 -left-10 h-44 w-44" fill="none" stroke="var(--accent)" aria-hidden>
        <circle cx="100" cy="100" r="92" strokeWidth="12" strokeDasharray="1.5 4.5" opacity=".6" />
        <circle cx="100" cy="100" r="70" strokeWidth="1" opacity=".5" />
      </svg>
      <div className="glass relative aspect-[3/4] overflow-hidden rounded-[2rem] p-3">
        <div className="h-full w-full overflow-hidden rounded-[1.5rem]" style={{ background: 'var(--card)' }}>
          {i < AVATAR_SOURCES.length
            ? <img src={AVATAR_SOURCES[i]} alt={profile.name} onError={() => setI(i + 1)} className="h-full w-full object-cover" />
            : <div className="display flex h-full items-center justify-center text-7xl accent">RØ</div>}
        </div>
      </div>
    </div>
  )
}

export default function App() {
  const [lang, setLang] = useState<Lang>(() => (localStorage.getItem('lang') as Lang) || (navigator.language.startsWith('en') ? 'en' : 'es'))
  const [dark, setDark] = useState(() => localStorage.getItem('theme-v3') !== 'light')
  const [projects, setProjects] = useState<ProjectRecord[]>(seedRecords)
  const [selected, setSelected] = useState<ProjectRecord | null>(null)
  const tx = t[lang]; const ux = t3[lang]
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })

  useEffect(() => { loadProjects().then(setProjects) }, [])
  useEffect(() => { document.documentElement.classList.toggle('dark', dark); localStorage.setItem('theme-v3', dark ? 'dark' : 'light') }, [dark])
  useEffect(() => { document.documentElement.lang = lang; localStorage.setItem('lang', lang) }, [lang])

  const nav = Object.entries(ux.nav)
  const more = lang === 'es' ? 'Ver más' : 'View more'

  const stackGroups = [
    ...stack.map((g) => ({ name: g.group[lang], items: g.items })),
    { name: tx.extraTitle, items: extra }
  ]

  return (
    <>
      <motion.div style={{ scaleX: progress, background: 'var(--accent)' }} className="fixed inset-x-0 top-0 z-[65] h-0.5 origin-left" />

      <header className="sticky top-0 z-40 border-b backdrop-blur-xl rule" style={{ background: 'color-mix(in srgb, var(--bg) 82%, transparent)' }}>
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-6">
          <a href="#top" className="display text-2xl leading-none tracking-tight" aria-label="RØQUE">R<span className="accent">Ø</span>QUE</a>
          <nav className="hidden gap-7 lg:flex">
            {nav.map(([id, label]) => (
              <a key={id} href={`#${id}`} className="group relative text-[13px] font-semibold uppercase tracking-wide muted transition-colors hover:text-[var(--ink)]">
                {label}
                <span className="absolute -bottom-1.5 left-0 h-0.5 w-0 rounded transition-all duration-300 group-hover:w-full" style={{ background: 'var(--accent)' }} />
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <button className="btn btn-sm" onClick={() => setLang(lang === 'es' ? 'en' : 'es')} aria-label={tx.lang}>{lang === 'es' ? 'EN' : 'ES'}</button>
            <button className="btn btn-sm !px-0 w-9" onClick={() => setDark(!dark)} aria-label={tx.theme}>{dark ? <Sun size={15} /> : <Moon size={15} />}</button>
            <a href="#contact" className="btn btn-solid btn-sm hidden sm:inline-flex">{ux.cta}</a>
          </div>
        </div>
      </header>

      <main id="top">
        {/* HERO */}
        <div className="tech-bg relative flex min-h-[calc(100vh-4rem)] items-center overflow-hidden">
          <div className="relative z-10 mx-auto w-full max-w-4xl px-6 pb-20 pt-16 text-center">
            <motion.div 
              initial={{ opacity: 0, y: 24 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.7 }}
              className="flex flex-col items-center"
            >
              <span className="chip">{ux.chip}</span>
              <h1 className="display mt-6 text-5xl leading-[1.02] sm:text-7xl">
                {ux.h1a}<br /><Hl>{ux.h1b}</Hl>
              </h1>
              <p className="muted mt-6 max-w-2xl text-base leading-relaxed sm:text-lg">
                {ux.sub}
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <a href="#about" className="btn btn-solid">
                  {lang === 'es' ? 'Comenzar' : 'Get Started'} <ArrowDown size={16} />
                </a>
              </div>
              <p className="muted mt-6 flex items-center justify-center gap-2 text-sm">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-70" style={{ background: 'var(--accent)' }} />
                  <span className="relative inline-flex h-2 w-2 rounded-full" style={{ background: 'var(--accent)' }} />
                </span>
                {ux.avail}
              </p>
            </motion.div>
          </div>
        </div>

        {/* ABOUT */}
        <section id="about" className="mx-auto max-w-6xl scroll-mt-16 px-6 py-24">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <Reveal><Portrait /></Reveal>
            <Reveal delay={0.1}>
              <span className="chip">{ux.aboutChip}</span>
              <h2 className="display mt-4 text-4xl leading-tight sm:text-5xl">
                {lang === 'es' ? 'Disponible para desarrollar' : 'Available to build'} <Hl>{lang === 'es' ? 'soluciones' : 'solutions'}</Hl>
              </h2>
              <div className="muted mt-6 space-y-4 leading-relaxed">{tx.about.map((p) => <p key={p}>{p}</p>)}</div>
              <div className="mt-8 grid grid-cols-3 gap-3">
                {['40+', String(projects.length), '3'].map((n, i) => (
                  <div key={i} className="glass rounded-2xl p-4">
                    <p className="display accent text-3xl">{n}</p>
                    <p className="muted mt-1 text-xs leading-snug">{ux.stats[i]}</p>
                  </div>
                ))}
              </div>
              <a href="#contact" className="btn btn-solid mt-8">{ux.aboutBtn} <ArrowRight size={16} /></a>
            </Reveal>
          </div>

          <Reveal className="mt-16">
            <aside className="glass rounded-3xl p-7 sm:p-9">
              <h3 className="display text-2xl">{tx.honestTitle}</h3>
              <ul className="mt-5 grid gap-5 md:grid-cols-3">
                {tx.honest.map((p, i) => (
                  <li key={p} className="flex gap-4 text-[15px] leading-relaxed">
                    <span className="display accent text-2xl leading-none">{i + 1}</span><span className="muted">{p}</span>
                  </li>
                ))}
              </ul>
            </aside>
          </Reveal>
        </section>

        {/* STACK */}
        <section id="stack" className="scroll-mt-16 border-y py-24 rule" style={{ background: 'var(--band)' }}>
          <div className="mx-auto max-w-6xl px-6">
            <Head chip={ux.stackChip}>{tx.stackTitle}</Head>
            <p className="muted mt-3 max-w-2xl text-sm">{tx.stackSub}</p>
            <div className="mt-10 grid gap-5 md:grid-cols-2">
              {stackGroups.map((g, gi) => {
                const isLastOdd = stackGroups.length % 2 !== 0 && gi === stackGroups.length - 1;
                return (
                  <Reveal key={g.name} delay={(gi % 2) * 0.06} className={isLastOdd ? "md:col-span-2" : ""}>
                    <div className="glass h-full rounded-3xl p-6" style={{ background: 'var(--card)' }}>
                      <h3 className="display text-lg">{g.name}</h3>
                      <ul className="mt-4 flex flex-wrap gap-2.5">
                        {g.items.map((it) => (
                          <motion.li key={it.name} whileHover={{ y: -3 }} className="glass flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-sm font-semibold"><TechIcon tech={it} />{it.name}</motion.li>
                        ))}
                      </ul>
                    </div>
                  </Reveal>
                )
              })}
            </div>
          </div>
        </section>

        {/* PROJECTS */}
        <section id="projects" className="mx-auto max-w-6xl scroll-mt-16 px-6 py-24">
          <Head chip={ux.workChip}>{ux.workTitle}</Head>
          <p className="muted mt-3 max-w-2xl text-sm">{tx.projectsSub}</p>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((p, i) => {
              const thumb = primaryImage(p)
              return (
                <Reveal key={p.id} delay={(i % 3) * 0.06} className="h-full">
                  <motion.button onClick={() => setSelected(p)} whileHover={{ y: -6 }} transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                    className="group flex h-full w-full cursor-pointer flex-col rounded-3xl p-3 text-left"
                    style={{ background: 'var(--paper)', color: 'var(--paper-ink)' }} aria-label={`${more}: ${p.title}`}>
                    <div className="aspect-[4/3] overflow-hidden rounded-2xl">
                      {thumb
                        ? <img src={thumb} alt="" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                        : <Placeholder title={p.title} label={lang === 'es' ? 'Capturas pendientes' : 'Screenshots pending'} />}
                    </div>
                    <div className="mt-auto flex items-end justify-between gap-3 px-2 pb-2 pt-4">
                      <div className="min-w-0">
                        <p className="display truncate text-xl">{p.title}</p>
                        <p className="mt-0.5 truncate text-xs opacity-60">{statusLabel[p.status][lang]}</p>
                      </div>
                      <span className="flex shrink-0 items-center gap-1.5 rounded-full py-2 pl-4 pr-2 text-xs font-bold" style={{ background: '#0d0e12', color: '#fff' }}>
                        {more}
                        <span className="flex h-6 w-6 items-center justify-center rounded-full" style={{ background: 'var(--accent)', color: 'var(--on-accent)' }}><ArrowUpRight size={14} /></span>
                      </span>
                    </div>
                  </motion.button>
                </Reveal>
              )
            })}
          </div>
        </section>

        {/* SERVICES */}
        <section id="services" className="scroll-mt-16 border-y py-24 rule" style={{ background: 'var(--band)' }}>
          <div className="mx-auto max-w-6xl px-6">
            <Head chip={ux.servicesChip}>{ux.servicesPre} <Hl>{ux.servicesAcc}</Hl></Head>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {ux.services.map((s, i) => {
                const Icon = serviceIcons[i]
                return (
                  <Reveal key={s.title} delay={i * 0.06}>
                    <motion.div whileHover={{ y: -6 }} className="glass h-full rounded-3xl p-6" style={{ background: 'var(--card)' }}>
                      <span className="flex h-12 w-12 items-center justify-center rounded-2xl" style={{ background: serviceColors[i], color: '#0a0b0e' }}><Icon size={22} /></span>
                      <h3 className="display mt-5 text-lg leading-snug">{s.title}</h3>
                      <p className="muted mt-2 text-sm leading-relaxed">{s.desc}</p>
                    </motion.div>
                  </Reveal>
                )
              })}
            </div>
          </div>
        </section>

        {/* EDUCATION */}
        <section id="education" className="scroll-mt-16 border-y py-24 rule" style={{ background: 'var(--band)' }}>
          <div className="mx-auto max-w-6xl px-6">
            <Head chip={ux.eduChip}>{ux.eduTitle}</Head>

            <Reveal className="mt-10">
              <div className="glass rounded-3xl p-7 sm:p-10" style={{ background: 'var(--card)' }}>
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <span className="chip">{education.inst} · {education.period}</span>
                    <h3 className="display mt-4 max-w-2xl text-2xl leading-tight sm:text-3xl">{education.degree[lang]}</h3>
                  </div>
                  <GraduationCap className="accent" size={36} />
                </div>
                <p className="muted mt-5 max-w-3xl leading-relaxed">{education.profile[lang]}</p>
                <div className="mt-8 grid gap-8 md:grid-cols-2">
                  <div>
                    <h4 className="mono muted text-xs uppercase tracking-widest">{ux.fieldTitle}</h4>
                    <p className="mt-2 text-[15px] leading-relaxed">{education.field[lang]}</p>
                  </div>
                  <div>
                    <h4 className="mono muted text-xs uppercase tracking-widest">{ux.asTitle}</h4>
                    <p className="mt-2 text-[15px] leading-relaxed">{education.as[lang]}</p>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal className="mt-14"><h3 className="display text-2xl">{ux.aiepCerts}</h3></Reveal>
            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {education.certs.map((c, i) => (
                <Reveal key={c.name.es} delay={i * 0.06} className="h-full">
                  <div className="glass h-full rounded-2xl p-5" style={{ background: 'var(--card)' }}>
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: serviceColors[i], color: '#0a0b0e' }}><Award size={20} /></span>
                    <p className="display mt-4 text-base leading-snug">{c.name[lang]}</p>
                    <p className="muted mt-2 text-sm leading-relaxed">{c.desc[lang]}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal className="mt-14"><h3 className="display text-2xl">{ux.onlineCerts}</h3></Reveal>
            <div className="mt-5 grid gap-4 md:grid-cols-3">
              {certs.map((c) => (
                <Reveal key={c.name} className="h-full">
                  <div className="glass flex h-full gap-3 rounded-2xl p-5" style={{ background: 'var(--card)' }}>
                    <Award className="accent mt-0.5 shrink-0" size={20} />
                    <div><p className="text-sm font-bold leading-snug">{c.name}</p><p className="muted mt-1 text-xs">{c.org} · {c.year}</p></div>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal className="mt-14">
              <div className="flex gap-4 rounded-3xl border border-dashed p-6 rule">
                <Hourglass className="mt-1 shrink-0" size={22} style={{ color: 'var(--indigo)' }} />
                <div>
                  <p className="display text-lg">{education.next.title[lang]}</p>
                  <p className="mono mt-1 text-xs uppercase tracking-wider" style={{ color: 'var(--indigo)' }}>{education.next.tag[lang]}</p>
                  <p className="muted mt-2 text-sm leading-relaxed">{education.next.text[lang]}</p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* EXPERIENCE */}
        <section id="experience" className="mx-auto max-w-6xl scroll-mt-16 px-6 py-24">
          <Head chip={ux.expChip}>{tx.expTitle}</Head>
          <div className="mt-10 space-y-5">
            {experience.map((e) => (
              <Reveal key={e.org + e.period}>
                <div className="glass grid gap-4 rounded-3xl p-6 sm:p-8 md:grid-cols-[200px_1fr]">
                  <div>
                    <p className="display accent text-2xl">{e.period}</p>
                    <p className="muted mt-1 text-xs font-semibold">{e.org}</p>
                  </div>
                  <div>
                    <h3 className="display text-lg leading-snug">{e.role[lang]}</h3>
                    <ul className="muted mt-3 space-y-2 text-[15px] leading-relaxed">
                      {e.points[lang].map((pt) => <li key={pt} className="flex gap-3"><span className="accent">•</span><span>{pt}</span></li>)}
                    </ul>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="mx-auto max-w-6xl scroll-mt-16 px-6 pb-24">
          <Reveal>
            <div className="relative overflow-hidden rounded-[2rem] border p-8 sm:p-14 rule" style={{ background: 'linear-gradient(135deg, color-mix(in srgb, var(--indigo) 22%, var(--card)), var(--card) 60%)' }}>
              <div className="relative grid items-center gap-12 lg:grid-cols-2">
                <div>
                  <span className="chip">{ux.contactChip}</span>
                  <h2 className="display mt-5 text-5xl leading-tight sm:text-6xl">{ux.ctaA} <Hl>{ux.ctaB}</Hl></h2>
                  <p className="muted mt-5 max-w-md">{tx.contactSub}</p>
                  
                  {/* BOTÓN DE WHATSAPP ÚNICAMENTE */}
                  <div className="mt-8 flex flex-col items-start gap-3">
                    <a href={`https://wa.me/${profile.whatsapp}?text=${encodeURIComponent(ux.waMsg)}`} target="_blank" rel="noreferrer" className="btn" style={{ background: '#25D366', color: '#06210f', borderColor: 'transparent' }}>
                      <MessageCircle size={18} /> {ux.wa}
                    </a>
                  </div>
                </div>
                <ContactForm lang={lang} />
              </div>
            </div>
          </Reveal>
        </section>
      </main>

      <footer className="muted border-t py-6 text-center text-xs rule">© {new Date().getFullYear()} {profile.name} · {tx.footer}</footer>

      <AnimatePresence>{selected && <ProjectModal project={selected} lang={lang} onClose={() => setSelected(null)} />}</AnimatePresence>
    </>
  )
}