/**
	* Creado por Wilfer Daniel Ciro Maya - 2021
**/

// Custom classes
import BasePanel      from '@/containers/BasePanel';

// Ant components and icons
import {
	Drawer,
	Button
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

	open() {
		this.setState({
			isOpen : true
		})
	}

	render() {
		return (
			<Drawer
				title="Notificaciones"
				placement="right"
				closable={true}
				onClose={this.close}
				visible={this.state.isOpen}
			>
				Content
			</Drawer>
		);
	}
}

export default Notifications;
