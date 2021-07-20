import React          from 'react';
import BasePanel      from '@/containers/BasePanel';
import Constant       from '@/components/Constant';

import { Popconfirm, Alert, Tooltip, Tabs, List, Card, Avatar, Skeleton, Space, Result, Button, Row, Col, Carousel, Image, Divider, message } from 'antd';
import { EditOutlined, HeartFilled, QrcodeOutlined, AlertOutlined, AntDesignOutlined } from '@ant-design/icons';
import { QRCode } from 'react-qrcode-logo';
import EditMascotaFormStructure from '@/formclasses/edit_mascota';
import EditDesaparecidoFormStructure from '@/formclasses/edit_desaparecido';
import moment from 'moment';

const { TabPane } = Tabs;

class MascotasProfileView extends BasePanel{
	constructor(props) {
		super(props);

		this.state = {
			mascota : null
		}

		this.canEdit = true;
		this.isMissing = false;

		this.mascota_pk = this.props.mascota_pk;

		this.searchMascota        = this.searchMascota.bind(this);
		this.successSearchMascota = this.successSearchMascota.bind(this);
		this.openFormEdit         = this.openFormEdit.bind(this);
		this.onEditMascota        = this.onEditMascota.bind(this);
		this.successEditMascota   = this.successEditMascota.bind(this);
		this.deleteDesaparecidoReporte   = this.deleteDesaparecidoReporte.bind(this);
		this.openFormDesaparecido   = this.openFormDesaparecido.bind(this);

		this.breadcrumbData = [
			{"label" : "Mascotas", "route" : this.constants.route_mascotas, "params" : {}},
		];
		this.refFormEdit = React.createRef();
		this.refFormDesaparecido = React.createRef();
	}

	componentDidMount() {
		this.searchMascota(this.mascota_pk);

		BasePanel.refBreadcrumb.current.setItems(this.breadcrumbData);
	}



	searchMascota(pk) {
		let body = {
			"modelo" : "todo",
			"campos" : {
				"pk" : this.mascota_pk
			}
		}
		if(BasePanel.store.isLogged()){
			this.canEdit = true;
			this.send({
				endpoint: this.constants.getPrivateEndpoint() + "mascota",
				method: 'GET',
				success: this.successSearchMascota,
				body: body,
				showMessage : true,
				requires_token: true
			});
		}
		else{
			this.canEdit = false;
			this.send({
				endpoint: this.constants.getPublicEndpoint() + "mascota",
				method: 'GET',
				success: this.successSearchMascota,
				body: body,
				showMessage : true
			});
		}
	}
	successSearchMascota(data) {
		console.log(data);
		if(data["estado_p"] === 200) {
			this.setState({
				mascota: data["data"]
			});
			if(data["data"].length > 0){
				let dataBC = {
					"label" : data["data"][0].nombre
				}
				if (this.breadcrumbData.length === 2){
					this.breadcrumbData.push(dataBC);
				}
				else{
					this.breadcrumbData[2] = dataBC;
				}
				BasePanel.refBreadcrumb.current.setItems(this.breadcrumbData);
			}
		}
	}

	openFormEdit() {
		this.refFormEdit.current.open("Editar datos de la mascota");
	}
	openFormDesaparecido() {
		this.refFormDesaparecido.current.open("Reportar como desaparecida");
	}

	deleteDesaparecidoReporte(deleteReg = true) {
		let body = {};
		if(deleteReg){
			body = {
				"pk" : this.mascota_pk,
				"modelo" : "modificar_desaparecido",
				"fecha_desaparecido" : null,
				"descripcion_desaparecido" : null,
				"desaparecido" : false
			}
		}
		else{
			let values = this.refFormDesaparecido.current.getValues();
			body = {
				"pk" : this.mascota_pk,
				"modelo" : "modificar_desaparecido",
				"fecha_desaparecido" : values["fecha_desaparecido"],
				"descripcion_desaparecido" : values["descripcion_desaparecido"],
				"desaparecido" : true
			}
		}
		console.log(body);
		this.send({
			endpoint: this.constants.getPrivateEndpoint() + "mascota",
			method: 'PUT',
			success: this.successEditMascota,
			body: body,
			showMessage : true,
			requires_token: true
		});
	}

	onEditMascota() {
		let formValues = this.refFormEdit.current.getValues();
		let body = {
			"pk" : this.mascota_pk,
			"modelo" : "modificar",
			"nombre" : formValues["nombre"],
			"fecha_nacimiento" : formValues["fecha_nacimiento"],
			"tipo" : formValues["tipo"],
			"raza" : formValues["raza"],
			"visible" : formValues["visible"],
			"presentacion" : formValues["presentacion"]
		}

		this.send({
			endpoint: this.constants.getPrivateEndpoint() + "mascota",
			method: 'PUT',
			success: this.successEditMascota,
			body: body,
			showMessage : true,
			requires_token: true
		});
	}

	successEditMascota(data) {
		if(data["estado_p"] === 200) {
			this.searchMascota(this.mascota_pk);
			message.success("Los datos de la mascota han sido editados con éxito");
		}
		else{
			message.error("Hubo un error al editar los datos de la mascota");
		}
	}

	render() {
		let mascota = this.state.mascota;
		if(!mascota) {
			return (<div>Cargando</div>);
		}

		if(mascota.length === 0 || (!mascota[0]["visible"] && !mascota[0]["desaparecido"] && !this.canEdit)) {
			return (
				<Result
					//icon={<InboxOutlined />}
					title={(mascota.length === 0) ? "Esta mascota no existe" : "Esta mascota está oculta"}
					extra={<Button type="primary">Volver atrás</Button>}
				/>
			);
		}

		mascota = mascota[0];
		let mascotaEdit = Object.assign({}, mascota);
		mascotaEdit["fecha_nacimiento"] = moment(mascotaEdit["fecha_nacimiento"], "YYYY-MM-DD hh:mm:ss")

		this.isMissing = mascota["desaparecido"];

		let dataMascota = [
			{title: "Fecha de nacimiento", description: mascota["fecha_nacimiento"] ? (mascota["fecha_nacimiento"] + "").formatDateTime() : "No hay fecha de nacimiento"},
			{title: "Identificación", description: mascota["identificacion"]},
			{title: "Presentación", description: mascota["presentacion"]},
			{title: "Sexo", description: "Hembra"},
			//{title: "Acciones", description: null},
		];
		let dataConacto = [
			{title: "Nombre Dueño", description: mascota["user__nombre"] ? mascota["user__nombre"] : "Información oculta"},
			{title: "Celular 1", description: mascota["user__celular1"] ? mascota["user__celular1"] : "Información oculta"},
			{title: "Celular 2", description: mascota["user__celular2"] ? mascota["user__celular2"] : "Información oculta"},
			{title: "Email", description: mascota["user__email"] ? mascota["user__email"] : "Información oculta"},
			//{title: "Acciones", description: null},
		];

		let dataMissing = [
			{title: "Fecha de desaparición", description: mascota["fecha_desaparecido"] ? (mascota["fecha_desaparecido"] + "").formatDateTime() : "No hay fecha registrada"},
			{title: "Descripción", description: mascota["descripcion_desaparecido"]},
		]

		return (
			<div>
				{
					this.canEdit ?
						<div>
							<EditMascotaFormStructure
								modal={true}
								vertical={false}
								ref={this.refFormEdit}
								modalOnOk={this.onEditMascota}
								initialValues={mascotaEdit} />

							<EditDesaparecidoFormStructure
								modal={true}
								vertical={false}
								ref={this.refFormDesaparecido}
								modalOnOk={e => this.deleteDesaparecidoReporte(false)} />
						</div>
					:
						null
				}
				{
					this.isMissing ?
					<div>
						<Alert
							message="Esta mascota está reportada como desaparecida"
							type="error"
							description="Si tienes información de esta mascota por favor reportalo."
							showIcon />

						<Divider />
					</div>
					:
					null
				}
				<Row  gutter={[40, 16]} align="top">
					<Col xs={24} md={11} lg={8}>
						<Carousel>
							{
								(mascota.fotos).map((foto, index) => {
									return <div key={Math.random()} className="carouser-foto-container">
										<img
											className="carousel-foto"
											src={foto["foto"]}
											alt={foto["descripcion"]}
										/>
										<div className="description">
											{foto["descripcion"]}
										</div>
									</div>
								})
							}
						</Carousel>
						<Divider />
						{
							this.canEdit && !this.isMissing ?
								<Tooltip title="Reportar como desaparecido">
									<Button size="large" danger type="primary" icon={<AlertOutlined />} onClick={this.openFormDesaparecido}>Reportar como desaparecido</Button>
								</Tooltip>
							:
							null
						}

						{
							this.isMissing && this.canEdit ?
								<Popconfirm
									title="¿Está seguro que desea borrar este reporte?"
									onConfirm={this.deleteDesaparecidoReporte}
									okText="Si"
									cancelText="No"
									>
									<Button size="large" type="primary" icon={<AlertOutlined />}>Eliminar reporte de desaparecido</Button>
								</Popconfirm>
							:
							null
						}

					</Col>

					<Col xs={24} md={13} lg={16}>
						<Row  gutter={[40, 16]} align="middle">
							<Col span={19}>
								<h2 className="mascota-name">{mascota.nombre}</h2>
							</Col>
							<Col span={5}>
								{
									this.canEdit ?
										<Tooltip title="Editar datos de la mascota">
											<Button shape="circle" type="primary" icon={<EditOutlined />} onClick={this.openFormEdit}></Button>
										</Tooltip>
									:
									null
								}
							</Col>
						</Row>
						<p className="mascota-apodo">@{mascota.identificacion}</p>

						<Tabs defaultActiveKey="1">
							<TabPane tab="Datos básicos" key="1">
								<List
									size="small"
									itemLayout="horizontal"
									dataSource={dataMascota}
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
							{
								this.canEdit || this.isMissing ?
									<TabPane tab="Datos de contacto" key="2">
										<List
											size="small"
											itemLayout="horizontal"
											dataSource={dataConacto}
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
								:
								null
							}

							<TabPane tab="Vacunas" key="3">
								<List
									size="small"
									itemLayout="horizontal"
									dataSource={mascota["vacunas"]}
									renderItem={item => (
									<List.Item>
										<List.Item.Meta
											title={item.vacuna}
											description={(item.fecha_aplicacion + "").formatDateTime()}
										/>
									</List.Item>
									)}
								/>
							</TabPane>
							{
								this.canEdit ?
									<TabPane tab="Placa" key="4">
										<QRCode value="Puto el que lo escanee" bgColor={"purple"} fgColor={"white"} qrStyle={"dots"} />
									</TabPane>
								:
								null
							}

							{
								this.isMissing ?
									<TabPane tab="Datos de desaparición" key="5">
										<List
											size="small"
											itemLayout="horizontal"
											dataSource={dataMissing}
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
								:
								null
							}

						</Tabs>


					</Col>
				</Row>
			</div>
		);
	}
}

MascotasProfileView.getInitialProps = async ({query, ctx, req, pathname}) => {
	let mascota_pk = query.pk;
	return {query, mascota_pk};
}

export default MascotasProfileView;

//<img className="carousel-foto" src={foto["foto"]} />

/*
mascota.fotos.length === 0 ?
<div key={Math.random()} className="carouser-foto-container">
	<Avatar
		style={{backgroundColor: "purple", verticalAlign: 'middle'}}
		size={{ xs: 300, sm: 300, md: 250, lg: 250, xl: 300, xxl: 400 }}
		>
		Click para agregar foto
	</Avatar>
</div>
:
*/
