import React from 'react';
import Card from '../UI/Card';
import FormGroup from './elements/FormGroup';
import Button from '../UI/Button';
import { observable } from 'mobx';
import { observer } from 'mobx-react';

@observer
class LoginForm extends React.Component{

	@observable inputs = {
		login: '',
		password: '',
	} as { [key: string]: string }

	onInputChangeHandler = (event: any) => {

		const inputName = event.target.name;
		const inputValue = event.target.value;

		this.inputs[inputName] = inputValue;
	}

	onSubmitHandler = () => {


	}

	render() {

		const {
			login,
			password
		} = this.inputs;

		return(
			<Card className='main-card'>
				<h5 className="card-title">Controls Types</h5>
				<form onSubmit={this.onSubmitHandler} className="">
					<FormGroup>
						<label htmlFor="login">Login</label>
						<input value={login} onChange={this.onInputChangeHandler} name="login" id="login" placeholder="Enter email or username" type="text" className="form-control" />
					</FormGroup>
					<FormGroup>
						<label htmlFor="password">Password</label>
						<input value={password} onChange={this.onInputChangeHandler} name="password" id="password" placeholder="Enter password" type="password" className="form-control" />
					</FormGroup>
					<Button>Submit</Button>
				</form>
			</Card>
		);
	}
}

export default LoginForm;