/**
	* Creado por Wilfer Daniel Ciro Maya - 2021
**/

// React Components
import React          from 'react';

// Custom classes
import BasePanel      from '@/containers/BasePanel';
import AddMascotaForm from '@/formclasses/add_mascota';
import MascotaCard    from '@/components/MascotaCard';

// Ant components and icons
import {
	Card,
	Result,
	Button,
	List,
	Tooltip,
	message
} from 'antd';
import {
	PlusCircleFilled,
	InboxOutlined
} from '@ant-design/icons';


const { Meta } = Card;
class MascotasView extends BasePanel{
	constructor(props) {
		super(props);

		// Props

		// States
		this.state = {
			mascotas: null,
			paginator: null
		}

		//Variables
		this.pageSize = 9;

		// Methods
		this.searchMascotas        = this.searchMascotas.bind(this);
		this.successSearchMascotas = this.successSearchMascotas.bind(this);
		this.addMascota            = this.addMascota.bind(this);
		this.onAddMascota          = this.onAddMascota.bind(this);
		this.successAddMascota     = this.successAddMascota.bind(this);
		this.successUploadPhotos   = this.successUploadPhotos.bind(this);

		// References
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
				<MascotaCard loading={true} />
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
				<AddMascotaForm
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
							<MascotaCard mascota={mascota} />
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
