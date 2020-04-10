export interface IUserStore {
	login: Function,
	logout: Function,
	checkAuth: Function
}

export interface IUser{
	id: number,
	username: string,
	email: string
}

export interface ILoginResponce{
	id?: number,
	username?: string,
	email?: string,
	token?: string,
	error?: string
}