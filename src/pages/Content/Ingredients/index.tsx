import React from 'react';
import { Route, Switch } from 'react-router-dom';
import IngredientCategoriesPage from './IngredientCategoriesPage';
import IngredientsPage from './IngredientsPage';
import IngredientPage from './IngredientPage';


const rootPath = '/ingredients';

class Ingredients extends React.Component{


	render() {
		return <>
			<Switch>
				<Route path={`${rootPath}`} exact component={IngredientCategoriesPage} />
				<Route path={`${rootPath}/:categoryID`} exact component={IngredientsPage} />
				<Route path={`${rootPath}/:categoryID/:ingredientID`} exact component={IngredientPage} />
			</Switch>
		</>
	}
}

export default Ingredients;