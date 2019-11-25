import React from 'react';
import './mainPage.scss';
import CurrencyInformation from '../../containers/currencyInformation';
import SearchPanel from '../../containers/searchPanel';

let value = [];
let id = 0;
class MainPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			currencyCode: '',
			currencyName: '',
			displayValue: [],
			value: [],
			currency: '',
			date: [],
			data: [],
			flag: false,
			wrongCurrency: false
		};

		this.init();
		this.helping = this.helping.bind(this);
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
						id: id++,
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

	send = () => {
		const currencyName = this.state.currency.trim();
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
					this.setState({
						currencyCode: currency.currencyCode,
						currencyName: currencyName,
						data: out.rates,
						flag: true,
						wrongCurrency: false
					});
				})
				.catch((err) => {
					throw err;
				});
		} else {
			this.setState({
				wrongCurrency: true
			});
		}
	};

	helping = (currencyName) => {
		this.setState({
			currency: currencyName
		});
		value = [];
	};

	check = () => {
		const currencyName = this.state.currency;
		value = [];
		if (value != null && currencyName.trim().length > 0) {
			value = this.state.value;
			value = value.filter((name) => name.currencyName.toLowerCase().includes(currencyName.trim()));
			if (value.length === 1 && value[0].currencyName === currencyName) {
				value = [];
			} else if (value.length > 5) {
				value = value.slice(0, 5);
			}
		}
	};

	render() {
		this.check();
		let currencyValue, lastCurrencyValue;
		let sign, style;
		if (this.state.data[this.state.data.length - 1]) {
			currencyValue = this.state.data[this.state.data.length - 1].mid;
			lastCurrencyValue = this.state.data[this.state.data.length - 2].mid;
			if (currencyValue > lastCurrencyValue) {
				sign = <i className="fas fa-arrow-up" />;
				style = 'green';
			} else if (currencyValue < lastCurrencyValue) {
				sign = <i className="fas fa-arrow-down" />;
				style = 'red';
			} else {
				sign = '-';
				style = 'gray';
			}
		}
		return (
			<div>
				<div className="header">Waluta</div>
				<p>Wprowadź walutę</p>
				{this.state.wrongCurrency && <p>PODANA WARTOŚĆ JEST NIEPRAWIDŁOWA</p>}
				<input onChange={this.onChanged} value={this.state.currency} />
				<SearchPanel value={value} helper={this.helping} />
				<button onClick={this.send}>sprawdź</button>
				{this.state.flag && (
					<CurrencyInformation
						arrowStyle={style}
						currencyCode={this.state.currencyCode}
						currencySign={sign}
						data={this.state.data}
						effectiveDate="effectiveDate"
						mid="mid"
						currencyName={this.state.currencyName}
						currencyValue={currencyValue}
					/>
				)}
			</div>
		);
	}
}

export default MainPage;
