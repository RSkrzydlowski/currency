import React from 'react';
import './mainPage.scss';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

let code;
let data = [
	{
		name: 'Page A',
		uv: 4000,
		pv: 2400,
		amt: 2400
	},
	{
		name: 'Page B',
		uv: 3000,
		pv: 1398,
		amt: 2210
	},
	{
		name: 'Page C',
		uv: 2000,
		pv: 9800,
		amt: 2290
	},
	{
		name: 'Page D',
		uv: 2780,
		pv: 3908,
		amt: 2000
	},
	{
		name: 'Page E',
		uv: 1890,
		pv: 4800,
		amt: 2181
	},
	{
		name: 'Page F',
		uv: 2390,
		pv: 3800,
		amt: 2500
	},
	{
		name: 'Page G',
		uv: 3490,
		pv: 4300,
		amt: 2100
	}
];
class MainPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			value: [],
			currency: '',
			date: [],
			data: [],
			flag: false
		};
		this.urlB = 'http://api.nbp.pl/api/exchangerates/tables/B/';
		this.index = null;
		this.init();
	}

	init = () => {
		let value = [];
		this.generateTable('A', value);
		this.generateTable('B', value);
		setTimeout(() => {
			this.setState({ value: value });
		}, 1000);
	};

	generateTable = (letter, value) => {
		const url = `http://api.nbp.pl/api/exchangerates/tables/${letter}/`;
		let currencyName, currencyCode;
		fetch(url)
			.then((res) => res.json())
			.then((out) => {
				for (let i = 0; i < out[0].rates.length; i++) {
					currencyName = out[0].rates[i].currency.toLowerCase();
					currencyCode = out[0].rates[i].code;
					const currency = {
						currencyName: currencyName,
						currencyCode: currencyCode,
						table: letter
					};
					value.push(currency);
				}
			})
			.catch((err) => {
				throw err;
			});
	};

	componentDidUpdate = () => {
		let value = this.state.value;
		const currencyName = this.state.currency;
		value = value.filter((name) => name.currencyName.toLowerCase().includes(currencyName));
		if (value.length > 5) {
			value = value.slice(0, 5);
		}
	};

	onChanged = (e) => {
		this.setState({
			currency: e.target.value
		});
	};

	generateDate = () => {
		const date = new Date();
		const startDate = {
			year: date.getFullYear(),
			month: date.getMonth() + 1,
			date: date.getDate()
		};
		const year = date.getMonth() === 0 ? date.getFullYear() - 1 : date.getFullYear();
		const month = date.getMonth() === 0 ? 11 : date.getMonth();
		const beforeDate = {
			year: year,
			month: month,
			date: date.getDate()
		};
		const startDateText = `${startDate.year}-${startDate.month}-${startDate.date}`;
		const beforeDateText = `${beforeDate.year}-${beforeDate.month}-${beforeDate.date}`;
		return {
			startDateText,
			beforeDateText
		};
	};

	check = () => {
		const currencyName = this.state.currency;
		const index = this.state.value
			.map((currency) => {
				return currency.currencyName;
			})
			.indexOf(currencyName);

		if (index != -1) {
			const effectiveDate = [];
			const date = this.generateDate();
			const currency = this.state.value[index];
			const url = `http://api.nbp.pl/api/exchangerates/rates/${currency.table}/${currency.currencyCode}/${date.beforeDateText}/${date.startDateText}/`;
			fetch(url)
				.then((res) => res.json())
				.then((out) => {
					console.log('BLA');
					console.log(out);
					console.log(out.rates.effectiveDate);
					for (let i = 0; i < out.rates.length; i++) {
						effectiveDate.push(out.rates[i].effectiveDate);
					}
					console.log('TDSDFGDFFFD');
					console.log(effectiveDate);
					data = out.rates;
					code = out.code;
					this.setState({
						date: out,
						data: effectiveDate,
						flag: true
					});
				})
				.catch((err) => {
					throw err;
				});
		} else {
			console.log('Podana waluta nie istnieje');
		}
	};

	render() {
		console.log('RATES');
		console.log(data);
		return (
			<div>
				<div className="header">Currency</div>
				<input onChange={this.onChanged} value={this.state.currency} />
				<button onClick={this.check}>sprawdź</button>
				{this.state.flag && (
					<LineChart
						width={1500}
						height={800}
						data={data}
						margin={{
							top: 5,
							right: 30,
							left: 20,
							bottom: 5
						}}
					>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis dataKey="effectiveDate" />
						<YAxis type="number" domain={[ 'dataMin - 0.05', 'dataMax + 0.05' ]} />
						<Tooltip />
						<Legend verticalAlign="top" height={36} />
						<Line name="Wartość" type="monotone" dataKey="mid" stroke="#8884d8" activeDot={{ r: 8 }} />
					</LineChart>
				)}
			</div>
		);
	}
}

export default MainPage;
