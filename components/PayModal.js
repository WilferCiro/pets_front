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
	Result
} from 'antd';

class PayModal extends BasePanel{
	constructor(props) {
		super(props);

		// States
		this.state = {
			open : false
		}

		// Methods
		this.open = this.open.bind(this);
	}
	componentDidMount() {
	}

	open() {
		this.setState({
			open: true
		})
	}

	render() {
		return (
			<Modal centered title="Información de pago" visible={this.state.open} footer={null} closable={false}>
				<Result
					status="success"
					title="Pedido realizado con éxito"
					subTitle="Ahora serás dirigido a PayU para realizar el pago."
				/>
			</Modal>
		);
	}
}

export default PayModal;
