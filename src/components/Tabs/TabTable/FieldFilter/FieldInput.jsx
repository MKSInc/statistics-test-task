import useAppContext from '../../../../hooks/useAppContext';

const inputNames = {
  from: 'значение от',
  to: 'значение до',
};

export default function FieldInput({ name }) {
  const { fieldFilter, setFieldFilter } = useAppContext();

  const handlerOnInputChange = ({ target }) => {
    const { value } = target;

    // Пропускаем только числа, точку и пустую строку.
    if (/^\d*\.?\d*$/.test(value)) {
      setFieldFilter((prev) => ({ ...prev, [name]: value }));
    }
  };

  return (
    <input
      className='field-filter__input input'
      value={fieldFilter[name]}
      onChange={handlerOnInputChange}
      placeholder={inputNames[name]}
      disabled={fieldFilter.field === 'clear'}
    />
  );
}
