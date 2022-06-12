import { useEffect, useState } from 'react';
import useAppContext from '../../../../hooks/useAppContext';
import BtnStart from './BtnStart';
import BtnPrev from './BtnPrev';
import BtnsPos from './BtnsPos/BtnsPos';
import BtnPos from './BtnsPos/BtnPos';
import BtnNext from './BtnNext';
import './pagination.css';

export default function Pagination({ filteredDataForTable }) {
  const { setRenderedRows } = useAppContext();
  const [inputs, setInputs] = useState({ rows: 10, position: 1 });

  // Конечная позиция в пагинации.
  const [endPosition, setEndPosition] = useState(null);

  // Количество кнопок с позициями (без учета последней, она всегда отображается).
  const [posBtnsCount, setPosBtnsCount] = useState(5);

  const handlerInputs = ({ target }) => {
    let value = +target.value;
    
    // Пропускаем только числа.
    // +target.value уже пропускает только числа или возвращает NaN (+'' === 0),
    // но регулярка отфильтровывает дробные и отрицательные числа.
    if (/^\d*$/.test(value)) {
      if (target.name === 'position' && value > endPosition ) value = endPosition;
      setInputs((prevInputs) => ({ ...prevInputs, [target.name]: value === 0 ? '' : value }));
    }
  }

  useEffect(() => {
    if (inputs.rows === '') return;
    setInputs((prevInputs) => ({ ...prevInputs, position: 1 }));
    setEndPosition(Math.ceil(filteredDataForTable.length / inputs.rows));
  }, [filteredDataForTable, inputs.rows]);

  useEffect(() => {
    if (inputs.position === '' || inputs.rows === '') return;
    const startRow = (inputs.position - 1) * inputs.rows;
    const renderedRows = [];

    for (let i = startRow; i < startRow + inputs.rows && i < filteredDataForTable.length; i += 1) {
      renderedRows.push(filteredDataForTable[i]);
    }

    setRenderedRows(renderedRows);
  }, [filteredDataForTable, setRenderedRows, inputs]);

  // Устанавливаем количество кнопок с позициями в зависимости от текущей ширины экрана.
  useEffect(() => {
    const handleRezise = (event) => {
      let width = 0;
      if (!event) width = window.outerWidth;
      else width = event.target.outerWidth;

      let posBtnsCount = 5;

      if (endPosition > 999 && width < 580) posBtnsCount = 3;
      if (endPosition > 6 && width < 460) posBtnsCount = 1;

      setPosBtnsCount(posBtnsCount);        
    };

    handleRezise();
    window.addEventListener('resize', handleRezise);

    return () => window.removeEventListener('resize', handleRezise);
  }, [endPosition]);

  return (
    <div className='pagination'>
      <div className='pagination__rows-count rows-count-pagination'>
        <label className='rows-count-pagination__label'>
          <span>Количество строк: </span>
          <input
            className='rows-count-pagination__input input'
            name='rows'
            value={inputs.rows}
            onChange={handlerInputs}
            placeholder='...'
            />
        </label>
      </div>

      <div className='pagination__control control-pagination'>
        <BtnStart position={inputs.position} setInputs={setInputs} />
        <BtnPrev position={inputs.position} setInputs={setInputs} />
        <BtnsPos posBtnsCount={posBtnsCount} position={inputs.position} setInputs={setInputs} endPosition={endPosition} />
        {
          endPosition > 6 ?
          <input 
            className='control-pagination__input input'
            name='position'
            value={inputs.position}
            onChange={handlerInputs}
            placeholder='...'
          />
          : null
        }
        <BtnPos position={endPosition} curPos={inputs.position} setInputs={setInputs} />
        <BtnNext position={inputs.position} setInputs={setInputs} endPosition={endPosition} />
      </div>
    </div>
  );
}
