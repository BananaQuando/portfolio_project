import React from 'react';
import { ISEOStore } from '../../../../stores/SEOStore/interfaces';
import { inject, observer } from 'mobx-react';
import { observable, action } from 'mobx';
import { IIngredientStore, IIngredient } from '../../../../stores/IngredientStore/interfaces';
import Card from '../../../../components/UI/Card';
import Form from '../../../../components/Forms';
import { IInput } from '../../../../components/Forms';
import { IInputDataStore } from '../../../../stores/InputDataStore/interfaces';


import './styles.sass';
import Button from '../../../../components/UI/Button';

interface Props {
	match: {
		params: {
			categoryID: string
			ingredientID: string
		}
	}
	seoStore: ISEOStore
	ingredientStore: IIngredientStore
	inputDataStore: IInputDataStore
}

const SEO = {
	title: 'Ingredient Page',
	icon: <i className="fa fa-leaf icon-gradient bg-malibu-beach"></i>
}

@inject('seoStore', 'ingredientStore', 'inputDataStore')
@observer
class IngredientPage extends React.Component <Props> {
	@observable reset = false;
	@observable resetForm = false;
	@observable loading = true;

	@observable inputs = [] as IInput[];

	@observable ingredient = {} as IIngredient;

	@action procesPageData = (ingredient: IIngredient) => {

		return {
			inputs: [
				{
					inputType: 'text',
					inputID: `ingredient_${ingredient.id}_name`,
					inputName: 'name',
					inputValue: ingredient.name,
					title: 'Ingredient name'
				},
				{
					inputType: 'text',
					inputID: `ingredient_${ingredient.id}_quantity`,
					inputName: 'quantity',
					inputValue: ingredient.quantity,
					title: 'Quantity'
				},
				{
					inputType: 'image',
					inputID: `category_${ingredient.id}_image`,
					inputValue: ingredient.thumb,
					inputName: 'image',
					title: 'Image'
				},
			]
		}
	}

	@action setReset = () => {
		this.reset = true;
	}

	@action setResetForm = () => {

		this.resetForm = true;
		this.reset = false;
		setTimeout(() => {this.resetForm = false;}, 0);
	}

	@action saveForm = async () => {

		this.loading = true;

		for (let i = 0; i < this.inputs.length; i++){

			const input = this.inputs[i];

			if (this.ingredient.hasOwnProperty(input.inputName)) {
				const inputData = await this.props.inputDataStore.getInputDataStore(input.inputID);
				// @ts-ignore
				this.ingredient[input.inputName] = inputData.inputContent
			}
		}

		this.ingredient = await this.props.ingredientStore.saveIngredient(this.ingredient);

		this.props.seoStore.setSEOData({
			icon: this.ingredient.icon ? <img src={this.ingredient.icon} alt={this.ingredient.name} /> : '',
			title: this.ingredient.name
		});

		this.loading = false;
		this.reset = false;
	}

	async componentDidMount() {

		const { ingredientID } = this.props.match.params

		this.props.seoStore!.setSEOData(SEO);
		this.ingredient = await this.props.ingredientStore.getIngredient(Number(ingredientID));
		this.props.seoStore.setSEOData({
			icon: this.ingredient.icon ? <img src={this.ingredient.icon} alt={this.ingredient.name} /> : '',
			title: this.ingredient.name
		});

		const PageData = this.procesPageData(this.ingredient);
		this.inputs = PageData.inputs;


		this.loading = false;
	}

	async componentWillReceiveProps(nextProps: Props){

		const { ingredientID } = nextProps.match.params

		nextProps.seoStore!.setSEOData(SEO);
		this.ingredient = await nextProps.ingredientStore.getIngredient(Number(ingredientID));
		nextProps.seoStore.setSEOData({
			icon: <img src={this.ingredient.icon} alt={this.ingredient.name} />,
			title: this.ingredient.name
		})

		const PageData = this.procesPageData(this.ingredient);
		this.inputs = PageData.inputs;


		this.loading = false;
	}

	render() {
		return <>
			<div className="container-fluid">
				<div className="row">
					<div className="col-md-9">
						<Card>
							<Form inputs={this.inputs} loading={this.loading} onInputsChange={this.setReset} resetForm={this.resetForm} />
						</Card>
					</div>
					<div className="col-md-3">
						<Card>
							{
								this.reset ? 
								<>
									<Button onClick={this.saveForm} className='btn-block btn-primary mb-2'>Save</Button>
									<Button onClick={this.setResetForm} className='btn-block btn-warning mb-10'>Reset</Button>
								</>
								: ''
							}
							<Button onClick={this.saveForm} className='btn-danger btn-block'>Delete</Button>
						</Card>
					</div>
				</div>
			</div>
			
		</>
	}
}

export default IngredientPage;