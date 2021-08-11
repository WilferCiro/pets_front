/**
	* Creado por Wilfer Daniel Ciro Maya - 2021
**/

// React Components
import React          from 'react';

// Custom classes
import BasePanel          from '@/containers/BasePanel';
import EditUserForm       from '@/formclasses/edit_user';
import EditPasswordForm   from '@/formclasses/edit_password';
import ModalPedido        from '@/components/ModalPedido';
import ModalPuntos        from '@/components/ModalPuntos';

// Ant components and icons
import {
	Tooltip,
	Tabs,
	List,
	Avatar,
	Space,
	Button,
	Row,
	Col,
	Progress,
	Card,
	Alert,
	message,
	Tag,
	Divider,
	Skeleton
} from 'antd';
import {
	EditOutlined,
	KeyOutlined
} from '@ant-design/icons';
const { TabPane } = Tabs;

class ProfileView extends BasePanel{
	constructor(props) {
		super(props);

		// Props
		this.first_login = this.props.query.first_login === "true";

		// States
		this.state = {
			user: null
		}

		//Methods
		this.getUserData             = this.getUserData.bind(this);
		this.openFormEdit            = this.openFormEdit.bind(this);
		this.openFormEditPassword    = this.openFormEditPassword.bind(this);
		this.editUserData            = this.editUserData.bind(this);
		this.editUserPassword        = this.editUserPassword.bind(this);
		this.openPedido              = this.openPedido.bind(this);
		this.openModalPuntos         = this.openModalPuntos.bind(this);
		this.sendConfirmation        = this.sendConfirmation.bind(this);

		// References
		this.refFormEditPassword = React.createRef();
		this.refFormEdit         = React.createRef();
		this.refModalPedido      = React.createRef();
		this.refModalPuntos      = React.createRef();
	}

	componentDidMount() {
		this.getUserData();

		this.setBreadCrumb([{"label" : "Mi perfil"}]);

		if (this.props.query.transactionState) {
			if (this.props.query.transactionState === "4") {
				message.success("Su pago ha sido realizado con éxito");
			}
			else{
				message.error("Hubo un error al realizar el pago, por favor, vuelva a intentarlo");
			}
		}
	}

	openPedido(pk) {
		this.refModalPedido.current.open(pk);
	}

	async editUserData() {
		let formValues = this.refFormEdit.current.getValues();
		let body = {
			"first_name" : formValues["first_name"],
			"last_name" : formValues["last_name"],
			"celular1" : formValues["celular1"],
			"celular2" : formValues["celular2"],
			"telefono" : formValues["telefono"],
			"direccion" : formValues["direccion"],
			"ciudad" : formValues["ciudad"],
		}
		if(formValues["avatar"]["fotos"].length > 0 && formValues["avatar"]["fotos"][0]["uid"].includes("rc-upload")) {
			body["avatar"] = formValues["avatar"]["fotos"].length > 0 ? formValues["avatar"]["fotos"][0]["originFileObj"] : null;
		}
		else if(formValues["avatar"]["fotos"].length === 0) {
			body["avatar"] = "";
		}
		let data = await BasePanel.service.apiSend({
			method: "PUT",
			register: "user",
			model: "modificar",
			isPublic: false,
			body: body,
			formData: true
		});
		if(data["success"]) {
			this.getUserData();
			message.success("Se han editados sus datos exitosamente");
		}
		else{
			message.error("Hubo un error al editar los datos");
		}
	}


	openFormEdit() {
		let fotos = [];
		if(this.state.user["avatar"] !== "" && this.state.user["avatar"] !== null) {
			fotos.push({
				uid: this.state.user["pk"] + "",
				name: "foto" + this.state.user["pk"] + ".png",
				status: 'done',
				url: this.state.user["avatar"],
			});
		}

		let preconditions = {
			ciudad: this.state.user["ciudad"]
		}
		this.refFormEdit.current.open("Editar mis datos", [{"id" : "avatar", "values" : fotos}], preconditions);
	}

	openFormEditPassword() {
		this.refFormEditPassword.current.open("Editar contraseña");
	}

	async editUserPassword() {
		let formValues = this.refFormEditPassword.current.getValues();
		let body = {
			"last_password" : formValues["last_password"],
			"password" : formValues["password"]["password1"]
		}

		let data = await BasePanel.service.apiSend({
			method: "PUT",
			register: "user",
			model: "modificar_password",
			isPublic: false,
			body: body
		});

		if(data["success"]) {
			message.success("Se ha editado su contraseña exitosamente");
		}
		else{
			message.error("Hubo un error al editar los datos");
		}

	}

	async getUserData() {
		let body = {};
		let data = await BasePanel.service.apiSend({
			method: "GET",
			register: "user",
			model: "todo",
			isPublic: false,
			body: body
		});
		if(data["success"]) {
			this.user.setName(data["data"]["full_name"]);
			this.user.setAvatar(data["data"]["avatar"]);
			this.setState({
				user: data["data"]
			});

			if(this.first_login && data["data"]["ciudad"] === null) {
				this.first_login = false;
				this.openFormEdit();
			}
		}
		else{
			this.setState({
				user: null
			})
			message.error("Hubo un erro al cargar los datos del usuario");
		}
	}

	openModalPuntos() {
		this.refModalPuntos.current.open();
	}

	async sendConfirmation() {

		let data = await BasePanel.service.apiSend({
			method: "PUT",
			register: "user",
			model: "generar_confirmar",
			isPublic: false,
			body: {}
		});

		if(data["success"]) {
			message.success("Se ha enviado un correo electrónico");
		}
		else{
			message.error("Hubo un error al generar el código de confirmación");
		}
	}

	render() {
		let user = this.state.user;
		if(!user) {
			return (
				<div>
					<Row gutter={[40, 16]} align="top">
						<Col xs={24} md={11} lg={8}>
							<Skeleton.Avatar active={true} style={{width: "300px", height: "300px"}} shape={"circle"} />
						</Col>
						<Col xs={24} md={13} lg={16}>
							<Skeleton active={true}/>
							<Skeleton active={true}/>
							<Skeleton active={true}/>
						</Col>
					</Row>
				</div>
			);
		}

		user["celular1"] = user["celular1"] === "null" ? "" : user["celular1"];
		user["celular2"] = user["celular2"] === "null" ? "" : user["celular2"];

		let dataUser = [
			{title: "Celular 1", description: user["celular1"]},
			{title: "Celular 2", description: user["celular2"]},
			{title: "Teléfono", description: user["telefono"]},
			{title: "Email", description: user["email"]},
			{title: "Dirección", description: user["direccion"]},
		];
		let dataPedidos = [];
		for (let index in user["pedidos"]) {
			dataPedidos.push({
				"title" : <a onClick={(e) => this.openPedido(user["pedidos"][index]["pk"])}>{user["pedidos"][index]["total"].formatPrice() + " · Click para ver más "}</a>,
				"description" : user["pedidos"][index]["estado_nombre"] + " - Creado: " + user["pedidos"][index]["fecha_creacion"].formatDateTime()
			})
		}

		let dataMascota = user["mascotas"];
		let strokeColor = {
			'0%': '#108ee9',
			'100%': 'purple',
		};

		let messagePuntos = "Tienes " + user.puntos + " puntos que puedes redimir en cualquier compra"
		if (user.proxima_fecha_puntos === true) {
			messagePuntos += " ahora mismo";
		}
		else if(user.proxima_fecha_puntos){
			messagePuntos += " a partir del " + user.proxima_fecha_puntos.formatDateTime();
		}
		return (
			<div className="page-center">
				<ModalPuntos ref={this.refModalPuntos} />
				<ModalPedido ref={this.refModalPedido} />
				<EditUserForm
					ref={this.refFormEdit}
					modal={true}
					initialValues={user}
					modalOnOk={e => this.editUserData(false)}
					/>
				<EditPasswordForm
					ref={this.refFormEditPassword}
					modal={true}
					modalOnOk={this.editUserPassword}/>

				{
					!user.confirmado?
					<div>
						<Alert
							message="Tu correo electrónico no ha sido validado, revisa tu correo electrónico para validarlo."
							type="warning"
							action={
								<Space>
									<Button size="small" type="ghost" onClick={this.sendConfirmation}>
										Volver a enviar
									</Button>
								</Space>
							}
						/>
						<Divider />
					</div>
					:
					null
				}


				<Row gutter={[40, 16]} align="top">
					<Col xs={24} md={11} lg={8}>
						<div key={Math.random()} className="carouser-foto-container">
							{
								user.avatar ?
									<Avatar src={user.avatar} size={{ xs: 250, sm: 250, md: 300, lg: 250, xl: 300, xxl: 350 }} />
								:
								<Avatar size={{ xs: 250, sm: 250, md: 300, lg: 250, xl: 300, xxl: 350 }}>
									{user.first_name}
								</Avatar>
							}
						</div>
					</Col>
					<Col xs={24} md={13} lg={16}>
						<Row gutter={[40, 16]} align="middle">
							<Col xs={15} md={19}>
								<h2 className="mascota-name">Mi perfil · {user.full_name}</h2>
							</Col>
							<Col xs={9} md={5}>
								<Space>
									<Tooltip title="Editar datos de la mascota">
										<Button shape="circle" type="primary" icon={<EditOutlined />} onClick={this.openFormEdit}></Button>
									</Tooltip>
									<Tooltip title="Editar Contraseña">
										<Button shape="circle" icon={<KeyOutlined />} onClick={this.openFormEditPassword}></Button>
									</Tooltip>
								</Space>
							</Col>
						</Row>

						<p className="mascota-apodo">{user.email}</p>

						<Tabs defaultActiveKey="3">

							<TabPane tab="Mis mascotas" key="1">
								{
									dataMascota.length === 0 ?
										<div>
											<Button type="primary" onClick={(e) => this.redirectPage(this.constants.route_mascotas, {add: true})}>Agregar mascota</Button>
											<Divider />
										</div>
									:
									null
								}
								<List
									size="small"
									itemLayout="horizontal"
									dataSource={dataMascota}
									renderItem={item => (
									<List.Item>
										<List.Item.Meta
											title={<a onClick={(e) => this.redirectPage(this.constants.route_profile_mascotas, {pk: item.pk})}>{item.nombre}</a>}
											description={item.presentacion}
										/>
									</List.Item>
									)}
								/>
							</TabPane>
							<TabPane tab="Pedidos" key="2">
								<List
									size="small"
									itemLayout="horizontal"
									dataSource={dataPedidos}
									renderItem={item => (
									<List.Item>
										<List.Item.Meta
											title={item.title}
											description={item.description}
										/>
									</List.Item>
									)}
								/>
							</TabPane>
							<TabPane tab="Datos básicos" key="3">
								<List
									size="small"
									itemLayout="horizontal"
									dataSource={dataUser}
									renderItem={item => (
									<List.Item>
										<List.Item.Meta
											title={item.title}
											description={item.description}
										/>
									</List.Item>
									)}
								/>
							</TabPane>
							<TabPane tab="Mis puntos" key="4">
								<Alert
									message={messagePuntos}
									type="success"
									/>
								<Card style={{marginTop: "15px", textAlign: "center"}}>
									<Row align="bottom">
										{
											user.puntos_range.map((item, index) => {
												return (
													<Col xs={12} md={8} key={Math.random()}>
														<Progress type="circle" percent={99} format={percent => item["porcentaje"] + "% dcto"} strokeColor={item["current"] ? strokeColor : "gray"}/>
														<p>{item["minimo"]} - {item["maximo"]} puntos</p>
														{
															item["current"] ?
																<Tag color="success">Estás aquí</Tag>
															:
															null
														}
													</Col>
												)
											})
										}
									</Row>
									<Divider />
									<Space>
										<Button type="primary" shape="round" onClick={(e) => this.redirectPage(this.constants.route_tienda)}>Visitar tienda </Button>
										<Button onClick={this.openModalPuntos}>¿Cómo conseguir puntos? </Button>
									</Space>
								</Card>
							</TabPane>
						</Tabs>

					</Col>
				</Row>
			</div>
		);
	}
}

ProfileView.getInitialProps = async ({query}) => {
	return {query};
}
ProfileView.getPageName = () => {
	return "Mi perfil";
}
export default ProfileView;
