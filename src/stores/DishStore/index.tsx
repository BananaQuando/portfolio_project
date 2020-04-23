import {
	observable, action,
	// computed
} from "mobx";
import { IDishStore, IDishList, IDishCategoryList, ICategoryDishes, IDishCategoryResponce, IDishResponce, IDish, IDishCategory, IDishIngredientResponce, IDishIngredient, IDishRequest } from './interfaces';
import { getDishCategory, getDish, getDishByCategory, getDishCategories, uploadImage, updateDish } from "../../utils/api";
import _ from "lodash";


class DishStore implements IDishStore {
	
	@observable DishList = {} as IDishList;
	@observable DishCategoryList = {} as IDishCategoryList;
	@observable CategoryDishes = {} as ICategoryDishes;
	@observable Categories = [] as number[];
	
	@action getCategories = async (): Promise<IDishCategoryList> => {

		if (this.Categories.length > 0){

			return await this.fetchCategories(this.Categories);
		}
		
		const categories = await getDishCategories();

		categories.forEach((category: IDishCategoryResponce) => {

			this.Categories.push(category.id);
			this.DishCategoryList[category.id] = this.formatCategoryResponce(category);
		});

		return this.DishCategoryList;
	}

	@action getCategory = async (categoryID: number) => {

		if (this.DishCategoryList[categoryID]){

			return this.DishCategoryList[categoryID];
		}

		const category = await getDishCategory(categoryID);
		this.DishCategoryList[categoryID] = this.formatCategoryResponce(category);

		return this.DishCategoryList[categoryID];
	}

	@action getDish = async (dishID: number) => {

		if (this.DishList[dishID]){

			return this.DishList[dishID];
		}

		const dish = await getDish(dishID);
		this.DishList[dishID] = this.formatDishResponce(dish);

		return this.DishList[dishID];
	}

	@action getDishes = async (categoryID: number) => {

		if (!this.CategoryDishes[categoryID]) this.CategoryDishes[categoryID] = [];

		if (this.CategoryDishes[categoryID].length > 0){

			return await this.fetchDishes(this.CategoryDishes[categoryID]);
		}
		
		const dishes = await getDishByCategory(categoryID);

		dishes.forEach((dish: IDishResponce) => {

			this.CategoryDishes[categoryID].push(dish.id);
			this.DishList[dish.id] = this.formatDishResponce(dish);
		});

		return await this.fetchDishes(this.CategoryDishes[categoryID]);
	}

	@action saveDish = async(dish: IDish): Promise<IDish> => {

		const request = this.formatDishRequest(dish);
		const { id } = dish;

		if (typeof request.image === 'object') {
			const image = await uploadImage(request.image);
			request.image = image ? image : '';
		}

		const dishResponce = await updateDish(request);

		if (dishResponce){

			this.DishList[id] = this.formatDishResponce(dishResponce);
		}

		return this.DishList[id];
	}


	fetchCategories = async(list: number[]) => {
		return Promise.all(list.map(async (id) => await this.getCategory(id)))
	}

	fetchDishes = async(list: number[]) => {
		return Promise.all(list.map(async (id) => await this.getDish(id)))
	}

	formatCategoryResponce = (responce: IDishCategoryResponce): IDishCategory => {

		const { id, name, thumbnail: thumb, thumbnail_placeholder: thumbPlaceholder } = responce;

		return {
			id,
			name,
			thumb,
			thumbPlaceholder,
			link: `/dishes/${responce.id}`
		}
	}

	formatDishResponce = (responce: IDishResponce): IDish => {

		const { 
			id,
			category_id: categoryID,
			name,
			thumbnail: thumb,
			thumbnail_placeholder: thumbPlaceholder,
			description,
			ingredients,
			nutrition,
			icon,
			image,
			image_placeholder: imagePlaceholder
		} = responce;

		return {
			id,
			categoryID,
			name,
			thumb,
			icon,
			image,
			imagePlaceholder,
			description,
			ingredients: _.map(ingredients, ingredient => ( this.formatDishIngredient(ingredient) )),
			nutrition,
			thumbPlaceholder,
			link: `/dishes/${responce.category_id}/${responce.id}`
		}
	}

	formatDishIngredient(responce: IDishIngredientResponce): IDishIngredient{
		const { 
			ingredient_id: ingredientID,
			quantity
		} = responce;

		return {
			ingredientID,
			quantity
		}
	}

	formatDishIngredientRequest(responce: IDishIngredient): IDishIngredientResponce{
		const { 
			ingredientID: ingredient_id,
			quantity
		} = responce;

		return {
			ingredient_id,
			quantity
		}
	}

	formatDishRequest = (dish: IDish): IDishRequest => {

		const { 
			id,
			categoryID: category_id,
			name,
			description,
			image,
			ingredients,
			nutrition,
		} = dish;

		return {	
			id,
			name,
			description,
			ingredients: _.map(ingredients, ingredient => ( this.formatDishIngredientRequest(ingredient) )),
			nutrition,
			category_id,
			image
		}
	}
}

export default DishStore;