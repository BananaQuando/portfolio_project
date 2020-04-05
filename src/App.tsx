import React from 'react';
import './Styles';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import { observer } from 'mobx-react';
import HomePage from './pages/Home';

@observer
class App extends React.Component {
	render(){
		return (
			<Router>
				<div className="App">
					<header className="App-header">
						<p>
							Edit <code>src/App.tsx</code> and save to reload.
						</p>
						<a
							className="App-link"
							href="https://reactjs.org"
							target="_blank"
							rel="noopener noreferrer"
						>
							earn React
						</a>
					</header>
					<Switch>
						<Route path='/' exact component={HomePage} />
					</Switch>
				</div>
			</Router>
		);
	}
}

export default App;
