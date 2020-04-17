export interface IIngredientStore {
	getCategories: Function
	getCategory: Function
	getIngredient: Function
	getIngredients: Function
}

export type TIngredientUnit = 'kg' | 'unit' | 'L';

export interface IIngredient {
	id: number
	image: string
	name: string
	quantity: number
	unit: TIngredientUnit
	link: string
	categoryID: number
}

export interface IIngredientList{
	[key: number]: IIngredient
}

export interface IIngredientResponce {
	id: number
	image: string
	name: string
	quantity: number
	unit: TIngredientUnit
	category_id: number
}

export interface IIngredientCategory {
	id: number
	name: string
	thumb: string
	link: string
}

export interface IIngredientCategoryList{
	[key: number]: IIngredientCategory
}

export interface ICategoryIngredients{
	[key: number]: number[]
}

export interface IIngredientCategoryResponce {
	id: number
	name: string
	thumbnail: string
}