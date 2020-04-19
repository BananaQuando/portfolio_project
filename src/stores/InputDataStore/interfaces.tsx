export interface IInputDataStore {
	getInputDataStore: Function,
	createInputDataStore: Function,
	updateInputData: Function,
}

export interface IInputDataItem {
	inputID: string,
	inputContent: string
}

export interface IInputDataList{
	[key: string]: IInputDataItem
}