import { db } from './firebase'
import { doc, getDoc, setDoc, increment, onSnapshot } from 'firebase/firestore'

const COLLECTION = 'downloads'

export async function getDownloadCount(gadgetId: string): Promise<number> {
  try {
    const docRef = doc(db, COLLECTION, gadgetId)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      return docSnap.data().count || 0
    }
    return 0
  } catch (error) {
    console.error('Error getting download count:', error)
    return 0
  }
}

export async function incrementDownloadCount(gadgetId: string): Promise<void> {
  try {
    const docRef = doc(db, COLLECTION, gadgetId)
    await setDoc(docRef, { count: increment(1) }, { merge: true })
  } catch (error) {
    console.error('Error incrementing download count:', error)
  }
}

export function subscribeToDownloadCount(
  gadgetId: string,
  callback: (count: number) => void
): () => void {
  const docRef = doc(db, COLLECTION, gadgetId)
  return onSnapshot(docRef, (docSnap) => {
    if (docSnap.exists()) {
      callback(docSnap.data().count || 0)
    } else {
      callback(0)
    }
  }, (error) => {
    console.error('Error subscribing to download count:', error)
    callback(0)
  })
}

export async function getAllDownloadCounts(): Promise<Record<string, number>> {
  // For admin dashboard - get all counts
  const { collection, getDocs } = await import('firebase/firestore')
  try {
    const querySnapshot = await getDocs(collection(db, COLLECTION))
    const counts: Record<string, number> = {}
    querySnapshot.forEach((doc) => {
      counts[doc.id] = doc.data().count || 0
    })
    return counts
  } catch (error) {
    console.error('Error getting all download counts:', error)
    return {}
  }
}
