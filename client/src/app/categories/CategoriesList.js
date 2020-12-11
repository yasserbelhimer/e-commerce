import React, { Component, useState ,useEffect} from "react";
import { Button, Form, Modal } from 'react-bootstrap';

import axios from "axios";

import { API_URL } from "../../constants";

const CategoriesList  = () => {
    const [categories, setCategories] = useState([]);
	const [openEdit, setOpenEdit] = React.useState(false);
	const [openNew, setOpenNew] = React.useState(false);
	const [category, setCategory] = React.useState({ _id: "", name: "" });
    const [reload, setReload] = useState(false);

    const [modalShow, setModalShow] = React.useState(false);
    const [toDelete,setToDelete] = useState("");
    const [modalShowConfirm, setModalShowConfirm] = React.useState(false);

	const editCategory = () => {
		axios
			.post(API_URL + "categories/update/" + category._id, {
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

	const deleteCategory = () => {
		axios
			.delete(API_URL + "categories/" + toDelete)
			.then((res) => {
                reload?setReload(false):setReload(true);
                setModalShowConfirm(false);
			})
			.catch((err) => {
                reload?setReload(false):setReload(true);
                setModalShowConfirm(false);
			});
	};
	const handleClickOpenEdit = (category) => {
        console.log('hello');
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
                    onClick={() => setModalShow(true)}
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
                                    <tr>
                                        <td>#{index + 1}</td>
                                        <td>{category.name}</td>
                                        <td align="right">
                                            <button 
                                                type="button" 
                                                className="btn btn-gradient-dark btn-rounded btn-icon" 
                                                onClick={() => {
														handleClickOpenEdit(
															category
														);
													}}>
                                                <i className="mdi mdi-tooltip-edit"></i>
                                            </button>
                                            <button 
                                                type="button" 
                                                className="btn btn-gradient-danger btn-rounded btn-icon"
                                                onClick={() => {
                                                    setToDelete(category._id);
                                                    setModalShowConfirm(true);
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
            <AddCategoryModal
                show={modalShow}
                onHide={() => {
                    reload?setReload(false):setReload(true);
                    setModalShow(false);
                }}
            />
            <DeleteConfirmationModal
                show={modalShowConfirm}
                run={()=>{
                    deleteCategory();
                }}
                onHide={() => {
                    reload?setReload(false):setReload(true);
                    setModalShowConfirm(false);
                }}
            />
        </div>
    );
}

function AddCategoryModal(props) {
    const [NewCategory, setNewCategory] = useState("");
    
    const addNewCategory = () => {
		axios.post(API_URL + "categories/add", { name: NewCategory })
		    .then((res) => {
                console.log(res);
                props.onHide();
			})
			.catch((err) => {
                console.log(err)
				props.onHide();
            });
        
	};
    return (
      <Modal
        {...props}
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
          <Button className="btn btn-light" onClick={props.onHide}>Close</Button>
            <Button 
                className="btn btn-gradient-primary mr-2" 
                onClick={addNewCategory}
            >
                Submit
            </Button>
        </Modal.Footer>
      </Modal>
    );
}
  
function DeleteConfirmationModal(props) {
    return (
      <Modal
        {...props}
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
          <Button className="btn btn-light" onClick={props.onHide}>No</Button>
            <Button 
                className="btn btn-gradient-primary mr-2" 
                onClick={props.run}
            >
                Yes
            </Button>
        </Modal.Footer>
      </Modal>
    );
}
  
  
export default CategoriesList;
