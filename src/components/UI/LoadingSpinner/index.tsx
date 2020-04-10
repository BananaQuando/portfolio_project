import React from 'react';
import './styles.sass';

class LoadingSpinner extends React.Component{

	render() {

		return (
			<div className="loading-wrapper">
				<div className="lds-ring"><div></div><div></div><div></div><div></div></div>
			</div>
		);
	}
}

export default LoadingSpinner;