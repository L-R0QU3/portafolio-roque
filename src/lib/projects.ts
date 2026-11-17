import { supabase } from './supabase'
import { projects as seed, type Status } from '../data'

export interface ProjectImage { url: string; path?: string }

export interface ProjectRecord {
  id: string
  title: string
  status: Status
  desc: { es: string; en: string }
  tech: string[]
  planned: boolean
  repo_url: string | null
  live_url: string | null
  images: ProjectImage[]
  primary_index: number
  sort_order: number
}

export const seedRecords: ProjectRecord[] = seed.map((p, i) => ({
  id: `seed-${i}`, title: p.title, status: p.status, desc: p.desc, tech: p.tech,
  planned: !!p.planned, repo_url: null, live_url: null, images: [], primary_index: 0, sort_order: i,
}))

export interface Row {
  id: string; title: string; status: string; desc_es: string; desc_en: string; tech: string[]
  tech_planned: boolean; repo_url: string | null; live_url: string | null
  images: ProjectImage[]; primary_index: number; sort_order: number
}

export const fromRow = (r: Row): ProjectRecord => ({
  id: r.id, title: r.title, status: r.status as Status,
  desc: { es: r.desc_es, en: r.desc_en || r.desc_es },
  tech: r.tech ?? [], planned: r.tech_planned, repo_url: r.repo_url, live_url: r.live_url,
  images: r.images ?? [], primary_index: r.primary_index ?? 0, sort_order: r.sort_order ?? 0,
})

export async function loadProjects(): Promise<ProjectRecord[]> {
  if (!supabase) return seedRecords
  const { data, error } = await supabase.from('projects').select('*').order('sort_order').order('created_at')
  if (error || !data || data.length === 0) return seedRecords
  return (data as Row[]).map(fromRow)
}

export const primaryImage = (p: ProjectRecord) => p.images[p.primary_index]?.url ?? p.images[0]?.url
