import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";
import AddCategory from "./views/Categories/AddCategory";
// core components
import Admin from "layouts/Admin.js";
import RTL from "layouts/RTL.js";

import "assets/css/material-dashboard-react.css?v=1.9.0";

const hist = createBrowserHistory();

ReactDOM.render(
	<Router history={hist}>
		<Switch>
			<Route path="/admin" component={Admin} />
			<Route path="/admin/categories/add" component={AddCategory} />
		</Switch>
	</Router>,
	document.getElementById("root")
);