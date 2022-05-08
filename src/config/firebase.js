import { initializeApp } from 'firebase/app'
// import { getAnalytics } from 'firebase/analytics'
import {
  getAuth,
  onAuthStateChanged as onFirebaseAuthStateChanged,
  signInWithPopup,
  signOut
} from 'firebase/auth'
import { TwitterAuthProvider, GoogleAuthProvider } from 'firebase/auth'
import {getFirestore, setDoc, doc} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: REACT_APP_FIREBASE_APIKEY,
  authDomain: REACT_APP_FIREBASE_DOMAIN,
  databaseURL: REACT_APP_FIREBASE_DATABASE,
  projectId: REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: REACT_APP_FIREBASE_SENDER_ID,
  appId: REACT_APP_FIREBASE_APP_I1D,
  measurementId: REACT_APP_FIREBASE_MEASUREMENT_ID,
}


export const app = initializeApp(firebaseConfig)
// export const analytics = getAnalytics(app)
export const db = getFirestore(app)

export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()
export const twitterProvider = new TwitterAuthProvider()

// ログイン処理
export const TwitterLogin = () => {
  const auth = getAuth(app)
  signInWithPopup(auth, twitterProvider).then( async (result) => {
    const credential = TwitterAuthProvider.credentialFromResult(result)
    const token = credential.accessToken
    const secret = credential.secret
    const user = result.user
    setSuccess(true)
  }).catch((error) => {
    const errorCode = error.code
    const errorMessage = error.message
    const email = error.email
    const credential = TwitterAuthProvider.credentialFromError(error)
  })
}

// ログアウト処理
export const logout = () =>
  new Promise((resolve, reject) => {
    const auth = getAuth(app)
    signOut(auth)
      .then(() => resolve())
      .catch((error) => reject(error))
  })

// ログイン検知
export const onAuthStateChanged = (callback) => {
  const auth = getAuth(app)
  onFirebaseAuthStateChanged(auth, (user) => {
    const userInfo = user
      ? {
        uid: user.uid,
      }
      : null
    callback(userInfo)
  })
}

export const Today = () => {
  var now = new Date()
  var Year = String(now.getFullYear())
  var Month = String(now.getMonth()+1)
  var Datetime = String(now.getDate())
  return Year+Month+Datetime
}
