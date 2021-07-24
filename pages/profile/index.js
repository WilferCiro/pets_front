/**
	* Creado por Wilfer Daniel Ciro Maya - 2021
**/

// React Components
import React          from 'react';

// Custom classes
import BasePanel          from '@/containers/BasePanel';
import EditUserForm       from '@/formclasses/edit_user';
import EditPasswordForm   from '@/formclasses/edit_password';

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
	message
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

		// States
		this.state = {
			user: null
		}

		//Methods
		this.getUserData             = this.getUserData.bind(this);
		this.successGetUserData      = this.successGetUserData.bind(this);
		this.openFormEdit            = this.openFormEdit.bind(this);
		this.openFormEditPassword    = this.openFormEditPassword.bind(this);
		this.editUserData            = this.editUserData.bind(this);
		this.successEditUserData     = this.successEditUserData.bind(this);
		this.editUserPassword        = this.editUserPassword.bind(this);
		this.successEditUserPassword = this.successEditUserPassword.bind(this);

		// References
		this.refFormEditPassword = React.createRef();
		this.refFormEdit         = React.createRef();
	}

	componentDidMount() {
		this.getUserData();

		BasePanel.refBreadcrumb.current.setItems([{"label" : "Mi perfil"}])
	}

	editUserData() {
		let formValues = this.refFormEdit.current.getValues();
		let body = {
			"modelo" : "modificar",
			"first_name" : formValues["first_name"],
			"last_name" : formValues["last_name"],
			"celular1" : formValues["celular1"],
			"celular2" : formValues["celular2"],
			"telefono" : formValues["telefono"]
		}
		if(formValues["avatar"]["fotos"].length > 0 && formValues["avatar"]["fotos"][0]["uid"].includes("rc-upload")) {
			body["avatar"] = formValues["avatar"]["fotos"].length > 0 ? formValues["avatar"]["fotos"][0]["originFileObj"] : null;
		}
		else if(formValues["avatar"]["fotos"].length === 0) {
			body["avatar"] = "";
		}
		console.log(body);
		this.send({
			endpoint: this.constants.getPrivateEndpoint() + "fileuser",
			method: 'PUT',
			success: this.successEditUserData,
			body: body,
			showMessage : true,
			requires_token: true,
			formData: true
		});
	}

	successEditUserData(data) {
		console.log(data);
		if(data["estado_p"] === 200) {
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

		this.refFormEdit.current.open("Editar mis datos", [{"id" : "avatar", "values" : fotos}]);
	}

	openFormEditPassword() {
		this.refFormEditPassword.current.open("Editar contraseña");
	}

	editUserPassword() {
		let formValues = this.refFormEditPassword.current.getValues();
		let body = {
			"modelo" : "password",
			"last_password" : formValues["last_password"],
			"password" : formValues["password"]["password1"]
		}

		this.send({
			endpoint: this.constants.getPrivateEndpoint() + "user",
			method: 'PUT',
			success: this.successEditUserPassword,
			body: body,
			showMessage : true,
			requires_token: true
		});
	}

	successEditUserPassword(data) {
		if(data["estado_p"] === 200) {
			message.success("Se ha editado su contraseña exitosamente");
		}
		else{
			message.error("Hubo un error al editar los datos");
		}
	}


	getUserData() {
		let body = {
			"modelo" : "todo"
		}
		this.send({
			endpoint: this.constants.getPrivateEndpoint() + "user",
			method: 'GET',
			success: this.successGetUserData,
			body: body,
			showMessage : true,
			requires_token: true
		});
	}

	successGetUserData(data) {
		console.log(data);
		if(data["estado_p"] === 200) {
			this.setState({
				user: data["data"][0]
			})
		}
		else{
			this.setState({
				user: []
			})
			message.error("Hubo un erro al cargar los datos del usuario");
		}
	}

	render() {
		let user = this.state.user;
		if(!user) {
			return (<div>Cargando</div>);
		}

		let dataUser = [
			{title: "Celular 1", description: user["celular1"]},
			{title: "Celular 2", description: user["celular2"]},
			{title: "Teléfono", description: user["telefono"]},
			{title: "Email", description: user["email"]}
		];
		let dataMascota = user["mascotas"];


		return (
			<div className="page-center">

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

				<Row  gutter={[40, 16]} align="top">
					<Col xs={24} md={11} lg={8}>
						<div key={Math.random()} className="carouser-foto-container">
							{
								user.avatar ?
									<Avatar src={user.avatar} size={{ xs: 250, sm: 250, md: 250, lg: 250, xl: 300, xxl: 350 }} />
								:
								<Avatar size={{ xs: 250, sm: 250, md: 250, lg: 250, xl: 300, xxl: 350 }}>
									{user.first_name}
								</Avatar>
							}


						</div>
					</Col>
					<Col xs={24} md={13} lg={16}>
						<Row  gutter={[40, 16]} align="middle">
							<Col span={19}>
								<h2 className="mascota-name">Mi perfil · {user.full_name}</h2>
							</Col>
							<Col span={5}>
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

						<Tabs defaultActiveKey="1">

							<TabPane tab="Mis mascotas" key="1">
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
