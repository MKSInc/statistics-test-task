import { useState, useCallback } from 'react';

export default function useHttp() {
  const [ loading, setLoading ] = useState(false);
  const [ error, setError ] = useState(null);

  const request = useCallback(async (url, opt = {}) => {
    setLoading(true);
    
    try {
      const responseFetch = await fetch(url, opt);

      if (!responseFetch.ok) throw new Error(`Ошибка в запросе: ${url}, ${JSON.stringify(opt)}`);

      const response = await responseFetch.json();

      setLoading(false);
      return response.records.map((record) => ({
        country: record.countriesAndTerritories.replace(/_/g, ' '),
        year: +record.year,
        month: +record.month,
        day: +record.day,
        cases: record.cases,
        deaths: record.deaths,
        popData2019: record.popData2019,
      })).reverse(); // Переворачиваем массив, чтобы даты шли по возрастанию.

    } catch (e) {
      setError(e.message);
      setLoading(false);
      console.log('⛔', e.message);
    }
  }, []);

  const cleanError = useCallback(() => setError(null), []);

  return { loading, request, error, cleanError };
};
