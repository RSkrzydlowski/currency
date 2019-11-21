import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import MainPage from './pages/mainPage';
import './style.scss';

class App extends React.Component {
	render() {
		return (
			<BrowserRouter>
				<MainPage />
			</BrowserRouter>
		);
	}
}

export default App;
