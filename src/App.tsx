import React from 'react';
import './Styles';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import { observer } from 'mobx-react';
import Content from './pages/Content';
import Auth from './pages/Auth';
import PrivateRoute from './components/PrivateRoute';
import Logout from './pages/Content/Logout';
import Notifications from './components/UI/Notification';


@observer
class App extends React.Component {
	render(){
		return (
			<>
				<Router>
					<Switch>
						<Route path='/auth' exact component={Auth} />
						<Route path='/logout' exact component={Logout} />
						<PrivateRoute path='/' component={Content} />
					</Switch>
				</Router>
				<Notifications />
			</>
		);
	}
}

export default App;
