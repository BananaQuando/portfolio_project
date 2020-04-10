import React from 'react';
import { inject, observer } from 'mobx-react';
import { IUserStore } from '../stores/UserStore/interfaces';
import { observable } from 'mobx';
import LoadingSpinner from './UI/LoadingSpinner';
import { Route, Redirect } from 'react-router-dom';

interface Props {
	userStore?: IUserStore,
	path: string,
	exact?: boolean
	component: React.ComponentClass
}

@inject('userStore')
@observer
class PrivateRoute extends React.Component <Props>{

	@observable access = false;
	@observable loading = true;

	async componentDidMount(){

		this.access = await this.props.userStore!.checkAuth();
		this.loading = false;
	}

	render(){

		if (this.loading) return <LoadingSpinner />
		
		const {
			path,
			component,
			exact
		} = this.props;

		return (
			this.access ? <Route path={path} exact={exact} component={component} /> : <Redirect to='/auth' />
		)
	}
}

export default PrivateRoute;