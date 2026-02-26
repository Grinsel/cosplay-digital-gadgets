'use client'

import { memo, useState } from 'react'
import { Comment } from '@/lib/comments'
import { useTranslations } from '@/lib/i18n'
import { formatDate } from '@/lib/utils'
import CommentForm from './CommentForm'

interface CommentItemProps {
  comment: Comment & { replies?: Comment[] }
  onReplyAdded?: () => void
  isReply?: boolean
}

export default memo(function CommentItem({ comment, onReplyAdded, isReply = false }: CommentItemProps) {
  const t = useTranslations()
  const [showReplyForm, setShowReplyForm] = useState(false)

  const handleReplySuccess = () => {
    setShowReplyForm(false)
    onReplyAdded?.()
  }

  return (
    <div className={`${isReply ? 'ml-8 border-l-2 border-cyber-accent/20 pl-4' : ''}`}>
      <div className="bg-cyber-dark border border-cyber-accent/10 rounded-lg p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-cyber-accent font-semibold">
            {comment.nickname}
          </span>
          <span className="text-gray-500 text-xs">
            {formatDate(comment.createdAt)}
          </span>
        </div>

        {/* Content */}
        <p className="text-gray-300 whitespace-pre-wrap mb-3">
          {comment.content}
        </p>

        {/* Actions */}
        {!isReply && (
          <button
            onClick={() => setShowReplyForm(!showReplyForm)}
            className="text-cyber-blue text-sm hover:underline"
          >
            {showReplyForm ? t.comments.cancelReply : t.comments.reply}
          </button>
        )}
      </div>

      {/* Reply Form */}
      {showReplyForm && (
        <div className="mt-2 ml-8">
          <CommentForm
            type={comment.type}
            gadgetId={comment.gadgetId || undefined}
            parentId={comment.id}
            onSuccess={handleReplySuccess}
            onCancel={() => setShowReplyForm(false)}
            placeholder={t.comments.replyPlaceholder}
          />
        </div>
      )}

      {/* Replies */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="mt-2 space-y-2">
          {comment.replies.map((reply) => (
            <CommentItem
              key={reply.id}
              comment={reply}
              isReply={true}
            />
          ))}
        </div>
      )}
    </div>
  )
})
