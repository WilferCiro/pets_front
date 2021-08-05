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

// React-shared
import {
	FacebookShareButton,
	FacebookIcon,
	TwitterShareButton,
	TwitterIcon,
	WhatsappShareButton,
	WhatsappIcon,
	TelegramShareButton,
	TelegramIcon
} from "react-share";

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
	AlertOutlined
} from '@ant-design/icons';

const { TabPane } = Tabs;

class MascotasProfileView extends BasePanel{
	constructor(props) {
		super(props);

		// Props
		this.mascota_pk     = this.props.mascota_pk;
		this.isLogged       = this.props.isLogged;

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
		let data = {};
		let listPks = []

		if(this.isLogged){

			data = await BasePanel.service.apiSend({
				method: "GET",
				register: "user",
				model: "lista_pkmascotas",
				isPublic: false
			});

			if(data["success"]){
				listPks = data["data"]["mascotas"];
			}
		}

		if(this.isLogged && listPks.includes(this.mascota_pk)) {
			this.canEdit = true;
			data = await BasePanel.service.apiSend({
				method: "GET",
				register: "mascota",
				model: "todo",
				aditional : [this.mascota_pk],
				isPublic: false
			});
		}
		else{
			this.canEdit = false;
			data = await BasePanel.service.apiSend({
				method: "GET",
				register: "mascota",
				model: "todo",
				aditional : [this.mascota_pk],
				isPublic: true
			});
		}
		if(data["success"]) {
			this.setState({
				mascota: data["data"]
			});
			if(data["data"]){
				let dataBC = {
					"label" : data["data"].nombre
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
		let mascota = this.state.mascota;
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
			aditional: [this.mascota_pk],
			isPublic: false
		});

		this.successEditMascota(data);

	}

	async onEditMascota() {
		let formValues = this.refFormEdit.current.getValues();
		let newFotos = formValues["imagenes"]["fotos"];
		let body = {
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
			aditional: [this.mascota_pk],
			isPublic: false
		});

		this.successEditMascota(data, newFotos);
	}

	async successEditMascota(data, newFotos = null) {
		if(data["success"]) {

			let mascota = this.state.mascota;
			if(newFotos){
				for (let index in mascota["fotos"]){
					let found = newFotos.find(function(post, ind) {
						if(post.uid.toString() === mascota["fotos"][index]["pk"].toString()){
							return true;
						}
					});
					if (!found){
						await BasePanel.service.apiSend({
							method: "DELETE",
							register: "mascota_foto",
							model: "eliminar",
							aditional: [mascota["fotos"][index]["pk"]],
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

						await BasePanel.service.apiSend({
							method: "POST",
							register: "mascota_foto",
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

		if(!mascota["visible"] && !mascota["desaparecido"] && !this.canEdit) {
			let title = !this.isLogged ? "Esta mascota está oculta, ¿es tuya? Inicia sesión" : "Esta mascota está oculta";
			let button = !this.isLogged ?
				<Button type="primary" onClick={e => this.redirectPage(this.constants.route_login, {"mascota" : this.mascota_pk})}>Iniciar sesión</Button>
				:
				<Button type="primary" onClick={e => this.redirectPage(this.constants.route_mascotas)}>Volver a las mascotas</Button>
			return (
				<Result
					//icon={<InboxOutlined />}
					title={title}
					extra={button}
				/>
			);
		}

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

		let urlMascota = this.constants.getUrlFront() + this.constants.route_profile_mascotas.replace("[pk]", mascota["pk"] + "?fromQR=true")
		let mascotaURLShare = this.constants.getUrlFront() + this.constants.route_profile_mascotas.replace("[pk]", mascota["pk"] + "-" + mascota["nombre"].formatURL());
		let mascotaShareText = "Mi mascota " + mascota["nombre"] + " está desaparecida, aquí te comparto su perfil en KiwiPeluditos";
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
										<Divider />
											{
												this.canEdit ?
													<Tooltip title="Editar datos de la mascota">
														<Button type="primary" icon={<EditOutlined />} onClick={(e) => this.redirectPage(this.constants.route_profile)}> Editar datos de contacto</Button>
													</Tooltip>
												:
												null
											}
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
										<QRCode size="300" value={urlMascota} bgColor={"#555555"} fgColor={"white"} qrStyle={"dots"} />
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
													<Row align="middle">
														<Col xs={10} md={12} >
															Compartir desaparición
														</Col>
														<Col xs={14} md={12} >
															<Space>
																<Tooltip title="Compartir en facebook">
																	<FacebookShareButton
																		url={mascotaURLShare}
																		quote={mascotaShareText}
																		>
																		<FacebookIcon size={32} round />
																	</FacebookShareButton>
																</Tooltip>
																<Tooltip title="Compartir en telegram">
																	<TelegramShareButton
																		url={mascotaURLShare}
																		title={mascotaShareText}
																		>
																		<TelegramIcon size={32} round />
																	</TelegramShareButton>
																</Tooltip>
																<Tooltip title="Compartir en twitter">
																	<TwitterShareButton
																		url={mascotaURLShare}
																		title={mascotaShareText}
																		>
																		<TwitterIcon size={32} round />
																	</TwitterShareButton>
																</Tooltip>
																<Tooltip title="Compartir en whatsapp">
																	<WhatsappShareButton
																		url={mascotaURLShare}
																		title={mascotaShareText}
																		>
																		<WhatsappIcon size={32} round />
																	</WhatsappShareButton>
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
	return {query, mascota_pk, isLogged};
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
