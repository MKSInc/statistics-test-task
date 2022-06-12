import { useEffect } from 'react';
import useAppContext from '../../../../hooks/useAppContext';
import tableFields from '../../../../db/tableFields';
import './table.css';

export default function Table() {
  const { renderedRows, sort, setSort } = useAppContext();

  const setTableSortClassNames = (field) => {
    const cn = ['table__sort'];
    const modifier = field === sort.field ? sort.state : 'sort-off';

    cn.push(`table__sort_${modifier}`);
    return cn.join(' ');
  }

  const handlerOnThClick = (fieldName) => {
    const states = {
      'sort-down': 'sort-up',
      'sort-up': 'sort-off',
      'sort-off': 'sort-down',
    };

    if (fieldName === 'country') states['sort-up'] = 'sort-down';
    setSort((prev) => ({ field: fieldName, state: prev.field === fieldName ? states[prev.state] : 'sort-down' }));
  };

  const handlerOnThKeyDown = (event, fieldName) => {
    if (event.key === 'Enter') handlerOnThClick(fieldName);
  }

  useEffect(() => {
    if (sort.state === 'sort-off') setSort({ field: 'country', state: 'sort-down' });
  }, [sort, setSort]);

  return (
    <>
      <table className='table'>
        <thead className='table__header header-table'>
          <tr className='table__row'>
            { 
              tableFields.map((tableField) => 
                <th
                  key={tableField.name}
                  className='header-table__cell table__cell'
                  onClick={() => handlerOnThClick(tableField.name)}
                  onKeyDown={(event) => handlerOnThKeyDown(event, tableField.name)}
                  tabIndex={0}
                  >
                  {tableField.text}
                  <span className={setTableSortClassNames(tableField.name)}>
                    <span className='_visually-hidden'>Сортировка</span>
                  </span>
                </th>
              )  
            }
          </tr>
        </thead>

        <tbody className='table__body'>
          { renderedRows &&
            renderedRows.map((row, index) => 
              <tr key={index} className='table__row'>
                { 
                  tableFields.map((tableField) => 
                    <td
                      key={tableField.name}
                      className='table__cell'
                      >
                      {row[tableField.name]}
                    </td>
                  )  
                }
              </tr>
            )
          }
        </tbody>
      </table>
    </>
  )
}
