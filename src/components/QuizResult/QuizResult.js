import  { useEffect, useState } from 'react'
import Link from 'next/link' // eslint-disable-line no-unused-vars
import Styles from './QuizResult.module.scss'
import { createTheme, ThemeProvider } from '@mui/material/styles' // eslint-disable-line no-unused-vars
import Button from '@mui/material/Button' // eslint-disable-line no-unused-vars
import QuestionMarkIcon from '@mui/icons-material/QuestionMark' // eslint-disable-line no-unused-vars
import FlashMessage from '../FlashMessage/FlashMessage' // eslint-disable-line no-unused-vars
import DounutChart from '../DounutChart/DounutChart' // eslint-disable-line no-unused-vars
import {TwitterShareButton,TwitterIcon } from 'react-share' // eslint-disable-line no-unused-vars
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db, Today } from '../../config/firebase'
import { getAuth } from '@firebase/auth'
import { doc, serverTimestamp, setDoc } from '@firebase/firestore'



function QuizResult({result, retry, questions }) {
  const [user] = useAuthState(auth)
  const [success, setSuccess] = useState(false)
  const [_result, setResult] = useState(0)
  const theme = createTheme({
    palette: {
      neutral: {
        main: '#000000',
        contrastText: '#fff',
      },
    },
  })
  const onCreate = async () => {
    
    await setDoc(doc(db, 'users', auth.currentUser.uid), {
      displayName: auth.currentUser.displayName,
      photoURL: auth.currentUser.photoURL,
      score: result.percentage,
      timestamp: serverTimestamp(),
     })
     await setDoc(doc(db, Today(), auth.currentUser.uid), {
      displayName: auth.currentUser.displayName,
      photoURL: auth.currentUser.photoURL,
      score: result.percentage,
      timestamp: serverTimestamp(),
     })
     setSuccess(true)
  }

  useEffect(() => {
    const countUp = () => {
      setResult(_result++) // eslint-disable-line 
    }

    const intervalId = setInterval(() =>{
      countUp()
      if(_result > result.percentage){
        clearInterval(intervalId) //intervalIdã‚’clearIntervalã?§æŒ‡å®šã?—ã?¦ã?„ã‚‹
      }}, 10)
    return 
  }, [])


  return (
    <div className={Styles.resultScreen}>
      <div className={Styles.timer}>
      <DounutChart result={result}/>
      </div>
      <section>
        {_result}
        <span>%</span>
      </section>
      
      <div className={Styles.shareButton}>
        <TwitterShareButton title={`Score:${result.percentage}`}  url={'https://www.doughnut-quiz.com/'} text={'TOEICå?˜èªžã?§ã‚¯ã‚¤ã‚ºï¼?'}>
          <TwitterIcon size={30} round />
        </TwitterShareButton>
         <p>{result.total}å•?ä¸­{result.correct}å•?æ­£è§£ã?—ã?¾ã?—ã?Ÿï¼?</p>
      </div>
      <div className={Styles.buttons}>
        <ThemeProvider theme={theme}>
          <Button color="neutral" variant="outlined" onClick={retry}>
            ã‚¿ã‚¤ãƒˆãƒ«ã?«ã‚‚ã?©ã‚‹
          </Button>
          {
            user ? 
            <Button color="neutral" variant="outlined" onClick={onCreate}>
            ãƒ©ãƒ³ã‚­ãƒ³ã‚°ã?«ç™»éŒ²ï¼?
            </Button> : <></>
          }
          
        </ThemeProvider>
      </div>

      {/* å‡ºé¡Œã?—ã?Ÿã‚¯ã‚¤ã‚ºã‚’è¡¨ç¤º */}
      <h2>å•?é¡Œä¸€è¦§</h2>
      <div className={Styles.wordContainer}>
        {questions.map((question, index) => (
          <div key={index} className={Styles.wordList}>
            <p>{index+1}ï¼š</p>
            <p>{question.title}</p>
            <span 
              className={`${Styles.which} ${result.countCorrect[index] === 'â—‹' ? Styles.correct: Styles.wrong}`} >
              {result.countCorrect[index]}</span>
            <Link href={`https://ejje.weblio.jp/content/${question.title}`} >
             <a target="_blank" rel="noopener noreferrer"><QuestionMarkIcon className={Styles.detail}/></a>
            </Link>
          </div>

        ))}
      </div>
      {
        success ? <FlashMessage message={'ãƒ©ãƒ³ã‚­ãƒ³ã‚°ã?«ç™»éŒ²ã?—ã?¾ã?—ã?Ÿï¼?'}/> : ''
      }
    </div>
  )
}

export default QuizResult

