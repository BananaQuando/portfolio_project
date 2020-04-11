import React from 'react';

class MobileHamburger extends React.Component{

	onClickHandler = (event: any) => {

		const hmb = event.target;
		const appContainer = document.getElementById('app-container');

		hmb.classList.toggle('is-active');
		appContainer!.classList.toggle('sidebar-mobile-open');
	}

	render() {

		return (
			<button onClick={this.onClickHandler} type="button" className="hamburger close-sidebar-btn hamburger--elastic">
				<span className="hamburger-box">
					<span className="hamburger-inner"></span>
				</span>
			</button>
		)
	}
}


export default MobileHamburger;