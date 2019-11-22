import React from 'react';
import './mainPage.scss';

class MainPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			value: [],
			currency: ''
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
			const date = this.generateDate();
			const currency = this.state.value[index];
			const url = `http://api.nbp.pl/api/exchangerates/rates/${currency.table}/${currency.currencyCode}/${date.beforeDateText}/${date.startDateText}/`;
			fetch(url)
				.then((res) => res.json())
				.then((out) => {
					console.log(out);
				})
				.catch((err) => {
					throw err;
				});
		} else {
			console.log('Podana waluta nie istnieje');
		}
	};

	render() {
		return (
			<div>
				<div className="header">Currency</div>
				<input onChange={this.onChanged} value={this.state.currency} />
				<button onClick={this.check}>sprawdź</button>
			</div>
		);
	}
}

export default MainPage;
