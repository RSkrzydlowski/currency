import React from 'react';
import './searchPanel.scss';

import SearchParagraph from '../../components/searchParagraph';

const SearchPanel = (props) => {
	const data = props.data;

	const Items = data.map((data) => (
		<SearchParagraph key={data.id} action={props.helper} data={data.data} name={data.currencyName} />
	));

	return <div className="search-panel-block">{Items}</div>;
};

export default SearchPanel;
