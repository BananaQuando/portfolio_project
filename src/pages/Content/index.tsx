import React from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import { observer } from 'mobx-react';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import HomePage from './HomePage';
import Footer from '../../components/Footer';
import Dishes from './Dishes';
import PageTitle from '../../components/Page/PageTitle';
import Ingredients from './Ingredients';

@observer
class Content extends React.Component {
	render(){
		return (
			<Router>
				<div id="app-container" className="app-container app-theme-white body-tabs-shadow fixed-sidebar fixed-header tabs-line">
					<Header />
					<div className="app-main">
						<Sidebar />
						<div className="app-main__outer">
							<div className="app-main__inner">
								<PageTitle />
								<Switch>
									<Route path='/' exact component={HomePage} />
									<Route path='/ingredients' component={Ingredients} />
									<Route path='/dishes' component={Dishes} />
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
