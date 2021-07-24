/**
	* Creado por Wilfer Daniel Ciro Maya - 2021
**/

// React Components
import React          from 'react';

// Custom classes
import BasePanel           from '@/containers/BasePanel';
import MascotaVacunaForm   from '@/formclasses/mascota_vacuna';

// Ant components and icons
import {
	Table,
	Space,
	Popconfirm,
	Button,
	message
} from 'antd';

class TableMascotasVacunas extends BasePanel{
	constructor(props) {
		super(props);

		// Props
		this.canEdit    = this.props.canEdit || false;
		this.mascota_pk = this.props.mascota_pk;

		// States
		this.state = {
			vacunas : this.props.vacunas || []
		}

		// Methods
		this.successGetVacunas = this.successGetVacunas.bind(this);
		this.successAddVacuna  = this.successAddVacuna.bind(this);
		this.openFormVacuna    = this.openFormVacuna.bind(this);
		this.onDeleteVacuna    = this.onDeleteVacuna.bind(this);
		this.onAddVacuna       = this.onAddVacuna.bind(this);

		// References
		this.refFormVacuna = React.createRef();

		// Variables
		this.columnsVacunas = [
			{
				title: 'Vacuna',
				dataIndex: 'vacuna'
			},
			{
				title: 'Fecha de aplicación',
				dataIndex: 'fecha_aplicacion',
				render: (text, record) => (
					<Space size="middle">
						{text ? text.formatDateTime() : ""}
					</Space>
				),
			},
		];

		if(this.canEdit) {
			this.columnsVacunas.push({
				title: 'Acciones',
				render: (text, record) => (
					<Space size="middle">
						<Popconfirm
							title="¿Está seguro que desea eliminar esta vacuna?"
							onConfirm={(e) => this.onDeleteVacuna(record["pk"])}
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

	openFormVacuna() {
		this.refFormVacuna.current.open("Agregar vacuna");
	}

	onDeleteVacuna(pk) {
		let body = {
			"pk" : pk
		}
		this.send({
			endpoint: this.constants.getPrivateEndpoint() + "vacuna",
			method: 'DELETE',
			success: this.successAddVacuna,
			body: body,
			showMessage : true,
			requires_token: true
		});
	}
	onAddVacuna() {
		let values = this.refFormVacuna.current.getValues();
		let body = {
			"modelo" : "crear",
			"vacuna" : values["vacuna"],
			"mascota" : this.mascota_pk,
			"fecha_aplicacion" : values["fecha_aplicacion"]
		}
		this.send({
			endpoint: this.constants.getPrivateEndpoint() + "vacuna",
			method: 'POST',
			success: this.successAddVacuna,
			body: body,
			showMessage : true,
			requires_token: true
		});
	}
	successAddVacuna(data) {
		if(data["estado_p"] === 200) {
			message.success("Operación realizada con éxito");
			this.refFormVacuna.current.clearValues();
			let body = {
				"campos" : {
					"mascota" : this.mascota_pk,
				},
				"modelo" : "todo"
			}
			this.send({
				endpoint: this.constants.getPrivateEndpoint() + "vacuna",
				method: 'GET',
				success: this.successGetVacunas,
				body: body,
				showMessage : true,
				requires_token: true
			});
		}
		else{
			message.error("Error al agregar la vacuna");
		}
	}

	successGetVacunas(data) {
		if(data["estado_p"] === 200) {
			this.setState({
				vacunas : data["data"]
			})
		}
	}


	render() {
		return (
			<div>
				{
					this.canEdit ?
						<div>
							<MascotaVacunaForm
								modal={true}
								modalOnOk={this.onAddVacuna}
								ref={this.refFormVacuna}
							/>
							<Button type="primary" style={{ marginBottom: 10 }} onClick={this.openFormVacuna}>Agregar vacuna</Button>
						</div>
					:
						null
				}
				<Table dataSource={this.state.vacunas} columns={this.columnsVacunas} size="small" rowKey="pk" />

			</div>
		);
	}
}


export default TableMascotasVacunas;
