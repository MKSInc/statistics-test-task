import { useEffect, useState, useRef } from 'react';
import DropDownList from '../DropDownList/DropDownList';
import './dropdown.css';

/**
 * Дополнительные классы
 * cn = ['имя класса 1', ...]
 * 
 * field - текущее выбранное поле.
 * 
 * Список элементов
 * list = [
 *  {
 *    name: 'Имя поля',
 *    text: 'Текст поля'
 *  },
 *  ...
 * ]
 * 
 * onListItemClick - коллбэк, что делать при клике на элемент списка.
 * defaultText
 */


export default function DropDown({ cn, field, list, onListItemClick, defaultText }) {
  const [showDropDownList, setShowDropDownList] = useState(false);
  const [btnText, setBtnText] = useState(defaultText);
  const btnEl = useRef(null);

  const setClassNames = () => {
    const classNames = ['dropdown'];
    cn.forEach((item) => classNames.push(item));
    return classNames.join(' ');
  };

  const handlerOnListItemClick = (field) => {
    onListItemClick(field);
    setShowDropDownList(false);
    btnEl.current.focus();
  };

  const handlerOnBtnClick = () => setShowDropDownList((prev) => !prev);
	const handlerOnBtnBlur = () => setTimeout(() => setShowDropDownList(false), 200);

  useEffect(() => {
    let btnText = list.find((item) => item.name === field)?.text;
    if (field === 'clear' || field === '') btnText = defaultText;
    setBtnText(btnText);
  }, [list, field, defaultText]);

  return (
    <div className={setClassNames()}>
      <button
        className='dropdown__btn btn'
        ref={btnEl}
        onClick={handlerOnBtnClick}
        onBlur={handlerOnBtnBlur}
        >
        {btnText}
      </button>
      <DropDownList
        showDropDownList={showDropDownList}
        list={list}
        handlerOnListItemClick={handlerOnListItemClick}
        selectedItem={field}
      />
    </div>
  );
}
