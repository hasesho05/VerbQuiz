import Styles from './QuizScreen.module.scss'
import { useState } from 'react'
import QuestionList from '../../data/question4.json'
import QuizResult from '../QuizResult/QuizResult' // eslint-disable-line no-unused-vars
import Question from '../Question/Question' // eslint-disable-line no-unused-vars

function QuizScreen({retry}) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [markedAnswers, setMarkedAnswers] = useState(new Array(QuestionList.length))
  const isQuestionEnd = currentQuestionIndex === QuestionList.length
  const countCorrect = []
  

  function calculateResult(){
    let correct = 0
    QuestionList.forEach((question, index)=>{
      if(question.correctOptionIndex == markedAnswers[index]){
        correct++
        countCorrect.push('○')
      } else {
        countCorrect.push('×')
      }
    })
    return {
      total: QuestionList.length,
      correct: correct,
      percentage: Math.trunc((correct / QuestionList.length) * 100),
      countCorrect: countCorrect
    }
  }

  return (
    <div className={Styles.quizScreen}>
      {
        isQuestionEnd ? (
          <QuizResult
            result={calculateResult()}
            retry={retry}
            questions={QuestionList}
          />
        ) : (
          <Question
            question={QuestionList[currentQuestionIndex]}
            totalQuestions={QuestionList.length}
            currentQuestionIndex={currentQuestionIndex+1}
            setCurrentQuestionIndex={setCurrentQuestionIndex}
            setAnswer={(index)=>{
              setMarkedAnswers((arr)=>{
                let newArr = [...arr]
                newArr[currentQuestionIndex] = index
                return newArr
              })
              setCurrentQuestionIndex(currentQuestionIndex+1)
            }}
          />
        )
      }
    </div>
  )
}

export default QuizScreen