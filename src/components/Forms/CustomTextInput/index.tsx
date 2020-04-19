import React from 'react';
import { observer, inject } from 'mobx-react';
import { observable, action } from 'mobx';
import { IInputDataStore, IInputDataItem } from '../../../stores/InputDataStore/interfaces';
import FormGroup from '../elements/FormGroup';

interface Props {
	inputID: string,
	content?: string,
	title?: string,
	inputDataStore?: IInputDataStore,
	inputDataItem?: IInputDataItem,
	onChange?: Function,
	reset?: boolean
}

@inject('inputDataStore')
@observer
export default class CustomTextInput extends React.Component <Props> {

	@observable inputValue = '';
	@observable inputDataItem = {} as IInputDataItem;
	@observable onChange = this.props.onChange? this.props.onChange : () => {};

	@action componentDidMount(){

		const { inputID, content } = this.props;

		this.inputDataItem = this.props.inputDataStore!.getInputDataStore(inputID, content);
		
		this.inputValue = this.inputDataItem.inputContent;
	}

	@action onContentChangeHandler = (_event: any) => {

		this.inputValue = _event.target.value;
		this.inputDataItem.inputContent = _event.target.value;
		this.onChange(_event);
	};

	@action resetValues = () => {

		const { inputID, content } = this.props;

		this.inputDataItem = this.props.inputDataStore!.updateInputData(inputID, content);
		this.inputValue = this.inputDataItem.inputContent;
	}

	componentWillUpdate(_nextProps: Props){

		const { inputID, content } = _nextProps;

		if (this.inputDataItem.inputID !== inputID){

			this.inputDataItem = this.props.inputDataStore!.getInputDataStore(inputID, content);
			this.inputValue = this.inputDataItem.inputContent;
		}

		if (_nextProps.reset) {
			this.resetValues();
		}
	}


	render (){

		const { inputID, title } = this.props;

		return (
			<FormGroup>
				{ title ? <label htmlFor={inputID}>{ title }</label> : ''}
				<input type='test' className='form-control' id={inputID} value={this.inputValue} onChange={this.onContentChangeHandler} />
			</FormGroup>
		);
	}

}