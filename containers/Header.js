/**
	* Creado por Wilfer Daniel Ciro Maya - 2021
**/

// React Components
import React          from 'react';

// Custom classes
import BasePanel      from '@/containers/BasePanel';
import FormSelect     from '@/formcomponents//FormSelect';
import Notifications  from '@/containers/Notifications';
import Label          from '@/components/Label';

// Ant components and icons
import {
	BellOutlined,
	ShoppingCartOutlined,
	MenuOutlined
} from '@ant-design/icons';
import {
	Button,
	Affix,
	Badge,
	Space
} from 'antd';

class Header extends BasePanel{
	constructor(props) {
		super(props);

		// References
		this.refNotifications = React.createRef();
		this.headerRef        = React.createRef();

		// Methods
		this.openNotifications = this.openNotifications.bind(this);
		this.changeAffixed     = this.changeAffixed.bind(this);
	}

	openNotifications() {
		this.refNotifications.current.open();
	}

	changeAffixed(affixed) {
		this.headerRef.current.className = (affixed) ? "affixed" : "";
	}

	render() {
		let isLogged = this.props.isLogged;
		return (
			<Affix offsetTop={0} onChange={affixed => this.changeAffixed(affixed)}>
				<header ref={this.headerRef}>
					<Notifications ref={this.refNotifications} />
					<div className="header-divider">
						<div className="header-title-container">
							<h2 className="header-page-title">
								{this.props.pageName}
							</h2>
						</div>
						<div className="header-menu">
							<Space size={"middle"} align="center">
								<Badge status="primary" dot>
									<Button shape="circle" icon={<BellOutlined />} onClick={(e) => this.openNotifications()} />
								</Badge>
								<Badge count={5} style={{ backgroundColor: 'purple' }}>
									<Button shape="circle" icon={<ShoppingCartOutlined />} onClick={(e) => this.redirectPage(this.constants.route_cart)} />
								</Badge>
							</Space>
							{
								(!isLogged)?
								<a onClick={e => this.redirectPage(this.constants.route_login)} className="center-vertical iniciar-sesion-header">Login</a>
								:
								null
							}

						</div>
					</div>
				</header>
			</Affix>
		);
	}
}

Header.getInitialProps = async ({query, req, pathname}) => {
	let isLogged = BasePanel.store.isLogged({query, req, pathname});
	return {query, isLogged};
}

export default Header;
