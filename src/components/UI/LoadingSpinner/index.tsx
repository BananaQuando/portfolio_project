import React from 'react';
import './styles.sass';

interface Props {
	boxed?: boolean
}

class LoadingSpinner extends React.Component <Props>{

	render() {
		const { boxed } = this.props;
		return (
			<div className={`loading-wrapper ${ boxed ? 'boxed' : ''}`}>
				<div className="lds-ring"><div></div><div></div><div></div><div></div></div>
			</div>
		);
	}
}

export default LoadingSpinner;