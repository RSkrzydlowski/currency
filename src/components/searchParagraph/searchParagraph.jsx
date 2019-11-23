import React from 'react';
import './searchParagraph.scss';

const SearchParagraph = (props) => {
	return (
		<button className="search-paragraph-button" onClick={props.action}>
			{props.name}
		</button>
	);
};

export default SearchParagraph;
