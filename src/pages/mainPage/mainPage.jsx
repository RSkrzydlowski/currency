import React from 'react';
import './mainPage.scss';

class MainPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			value: []
		};
		this.urlB = 'http://api.nbp.pl/api/exchangerates/tables/B/';

		this.init();
	}

	init = () => {
		const value = [];
		this.generateTable('A', value);
		this.generateTable('B', value);
		console.log(value);
		// this.setState((prevState) => ({}));
	};

	generateTable = (letter, value) => {
		const url = `http://api.nbp.pl/api/exchangerates/tables/${letter}/`;
		fetch(url)
			.then((res) => res.json())
			.then((out) => {
				// console.log(out);
				for (let i = 0; i < out[0].rates.length; i++) {
					value.push(out[0].rates[i].currency);
					// this.setState((prevState) ;value.push(out[0].rates[i].currency)
					// new Information(out[0].rates[i].code, tableInformation, letter);
				}
				// console.log(out[0].rates[0].currency);
				// console.log(value);
			})
			.catch((err) => {
				throw err;
			});
	};

	render() {
		console.log('FSD');
		console.log(this.state.value);
		return (
			<div>
				<div className="header">Currency</div>
			</div>
		);
	}
}

export default MainPage;
