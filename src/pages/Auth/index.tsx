import React from 'react';
import LoginForm from '../../components/Forms/LoginForm';
import { IUserStore } from '../../stores/UserStore/interfaces';
import { inject, observer } from 'mobx-react';
import { observable } from 'mobx';
import LoadingSpinner from '../../components/UI/LoadingSpinner';
import { Redirect } from 'react-router-dom';

interface Props{
	userStore?: IUserStore
}

@inject('userStore')
@observer
class Auth extends React.Component <Props>{

	@observable access = false;
	@observable loading = true;

	async componentDidMount(){

		this.access = await this.props.userStore!.checkAuth();
		this.loading = false;
	}

	render() {

		if (this.loading) return <LoadingSpinner />

		return (
			this.access ? <Redirect to='/' /> : <LoginForm />
		);
	}
}

export default Auth;