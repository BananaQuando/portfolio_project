import React from 'react';
import { ISEOStore } from '../../../../stores/SEOStore/interfaces';
import { inject, observer } from 'mobx-react';
import { observable } from 'mobx';
import { IIngredientStore, IIngredientCategory, IIngredientList } from '../../../../stores/IngredientStore/interfaces';
import Card from '../../../../components/UI/Card';
import { Link } from 'react-router-dom';

import './styles.sass';

interface Props {
	match: {
		params: {
			categoryID: string
		}
	}
	seoStore: ISEOStore
	ingredientStore: IIngredientStore
}

const SEO = {
	title: 'Ingredient',
	icon: 'fa fa-leaf icon-gradient bg-malibu-beach'
}

@inject('seoStore', 'ingredientStore')
@observer
class IngredientsPage extends React.Component <Props>{

	@observable ingredientCategory = {} as IIngredientCategory
	@observable CategoryIngredients = {} as IIngredientList

	async componentDidMount() {

		const { categoryID } = this.props.match.params;

		this.props.seoStore.setSEOData(SEO);
		this.ingredientCategory = await this.props.ingredientStore.getCategory(Number(categoryID));
		this.props.seoStore.setSEOData( { icon: SEO.icon, title: this.ingredientCategory.name } );

		this.CategoryIngredients = await this.props.ingredientStore.getIngredients(Number(categoryID));
	}

	generateIngredientsList = (ingredients: IIngredientList) => {
		const result = [] as any[];

		for (const key in ingredients) {
			if (ingredients.hasOwnProperty(key)) {
				const ingredient = ingredients[key];

				const { id, link, image, name, total } = ingredient;

				result.push(
					<div key={id} className="ingredient">
						<div className="ingredient__thumb">
							<Link to={link}>
								<img src={image} alt={name} />
							</Link>
						</div>
						<div className="ingredient__content">
							<Link to={link} className='ingredient__link'>{ name }</Link>
							<div className="ingredient__total">{ total }</div>
						</div>
					</div>
				);
			}
		}

		return result;
	}



	render() {
		return <>
			<Card>
				<div className="ingredients">
					{ Object.keys(this.CategoryIngredients).length && this.generateIngredientsList(this.CategoryIngredients) }
				</div>
			</Card>
		</>
	}
}

export default IngredientsPage;