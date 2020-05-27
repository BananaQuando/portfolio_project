import React from 'react';
import { IInputDataStore, IInputDataItem } from '../../../stores/InputDataStore/interfaces';
import { inject, observer } from 'mobx-react';
import { observable, action } from 'mobx';
import { IDishIngredient } from '../../../stores/DishStore/interfaces';
import _ from 'lodash';
import IngredientsConstructorItem from './IngredientsConstructorItem';

import "./styles.sass";

interface Props {
	inputID: string,
	content?: IDishIngredient[],
	inputDataStore?: IInputDataStore,
	inputDataItem?: IInputDataItem,
	onChange?: Function,
	reset?: boolean
}

@inject('inputDataStore')
@observer
class IngredientsConstructor extends React.Component <Props> {

	@observable inputDataItem = {} as IInputDataItem;
	@observable onChange = this.props.onChange? this.props.onChange : () => {};
	@observable reset = this.props.reset;
	@observable currentIngrediensList = [] as IDishIngredient[];


	@action componentDidMount() {

		const { inputID, content } = this.props;

		this.inputDataItem = this.props.inputDataStore!.getInputDataStore(inputID, content ? content : '');
		this.currentIngrediensList = this.inputDataItem.inputContent;
	}

	@action resetValues = () => {

		const { inputID, content } = this.props;

		this.inputDataItem = this.props.inputDataStore!.updateInputData(inputID, content);
		this.currentIngrediensList = this.inputDataItem.inputContent;
	}

	
	componentWillReceiveProps(_nextProps: Props){
		
		const { inputID, content } = _nextProps;

		if (this.inputDataItem.inputID !== inputID){

			this.inputDataItem = _nextProps.inputDataStore!.getInputDataStore(inputID, content);
			this.currentIngrediensList = this.inputDataItem.inputContent;
		}

		if (_nextProps.reset){
			this.resetValues();
		}
	}

	@action quantityChangeHandler = (event: any) => {

		const { ingredienId } = event.target.dataset;
		const { value } = event.target;
		_.each(this.currentIngrediensList, (ingredient) => {
			if (ingredient.ingredientID === Number(ingredienId)){
				ingredient.quantity = value;
			}
		});
		this.onChange();
	}

	@action removeIngredient = (ingredienId: number) => {
		this.currentIngrediensList = _.filter(this.currentIngrediensList, (ing) => {
			return ing.ingredientID !== Number(ingredienId);
		});
		this.onChange();
	}

	render() {

		return(
			<div className="ingredients-constructor">
				<div className="ingredients-constructor__list">
					{
						_.map(this.currentIngrediensList, (ingredient, index) => (
							<div key={index} className="ingredients-constructor__item">
								<div className="ingredients-constructor__content">
									<IngredientsConstructorItem IngredientID={ingredient.ingredientID} />
								</div>
								<div className="ingredients-constructor__controls">
									<div className="input-group input-group-sm">
										<span className="input-group-prepend">
											<span className="badge bg-warning">qty:</span>
										</span>
										<input type="text" className="form-control" data-ingredien-id={ingredient.ingredientID} value={ingredient.quantity} onChange={this.quantityChangeHandler} />
									</div>
									<button className="btn btn-danger" onClick={() => {this.removeIngredient(ingredient.ingredientID)}}><i className="fas fa-times"></i></button>
								</div>
							</div>
						))
					}
				</div>
			</div>
		);
	}
}


export default IngredientsConstructor;