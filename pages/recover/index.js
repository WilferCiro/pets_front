/**
	* Creado por Wilfer Daniel Ciro Maya - 2021
**/

// React Components
import React          from 'react';

// Custom classes
import BasePanel            from '@/containers/BasePanel';
import RecoverPassForm      from '@/formclasses/recover_pass';
import RecoverPassFinalForm from '@/formclasses/recover_pass_final';

// Ant components and icons
import {
	Button,
	Divider,
	Alert,
	message
} from 'antd';

class RecoverView extends BasePanel{
	constructor(props) {
		super(props);

		// Methods
		this.sendEmail         = this.sendEmail.bind(this);
		this.changePass        = this.changePass.bind(this);

		// References
		this.refFormFinal    = React.createRef();
		this.refFormEmail    = React.createRef();
	}

	componentDidMount() {
	}

	async sendEmail() {
		let valid = await this.refFormEmail.current.validate();
		if(!valid) {
			return;
		}
		let values = this.refFormEmail.current.getValues();
		let body = {
			"email" : values["email"]
		};
		let data = await BasePanel.service.apiSend({
			method: "POST",
			register: "recover",
			model: "recover",
			body: body
		});
		if(data["code"] === 200) {
			message.info("Se ha enviado un correo electrónico");
			this.refFormEmail.current.clearValues();
		}
	}

	async changePass() {

		// FIXME: Comprobar que el token sea válido

		let valid = await this.refFormFinal.current.validate();
		if(!valid) {
			return;
		}
		let values = this.refFormFinal.current.getValues();
		let body = {
			"password" : values["password"]["password1"]
		};
		console.log(body);

		let data = await BasePanel.service.apiSend({
			method: "PUT",
			register: "recover",
			model: "recuperar",
			body: body,
			isPublic: false,
			token: this.props.token
		});

		if(data["code"] === 200) {
			message.info("Se ha cambiado la contraseña con éxito, por favor inicia sesión");
			this.redirectPage(this.constants.route_login, {});
		}
		else{
			message.error("Ocurrió un error al cambiar la contraseña");
		}
	}

	render() {
		let token = this.props.token;

		if (token) {
			return (
				<div className="page-center">

					<section className="landing-section">
						<div className="help-form">
							<h4 className="landing-h4 landing-title">Recuperar contraseña</h4>
							<Alert
								message="Información importante"
								description="Ingresa tu nueva contraseña."
								type="info"
								showIcon
							/>
							<Divider />
							<RecoverPassFinalForm vertical={true} ref={this.refFormFinal} />
							<Divider />
							<Button type="primary" onClick={this.changePass}>Modificar mi contraseña</Button>
						</div>
					</section>

				</div>
			)
		}

		return (
			<div className="page-center">

				<section className="landing-section">
					<div className="help-form">
						<h4 className="landing-h4 landing-title">Recuperar contraseña</h4>
						<Alert
							message="Información importante"
							description="Se enviará un correo electrónico con las instrucciones para recuperar la contraseña."
							type="info"
							showIcon
						/>
						<Divider />
						<RecoverPassForm vertical={true} ref={this.refFormEmail} />
						<Divider />
						<Button type="primary" onClick={this.sendEmail}>Enviar instrucciones</Button>
					</div>
				</section>

			</div>
		);
	}
}

RecoverView.getInitialProps = async ({query}) => {
	let token = query.token;
	return {query, token};
}
RecoverView.getPageName = () => {
	return "Recuperar contraseña";
}
export default RecoverView;
