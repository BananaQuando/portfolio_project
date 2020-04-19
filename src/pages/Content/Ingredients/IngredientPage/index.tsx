import React from 'react';
import { ISEOStore } from '../../../../stores/SEOStore/interfaces';
import { inject, observer } from 'mobx-react';
import { observable } from 'mobx';
import { IIngredientCategoryList, IIngredientStore, IIngredient } from '../../../../stores/IngredientStore/interfaces';
import Card from '../../../../components/UI/Card';
import { Link } from 'react-router-dom';

import './styles.sass';

interface Props {
	match: {
		params: {
			categoryID: string
			ingredientID: string
		}
	}
	seoStore: ISEOStore
	ingredientStore: IIngredientStore
}

const SEO = {
	title: 'Ingredient Page',
	icon: <i className="fa fa-leaf icon-gradient bg-malibu-beach"></i>
}

@inject('seoStore', 'ingredientStore')
@observer
class IngredientPage extends React.Component <Props>{

	@observable ingredient = {} as IIngredient

	async componentDidMount() {

		const { ingredientID } = this.props.match.params

		this.props.seoStore!.setSEOData(SEO);
		this.ingredient = await this.props.ingredientStore.getIngredient(Number(ingredientID));
		this.props.seoStore.setSEOData({
			icon: <img src={this.ingredient.icon} alt={this.ingredient.name} />,
			title: this.ingredient.name
		})
		console.log(this.ingredient)
	}

	render() {
		return <>
			<div className="container-fluid">
				<div className="row">
					<div className="col-md-9">
						<Card>
							<div className="categories">
								
							</div>
						</Card>
					</div>
					<div className="col-md-3">
						<Card>
							test
						</Card>
					</div>
				</div>
			</div>
			
		</>
	}
}

export default IngredientPage;