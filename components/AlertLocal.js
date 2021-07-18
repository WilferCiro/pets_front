import React          from 'react';
import Carousel       from 'react-multi-carousel';
import BasePanel      from '@/containers/BasePanel';
import { message } from 'antd';


class AlertLocal extends BasePanel{
	constructor(props) {
		super(props);
		this.toggle    = this.toggle.bind(this);
	}

	toggle(open, mensaje, type = "success") {
		message.info(mensaje);
	}

	render() {
		return (
			<div></div>
		);
	}
}

export default AlertLocal;
