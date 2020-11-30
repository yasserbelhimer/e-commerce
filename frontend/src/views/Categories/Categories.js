import React, { useEffect, useState } from "react";
// @material-ui/core components
import stylesTasks from "assets/jss/material-dashboard-react/components/tasksStyle.js";
import CustomInput from "components/CustomInput/CustomInput.js";

import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import Button from "components/CustomButtons/Button.js";
import { Edit, Close } from "@material-ui/icons";
import { apiUrl } from "../../constants";
import axios from "axios";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import {
	Table,
	TableHead,
	TableCell,
	TableRow,
	TableBody,
	Tooltip,
	IconButton,
	Grid,
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
	const [categories, setCategories] = useState([]);
	const [openEdit, setOpenEdit] = React.useState(false);
	const [openNew, setOpenNew] = React.useState(false);
	const [category, setCategory] = React.useState({ _id: "", name: "" });
	const [NewCategory, setNewCategory] = useState("");
	const [reload, setReload] = useState(false);

	const addNewCategory = () => {
		axios
			.post(apiUrl + "categories/add", { name: NewCategory })
			.then((res) => {
				setOpenNew(false);
				reload?setReload(false):setReload(true);
			})
			.catch((err) => {
				setOpenNew(false);
				reload?setReload(false):setReload(true);
			});
	};
	const editCategory = () => {
		axios
			.post(apiUrl + "categories/update/" + category._id, {
				name: category.name,
			})
			.then((res) => {
				setOpenEdit(false);
				reload?setReload(false):setReload(true);
			})
			.catch((err) => {
				setOpenEdit(false);
				reload?setReload(false):setReload(true);
			});
	};

	const deleteCategory = (id) => {
		axios
			.delete(apiUrl + "categories/" + id)
			.then((res) => {
				reload?setReload(false):setReload(true);
			})
			.catch((err) => {
				reload?setReload(false):setReload(true);
			});
	};
	const handleClickOpenEdit = (category) => {
		setCategory(category);
		setOpenEdit(true);
	};

	const handleCloseEdit = () => {
		setOpenEdit(false);
	};
	const handleClickOpenNew = () => {
		setOpenNew(true);
	};

	const handleCloseNew = () => {
		setOpenNew(false);
	};

	const classes = useStyles();

	const classesTasks = useStylesTasks();
	useEffect(() => {
		axios
			.get(apiUrl + "categories/all")
			.then((res) => {
				setCategories(res.data);
			})
			.catch((err) => {
				alert(err);
			});
	}, [reload]);
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
								{/* <NavLink
									activeClassName="active"
									// to={`${match.url}/add`}
								>
									{" "}
									
								</NavLink> */}
								<Button
									type="button"
									color="primary"
									onClick={handleClickOpenNew}
								>
									Add new Category
								</Button>
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
								{categories.map((category, index) => (
									<TableRow>
										<TableCell>#{index + 1}</TableCell>
										<TableCell>{category.name}</TableCell>
										<TableCell align="right">
											<Tooltip
												id="tooltip-top"
												title="Edit Task"
												placement="top"
												classes={{
													tooltip:
														classesTasks.tooltip,
												}}
											>
												<IconButton
													onClick={() => {
														handleClickOpenEdit(
															category
														);
													}}
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
													tooltip:
														classesTasks.tooltip,
												}}
											>
												<IconButton
													onClick={() => {
														deleteCategory(
															category._id
														);
													}}
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
								))}
							</TableBody>
						</Table>
					</CardBody>
				</Card>
			</GridItem>

			<Dialog
				maxWidth="sm"
				fullWidth={true}
				open={openEdit}
				onClose={handleCloseEdit}
				aria-labelledby="form-dialog-title"
			>
				<DialogTitle id="form-dialog-title">Edit Category</DialogTitle>
				<DialogContent>
					<DialogContentText></DialogContentText>
					<CustomInput
						labelText="Category Name"
						id="categoryName"
						formControlProps={{
							fullWidth: true,
						}}
						inputProps={{
							onChange: (e) =>
								setCategory({
									_id: category._id,
									name: e.target.value,
								}),
							value: category.name,
						}}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleCloseEdit} color="primary">
						Cancel
					</Button>
					<Button onClick={editCategory} color="primary">
						Edit
					</Button>
				</DialogActions>
			</Dialog>
			<Dialog
				maxWidth="sm"
				fullWidth={true}
				open={openNew}
				onClose={handleCloseNew}
				aria-labelledby="form-dialog-title"
			>
				<DialogTitle id="form-dialog-title">New Category</DialogTitle>
				<DialogContent>
					<DialogContentText></DialogContentText>
					<CustomInput
						labelText="Category Name"
						id="categoryName"
						formControlProps={{
							fullWidth: true,
						}}
						inputProps={{
							onChange: (e) => setNewCategory(e.target.value),
						}}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleCloseNew} color="primary">
						Cancel
					</Button>
					<Button onClick={addNewCategory} color="primary">
						Add
					</Button>
				</DialogActions>
			</Dialog>
		</GridContainer>
	);
}
