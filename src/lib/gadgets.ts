import { Gadget, GadgetData, LocalizedText } from './types'
import gadgetsData from '../../content/gadgets.json'
import { Language } from './i18n'

function resolveText(text: LocalizedText | undefined, lang: Language): string | undefined {
  if (!text) return undefined
  return text[lang]
}

function resolveGadget(data: GadgetData, lang: Language): Gadget {
  return {
    id: data.id,
    title: data.title,
    subtitle: resolveText(data.subtitle, lang) || '',
    status: data.status,
    tags: data.tags,
    shortDescription: resolveText(data.shortDescription, lang) || '',
    longDescription: resolveText(data.longDescription, lang) || '',
    features: data.features.map(f => resolveText(f, lang) || ''),
    howToUse: data.howToUse.map(h => resolveText(h, lang) || ''),
    youtube: data.youtube,
    download: data.download,
    credits: resolveText(data.credits, lang),
    disclaimerNotes: resolveText(data.disclaimerNotes, lang),
    permissions: data.permissions,
  }
}

export function getAllGadgets(lang: Language = 'en'): Gadget[] {
  return (gadgetsData as GadgetData[]).map(g => resolveGadget(g, lang))
}

export function getGadgetById(id: string, lang: Language = 'en'): Gadget | undefined {
  const data = (gadgetsData as GadgetData[]).find(g => g.id === id)
  if (!data) return undefined
  return resolveGadget(data, lang)
}

export function getGadgetsByTag(tag: string, lang: Language = 'en'): Gadget[] {
  return getAllGadgets(lang).filter(g => g.tags.includes(tag))
}

export function getGadgetsByStatus(status: 'stable' | 'wip', lang: Language = 'en'): Gadget[] {
  return getAllGadgets(lang).filter(g => g.status === status)
}

export function getAllTags(): string[] {
  const tags = new Set<string>()
  ;(gadgetsData as GadgetData[]).forEach(g => g.tags.forEach(t => tags.add(t)))
  return Array.from(tags).sort()
}

export function getFeaturedGadgets(count: number = 3, lang: Language = 'en'): Gadget[] {
  return getAllGadgets(lang)
    .filter(g => g.status === 'stable')
    .slice(0, count)
}

export function searchGadgets(query: string, lang: Language = 'en'): Gadget[] {
  const q = query.toLowerCase()
  return getAllGadgets(lang).filter(g =>
    g.title.toLowerCase().includes(q) ||
    g.subtitle.toLowerCase().includes(q) ||
    g.shortDescription.toLowerCase().includes(q) ||
    g.tags.some(t => t.toLowerCase().includes(q))
  )
}

// For static generation, get all gadget IDs
export function getAllGadgetIds(): string[] {
  return (gadgetsData as GadgetData[]).map(g => g.id)
}
