import React from 'react';
import { ISEOStore } from '../../../../stores/SEOStore/interfaces';
import { inject, observer } from 'mobx-react';
import { observable } from 'mobx';
import Card from '../../../../components/UI/Card';
import { Link } from 'react-router-dom';
import PlaceholderedImage from '../../../../components/Image/PlaceholderedImage';
import { IDishStore, IDishCategory, IDishList } from '../../../../stores/DishStore/interfaces';

import './styles.sass';
import _ from 'lodash';


interface Props {
	match: {
		params: {
			categoryID: string
		}
	}
	seoStore: ISEOStore
	dishStore: IDishStore
}

const SEO = {
	title: 'Dishes category',
	icon: <i className='fa fa-leaf icon-gradient bg-malibu-beach'></i>
}

@inject('seoStore', 'dishStore')
@observer
class DishesPage extends React.Component <Props>{

	@observable dishesCategory = {} as IDishCategory
	@observable categoryDishes = {} as IDishList

	async componentDidMount() {

		const { categoryID } = this.props.match.params;

		this.props.seoStore.setSEOData(SEO);
		this.dishesCategory = await this.props.dishStore.getCategory(Number(categoryID));
		this.props.seoStore.setSEOData( { icon: SEO.icon, title: this.dishesCategory.name } );

		this.categoryDishes = await this.props.dishStore.getDishes(Number(categoryID));
		console.log(this.categoryDishes)
	}


	render() {
		return (
			<Card>
				<div className="ingredients">
					{ _.map(this.categoryDishes, dish => {
						const { id, link, thumb, name, thumbPlaceholder } = dish;
						return (
							<div key={id} className="ingredient">
								<div className="ingredient__thumb">
									<Link to={link}>
										<PlaceholderedImage src={thumb} alt={name} placeholder={thumbPlaceholder} />
									</Link>
								</div>
								<div className="ingredient__content">
									<Link to={link} className='ingredient__link'>{ name }</Link>
								</div>
							</div>
						)
					})}
				</div>
			</Card>
		)
	}
}

export default DishesPage;