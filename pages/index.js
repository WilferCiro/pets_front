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

// Third part
//import TextLoop from "react-text-loop";


// Ant components and icons
import {
	Col,
	Row,
	Button,
	Carousel,
	Divider,
	Space
} from 'antd';
import {QrcodeOutlined} from '@ant-design/icons'
import {
	RightOutlined,
	LeftOutlined,
	VideoCameraFilled
} from '@ant-design/icons';

class Home extends BasePanel{
	constructor(props) {
		super(props);

		// References
		this.refCarousel = React.createRef();

		// Methods
		this.iniciaYa  = this.iniciaYa.bind(this);
		this.prevPage  = this.prevPage.bind(this);
		this.nextPage  = this.nextPage.bind(this);
		this.openVideo = this.openVideo.bind(this);

	}

	componentDidMount() {
		this.setBreadCrumb([]);
	}

	iniciaYa() {
		if(this.props.isLogged) {
			this.redirectPage(this.constants.route_mascotas);
		}
		else{
			this.openLogin();
		}
	}

	prevPage() {
		this.refCarousel.current.prev();
	}

	nextPage() {
		this.refCarousel.current.next();
	}

	openVideo() {
		if(this.refVideo) {
			this.refVideo();
		}
	}

	render() {

		return (
			<div className="index-page">

				<VideoHome forwardRef={ e => {this.refVideo = e}}/>
				<div className="swipe-index">
					<Image
						src={this.constants.img_swipe}
						alt="imagen de huella"
						width={60}
						height={60}
						layout="fixed"
						priority={true}
						/>
				</div>

				<div className="slider slider-index">
					<div className="slider-left-button slider-button2">
						<Button type="primary" size={"large"} icon={<LeftOutlined />} onClick={this.prevPage}/>
					</div>
					<div className="slider-right-button slider-button2">
						<Button type="primary" size={"large"} icon={<RightOutlined />} onClick={this.nextPage} />
					</div>

					<div className="slider-index-internal">
						<Carousel effect="fade" ref={this.refCarousel}>
							<div className="index-section">
								<Row gutter={[10, 16]} align="middle">
									<Col xs={24} md={11}>
										<div>
											<h2 className="landing-h2 landing-title">{this.constants.getWebName()}</h2>
											<p>Somos una organización que se preocupa por el bienestar de los <b>Kiwi Peluditos</b>, por ese motivo buscamos soluciones para brindarte un poco más de seguridad y tranquilidad a ti y a tu peludito totalmente gratis.</p>
											<Divider />
											<Space>
												<Button type="primary" shape="round" onClick={this.iniciaYa}>Inicia ya </Button>
												<Button shape="round" onClick={this.openVideo}>Conoce más sobre nosotros </Button>
											</Space>
										</div>
									</Col>
									<Col xs={24} md={13}>
										<div className="index-section-inner">
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
								</Row>
							</div>
							<div className="index-section">
								<Row gutter={[10, 16]} align="middle" className="index-section-inner">
									<Col xs={24} md={11}>
										<div className="section2-huella">
											<Image
												src={this.constants.img_huella_qr}
												alt="imagen de huella"
												width={200}
												height={200}
												layout="responsive"
												/>
										</div>
									</Col>
									<Col xs={24} md={13}>
										<h4 className="landing-h4 landing-title">Beneficios de Kiwi Peluditos</h4>
										<p>¡Kiwi Peluditos es el mejor aliado de tu mascota!, en nuestra página puedes:</p>
										<ul>
											<li>Registrar los datos de tu Peludito en un perfil único.</li>
											<li>Generar un código QR con el perfil de tu mascota.</li>
											<li>Tener control de sus vacunas y enfermedades, y además encontrar información sobre el tema.</li>
											<li>Adquirir productos para ti y tu Peludito.</li>
										</ul>
									</Col>
								</Row>
							</div>
							<div className="index-section">
								<Row gutter={[10, 16]} align="middle" className="index-section-inner">
									<Col xs={24} md={13}>
										<h4 className="landing-h4 landing-title">Conoce nuestra tienda</h4>
										<p>Kiwi Peluditos tiene como propósito identificar a tu mascota para que puedas reencontrarte con ella en caso de pérdida. En Kiwi Peluditos puedes generar y descargar el código QR. Además, puedes comprar collares personalizados en nuestra tienda Online.</p>
										<p>¡Gracias por apoyar a Kiwi Peluditos con tu compra!.</p>
										<Divider />
										<Button type="primary" shape="round" onClick={(e) => this.redirectPage(this.constants.route_tienda)}>Visitar tienda </Button>


									</Col>
									<Col xs={24} md={11}>
										<div className="section2-huella">
											<Image
												src={this.constants.img_huella_shop}
												alt="imagen de huella"
												width={200}
												height={200}
												layout="responsive"
												/>
										</div>
									</Col>
								</Row>
							</div>
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
						</Carousel>
					</div>
				</div>


			</div>
		);
	}
}

Home.getInitialProps = async ({query, req, pathname}) => {
	query["head"] = {
		"title" : "Inicio",
		"description" : "Bienvenido a esta gran aventura llamada Kiwi Peluditos, explora y descubre los productos y servicios que tenemos para ti.",
		"keywords" : "kiwi peluditos, mascota, mensaje, tienda, peludito, inicio"
	};
	let isLogged = BasePanel.store.isLogged({query, req, pathname});
	return {query, isLogged};
}
Home.getPageName = () => {
	return "Inicio";
}
export default Home;

/*

*/
