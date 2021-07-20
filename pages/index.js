import React          from 'react';
import BasePanel      from '@/containers/BasePanel';
import {Button}       from 'antd';
import {QrcodeOutlined} from '@ant-design/icons'
import { Anchor } from 'antd';

const { Link } = Anchor;

class Home extends BasePanel{
	constructor(props) {
		super(props);

	}

	componentDidMount() {
		BasePanel.refBreadcrumb.current.setItems([]);
	}

	render() {

		return (
			<div className="index-page">
				<section className="landing-section" id="index">
					<div className="landing-circle1" />
					<div className="landing-circle2" />
					<div className="landing-circle3" />
					<div className="landing-circle4" />
					<div className="landing-about-content">
						<div>
							<h2 className="landing-h2 landing-title">Kiwi Cat</h2>
							<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</p>
							<a className="inicia-ya">Inicia ya </a>
						</div>
					</div>
				</section>
				<section className="landing-section beneficios-section" id="beneficios">
					<div className="landing-left-item"><QrcodeOutlined className="landing-icon"/></div>
					<div className="landing-about-content">
						<div>
							<h4 className="landing-h4 landing-title">Beneficios de Kiwi Cat</h4>
							<p>Registra a tus mascotas totalmente gratis, crea y descarga su placa con código QR</p>
						</div>
					</div>
				</section>
				<section className="landing-section buy-section" id="comprar">
					<h4 className="landing-h4 landing-title">¿Deseas comprar una placa?</h4>
					<p>Diseña la plaquita de tu mascota y envíanola automáticamente, nosotros te hacemos llegar tu placa.</p>
					<div className="buy-section-productos">
						<div className="buy-section-item center-vertical">Código único</div>
						<div className="buy-section-item center-vertical">Variados diseños</div>
						<div className="buy-section-item center-vertical">Calidad única</div>
						<div className="buy-section-item center-vertical">Diferentes tamaños</div>
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

Home.getInitialProps = async ({query, req, pathname}) => {
	console.log(pathname);
	return {query};
}

export default Home;
