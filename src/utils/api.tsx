// import qs from 'qs';
import { Config } from "../Config";
import { IIngridientCategoryResponce, IIngridientResponce } from "../stores/IngredientStore/interfaces";


export async function authUser(params: {login: string, password: string}) {

	const { login, password } = params;

	if (login === undefined || login.length === 0) return { error: 'Empty login' };
	if (password === undefined || password.length === 0) return { error: 'Empty password' };

	const responce = await fetch(`${Config.host}/users`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(params)
	});
	const result = await responce.json();
	
	if (!result.token) return { error: 'Wrong login or password' }
	return result;
}

export async function checkAuth(params: {id: number, token:string}){

	const { id, token } = params;

	if (id === null || id === undefined || token === null || token === undefined) return { error: 'Not authenticated' };

	const responce = await fetch(`${Config.host}/users/${id}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(params)
	});
	const result = await responce.json();

	if (!result.token) return { error: 'Wrong token' }
	return result;
}

export async function getMenu(){

	const responce = await fetch(`${Config.host}/menu`);
	const result = responce.json();

	return result;
}

export async function getIngredient(ingredientID: number): Promise<IIngridientResponce>{

	const responce = await fetch(`${Config.host}/ingredients/${ingredientID}`);
	const result = responce.json();

	return result;
}

export async function getIngredientByCategory(categoryID: number): Promise<IIngridientResponce[]>{

	const responce = await fetch(`${Config.host}/ingredients?category_id=${categoryID}`);
	const result = responce.json();

	return result;
}

export async function getIngredientCategory(categoryID: number): Promise<IIngridientCategoryResponce>{

	const responce = await fetch(`${Config.host}/ingredients_category/${categoryID}`);
	const result = responce.json();

	return result;
}

export async function getIngredientCategories(): Promise<IIngridientCategoryResponce[]>{

	const responce = await fetch(`${Config.host}/ingredients_category`);
	const result = responce.json();

	return result;
}

// export async function getHeaderNotices() {
//     return await request('/api/notices', {});
// }

// export async function getCharts() {
//     return await request('/api/charts', {});
// }

// export async function getUserCurrent() {
//     return await request('/api/userCurrent', {});
// }

// export async function getTags() {
//     return await request('/api/tags', {});
// }

// export async function getNotice() {
//     return await request('/api/project/notice', {});
// }

// export async function getActivities() {
//     return await request('/api/activities', {});
// }

// export async function basicFormSubmit(params) {
//     return await request('/api/form-basic', {
//         method: 'POST',
//         body: params,
//     });
// }

// export async function getTableList(params) {
//     return await request(`/api/table-list?${qs.stringify(params)}`, {});
// }


// export async function deleteTableList(params) {
//     return await request('/api/table-list-delete', {
//         method: 'POST',
//         body: params,
//     });
// }

// export async function getFakeList(params) {
//     return await request(`/api/fake-list?${qs.stringify(params)}`, {});
// }

// export async function getBasicProfile() {
//     return await request('/api/profile/basic', {});
// }

// export async function getAdvancedProfile() {
//     return await request('/api/profile/advanced', {});
// }

// export async function query(code) {
//     return await request(`/api/${code}`, {});
// }