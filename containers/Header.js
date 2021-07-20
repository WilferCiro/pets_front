import React          from 'react';
import BasePanel      from '@/containers/BasePanel';
import Constant       from '@/components//Constant';
import ImageLocal     from '@/components//ImageLocal';
import FormSelect     from '@/formcomponents//FormSelect';
import { BellOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import {Button, Affix} from 'antd';
import Notifications   from '@/containers/Notifications';
import CustomBreadcrumb from '@/components/CustomBreadcrumb';

class Header extends BasePanel{
	constructor(props) {
		super(props);

		this.refNotifications = React.createRef();
		this.openNotifications = this.openNotifications.bind(this);

		this.changeAffixed = this.changeAffixed.bind(this);
		this.headerRef = React.createRef();
	}
	componentDidMount() {
	}

	openNotifications() {
		this.refNotifications.current.open();
	}

	changeAffixed(affixed) {
		this.headerRef.current.className = (affixed) ? "affixed" : "";
	}


	render() {
		return (
			<Affix offsetTop={0} onChange={affixed => this.changeAffixed(affixed)}>
				<header ref={this.headerRef}>
					<Notifications ref={this.refNotifications} />
					<div className="header-divider">
						<div className="header-breadcrumb-container">
							<CustomBreadcrumb ref={BasePanel.refBreadcrumb} />
						</div>
						<div className="header-menu">
							<div className="header-menu-item" onClick={(e) => this.openNotifications()}>
								<BellOutlined className="icon" />
							</div>
							<div className="header-menu-item" onClick={(e) => this.logout() }>
								<ShoppingCartOutlined className="icon" />
							</div>
							<a onClick={e => this.redirectPage(this.constants.route_login)} className="center-vertical iniciar-sesion-header">Iniciar sesión</a>
						</div>
					</div>
				</header>
			</Affix>
		);
	}
}
export default Header;
