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
		this.canEdit      = this.props.canEdit || false;
		this.mascota_pk   = this.props.mascota_pk;
		this.mascota_tipo = this.props.mascota_tipo;

		// States
		this.state = {
			vacunas : this.props.vacunas || []
		}

		// Methods
		this.successUpdateVacunas  = this.successUpdateVacunas.bind(this);
		this.openFormVacuna    = this.openFormVacuna.bind(this);
		this.onDeleteVacuna    = this.onDeleteVacuna.bind(this);
		this.onAddVacuna       = this.onAddVacuna.bind(this);

		// References
		this.refFormVacuna = React.createRef();

		// Variables
		this.columnsVacunas = [
			{
				title: 'Vacuna',
				dataIndex: 'vacuna_nombre'
			},
			{
				title: 'Fecha de aplicación',
				dataIndex: 'fecha_aplicacion',
				render: (text, record) => (
					<Space size="middle">
						{text ? text.formatDate() : ""}
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
		let preconditions = {
			"tipo__pk" : this.mascota_tipo
		}
		this.refFormVacuna.current.open("Agregar vacuna", null, preconditions);
	}

	async onDeleteVacuna(pk) {
		let body = {
			"pk" : pk
		}

		let data = await BasePanel.service.apiSend({
			method: "DELETE",
			register: "vacuna",
			model: "eliminar",
			body: body,
			isPublic: false
		});

		this.successUpdateVacunas(data);

	}
	async onAddVacuna() {
		let values = this.refFormVacuna.current.getValues();
		let body = {
			"vacuna" : values["vacuna"],
			"mascota" : this.mascota_pk,
			"fecha_aplicacion" : values["fecha_aplicacion"].format("YYYY-MM-DD")
		}

		let data = await BasePanel.service.apiSend({
			method: "POST",
			register: "vacuna",
			model: "crear",
			body: body,
			isPublic: false
		});

		this.successUpdateVacunas(data);
	}
	async successUpdateVacunas(data) {
		if(data["code"] === 200) {
			message.success("Operación realizada con éxito");
			this.refFormVacuna.current.clearValues();
			let body = {
				"campos" : {
					"mascota" : this.mascota_pk,
				}
			}
			let dataGet = await BasePanel.service.apiSend({
				method: "GET",
				register: "vacuna",
				model: "todo",
				body: body,
				isPublic: false
			});

			if(dataGet["code"] === 200) {
				this.setState({
					vacunas : dataGet["data"]
				})
			}
		}
		else{
			message.error("Error al agregar la vacuna");
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
