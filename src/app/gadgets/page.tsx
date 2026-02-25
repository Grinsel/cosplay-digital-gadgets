'use client'

import { useState, useMemo } from 'react'
import { getAllGadgets, getAllTags } from '@/lib/gadgets'
import GadgetCard from '@/components/GadgetCard'

export default function GadgetsPage() {
  const allGadgets = getAllGadgets()
  const allTags = getAllTags()

  const [search, setSearch] = useState('')
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [statusFilter, setStatusFilter] = useState<'all' | 'stable' | 'wip'>('all')
  const [sortBy, setSortBy] = useState<'title' | 'status'>('title')

  const filteredGadgets = useMemo(() => {
    let result = allGadgets

    // Search filter
    if (search) {
      const q = search.toLowerCase()
      result = result.filter(g =>
        g.title.toLowerCase().includes(q) ||
        g.subtitle.toLowerCase().includes(q) ||
        g.shortDescription.toLowerCase().includes(q) ||
        g.tags.some(t => t.toLowerCase().includes(q))
      )
    }

    // Tag filter
    if (selectedTags.length > 0) {
      result = result.filter(g =>
        selectedTags.some(tag => g.tags.includes(tag))
      )
    }

    // Status filter
    if (statusFilter !== 'all') {
      result = result.filter(g => g.status === statusFilter)
    }

    // Sort
    result = [...result].sort((a, b) => {
      if (sortBy === 'title') {
        return a.title.localeCompare(b.title)
      } else {
        return a.status === 'stable' ? -1 : 1
      }
    })

    return result
  }, [allGadgets, search, selectedTags, statusFilter, sortBy])

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    )
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Alle Gadgets</h1>
          <p className="text-gray-400">
            {filteredGadgets.length} von {allGadgets.length} Gadgets
          </p>
        </div>

        {/* Filters */}
        <div className="bg-cyber-darker border border-cyber-accent/20 rounded-lg p-6 mb-8">
          {/* Search */}
          <div className="mb-6">
            <input
              type="text"
              placeholder="Suche nach Name, Beschreibung oder Tag..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-4 py-3 bg-cyber-dark border border-cyber-accent/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyber-accent transition-colors"
            />
          </div>

          {/* Tags */}
          <div className="mb-6">
            <label className="block text-gray-400 text-sm mb-2">Tags</label>
            <div className="flex flex-wrap gap-2">
              {allTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`px-3 py-1 rounded-full text-sm transition-all ${
                    selectedTags.includes(tag)
                      ? 'bg-cyber-accent text-cyber-dark font-semibold'
                      : 'bg-cyber-dark border border-cyber-accent/30 text-gray-400 hover:border-cyber-accent'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Status & Sort */}
          <div className="flex flex-wrap gap-4">
            <div>
              <label className="block text-gray-400 text-sm mb-2">Status</label>
              <div className="flex gap-2">
                {(['all', 'stable', 'wip'] as const).map(status => (
                  <button
                    key={status}
                    onClick={() => setStatusFilter(status)}
                    className={`px-4 py-2 rounded-lg text-sm transition-all ${
                      statusFilter === status
                        ? 'bg-cyber-accent text-cyber-dark font-semibold'
                        : 'bg-cyber-dark border border-cyber-accent/30 text-gray-400 hover:border-cyber-accent'
                    }`}
                  >
                    {status === 'all' ? 'Alle' : status === 'stable' ? 'Stable' : 'WIP'}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-gray-400 text-sm mb-2">Sortierung</label>
              <div className="flex gap-2">
                <button
                  onClick={() => setSortBy('title')}
                  className={`px-4 py-2 rounded-lg text-sm transition-all ${
                    sortBy === 'title'
                      ? 'bg-cyber-accent text-cyber-dark font-semibold'
                      : 'bg-cyber-dark border border-cyber-accent/30 text-gray-400 hover:border-cyber-accent'
                  }`}
                >
                  A-Z
                </button>
                <button
                  onClick={() => setSortBy('status')}
                  className={`px-4 py-2 rounded-lg text-sm transition-all ${
                    sortBy === 'status'
                      ? 'bg-cyber-accent text-cyber-dark font-semibold'
                      : 'bg-cyber-dark border border-cyber-accent/30 text-gray-400 hover:border-cyber-accent'
                  }`}
                >
                  Status
                </button>
              </div>
            </div>

            {/* Clear Filters */}
            {(search || selectedTags.length > 0 || statusFilter !== 'all') && (
              <div className="flex items-end">
                <button
                  onClick={() => {
                    setSearch('')
                    setSelectedTags([])
                    setStatusFilter('all')
                  }}
                  className="px-4 py-2 text-cyber-red hover:text-red-400 transition-colors text-sm"
                >
                  Filter zurücksetzen
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Results */}
        {filteredGadgets.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGadgets.map(gadget => (
              <GadgetCard key={gadget.id} gadget={gadget} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-400 text-lg">
              Keine Gadgets gefunden.
            </p>
            <button
              onClick={() => {
                setSearch('')
                setSelectedTags([])
                setStatusFilter('all')
              }}
              className="mt-4 text-cyber-accent hover:text-cyber-blue transition-colors"
            >
              Filter zurücksetzen
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
