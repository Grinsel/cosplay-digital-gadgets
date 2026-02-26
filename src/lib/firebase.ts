import { initializeApp, getApps } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyBR49LPOPA5vQxBn-r6Ga17Rel3mJS1plA",
  authDomain: "cosplay-gadgets-comments.firebaseapp.com",
  projectId: "cosplay-gadgets-comments",
  storageBucket: "cosplay-gadgets-comments.firebasestorage.app",
  messagingSenderId: "160075053085",
  appId: "1:160075053085:web:8506326b28fc63f643eef4",
  measurementId: "G-1SEFS0DZNE"
}

// Initialize Firebase only once
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]

export const db = getFirestore(app)
export const auth = getAuth(app)
