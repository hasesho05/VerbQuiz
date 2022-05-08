import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2' // eslint-disable-line no-unused-vars


ChartJS.register(ArcElement, Tooltip, Legend)

function DounutChart({ result }) {
  const incorrect = result.total - result.correct
  const correct = result.correct

  const data = {
    datasets: [{
      data: [correct,incorrect],
      backgroundColor: [
        '#d0f0d0',
        'rgba(0,0,0,0)',

      ],
      borderColor: [
        'limegreen',
        'limegreen',
      ],
      borderWidth: 1,
      responsive: false,
    }]
  }

 

  return (
    <div style={{ width: '200px', margin: '0 auto' }}>
      <Doughnut data={data} />
    </div>
  )
}

export default DounutChart