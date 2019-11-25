import React from 'react';
import './displayPanel.scss';

const DisplayPanel = (props) => {
	return (
		<div className="display-panel-block">
			<p>{props.name}</p>
			<p>{props.value}</p>
		</div>
	);
};

export default DisplayPanel;
