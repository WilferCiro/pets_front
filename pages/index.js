/**
	* Creado por Wilfer Daniel Ciro Maya - 2021
**/

// React Components
import React          from 'react';

// NextJS libraries
import Image from 'next/image'

// Custom classes
import BasePanel      from '@/containers/BasePanel';
import VideoHome      from '@/components/VideoHome';
import CatSpeak       from '@/components/CatSpeak';

// Ant components and icons
import {
	Col,
	Row,
	Button
} from 'antd';
import {QrcodeOutlined} from '@ant-design/icons'

class Home extends BasePanel{
	constructor(props) {
		super(props);

		// References
		this.refVideo = React.createRef();

	}

	componentDidMount() {
		this.setBreadCrumb([]);
	}

	render() {

		return (
			<div className="index-page">
				<section className="landing-section" id="index">
					<div className="landing-circle1" onClick={(e) => this.refVideo.current.open()}>
						<CatSpeak text="Dame click para conocer más sobre nosotros con un video" />
					</div>
					<div className="landing-circle2" />
					<div className="landing-circle3" />
					<div className="landing-circle4" />
					<div className="landing-about-content">
						<div>
							<h2 className="landing-h2 landing-title">{this.constants.getWebName()}</h2>
							<p>Somos una organización que se preocupa por el bienestar de los <b>Kiwi Peluditos</b>, por ese motivo buscamos soluciones para brindarte un poco más de seguridad y tranquilidad a ti y a tu peludito totalmente gratis.</p>
							<a className="inicia-ya">Inicia ya </a>
						</div>
					</div>
					<VideoHome ref={this.refVideo}/>
				</section>

				<section className="landing-section" id="beneficios">
					<Row gutter={[40, 16]} align="middle">
						<Col xs={24} md={14} lg={12}>
							<div className="landing-left-item"><QrcodeOutlined className="landing-icon"/></div>
						</Col>
						<Col xs={24} md={10} lg={12}>
							<h4 className="landing-h4 landing-title">Beneficios de Kiwi Peluditos</h4>
							<p>¡Kiwi peluditos es el mejor aliado de tu mascota! Registra fácilmente tus mascotas con todos sus datos para generar su código QR, puedes tener:</p>
							<ul>
								<li>Incluir foto, raza, tamaño, color, condiciones especiales y una corta descripción de tu peludito.</li>
								<li>Carga del carnet de vacunas.</li>
								<li>Identificación, localización e Información de contacto ante pérdidas de tu mascota</li>
								<li>Todos los datos son completamente actualizables por si cambias tus datos.</li>
							</ul>
						</Col>
					</Row>
				</section>

				<Row align="middle" className="landing-section">
					<Col span={1} />
					<Col span={22}>
						<h4 className="landing-h4 landing-title">¿Deseas comprar una placa?</h4>
						<p>Diseña la plaquita de tu mascota y envíanola automáticamente, nosotros te hacemos llegar tu placa.</p>
						<Row gutter={[5, 5]} align="middle">
							<Col xs={12} md={6}>
								<div className="buy-section-item">Código único</div>
							</Col>
							<Col xs={12} md={6}>
								<div className="buy-section-item">Variados diseños</div>
							</Col>
							<Col xs={12} md={6}>
								<div className="buy-section-item">Calidad única</div>
							</Col>
							<Col xs={12} md={6}>
								<div className="buy-section-item">Diferentes tamaños</div>
							</Col>
						</Row>
					</Col>
				</Row>

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

Home.getInitialProps = async ({query, req, pathname}) => {
	console.log(pathname);
	return {query};
}
Home.getPageName = () => {
	return "Inicio";
}
export default Home;
