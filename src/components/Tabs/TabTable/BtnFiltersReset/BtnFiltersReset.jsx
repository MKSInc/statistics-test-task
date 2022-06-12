import './btn-filters-reset.css';
import useAppContext from '../../../../hooks/useAppContext';

export default function BtnFiltersReset({ setInput }) {
  const { setSelectedCountry, setFieldFilter } = useAppContext();

  const handlerOnClick = () => {
    setSelectedCountry('');
    setInput('');
    setFieldFilter({ field: 'clear', from: '', to: '' });
  };

  return (
    <button
      className='btn btn-filters-reset'
      onClick={handlerOnClick}
      >
      Сбросить фильтры
    </button>
  )
}
