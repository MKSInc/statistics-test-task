import useAppContext from '../../../../hooks/useAppContext';
import DropDown from '../../../DropDown/DropDown';
import FieldInput from './FieldInput';
import { tableFilterFields } from '../../../../db/tableFields';
import './field-filter.css';


export default function FieldFilter() {
  const { fieldFilter, setFieldFilter } = useAppContext();

  const onListItemClick = (field) => {
    if (field !== fieldFilter.field) setFieldFilter({
      from: '',
      to: '',
      field,
    });
  };

  return (
    <div className='field-filter'>
      <DropDown
        cn={['field-filter__dropdown']}
        field={fieldFilter.field}
        list={tableFilterFields}
        onListItemClick={onListItemClick}
        defaultText='Фильтровать по полю ...'
      />
      <div className='field-filter__inputs'>
        <FieldInput name={'from'} />
        <FieldInput name={'to'} />
      </div>
    </div>
  );
}
