import React          from 'react';
import BasePanel      from '@/containers/BasePanel';



class Home extends BasePanel{
	constructor(props) {
		super(props);

	}

	componentDidMount() {
	}

	render() {

		return (
			<div className="page-center">
				<section>
					<h2>Kiwi Cat</h2>
					<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</p>
					<p>Inicia ya </p> <button>Iniciar sesión</button> <button>Registrarse</button>
				</section>
				<section>
					<h4>Beneficios de Kiwi Cat</h4>
					<p>Registra a tus mascotas totalmente gratis, crea y descarga su placa con código QR</p>
				</section>
				<section>
					<h4>¿Deseas comprar una placa?</h4>
					<p>Diseña la plaquita de tu mascota y envíanola automáticamente, nosotros te hacemos llegar tu placa.</p>
				</section>
				<section>
					<h4>¿Deseas donar?</h4>
					<p>El único ingreso monetario de la página es a través de la venta de collares para tus mascotas y donaciones de la comunidad. Tu donación es muy importante para la mejora y mantenimiento de la página.</p>
				</section>
				<section>
					<h4>¿Quiénes somos?</h4>
					<p>Somos un grupo de jóvenes...</p>
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
