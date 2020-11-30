import AuthService from "../services/auth.service";

import { API_URL } from "../constants";
import {
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT,
	SET_MESSAGE,
	LOGIN_REQUEST,
} from "./types";
import Axios from "axios";
const API_URL_LOGIN = API_URL + "admin/login";

export const login = (email, password) => (dispatch) => {
	return Axios
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
			if (response.data.success) {
				localStorage.setItem("admin", JSON.stringify(response.data.message));
				dispatch({
					type: LOGIN_SUCCESS,
					payload: { admin: response.data.message },
				});
				return Promise.resolve();
			} else {
				dispatch({
					type: LOGIN_FAIL,
				});

				dispatch({
					type: SET_MESSAGE,
					payload: response.data.error,
				});
				return Promise.reject();
			}
		})
		.catch((error) => {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();
			dispatch({
				type: LOGIN_FAIL,
			});

			dispatch({
				type: SET_MESSAGE,
				payload: message,
			});

			return Promise.reject();
		});
};

export const logout = () => (dispatch) => {
	localStorage.removeItem("admin");
	dispatch({
		type: LOGOUT,
	});
};
