import { useEffect, useState } from 'react';

export default function BtnNext({ position, setInputs, endPosition }) {
  const [disabled, setDisabled] = useState(true);

  const handlerOnClick = () => {
    if (position === endPosition) return;
    setInputs((prevInputs) => ({ ...prevInputs, position: position + 1}));
  };

  useEffect(() => {
    if (position === endPosition || position === '') setDisabled(true);
      else if (disabled) setDisabled(false);
  }, [position, endPosition, disabled]);

  return (
    <button
    className='control-pagination__btn control-pagination__btn-next btn'
      onClick={handlerOnClick}
      disabled={disabled}
      >
      &gt;
    </button>
  );
}
