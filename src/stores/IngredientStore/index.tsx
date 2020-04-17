import React from 'react';
import {
	observable, action,
	// computed
} from "mobx";
import { IIngredientStore, IIngredientList, IIngredientCategoryList, ICategoryIngredients, IIngredientCategoryResponce, IIngredientCategory, IIngredientResponce, IIngredient } from './interfaces';
import { getIngredientCategories, getIngredientCategory, getIngredientByCategory, getIngredient } from "../../utils/api";


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


	fetchCategories = async(list: number[]) => {
		return Promise.all(list.map(async (id) => await this.getCategory(id)))
	}

	fetchIngredients = async(list: number[]) => {
		return Promise.all(list.map(async (id) => await this.getIngredient(id)))
	}

	formatCategoryResponce = (responce: IIngredientCategoryResponce): IIngredientCategory => {

		const { id, name, thumbnail: thumb } = responce;

		return {
			id,
			name,
			thumb,
			link: `/ingredients/${responce.id}`
		}
	}

	formatIngredientResponce = (responce: IIngredientResponce): IIngredient => {

		const { id, category_id: categoryID, name, image, unit, quantity } = responce;

		return {
			id,
			categoryID,
			name,
			image,
			unit,
			quantity,
			link: `/ingredients/${responce.category_id}/${responce.id}`
		}
	}
}

export default IngredientStore;