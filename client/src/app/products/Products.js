import Axios from 'axios';
import React,{useState,useEffect} from 'react';
import { connect } from "react-redux";
import { API_URL } from '../../constants';

const Products = (props) => {
    const [products,setProducts] = useState([]);

    useEffect(() => {
        Axios.get(API_URL+"products/all").then(res=>{
            setProducts(res.data);
        }).catch(err=>{
            console.log(err);
        })
    }, [])
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
									<th>Category</th>
									<th>Product</th>
									<th>Quantity</th>
									<th>Price</th>
									<th></th>
								</tr>
							</thead>
							<tbody>
								{products.map((product, index) => (
									<tr key={product._id}>
										<td>{product.category!=null?product.category.name:""}</td>
										<td>{product.name}</td>
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
