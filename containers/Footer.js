import React          from 'react';
import BasePanel      from '@/containers/BasePanel';
import {Divider, message}      from 'antd';
import { FacebookFilled, TwitterSquareFilled, InstagramFilled, YoutubeFilled, WhatsAppOutlined } from '@ant-design/icons';

class Footer extends BasePanel{
	constructor(props) {
		super(props);

		this.online  = this.online.bind(this);
		this.offline = this.offline.bind(this);

		this.state = {
			online: true
		}
	}
	componentDidMount() {
		let isOnline = navigator.onLine;
		console.log(isOnline);
		window.addEventListener('online', () => this.online());
		window.addEventListener('offline', () => this.offline());

	}

	online() {
		this.setState({
			online: true
		})
		message.success("Vuelves a estar con internet");
	}
	offline() {
		this.setState({
			online: false
		})
		message.error("Estás sin internet");
	}

	render() {
		return (
			<footer>
				<Divider />
				<div className="footer-separator">
					<div>
						KiwiCat &copy; 2021 <br />
						¿Deseas ayudar a mejorar este proyecto? Donaciones<br />
						{!this.state.online ? "Estás fuera de línea" : ""}
					</div>
					<div>
						<a target="_blank" className="footer-social facebook" href="https://facebook.com/"><FacebookFilled className="icon-big" /></a>
						<a target="_blank" className="footer-social instagram" href="https://instagram.com/"><InstagramFilled className="icon-big" /></a>
						<a target="_blank" className="footer-social twitter" href="https://twitter.com/"><TwitterSquareFilled className="icon-big" /></a>
						<a target="_blank" className="footer-social youtube" href="https://youtube.com/"><YoutubeFilled className="icon-big" /></a>
						<a target="_blank" className="footer-social whatsapp" href="https://whatsapp.com/"><WhatsAppOutlined className="icon-big" /></a>
					</div>
				</div>
			</footer>
		);
	}
}

export default Footer;
