import React from 'react';
import { ISEOStore } from '../../../stores/SEOStore/interfaces';
import { inject, observer } from 'mobx-react';
import { Helmet } from 'react-helmet';

import './styles.sass'


interface Props {
	seoStore?: ISEOStore
}


@inject('seoStore')
@observer
class PageTitle extends React.Component <Props>{

	render() {
		
		const { title, description, icon } = this.props.seoStore!.SEOData;

		return <>
			<Helmet>
				{ title && <title> { title } </title> }
			</Helmet>
			<div className="app-page-title">
				<div className="page-title-wrapper">
					<div className="page-title-heading">
						{ icon && <div className="page-title-icon">{ icon }</div> }
						<div> { title }
							{ description && <div className="page-title-subheading">{ description }</div> }
						</div>
					</div>
				</div>
			</div>
		</>
	}
}

export default PageTitle;