import {
	observable,
	action,
	// computed
} from "mobx";
import { IUserStore } from './interfaces';
import { authUser } from "../../utils/api";


class UserStore implements IUserStore {
	@observable user = {}

	login = (login: string, password: string) => {

		authUser({login, password});
	} 
}

export default UserStore;