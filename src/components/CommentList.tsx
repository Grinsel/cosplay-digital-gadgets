'use client'

import { useState, useEffect, useCallback } from 'react'
import { Comment, getIdeasComments, getGadgetComments, organizeComments } from '@/lib/comments'
import { useTranslations } from '@/lib/i18n'
import CommentForm from './CommentForm'
import CommentItem from './CommentItem'

interface CommentListProps {
  type: 'idea' | 'bug'
  gadgetId?: string
  title?: string
}

export default function CommentList({ type, gadgetId, title }: CommentListProps) {
  const t = useTranslations()
  const [comments, setComments] = useState<(Comment & { replies?: Comment[] })[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchComments = useCallback(async () => {
    try {
      setError(null)
      const rawComments = type === 'idea' && !gadgetId
        ? await getIdeasComments()
        : await getGadgetComments(gadgetId!)

      // Organize into threads
      const organized = organizeComments(rawComments)
      setComments(organized as any)
    } catch (err: any) {
      setError(t.comments.errorLoading)
      console.error('Error loading comments:', err)
    } finally {
      setLoading(false)
    }
  }, [type, gadgetId, t.comments.errorLoading])

  useEffect(() => {
    fetchComments()
  }, [fetchComments])

  const handleCommentAdded = () => {
    fetchComments()
  }

  return (
    <section className="bg-cyber-darker border border-cyber-accent/20 rounded-lg p-6">
      <h2 className="text-xl font-bold text-white mb-6">
        {title || (type === 'idea' ? t.comments.ideasTitle : t.comments.feedbackTitle)}
      </h2>

      {/* Comment Form */}
      <div className="mb-8">
        <CommentForm
          type={type}
          gadgetId={gadgetId}
          onSuccess={handleCommentAdded}
          placeholder={type === 'idea' ? t.comments.ideaPlaceholder : t.comments.bugPlaceholder}
        />
      </div>

      {/* Comments List */}
      {loading ? (
        <div className="text-center py-8">
          <div className="text-cyber-accent">{t.comments.loading}</div>
        </div>
      ) : error ? (
        <div className="text-center py-8">
          <p className="text-cyber-red">{error}</p>
          <button
            onClick={fetchComments}
            className="mt-2 text-cyber-accent hover:underline"
          >
            {t.comments.retry}
          </button>
        </div>
      ) : comments.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          {type === 'idea' ? t.comments.noIdeas : t.comments.noComments}
        </div>
      ) : (
        <div className="space-y-4">
          {comments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              onReplyAdded={handleCommentAdded}
            />
          ))}
        </div>
      )}
    </section>
  )
}
