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
										<input type="text" className="form-control" value={ingredient.quantity} />
									</div>
									<button className="btn btn-danger"><i className="fas fa-times"></i></button>
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