import  { useState } from 'react'
import Styles from './JoinScreen.module.scss'
import { createTheme, ThemeProvider } from '@mui/material/styles' // eslint-disable-line no-unused-vars
import { Button } from '@mui/material' // eslint-disable-line no-unused-vars
import Twitter from '@mui/icons-material/Twitter' // eslint-disable-line no-unused-vars
import FlashMessage from '../FlashMessage/FlashMessage' // eslint-disable-line no-unused-vars
import { createUserWithEmailAndPassword, getAuth, sendSignInLinkToEmail, signInWithPopup, TwitterAuthProvider } from '@firebase/auth'
import Timer from '../Timer/Timer' // eslint-disable-line no-unused-vars
import { useAuthState } from 'react-firebase-hooks/auth'
import { app, auth, provider, twitterProvider } from '../../config/firebase'
import SignUp from '../MailLogin/MailLogin'

function JoinScreen({start}) {
  const theme = createTheme({
    palette: {
      neutral: {
        main: '#000000',
        contrastText: '#fff',
      },
    },
  })

  const [user] = useAuthState(auth)
  const [success, setSuccess] = useState(false)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const TwitterLogin = () => {
    const auth = getAuth(app)
    signInWithPopup(auth, twitterProvider).then( async (result) => {
      const credential = TwitterAuthProvider.credentialFromResult(result)
      const token = credential.accessToken  // eslint-disable-line no-unused-vars
      const secret = credential.secret // eslint-disable-line no-unused-vars
      const user = result.user // eslint-disable-line no-unused-vars
      setSuccess(true)
    }).catch((error) => {
      const errorCode = error.code // eslint-disable-line no-unused-vars
      const errorMessage = error.message // eslint-disable-line no-unused-vars
      const email = error.email // eslint-disable-line no-unused-vars
      const credential = TwitterAuthProvider.credentialFromError(error) // eslint-disable-line no-unused-vars
    })
    
  }
  


  return (
    <div className={Styles.joinScreen}>
      <div className={Styles.timer}>
        <Timer/>
      </div>
      <p className={Styles.description}>8時に問題リセットされます。</p>
      

      {!user ? 
        <div className={Styles.loginbutton}>
          <Button color="primary" variant="contained" startIcon={<Twitter />}  onClick={TwitterLogin} >
            Twitterで認証
          </Button>
          <SignUp />
          <ThemeProvider theme={theme}>
            <div className={Styles.quizstart}>
              <Button color="neutral" variant="outlined" onClick={start}>
              30問チャレンジ
              </Button>
              <p>※ログインしないとランキングに登録できません</p>
            </div>
          </ThemeProvider>
        </div> 
        : 
        <div className={Styles.loginedbutton}>
          <ThemeProvider theme={theme}>
            <Button color="inherit" variant="outlined" onClick={start}>
              30問チャレンジ
            </Button>
          </ThemeProvider>
        </div>
      }

      
      {
        success ? <FlashMessage message={'ログインに成功しました！'}/> : ''
      }
    </div>
  )
}

export default JoinScreen

