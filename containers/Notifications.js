/**
	* Creado por Wilfer Daniel Ciro Maya - 2021
**/

// Custom classes
import BasePanel      from '@/containers/BasePanel';

// Ant components and icons
import {
	Drawer,
	Button,
	message,
	Card
} from 'antd';


class Notifications extends BasePanel{
	constructor(props) {
		super(props);

		// States
		this.state = {
			isOpen : false
		}

		// Methods
		this.close = this.close.bind(this);
		this.open  = this.open.bind(this);
	}


	close() {
		this.setState({
			isOpen : false
		})
	}

	async open() {

		let dataGet = await BasePanel.service.apiSend({
			method: "GET",
			register: "notificacion",
			model: "todo",
			isPublic: true
		});
		if(dataGet["success"]) {
			this.setState({
				isOpen : true,
				notificaciones: dataGet["data"]
			})
		}
		else{
			message.error("Hubo un erro al abrir las notificaciones, por favor inténtelo de nuevo");
		}
	}

	render() {
		let notificaciones = this.state.notificaciones || [];
		return (
			<Drawer
				title="Notificaciones"
				placement="right"
				closable={true}
				onClose={this.close}
				visible={this.state.isOpen}
			>
				{
					notificaciones.length === 0 ?
						<p>No hay notificaciones</p>
					:
					notificaciones.map((item, index) => {
						return <Card key={Math.random()}>
							<b>{item["asunto"]}</b><br />
							{item["mensaje"]}
						</Card>
					})
				}
			</Drawer>
		);
	}
}

export default Notifications;
