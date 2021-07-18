import React          from 'react';
import BasePanel      from '@/containers/BasePanel';

import { Avatar } from 'antd';
import { AlertOutlined, UserOutlined, LogoutOutlined, IdcardFilled, HeartFilled, CheckCircleFilled, FileTextFilled, ShopFilled, QuestionCircleFilled  } from '@ant-design/icons';


class LeftPanel extends BasePanel{
	constructor(props) {
		super(props);

		this.currentPage = this.props.page;
	}
	componentDidMount() {
	}


	render() {
		return (
			<div className="left-panel">

				<div className="avatar-user">
					<Avatar size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }} src={"https://s.france24.com/media/display/8c13820c-5b0e-11e9-bf90-005056a964fe/w:980/p:16x9/gato.webp"} />
				</div>
				<h4 className="nav-username">Wilfer Daniel Ciro Maya</h4>
				<h5 className="nav-nick">@ciro</h5>

				<div className="nav-userdata">
					<div>
						<h5 className="title">5</h5>
						<h5 className="subtitle">Mascotas</h5>
					</div>
					<div>
						<h5 className="title">50</h5>
						<h5 className="subtitle">Fotos</h5>
					</div>
				</div>

				<nav>
					<ul className="left-panel-menu">
						<li className={this.currentPage.includes("/mascotas") ? "active" : ""} onClick={(e) => this.redirectPage(this.constants.route_mascotas, this.constants.route_mascotas_alias)}>
							<div><IdcardFilled className="icon" /></div>
							<div>Mis mascotas</div>
							<div>5</div>
						</li>
						<li className={this.currentPage.includes("/perdidas") ? "active" : ""} onClick={(e) => this.redirectPage(this.constants.route_perdidas, this.constants.route_perdidas_alias)}>
							<div><AlertOutlined className="icon" /></div>
							<div>Mascotas perdidas</div>
							<div></div>
						</li>
						{/*<li className={this.currentPage.includes("/vacunas") ? "active" : ""} onClick={(e) => this.redirectPage(this.constants.route_vacunas, this.constants.route_vacunas_alias)}>
							<div><HeartFilled className="icon" /></div>
							<div>Esquema de vacunas</div>
							<div></div>
						</li>
						<li className={this.currentPage.includes("/razas") ? "active" : ""} onClick={(e) => this.redirectPage(this.constants.route_razas, this.constants.route_razas_alias)}>
							<div><CheckCircleFilled className="icon" /></div>
							<div>Razas</div>
							<div></div>
						</li>*/}
						<li className={this.currentPage.includes("/blog") ? "active" : ""} onClick={(e) => this.redirectPage(this.constants.route_blog, this.constants.route_blog_alias)}>
							<div><FileTextFilled className="icon" /></div>
							<div>Blog</div>
							<div></div>
						</li>
						<li className={this.currentPage.includes("/tienda") ? "active" : ""} onClick={(e) => this.redirectPage(this.constants.route_tienda, this.constants.route_tienda_alias)}>
							<div><ShopFilled className="icon" /></div>
							<div>Tienda</div>
							<div></div>
						</li>
						<li className={this.currentPage.includes("/ayuda") ? "active" : ""} onClick={(e) => this.redirectPage(this.constants.route_ayuda, this.constants.route_ayuda_alias)}>
							<div><QuestionCircleFilled className="icon" /></div>
							<div>Ayuda</div>
							<div></div>
						</li>
						<li>
							<div></div>
							<div></div>
							<div></div>
						</li>
						<li>
							<div><LogoutOutlined className="icon" /></div>
							<div>Salir</div>
							<div></div>
						</li>
					</ul>
				</nav>
			</div>
		);
	}
}


export default LeftPanel;
