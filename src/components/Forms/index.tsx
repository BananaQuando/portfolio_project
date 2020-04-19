import React from 'react';
import { observer } from 'mobx-react';
import CustomTextInput from './CustomTextInput';
import CustomEditor from './CustomEditor';
import CustomImageUpload from './CustomImageUpload';
import CustomMultipleImageUpload from './CustomMultipleImageUpload';
import { observable } from 'mobx';
import withLoader from '../../HOC/WithLoader';

interface Props {
	inputs: IInput[],
	resetForm?: boolean,
	onInputsChange?: Function,
	loading?: boolean
}

export interface IInput {
	inputType: string,
	inputID: string,
	inputValue: any,
	inputName: string,
	title?: string
}

@observer
class Form extends React.Component <Props> {

	@observable onInputsChange = this.props.onInputsChange ? this.props.onInputsChange : () => {};

	createInput = (input: IInput) => {

		switch(input.inputType){
			case 'text':
				return (<CustomTextInput inputID={input.inputID} content={input.inputValue} reset={this.props.resetForm} onChange={this.inputChangeListener} />);
			case 'editor':
				return (<CustomEditor inputID={input.inputID} content={input.inputValue} reset={this.props.resetForm} onChange={this.inputChangeListener} />);
			case 'image':
				return (<CustomImageUpload inputID={input.inputID} content={input.inputValue} reset={this.props.resetForm} onChange={this.inputChangeListener} />);
			case 'multiple-image':
				return (<CustomMultipleImageUpload inputID={input.inputID} content={input.inputValue} reset={this.props.resetForm} onChange={this.inputChangeListener} />);
		}
	}

	inputChangeListener = () => {

		this.onInputsChange();
	}

	render (){

		const { inputs } = this.props;

		return (
			inputs.map((input: IInput, index) => {

				const { title, inputID } = input;

				return (
					<div key={index} className="form-group">
						{ title && <label htmlFor={inputID}>{ title }</label> }
						{ this.createInput(input) }
					</div>
				);
			})
		);
	}
}

export default withLoader(Form);