import React, { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import useAppContext from '../../../hooks/useAppContext';
import getTotalDataForChart from '../../../utility/getTotalDataForChart';
import './chart.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
};

function getData(data) {
  return {
    labels: data.map((record, index) => index + 1),
    datasets: [
      {
        label: 'Заболевания',
        data: data.map((record) => record.cases),
        borderColor: 'rgb(255, 169, 39)',
        backgroundColor: 'rgba(255, 169, 39, 0.5)',
        cubicInterpolationMode: 'monotone',
      },
      {
        label: 'Смерти',
        data: data.map((record) => record.deaths),
        borderColor: 'rgb(255, 80, 80)',
        backgroundColor: 'rgba(255, 80, 80, 0.5)',
        cubicInterpolationMode: 'monotone',
      },
    ],
  };
}

export default function Chart() {
  const { dataByPeriod, selectedCountryChart } = useAppContext();
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!dataByPeriod) return;

    const data = selectedCountryChart === 'clear'
      ?
      getTotalDataForChart(dataByPeriod)
      :
      dataByPeriod
        .filter((record) => record.country === selectedCountryChart)
        .filter((record) => record.cases > -1 && record.deaths > -1);

    setData(data);
  }, [dataByPeriod, selectedCountryChart])

  if (!dataByPeriod) return null;

  return (
    <div className='tab-chart__chart chart'>
      <Line options={options} data={getData(data)} />
    </div>
  )
}
