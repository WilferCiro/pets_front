/**
	* Creado por Wilfer Daniel Ciro Maya - 2021
**/

// React Components
import React              from 'react';

// NextJS libraries
import Image from 'next/image'

// Custom classes
import BasePanel from '@/containers/BasePanel';
import AyudaForm from '@/formclasses/ayuda';

// Ant components and icons
import {
	Button,
	Divider,
	message,
	Row,
	Col,
	Space
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

			if(data["success"]) {
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
			<div>
				<div className="index-section">
					<Row gutter={[10, 16]} align="middle">
						<Col xs={24} md={13}>
							<div>
								<div className="section1-huella">
									<Image
										src={this.constants.img_huella}
										alt="imagen de huella"
										width={200}
										height={200}
										layout="responsive"
										priority={true}
										/>
								</div>
							</div>
						</Col>
						<Col xs={24} md={11}>
							<div>
								<h2 className="landing-h2 landing-title">{this.constants.getWebName()}</h2>
								<p>Somos una organización que se preocupa por el bienestar de los <b>Kiwi Peluditos</b>, por ese motivo buscamos soluciones para brindarte un poco más de seguridad y tranquilidad a ti y a tu peludito totalmente gratis.</p>
								<Divider />
							</div>
						</Col>
					</Row>
				</div>


				<section className="landing-section">
					<div className="help-form">
						<h4 className="landing-h4 landing-title">Contáctanos</h4>
						<p>Déjanos un mensaje, sugerencia o duda.</p>
						<AyudaForm vertical={true} ref={this.refFormMessage} />
						<Divider />
						<Button type="primary" onClick={this.sendMessage}>Enviar Mensaje</Button>
					</div>
				</section>


				<div className="index-section">
					<Row gutter={[10, 16]} align="middle" className="index-section-inner">
						<Col xs={24} md={13}>
							<h4 className="landing-h4 landing-title">¿Deseas donar?</h4>
							<p><b>¡Los servicios Kiwi Peluditos son completamente gratuitos!</b> Para seguir ayudando a mas Peluditos, contamos con nuestra tienda online y con tu colaboración. Gracias a tus donaciones podemos:</p>
							<ul>
								<li>Actualizar la aplicación, añadiendo mayores y mejores funciones.</li>
								<li>Brindar seguridad a todos nuestros/as usuarios/as.</li>
								<li>Subir contenido a nuestro Blog.</li>
								<li>Además, podrás contribuir al desarrollo y crecimiento de empresas 100% Colombianas.</li>
							</ul>
						</Col>
						<Col xs={24} md={11}>
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
						</Col>
					</Row>
				</div>
			</div>
		);
	}
}

AyudaView.getInitialProps = async ({query}) => {
	query["head"] = {
		"title" : "Ayuda",
		"description" : "¿Tienes dudas, inquietudes o sugerencias? envíanos un mensaje y ayudanos a crecer.",
		"keywords" : "kiwipeluditos, mascota, mensaje, ayuda, tienda, peludito"
	};
	return {query};
}

AyudaView.getPageName = () => {
	return "Ayuda";
}

export default AyudaView;
