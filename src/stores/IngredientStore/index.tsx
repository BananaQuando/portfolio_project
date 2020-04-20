import {
	observable, action,
	// computed
} from "mobx";
import { IIngredientStore, IIngredientList, IIngredientCategoryList, ICategoryIngredients, IIngredientCategoryResponce, IIngredientCategory, IIngredientResponce, IIngredient, IIngredientRequest } from './interfaces';
import { getIngredientCategories, getIngredientCategory, getIngredientByCategory, getIngredient, updateIngredient, uploadImage } from "../../utils/api";


class IngredientStore implements IIngredientStore {
	
	@observable IngredientsList = {} as IIngredientList;
	@observable IngredientCategoryList = {} as IIngredientCategoryList;
	@observable CategoryIngredients = {} as ICategoryIngredients;
	@observable Categories = [] as number[];
	
	@action getCategories = async (): Promise<IIngredientCategoryList> => {

		if (this.Categories.length > 0){

			return await this.fetchCategories(this.Categories);
		}
		
		const categories = await getIngredientCategories();

		categories.forEach((category: IIngredientCategoryResponce) => {

			this.Categories.push(category.id);
			this.IngredientCategoryList[category.id] = this.formatCategoryResponce(category);
		});

		return this.IngredientCategoryList;
	}

	@action getCategory = async (categoryID: number) => {

		if (this.IngredientCategoryList[categoryID]){

			return this.IngredientCategoryList[categoryID];
		}

		const category = await getIngredientCategory(categoryID);
		this.IngredientCategoryList[categoryID] = this.formatCategoryResponce(category);

		return this.IngredientCategoryList[categoryID];
	}

	@action getIngredient = async (ingredientID: number) => {

		if (this.IngredientsList[ingredientID]){

			return this.IngredientsList[ingredientID];
		}

		const ingredient = await getIngredient(ingredientID);
		this.IngredientsList[ingredientID] = this.formatIngredientResponce(ingredient);

		return this.IngredientsList[ingredientID];
	}

	@action getIngredients = async (categoryID: number) => {

		if (!this.CategoryIngredients[categoryID]) this.CategoryIngredients[categoryID] = [];

		if (this.CategoryIngredients[categoryID].length > 0){

			return await this.fetchIngredients(this.CategoryIngredients[categoryID]);
		}
		
		const ingredients = await getIngredientByCategory(categoryID);

		ingredients.forEach((ingredient: IIngredientResponce) => {

			this.CategoryIngredients[categoryID].push(ingredient.id);
			this.IngredientsList[ingredient.id] = this.formatIngredientResponce(ingredient);
		});

		return await this.fetchIngredients(this.CategoryIngredients[categoryID]);
	}

	@action saveIngredient = async(ingredient: IIngredient) => {

		const request = this.formatIngredientRequest(ingredient);

		if (typeof request.image === 'object') request.image = await uploadImage(request.image);
		return false;

		const ingredientResponce = await updateIngredient(request);

		// this.IngredientsList[ingredint.id] = ingredint;
	}


	fetchCategories = async(list: number[]) => {
		return Promise.all(list.map(async (id) => await this.getCategory(id)))
	}

	fetchIngredients = async(list: number[]) => {
		return Promise.all(list.map(async (id) => await this.getIngredient(id)))
	}

	formatCategoryResponce = (responce: IIngredientCategoryResponce): IIngredientCategory => {

		const { id, name, thumbnail: thumb, thumbnail_placeholder: thumbPlaceholder } = responce;

		return {
			id,
			name,
			thumb,
			thumbPlaceholder,
			link: `/ingredients/${responce.id}`
		}
	}

	formatIngredientResponce = (responce: IIngredientResponce): IIngredient => {

		const { 
			id,
			category_id: categoryID,
			name,
			thumbnail: thumb,
			thumbnail_placeholder: thumbPlaceholder,
			unit,
			quantity,
			icon,
			image,
			image_placeholder: imagePlaceholder
		} = responce;

		return {
			id,
			categoryID,
			name,
			thumb,
			unit,
			icon,
			image,
			imagePlaceholder,
			quantity,
			thumbPlaceholder,
			link: `/ingredients/${responce.category_id}/${responce.id}`
		}
	}

	formatIngredientRequest = (ingredient: IIngredient): IIngredientRequest => {

		const { 
			id,
			categoryID: category_id,
			name,
			unit,
			quantity,
			image
		} = ingredient;

		return {
			id,
			name,
			quantity,
			unit,
			category_id,
			image
		}
	}
}

export default IngredientStore;