import React from 'react';
import { IUserStore } from '../../stores/UserStore/interfaces';
import { inject } from 'mobx-react';
import { Redirect } from 'react-router-dom';

interface Props{
	userStore?: IUserStore
}

@inject('userStore')
class Logout extends React.Component <Props>{


	async componentDidMount(){

		this.props.userStore!.logout();
	}

	render() {

		return (
			<Redirect to='/auth' />
		);
	}
}

export default Logout;