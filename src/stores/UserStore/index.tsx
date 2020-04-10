import {
	observable,
	// computed
} from "mobx";
import { IUserStore, IUser, ILoginResponce } from './interfaces';
import { authUser, checkAuth } from "../../utils/api";


class UserStore implements IUserStore {
	@observable user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : {} as IUser;
	@observable token = localStorage.getItem('token') as string | null;
	@observable isAuthentificated = false as boolean;
	
	checkAuth = async() => {

		if (!this.token || !this.user.id) return false;
		if (this.isAuthentificated) return this.isAuthentificated;

		const result = await checkAuth({
			id: this.user.id,
			token: this.token
		});

		if (result.error) return result;
		if (!result.token) return { error: 'Something went wrong, pleace contact with support' };

		this.token = result.token;
		this.user = await this.formatUserData(result);
		this.isAuthentificated = true;

		localStorage.setItem('user', JSON.stringify(this.user));
		localStorage.setItem('token', this.token!);

		return this.isAuthentificated;
	}

	login = async(data: {login: string, password: string}) => {

		const result:ILoginResponce = await authUser(data);

		if (result.error) return result;

		if (!result.token) return { error: 'Something went wrong, pleace contact with support' };

		this.token = result.token;
		this.user = await this.formatUserData(result);
		this.isAuthentificated = true;

		localStorage.setItem('user', JSON.stringify(this.user));
		localStorage.setItem('token', this.token);
		return this.user;
	}

	logout = () => {

		localStorage.removeItem('token');
		localStorage.removeItem('user');
		this.user = {};
		this.token = null;
		this.isAuthentificated = false;
	}

	async formatUserData(responce: ILoginResponce): Promise<IUser>{
		
		return {
			id: responce.id!,
			username: responce.username!,
			email: responce.email!
		}
	}
}

export default UserStore;