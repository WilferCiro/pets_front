import React          from 'react';
import BasePanel      from '@/containers/BasePanel';

import { Sidebar } from 'primereact/sidebar';
import { Drawer, Button } from 'antd';


class Notifications extends BasePanel{
	constructor(props) {
		super(props);

		this.state = {
			isOpen : false
		}

		this.close = this.close.bind(this);
		this.open = this.open.bind(this);
	}
	componentDidMount() {
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
