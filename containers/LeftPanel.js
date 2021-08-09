/**
	* Creado por Wilfer Daniel Ciro Maya - 2021
**/

// Custom classes
import BasePanel      from '@/containers/BasePanel';

// NextJS libraries
import Image from 'next/image'

// Ant components and icons
import {
	Avatar,
	Tooltip,
	Button
} from 'antd';
import {
	AlertOutlined,
	LogoutOutlined,
	IdcardFilled,
	HeartFilled,
	CheckCircleFilled,
	FileTextFilled,
	ShoppingFilled,
	QuestionCircleFilled,
	IdcardOutlined,
	EditFilled,
	HomeFilled,
	AlertFilled,
	CarFilled
} from '@ant-design/icons';


class LeftPanel extends BasePanel{
	constructor(props) {
		super(props);

		// Props
		this.aditionalClick = this.props.aditionalClick;

		// Methods
		this.clickMenu = this.clickMenu.bind(this);
	}

	clickMenu(route, params = {}) {
		this.redirectPage(route, params);

		if(this.aditionalClick) {
			this.aditionalClick();
		}
	}

	render() {
		let currentPage = this.props.currentPage ? this.props.currentPage : "";
		let isLogged = this.props.isLogged ? this.props.isLogged : false;
		let userData = this.props.userData;

		let userName = isLogged ? <Tooltip title="Ver mi perfil"><a onClick={(e) => this.clickMenu(this.constants.route_profile)}>{userData ? userData["full_name"] : ""}</a></Tooltip> : "Kiwi invitado";
		let nicName  = isLogged ? <Tooltip title="Ver mi perfil"><Button onClick={(e) => this.clickMenu(this.constants.route_profile)} type="link" icon={<EditFilled />}>mi perfil</Button></Tooltip> : "";
		return (
			<div className="left-panel">

				<div className="logo" onClick={(e) => this.clickMenu(this.constants.route_index)}>
					<Image width={150} height={23} layout={"fixed"} src={this.constants.img_logo} alt="Logo página" />
				</div>

				<div className="avatar-user">
					<Avatar
						size={90}
						src={userData && userData["avatar"] !== "" && userData["avatar"] !== null ? userData["avatar"] : this.constants.img_user}
						alt="Foto usuario"
					/>
				</div>
				<h4 className="nav-username">
					{userName}
				</h4>
				<h5 className="nav-nick">{nicName}</h5>

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
						<li className={currentPage === "/" ? "active" : ""} onClick={(e) => this.clickMenu(this.constants.route_index)}>
							<div><HomeFilled className="icon" /></div>
							<div>Inicio</div>
							<div></div>
						</li>
						{
							(isLogged) ?
							<li className={currentPage.includes("/mascotas") ? "active" : ""} onClick={(e) => this.clickMenu(this.constants.route_mascotas)}>
								<div><IdcardFilled className="icon" /></div>
								<div>Mis mascotas</div>
								<div>{/*userData ? userData["cantidad_mascotas"] : "-"*/}</div>
							</li>
							:
							null
						}
						<li className={currentPage.includes("/desaparecidas") ? "active" : ""} onClick={(e) => this.clickMenu(this.constants.route_perdidas)}>
							<div><AlertFilled className="icon" /></div>
							<div>Desaparecidas</div>
							<div></div>
						</li>
						{/*<li className={currentPage.includes("/vacunas") ? "active" : ""} onClick={(e) => this.clickMenu(this.constants.route_vacunas)}>
							<div><HeartFilled className="icon" /></div>
							<div>Esquema de vacunas</div>
							<div></div>
						</li>
						<li className={currentPage.includes("/razas") ? "active" : ""} onClick={(e) => this.clickMenu(this.constants.route_razas)}>
							<div><CheckCircleFilled className="icon" /></div>
							<div>Razas</div>
							<div></div>
						</li>*/}
						<li className={currentPage.includes("/blog") ? "active" : ""} onClick={(e) => this.clickMenu(this.constants.route_blog)}>
							<div><FileTextFilled className="icon" /></div>
							<div>Blog</div>
							<div></div>
						</li>
						<li className={currentPage.includes("/tienda") ? "active" : ""} onClick={(e) => this.clickMenu(this.constants.route_tienda)}>
							<div><ShoppingFilled className="icon" /></div>
							<div>Tienda</div>
							<div></div>
						</li>
						<li className={currentPage.includes("/ayuda") ? "active" : ""} onClick={(e) => this.clickMenu(this.constants.route_ayuda)}>
							<div><QuestionCircleFilled className="icon" /></div>
							<div>Ayuda</div>
							<div></div>
						</li>
						{
							this.props.isAdmin ?
								<li className={currentPage.includes("/pedidos") ? "active" : ""} onClick={(e) => this.clickMenu(this.constants.route_pedidos)}>
									<div><CarFilled className="icon" /></div>
									<div>Pedidos</div>
									<div></div>
								</li>
							:
							null
						}
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
								<li onClick={e => this.openLogin()}>
									<div><IdcardOutlined className="icon" /></div>
									<div>Ingresar</div>
									<div></div>
								</li>
						}
					</ul>
				</nav>
			</div>
		);
	}
}

LeftPanel.getInitialProps = async ({query, req, pathname}) => {
	let isLogged = BasePanel.store.isLogged({query, req, pathname});
	let isAdmin = BasePanel.store.isAdmin({query, req, pathname});
	let userData = null;
	if(isLogged) {
		userData = {
			"avatar" : BasePanel.store.readValue("avatar", {query, req, pathname}),
			"full_name" : decodeURIComponent(BasePanel.store.readValue("full_name", {query, req, pathname})),
			"cantidad_pedidos" : BasePanel.store.readValue("cantidad_pedidos", {query, req, pathname}),
			"cantidad_mascotas" : BasePanel.store.readValue("cantidad_mascotas", {query, req, pathname}),
		};
	}
	let currentPage = pathname;
	return {query, isLogged, currentPage, userData, isAdmin};
}

export default LeftPanel;
