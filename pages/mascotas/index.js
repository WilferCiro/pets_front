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
		this.addMascota            = this.addMascota.bind(this);
		this.onAddMascota          = this.onAddMascota.bind(this);

		// References
		this.refFormAdd = React.createRef();
	}

	componentDidMount() {
		this.searchMascotas(1);
		this.setBreadCrumb([{"label" : "Mascotas"}])
	}

	async searchMascotas(page) {
		let body = {
			"cantidad" : this.pageSize,
			"pagina" : page,
			"ordenar_por" : "-pk"
		}

		let data = await BasePanel.service.apiSend({
			method: "GET",
			register: "mascota",
			model: "card",
			isPublic: false,
			body: body
		});

		if(data["code"] === 200) {
			this.setState({
				mascotas: data["data"],
				paginator: data["paginator"]
			});
		}

	}

	addMascota() {
		this.refFormAdd.current.open("Registrar nueva mascota");
	}

	async onAddMascota() {
		let formValues = this.refFormAdd.current.getValues();
		this.images = formValues["imagenes"]["fotos"];
		this.uploaded = 0;
		let body = {
			"nombre" : formValues["nombre"],
			"fecha_nacimiento" : formValues["fecha_nacimiento"],
			"tipo" : formValues["tipo"],
			"raza" : formValues["raza"],
			"visible" : formValues["visible"],
			"presentacion" : formValues["presentacion"]
		}

		let data = await BasePanel.service.apiSend({
			method: "POST",
			register: "mascota",
			model: "crear",
			isPublic: false,
			body: body
		});

		if(data["code"] === 200) {
			let pk = data["data"]["pk"];
			for (let index in this.images) {
				let body = {
					"modelo" : "crear",
					"foto" : this.images[index]["originFileObj"],
					"mascota" : pk
				}
				let dataImg = await BasePanel.service.apiSend({
					method: "POST",
					register: "filemascota",
					model: "crear",
					isPublic: false,
					body: body,
					formData: true
				});
			}
			message.success("La mascota ha sido registada con éxito");
			this.redirectPage(this.constants.route_profile_mascotas, {"pk" : pk});
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
