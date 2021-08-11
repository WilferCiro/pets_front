/**
	* Creado por Wilfer Daniel Ciro Maya - 2021
**/

// NextJS libraries

// Custom classes
import BasePanel      from '@/containers/BasePanel';

// Ant components and icons
import {
	Badge,
	Button
} from 'antd';
import {ShoppingCartOutlined} from '@ant-design/icons';

class CartButton extends BasePanel{
	constructor(props) {
		super(props);

		// States
		this.state = {
			nro : this.props.nroCart || 0
		}

		// Methods
		this.setNro = this.setNro.bind(this);
	}

	setNro(nro) {
		this.store.setNumCart(nro);
		this.setState({
			nro: nro
		})
	}

	render() {
		return (
			<Badge count={this.state.nro} style={{ backgroundColor: 'purple' }}>
				<Button shape="circle" icon={<ShoppingCartOutlined />} onClick={(e) => this.redirectPage(this.constants.route_cart)} />
			</Badge>
		);
	}
}

export default CartButton;
