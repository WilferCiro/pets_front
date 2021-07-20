import React          from 'react';
import BasePanel      from '@/containers/BasePanel';
import Constant       from '@/components//Constant';
import {Divider}      from 'antd';
// Form Components
import FormPassword   from '@/formcomponents//FormPassword';
import FormInputText   from '@/formcomponents//FormInputText';
import LoginFormStructure from '@/formclasses/login';
import SignUpForm         from '@/formclasses/signup';

import {FaFacebook, FaLinkedin} from 'react-icons/fa';
import {AiOutlineGoogle} from 'react-icons/ai';
import { GoogleLogin } from 'react-google-login';

class Login extends BasePanel{
	constructor(props) {
		super(props);

		this.refFormLogin    = React.createRef();
		this.refFormSignup   = React.createRef();

		this.onRegisterLogin   = this.onRegisterLogin.bind(this);
		this.successLogin   = this.successLogin.bind(this);
		this.onLogin   = this.onLogin.bind(this);
		this.onSignUp   = this.onSignUp.bind(this);

		this.handleSocialLogin = this.handleSocialLogin.bind(this);
	}

	componentDidMount() {
		if(this.props.showSignUp) {
			this.onRegisterLogin();
		}
	}

	onRegisterLogin() {
		this.refs["container-login"].classList.toggle("right-panel-active");
	}

	async onSignUp() {
		let valid = await this.refFormSignup.current.validate();
		if(valid) {
			console.log(this.refFormSignup.current.getValues());
		}
	}

	async onLogin() {
		let valid = await this.refFormLogin.current.validate();
		if(!valid) {
			return;
		}

		let values = this.refFormLogin.current.getValues();

		let body = {
			"username" : values["username"],
			"password" : values["password"]
		};
		console.log(body);
		this.send({
			endpoint: Constant.getLoginEndPoint(),
			method: 'POST',
			success: this.successLogin,
			body: body,
			showMessage : true
		});
	}

	successLogin(data) {
		console.log(data);
		if(data["estado_p"] === 200) {
			this.store.setToken(data["data"]["access"]);

			this.goHome();
		}
	}

	handleSocialLogin(e) {
		console.log("....",e);
	}

	render() {

		return (
			<div className="container-login">
				<div className="container" id="container" ref="container-login">
					<div className="form-container sign-up-container">
						<div className="form">
							<h1>Crear cuenta</h1>
							<div className="social-container">
								<a href="#" className="social login"><FaFacebook /></a>
								<GoogleLogin
									clientId="727749759287-8jo5384msksp9qv9vll5ene8pmdmrt7g.apps.googleusercontent.com"
									render={renderProps => (
										<a onClick={renderProps.onClick} disabled={renderProps.disabled} className="social login"><AiOutlineGoogle /></a>
									)}
									buttonText="Login"
									onSuccess={this.handleSocialLogin}
									onFailure={this.handleSocialLogin}
									cookiePolicy={'single_host_origin'}
								/>
								<a href="#" className="social login"><FaLinkedin /></a>
							</div>
							<span>ó usa tu correo para registrarte</span>

							<SignUpForm
								vertical={true}
								ref={this.refFormSignup}
							 />

							<button className="login-button" onClick={(e) => this.onSignUp()}>Registrarse</button>
						</div>
					</div>
					<div className="form-container sign-in-container">
						<div className="form">
							<h1>Iniciar sesión</h1>


							<div className="social-container">
								<a href="#" className="social login"><FaFacebook /></a>
								<GoogleLogin
									clientId="727749759287-8jo5384msksp9qv9vll5ene8pmdmrt7g.apps.googleusercontent.com"
									render={renderProps => (
										<a onClick={renderProps.onClick} disabled={renderProps.disabled} className="social login"><AiOutlineGoogle /></a>
									)}
									buttonText="Login"
									onSuccess={this.handleSocialLogin}
									onFailure={this.handleSocialLogin}
									cookiePolicy={'single_host_origin'}
								/>
								<a href="#" className="social login"><FaLinkedin /></a>
							</div>
							<span>ó usa tus credenciales</span>

							<LoginFormStructure ref={this.refFormLogin} vertical={true} />

							<a onClick={(e) => this.redirectPage(this.constants.route_recover)} className="login">¿Olvidaste tu contraseña?</a>
							<button className="login-button" onClick={(e) => this.onLogin()}>Iniciar sesión</button>


						</div>
					</div>
					<div className="overlay-container">
						<div className="overlay">
							<div className="overlay-panel overlay-left">
								<h1 className="login-title">¡Hola!</h1>
								<p>¿Ya tienes una cuenta?</p>
								<button className="login-button ghost" id="signIn" onClick={(e) => this.onRegisterLogin()}>Inicia sesión</button>
								<Divider />
								<a className="login-link" id="signIn" onClick={(e) => this.goHome()}>Volver a la página como invitado</a>
							</div>
							<div className="overlay-panel overlay-right">
								<h1 className="login-title">¡Bienvenido!</h1>
								<p>
									¿No tienes una cuenta con nosotros?<br />
									Nuestro sistema <b>SIEMPRE</b> será gratuito.
								</p>
								<button className="login-button ghost" id="signUp" onClick={(e) => this.onRegisterLogin()}>¡Regístrate aquí!</button>
								<Divider />
								<a className="login-link" id="signIn" onClick={(e) => this.goHome()}>Volver a la página como invitado</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

Login.getInitialProps = async ({query}) => {
	let showSignUp = query["signup"] ? query["signup"] : false;
	return {query, showSignUp};
}

export default Login;
