import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button, Form } from "react-bootstrap";

// import Form from "react-validation/build/form";
// import Input from "react-validation/build/input";
// import CheckButton from "react-validation/build/button";

import { connect } from "react-redux";
import { login } from "../../actions/auth";

export class Login extends Component {
	constructor(props) {
		super(props);
		this.handleLogin = this.handleLogin.bind(this);
		this.onChangeEmail = this.onChangeEmail.bind(this);
		this.onChangePassword = this.onChangePassword.bind(this);

		this.state = {
			email: "",
			password: "",
			loading: false,
		};
	}
	onChangeEmail(e) {
		this.setState({
			email: e.target.value,
		});
	}

	onChangePassword(e) {
		this.setState({
			password: e.target.value,
		});
	}

	handleLogin(e) {
		e.preventDefault();
		console.log("i am in");
		this.setState({
			loading: true,
		});

		// const { dispatch, history } = this.props;

		// dispatch(login(this.state.email, this.state.password))
		// 	.then(() => {
		// 		history.push("/dashboard");
		// 		window.location.reload();
		// 	})
		// 	.catch(() => {
		// 		this.setState({
		// 			loading: false,
		// 		});
		// 	});
	}

	render() {
		return (
			<div>
				<div className="d-flex align-items-center auth px-0">
					<div className="row w-100 mx-0">
						<div className="col-lg-4 mx-auto">
							<div className="auth-form-light text-left py-5 px-4 px-sm-5">
								<div className="brand-logo">
									<img
										src={require("../../assets/images/logo.svg")}
										alt="logo"
									/>
								</div>
								<h4>Hello! let's get started</h4>
								<h6 className="font-weight-light">
									Sign in to continue.
								</h6>
								<Form
									className="pt-3"
									onSubmit={this.handleLogin}
								>
									<Form.Group className="d-flex search-field">
										<Form.Control
											type="email"
											placeholder="Email"
											size="lg"
											className="h-auto"
											name="email"
											value={this.state.email}
											onChange={this.onChangeEmail}
										/>
									</Form.Group>
									<Form.Group className="d-flex search-field">
										<Form.Control
											type="password"
											placeholder="Password"
											size="lg"
											value={this.state.password}
											onChange={this.onChangePassword}
											className="h-auto"
										/>
									</Form.Group>
									<div className="mt-3">
										<Button
											className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
											disabled={this.state.loading}
											type="submit"
										>
											LOGIN{"  "}
											{this.state.loading && (
												<span className="spinner-border spinner-border-sm"></span>
											)}
										</Button>
									</div>
									<div className="my-2 d-flex justify-content-between align-items-center">
										<div className="form-check">
											<label className="form-check-label text-muted">
												<input
													type="checkbox"
													className="form-check-input"
												/>
												<i className="input-helper"></i>
												Keep me logged in
											</label>
										</div>
										<a
											href="!#"
											onClick={(event) =>
												event.preventDefault()
											}
											className="auth-link text-black"
										>
											Forgot password?
										</a>
									</div>
								</Form>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Login;
