/**
	* Creado por Wilfer Daniel Ciro Maya - 2021
**/

// React Components
import React, {useRef} from 'react';

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
	Space,
	PageHeader
} from 'antd';

function Header({ query, isLogged, nroCart, pageName}) {
	let refNotifications = useRef(null);

	const openNotifications = () => {
		refNotifications.current.open();
	}

	const openMenuMobile = () => {
		BasePanel.refMobileMenu.current.open();
	}

	const openLogin = () => {
		if(BasePanel.refLogin.current) {
			BasePanel.refLogin.current.open({});
		}
	}

	return (
		<div>
			<Affix offsetTop={0}>

				<PageHeader
					className={(isLogged) ? "site-page-header-responsive affixed" :  "site-page-header-responsive affixed header-noLogin"}
					title={pageName}
					onBack={openMenuMobile}
					backIcon={<MenuOutlined className="show-tablet icon-menu-header" />}
					extra={[
						<Space align="center" key={Math.random()}>
							<Button shape="circle" icon={<BellOutlined />} onClick={openNotifications} />
							<CartButton nroCart={nroCart} ref={BasePanel.refButtonCart} />
							{(!isLogged)?
							<a key={Math.random()} onClick={openLogin} className="center-vertical iniciar-sesion-header">Login</a>
							:
							null}
						</Space>

					]}
					>
				</PageHeader>

			</Affix>
			<Notifications ref={refNotifications} />
		</div>
	)
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
