import React from 'react';
import { observer, inject } from 'mobx-react';
import { observable, action } from 'mobx';
import { IInputDataStore, IInputDataItem } from '../../../stores/InputDataStore/interfaces';
import FormGroup from '../elements/FormGroup';
import Button from '../../UI/Button';
import _ from 'lodash';

interface Props {
	inputID: string,
	content: {
		name: string
		value: string
	}[],
	value?: string,
	title?: string,
	inputDataStore?: IInputDataStore,
	inputDataItem?: IInputDataItem,
	onChange?: Function,
	reset?: boolean
}

@inject('inputDataStore')
@observer
export default class CustomDropdownSelect extends React.Component <Props> {
	@observable inputDataItem = {} as IInputDataItem;
	@observable onChange = this.props.onChange? this.props.onChange : () => {};
	@observable reset = this.props.reset;
	@observable inputValue = '';

	@action componentDidMount(){

		const { inputID, value } = this.props;

		this.inputDataItem = this.props.inputDataStore!.getInputDataStore(inputID, value);
		
		this.inputValue = this.inputDataItem.inputContent;
	}

	toggleDropdown = () => {

		const { inputID } = this.props;

		document.querySelector(`#${inputID}`)?.classList.toggle('show');
		document.querySelector(`#${inputID} .dropdown-menu`)?.classList.toggle('show');
	}

	changeValue = (value: string) => {

		this.inputValue = value;
		this.inputDataItem.inputContent = value;
		
		this.onChange();

		const { inputID } = this.props;
		document.querySelector(`#${inputID}`)?.classList.toggle('show');
		document.querySelector(`#${inputID} .dropdown-menu`)?.classList.toggle('show');
	}

	render (){

		const { inputID, title, content } = this.props;
		const valueData = _.find(content, (el) => {
			return el.value === this.inputValue;
		});

		return (
			<FormGroup>
				{ title ? <label>{ title }</label> : ''}
				<div className="dropdown d-inline-block" id={inputID}>
					<Button type="button" aria-haspopup="true" onClick={this.toggleDropdown} className="btn-primary dropdown-toggle">
						{ valueData ? valueData.name : 'Select' }
					</Button>
					<div role="menu" aria-hidden="true" className="dropdown-menu" x-placement="bottom-left">
						{ content?.map((el, i) => (
							<Button key={i} className="dropdown-item" onClick={() => { this.changeValue(el.value) }} >{el.name}</Button>
						)) }
					</div>
				</div>
			</FormGroup>
		);
	}

}