/**
	* Creado por Wilfer Daniel Ciro Maya - 2021
**/

// React Components
import React          from 'react';

// Custom classes
import BasePanel           from '@/containers/BasePanel';
import MascotaEnfermedadForm   from '@/formclasses/mascota_enfermedad';

// Ant components and icons
import {
	Table,
	Space,
	Popconfirm,
	Button,
	message
} from 'antd';

class TableMascotasEnfermedades extends BasePanel{
	constructor(props) {
		super(props);

		// Props
		this.canEdit      = this.props.canEdit || false;
		this.mascota_pk   = this.props.mascota_pk;
		this.mascota_tipo = this.props.mascota_tipo;

		// States
		this.state = {
			enfermedades : this.props.enfermedades || []
		}

		// Methods
		this.successUpdateEnfermedades  = this.successUpdateEnfermedades.bind(this);
		this.openFormEnfermedad    = this.openFormEnfermedad.bind(this);
		this.onDeleteEnfermedad    = this.onDeleteEnfermedad.bind(this);
		this.onAddEnfermedad       = this.onAddEnfermedad.bind(this);

		// References
		this.refFormEnfermedad = React.createRef();

		// Variables
		this.columnsEnfermedads = [
			{
				title: 'Enfermedad',
				dataIndex: 'enfermedad_nombre'
			},
			{
				title: 'Descripción',
				dataIndex: 'descripcion'
			},
		];

		if(this.canEdit) {
			this.columnsEnfermedads.push({
				title: 'Acciones',
				render: (text, record) => (
					<Space size="middle">
						<Popconfirm
							title="¿Está seguro que desea eliminar esta enfermedad?"
							onConfirm={(e) => this.onDeleteEnfermedad(record["pk"])}
							okText="Si"
							cancelText="No"
							>
							<a>Eliminar</a>
						</Popconfirm>
					</Space>
				),
			});
		}

	}

	openFormEnfermedad() {
		let preconditions = {
			"tipo" : this.mascota_tipo
		}
		this.refFormEnfermedad.current.open("Agregar enfermedad", null, preconditions);
	}

	async onDeleteEnfermedad(pk) {

		let data = await BasePanel.service.apiSend({
			method: "DELETE",
			register: "mascota_enfermedad",
			model: "eliminar",
			aditional: [pk],
			isPublic: false
		});
		this.successUpdateEnfermedades(data);

	}
	async onAddEnfermedad() {
		let values = this.refFormEnfermedad.current.getValues();
		let body = {
			"enfermedad" : values["enfermedad"],
			"mascota" : this.mascota_pk,
			"descripcion" : values["descripcion"]
		}
		let data = await BasePanel.service.apiSend({
			method: "POST",
			register: "mascota_enfermedad",
			model: "crear",
			body: body,
			isPublic: false
		});

		await this.successUpdateEnfermedades(data);

	}
	async successUpdateEnfermedades(data) {
		if(data["success"]) {
			message.success("Operación realizada con éxito");
			if(this.refFormEnfermedad.current) {
				this.refFormEnfermedad.current.clearValues();
			}
			let dataGet = await BasePanel.service.apiSend({
				method: "GET",
				register: "mascota_enfermedad",
				model: "todo",
				aditional: [this.mascota_pk],
				isPublic: false
			});

			if(dataGet["success"]) {
				this.setState({
					enfermedades : dataGet["data"]
				})
			}

		}
		else{
			message.warning("Revisa tus datos, esta enfermedad puede estar asignada actualmente");
		}
	}



	render() {
		return (
			<div>
				{
					this.canEdit ?
						<div>
							<MascotaEnfermedadForm
								modal={true}
								modalOnOk={this.onAddEnfermedad}
								ref={this.refFormEnfermedad}
							/>
							<Button type="primary" style={{ marginBottom: 10 }} onClick={this.openFormEnfermedad}>Agregar enfermedad</Button>
						</div>
					:
						null
				}
				<Table dataSource={this.state.enfermedades} columns={this.columnsEnfermedads} size="small" rowKey="pk" />

			</div>
		);
	}
}


export default TableMascotasEnfermedades;
