import { useEffect, useRef, useState } from 'react';
import useAppContext from '../../../../hooks/useAppContext';
import DropDownList from '../../../DropDownList/DropDownList';

export default function CountryFilter({ input, setInput }) {
	const { countriesList, setSelectedCountry, selectedCountry } = useAppContext();
  
  const [ filteredCountriesList, setFilteredCountriesList ] = useState([]);
	const [ showDropDownList, setShowDropDownList ] = useState(false);
	
	const inputEl = useRef(null);

  const handlerOnInputChange = (event) => {
		setInput(event.target.value);
		if (!showDropDownList) setShowDropDownList(true);
	}

	useEffect(() => setInput(selectedCountry), [setInput, selectedCountry]);

	useEffect(() => {
		setFilteredCountriesList(countriesList.filter((country) =>
			country.name
				.toLowerCase()
				.startsWith(input.toLowerCase())
				));
	}, [input, countriesList]);

	const handlerOnInputFocus = () => setShowDropDownList(true);
	const handlerOnInputBlur = () => setTimeout(() => setShowDropDownList(false), 200);
	const handlerOnBtnClick = () => setSelectedCountry(input);

	const handlerOnListItemClick = (country) => {
		setInput(country);
		inputEl.current.focus();
	};
	
	return (
		<div className='country-filter'>
			<input
				className='country-filter__input input'
				value={input}
				onChange={handlerOnInputChange}
				onFocus={handlerOnInputFocus}
				onBlur={handlerOnInputBlur}
				ref={inputEl}
				placeholder='Поиск страны...'
			/>
			<button
				className='country-filter__btn btn'
				onClick={handlerOnBtnClick}
				>
				<img src='./svg/search-icon.svg' alt='Search icon'/>
				<span className='_visually-hidden'>Поиск</span>
			</button>

			<DropDownList 
				showDropDownList={showDropDownList}
				list={input ? filteredCountriesList : countriesList}
				handlerOnListItemClick={handlerOnListItemClick}
				selectedItem={input}
			/>	
		</div>
	);
}
