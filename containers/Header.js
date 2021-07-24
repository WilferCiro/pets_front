import React          from 'react';
import BasePanel      from '@/containers/BasePanel';
import Constant       from '@/components//Constant';
import ImageLocal     from '@/components//ImageLocal';
import FormSelect     from '@/formcomponents//FormSelect';
import { BellOutlined, ShoppingCartOutlined, MenuOutlined } from '@ant-design/icons';
import {Button, Affix, Badge, Space} from 'antd';
import Notifications   from '@/containers/Notifications';
import Label          from '@/components/Label';

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
									<Button shape="circle" icon={<ShoppingCartOutlined />} />
								</Badge>
							</Space>
							<a onClick={e => this.redirectPage(this.constants.route_login)} className="center-vertical iniciar-sesion-header">Login</a>
						</div>
					</div>
				</header>
			</Affix>
		);
	}
}
export default Header;
