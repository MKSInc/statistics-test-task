import { useState } from 'react';
import useAppContext from '../../../hooks/useAppContext';
import CountryFilter from './CountryFilter/CountryFilter';
import FieldFilter from './FieldFilter/FieldFilter';
import BtnFiltersReset from './BtnFiltersReset/BtnFiltersReset';
import Table from './Table/Table';
import Pagination from './Pagination/Pagination';
import './tab-table.css';

export default function TabTable() {
  const { renderedRows, filteredDataForTable } = useAppContext();
  const [ input, setInput ] = useState('');

  return(
    <div className='tab-table'>
      <header className='tab-table__header header-tab-table'>
        <div className='header-tab-table__row header-tab-table__row-1'>
          <div className='header-tab-table__column header-tab-table__column_1'>
            <CountryFilter input={input} setInput={setInput} />
          </div>

          <div className='header-tab-table__column header-tab-table__column_2'>
            <FieldFilter />
          </div>
        </div>

        <div className='header-tab-table__row header-tab-table__row-2'>
          <div className='header-tab-table__column'>
            <BtnFiltersReset setInput={setInput} />
          </div>
        </div>
      </header>

      <div className='tab-table__table'>
        <Table />
        {
          renderedRows === null
          ?
          <div className='tab-table__message'>Обработка данных...</div>
          :
          !renderedRows.length && <div className='tab-table__message'>Ничего не найдено</div>
        }
      </div>

      <div className='tab-table__footer'>
        { filteredDataForTable !== null ? <Pagination filteredDataForTable={filteredDataForTable} /> : null }
      </div>
    </div>
  );
}
