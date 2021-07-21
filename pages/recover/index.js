import React              from 'react';
import BasePanel          from '@/containers/BasePanel';
import RecoverPassForm    from '@/formclasses/recover_pass';
import RecoverPassFinalForm from '@/formclasses/recover_pass_final';

import {Button, Divider, Alert, message}  from 'antd';

class RecoverView extends BasePanel{
	constructor(props) {
		super(props);

		this.sendEmail        = this.sendEmail.bind(this);
		this.successSendEmail = this.successSendEmail.bind(this);

		this.changePass        = this.changePass.bind(this);
		this.successChangePass = this.successChangePass.bind(this);

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
		console.log(body);
		this.send({
			endpoint: this.constants.getRecoverEndPoint(),
			method: 'POST',
			success: this.successSendEmail,
			body: body,
			showMessage : true
		});
	}

	successSendEmail(data) {
		if(data["estado_p"] === 200) {
			message.info("Se ha enviado un correo electrónico");
			this.refFormEmail.current.clearValues();
		}
	}

	async changePass() {
		let valid = await this.refFormFinal.current.validate();
		if(!valid) {
			return;
		}
		let values = this.refFormFinal.current.getValues();
		let body = {
			"password" : values["password"]["password1"],
			"modelo" : "recuperar"
		};
		console.log(body);
		this.send({
			endpoint: this.constants.getPrivateEndpoint() + "recover",
			method: 'PUT',
			success: this.successChangePass,
			body: body,
			showMessage : true,
			requires_token: true,
			token: this.props.token
		});
	}

	successChangePass(data) {
		if(data["estado_p"] === 200) {
			message.info("Se ha cambiado la contraseña con éxito, por favor inicia sesión");
			this.redirectPage(this.constants.route_login, {});
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
							<Button type="primary" onClick={this.changePass}>Enviar instrucciones</Button>
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

export default RecoverView;
