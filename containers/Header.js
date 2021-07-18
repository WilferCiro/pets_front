import React          from 'react';
import BasePanel      from '@/containers/BasePanel';
import Constant       from '@/components//Constant';
import ImageLocal     from '@/components//ImageLocal';
import FormSelect     from '@/formcomponents//FormSelect';
import { BellOutlined, ShoppingCartOutlined } from '@ant-design/icons';

import Notifications   from '@/containers/Notifications';

class Header extends BasePanel{
	constructor(props) {
		super(props);

		let inEmpresas = this.props.empresas ? this.props.empresas : [];
		this.empresas = [];

		for(let i = 0; i < inEmpresas.length; i ++) {
			this.empresas.push({
				"label" : inEmpresas[i]["nombre"],
				"value" : inEmpresas[i]["pk"],
			})
		}

		this.refNotifications = React.createRef();
		this.openNotifications = this.openNotifications.bind(this);

		this.changeEmpresa = this.changeEmpresa.bind(this);

	}
	componentDidMount() {
	}

	changeEmpresa(value){
		this.store.setEmpresa(value);
		this.redirectPage(this.constants.route_index, this.constants.route_index_alias);
	}

	openNotifications() {
		this.refNotifications.current.open();
	}


	render() {
		return (
			<header>
				<Notifications ref={this.refNotifications} />
				<div className="header-divider">
					<div className="header-logo-container">
						<div className="logo">

						</div>
					</div>
					<div className="header-menu">
						<div className="header-menu-item" onClick={(e) => this.openNotifications()}>
							<BellOutlined className="icon" />
						</div>
						<div className="header-menu-item" onClick={(e) => this.logout() }>
							<ShoppingCartOutlined className="icon" />
						</div>
					</div>
				</div>
			</header>
		);
	}
}
export default Header;
