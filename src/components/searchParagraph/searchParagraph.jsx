import React from 'react';
import './searchParagraph.scss';

const SearchParagraph = (props) => {
	const { currencyName } = props.value;
	return (
		<button className="search-paragraph-button" onClick={() => props.action(currencyName)}>
			{props.name}
		</button>
	);
};

export default SearchParagraph;
