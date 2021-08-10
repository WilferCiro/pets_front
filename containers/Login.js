/**
	* Creado por Wilfer Daniel Ciro Maya - 2021
**/

// React Components
import React          from 'react';

// Custom classes
import BasePanel      from '@/containers/BasePanel';
import LoginForm       from '@/formclasses/login';
import SignUpForm      from '@/formclasses/signup';
import ButtonCustom   from '@/components/ButtonCustom';

// Ant components and icons
import {
	Divider,
	message,
	Button,
	Modal
} from 'antd';

class Login extends BasePanel{
	constructor(props) {
		super(props);

		// States
		this.state = {
			show: false
		}

		// Refs
		this.refFormLogin         = React.createRef();
		this.refFormSignup        = React.createRef();
		this.refContainer         = React.createRef();
		this.refButtonLogin       = React.createRef();
		this.refButtonRegistrarme = React.createRef();

		// Methods
		this.handleSocialLogin = this.handleSocialLogin.bind(this);
		this.onRegisterLogin   = this.onRegisterLogin.bind(this);
		this.onSignUp          = this.onSignUp.bind(this);
		this.onLogin           = this.onLogin.bind(this);
		this.open              = this.open.bind(this);
		this.close             = this.close.bind(this);

		// Variables
		this.attrs = {};

	}


	componentDidMount() {
		if(this.props.showSignUp) {
			this.onRegisterLogin();
		}

		if(this.props.from_cart){
			message.info("Inicia sesión o regístrate para continuar con la compra");
		}
	}
	open(attrs) {
		this.attrs = attrs;
		if(this.attrs["from_cart"]) {
			message.info("Inicia sesión para continuar con el proceso de compra");
		}
		this.setState({
			show: true
		})
	}
	close() {
		this.setState({
			show: false
		})
	}
	onRegisterLogin() {
		this.refContainer.current.classList.toggle("login-signup-container-show");
	}

	async onSignUp() {
		let valid = await this.refFormSignup.current.validate();
		if(valid) {
			this.refButtonRegistrarme.current.setDisabled(true);
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
			this.refButtonRegistrarme.current.setDisabled(false);

		}
	}

	async onLogin() {
		let valid = await this.refFormLogin.current.validate();
		if(!valid) {
			return;
		}
		this.refButtonLogin.current.setDisabled(true);
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
			this.close();
			this.store.setToken(data["data"]["access"]);
			this.user.setName(data["data"]["full_name"]);
			this.user.setAvatar(data["data"]["avatar"]);
			this.user.setMascotasPk(data["data"]["mascotas"]);
			this.user.setNroPedidos(data["data"]["cantidad_pedidos"]);
			message.success("Sesión iniciada con éxito, redireccionado...");
			if(this.attrs["from_cart"]){
				this.redirectPage(this.constants.route_cart);
			}
			else if(this.attrs["mascota"] !== null && this.attrs["mascota"] !== undefined){
				this.redirectPage(this.constants.route_profile_mascotas, {pk: this.attrs["mascota"], fromLogin: true});
			}
			else if(this.attrs["from_mascotas"]) {
				this.redirectPage(this.constants.route_mascotas);
			}
			else if(this.attrs["producto"]){
				this.redirectPage(this.constants.route_profile_producto, {pk: this.attrs["producto"], fromLogin: true});
			}
			else{
				this.redirectPage(this.constants.route_profile);
			}
		}
		else{
			message.error("Usuario o contraseña incorrectos");
		}
		this.refButtonLogin.current.setDisabled(false);
	}

	handleSocialLogin(e) {

	}


	render() {
		return (
			<div>
				<Modal visible={this.state.show} footer={null} width={420} centered onCancel={this.close}>
					<div className="login-signup-container" ref={this.refContainer}>
						<div className="login">
							<h2>Inicia sesión</h2>
							<Divider />
							<LoginForm ref={this.refFormLogin} vertical={true} />
							<a onClick={(e) => this.redirectPage(this.constants.route_recover)} className="remember-password">¿Olvidaste tu contraseña?</a>
							<Divider />
							<ButtonCustom type="primary" shape="round" size="large" onClick={this.onLogin} text="Iniciar sesión" ref={this.refButtonLogin} block />
							<Divider>ó</Divider>
							<Button onClick={(e) => this.onRegisterLogin()} block>Regístrate</Button>
						</div>

						<div className="signup">
							<h2>Regístrate</h2>
							<Divider />
							<SignUpForm
								vertical={true}
								ref={this.refFormSignup}
								id="signup"
							/>
							<p>Al registrarse usted acepta nuestra <a onClick={(e) => this.redirectPage(this.constants.route_condiciones)}>política de privacidad de datos</a></p>
							<Divider />
							<ButtonCustom type="primary" shape="round" size="large" onClick={this.onSignUp} text="Registrarme" ref={this.refButtonRegistrarme} block />
							<Divider>ó</Divider>
							<Button onClick={(e) => this.onRegisterLogin()} block>Iniciar sesión</Button>
						</div>
					</div>
				</Modal>
			</div>
		);
	}
}

export default Login;
