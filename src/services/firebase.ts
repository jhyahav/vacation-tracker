import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"

// Firebase API keys are not secret, so we can store them in plain text
const firebaseConfig = {
  apiKey: "AIzaSyB89XrDt9q3m48XZ0bDGPSLWulTKht_81A",
  authDomain: "vacation-tracker-da0c4.firebaseapp.com",
  projectId: "vacation-tracker-da0c4",
  storageBucket: "vacation-tracker-da0c4.firebasestorage.app",
  messagingSenderId: "474059687982",
  appId: "1:474059687982:web:04753f40c1ac2f840e77bf",
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
