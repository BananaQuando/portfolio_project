import React from 'react';
import Card from '../../UI/Card';
import FormGroup from '../elements/FormGroup';
import Button from '../../UI/Button';
import { observable } from 'mobx';
import { observer, inject } from 'mobx-react';
import { IUserStore } from '../../../stores/UserStore/interfaces';
import Alert from '../../UI/Alert';
import { Redirect } from 'react-router-dom';

import './styles.sass';

interface Props{
	userStore?: IUserStore
}

@inject('userStore')
@observer
class LoginForm extends React.Component<Props>{

	@observable error = null as null | string;
	@observable redirect = false as boolean;
	@observable inputs = {
		login: '',
		password: '',
	} as { [key: string]: string }

	onInputChangeHandler = (event: any) => {

		const inputName = event.target.name;
		const inputValue = event.target.value;

		this.inputs[inputName] = inputValue;
	}

	onInputFocusHandler = (event: any) => {
		
		this.error = null;
	}

	 onSubmitHandler = async (event: any) => {
		event.preventDefault();
		
		const result = await this.props.userStore!.login(this.inputs);
		if (result.error){
			this.error = result.error;
		}else{
			this.redirect = true;
		}
	}

	render() {

		if (this.redirect) return <Redirect to='/' />

		const {
			login,
			password
		} = this.inputs;

		return(
			<div className="login-wrapper">
				<Card className='main-card'>
					<h5 className="card-title">Welcome</h5>
					<form onSubmit={this.onSubmitHandler} className="">
						<FormGroup>
							<label htmlFor="login">Login</label>
							<input value={login} onFocus={this.onInputFocusHandler} onChange={this.onInputChangeHandler} name="login" id="login" placeholder="Enter email or username" type="text" className="form-control" />
						</FormGroup>
						<FormGroup>
							<label htmlFor="password">Password</label>
							<input value={password} onFocus={this.onInputFocusHandler} onChange={this.onInputChangeHandler} name="password" id="password" placeholder="Enter password" type="password" className="form-control" />
						</FormGroup>
						{ this.error && <Alert className='alert-danger'>{ this.error }</Alert> }
						<Button type='submit'>Submit</Button>
					</form>
				</Card>
			</div>
		);
	}
}

export default LoginForm;