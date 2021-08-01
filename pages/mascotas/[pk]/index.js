/**
	* Creado por Wilfer Daniel Ciro Maya - 2021
**/
// React Components
import React          from 'react';

// NextJS libraries
import Image from 'next/image'

// Custom classes
import EditDesaparecidoForm      from '@/formclasses/edit_desaparecido';
import TableMascotasVacunas      from '@/tables/MascotasVacunas';
import TableMascotasEnfermedades from '@/tables/MascotasEnfermedades';
import AddMascotaForm            from '@/formclasses/add_mascota';
import ModalMissing              from '@/containers/ModalMissing';
import BasePanel                 from '@/containers/BasePanel';

// Third part
import { QRCode } from 'react-qrcode-logo';
import moment from 'moment';

// Ant components and icons
import {
	Popconfirm,
	Alert,
	Tooltip,
	Tabs,
	List,
	Avatar,
	Result,
	Button,
	Row,
	Col,
	Carousel,
	Divider,
	message,
	Space
} from 'antd';
import {
	RightOutlined,
	LeftOutlined,
	EditOutlined,
	AlertOutlined,
	FacebookFilled,
	InstagramFilled,
	TwitterSquareFilled,
	WhatsAppOutlined
} from '@ant-design/icons';

const { TabPane } = Tabs;

class MascotasProfileView extends BasePanel{
	constructor(props) {
		super(props);

		// Props
		this.mascota_pk     = this.props.mascota_pk;
		this.isLogged       = this.props.isLogged;
		this.listMascotasPK = this.props.listMascotasPK;

		// States
		this.state = {
			mascota : null
		}

		// Variables
		this.canEdit        = true;
		this.isMissing      = false;
		this.breadcrumbData = [
			{"label" : "Mascotas", "route" : this.constants.route_mascotas, "params" : {}},
		];

		// Methods
		this.searchMascota             = this.searchMascota.bind(this);
		this.openFormEdit              = this.openFormEdit.bind(this);
		this.onEditMascota             = this.onEditMascota.bind(this);
		this.successEditMascota        = this.successEditMascota.bind(this);
		this.deleteDesaparecidoReporte = this.deleteDesaparecidoReporte.bind(this);
		this.openFormDesaparecido      = this.openFormDesaparecido.bind(this);
		this.openMissingModal          = this.openMissingModal.bind(this);
		this.nextImage                 = this.nextImage.bind(this);
		this.prevImage                 = this.prevImage.bind(this);

		// References
		this.refFormEdit         = React.createRef();
		this.refFormDesaparecido = React.createRef();
		this.refModalMissing     = React.createRef();
		this.refPhotosCarousel   = React.createRef();

	}

	componentDidMount() {
		this.searchMascota();
		this.setBreadCrumb(this.breadcrumbData);
	}

	openMissingModal() {
		this.refModalMissing.current.open();
	}

	async searchMascota() {
		let body = {
			"campos" : {
				"pk" : this.mascota_pk
			}
		}
		let data = {};
		console.log(this.listMascotasPK);
		if(this.isLogged && this.listMascotasPK.includes(this.mascota_pk)){
			this.canEdit = true;
			data = await BasePanel.service.apiSend({
				method: "GET",
				register: "mascota",
				model: "todo",
				isPublic: false,
				body: body
			});
		}
		else{
			this.canEdit = false;
			data = await BasePanel.service.apiSend({
				method: "GET",
				register: "mascota",
				model: "todo",
				isPublic: true,
				body: body
			});
		}
		console.log(data);
		if(data["code"] === 200) {
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
				this.setBreadCrumb(this.breadcrumbData);
			}
		}
		else{
			this.setState({
				mascota: []
			});
		}
	}

	openFormEdit() {
		let mascota = this.state.mascota[0];
		let fotos = [];
		for (let indexFoto in mascota["fotos"]) {
			fotos.push({
				uid: mascota["fotos"][indexFoto]["pk"] + "",
				name: "foto" + indexFoto + ".png",
				status: 'done',
				url: mascota["fotos"][indexFoto]["foto"],
			});
		}

		this.refFormEdit.current.open("Editar datos de la mascota", [{"id" : "imagenes", "values" : fotos}]);
	}
	openFormDesaparecido() {
		this.refFormDesaparecido.current.open("Reportar como desaparecida");
	}

	async deleteDesaparecidoReporte(deleteReg = true) {
		let body = {};
		if(deleteReg){
			body = {
				"pk" : this.mascota_pk,
				"fecha_desaparecido" : null,
				"descripcion_desaparecido" : null,
				"desaparecido" : false
			}
		}
		else{
			let values = this.refFormDesaparecido.current.getValues();
			body = {
				"pk" : this.mascota_pk,
				"fecha_desaparecido" : values["fecha_desaparecido"],
				"descripcion_desaparecido" : values["descripcion_desaparecido"],
				"desaparecido" : true
			}
		}

		let data = await BasePanel.service.apiSend({
			method: "PUT",
			register: "mascota",
			model: "modificar_desaparecido",
			body: body,
			isPublic: false
		});

		this.successEditMascota(data);

	}

	async onEditMascota() {
		let formValues = this.refFormEdit.current.getValues();
		let newFotos = formValues["imagenes"]["fotos"];
		let body = {
			"pk" : this.mascota_pk,
			"nombre" : formValues["nombre"],
			"fecha_nacimiento" : formValues["fecha_nacimiento"].format("YYYY-MM-DD"),
			"tipo" : formValues["tipo"],
			"raza" : formValues["raza"],
			"visible" : formValues["visible"],
			"sexo" : formValues["sexo"],
			"presentacion" : formValues["presentacion"]
		}

		let data = await BasePanel.service.apiSend({
			method: "PUT",
			register: "mascota",
			model: "modificar",
			body: body,
			isPublic: false
		});

		this.successEditMascota(data, newFotos);
	}

	async successEditMascota(data, newFotos = null) {
		if(data["code"] === 200) {

			let mascota = this.state.mascota[0];
			if(newFotos){
				for (let index in mascota["fotos"]){
					let found = newFotos.find(function(post, ind) {
						if(post.uid.toString() === mascota["fotos"][index]["pk"].toString()){
							return true;
						}
					});
					if (!found){

						let body = {
							"pk" : mascota["fotos"][index]["pk"]
						}
						let data = await BasePanel.service.apiSend({
							method: "DELETE",
							register: "fotomascota",
							model: "delete",
							body: body,
							isPublic: false
						});
					}
				}

				for(let index in newFotos) {
					if(newFotos[index]["uid"].includes("rc-upload-")){

						let body = {
							"foto" : newFotos[index]["originFileObj"],
							"mascota" : this.mascota_pk
						}

						let data = await BasePanel.service.apiSend({
							method: "POST",
							register: "filemascota",
							model: "crear",
							body: body,
							isPublic: false,
							formData: true
						});

					}
				}
			}

			this.searchMascota();
			message.success("Los datos de la mascota han sido editados con éxito");
		}
		else{
			message.error("Hubo un error al editar los datos de la mascota");
		}
	}

	prevImage() {
		this.refPhotosCarousel.current.prev();
	}
	nextImage() {
		this.refPhotosCarousel.current.next();
	}

	render() {
		let mascota = this.state.mascota;
		let mascotaEdit;
		let dataMascota = [];
		let dataConacto = [];
		let dataMissing = [];
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
		mascotaEdit = Object.assign({}, mascota);
		mascotaEdit["fecha_nacimiento"] = moment(mascotaEdit["fecha_nacimiento"], "YYYY-MM-DD")

		this.isMissing = mascota["desaparecido"];

		dataMascota = [
			{title: "Fecha de nacimiento", description: mascota["fecha_nacimiento"] ? (mascota["fecha_nacimiento"] + "").formatDate() : "No hay fecha de nacimiento"},
			{title: "Identificación", description: mascota["identificacion"]},
			{title: "Presentación", description: mascota["presentacion"]},
			{title: "Sexo", description: mascota["sexo_name"]}
		];
		dataConacto = [
			{title: "Nombre Dueño", description: mascota["user__nombre"] ? mascota["user__nombre"] : "Información oculta"},
			{title: "Celular 1", description: mascota["user__celular1"] ? mascota["user__celular1"] : "Información oculta"},
			{title: "Celular 2", description: mascota["user__celular2"] ? mascota["user__celular2"] : "Información oculta"},
			{title: "Email", description: mascota["user__email"] ? mascota["user__email"] : "Información oculta"}
		];

		dataMissing = [
			{title: "Fecha de desaparición", description: mascota["fecha_desaparecido"] ? (mascota["fecha_desaparecido"] + "").formatDateTime() : "No hay fecha registrada"},
			{title: "Descripción", description: mascota["descripcion_desaparecido"]},
		]
		if(this.canEdit) {
			dataMissing.push({title: "Acciones", description: <Button type="primary" onClick={this.openMissingModal}>Generar cartel</Button>});
		}


		return (
			<div>
				{
					this.canEdit ?
						<div>
							<AddMascotaForm
								modal={true}
								vertical={false}
								ref={this.refFormEdit}
								modalOnOk={this.onEditMascota}
								initialValues={mascotaEdit}
								/>

							<EditDesaparecidoForm
								modal={true}
								vertical={false}
								ref={this.refFormDesaparecido}
								modalOnOk={e => this.deleteDesaparecidoReporte(false)} />

							<ModalMissing
								mascotaData={mascota}
								ref={this.refModalMissing}
							/>
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
						<div className="carousel-container">
							{
								(mascota.fotos.length > 1) ?
								<div>
									<div className="carousel-left">
										<Button type="primary" icon={<LeftOutlined />} onClick={this.prevImage}/>
									</div>
									<div className="carousel-right">
										<Button type="primary" icon={<RightOutlined />} onClick={this.nextImage} />
									</div>
								</div>
								:
								null
							}
							<Carousel effect="fade" ref={this.refPhotosCarousel}>
								{
									(mascota.fotos).map((foto, index) => {
										return <div key={Math.random()} className="carouser-foto-container">
											<Image
												className="carousel-foto"
												src={foto["foto"]}
												alt={foto["descripcion"]}
												layout='responsive'
												width={200}
												height={200}
												placeholder="blur"
												blurDataURL="data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
											/>
										</div>
									})
								}
								{
									(mascota.fotos.length === 0) ?
									<div key={Math.random()} className="carouser-foto-container">
										<Image
											className="carousel-foto"
											src={this.constants.img_no_mascota}
											alt={"Esta mascota no tiene fotos"}
											layout='responsive'
											width={200}
											height={200}
										/>
									</div>
									:
									null
								}
							</Carousel>
						</div>
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
						<p className="mascota-apodo">{mascota.tipo_nombre} {mascota.raza_nombre ? ", " + mascota.raza_nombre : ""}</p>

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
								<TableMascotasVacunas mascota_tipo={mascota["tipo"]} vacunas={mascota["vacunas"]} mascota_pk={this.mascota_pk} canEdit={this.canEdit} />
							</TabPane>

							<TabPane tab="Enfermedades" key="4">
								<TableMascotasEnfermedades mascota_tipo={mascota["tipo"]} enfermedades={mascota["enfermedades"]} mascota_pk={this.mascota_pk} canEdit={this.canEdit} />
							</TabPane>
							{
								this.canEdit ?
									<TabPane tab="Placa" key="5">
										<QRCode size="300" value="Prueba kiwipeluditos con zunga" bgColor={"#555555"} fgColor={"white"} qrStyle={"dots"} />
									</TabPane>
								:
								null
							}

							{
								this.isMissing ?
									<TabPane tab="Datos de desaparición" key="6">
										<List
											size="small"
											itemLayout="horizontal"
											dataSource={dataMissing}
											renderItem={item => (
											<List.Item>
												<List.Item.Meta
													title={item.title}
													description={
														item.description
													}
												/>
											</List.Item>
											)}
										/>
										{
											this.canEdit?
												<div>
													<Divider />
													<Row align="middle">
														<Col xs={10} md={14} >
															Compartir
														</Col>
														<Col xs={14} md={10} >
															<Space>
																<Tooltip title="Compartir en facebook">
																	<Button size="large" type="primary" shape="circle" icon={<FacebookFilled />} />
																</Tooltip>
																<Tooltip title="Compartir en instagram">
																	<Button size="large" type="primary" shape="circle" icon={<InstagramFilled />} />
																</Tooltip>
																<Tooltip title="Compartir en twitter">
																	<Button size="large" type="primary" shape="circle" icon={<TwitterSquareFilled />} />
																</Tooltip>
																<Tooltip title="Compartir en whatsapp">
																	<Button size="large" type="primary" shape="circle" icon={<WhatsAppOutlined />} />
																</Tooltip>
															</Space>
														</Col>
													</Row>
												</div>
											:
											null
										}
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
	let isLogged = BasePanel.store.isLogged({query, req, pathname});
	let mascotas = BasePanel.store.readValue("mascotas", {query, req, pathname});
	let listMascotasPK = mascotas.split(",");
	return {query, mascota_pk, isLogged, listMascotasPK};
}
MascotasProfileView.getPageName = () => {
	return "Perfil de mascota";
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
