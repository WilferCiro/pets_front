/**
	* Creado por Wilfer Daniel Ciro Maya - 2021
**/

// React Components
import React          from 'react';

// NextJS libraries
import Image from 'next/image'

// Custom classes
import BasePanel      from '@/containers/BasePanel';
import SuscribirForm  from '@/formclasses/suscribir';

// Ant components and icons
import {
	Divider,
	notification,
	Button,
	Space,
	Row,
	Col,
	message
} from 'antd';
import {
	FacebookFilled,
	TwitterSquareFilled,
	InstagramFilled,
	YoutubeFilled,
	WhatsAppOutlined
} from '@ant-design/icons';

class Footer extends BasePanel{
	constructor(props) {
		super(props);

		// States
		this.state = {
			online: true
		}

		// Methods
		this.online        = this.online.bind(this);
		this.offline       = this.offline.bind(this);
		this.acceptCookies = this.acceptCookies.bind(this);
		this.suscribirme  = this.suscribirme.bind(this);

		// Refs
		this.refCookiesModal = React.createRef();
		this.refSuscribeForm = React.createRef();
	}

	componentDidMount() {
		let isOnline = navigator.onLine;
		window.addEventListener('online', () => this.online());
		window.addEventListener('offline', () => this.offline());

		let acceptedCookies = this.store.getAcceptCookies();
		if(!acceptedCookies) {
			this.refCookiesModal.current.classList.remove("cookies-hide");
		}
	}

	online() {
		this.setState({
			online: true
		});
		notification.success({
			duration: 0,
			message: 'Internet',
			description: 'Vuelves a estar con internet.',
		});
	}
	offline() {
		this.setState({
			online: false
		});
		notification.error({
			duration: 0,
			message: 'Sin internet',
			description: 'Estas sin internet.',
		});
	}

	acceptCookies() {
		this.store.acceptCookies();
		this.refCookiesModal.current.classList.add("cookies-hide");
	}

	async suscribirme() {
		if (await this.refSuscribeForm.current.validate()) {
			let values = this.refSuscribeForm.current.getValues();

			let data = await BasePanel.service.apiSend({
				method: "POST",
				register: "suscripcion",
				model: "crear",
				body: {
					email: values["email"].trim()
				},
				showError: true
			});
			if(data["success"]) {
				this.refSuscribeForm.current.clearValues();
				message.success("Su suscripción se ha realizado con éxito");
			}
		}
	}

	render() {
		return (
			<footer>
				<div className="cookies cookies-hide" ref={this.refCookiesModal}>
					<p>Utilizamos cookies propias y de terceros para mejorar la experiencia del usuario a través de su navegación. Si continúas navegando aceptas su uso. <a onClick={(e) => this.redirectPage(this.constants.route_cookies)}>Política de cookies</a></p>
					<Button type="primary" onClick={this.acceptCookies} block>Entendido</Button>
				</div>
				<div className="footer-suscribe">
					<Row gutter={[0, 20]} align="middle">
						<Col xs={24} md={9}>
							<b>Suscríbete</b> y recibe todas las novedades
						</Col>
						<Col xs={14} md={10}>
							<SuscribirForm ref={this.refSuscribeForm} vertical={true} />
						</Col>
						<Col xs={10} md={5}>
							<Button onClick={this.suscribirme}>Suscribirme</Button>
						</Col>
					</Row>

				</div>
				<Row>
					<Col xs={24} md={9} >
						<div>
							<div className="logo-footer">
								<Image width={150} height={23} layout={"fixed"} src={this.constants.img_logo} alt="Logo" />
							</div>
							<p><b>Todos los derechos reservados &copy; 2021 </b></p>
							{!this.state.online ? "Estás fuera de línea" : ""}
							<Divider className="show-mobile" />
						</div>
					</Col>
					<Col xs={24} md={9} >
						<Space direction="vertical" >
							<a onClick={(e) => this.redirectPage(this.constants.route_cookies)}>Cookies en KiwiPeluditos</a>
							<a onClick={(e) => this.redirectPage(this.constants.route_condiciones)}>Aviso Legal y Política de Privacidad</a>
						</Space>
						<Divider className="show-mobile" />
					</Col>
					<Col xs={24} md={6} >
						<div>
							<a rel="noreferrer" target="_blank" className="footer-social facebook" href="https://www.facebook.com/kiwipeluditos"><FacebookFilled className="icon-big" /></a>
							<a rel="noreferrer" target="_blank" className="footer-social instagram" href="https://www.instagram.com/kiwipeluditos/"><InstagramFilled className="icon-big" /></a>
							<a rel="noreferrer" target="_blank" className="footer-social twitter" href="https://twitter.com/"><TwitterSquareFilled className="icon-big" /></a>
							<a rel="noreferrer" target="_blank" className="footer-social youtube" href="https://www.youtube.com/channel/UCLgg_5ovtz2Krxt2Ft5rLkg"><YoutubeFilled className="icon-big" /></a>
							<a rel="noreferrer" target="_blank" className="footer-social whatsapp" href="https://whatsapp.com/"><WhatsAppOutlined className="icon-big" /></a>
						</div>
					</Col>
				</Row>
				<Divider />
				<div className="metodos-pago-footer">
					<Image alt="Métodos de pago" width={430} height={80} layout={"responsive"} src={this.constants.img_medios_pago} />
				</div>
			</footer>
		);
	}
}

export default Footer;
