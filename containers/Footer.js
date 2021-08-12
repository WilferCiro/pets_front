/**
	* Creado por Wilfer Daniel Ciro Maya - 2021
**/

// React Components
import React, {useRef, useState, useEffect}          from 'react';

// NextJS libraries
import Image from 'next/image'
import { useRouter } from 'next/router'

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

function Footer(props) {
	const refCookiesModal = useRef(null);
	const refSuscribeForm = useRef(null);
	const [onLine, setOnline] = useState(true);
	const router = useRouter();


	useEffect(() => {
		let isOnline = navigator.onLine;
		window.addEventListener('online', () => online());
		window.addEventListener('offline', () => offline());

		let acceptedCookies = BasePanel.store.getAcceptCookies();
		if(!acceptedCookies) {
			refCookiesModal.current.classList.remove("cookies-hide");
		}
	}, []);

	const online = () => {
		setOnline(true);
		notification.success({
			duration: 0,
			message: 'Internet',
			description: 'Vuelves a estar con internet.',
		});
	}
	const offline = () => {
		setOnline(false);
		notification.error({
			duration: 0,
			message: 'Sin internet',
			description: 'Estas sin internet.',
		});
	}

	const acceptCookies = () => {
		BasePanel.store.acceptCookies();
		refCookiesModal.current.classList.add("cookies-hide");
	}

	const suscribirme = async () => {
		if (await refSuscribeForm.current.validate()) {
			let values = refSuscribeForm.current.getValues();

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
				refSuscribeForm.current.clearValues();
				message.success("Su suscripción se ha realizado con éxito");
			}
		}
	}

	return (
		<footer>
			<div className="cookies cookies-hide" ref={refCookiesModal}>
				<p>Utilizamos cookies propias y de terceros para mejorar la experiencia del usuario a través de su navegación. Si continúas navegando aceptas su uso. <a onClick={(e) => router.push(BasePanel.constants.route_cookies)}>Política de cookies</a></p>
				<Button type="primary" onClick={acceptCookies} block>Entendido</Button>
			</div>
			<div className="footer-suscribe">
				<Row gutter={[0, 20]} align="middle">
					<Col xs={24} md={9}>
						<b>Suscríbete</b> y recibe todas las novedades
					</Col>
					<Col xs={14} md={10}>
						<SuscribirForm ref={refSuscribeForm} vertical={true} />
					</Col>
					<Col xs={10} md={5}>
						<Button onClick={suscribirme}>Suscribirme</Button>
					</Col>
				</Row>

			</div>
			<Row>
				<Col xs={24} md={9} >
					<div>
						<div className="logo-footer">
							<Image width={250} height={34} layout={"fixed"} src={BasePanel.constants.img_logo} alt="Logo" />
						</div>
						<p><b>Todos los derechos reservados &copy; 2021 </b></p>
						{!online ? "Estás fuera de línea" : ""}
						<Divider className="show-mobile" />
					</div>
				</Col>
				<Col xs={24} md={9} >
					<Space direction="vertical" >
						<a onClick={(e) => router.push(BasePanel.constants.route_cookies)}>Cookies en KiwiPeluditos</a>
						<a onClick={(e) => router.push(BasePanel.constants.route_condiciones)}>Aviso Legal y Política de Privacidad</a>
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
				<Image alt="Métodos de pago" width={430} height={80} layout={"responsive"} src={BasePanel.constants.img_medios_pago} />
			</div>
		</footer>
	)
}

export default Footer;
