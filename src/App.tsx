import React from 'react';
import './Styles';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import { observer } from 'mobx-react';
import Content from './pages/Content';
import Auth from './pages/Auth';


@observer
class App extends React.Component {
	render(){
		return (
			<Router>
				<Switch>
					<Route path='/auth' exact component={Auth} />
					<Route path='/' component={Content} />
				</Switch>
			</Router>
		);
	}
}

export default App;
