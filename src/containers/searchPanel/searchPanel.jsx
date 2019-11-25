import React from 'react';
import './searchPanel.scss';

import SearchParagraph from '../../components/searchParagraph';

const SearchPanel = (props) => {
	const value = props.value;

	const Items = value.map((value) => (
		<SearchParagraph key={value.id} action={props.helper} value={value} name={value.currencyName} />
	));

	return <div className="search-panel-block">{Items}</div>;
};

export default SearchPanel;
