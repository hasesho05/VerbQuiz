import { red } from '@mui/material/colors'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar' // eslint-disable-line no-unused-vars
import 'react-circular-progressbar/dist/styles.css'


function Timer() { 
  return (
    <div >
      <CircularProgressbar value={Math.trunc((remainingTime() / 72000) * 100)} styles = {buildStyles({
        textSize: '13px',
        textColor:'white',
        pathColor:red,
        trailColor:'rgba(255,255,255,.2)'
      })}
      text={formatRemainingTime(remainingTime())} />
    </div>
  )

  

  function remainingTime() {
    const currentDate = new Date()
    let diffTargetDate = new Date()
    const targetHours = 20

    diffTargetDate.setHours(targetHours)
    diffTargetDate.setMinutes(0)
    diffTargetDate.setSeconds(0)

    if (currentDate.getHours() >= targetHours) {
      diffTargetDate.setDate(currentDate.getDate() + 1)
    }

    const diffMilliSecond = diffTargetDate.getTime() - currentDate.getTime()
    return diffMilliSecond / 1000
  }

  function formatRemainingTime (remainingTime) {
    const zeroPadding = (time) => {
      return ('0' + time).slice(-2)
    }
    const hours = zeroPadding(Math.floor(remainingTime / 3600))
    const minutes = zeroPadding(Math.floor((remainingTime % 3600) / 60))
    // const seconds = zeroPadding(remainingTime % 60)
  
    return `${hours}:${minutes}`
  }

}

export default Timer