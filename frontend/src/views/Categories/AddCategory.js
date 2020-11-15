import React,{useState}from "react";
// @material-ui/core components
import stylesTasks from "assets/jss/material-dashboard-react/components/tasksStyle.js";

import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import CardFooter from "components/Card/CardFooter.js";
import Button from "components/CustomButtons/Button.js";

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

export default function AddCategory() {
	const classes = useStyles();
	const classesTasks = useStylesTasks();
	const [categoryName, setCategoryName] = useState('');

	const printName = ()=>{
		alert(categoryName);
	}
	return (
		<GridContainer>
			<GridItem xs={12} sm={12} md={12}>
				<Card>
					<CardHeader color="primary">
						<h4 className={classes.cardTitleWhite}>New Category</h4>
					</CardHeader>
					<CardBody>
						<GridContainer>
							<GridItem xs={12} sm={12} md={12}>
								<CustomInput
									labelText="Category Name"
									id="categoryName"
									formControlProps={{
										fullWidth: true,
									}}
									inputProps={{
										onChange: e => setCategoryName(e.target.value),
									  }}
								/>
							</GridItem>
						</GridContainer>
					</CardBody>
					<CardFooter>
						<Button type="button" color="primary" onClick={printName}>Submit</Button>
					</CardFooter>
				</Card>
			</GridItem>
		</GridContainer>
	);
}
