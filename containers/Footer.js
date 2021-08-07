/**
	* Creado por Wilfer Daniel Ciro Maya - 2021
**/

// React Components
import React          from 'react';

// NextJS libraries
import Image from 'next/image'

// Custom classes
import BasePanel      from '@/containers/BasePanel';

// Ant components and icons
import {
	Divider,
	notification,
	Button,
	Space,
	Row,
	Col
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

		// Refs
		this.refCookiesModal = React.createRef();
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

	render() {
		return (
			<footer>
				<div className="cookies cookies-hide" ref={this.refCookiesModal}>
					<p>Utilizamos cookies propias y de terceros para mejorar la experiencia del usuario a través de su navegación. Si continúas navegando aceptas su uso. <a onClick={(e) => this.redirectPage(this.constants.route_cookies)}>Política de cookies</a></p>
					<Button type="primary" onClick={this.acceptCookies} block>Entendido</Button>
				</div>

				<Divider />

				<Row>
					<Col xs={10} md={9} >
						<div>
							<div className="logo-footer" onClick={(e) => this.clickMenu(this.constants.route_index)}>
								<Image width={150} height={23} layout={"fixed"} src={this.constants.img_logo} />
							</div>
							<p><b>Todos los derechos reservados &copy; 2021 </b></p>
							{!this.state.online ? "Estás fuera de línea" : ""}
							<Divider />
						</div>
					</Col>
					<Col xs={10} md={9} >
						<Space direction="vertical" >
							<a onClick={(e) => this.redirectPage(this.constants.route_cookies)}>Cookies en KiwiPeluditos</a>
							<a onClick={(e) => this.redirectPage(this.constants.route_condiciones)}>Aviso Legal y Política de Privacidad</a>
						</Space>
					</Col>
					<Col xs={10} md={6} >
						<div>
							<a target="_blank" className="footer-social facebook" href="https://www.facebook.com/kiwipeluditos"><FacebookFilled className="icon-big" /></a>
							<a target="_blank" className="footer-social instagram" href="https://www.instagram.com/kiwipeluditos/"><InstagramFilled className="icon-big" /></a>
							<a target="_blank" className="footer-social twitter" href="https://twitter.com/"><TwitterSquareFilled className="icon-big" /></a>
							<a target="_blank" className="footer-social youtube" href="https://youtube.com/kiwipeluditos"><YoutubeFilled className="icon-big" /></a>
							<a target="_blank" className="footer-social whatsapp" href="https://whatsapp.com/"><WhatsAppOutlined className="icon-big" /></a>
						</div>
					</Col>
				</Row>

				<div className="footer-separator">


				</div>
			</footer>
		);
	}
}

export default Footer;
