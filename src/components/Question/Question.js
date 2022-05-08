import { useEffect, useRef, useState } from 'react'
import {flushSync} from 'react-dom'
import Styles from './Question.module.scss'
import { createTheme, ThemeProvider } from '@mui/material/styles' // eslint-disable-line no-unused-vars
import Button from '@mui/material/Button' // eslint-disable-line no-unused-vars


function Question({ question, totalQuestions, currentQuestionIndex, setAnswer }) {
  const [isClicked, setIsClicked] = useState(false)
  const [selectedOption, setSelectedOption] = useState(null)
  const timer = useRef(null)
  const progressBar = useRef(null)

  const theme = createTheme({
    palette: {
      neutral: {
        main: '#fff',
        contrastText: '#fff',
        disabled: 'white'
      },
    },
  })

  

  function gotoNextQuestion() {
    if(timer.current){
      clearTimeout(timer.current)
    }
    flushSync(() => {
      setAnswer(selectedOption)
    })
    setSelectedOption(null)
    setIsClicked(false)
    
  }

  useEffect(()=> {
    progressBar.current.classList.remove(Styles.progressBarActive)
    setTimeout(()=> {
      progressBar.current.classList.add(Styles.progressBarActive)
    },0)
    timer.current = setTimeout(gotoNextQuestion, 8*1000)
  },[question])

  const handleClick = (index) => {
    setIsClicked(true)
    setSelectedOption(index)
  }

  return (
    <div className={Styles.question}>
      <div className={Styles.progressBar} ref={progressBar} />
      <div className={Styles.questionCount}>
        <b> {currentQuestionIndex} </b>
        of
        <b> {totalQuestions} </b>
      </div>
      <div className={Styles.main}>
        <div className={Styles.title}>
          <span>Question:</span>
          <div className={Styles.container}>
            <p>{ question.title }</p>
            <ThemeProvider theme={theme}>
              <Button color="neutral" variant="outlined" onClick={gotoNextQuestion}>
                SKIP
              </Button>
            </ThemeProvider>
          </div>
        </div>
        
        <div className={Styles.options}>
          {
            question.options.map((option, index) => {
              return (
                <div
                  className={`${Styles.option} ${index === selectedOption ? Styles.active : ''}`}
                  key={index}
                  onClick={()=>handleClick(index)}
                >
                  {option}
                </div>
              )
            })
          }
        </div>
      </div>
      <div className={Styles.control}>
      <ThemeProvider theme={theme}>
        <Button 
          disabled={!isClicked}
          color="neutral" 
          variant="outlined" 
          onClick={gotoNextQuestion}
          style={{width:'100%', padding:'10px',margin:'0px 20px'}}
        >
          
          Next(次のクイズへ)
        </Button>
      </ThemeProvider>
      </div>
    </div>
  )
}

export default Question