import React from 'react';
import { observer, inject } from 'mobx-react';
import { observable, action } from 'mobx';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, ContentState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { IInputDataStore, IInputDataItem } from '../../../stores/InputDataStore/interfaces';
import FormGroup from '../elements/FormGroup';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './styles.sass';

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
export default class CustomEditor extends React.Component <Props> {

	@observable editorState = EditorState.createEmpty();
	@observable inputDataItem = {} as IInputDataItem;
	@observable onChange = this.props.onChange? this.props.onChange : () => {};
	@observable reset = this.props.reset;

	@action onEditorStateChange = (_editorState: any) => {

		this.editorState = _editorState;
		this.inputDataItem.inputContent = this.convertToHtml(_editorState);
		this.onChange();
	};

	@action componentDidMount(){

		const { inputID, content } = this.props;

		this.inputDataItem = this.props.inputDataStore!.getInputDataStore(inputID, content);
		
		this.editorState = this.convertToState(this.inputDataItem.inputContent);
	}

	@action resetValues = () => {

		const { inputID, content } = this.props;

		this.inputDataItem = this.props.inputDataStore!.updateInputData(inputID, content);
		this.editorState = this.convertToState(this.inputDataItem.inputContent);
	}

	componentWillReceiveProps(_nextProps: Props){
		
		const { inputID, content } = _nextProps;

		if (this.inputDataItem.inputID !== inputID){

			this.inputDataItem = _nextProps.inputDataStore!.getInputDataStore(inputID, content);
			this.editorState = this.convertToState(this.inputDataItem.inputContent);
		}

		if (_nextProps.reset){
			this.resetValues();
		}
	}

	@action convertToHtml(_state: any){

		const rawContentState = convertToRaw(_state.getCurrentContent());
 
		return draftToHtml(rawContentState);
	}

	@action convertToState(_content: any){

		const contentBlock = htmlToDraft(_content);
		const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);

		return EditorState.createWithContent(contentState);
	}

	render (){

		const { inputID, title } = this.props;

		return (
			<FormGroup>
				{ title ? <label htmlFor={inputID}>{ title }</label> : ''}
				<Editor editorState={this.editorState} onEditorStateChange={this.onEditorStateChange} />
			</FormGroup>
		);
	}

}