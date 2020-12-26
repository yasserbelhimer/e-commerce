import axios from "axios";
import React, { useState, useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { connect } from "react-redux";
import { API_URL } from "../../constants";

const Products = (props) => {
	const [categories, setCategories] = useState([]);
	const [products, setProducts] = useState([]);
	const [product, setProduct] = React.useState({});
	const [newProduct, setNewProduct] = React.useState({
		name: "",
		category: "",
		quantity: 0,
		price: 0,
	});
	const [reload, setReload] = useState(false);

	const [modalShowAdd, setModalShowAdd] = React.useState(false);
	const [modalShowDelete, setModalShowDelete] = React.useState(false);

	const handleAddClose = () => setModalShowAdd(false);
	const handleAddShow = () => setModalShowAdd(true);

	const handleDeleteClose = () => setModalShowDelete(false);
	const handleDeleteShow = () => setModalShowDelete(true);

	const addProduct = () => {
		axios
			.post(API_URL + "products/add", newProduct)
			.then((res) => {
				reload ? setReload(false) : setReload(true);
				setNewProduct({
					name: "",
					category: "",
					quantity: 0,
					price: 0,
				});
				handleAddClose();
			})
			.catch((err) => {
				reload ? setReload(false) : setReload(true);
				handleAddClose();
			});
	};

	const deleteProduct = () => {
		axios
			.delete(API_URL + "products/" + product._id)
			.then((res) => {
				reload ? setReload(false) : setReload(true);
				handleDeleteClose();
			})
			.catch((err) => {
				reload ? setReload(false) : setReload(true);
				handleDeleteClose();
			});
	};
	useEffect(() => {
		axios
			.get(API_URL + "categories/all")
			.then((res) => {
				setCategories(res.data);
			})
			.catch((err) => {
				alert(err);
			});
	}, []);
	useEffect(() => {
		axios
			.get(API_URL + "products/all")
			.then((res) => {
				setProducts(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [reload]);
	return (
		<div>
			<div className="page-header">
				<h3 className="page-title">
					<span className="page-title-icon bg-gradient-primary text-white mr-2">
						<i className="mdi mdi-view-list"></i>
					</span>
					Products
				</h3>
				<button
					type="button"
					className="btn btn-outline-primary btn-fw"
					onClick={() => handleAddShow()}
				>
					Add Product
				</button>
			</div>
			<div className="card">
				<div className="card-body">
					<div className="table-responsive">
						<table className="table table-hover">
							<thead>
								<tr>
									<th>Product</th>
									<th>Category</th>
									<th>Quantity</th>
									<th>Price</th>
									<th></th>
								</tr>
							</thead>
							<tbody>
								{products.map((product, index) => (
									<tr key={product._id}>
										<td>{product.name}</td>
										<td>
											{product.category != null
												? product.category.name
												: ""}
										</td>

										<td>{product.quantity}</td>
										<td>{product.price}</td>
										<td align="right">
											<button
												type="button"
												className="btn btn-gradient-dark btn-rounded btn-icon"
											>
												<i className="mdi mdi-tooltip-edit"></i>
											</button>
											<button
												type="button"
												className="btn btn-gradient-danger btn-rounded btn-icon"
												onClick={() => {
													setProduct(product);
													handleDeleteShow();
												}}
											>
												<i className="mdi mdi-delete"></i>
											</button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
			<Modal
				show={modalShowAdd}
				onHide={handleAddClose}
				aria-labelledby="contained-modal-title-vcenter"
				centered
			>
				<Modal.Header closeButton>
					<Modal.Title id="contained-modal-title-vcenter">
						Add New product
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<form className="forms-sample">
						<Form.Group>
							<label htmlFor="productName">Name</label>
							<Form.Control
								type="text"
								className="form-control"
								id="productName"
								value={newProduct.name}
								placeholder="Product name"
								onChange={(e) =>
									setNewProduct({
										...newProduct,
										name: e.target.value,
									})
								}
							/>
						</Form.Group>
						<Form.Group className="row">
							<label
								htmlFor="category"
								className="ml-4 col-form-label"
							>
								Category
							</label>
							<div className="col-sm-12">
								<select
									className="form-control"
									id="category"
									value={newProduct.category}
									onChange={(e) =>
										setNewProduct({
											...newProduct,
											category: e.target.value,
										})
									}
								>
									<option value="">Select a category</option>
									{categories.map((category) => (
										<option value={category._id}>
											{category.name}
										</option>
									))}
								</select>
							</div>
						</Form.Group>
						<Form.Group>
							<label htmlFor="quantity">Quantity</label>
							<Form.Control
								type="number"
								className="form-control"
								id="quantity"
								value={newProduct.quantity}
								placeholder="Quantity"
								onChange={(e) =>
									setNewProduct({
										...newProduct,
										quantity: e.target.value,
									})
								}
							/>
						</Form.Group>
						<Form.Group>
							<label htmlFor="price">Price</label>
							<Form.Control
								type="number"
								className="form-control"
								id="price"
								value={newProduct.price}
								placeholder="Price"
								onChange={(e) =>
									setNewProduct({
										...newProduct,
										price: e.target.value,
									})
								}
							/>
						</Form.Group>
					</form>
				</Modal.Body>
				<Modal.Footer>
					<Button className="btn btn-light" onClick={handleAddClose}>
						Close
					</Button>
					<Button
						className="btn btn-gradient-primary mr-2"
						onClick={addProduct}
					>
						Submit
					</Button>
				</Modal.Footer>
			</Modal>

			<Modal
				show={modalShowDelete}
				onHide={handleDeleteClose}
				aria-labelledby="contained-modal-title-vcenter"
				centered
			>
				<Modal.Header closeButton>
					<Modal.Title id="contained-modal-title-vcenter">
						Delete confirmation
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<p>Are you sure you want to delete this item?</p>
				</Modal.Body>
				<Modal.Footer>
					<Button
						className="btn btn-light"
						onClick={handleDeleteClose}
					>
						No
					</Button>
					<Button
						className="btn btn-gradient-primary mr-2"
						onClick={deleteProduct}
					>
						Yes
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
};

function mapStateToProps(state) {
	const { isLoggedIn, admin } = state.auth;
	return {
		isLoggedIn,
		admin,
	};
}

export default connect(mapStateToProps, null)(Products);
