import React from 'react';
import SearchParagraph from '../../components/searchParagraph';

const SearchPanel = (props) => {
	const data = props.data;

	const Items = data.map((data) => <SearchPanel key={data.code} name={data.currency} />);

	return { Items };
};

export default SearchPanel;
