import {
  collection,
  addDoc,
  query,
  where,
  orderBy,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  Timestamp,
  serverTimestamp,
} from 'firebase/firestore'
import { db } from './firebase'

export interface Comment {
  id: string
  type: 'idea' | 'bug'
  gadgetId: string | null
  content: string
  nickname: string
  createdAt: Date
  parentId: string | null
  status: 'visible' | 'hidden'
}

interface CommentInput {
  type: 'idea' | 'bug'
  gadgetId?: string | null
  content: string
  nickname?: string
  parentId?: string | null
}

const RATE_LIMIT_KEY = 'lastCommentTime'
const RATE_LIMIT_MS = 60000 // 60 seconds

// Check rate limit
export function canSubmitComment(): { allowed: boolean; waitTime: number } {
  if (typeof window === 'undefined') return { allowed: true, waitTime: 0 }

  const lastTime = localStorage.getItem(RATE_LIMIT_KEY)
  if (!lastTime) return { allowed: true, waitTime: 0 }

  const elapsed = Date.now() - parseInt(lastTime, 10)
  if (elapsed >= RATE_LIMIT_MS) return { allowed: true, waitTime: 0 }

  return { allowed: false, waitTime: Math.ceil((RATE_LIMIT_MS - elapsed) / 1000) }
}

// Record comment submission
function recordSubmission() {
  if (typeof window !== 'undefined') {
    localStorage.setItem(RATE_LIMIT_KEY, Date.now().toString())
  }
}

// Add a new comment
export async function addComment(input: CommentInput): Promise<string> {
  const { allowed, waitTime } = canSubmitComment()
  if (!allowed) {
    throw new Error(`Please wait ${waitTime} seconds before posting again.`)
  }

  const commentData = {
    type: input.type,
    gadgetId: input.gadgetId || null,
    content: input.content.trim(),
    nickname: input.nickname?.trim() || 'Anonymous',
    createdAt: serverTimestamp(),
    parentId: input.parentId || null,
    status: 'visible',
  }

  const docRef = await addDoc(collection(db, 'comments'), commentData)
  recordSubmission()
  return docRef.id
}

// Get comments for ideas page (type = 'idea', no gadgetId)
export async function getIdeasComments(): Promise<Comment[]> {
  const q = query(
    collection(db, 'comments'),
    where('type', '==', 'idea'),
    where('gadgetId', '==', null),
    where('status', '==', 'visible'),
    orderBy('createdAt', 'desc')
  )

  const snapshot = await getDocs(q)
  return snapshot.docs.map(docToComment)
}

// Get comments for a specific gadget
export async function getGadgetComments(gadgetId: string): Promise<Comment[]> {
  const q = query(
    collection(db, 'comments'),
    where('gadgetId', '==', gadgetId),
    where('status', '==', 'visible'),
    orderBy('createdAt', 'desc')
  )

  const snapshot = await getDocs(q)
  return snapshot.docs.map(docToComment)
}

// Get all comments (for admin)
export async function getAllComments(): Promise<Comment[]> {
  const q = query(
    collection(db, 'comments'),
    orderBy('createdAt', 'desc')
  )

  const snapshot = await getDocs(q)
  return snapshot.docs.map(docToComment)
}

// Update comment status (admin)
export async function updateCommentStatus(commentId: string, status: 'visible' | 'hidden'): Promise<void> {
  const commentRef = doc(db, 'comments', commentId)
  await updateDoc(commentRef, { status })
}

// Update comment content (admin)
export async function updateCommentContent(commentId: string, content: string): Promise<void> {
  const commentRef = doc(db, 'comments', commentId)
  await updateDoc(commentRef, { content: content.trim() })
}

// Delete comment (admin)
export async function deleteComment(commentId: string): Promise<void> {
  const commentRef = doc(db, 'comments', commentId)
  await deleteDoc(commentRef)
}

// Helper to convert Firestore doc to Comment
function docToComment(doc: any): Comment {
  const data = doc.data()
  return {
    id: doc.id,
    type: data.type,
    gadgetId: data.gadgetId,
    content: data.content,
    nickname: data.nickname,
    createdAt: data.createdAt instanceof Timestamp
      ? data.createdAt.toDate()
      : new Date(),
    parentId: data.parentId,
    status: data.status,
  }
}

// Group comments with their replies
export function organizeComments(comments: Comment[]): Comment[] {
  const topLevel = comments.filter(c => !c.parentId)
  const replies = comments.filter(c => c.parentId)

  // Sort replies under their parents
  return topLevel.map(parent => ({
    ...parent,
    replies: replies.filter(r => r.parentId === parent.id)
  }))
}
