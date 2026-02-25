import { Gadget } from './types'
import gadgetsData from '../../content/gadgets.json'

export function getAllGadgets(): Gadget[] {
  return gadgetsData as Gadget[]
}

export function getGadgetById(id: string): Gadget | undefined {
  return getAllGadgets().find(g => g.id === id)
}

export function getGadgetsByTag(tag: string): Gadget[] {
  return getAllGadgets().filter(g => g.tags.includes(tag))
}

export function getGadgetsByStatus(status: 'stable' | 'wip'): Gadget[] {
  return getAllGadgets().filter(g => g.status === status)
}

export function getAllTags(): string[] {
  const tags = new Set<string>()
  getAllGadgets().forEach(g => g.tags.forEach(t => tags.add(t)))
  return Array.from(tags).sort()
}

export function getFeaturedGadgets(count: number = 3): Gadget[] {
  return getAllGadgets()
    .filter(g => g.status === 'stable')
    .slice(0, count)
}

export function searchGadgets(query: string): Gadget[] {
  const q = query.toLowerCase()
  return getAllGadgets().filter(g =>
    g.title.toLowerCase().includes(q) ||
    g.subtitle.toLowerCase().includes(q) ||
    g.shortDescription.toLowerCase().includes(q) ||
    g.tags.some(t => t.toLowerCase().includes(q))
  )
}
