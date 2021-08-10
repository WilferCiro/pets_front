/**
	* Creado por Wilfer Daniel Ciro Maya - 2021
**/

// React Components
import React          from 'react';

// Custom classes
import BasePanel      from '@/containers/BasePanel';
import SuscribirForm  from '@/formclasses/suscribir';

// Ant components and icons
import {
	Modal,
	message
} from 'antd';


class ModalAvisame extends BasePanel{
	constructor(props) {
		super(props);

		// Variables
		this.producto = null;

		// States
		this.state = {
			open : false
		}

		// Methods
		this.open      = this.open.bind(this);
		this.close     = this.close.bind(this);
		this.suscribir = this.suscribir.bind(this);

		// Refs
		this.refSuscribeForm = React.createRef();
	}
	componentDidMount() {
	}

	close() {
		this.setState({
			open: false
		})
	}

	open(producto) {
		this.producto = producto;
		this.setState({
			open: true
		})
	}

	async suscribir() {
		if (await this.refSuscribeForm.current.validate()) {
			let values = this.refSuscribeForm.current.getValues();

			let data = await BasePanel.service.apiSend({
				method: "POST",
				register: "avisame",
				model: "crear",
				body: {
					email: values["email"].trim(),
					producto: this.producto
				},
				showError: true
			});
			if(data["success"]) {
				this.refSuscribeForm.current.clearValues();
				message.success("Serás notificado cuando tengamos stock del producto.");
				this.close();
			}
		}
	}

	render() {

		return (
			<Modal centered title={"Avisarme cuando exista de nuevo el producto"} visible={this.state.open} onOk={this.suscribir} onCancel={this.close}>
				Escribe tu correo electrónico al cual deseas ser notificado.
				<SuscribirForm ref={this.refSuscribeForm} vertical={true} />
			</Modal>
		);
	}
}

export default ModalAvisame;
