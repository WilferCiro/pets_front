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
		this.pageSize = 12;

		// Methods
		this.searchMascotas        = this.searchMascotas.bind(this);
		this.addMascota            = this.addMascota.bind(this);
		this.onAddMascota          = this.onAddMascota.bind(this);

		// References
		this.refFormAdd = React.createRef();
	}

	componentDidMount() {
		this.searchMascotas(1);
		this.setBreadCrumb([{"label" : "Mascotas"}]);

		if (this.props.query.add === "true") {
			if(this.refFormAdd.current) {
				this.addMascota();
			}
		}
	}

	async searchMascotas(page) {
		let body = {
			"page" : page
		}

		let data = await BasePanel.service.apiSend({
			method: "GET",
			register: "mascota",
			model: "card",
			isPublic: false,
			body: body
		});
		if(data["success"]) {
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
			"fecha_nacimiento" : formValues["fecha_nacimiento"].format("YYYY-MM-DD"),
			"tipo" : formValues["tipo"],
			"raza" : formValues["raza"],
			"visible" : formValues["visible"],
			"presentacion" : formValues["presentacion"],
			"sexo" : formValues["sexo"]
		}

		let data = await BasePanel.service.apiSend({
			method: "POST",
			register: "mascota",
			model: "crear",
			isPublic: false,
			body: body
		});
		if(data["success"]) {
			let pk = data["data"]["pk"];

			this.user.addMascotaPk(pk);

			for (let index in this.images) {
				let body = {
					"foto" : this.images[index]["originFileObj"],
					"mascota" : pk
				}
				let dataImg = await BasePanel.service.apiSend({
					method: "POST",
					register: "mascota_foto",
					model: "crear",
					isPublic: false,
					body: body,
					formData: true
				});
			}
			message.success("La mascota ha sido registada con ??xito");
			this.redirectPage(this.constants.route_profile_mascotas, {"pk" : pk});
		}
	}

	render() {
		let formAdd = <AddMascotaForm
			modal={true}
			vertical={false}
			ref={this.refFormAdd}
			modalOnOk={this.onAddMascota}
			initialValues={{
				"visible" : true
			}}
			/>

		if (!this.state.mascotas) {
			return (
				<div>
					{formAdd}
					<MascotaCard loading={true} />
				</div>
			);
		}

		if(this.state.mascotas.length === 0) {
			return (
				<div>
					{formAdd}
					<Result
						icon={<InboxOutlined />}
						title="No has inscrito tus mascotas, inscr??belas totalmente gratis y obt??n su c??digo QR para su propio collar"
						extra={<Button type="primary" onClick={this.addMascota}>Registrar nueva</Button>}
					/>
				</div>
			);
		}

		return (
			<div>
				{formAdd}
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
							<div style={{marginTop: "5px"}}>
								<MascotaCard mascota={mascota} />
							</div>
						</List.Item>
						)}
					/>
			</div>
		);
	}
}

MascotasView.getInitialProps = async ({query}) => {
	return {query};
}
MascotasView.getPageName = () => {
	return "Mis mascotas";
}
export default MascotasView;
