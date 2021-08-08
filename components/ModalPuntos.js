/**
	* Creado por Wilfer Daniel Ciro Maya - 2021
**/

// React Components
import React          from 'react';

// Custom classes
import BasePanel      from '@/containers/BasePanel';

// Ant components and icons
import {
	Modal,
	message,
	Timeline,
	Row,
	Col,
	Card,
	Avatar,
	Divider
} from 'antd';

const { Meta } = Card;

class ModalPuntos extends BasePanel{
	constructor(props) {
		super(props);

		// States
		this.state = {
			open : false
		}

		// Methods
		this.open = this.open.bind(this);
		this.close = this.close.bind(this);
	}
	componentDidMount() {
	}

	close() {
		this.setState({
			open: false
		})
	}

	open() {
		this.setState({
			open: true
		})
	}

	render() {

		return (
			<Modal centered title={"¿Cómo gano puntos en Kiwi Peluditos?"} visible={this.state.open} onOk={this.close} onCancel={this.close}>
				<p>En Kiwi Peluditos puedes ganar puntos que puedes redimir por porcentaje de descuento en tus compras, puedes hacer esto cada mes con máximo 1000 puntos.</p>
				<p>Por ahora, la forma de obtener estos puntos es realizando compras, en un futuro esperamos ampliar estas posibilidades.</p>
			</Modal>
		);
	}
}

export default ModalPuntos;
