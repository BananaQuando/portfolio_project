import React from 'react';
import { ISEOStore } from '../../../../stores/SEOStore/interfaces';
import { inject, observer } from 'mobx-react';
import { observable } from 'mobx';
import { IIngredientCategoryList, IIngredientStore } from '../../../../stores/IngredientStore/interfaces';
import Card from '../../../../components/UI/Card';
import { Link } from 'react-router-dom';

import './styles.sass';

interface Props {
	seoStore: ISEOStore
	ingredientStore: IIngredientStore
}

const SEO = {
	title: 'Ingredients Page',
	icon: 'fa fa-leaf icon-gradient bg-malibu-beach'
}

@inject('seoStore', 'ingredientStore')
@observer
class IngredientPage extends React.Component <Props>{

	@observable ingredientCategories = {} as IIngredientCategoryList

	async componentDidMount() {

		this.props.seoStore!.setSEOData(SEO);
		this.ingredientCategories = await this.props.ingredientStore.getCategories();
	}

	generateCategoryList = (categories: IIngredientCategoryList) => {

		const result = [];

		for (const key in categories) {
			if (categories.hasOwnProperty(key)) {
				const category = categories[key];
				result.push(
					<div key={category.id} className='category'>
						<div className="category__thumb">
							<Link to={category.link}>
								<img src={category.thumb} alt={category.name} />
							</Link>
						</div>
						<Link to={category.link} className="category__link">{category.name}</Link>
					</div>
				);
			}
		}

		return result;
	}

	render() {
		return <>
		IngredientPage
			<Card>
				<div className="categories">
					{ Object.keys(this.ingredientCategories).length > 0 &&  this.generateCategoryList(this.ingredientCategories) }
				</div>
			</Card>
		</>
	}
}

export default IngredientPage;