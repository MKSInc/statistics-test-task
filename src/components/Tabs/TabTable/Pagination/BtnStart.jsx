import { useEffect, useState } from 'react';

export default function BtnStart({ position, setInputs }) {
  const [disabled, setDisabled] = useState(true);

  const handlerOnClick = () => {
    if (position === 1) return;
    setInputs((prevInputs) => ({ ...prevInputs, position: 1}));
  };

  useEffect(() => {
    if (position === 1) setDisabled(true);
      else if (disabled) setDisabled(false);
  }, [position, disabled]);

  return (
    <button
    className='control-pagination__btn control-pagination__btn-prev btn'
      onClick={handlerOnClick}
      disabled={disabled}
      >
      &lt;&lt;
    </button>
  );
}
