import React from 'react';
import { ISEOStore } from '../../../../stores/SEOStore/interfaces';
import { inject, observer } from 'mobx-react';
import { observable } from 'mobx';
import { IIngredientCategoryList, IIngredientStore } from '../../../../stores/IngredientStore/interfaces';
import Card from '../../../../components/UI/Card';
import { Link } from 'react-router-dom';

import './styles.sass';
import _ from 'lodash';

interface Props {
	seoStore: ISEOStore
	ingredientStore: IIngredientStore
}

const SEO = {
	title: 'Ingredient categories page',
	icon: 'fa fa-leaf icon-gradient bg-malibu-beach'
}

@inject('seoStore', 'ingredientStore')
@observer
class IngredientCategoriesPage extends React.Component <Props>{

	@observable ingredientCategories = {} as IIngredientCategoryList

	async componentDidMount() {

		this.props.seoStore!.setSEOData(SEO);
		this.ingredientCategories = await this.props.ingredientStore.getCategories();
	}

	render() {
		return <>
			<Card>
				<div className="categories">
					{ _.map(this.ingredientCategories, category => {
						const {id, link, thumb, name} = category;
						return (
							<div key={id} className='category'>
							<div className="category__thumb">
									<Link to={link}>
										<img src={thumb} alt={name} />
									</Link>
								</div>
								<Link to={link} className="category__link">{name}</Link>
							</div>
						)
					}) }
				</div>
			</Card>
		</>
	}
}

export default IngredientCategoriesPage;