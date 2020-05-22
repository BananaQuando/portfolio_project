import React from 'react';
import _ from 'lodash';
import { ITab } from './interfaces';
import TabButton from './TabButton';

interface Props{
	className?: string,
	id?: string,
	headerClass?: string,
	title?: string,
	tabs?: ITab[],
	bodyClass?: string,
}

class Card extends React.Component <Props> {

	id = 0 as number;

	componentDidMount() {

		this.id = _.random(0, 100000);
	}

	render() {

		const {
			className,
			id,
			bodyClass,
			title,
			tabs
		} = this.props;

		return (
			<div id={id} data-id={this.id} className={`card ${className ? className : ''}`}>
				{ tabs || title ? 
					<div className={`card-header ${className ? className : ''}`}>
						{ title }
						{ tabs && 
							<div className="btn-actions-pane-right">
								<div role="group" className="btn-group-sm nav btn-group">
									{ _.map(tabs, (tab, index) => (
										<TabButton key={ index } link={ tab.href } active={index === 0} name={tab.name} tabsID={tab.tabsID} />
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