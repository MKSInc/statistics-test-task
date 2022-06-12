import useAppContext from '../../hooks/useAppContext';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function DateInput({ name }) {
  const { date, setDate } = useAppContext();

  const handlerOnChange = (date) => {
    setDate((prevDate) => ({ ...prevDate, [name]: date }));
  }

  return (
    <div className='date-input'>
      <DatePicker
        dateFormat="yyyy/MM/dd"
        selected={date[name]}
        onChange={handlerOnChange}
        minDate={date.min}
        maxDate={date.max}
      />
    </div>
  );
}
