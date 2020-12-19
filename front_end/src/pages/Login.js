import React from 'react';
import {
	InputGroup,
	InputGroupAddon,
	InputGroupText,
	Input,
	CustomInput,
	FormGroup,
	Row,
	Col,
	UncontrolledTooltip,
	Button
} from 'reactstrap';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { authenticationService } from '../jwt/_services';
const sidebarBackground = {
	backgroundColor: "#e1e2dd", // eef5f9
	backgroundRepeat: "no-repeat",
	backgroundPosition: "bottom center"
};

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}
	handleClick() {
		var elem = document.getElementById('loginform');
		elem.style.transition = "all 2s ease-in-out";
		elem.style.display = "none";
		document.getElementById('recoverform').style.display = "block";
	}
	render() {
		return <div className="">
			{/*--------------------------------------------------------------------------------*/}
			{/*Login Cards*/}
			{/*--------------------------------------------------------------------------------*/}
			<div className="auth-wrapper d-flex no-block justify-content-center align-items-center" style={sidebarBackground}>
				<div className="auth-box on-sidebar">
					<div id="loginform">
						<div className="logo">														<h5 className="font-medium mb-3">Iniciar Sesión</h5>
						</div>
						<Row>
							<Col xs="12">
								<Formik
				                    initialValues={{
				                        username: '',
				                        password: ''
				                    }}
				                    validationSchema={Yup.object().shape({
				                        username: Yup.string().required('Username is required'),
				                        password: Yup.string().required('Password is required')
				                    })}
				                    onSubmit={({ username, password }, { setStatus, setSubmitting }) => {
				                        setStatus();
				                        authenticationService.login(username, password)
				                            .then(
				                                user => {
				                                    const { from } = this.props.location.state || { from: { pathname: "/" } };
				                                    this.props.history.push(from);
				                                },
				                                error => {
				                                    setSubmitting(false);
				                                    setStatus(error);
				                                }
				                            );
				                    }}
				                    render={({ errors, status, touched, isSubmitting }) => (
								<Form className="mt-3" id="loginform">
									<InputGroup className="mb-3">
										<InputGroupAddon addonType="prepend">
											<InputGroupText>
												<i className="ti-user"></i>
											</InputGroupText>
										</InputGroupAddon>

										<Field name="username" type="text" placeholder="Usuario" className={'form-control' + (errors.username && touched.username ? ' is-invalid' : '')} />
                                		<ErrorMessage name="username" component="div" className="invalid-feedback" />
									</InputGroup>
									<InputGroup className="mb-3">
										<InputGroupAddon addonType="prepend">
											<InputGroupText>
												<i className="ti-pencil"></i>
											</InputGroupText>
										</InputGroupAddon>
										<Field name="password" type="password" placeholder="Contraseña" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                                		<ErrorMessage name="password" component="div" className="invalid-feedback" />

									</InputGroup>
									<div className="d-flex no-block align-items-center mb-3">
										<CustomInput type="checkbox" id="exampleCustomCheckbox" label="Recordar credenciales" />
										<div className="ml-auto">
											<a href="#recoverform" id="to-recover" onClick={this.handleClick} className="forgot text-dark float-right"><i className="fa fa-lock mr-1"></i> Olvidé mi contraseña</a>
										</div>
									</div>
									<Row className="mb-3">
										<Col xs="12">
											<button type="submit" className="btn btn-block btn-primary login-button" style={{backgroundColor:'#bc000e',border:'none'}} disabled={isSubmitting}>Login</button>


										</Col>
									</Row>
								{status &&
                                <div className={'alert alert-danger'}>{status}</div>
                            }
								</Form>
								)}
                />
							</Col>
						</Row>
					</div>
					<div id="recoverform">
						<div className="logo">

							<h5 className="font-medium mb-3">Recuperar Contraseña</h5>
							<span>Ingresa tu correo y te enviaremos las instrucciones para recuperar tu cuenta.</span>
						</div>
						<Row className="mt-3">
							<Col xs="12">
								<Form action="/dashbaord">
									<FormGroup>
										<Input type="text" name="uname" bsSize="lg" id="Name" placeholder="Correo" required />
									</FormGroup>
									<Row className="mt-3">
										<Col xs="12">
											<Button color="danger" size="lg" type="submit" block>Recuperar</Button>
										</Col>
									</Row>
								</Form>
							</Col>
						</Row>
					</div>
				</div>
			</div>
		</div>;
	}
}

export default Login;
