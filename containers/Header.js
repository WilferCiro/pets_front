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
import CartButton     from '@/components/CartButton';

// Ant components and icons
import {
	BellOutlined,
	MenuOutlined
} from '@ant-design/icons';
import {
	Button,
	Affix,
	Badge,
	Space,
	PageHeader
} from 'antd';

class Header extends BasePanel{
	constructor(props) {
		super(props);

		// References
		this.refNotifications = React.createRef();
		this.headerRef        = React.createRef();

		// Methods
		this.openNotifications = this.openNotifications.bind(this);
		this.openMenuMobile    = this.openMenuMobile.bind(this);
	}

	openNotifications() {
		this.refNotifications.current.open();
	}

	openMenuMobile() {
		BasePanel.refMobileMenu.current.open();
	}

	render() {
		let isLogged = this.props.isLogged;
		return (
			<div>
				<Affix offsetTop={0}>

					<PageHeader
						className={(isLogged) ? "site-page-header-responsive affixed" :  "site-page-header-responsive affixed header-noLogin"}
						title={this.props.pageName}
						onBack={this.openMenuMobile}
						backIcon={<MenuOutlined className="show-tablet icon-menu-header" />}
						extra={[
							<Space align="center" key={Math.random()}>
								{/*<Badge status="primary" dot>*/}
									<Button shape="circle" icon={<BellOutlined />} onClick={(e) => this.openNotifications()} />
								{/*</Badge>*/}
								<CartButton nroCart={this.props.nroCart} ref={BasePanel.refButtonCart} />
								{(!isLogged)?
								<a key={Math.random()} onClick={e => this.openLogin()} className="center-vertical iniciar-sesion-header">Login</a>
								:
								null}
							</Space>

						]}
						>
					</PageHeader>

				</Affix>
				<Notifications ref={this.refNotifications} />
			</div>
		);
	}
}

Header.getInitialProps = async ({query, req, pathname}) => {
	let isLogged = BasePanel.store.isLogged({query, req, pathname});
	let nroCart = BasePanel.store.getNumCart({query, req, pathname});
	if (!isLogged) {
		nroCart = 0;
	}
	return {query, isLogged, nroCart};
}

export default Header;

/*

*/
