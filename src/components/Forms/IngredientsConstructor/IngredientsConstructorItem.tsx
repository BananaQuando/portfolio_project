import React from 'react';
import { inject, observer } from 'mobx-react';
import { observable, action } from 'mobx';
import { IIngredientStore, IIngredient } from '../../../stores/IngredientStore/interfaces';
import { Link } from 'react-router-dom';

interface Props {
	IngredientID: number,
	ingredientStore?: IIngredientStore
}

@inject('ingredientStore')
@observer
class IngredientsConstructorItem extends React.Component <Props> {

	@observable ingredient = {} as IIngredient;


	@action async componentDidMount() {

		const { IngredientID } = this.props;

		this.ingredient = await this.props.ingredientStore!.getIngredient(IngredientID);
	}

	render() {

		const { thumb, name, link } = this.ingredient;

		return(
			<div className="ingredient-item">
				<Link to={link} className="ingredient-item__image">
					<img src={thumb} alt={name} />
				</Link>
				<Link className="ingredient-item__name" to={link}>{name}</Link>
			</div>
		);
	}
}


export default IngredientsConstructorItem;