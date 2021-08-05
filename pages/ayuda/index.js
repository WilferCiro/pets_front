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
			<div className="page-center">
				<section className="landing-section">
					<div className="landing-circle1" />
					<div className="landing-about-content">
						<div>
							<h2 className="landing-h2 landing-title">Ayuda Kiwi Cat</h2>
							<p>Somos una organización que se preocupa por el bienestar de los <b>Kiwi Peluditos</b>, por ese motivo buscamos soluciones para brindarte un poco más de seguridad y tranquilidad a ti y a tu peludito totalmente gratis.</p>
							<p>Nuestro principal objetivo es que puedas tener un espacio propio en nuestra página web totalmente gratis, pues sabemos que por diferentes motivos nuestros peluditos se pierden y no sabemos que hacer. En Kiwi Peluditos, solo con un clic podrás reportar a tu mascota perdida y compartirlo en tus redes sociales. Lo mejor es que no tienes que preocuparte por diseñar un cartel donde probablemente te olvides de alguna información que sea importante, déjanos a nosotros, ¡en Kiwi Peluditos lo hacemos por ti!</p>
							<p>Nuestro segundo objetivo es generar un código QR único para cada peludito, este código QR dirigirá a la persona que lo escaneé a nuestra página web donde podrá encontrar toda la información de tu peludito, además, esta persona podrá acceder a comunicarse contigo y así ponerse de acuerdo para programar el tan esperado reencuentro con tu peludito.</p>
						</div>
					</div>
				</section>


				<section className="landing-section">
					<div className="help-form">
						<h4 className="landing-h4 landing-title">Contáctanos</h4>
						<p>Déjanos un mensaje, sugerencia o duda.</p>
						<AyudaForm vertical={true} ref={this.refFormMessage} />
						<Divider />
						<Button type="primary" onClick={this.sendMessage}>Enviar Mensaje</Button>
					</div>
				</section>

				<section className="landing-section donation-section" id="donar">
					<div>
						<h4 className="landing-h4 landing-title">¿Deseas donar?</h4>
						<p>En Kiwi Peluditos no solo aquellos que adquieren una plaquita con código QR puede acceder a nuestra página web, puesto que nos preocupamos por el bienestar de todos, Kiwi Peluditos está a disposición de la población colombiana. Para poder sostener nuestra página web, vendemos diferentes productos y servicios, pero a veces no es suficiente y necesitaremos tu ayuda para poder mantener nuestra web al servicio de todos totalmente gratis. Con tu donación podremos:</p>
						<ul>
							<li>Actualizar constantemente la página, añadiendo mayores y mejores funciones</li>
							<li>Brindar a todos nuestros usuarios seguridad, manteniendo la pagina vigilada.</li>
							<li>Actualización de contenidos constante.</li>
							<li>Además, podrás contribuir al desarrollo y crecimiento de empresas 100% colombianas.</li>
						</ul>
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
