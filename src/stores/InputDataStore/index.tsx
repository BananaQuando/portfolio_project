import {
	observable,
	action,
	// computed
} from "mobx";
import { IInputDataItem, IInputDataList, IInputDataStore } from './interfaces'



export default class InputDataStore implements IInputDataStore {

	@observable inputsList = {} as IInputDataList;

	@action getInputDataStore(inputID: string, inputContent: string = '') {

		if(this.inputsList[inputID]){
			
			return this.inputsList[inputID];
		}else{

			this.inputsList[inputID] = this.createInputDataStore(inputID, inputContent);
			return this.inputsList[inputID];
		}
	}

	@action updateInputData(inputID: string, inputContent: string = '') {

		if(this.inputsList[inputID]){
			
			this.inputsList[inputID].inputContent = inputContent;

			return this.inputsList[inputID];
		}else{

			this.inputsList[inputID] = this.createInputDataStore(inputID, inputContent);
			return this.inputsList[inputID];
		}
	}

	@action createInputDataStore(inputID: string, inputContent: string):IInputDataItem {
		
		return {
			inputID,
			inputContent
		}
	}

}