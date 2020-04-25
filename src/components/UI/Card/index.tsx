import React from 'react';
import _ from 'lodash';

interface Props{
	className?: string,
	id?: string,
	headerClass?: string,
	title?: string,
	tabs?: {
		name: string
		href: string
		className?: string
	}[],
	bodyClass?: string,
}

class Card extends React.Component <Props>{

	render() {

		const {
			className,
			id,
			bodyClass,
			title,
			tabs
		} = this.props;

		return (
			<div id={id} className={`card ${className ? className : ''}`}>
				{ tabs || title ? 
					<div className={`card-header ${className ? className : ''}`}>
						{ title }
						{ tabs && 
							<div className="btn-actions-pane-right">
								<div role="group" className="btn-group-sm nav btn-group">
									{ _.map(tabs, (tab, index) => (
										<a key={index} data-toggle="tab" href={ tab.href } className={ tab.className ? tab.className : 'btn-shadow btn btn-primary show' }>{ tab.name }</a>
									)) }
								</div>
							</div>
						}
					</div>
				: ''}
				<div className={`card-body ${bodyClass ? bodyClass : ''}`}>
					{ tabs && tabs.length > 0 ? 
						<div className="tab-content">
							{ this.props.children }
						</div>
					: 
						this.props.children }
				</div>
			</div>
		);
	}
}

export default Card;