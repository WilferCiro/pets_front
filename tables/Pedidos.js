/**
	* Creado por Wilfer Daniel Ciro Maya - 2021
**/

// React Components
import React          from 'react';

// Custom classes
import BasePanel           from '@/containers/BasePanel';

// Ant components and icons
import {
	Table,
	Space,
	Tooltip,
	Button,
	message,
	Skeleton,
	Progress
} from 'antd';

import {
	FilePdfFilled,
	EditFilled,
	EyeFilled
} from '@ant-design/icons';

class TablePedidos extends BasePanel{
	constructor(props) {
		super(props);

		// Props
		this.isAdmin = this.props.isAdmin || false;
		this.searchPedidos = this.props.searchPedidos;

		// States
		this.state = {
			pedidos : null,
			paginator: []
		}

		// Methods
		this.setPedidos = this.setPedidos.bind(this);

		// References

		// Variables
		this.columnsPedidos = [
			{
				title: 'Referencia',
				dataIndex: 'referencia'
			},
			{
				title: 'Estado',
				dataIndex: 'estado',
				render: (text, record) => (
					<Space size="middle">
						<Progress type="circle" percent={parseInt(text) * 100 / 5} width={30} />
						<label>{record["estado_nombre"]}</label>
					</Space>
				),
			},
			{
				title: 'Fecha de creación',
				dataIndex: 'fecha_creacion',
				render: (text, record) => (
					<Space size="middle">
						{text ? text.formatDate() : ""}
					</Space>
				),
			},
			{
				title: 'Usuario',
				dataIndex: 'fecha_creacion',
				render: (text, record) => (
					<label>
						{record["first_name"]} {record["last_name"]}
					</label>
				),
			},
			{
				title: 'Total',
				dataIndex: 'total',
				render: (text, record) => (
					<label>
						{record["total"].formatPrice()}
					</label>
				),
			},
		];

		if(this.isAdmin) {
			this.columnsPedidos.push({
				title: 'Acciones',
				render: (text, record) => (
					<Space>
						<Tooltip title="Generar guía de envío">
							<Button shape="circle" icon={<FilePdfFilled />} onClick={(e) => this.props.generarGuiaEnvio(record["pk"], record["referencia"] + "_" + record["first_name"] + ".pdf")}></Button>
						</Tooltip>
						<Tooltip title="Editar datos del pedido">
							<Button shape="circle" icon={<EditFilled />} onClick={(e) => this.props.editarDatosPedido(record)}></Button>
						</Tooltip>
						<Tooltip title="Ver datos del pedido">
							<Button shape="circle" type="primary" icon={<EyeFilled />} onClick={(e) => this.props.verDatosPedido(record["pk"])}></Button>
						</Tooltip>
					</Space>
				),
			});
		}

	}

	setPedidos(pedidos, paginator) {
		this.setState({
			pedidos: pedidos,
			paginator: paginator
		})
	}

	render() {
		if(this.state.pedidos === null) {
			return <Skeleton />
		}
		if(this.state.pedidos.length === 0) {
			return <div>No hay resultados</div>
		}
		return (
			<div>
				{/*<MascotaVacunaForm
					modal={true}
					modalOnOk={this.onAddVacuna}
					ref={this.refFormVacuna}
				/>*/}

				<Table
					pagination={{
						onChange: page => {
							this.searchPedidos(page);
						},
						total: this.state.paginator.total,
						pageSize: 12,
						position: "both"
					}}
					dataSource={this.state.pedidos}
					columns={this.columnsPedidos}
					size="small"
					rowKey="pk" />

			</div>
		);
	}
}


export default TablePedidos;
