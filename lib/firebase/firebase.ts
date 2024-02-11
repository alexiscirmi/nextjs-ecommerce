import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_KEY,
  authDomain: 'anverso-45437.firebaseapp.com',
  projectId: 'anverso-45437',
  storageBucket: 'anverso-45437.appspot.com',
  messagingSenderId: '735057000281',
  appId: '1:735057000281:web:6e211057d8c510e7a2be48'
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)

// Initialize Cloud Storage and get a reference to the service
export const storage = getStorage(app)
