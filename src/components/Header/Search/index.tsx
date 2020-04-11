import React from 'react';
import './styles.sass';


class Search extends React.Component{

	onClickHandler = (event: any) => {

		document.getElementById('search')!.classList.toggle('active');
	}

	render() {

		return (
			<div className="search-wrapper" id="search">
				<div className="input-holder">
					<input type="text" className="search-input" placeholder="Type to search" />
					<button onClick={this.onClickHandler} className="search-icon button"><span></span></button>
				</div>
				<button onClick={this.onClickHandler} className="close button"></button>
			</div>
		)
	}
}


export default Search;