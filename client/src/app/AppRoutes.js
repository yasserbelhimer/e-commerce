import React, { Component, Suspense, lazy } from "react";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Spinner from "../app/shared/Spinner";
import UsersList from "./users/UsersList";
import Categories from "./categories/Categories";
import {ProtectedRoute,ProtectedRouteLogin} from "./ProtectedRoute";
const Dashboard = lazy(() => import("./dashboard/Dashboard"));

const Buttons = lazy(() => import("./basic-ui/Buttons"));
const Dropdowns = lazy(() => import("./basic-ui/Dropdowns"));
const Typography = lazy(() => import("./basic-ui/Typography"));

const BasicElements = lazy(() => import("./form-elements/BasicElements"));

const BasicTable = lazy(() => import("./tables/BasicTable"));

const Mdi = lazy(() => import("./icons/Mdi"));

const ChartJs = lazy(() => import("./charts/ChartJs"));

const Error404 = lazy(() => import("./error-pages/Error404"));
const Error500 = lazy(() => import("./error-pages/Error500"));

const Login = lazy(() => import("./user-pages/Login"));
const LoginForm = lazy(() => import("./auth/Login"));
const Register1 = lazy(() => import("./user-pages/Register"));
const Lockscreen = lazy(() => import("./user-pages/Lockscreen"));

const BlankPage = lazy(() => import("./general-pages/BlankPage"));

const AppRoutes = props => {
		return (
			<Suspense fallback={<Spinner />}>
				<Switch>

					<ProtectedRoute path="/dashboard" auth={props.state.auth}>
						<Dashboard />
					</ProtectedRoute>
					
					<ProtectedRoute path="/categories" auth={props.state.auth}>
						<Categories />
					</ProtectedRoute>
					
					<Route exact path="/users" component={UsersList} />

          			<ProtectedRouteLogin path="/login" auth={props.state.auth}>
						<LoginForm />
					</ProtectedRouteLogin>

					<Route path="/basic-ui/buttons" component={Buttons} />
					<Route path="/basic-ui/dropdowns" component={Dropdowns} />
					<Route path="/basic-ui/typography" component={Typography} />

					<Route
						path="/form-Elements/basic-elements"
						component={BasicElements}
					/>

					<Route path="/tables/basic-table" component={BasicTable} />

					<Route path="/icons/mdi" component={Mdi} />

					<Route path="/charts/chart-js" component={ChartJs} />

					<Route path="/user-pages/login-1" component={Login} />
					<Route
						path="/user-pages/register-1"
						component={Register1}
					/>
					<Route
						path="/user-pages/lockscreen"
						component={Lockscreen}
					/>

					<Route path="/error-pages/error-404" component={Error404} />
					<Route path="/error-pages/error-500" component={Error500} />

					<Route
						path="/general-pages/blank-page"
						component={BlankPage}
					/>

					<Redirect to="/dashboard" />
				</Switch>
			</Suspense>
		);
}
const mapStateToProps = (state) => ({
	state: state,
});
// export default AppRoutes;
export default withRouter(connect(mapStateToProps)(AppRoutes));
