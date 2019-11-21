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
		let currency;
		fetch(url)
			.then((res) => res.json())
			.then((out) => {
				for (let i = 0; i < out[0].rates.length; i++) {
					currency = out[0].rates[i].currency.toLowerCase();
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
		value = value.filter((name) => name.toLowerCase().includes(currencyName));
		if (value.length > 5) {
			value = value.slice(0, 5);
		}
	};

	onChanged = (e) => {
		this.setState({
			currency: e.target.value
		});
	};

	render() {
		return (
			<div>
				<div className="header">Currency</div>
				<input onChange={this.onChanged} value={this.state.currency} />
			</div>
		);
	}
}

export default MainPage;
