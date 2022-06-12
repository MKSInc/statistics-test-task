import { createContext, useState, useEffect } from 'react';
import getCountriesList from '../utility/getCountriesList';
import getCountriesTotalData from '../utility/getCountriesTotalData';
import getDataByPeriod from '../utility/getDataByPeriod';
import getDataByField from '../utility/getDataByField';
import getSortedData from '../utility/getSortedData';
import getMinMaxDate, { getMinValue, getMaxValue } from '../utility/getMinMaxDate';

export const AppContext = createContext(null);

export default function AppProvider({ children }) {
  const [date, setDate] = useState(null);

  // Все записи полученные по запросу.
  const [fullData, setFullData] = useState(null);		     
  
  // Список всех стран.
  const [countriesList, setCountriesList] = useState([]);

  // Массив объектов, построенный на основе записей из fullData, и обобщенных данных для каждой страны.
  // Поля объектов соответствуют колонкам таблицы.
  // На основе этого массива будет происходить фильтрация по датам, странам и полю.
  const [dataForTable, setDataForTable] = useState(null);

  // Отдельные состояния для таблицы и графика, чтобы возвращаться к выбранному значению при переключении на таблицу.
  // При переключении на график, предыдущее значение сбрасывается.
	const [selectedCountry, setSelectedCountry] = useState(''); // Выбранная страна в фильтре для таблицы.
  const [selectedCountryChart, setSelectedCountryChart] = useState('clear'); // Выбранная страна в фильтре для графика.

  // Записи отфильтрованные по датам.
  const [dataByPeriod, setDataByPeriod] = useState(null);

  // Записи отфильтрованные по стране и полю.
  const [filteredDataForTable, setFilteredDataForTable] = useState(null);

  // Строки для отрисовки в таблице.
  const [renderedRows, setRenderedRows] = useState(null);

  // Состояние значений фильтра по полю.
  const [fieldFilter, setFieldFilter] = useState({ field: 'clear', from: '', to: '' });

  // Состояние значений сортировки.
  const [sort, setSort] = useState({ field: 'country', state: 'sort-down' });

	useEffect(() => {
    if (fullData === null) return;
    
    const minDate = getMinMaxDate(getMinValue, fullData);
    const maxDate = getMinMaxDate(getMaxValue, fullData);

    setDate({
      min: minDate,
      max: maxDate,
      start: minDate,
      end: maxDate,
    });

    setCountriesList(getCountriesList(fullData));
  }, [fullData]);

  useEffect(() => {
    if (fullData === null || countriesList.length === 0) return;

    const countriesTotalData = getCountriesTotalData(fullData, countriesList);
    const newTableData = fullData.map((record, index) => ({
      id: index,
      country: record.country,
      cases: record.cases,
      deaths: record.deaths,
      year: record.year,
      month: record.month,
      day: record.day,
      totalCases: countriesTotalData[record.country].totalCases,
      totalDeaths: countriesTotalData[record.country].totalDeaths,
      casesPer1000: countriesTotalData[record.country].casesPer1000,
      deathsPer1000: countriesTotalData[record.country].deathsPer1000,
      averageCasesPerDay: countriesTotalData[record.country].averageCasesPerDay,
      averageDeathsPerDay: countriesTotalData[record.country].averageDeathsPerDay,
      maxCasesPerDay: countriesTotalData[record.country].maxCasesPerDay,
      maxDeathPerDay: countriesTotalData[record.country].maxDeathPerDay,
    }));

    setDataForTable(newTableData);
  }, [fullData, countriesList]);

  useEffect(() => {
		if (!date || dataForTable === null) return;
		const dataByPeriod = getDataByPeriod(dataForTable, date);
    setDataByPeriod(dataByPeriod);
	}, [date, dataForTable]);

  useEffect(() => {
    if (dataByPeriod === null) return;
    const dataByCountry = selectedCountry === '' || selectedCountry === 'clear'
      ? dataByPeriod
      : dataByPeriod.filter((record) => record.country === selectedCountry);

    const dataByField = getDataByField(dataByCountry, fieldFilter)
    const sortedData = getSortedData(dataByField, sort);

    setFilteredDataForTable(sortedData);
  }, [dataByPeriod, selectedCountry, fieldFilter, sort]);

  const context = {
    setFullData, 	  // +
    filteredDataForTable, // +
    dataByPeriod, // +
    renderedRows,      // +
    setRenderedRows, // +
    date, // +
    setDate,  // +
    countriesList,  // +
		selectedCountry,
		setSelectedCountry,
    fieldFilter,    // +
    setFieldFilter, // +
    sort, // +
    setSort,  // +
    selectedCountryChart, // +
    setSelectedCountryChart, // +
  };

  return (
    <AppContext.Provider value={context}>
      { children }
    </AppContext.Provider>
  );
}
