import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyAYHrDa6wXKMHzqr485GSgTZ1tcKu6pces",
  authDomain: "pomopets-app.firebaseapp.com",
  projectId: "pomopets-app",
  storageBucket: "pomopets-app.appspot.com",
  messagingSenderId: "388162721545",
  appId: "1:388162721545:web:d029cdb4e9c72dc707a5d8",
  measurementId: "G-3886F1P1B9"
};

initializeApp(firebaseConfig)
const auth = getAuth()

export default { auth }