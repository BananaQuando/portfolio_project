export interface IIngredientStore {
	getCategories: Function
	getCategory: Function
	getIngredient: Function
	getIngredients: Function
}

export type TIngredientUnit = 'kg' | 'unit' | 'L';

export interface IIngridient {
	id: number
	image: string
	name: string
	quantity: number
	unit: TIngredientUnit
	total: string
	categoryID: number
}

export interface IIngridientList{
	[key: number]: IIngridient
}

export interface IIngridientResponce {
	id: number
	image: string
	name: string
	quantity: number
	unit: TIngredientUnit
	category_id: number
}

export interface IIngridientCategory {
	id: number
	name: string
	thumb: string
}

export interface IIngridientCategoryList{
	[key: number]: IIngridientCategory
}

export interface ICategoryIngredients{
	[key: number]: number[]
}

export interface IIngridientCategoryResponce {
	id: number
	name: string
	thumbnail: string
}