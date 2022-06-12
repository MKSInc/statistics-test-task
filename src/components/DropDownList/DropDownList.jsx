import './dropdown-list.css';

export default function DropDownList({ showDropDownList, list, handlerOnListItemClick, selectedItem }) {
  if (list.length === 0) return null;

  return (
    <ul className='dropdown-list' hidden={!showDropDownList}>
      {
        list.map((item, index) =>
          <li
            key={index}
            className={`dropdown-list__item${item.name === selectedItem ? ' dropdown-list__item_selected' : ''} ${item.name}`}
            onClick={() => handlerOnListItemClick(item.name)}
            >
            {item.text}
          </li>
        )
      }
    </ul>
  );
}
