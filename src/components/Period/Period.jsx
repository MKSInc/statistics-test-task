import { useEffect, useState } from 'react';
import useAppContext from '../../hooks/useAppContext';
import DateInput from './DateInput';
import BtnReset from './BtnReset';
import './period.css';

function tl(date) {
	return date.toLocaleDateString();
}

export default function Period() {
	const { date, setDate } = useAppContext();
	const [btnHidden, setBtnHidden] = useState(true);

	useEffect(() => {
		if (!date) return;
		if (tl(date.start) === tl(date.min) && tl(date.end) === tl(date.max)) setBtnHidden(true);
		else setBtnHidden(false);
	}, [date]);

	const onBtnClick = () => {
		setDate((prevDate) => ({ ...prevDate, start: prevDate.min, end: prevDate.max }));
	};

	return (
		<>
			{
				date
				?
				<div className='period'>
					<span className='period__item-1'>Период </span>
					<span className='period__inputs'>
						от <DateInput name='start' /> до <DateInput name='end' />
					</span>
					<BtnReset btnHidden={btnHidden} onBtnClick={onBtnClick} />
				</div>
				:
				null
			}
		</>
	);
}
