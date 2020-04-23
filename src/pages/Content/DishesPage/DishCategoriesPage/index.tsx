import React from 'react';
import { ISEOStore } from '../../../../stores/SEOStore/interfaces';
import { inject, observer } from 'mobx-react';
import { observable } from 'mobx';
import Card from '../../../../components/UI/Card';
import { Link } from 'react-router-dom';
import { IDishStore, IDishCategoryList } from '../../../../stores/DishStore/interfaces';


import './styles.sass';
import _ from 'lodash';
import PlaceholderedImage from '../../../../components/Image/PlaceholderedImage';


interface Props {
	seoStore: ISEOStore
	dishStore: IDishStore
}

const SEO = {
	title: 'Dishes categories page',
	icon: <i className='fa fa-birthday-cake icon-gradient bg-ripe-malin'></i>
}

@inject('seoStore', 'dishStore')
@observer
class DishCategoriesPage extends React.Component <Props>{

	@observable dishCategories = {} as IDishCategoryList

	async componentDidMount() {

		this.props.seoStore!.setSEOData(SEO);
		this.dishCategories = await this.props.dishStore.getCategories();
	}

	render() {
		return <>
			<Card>
				<div className="categories">
					{ _.map(this.dishCategories, category => {
						const {id, link, thumb, name, thumbPlaceholder } = category;
						return (
							<div key={id} className='category'>
								<div className="category__thumb">
									<Link to={link}>
										<PlaceholderedImage src={thumb} alt={name} placeholder={thumbPlaceholder} />
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

export default DishCategoriesPage;