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
        clearInterval(intervalId) //intervalIdをclearIntervalで指定している
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
        <TwitterShareButton title={`Score:${result.percentage}`}  url={'https://www.doughnut-quiz.com/'} text={'TOEIC単語でクイズ！'}>
          <TwitterIcon size={30} round />
        </TwitterShareButton>
         <p>{result.total}問中{result.correct}問正解しました！</p>
      </div>
      <div className={Styles.buttons}>
        <ThemeProvider theme={theme}>
          <Button color="neutral" variant="outlined" onClick={retry}>
            タイトルにもどる
          </Button>
          {
            user ? 
            <Button color="neutral" variant="outlined" onClick={onCreate}>
            ランキングに登録！
            </Button> : <></>
          }
          
        </ThemeProvider>
      </div>

      {/* 出題したクイズを表示 */}
      <h2>問題一覧</h2>
      <div className={Styles.wordContainer}>
        {questions.map((question, index) => (
          <div key={index} className={Styles.wordList}>
            <p>{index+1}：</p>
            <p>{question.title}</p>
            <span 
              className={`${Styles.which} ${result.countCorrect[index] === '○' ? Styles.correct: Styles.wrong}`} >
              {result.countCorrect[index]}</span>
            <Link href={`https://ejje.weblio.jp/content/${question.title}`} >
             <a target="_blank" rel="noopener noreferrer"><QuestionMarkIcon className={Styles.detail}/></a>
            </Link>
          </div>

        ))}
      </div>
      {
        success ? <FlashMessage message={'ランキングに登録しました！'}/> : ''
      }
    </div>
  )
}

export default QuizResult

