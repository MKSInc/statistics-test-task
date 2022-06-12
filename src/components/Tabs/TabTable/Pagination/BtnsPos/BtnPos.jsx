export default function BtnPos({ position, curPos, setInputs }) {
  const handlerOnClick = (position) => {
    setInputs((prevInput) => ({ ...prevInput, position}));
  };

  return (
    <button
      className={`control-pagination__btn btn${position === +curPos ? ' control-pagination__btn_cur-pos' : ''}`}
      onClick={() => handlerOnClick(position)}
      >
      {position}
    </button>
  );
}
