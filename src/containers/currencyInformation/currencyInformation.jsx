import React from 'react';
import './currencyInformation.scss';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import DisplayPanel from '../../components/displayPanel';

const CurrencyInformation = (props) => {
	return (
		<div>
			<DisplayPanel name={props.currencyName} value={props.currencyValue} />
			<LineChart
				width={1500}
				height={800}
				data={props.data}
				margin={{
					top: 5,
					right: 30,
					left: 20,
					bottom: 5
				}}
			>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis dataKey={props.effectiveDate} />
				<YAxis type="number" domain={[ 'dataMin - 0.05', 'dataMax + 0.05' ]} />
				<Tooltip />
				<Legend verticalAlign="top" height={36} />
				<Line name="Wartość" type="monotone" dataKey={props.mid} stroke="#8884d8" activeDot={{ r: 8 }} />
			</LineChart>
		</div>
	);
};

export default CurrencyInformation;
