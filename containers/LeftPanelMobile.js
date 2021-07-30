/**
	* Creado por Wilfer Daniel Ciro Maya - 2021
**/

// Custom classes
import BasePanel      from '@/containers/BasePanel';
import LeftPanel      from '@/containers/LeftPanel';

// Ant components and icons
import {
	Drawer,
	Button
} from 'antd';


class LeftPanelMobile extends BasePanel{
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
				placement="left"
				closable={true}
				onClose={this.close}
				visible={this.state.isOpen}
				width={300}
			>
				<LeftPanel {...this.props} aditionalClick={this.close} />
			</Drawer>
		);
	}
}

export default LeftPanelMobile;
