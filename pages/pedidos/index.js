/**
	* Creado por Wilfer Daniel Ciro Maya - 2021
**/

// React Components
import React          from 'react';

// Custom classes
import BasePanel      from '@/containers/BasePanel';
import TablePedidos   from '@/tables/Pedidos';
import ModalPedido    from '@/components/ModalPedido';
import EditPedidoForm from '@/formclasses/edit_pedido';

// Ant components and icons
import {
	Button,
	Result,
	message,
	Input,
	Row,
	Col,
	Divider,
	Select,
	Space
} from 'antd';
import { DownOutlined } from '@ant-design/icons';
const { Search } = Input;
const { Option } = Select;

// Third part
import moment from 'moment';

class PedidosView extends BasePanel{
	constructor(props) {
		super(props);

		// Props
		this.isAdmin = this.props.isAdmin;

		// States
		this.state = {
			pedidos: [],
			paginator: null
		}

		//Variables
		this.pageSize      = 12;
		this.ordenarEstado = null;
		this.query         = null;

		// Methods
		this.searchPedidos     = this.searchPedidos.bind(this);
		this.onEditPedidoFinal = this.onEditPedidoFinal.bind(this);
		this.handleChange      = this.handleChange.bind(this);
		this.onSearch          = this.onSearch.bind(this);
		/* Table */
		this.generarGuiaEnvio  = this.generarGuiaEnvio.bind(this);
		this.editarDatosPedido = this.editarDatosPedido.bind(this);
		this.verDatosPedido    = this.verDatosPedido.bind(this);


		// References
		this.refTablePedidos = React.createRef();
		this.refModalPedido  = React.createRef();
		this.refEditPedido   = React.createRef();
	}

	componentDidMount() {
		this.setBreadCrumb([{"label" : "Pedidos"}])

		this.searchPedidos(1);
	}

	async searchPedidos(page) {
		let body = {
			"page" : page,
		}
		if (this.query) {
			body["query"] = this.query;
		}
		if (this.ordenarEstado) {
			body["estado"] = this.ordenarEstado;
		}

		let data = await BasePanel.service.apiSend({
			method: "GET",
			register: "pedido",
			model: "lista",
			isPublic: false,
			body: body
		});
		console.log(data);
		if(data["success"]) {

			this.refTablePedidos.current.setPedidos(data["data"], data["paginator"])
		}
	}


	async generarGuiaEnvio(pk, name) {
		let data = await BasePanel.service.apiSend({
			method: "GET",
			register: "pedido",
			model: "guia",
			aditional: [pk],
			isPublic: false,
			download: name,
			showMessage: true
		});
		console.log(data);
	}

	editarDatosPedido(datos) {
		if(datos["fecha_llegada"]){
			datos["fecha_llegada"] = moment(datos["fecha_llegada"], "YYYY-MM-DD")
		}
		//this.refEditPedido.current.clearValues();
		this.refEditPedido.current.open("Editar pedido", null, null, datos, datos["pk"]);
	}
	async onEditPedidoFinal() {
		let formValues = this.refEditPedido.current.getValues();
		let pk = this.refEditPedido.current.getPk();
		let body = {
			"estado" : formValues["estado"],
			"url_guia" : formValues["url_guia"],
			"nro_guia" : formValues["nro_guia"],
			"fecha_llegada" : formValues["fecha_llegada"] ? formValues["fecha_llegada"].format("YYYY-MM-DD") : null,
			"cancelado" : formValues["cancelado"]
		}
		console.log(body, pk);
		let data = await BasePanel.service.apiSend({
			method: "PUT",
			register: "pedido",
			model: "modificar",
			body: body,
			aditional: [pk],
			isPublic: false,
			showMessage: true
		});
		console.log(data);
		if(data["success"]) {
			message.success("Datos modificados con éxito");
			this.searchPedidos(1);
		}
	}


	verDatosPedido(pk) {
		this.refModalPedido.current.open(pk);
	}

	handleChange(type) {
		this.ordenarEstado = type !== "todo" ? type : null;
		this.searchPedidos(1);
	}

	onSearch(value) {
		this.query = value !== "" ? value : null;
		this.searchPedidos(1);
	}

	render() {

		if (!this.isAdmin) {
			return (
				<Result
					status="403"
					title="403"
					subTitle="Tu no estás autorizado para ver esta página."
					extra={<Button type="primary" onClicki={(e) => this.redirectPage(this.constants.route_index)}>Ir al inicio</Button>}
				/>
			)
		}

		return (
			<div>
				<EditPedidoForm
					modal="true"
					ref={this.refEditPedido}
					modalOnOk={this.onEditPedidoFinal} />

				<ModalPedido ref={this.refModalPedido} />

				<Row>
					<Col span={8}>
						<Space>
							Estado:
							<Select defaultValue="todo" style={{ width: 120 }} onChange={this.handleChange}>
								<Option value="todo">Todo</Option>
								<Option value="1">En espera de aprobación de pago</Option>
								<Option value="2">En preparación / fabricación</Option>
								<Option value="3">Paquete despachado</Option>
								<Option value="4">Paquete en camino</Option>
								<Option value="5">Paquete entregado</Option>
							</Select>
						</Space>
					</Col>
					<Col span={8}>
						<Search
							placeholder="Buscar referencia ó nombre de usuario"
							onSearch={this.onSearch}
							allowClear
							enterButton />
					</Col>
				</Row>

				<Divider />

				<TablePedidos
					ref={this.refTablePedidos}
					isAdmin={this.isAdmin}
					generarGuiaEnvio={this.generarGuiaEnvio}
					editarDatosPedido={this.editarDatosPedido}
					verDatosPedido={this.verDatosPedido}
					searchPedidos={this.searchPedidos}
				/>
			</div>
		);
	}
}

PedidosView.getInitialProps = async ({query, req, pathname}) => {
	let isAdmin = BasePanel.store.isAdmin({query, req, pathname});
	return {query, isAdmin};
}
PedidosView.getPageName = () => {
	return "Pedidos";
}
export default PedidosView;
