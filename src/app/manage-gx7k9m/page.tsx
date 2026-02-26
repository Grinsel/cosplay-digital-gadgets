'use client'

import { useState, useEffect } from 'react'
import { signInWithEmailAndPassword, signOut, onAuthStateChanged, User } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import {
  Comment,
  getAllComments,
  updateCommentStatus,
  updateCommentContent,
  deleteComment,
} from '@/lib/comments'

export default function AdminPage() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [comments, setComments] = useState<Comment[]>([])
  const [filter, setFilter] = useState<'all' | 'idea' | 'bug' | 'hidden'>('all')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editContent, setEditContent] = useState('')

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
      setLoading(false)
    })
    return () => unsubscribe()
  }, [])

  useEffect(() => {
    if (user) {
      loadComments()
    }
  }, [user])

  const loadComments = async () => {
    try {
      const all = await getAllComments()
      setComments(all)
    } catch (err) {
      console.error('Error loading comments:', err)
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoginError('')
    try {
      await signInWithEmailAndPassword(auth, email, password)
    } catch (err: any) {
      setLoginError('Invalid credentials')
    }
  }

  const handleLogout = async () => {
    await signOut(auth)
  }

  const handleToggleStatus = async (comment: Comment) => {
    const newStatus = comment.status === 'visible' ? 'hidden' : 'visible'
    await updateCommentStatus(comment.id, newStatus)
    loadComments()
  }

  const handleDelete = async (commentId: string) => {
    if (confirm('Delete this comment permanently?')) {
      await deleteComment(commentId)
      loadComments()
    }
  }

  const handleEdit = (comment: Comment) => {
    setEditingId(comment.id)
    setEditContent(comment.content)
  }

  const handleSaveEdit = async () => {
    if (editingId) {
      await updateCommentContent(editingId, editContent)
      setEditingId(null)
      setEditContent('')
      loadComments()
    }
  }

  const filteredComments = comments.filter((c) => {
    if (filter === 'all') return true
    if (filter === 'hidden') return c.status === 'hidden'
    return c.type === filter
  })

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-cyber-accent">Loading...</div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-sm">
          <h1 className="text-2xl font-bold text-white mb-8 text-center">Admin Login</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full px-4 py-3 bg-cyber-dark border border-cyber-accent/20 rounded-lg text-white"
              required
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-4 py-3 bg-cyber-dark border border-cyber-accent/20 rounded-lg text-white"
              required
            />
            {loginError && <p className="text-cyber-red text-sm">{loginError}</p>}
            <button
              type="submit"
              className="w-full py-3 bg-cyber-accent text-cyber-dark font-bold rounded-lg hover:bg-cyber-accent/90 transition-colors"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-white">Comment Admin</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 border border-gray-600 text-gray-400 rounded-lg hover:border-gray-500"
          >
            Logout
          </button>
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-6">
          {(['all', 'idea', 'bug', 'hidden'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filter === f
                  ? 'bg-cyber-accent text-cyber-dark'
                  : 'bg-cyber-dark border border-cyber-accent/20 text-gray-400 hover:border-cyber-accent/40'
              }`}
            >
              {f === 'all' ? 'All' : f === 'idea' ? 'Ideas' : f === 'bug' ? 'Bugs' : 'Hidden'}
              <span className="ml-2 text-sm opacity-70">
                ({comments.filter((c) => {
                  if (f === 'all') return true
                  if (f === 'hidden') return c.status === 'hidden'
                  return c.type === f
                }).length})
              </span>
            </button>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-cyber-darker border border-cyber-accent/20 rounded-lg p-4">
            <div className="text-2xl font-bold text-white">{comments.length}</div>
            <div className="text-gray-500 text-sm">Total</div>
          </div>
          <div className="bg-cyber-darker border border-cyber-accent/20 rounded-lg p-4">
            <div className="text-2xl font-bold text-cyber-blue">{comments.filter(c => c.type === 'idea').length}</div>
            <div className="text-gray-500 text-sm">Ideas</div>
          </div>
          <div className="bg-cyber-darker border border-cyber-accent/20 rounded-lg p-4">
            <div className="text-2xl font-bold text-cyber-purple">{comments.filter(c => c.type === 'bug').length}</div>
            <div className="text-gray-500 text-sm">Bugs</div>
          </div>
          <div className="bg-cyber-darker border border-cyber-accent/20 rounded-lg p-4">
            <div className="text-2xl font-bold text-cyber-red">{comments.filter(c => c.status === 'hidden').length}</div>
            <div className="text-gray-500 text-sm">Hidden</div>
          </div>
        </div>

        {/* Comments List */}
        <div className="space-y-4">
          {filteredComments.map((comment) => (
            <div
              key={comment.id}
              className={`bg-cyber-darker border rounded-lg p-4 ${
                comment.status === 'hidden' ? 'border-cyber-red/30 opacity-60' : 'border-cyber-accent/20'
              }`}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                    comment.type === 'idea' ? 'bg-cyber-blue/20 text-cyber-blue' : 'bg-cyber-purple/20 text-cyber-purple'
                  }`}>
                    {comment.type.toUpperCase()}
                  </span>
                  <span className="text-cyber-accent font-semibold">{comment.nickname}</span>
                  {comment.gadgetId && (
                    <span className="text-gray-500 text-sm">on {comment.gadgetId}</span>
                  )}
                  {comment.parentId && (
                    <span className="text-gray-500 text-sm">(reply)</span>
                  )}
                </div>
                <span className="text-gray-500 text-xs">{formatDate(comment.createdAt)}</span>
              </div>

              {/* Content */}
              {editingId === comment.id ? (
                <div className="mb-3">
                  <textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    className="w-full px-3 py-2 bg-cyber-dark border border-cyber-accent/30 rounded text-white"
                    rows={3}
                  />
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={handleSaveEdit}
                      className="px-3 py-1 bg-cyber-accent text-cyber-dark rounded text-sm font-bold"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="px-3 py-1 border border-gray-600 text-gray-400 rounded text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <p className="text-gray-300 whitespace-pre-wrap mb-3">{comment.content}</p>
              )}

              {/* Actions */}
              <div className="flex gap-2">
                <button
                  onClick={() => handleToggleStatus(comment)}
                  className={`px-3 py-1 rounded text-sm ${
                    comment.status === 'visible'
                      ? 'bg-yellow-600/20 text-yellow-500 hover:bg-yellow-600/30'
                      : 'bg-green-600/20 text-green-500 hover:bg-green-600/30'
                  }`}
                >
                  {comment.status === 'visible' ? 'Hide' : 'Show'}
                </button>
                <button
                  onClick={() => handleEdit(comment)}
                  className="px-3 py-1 bg-cyber-blue/20 text-cyber-blue rounded text-sm hover:bg-cyber-blue/30"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(comment.id)}
                  className="px-3 py-1 bg-cyber-red/20 text-cyber-red rounded text-sm hover:bg-cyber-red/30"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}

          {filteredComments.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              No comments found.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
