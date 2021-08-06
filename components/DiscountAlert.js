/**
	* Creado por Wilfer Daniel Ciro Maya - 2021
**/

// React Components
import React          from 'react';

// Custom classes
import BasePanel      from '@/containers/BasePanel';

import {
	Divider,
	Alert,
	Space,
	Button,
	message
} from 'antd';

class DiscountAlert extends BasePanel{
	constructor(props) {
		super(props);

		// props
		this.onApply = this.props.onApply;

		// States
		this.state = {
			visible : false,
			discount: 0
		}

		// Methods
		this.setDiscount = this.setDiscount.bind(this);
		this.onClick     = this.onClick.bind(this);
	}

	setDiscount(discount) {
		this.setState({
			discount: discount,
			visible: true
		});
	}

	onClick() {
		if(this.onApply) {
			this.onApply(this.state.discount);
		}
		this.setState({
			visible: false
		});
		message.success("Operación realizada con éxito");
	}

	render() {
		if(!this.state.visible || this.state.discount === 0) {
			return (<div />);
		}

		return (
			<div>
				<Alert
					message={"Puedes aplicar a un descuento de " + this.state.discount + "% en tu compra cambiando todos tus puntos actuales."}
					type="success"
					action={
						<Space direction="vertical">
							<Button size="small" type="primary" block onClick={this.onClick}>
								Aplicar
							</Button>
						</Space>
					} />
				<Divider />
			</div>
		);
	}
}

export default DiscountAlert;
