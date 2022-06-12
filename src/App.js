import { useEffect, useCallback } from 'react';
import useAppContext from './hooks/useAppContext';
import useHttp from './hooks/useHttp';
import Period from './components/Period';
import Tabs from './components/Tabs';

function App() {
  const { setFullData } = useAppContext();
  const { loading, request, error, cleanError } = useHttp();

  const fetchData = useCallback(async () => {
    const data = await request('https://opendata.ecdc.europa.eu/covid19/casedistribution/json/');
    if (data) setFullData(data);
  }, [request, setFullData]);

  useEffect(() => { fetchData() }, [fetchData]);

  useEffect(() => {
    if (error) {
      // Здесь можно выдать сообщение об ошибке.
      cleanError();
    }
  }, [error, cleanError]);

	return (
		<div className='app _container'>
			{
				loading
        ?
				<div>Загрузка данных ...</div>
				:
        <>
          <Period />
          <Tabs />
        </>
			}
		</div>
	);
}

export default App;
