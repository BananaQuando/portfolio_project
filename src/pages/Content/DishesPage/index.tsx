import React from 'react';
import { ISEOStore } from '../../../stores/SEOStore/interfaces';
import { inject, observer } from 'mobx-react';

interface Props {
	seoStore: ISEOStore
}

const SEO = {
	title: 'Dishes Page',
	icon: 'fa fa-birthday-cake icon-gradient bg-ripe-malin'
}

@inject('seoStore')
@observer
class DishesPage extends React.Component <Props>{

	componentDidMount() {

		this.props.seoStore!.setSEOData(SEO);
	}

	render() {
		return <div>Dishes Page</div>
	}
}

export default DishesPage;