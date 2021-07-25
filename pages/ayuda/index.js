/**
	* Creado por Wilfer Daniel Ciro Maya - 2021
**/

// React Components
import React              from 'react';

// Custom classes
import BasePanel from '@/containers/BasePanel';
import AyudaForm from '@/formclasses/ayuda';

// Ant components and icons
import {
	Button,
	Divider,
	message
} from 'antd';

class AyudaView extends BasePanel{
	constructor(props) {
		super(props);

		// References
		this.refFormMessage = React.createRef();

		// Methods
		this.sendMessage        = this.sendMessage.bind(this);
	}

	async sendMessage() {
		let valid = await this.refFormMessage.current.validate();

		if(valid) {
			let formValues = this.refFormMessage.current.getValues();
			let body = {
				"email" : formValues["email"],
				"nombre" : formValues["nombre"],
				"asunto" : formValues["asunto"],
				"mensaje" : formValues["mensaje"],
			}

			let data = await BasePanel.service.apiSend({
				method: "POST",
				register: "mensaje",
				model: "crear",
				body: body
			});

			if(data["code"] === 200) {
				message.success("Se ha enviado el mensaje con éxito");
				this.refFormMessage.current.clearValues();
			}
			else{
				message.error("Hubo un error al enviar el mensaje");
			}
		}
	}

	render() {

		return (
			<div className="page-center">
				<section className="landing-section">
					<div className="landing-circle1" />
					<div className="landing-about-content">
						<div>
							<h2 className="landing-h2 landing-title">Ayuda Kiwi Cat</h2>
							<p>
								Somos una página sin ánimo de lucro que se preocupa por el bienestar de los kiwi peluditos, el propósito de esta página es tener toda la información sobre nuestras mascoticas recopilada con la que será fácil identificar a los peluditos si se llegan a extraviar. En el futuro esperamos poder generar códigos QR para imprimirlos en una plaquita que los peluditos llevarán, de esta manera cuando alguien se encuentre al peludito en la calle pueda tomarle foto al código y encontrar los datos necesarios para comunicarse contigo y tu peludito vuelva a casa
							</p>
						</div>
					</div>
				</section>


				<section className="landing-section">
					<div className="help-form">
						<h4 className="landing-h4 landing-title">Contáctanos</h4>
						<AyudaForm vertical={true} ref={this.refFormMessage} />
						<Divider />
						<Button type="primary" onClick={this.sendMessage}>Enviar Mensaje</Button>
					</div>
				</section>

				<section className="landing-section donation-section" id="donar">
					<div>
						<h4 className="landing-h4 landing-title">¿Deseas donar?</h4>
						<p>El único ingreso monetario de la página es a través de la venta de collares para tus mascotas y donaciones de la comunidad. Tu donación es muy importante para la mejora y mantenimiento de la página.</p>
					</div>
					<div className="donation-list">
						<div className="donation-item">
							<b>Daviplata:</b> 3173587462
						</div>
						<div className="donation-item">
							<b>Nequi:</b> 3173587462
						</div>
						<div className="donation-item">
							<b>Buy me a coffee:</b> aquí
						</div>
					</div>
				</section>
			</div>
		);
	}
}

AyudaView.getInitialProps = async ({query}) => {

	return {query};
}

AyudaView.getPageName = () => {
	return "Ayuda";
}

export default AyudaView;
