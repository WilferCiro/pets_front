import React          from 'react';
import BasePanel      from '@/containers/BasePanel';
import { Card, Avatar, Skeleton, Space, Result, Button, List, Row, Col, Tooltip, message, Tag } from 'antd';
import { PlusCircleFilled, EditOutlined, EllipsisOutlined, SettingOutlined, InboxOutlined } from '@ant-design/icons';

import AddMascotaFormStructure from '@/formclasses/add_mascota';

const { Meta } = Card;
class MascotasView extends BasePanel{
	constructor(props) {
		super(props);

		this.state = {
			mascotas: null,
			paginator: null
		}

		this.pageSize = 9;

		this.searchMascotas        = this.searchMascotas.bind(this);
		this.successSearchMascotas = this.successSearchMascotas.bind(this);
		this.addMascota            = this.addMascota.bind(this);
		this.onAddMascota          = this.onAddMascota.bind(this);
		this.successAddMascota     = this.successAddMascota.bind(this);
		this.successUploadPhotos   = this.successUploadPhotos.bind(this);

		this.refFormAdd = React.createRef();
	}

	componentDidMount() {
		this.searchMascotas(1);

		BasePanel.refBreadcrumb.current.setItems([{"label" : "Mascotas"}])
	}

	searchMascotas(page) {
		let body = {
			"cantidad" : this.pageSize,
			"pagina" : page,
			"modelo" : "card",
			"ordenar_por" : "-pk"
		}
		this.send({
			endpoint: this.constants.getPrivateEndpoint() + "mascota",
			method: 'GET',
			success: this.successSearchMascotas,
			body: body,
			showMessage : true,
			requires_token: true
		});
	}

	successSearchMascotas(data) {
		console.log(data);
		if(data["estado_p"] === 200) {
			this.setState({
				mascotas: data["data"],
				paginator: data["paginator"]
			});
		}
	}

	addMascota() {
		this.refFormAdd.current.open("Registrar nueva mascota");
	}

	onAddMascota() {
		let formValues = this.refFormAdd.current.getValues();
		this.images = formValues["imagenes"]["fotos"];
		this.uploaded = 0;
		let body = {
			"modelo" : "crear",
			"nombre" : formValues["nombre"],
			"fecha_nacimiento" : formValues["fecha_nacimiento"],
			"tipo" : formValues["tipo"],
			"raza" : formValues["raza"],
			"visible" : formValues["visible"],
			"presentacion" : formValues["presentacion"]
		}

		this.send({
			endpoint: this.constants.getPrivateEndpoint() + "mascota",
			method: 'POST',
			success: this.successAddMascota,
			body: body,
			showMessage : true,
			requires_token: true
		});
	}

	successAddMascota(data) {
		if(data["estado_p"] === 200) {

			let pk = data["data"]["pk"];
			this.newPk = pk;
			this.uploaded = 0;
			for (let index in this.images) {
				let body = {
					"modelo" : "crear",
					"foto" : this.images[index]["originFileObj"],
					"mascota" : pk
				}
				console.log(body);
				this.send({
					endpoint: this.constants.getPrivateEndpoint() + "filemascota",
					method: 'POST',
					success: this.successUploadPhotos,
					body: body,
					showMessage : true,
					requires_token: true,
					formData: true
				});
			}
			//
		}
	}

	successUploadPhotos(data){
		console.log(data, this.uploaded, this.images.length);
		this.uploaded += 1;
		if (this.uploaded === this.images.length) {
			message.success("La mascota ha sido registada con éxito");
			this.redirectPage(this.constants.route_profile_mascotas, {"pk" : this.newPk});
		}
	}

	render() {
		if (!this.state.mascotas) {
			return (
				<Card
					style={{ width: 300, marginTop: 16 }}
					>
					<Space>
						<Skeleton.Image style={{width: 260}} />
					</Space>
					<Skeleton loading={true} active />
					<Space>
						<Skeleton.Button active={true} size={"default"} shape={"default"} />
						<Skeleton.Button active={true} size={"default"} shape={"default"} />
						<Skeleton.Button active={true} size={"default"} shape={"default"} />
					</Space>
				</Card>
			);
		}

		if(this.state.mascotas.length === 0) {
			return (
				<Result
					icon={<InboxOutlined />}
					title="No has inscrito tus mascotas, inscríbelas totalmente gratis y obtén su código QR para su propio collar"
					extra={<Button type="primary">Registrar</Button>}
				/>
			);
		}

		return (
			<div>
				<AddMascotaFormStructure
					modal={true}
					vertical={false}
					ref={this.refFormAdd}
					modalOnOk={this.onAddMascota}
					initialValues={{
						"visible" : true
					}}
					/>
				<Tooltip title="Registrar nueva mascota">
					<Button type="primary" icon={<PlusCircleFilled />} onClick={this.addMascota}>Registrar mascota</Button>
				</Tooltip>

				<List
					itemLayout="vertical"
					size="large"
					grid={{
						gutter: 8,
						xs: 1,
						sm: 1,
						md: 2,
						lg: 2,
						xl: 3,
						xxl: 4,
					}}
					pagination={{
						onChange: page => {
							this.searchMascotas(page);
						},
						total: this.state.paginator.total,
						pageSize: this.pageSize,
						position: "both"
					}}
					dataSource={this.state.mascotas}
					renderItem={mascota => (
						<List.Item
							key={Math.random()}
						>
							<Card
								key={Math.random()}
								style={{ width: "100%" }}
								cover={
									<img
										className="image-card"
										alt={mascota.foto.length > 0 ? mascota.foto[0].descripcion : "Foto de mascota"}
										src={mascota.foto.length > 0 ? mascota.foto[0].foto : "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"}
									/>
								}
								>
									<Meta
										title={<div>
												<a onClick={(e) => this.redirectPage(this.constants.route_profile_mascotas, {"pk" : mascota.pk})}>
													{mascota.nombre} - @{mascota.identificacion}
												</a>
											</div>
										}
										description={<div>
											{mascota.presentacion}
											{mascota.desaparecido ? <div><Tag color="red">Desaparecid@</Tag></div> : null}
										</div>}
									/>
							</Card>
						</List.Item>
						)}
					/>
			</div>
		);
	}
}
MascotasView.getPageName = () => {
	return "Mis mascotas";
}
export default MascotasView;
