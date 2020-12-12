import React, { Component, useState ,useEffect} from "react";
import { Button, Form, Modal } from 'react-bootstrap';

import axios from "axios";

import { API_URL } from "../../constants";

const Categories  = () => {

    const [categories, setCategories] = useState([]);
    const [NewCategory, setNewCategory] = useState("");
    const [category, setCategory] = React.useState({ _id: "", name: "" });
    const [reload, setReload] = useState(false);

    const [modalShowAdd, setModalShowAdd] = React.useState(false);
    const [modalShowEdit, setModalShowEdit] = React.useState(false);
    const [modalShowDelete, setModalShowDelete] = React.useState(false);

    const handleAddClose = () => setModalShowAdd(false);
    const handleAddShow = () => setModalShowAdd(true);

    const handleEditClose = () => setModalShowEdit(false);
    const handleEditShow = () => setModalShowEdit(true);
    
    const handleDeleteClose = () => setModalShowDelete(false);
    const handleDeleteShow = () => setModalShowDelete(true);

    
    const addNewCategory = () => {
		axios.post(API_URL + "categories/add", { name: NewCategory })
		    .then((res) => {
                reload?setReload(false):setReload(true);
                handleAddClose();
			})
			.catch((err) => {
                reload?setReload(false):setReload(true);
				handleAddClose();
            });
        
    };
    
    const editCategory = () => {
        axios
            .post(API_URL + "categories/update/" + category._id, {
                name: category.name,
            })
            .then((res) => {
                handleEditClose();
                reload?setReload(false):setReload(true);
            })
            .catch((err) => {
                handleEditClose();
                reload?setReload(false):setReload(true);
            });
    };
	const deleteCategory = () => {
		axios
			.delete(API_URL + "categories/" + category._id)
			.then((res) => {
                reload?setReload(false):setReload(true);
                handleDeleteClose();
			})
			.catch((err) => {
                reload?setReload(false):setReload(true);
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
	}, [reload]);
    return (
        <div>
            <div className="page-header">
                <h3 className="page-title">
                    <span className="page-title-icon bg-gradient-primary text-white mr-2">
                        <i className="mdi mdi-view-list"></i>
                    </span>{" "}
                    Categories{" "}
                </h3>
                <button 
                    type="button" 
                    className="btn btn-outline-primary btn-fw"
                    onClick={() => handleAddShow()}
                >
                    Add Category
                </button>
            </div>
            <div className="card">
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th>Category ID</th>
                                    <th>Category Name</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {categories.map((category, index) => (
                                    <tr key={category._id}>
                                        <td>#{index + 1}</td>
                                        <td>{category.name}</td>
                                        <td align="right">
                                            <button 
                                                type="button" 
                                                className="btn btn-gradient-dark btn-rounded btn-icon" 
                                                onClick={() => {
                                                    setCategory(category);
                                                    handleEditShow();
												}}>
                                                <i className="mdi mdi-tooltip-edit"></i>
                                            </button>
                                            <button 
                                                type="button" 
                                                className="btn btn-gradient-danger btn-rounded btn-icon"
                                                onClick={() => {
                                                    setCategory(category);
                                                    handleDeleteShow();
                                                }}>
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
                        Add New Category
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <form className="forms-sample">
                    <Form.Group>
                        <label htmlFor="categoryName">Name</label>
                        <Form.Control 
                            type="text" 
                            className="form-control" 
                            id="categoryName" 
                            placeholder="Category name" 
                            onChange={(e) => setNewCategory(e.target.value)} 
                        />
                    </Form.Group>
                </form>
                </Modal.Body>
                <Modal.Footer>
                <Button className="btn btn-light" onClick={handleAddClose}>Close</Button>
                    <Button 
                        className="btn btn-gradient-primary mr-2" 
                        onClick={addNewCategory}
                    >
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal
                show={modalShowEdit} 
                onHide={handleEditClose}
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Edit Category
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <form className="forms-sample">
                    <Form.Group>
                        <label htmlFor="categoryName">Name</label>
                        <Form.Control 
                            type="text" 
                            className="form-control" 
                            id="categoryName" 
                            placeholder="Category name" 
                            value={category.name}
                            onChange={(e)=>{
                                setCategory({
                                    _id: category._id,
                                    name: e.target.value,
                                })
                            }} 
                        />
                    </Form.Group>
                </form>
                </Modal.Body>
                <Modal.Footer>
                <Button className="btn btn-light" onClick={handleEditClose}>Close</Button>
                    <Button 
                        className="btn btn-gradient-primary mr-2" 
                        onClick={editCategory}
                    >
                        Edit
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
                <p>
                    Are you sure you want to delete this item?
                </p>
                </Modal.Body>
                <Modal.Footer>
                <Button className="btn btn-light" onClick={handleDeleteClose}>No</Button>
                    <Button 
                        className="btn btn-gradient-primary mr-2" 
                        onClick={deleteCategory}
                    >
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Categories;
