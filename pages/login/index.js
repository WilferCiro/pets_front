/**
	* Creado por Wilfer Daniel Ciro Maya - 2021
**/

// React Components
import React from 'react';

// Custom classes
import BasePanel       from '@/containers/BasePanel';
import FormPassword    from '@/formcomponents//FormPassword';
import FormInputText   from '@/formcomponents//FormInputText';
import LoginForm       from '@/formclasses/login';
import SignUpForm      from '@/formclasses/signup';

// Third part libraries
import { GoogleLogin } from 'react-google-login';

// Ant components and icons
import {
	Divider,
	message
} from 'antd';

class Login extends BasePanel{
	constructor(props) {
		super(props);

		// References
		this.refFormLogin  = React.createRef();
		this.refFormSignup = React.createRef();
		this.refContainer  = React.createRef();

		// Methods
		this.handleSocialLogin = this.handleSocialLogin.bind(this);
		this.onRegisterLogin   = this.onRegisterLogin.bind(this);
		this.onSignUp          = this.onSignUp.bind(this);
		this.onLogin           = this.onLogin.bind(this);
	}

	componentDidMount() {
		if(this.props.showSignUp) {
			this.onRegisterLogin();
		}

		if(this.props.from_cart){
			message.info("Inicia sesión o regístrate para continuar con la compra");
		}
	}

	onRegisterLogin() {
		this.refContainer.current.classList.toggle("right-panel-active");
	}

	async onSignUp() {
		let valid = await this.refFormSignup.current.validate();
		if(valid) {
			let values = this.refFormSignup.current.getValues();
			let body = {
				"email" : values["email"].trim().toLowerCase(),
				"password" : values["password"]["password1"].trim(),
				"first_name" : values["nombres"].trim(),
				"last_name" : values["apellidos"].trim(),
				"acepta_condicion" : true
			}

			let data = await BasePanel.service.apiSend({
				method: "POST",
				register: "user",
				model: "registrar",
				isPublic: true,
				body: body,
				showError: true
			});
			if(data["success"]) {
				message.success("Se ha registrado con éxito, se ha enviado un correo de confirmación.");
				this.refFormSignup.current.clearValues();
				this.onRegisterLogin();
			}

		}
	}

	async onLogin() {
		let valid = await this.refFormLogin.current.validate();
		if(!valid) {
			return;
		}

		let values = this.refFormLogin.current.getValues();

		let body = {
			"username" : values["username"].trim().toLowerCase(),
			"password" : values["password"].trim()
		};
		let data = await BasePanel.service.apiSend({
			method: "POST",
			register: "login",
			model: "login",
			isPublic: true,
			body: body
		});
		if(data["success"]) {
			this.store.setToken(data["data"]["access"]);
			this.user.setName(data["data"]["full_name"]);
			this.user.setAvatar(data["data"]["avatar"]);
			this.user.setMascotasPk(data["data"]["mascotas"]);
			this.user.setNroPedidos(data["data"]["cantidad_pedidos"]);
			if(this.props.from_cart){
				this.redirectPage(this.constants.route_pay);
			}
			if(this.props.mascota){
				this.redirectPage(this.constants.route_profile_mascotas, {pk: this.props.mascota});
			}
			if(this.props.producto){
				this.redirectPage(this.constants.route_profile_producto, {pk: this.props.producto});
			}
			else{
				message.success("Sesión iniciada con éxito, redireccionado...");
				this.redirectPage(this.constants.route_profile);
			}
		}
		else{
			message.error("Usuario o contraseña incorrectos");
		}
	}

	handleSocialLogin(e) {
		console.log("....",e);
	}

	render() {

		return (
			<div className="container-login">
				<div className="container" id="container" ref={this.refContainer}>
					<div className="form-container sign-up-container">
						<div className="form">
							<h1>Registrarse</h1>
							<span>Usa tu correo para registrarte</span>

							<SignUpForm
								vertical={true}
								ref={this.refFormSignup}
								id="signup"
							/>
							<p>Al registrarse usted acepta nuestra <a onClick={(e) => this.redirectPage(this.constants.route_condiciones)}>política de privacidad de datos</a></p>

							<button className="login-button" onClick={(e) => this.onSignUp()}>Registrarse</button>
							<a className="login show-mobile" onClick={(e) => this.onRegisterLogin()}>Iniciar sesión</a>
						</div>
					</div>
					<div className="form-container sign-in-container">
						<div className="form">
							<h1>Iniciar sesión</h1>
							<div className="social-container">
								<a href="#" className="social login"></a>
								<GoogleLogin
									clientId="727749759287-8jo5384msksp9qv9vll5ene8pmdmrt7g.apps.googleusercontent.com"
									render={renderProps => (
										<a onClick={renderProps.onClick} disabled={renderProps.disabled} className="social login"></a>
									)}
									buttonText="Login"
									onSuccess={this.handleSocialLogin}
									onFailure={this.handleSocialLogin}
									cookiePolicy={'single_host_origin'}
								/>
								<a href="#" className="social login"></a>
							</div>
							<span>ó usa tus credenciales</span>

							<LoginForm ref={this.refFormLogin} vertical={true} />

							<a onClick={(e) => this.redirectPage(this.constants.route_recover)} className="login">¿Olvidaste tu contraseña?</a>
							<button className="login-button" onClick={(e) => this.onLogin()}>Iniciar sesión</button>
							<a className="login show-mobile" onClick={(e) => this.onRegisterLogin()}>Registrarse</a>
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
	let from_cart = query["from_cart"] ? query["from_cart"] : false;
	let mascota = query["mascota"] ? query["mascota"] : false;
	let producto = query["producto"] ? query["producto"] : false;

	query["head"] = {
		"title" : "Iniciar sesión",
		"description" : "Regístrate y empieza esta gran aventura llamada KiwiPeluditos.",
		"keywords" : "kiwipeluditos, mascota, iniciar sesión, registrarse, tienda, peludito"
	};

	return {query, showSignUp, from_cart, mascota, producto};
}

export default Login;
