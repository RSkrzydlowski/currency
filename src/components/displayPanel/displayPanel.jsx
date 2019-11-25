import React from 'react';
import './displayPanel.scss';

const DisplayPanel = (props) => {
	return (
		<div className="display-panel-block">
			<p>{props.name}</p>
			<div className="value-block">
				<p className={props.arrow}>{props.sign}</p>
				<p>{props.value}</p>
			</div>
			<p>{props.code}</p>
		</div>
	);
};

export default DisplayPanel;
