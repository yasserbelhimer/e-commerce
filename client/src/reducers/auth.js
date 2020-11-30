import { LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, LOGIN_REQUEST } from "../actions/types";

const admin = JSON.parse(localStorage.getItem("admin"));

const initialState = admin
	? { isLoggedIn: true, admin }
	: { isLoggedIn: false, admin: null };

export default function (state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case LOGIN_REQUEST:
			return {
				...state,
				isLoggedIn: false,
				admin: null,
			};
		case LOGIN_SUCCESS:
			return {
				...state,
				isLoggedIn: true,
				admin: payload.admin,
			};
		case LOGIN_FAIL:
			return {
				...state,
				isLoggedIn: false,
				admin: null,
			};
		case LOGOUT:
			return {
				...state,
				isLoggedIn: false,
				admin: null,
			};
		default:
			return state;
	}
}
