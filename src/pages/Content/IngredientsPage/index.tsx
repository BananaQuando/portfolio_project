import React from 'react';
import { ISEOStore } from '../../../stores/SEOStore/interfaces';
import { inject, observer } from 'mobx-react';

interface Props {
	seoStore: ISEOStore
}

const SEO = {
	title: 'Ingredients Page',
	icon: 'fa fa-leaf icon-gradient bg-malibu-beach'
}

@inject('seoStore')
@observer
class IngredientsPage extends React.Component <Props>{

	componentDidMount() {

		this.props.seoStore!.setSEOData(SEO);
	}

	render() {
		return <>
			<div>Ingredients Page</div>
		</>
	}
}

export default IngredientsPage;