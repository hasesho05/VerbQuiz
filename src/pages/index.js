import { useState } from 'react'
import QuizScreen from '../components/QuizScreen/QuizScreen' // eslint-disable-line no-unused-vars
import JoinScreen from '../components/JoinScreen/JoinScreen' // eslint-disable-line no-unused-vars
import Navbar from '../components/Navbar/Navbar' // eslint-disable-line no-unused-vars
import reportWebVitals from '../reportWebVitals'
import Styles from '../styles/Home.module.scss'
import HeadInfo from '../components/Head/Head'

export default function Home() {
  reportWebVitals()
  const [isQuizStarted, setIsQuizStarted] = useState(false)
  return (
    <>
      <HeadInfo />
      <Navbar />
      <div className={Styles.quizContainer}>
        {
          isQuizStarted ? (
            <QuizScreen retry={()=>setIsQuizStarted(false)}/>
          ) : (
            <JoinScreen start={()=>setIsQuizStarted(true)}/>
          )
        }
      </div>
    </>
  )
}
