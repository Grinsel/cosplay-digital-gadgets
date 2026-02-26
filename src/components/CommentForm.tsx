'use client'

import { useState, useEffect } from 'react'
import { addComment, canSubmitComment } from '@/lib/comments'
import { useTranslations } from '@/lib/i18n'

interface CommentFormProps {
  type: 'idea' | 'bug'
  gadgetId?: string
  parentId?: string
  onSuccess?: () => void
  onCancel?: () => void
  placeholder?: string
}

export default function CommentForm({
  type,
  gadgetId,
  parentId,
  onSuccess,
  onCancel,
  placeholder,
}: CommentFormProps) {
  const t = useTranslations()
  const [content, setContent] = useState('')
  const [nickname, setNickname] = useState('')
  const [honeypot, setHoneypot] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [waitTime, setWaitTime] = useState(0)

  // Check rate limit on mount and periodically
  useEffect(() => {
    const checkLimit = () => {
      const { allowed, waitTime: wait } = canSubmitComment()
      setWaitTime(allowed ? 0 : wait)
    }

    checkLimit()
    const interval = setInterval(checkLimit, 1000)
    return () => clearInterval(interval)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    // Honeypot check - if filled, silently "succeed"
    if (honeypot) {
      setContent('')
      setNickname('')
      onSuccess?.()
      return
    }

    if (!content.trim()) {
      setError(t.comments.errorEmpty)
      return
    }

    if (content.trim().length < 10) {
      setError(t.comments.errorTooShort)
      return
    }

    const { allowed, waitTime: wait } = canSubmitComment()
    if (!allowed) {
      setError(t.comments.errorRateLimit.replace('{seconds}', wait.toString()))
      return
    }

    setLoading(true)

    try {
      await addComment({
        type,
        gadgetId: gadgetId || null,
        content: content.trim(),
        nickname: nickname.trim() || undefined,
        parentId: parentId || null,
      })

      setContent('')
      setNickname('')
      onSuccess?.()
    } catch (err: any) {
      setError(err.message || t.comments.errorGeneric)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Honeypot field - hidden from users */}
      <input
        type="text"
        name="website"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      <div>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={placeholder || t.comments.placeholder}
          className="w-full px-4 py-3 bg-cyber-dark border border-cyber-accent/20 rounded-lg text-white placeholder-gray-500 focus:border-cyber-accent focus:outline-none resize-none"
          rows={4}
          disabled={loading || waitTime > 0}
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          placeholder={t.comments.nicknamePlaceholder}
          className="flex-1 px-4 py-2 bg-cyber-dark border border-cyber-accent/20 rounded-lg text-white placeholder-gray-500 focus:border-cyber-accent focus:outline-none"
          maxLength={30}
          disabled={loading || waitTime > 0}
        />

        <div className="flex gap-2">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 border border-gray-600 text-gray-400 rounded-lg hover:border-gray-500 transition-colors"
            >
              {t.comments.cancel}
            </button>
          )}

          <button
            type="submit"
            disabled={loading || waitTime > 0}
            className="px-6 py-2 bg-cyber-accent text-cyber-dark font-bold rounded-lg hover:bg-cyber-accent/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading
              ? t.comments.submitting
              : waitTime > 0
              ? `${t.comments.wait} ${waitTime}s`
              : t.comments.submit}
          </button>
        </div>
      </div>

      {error && (
        <p className="text-cyber-red text-sm">{error}</p>
      )}
    </form>
  )
}
