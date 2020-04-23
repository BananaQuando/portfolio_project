export interface IDishStore {
	getCategories: Function
	getCategory: Function
	getDish: Function
	getDishes: Function
	saveDish: Function
}

export type TNutritionUnit = 'kcal' | 'g';

export interface IDish {
	id: number
	thumb: string
	thumbPlaceholder: string
	icon: string
	name: string
	description: string
	ingredients: IDishIngredient[]
	nutrition: IDishNutrition[]
	link: string
	categoryID: number
	image: string
	imagePlaceholder: string
}

export interface IDishList{
	[key: number]: IDish
}

export interface IDishResponce {
	id: number
	image: string
	image_placeholder: string
	thumbnail: string
	thumbnail_placeholder: string
	icon: string
	name: string
	description: string
	ingredients: IDishIngredientResponce[]
	nutrition: IDishNutritionResponce[]
	category_id: number
}

export interface IDishIngredientResponce{
	ingredient_id: number
	quantity: number
}

export interface IDishNutritionResponce{
	name: string
	value: number
	unit: TNutritionUnit
}

export interface IDishIngredient{
	ingredientID: number
	quantity: number
}

export interface IDishNutrition{
	name: string
	value: number
	unit: TNutritionUnit
}

export interface IDishCategory {
	id: number
	name: string
	thumb: string
	thumbPlaceholder: string
	link: string
}

export interface IDishCategoryList{
	[key: number]: IDishCategory
}

export interface ICategoryDishes{
	[key: number]: number[]
}

export interface IDishCategoryResponce {
	id: number
	name: string
	image: string
	image_placeholder: string
	thumbnail: string
	thumbnail_placeholder: string
}


export interface IDishRequest {
	id: number
	image: string
	name: string
	description: string
	ingredients: IDishIngredientResponce[]
	nutrition: IDishNutritionResponce[]
	category_id: number
}