import React              from 'react';
import BasePanel          from '@/containers/BasePanel';
import EditUserForm       from '@/formclasses/edit_user';
import EditPasswordForm   from '@/formclasses/edit_password';

import { Popconfirm, Alert, Tooltip, Tabs, List, Card, Avatar, Skeleton, Space, Result, Button, Row, Col, Carousel, Image, Divider, message } from 'antd';
import { EditOutlined, HeartFilled, QrcodeOutlined, AlertOutlined, AntDesignOutlined } from '@ant-design/icons';
const { TabPane } = Tabs;

class ProfileView extends BasePanel{
	constructor(props) {
		super(props);

		this.getUserData = this.getUserData.bind(this);
		this.successGetUserData = this.successGetUserData.bind(this);
		this.openFormEdit = this.openFormEdit.bind(this);
		this.openFormEditPassword = this.openFormEditPassword.bind(this);

		this.editUserData = this.editUserData.bind(this);
		this.successEditUserData = this.successEditUserData.bind(this);
		this.editUserPassword = this.editUserPassword.bind(this);
		this.successEditUserPassword = this.successEditUserPassword.bind(this);

		this.state = {
			user: null
		}

		this.refFormEdit = React.createRef();
		this.refFormEditPassword = React.createRef();
	}

	componentDidMount() {
		this.getUserData();
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

		this.send({
			endpoint: this.constants.getPrivateEndpoint() + "user",
			method: 'PUT',
			success: this.successEditUserData,
			body: body,
			showMessage : true,
			requires_token: true
		});
	}

	successEditUserData(data) {
		if(data["estado_p"] === 200) {
			this.getUserData();
			message.success("Se han editados sus datos exitosamente");
		}
		else{
			message.error("Hubo un error al editar los datos");
		}
	}

	openFormEdit() {
		this.refFormEdit.current.open("Editar mis datos");
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
								<img
									className="carousel-foto"
									src={user.avatar}
									alt={"foto de " + user.full_name}
								/>
								:
								<Avatar size={300}/>
							}

							<Button type="primary" onClick={this.openFormEditPassword}>Cambiar contraseña</Button>
						</div>
					</Col>
					<Col xs={24} md={13} lg={16}>
						<Row  gutter={[40, 16]} align="middle">
							<Col span={19}>
								<h2 className="mascota-name">Mi perfil · {user.full_name}</h2>
							</Col>
							<Col span={5}>
								<Tooltip title="Editar datos de la mascota">
									<Button shape="circle" type="primary" icon={<EditOutlined />} onClick={this.openFormEdit}></Button>
								</Tooltip>
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

export default ProfileView;
