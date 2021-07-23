import React          from 'react';
import BasePanel      from '@/containers/BasePanel';

import { Avatar, Button } from 'antd';
import { AlertOutlined, UserOutlined, LogoutOutlined, IdcardFilled, HeartFilled, CheckCircleFilled, FileTextFilled, ShopFilled, QuestionCircleFilled  } from '@ant-design/icons';


class LeftPanel extends BasePanel{
	constructor(props) {
		super(props);

	}
	componentDidMount() {
	}


	render() {
		let currentPage = this.props.currentPage ? this.props.currentPage : "";
		let isLogged = this.props.isLogged ? this.props.isLogged : false;
		let userData = this.props.userData;

		let userName = isLogged ? <a onClick={(e) => this.redirectPage(this.constants.route_profile)}>{userData ? userData["full_name"] : ""}</a> : "Kiwi Cat";
		let nicName  = isLogged ? "user" : "kiwicat";
		return (
			<div className="left-panel">

				<div className="logo" onClick={this.goHome}>
					<img src={this.constants.img_logo} />
					Kiwi Peluditos
				</div>

				<div className="avatar-user">
					<Avatar size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }} src={"https://s.france24.com/media/display/8c13820c-5b0e-11e9-bf90-005056a964fe/w:980/p:16x9/gato.webp"} />
				</div>
				<h4 className="nav-username">
					{userName}
				</h4>
				<h5 className="nav-nick">@{nicName}</h5>

				{
					isLogged ?
					<div className="nav-userdata">
						<div>
							<h5 className="title">{userData ? userData["cantidad_mascotas"] : "-"}</h5>
							<h5 className="subtitle">Mascotas</h5>
						</div>
						<div>
							<h5 className="title">{userData ? userData["cantidad_pedidos"] : "-"}</h5>
							<h5 className="subtitle">Pedidos</h5>
						</div>
					</div>
					:
					null
				}


				<nav>
					<ul className="left-panel-menu">
						{
							(isLogged) ?
							<li className={currentPage.includes("/mascotas") ? "active" : ""} onClick={(e) => this.redirectPage(this.constants.route_mascotas)}>
								<div><IdcardFilled className="icon" /></div>
								<div>Mis mascotas</div>
								<div>5</div>
							</li>
							:
							null
						}
						<li className={currentPage.includes("/perdidas") ? "active" : ""} onClick={(e) => this.redirectPage(this.constants.route_perdidas)}>
							<div><AlertOutlined className="icon" /></div>
							<div>Mascotas perdidas</div>
							<div></div>
						</li>
						{/*<li className={currentPage.includes("/vacunas") ? "active" : ""} onClick={(e) => this.redirectPage(this.constants.route_vacunas)}>
							<div><HeartFilled className="icon" /></div>
							<div>Esquema de vacunas</div>
							<div></div>
						</li>
						<li className={currentPage.includes("/razas") ? "active" : ""} onClick={(e) => this.redirectPage(this.constants.route_razas)}>
							<div><CheckCircleFilled className="icon" /></div>
							<div>Razas</div>
							<div></div>
						</li>*/}
						<li className={currentPage.includes("/blog") ? "active" : ""} onClick={(e) => this.redirectPage(this.constants.route_blog)}>
							<div><FileTextFilled className="icon" /></div>
							<div>Blog</div>
							<div></div>
						</li>
						<li className={currentPage.includes("/tienda") ? "active" : ""} onClick={(e) => this.redirectPage(this.constants.route_tienda)}>
							<div><ShopFilled className="icon" /></div>
							<div>Tienda</div>
							<div></div>
						</li>
						<li className={currentPage.includes("/ayuda") ? "active" : ""} onClick={(e) => this.redirectPage(this.constants.route_ayuda)}>
							<div><QuestionCircleFilled className="icon" /></div>
							<div>Ayuda</div>
							<div></div>
						</li>
						<li>
							<div></div>
							<div></div>
							<div></div>
						</li>
						{
							isLogged ?
								<li onClick={e => this.logout()}>
									<div><LogoutOutlined className="icon" /></div>
									<div>Salir</div>
									<div></div>
								</li>
							:
								null
						}
					</ul>
				</nav>
			</div>
		);
	}
}

LeftPanel.getInitialProps = async ({query, req, pathname}) => {
	let isLogged = BasePanel.store.isLogged({query, req, pathname});
	let userData = {
		"avatar" : BasePanel.store.readValue("avatar", {query, req, pathname}),
		"full_name" : decodeURIComponent(BasePanel.store.readValue("full_name", {query, req, pathname})),
		"cantidad_pedidos" : BasePanel.store.readValue("cantidad_pedidos", {query, req, pathname}),
		"cantidad_mascotas" : BasePanel.store.readValue("cantidad_mascotas", {query, req, pathname}),
	};
	let currentPage = pathname;
	return {query, isLogged, currentPage, userData};
}

export default LeftPanel;
