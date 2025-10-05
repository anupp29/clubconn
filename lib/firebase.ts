import { initializeApp, getApps, getApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getAnalytics } from "firebase/analytics"

const firebaseConfig = {
  apiKey: "AIzaSyAM0o5WV60QZvUEGMN3Og_9x0ZcIZLTsxI",
  authDomain: "clubconn-4da0e.firebaseapp.com",
  projectId: "clubconn-4da0e",
  storageBucket: "clubconn-4da0e.firebasestorage.app",
  messagingSenderId: "403554015037",
  appId: "1:403554015037:web:425879661c813701731754",
  measurementId: "G-N8GS9MPF6Z",
}

// Initialize Firebase (singleton pattern)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp()

// Initialize services
export const auth = getAuth(app)
export const db = getFirestore(app)

// Initialize analytics only on client side
export const analytics = typeof window !== "undefined" ? getAnalytics(app) : null

export default app
