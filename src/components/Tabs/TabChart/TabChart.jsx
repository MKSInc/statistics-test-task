import { useEffect } from 'react';
import useAppContext from '../../../hooks/useAppContext';
import DropDown from '../../DropDown/DropDown';
import Chart from './Chart';
import './tab-chart.css';

export default function TabChart() {
  const { countriesList, selectedCountryChart, setSelectedCountryChart } = useAppContext();
  const list = [{ name: 'clear', text: 'Все страны' }, ...countriesList];

  const onListItemClick = (item) => setSelectedCountryChart(item);

  // Очищаем предыдущее значение.
  useEffect(() => { return () => setSelectedCountryChart('clear') }, [setSelectedCountryChart]);

  return (
    <div className='tab-chart'>
      <header className='tab-chart__header'>
        <span>Страна</span>
        <DropDown
          cn={['tab-chart__dropdown']}
          field={selectedCountryChart}
          list={list}
          onListItemClick={onListItemClick}
          defaultText='Все страны'
        />
      </header>
      <Chart />
    </div>
  )
}
