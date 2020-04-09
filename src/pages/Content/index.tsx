import React from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import { observer } from 'mobx-react';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import HomePage from '../Home';
import Footer from '../../components/Footer';

@observer
class Content extends React.Component {
	render(){
		return (
			<Router>
				<div className="app-container app-theme-white body-tabs-shadow fixed-sidebar fixed-header">
					<Header />
					<div className="app-main">
						<Sidebar />
						<div className="app-main__outer">
							<div className="app-main__inner">
								<Switch>
									<Route path='/' exact component={HomePage} />
								</Switch>
							</div>
							<Footer />
						</div>
					</div>
					
				</div>
			</Router>
		);
	}
}

export default Content;
