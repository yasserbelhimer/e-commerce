import * as React from "react";
// @material-ui/core components
import stylesTasks from "assets/jss/material-dashboard-react/components/tasksStyle.js";

import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import Button from "components/CustomButtons/Button.js";
import { NavLink, Route, useRouteMatch } from "react-router-dom";
import AddCategory from "./AddCategory";
import { Edit, Close, Router } from "@material-ui/icons";
import {
	Table,
	TableHead,
	TableCell,
	TableRow,
	TableBody,
	Tooltip,
	IconButton,
	Grid,
	Typography,
	Switch,
} from "@material-ui/core";

const styles = {
	cardCategoryWhite: {
		"&,& a,& a:hover,& a:focus": {
			color: "rgba(255,255,255,.62)",
			margin: "0",
			fontSize: "14px",
			marginTop: "0",
			marginBottom: "0",
		},
		"& a,& a:hover,& a:focus": {
			color: "#FFFFFF",
		},
	},
	cardTitleWhite: {
		color: "#FFFFFF",
		marginTop: "0px",
		minHeight: "auto",
		fontWeight: "300",
		fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
		marginBottom: "3px",
		textDecoration: "none",
		"& small": {
			color: "#777",
			fontSize: "65%",
			fontWeight: "400",
			lineHeight: "1",
		},
	},
};

const useStylesTasks = makeStyles(stylesTasks);
const useStyles = makeStyles(styles);

export default function Categories() {
	const classes = useStyles();
	const classesTasks = useStylesTasks();
	let match = useRouteMatch();

	return (
		<GridContainer>
			<GridItem xs={12} sm={12} md={12}>
				<Card>
					<CardHeader color="primary">
						<h4 className={classes.cardTitleWhite}>
							Categories List
						</h4>
					</CardHeader>
					<CardBody>
						<Grid
							justify="space-between" // Add it here :)
							container
							spacing={24}
						>
							<Grid item></Grid>

							<Grid item>
								<NavLink
									activeClassName="active"
									to={`${match.url}/add`}
								>
									{" "}
									<Button type="button" color="primary">
										Add new Category
									</Button>
								</NavLink>
							</Grid>
						</Grid>
						<Table>
							<TableHead>
								<TableRow>
									<TableCell>Category ID</TableCell>
									<TableCell>Category Name</TableCell>
									<TableCell align="right"></TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								<TableRow>
									<TableCell>#1</TableCell>
									<TableCell>1</TableCell>
									<TableCell align="right">
										<Tooltip
											id="tooltip-top"
											title="Edit Task"
											placement="top"
											classes={{
												tooltip: classesTasks.tooltip,
											}}
										>
											<IconButton
												aria-label="Edit"
												className={
													classesTasks.tableActionButton
												}
											>
												<Edit
													className={
														classesTasks.tableActionButtonIcon +
														" " +
														classesTasks.edit
													}
												/>
											</IconButton>
										</Tooltip>
										<Tooltip
											id="tooltip-top-start"
											title="Remove"
											placement="top"
											classes={{
												tooltip: classesTasks.tooltip,
											}}
										>
											<IconButton
												aria-label="Close"
												className={
													classesTasks.tableActionButton
												}
											>
												<Close
													className={
														classesTasks.tableActionButtonIcon +
														" " +
														classesTasks.close
													}
												/>
											</IconButton>
										</Tooltip>
									</TableCell>
								</TableRow>
								<TableRow>
									<TableCell>#1</TableCell>
									<TableCell>1</TableCell>
									<TableCell align="right">
										<Tooltip
											id="tooltip-top"
											title="Edit Task"
											placement="top"
											classes={{
												tooltip: classesTasks.tooltip,
											}}
										>
											<IconButton
												aria-label="Edit"
												className={
													classesTasks.tableActionButton
												}
											>
												<Edit
													className={
														classesTasks.tableActionButtonIcon +
														" " +
														classesTasks.edit
													}
												/>
											</IconButton>
										</Tooltip>
										<Tooltip
											id="tooltip-top-start"
											title="Remove"
											placement="top"
											classes={{
												tooltip: classesTasks.tooltip,
											}}
										>
											<IconButton
												aria-label="Close"
												className={
													classesTasks.tableActionButton
												}
											>
												<Close
													className={
														classesTasks.tableActionButtonIcon +
														" " +
														classesTasks.close
													}
												/>
											</IconButton>
										</Tooltip>
									</TableCell>
								</TableRow>
								<TableRow>
									<TableCell>#1</TableCell>
									<TableCell>1</TableCell>
									<TableCell align="right">
										<Tooltip
											id="tooltip-top"
											title="Edit Task"
											placement="top"
											classes={{
												tooltip: classesTasks.tooltip,
											}}
										>
											<IconButton
												aria-label="Edit"
												className={
													classesTasks.tableActionButton
												}
											>
												<Edit
													className={
														classesTasks.tableActionButtonIcon +
														" " +
														classesTasks.edit
													}
												/>
											</IconButton>
										</Tooltip>
										<Tooltip
											id="tooltip-top-start"
											title="Remove"
											placement="top"
											classes={{
												tooltip: classesTasks.tooltip,
											}}
										>
											<IconButton
												aria-label="Close"
												className={
													classesTasks.tableActionButton
												}
											>
												<Close
													className={
														classesTasks.tableActionButtonIcon +
														" " +
														classesTasks.close
													}
												/>
											</IconButton>
										</Tooltip>
									</TableCell>
								</TableRow>
								<TableRow>
									<TableCell>#1</TableCell>
									<TableCell>1</TableCell>
									<TableCell align="right">
										<Tooltip
											id="tooltip-top"
											title="Edit Task"
											placement="top"
											classes={{
												tooltip: classesTasks.tooltip,
											}}
										>
											<IconButton
												aria-label="Edit"
												className={
													classesTasks.tableActionButton
												}
											>
												<Edit
													className={
														classesTasks.tableActionButtonIcon +
														" " +
														classesTasks.edit
													}
												/>
											</IconButton>
										</Tooltip>
										<Tooltip
											id="tooltip-top-start"
											title="Remove"
											placement="top"
											classes={{
												tooltip: classesTasks.tooltip,
											}}
										>
											<IconButton
												aria-label="Close"
												className={
													classesTasks.tableActionButton
												}
											>
												<Close
													className={
														classesTasks.tableActionButtonIcon +
														" " +
														classesTasks.close
													}
												/>
											</IconButton>
										</Tooltip>
									</TableCell>
								</TableRow>
								<TableRow>
									<TableCell>#1</TableCell>
									<TableCell>1</TableCell>
									<TableCell align="right">
										<Tooltip
											id="tooltip-top"
											title="Edit Task"
											placement="top"
											classes={{
												tooltip: classesTasks.tooltip,
											}}
										>
											<IconButton
												aria-label="Edit"
												className={
													classesTasks.tableActionButton
												}
											>
												<Edit
													className={
														classesTasks.tableActionButtonIcon +
														" " +
														classesTasks.edit
													}
												/>
											</IconButton>
										</Tooltip>
										<Tooltip
											id="tooltip-top-start"
											title="Remove"
											placement="top"
											classes={{
												tooltip: classesTasks.tooltip,
											}}
										>
											<IconButton
												aria-label="Close"
												className={
													classesTasks.tableActionButton
												}
											>
												<Close
													className={
														classesTasks.tableActionButtonIcon +
														" " +
														classesTasks.close
													}
												/>
											</IconButton>
										</Tooltip>
									</TableCell>
								</TableRow>
							</TableBody>
						</Table>
					</CardBody>
				</Card>
			</GridItem>
			<Router>
			<Switch>
				<Route path={`${match.path}/add`}>
					<AddCategory />
				</Route>
			</Switch>
			</Router>
		</GridContainer>
	);
}

// export default () => {
// 	const match = useRouteMatch();
// 	return (
// 		<div>
// 			<h1>{match.path}</h1>
// 		<Switch>
// 			<Route path={`${match.path}`} component={Categories} />
// 			<Route path={`${match.url}/add`} component={AddCategory} />
// 		</Switch>
// 		</div>
// 	);
// };

// function HeaderView() {
// 	const location = useLocation();
// 	console.log(location.pathname);
// 	return <span>Path : {location.pathname}</span>
//   }
