import React from 'react';
import { observer, inject } from 'mobx-react';
import { observable, action, remove } from 'mobx';
import { IInputDataStore, IInputDataItem } from '../../../stores/InputDataStore/interfaces';
import placeholder from './placeholder.png';
import CustomImageUpload from '../CustomImageUpload';
import FormGroup from '../elements/FormGroup';


interface Props {
	inputID: string,
	content?: { [key: number]: string},
	title?: string,
	inputDataStore?: IInputDataStore,
	inputDataItem?: IInputDataItem,
	onChange?: Function,
	reset?: boolean
}

@inject('inputDataStore')
@observer
export default class CustomMultipleImageUpload extends React.Component <Props> {

	@observable images = {} as {[key: number]: string};
	@observable inputDataItem = {} as IInputDataItem;
	@observable onChange = this.props.onChange? this.props.onChange : () => {};

	stringifyImages(images: string | { [key: number]: string } | undefined) {
		if (typeof images === 'object' && Object.keys(images).length > 0){
			return JSON.stringify(images);
		}else if (typeof images === 'object' || typeof images === 'undefined'){
			return JSON.stringify({0: placeholder});
		}else{
			return images;
		}
	}

	@action componentDidMount(){

		const { inputID, content } = this.props;

		this.inputDataItem = this.props.inputDataStore!.getInputDataStore(inputID, this.stringifyImages(content));
		
		this.images = JSON.parse(this.inputDataItem.inputContent);
	}

	onChangeHandler = () => {

		const { inputID } = this.props;

		const images = {} as { [key: number]: string};

		for (const key in this.images) {
			if (this.images.hasOwnProperty(key)) {
				const imageData = this.props.inputDataStore!.getInputDataStore(`${inputID}[${key}]`);

				images[key] = imageData.inputContent;
			}
		}

		if (Object.keys(images).length === 0) images[0] = placeholder;

		this.inputDataItem.inputContent = this.stringifyImages(images);

		this.onChange();
	}

	componentWillReceiveProps(_nextProps: Props){
		
		const { inputID, content } = _nextProps;

		if (this.inputDataItem.inputID !== inputID){

			this.inputDataItem = _nextProps.inputDataStore!.getInputDataStore(inputID, this.stringifyImages(content));
			this.images = JSON.parse(this.inputDataItem.inputContent);
		}

		if (_nextProps.reset){
			
			const { inputID, content } = this.props;

			this.inputDataItem = this.props.inputDataStore!.updateInputData(inputID, this.stringifyImages(content));

			this.images = JSON.parse(this.inputDataItem.inputContent);
		}
	}

	@action addNewImage = () => {

		const id = new Date().getTime();
		this.images[id] = placeholder;
		this.inputDataItem.inputContent = this.stringifyImages(this.images);
		this.onChange();
	}

	@action removeImage = (index: number) => {

		remove(this.images, String(index))
		console.log(this.images)
		this.inputDataItem.inputContent = this.stringifyImages(this.images);
		this.onChange();
	}

	generateImagesList(images: { [key: number]: string }){

		const { inputID } = this.props;

		const imagesList = [];

		for (const key in images) {
			if (images.hasOwnProperty(key)) {
				const image = images[key];
				imagesList.push(
					<div className='multiple-image__item' key={key}>
						<CustomImageUpload reset={this.props.reset} content={image} onChange={this.onChangeHandler} inputID={`${inputID}[${key}]`} />
						<button onClick={() => { this.removeImage(Number(key))}} className="btn btn-danger"><i className="fas fa-trash-alt"></i></button>
					</div>
				);
			}
		}

		return imagesList;
	}


	render () {
		const { title } = this.props;

		return (
			<FormGroup>
				{ title ? <label>{ title }</label> : ''}
				{ this.generateImagesList(this.images) }
				<button className="btn btn-primary" onClick={this.addNewImage}>Add new image</button>
			</FormGroup>
		);
	}

}