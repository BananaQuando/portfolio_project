import {
	observable, action,
	// computed
} from "mobx";
import { IIngredientStore, IIngridientList, IIngridientCategoryList, ICategoryIngredients, IIngridientCategoryResponce, IIngridientCategory } from './interfaces';
import { getIngredientCategories, getIngredientCategory } from "../../utils/api";


class IngredientStore implements IIngredientStore {
	
	@observable IngredientsList = {} as IIngridientList;
	@observable IngridientCategoryList = {} as IIngridientCategoryList;
	@observable CategoryIngredients = [] as ICategoryIngredients;
	
	@action getCategories = async () => {

		if (Object.keys(this.IngridientCategoryList).length){

			return this.IngridientCategoryList;
		}
		
		const categories = await getIngredientCategories();

		categories.forEach((category: IIngridientCategoryResponce) => {
			
			this.IngridientCategoryList[category.id] = this.formatCategoryResponce(category);
		});
	}	

	@action getCategory = async (categoryID: number) => {

		if (this.IngridientCategoryList[categoryID]){

			return this.IngridientCategoryList[categoryID];
		}

		const category = await getIngredientCategory(categoryID);
		this.IngridientCategoryList[categoryID] = this.formatCategoryResponce(category);

		return this.IngridientCategoryList[categoryID];
	}

	formatCategoryResponce = (responce: IIngridientCategoryResponce): IIngridientCategory => {

		return {
			id: responce.id,
			name: responce.name,
			thumb: responce.thumbnail
		}
	}

	@action getIngredient = async (ingredientID: number) => {
		
	}

	@action getIngredients = async (categoryID: number) => {
		
	}
}

export default IngredientStore;