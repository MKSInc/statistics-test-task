import { useState, useEffect, useRef } from 'react';

export default function BtnReset({ btnHidden, onBtnClick }) {
  const [hidden, setHidden] = useState(true);
	const [animate, setAnimate] = useState('period__btn_hide');
	const btnRef = useRef(null);

  useEffect(() => {
    if (!btnHidden) setHidden(false);
    else setAnimate('period__btn_hide')
  }, [btnHidden]);

  const hideBtn = () => { setHidden(true) };

  useEffect(() => {
		if (animate !== 'period__btn_hide') return;
		btnRef.current?.addEventListener('transitionend', hideBtn);
		// eslint-disable-next-line react-hooks/exhaustive-deps
		return () => btnRef.current?.removeEventListener('transitionend', hideBtn);
	}, [animate]);

	useEffect(() => {
    // Без setTimeout нет эффекта плавного появления кнопки. 
    // (На локальной машине без setTimeout все ок.)
		setTimeout(() => { if (!hidden) setAnimate('period__btn_show') }, 10);
	}, [hidden]);

  return (
    <button
      className={`period__btn btn${hidden ? ' _hidden' : ''} ${animate}`}
      onClick={onBtnClick}
      ref={btnRef}
      >
      Отобразить все данные
    </button>
  );
}
