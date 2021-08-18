import { Fragment, useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';

import { enrollmentData } from '../data/account-health';

const data = {
  labels: ['1', '2', '3', '4', '5', '6'],
  datasets: [
    {
      label: '# of Red Votes',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: 'rgb(255, 99, 132)',
    },
    {
      label: '# of Blue Votes',
      data: [2, 3, 20, 5, 1, 4],
      backgroundColor: 'rgb(54, 162, 235)',
    },
    {
      label: '# of Green Votes',
      data: [null, 10, 13, 0, 22, 30],
      backgroundColor: 'rgb(75, 192, 192)',
    },
  ],
};




const options = {
  scales: {
    y: [
      {
        stacked: true,
        ticks: {
          beginAtZero: true,
        },
      },
    ],
    x: [
      {
        stacked: true,
      },
    ],
  },
};

export const StackedBar = () => {
  const yAxisLabels = [ '0%', '25%', '50%', '75%', '100%' ];
  const [ xAxisLabels, setXAxisLabels ] = useState([]);
  const [ myData, setMyData ] = useState([]);

  const defaultData = {
    MCV: {
      label: 'MCV',
      data: [],
      backgroundColor: 'rgb(255, 99, 132)',
    },
    targetROAS: {
      label: 'Target ROAS',
      data: [],
      backgroundColor: 'rgb(54, 162, 235)',
    },
    targetCPA: {
      label: 'Target CPA',
      data: [],
      backgroundColor: 'rgb(75, 192, 192)',
    },
    unenrolled: {
      label: 'Unenrolled',
      data: [],
      backgroundColor: 'rgb(0, 0, 0)',
    }
  }

  useEffect(() => {
    enrollmentData
      .sort((a, b) => a.monthNum > b.monthNum ? 1 : -1)
      .forEach(data => {
        xAxisLabels.push(data.month);
        defaultData.MCV.data.push(data.MCV)
        defaultData.targetROAS.data.push(data.targetROAS)
        defaultData.targetCPA.data.push(data.targetCPA)
        defaultData.unenrolled.data.push(data.unenrolled)
      })

    setMyData({
      labels: xAxisLabels,
      datasets: Object.values(defaultData)
    });
  }, [])

  return (
    <Fragment>
      <div className='header'>
        <h1 className='title'>Stacked Bar Chart</h1>
        <div className='links'>
          <a
            className='btn btn-gh'
            href='https://github.com/reactchartjs/react-chartjs-2/blob/master/example/src/charts/StackedBar.js'
          >
            Github Source
          </a>
        </div>
      </div>
      <Bar data={defaultData} options={options} />
    </Fragment>
  )
};

export default StackedBar;