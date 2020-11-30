import axios from "axios";
import { API_URL } from "../constants";
import authHeader from "./auth-header";
const API_URL_LOGIN = API_URL + "admin/login";

class AuthService {
	login(email, password) {
		return axios
			.post(
				API_URL_LOGIN,
				{ email, password },
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			)
			.then((response) => {
				if (response.data.accessToken) {
					localStorage.setItem(
						"admin",
						JSON.stringify(response.data)
					);
				}
				return response.data;
			});
	}

	logout() {
		localStorage.removeItem("admin");
	}
}

export default new AuthService();
