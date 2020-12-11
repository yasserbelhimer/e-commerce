import React from "react";
import { Route, Redirect } from "react-router-dom";

function ProtectedRoute({ children, auth, ...rest }) {
	return (
		<Route
			{...rest}
			render={(location) =>
				auth.isLoggedIn ? children : <Redirect to="/login" />
			}
		/>
	);
}
function ProtectedRouteLogin({ children, auth, ...rest }) {
	return (
		<Route
			{...rest}
			render={(location) =>
				!auth.isLoggedIn ? children : <Redirect to="/dashboard" />
			}
		/>
	);
}

export {ProtectedRoute,ProtectedRouteLogin};
