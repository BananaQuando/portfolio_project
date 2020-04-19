import React from 'react';
import { observer, inject } from 'mobx-react';
import { observable, action } from 'mobx';
import { IInputDataStore, IInputDataItem } from '../../../stores/InputDataStore/interfaces';
import placeholder from './placeholder.png';

import './styles.sass'

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
export default class CustomImageUpload extends React.Component <Props> {

	@observable imageValue = placeholder;
	@observable inputDataItem = {} as IInputDataItem;
	@observable onChange = this.props.onChange? this.props.onChange : () => {};
	@observable reset = this.props.reset;

	@action componentDidMount(){

		const { inputID, content } = this.props;

		this.inputDataItem = this.props.inputDataStore!.getInputDataStore(inputID, content ? content : placeholder);
		
		this.imageValue = this.inputDataItem.inputContent;
	}

	@action onFileChangeHandler = (_event: any) => {

		if (_event.target.files && _event.target.files[0]){
			const imageURL = URL.createObjectURL(_event.target.files[0]);

			this.imageValue = imageURL;
			this.inputDataItem.inputContent = imageURL;
			this.onChange(_event);
		}
	}

	@action resetValues = () => {

		const { inputID, content } = this.props;

		this.inputDataItem = this.props.inputDataStore!.updateInputData(inputID, content);
		this.imageValue = this.inputDataItem.inputContent;
	}

	@action clearInput = (_event: any) => {

		this.imageValue = placeholder;
		this.inputDataItem.inputContent = placeholder;
		this.onChange(_event);
	}

	componentWillUpdate(_nextProps: Props){
		
		const { inputID, content } = _nextProps;

		if (this.inputDataItem.inputID !== inputID){

			this.inputDataItem = _nextProps.inputDataStore!.getInputDataStore(inputID, content);
			this.imageValue = this.inputDataItem.inputContent;
		}

		if (_nextProps.reset){
			this.resetValues();
		}
	}


	render (){

		const { inputID, title } = this.props;

		return (
			<>
				{ title ? <label htmlFor={inputID}>{ title }</label> : ''}
				<div className='form-upload'>
					<label htmlFor={inputID} className='form-upload__image'>
						<img src={this.imageValue} alt={ title ? title : ''} />
					</label>
					<label htmlFor={inputID} className='form-upload__label btn btn-primary btn-md'>Upload Image</label>
					{ this.imageValue !== placeholder ? <button className="btn btn-warning form-upload__label" onClick={this.clearInput}><i className="fas fa-broom"></i></button> : ''}
					<input id={inputID} type="file" className='hidden' accept='.png,.jpg,.jpeg' onChange={this.onFileChangeHandler} />
				</div>
			</>
		);
	}

}