import React from 'react';
import { Switch, Route } from 'react-router-dom';
import DishCategoriesPage from './DishCategoriesPage';
import DishesPage from './DishesPage';
import DishPage from './DishPage';


const rootPath = '/dishes';

class Dishes extends React.Component{

	render() {
		return (
			<Switch>
				<Route path={`${rootPath}`} exact component={DishCategoriesPage} />
				<Route path={`${rootPath}/:categoryID`} exact component={DishesPage} />
				<Route path={`${rootPath}/:categoryID/:dishID`} exact component={DishPage} />
			</Switch>
		)
	}
}

export default Dishes;