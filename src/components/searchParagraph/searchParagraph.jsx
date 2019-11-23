import React from 'react';

const SearchParagraph = (props) => {
	return <button onClick={props.action}>{props.name}</button>;
};

export default SearchParagraph;
