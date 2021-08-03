/**
	* Creado por Wilfer Daniel Ciro Maya - 2021
**/

// React Components
import React          from 'react';

// NextJS libraries
import Image from 'next/image'

// Custom classes
import BasePanel       from '@/containers/BasePanel';
import ProductCard     from '@/components/ProductCard';
import PayDataForm     from '@/formclasses/pay_data';
import Label           from '@/components/Label';
import PayModal        from '@/components/PayModal';

// Ant components and icons
import {
	Col,
	Row,
	Steps,
	Button,
	Card,
	Divider,
	message
} from 'antd';
import {
	CreditCardOutlined
} from '@ant-design/icons';


const { Step } = Steps;


class PayView extends BasePanel{
	constructor(props) {
		super(props);

		// Props
		this.isLogged = this.props.isLogged || false;

		// States
		this.state = {
			page : 0,
			dataUser: null
		}

		// Methods
		this.nextPage   = this.nextPage.bind(this);
		this.searchUser = this.searchUser.bind(this);
		this.searchCart = this.searchCart.bind(this);
		this.pagar      = this.pagar.bind(this);

		// References
		this.refTotalLabel      = React.createRef();
		this.refSubTotalLabel   = React.createRef();
		this.refDescuentosLabel = React.createRef();
		this.refEnvioLabel      = React.createRef();
		this.refDataUserForm    = React.createRef();
		this.refPayModal        = React.createRef();

		// Variables
		this.productos = [];
	}

	componentDidMount() {
		this.setBreadCrumb([{"label" : "Carrito de compras", "route" : this.constants.route_cart}, {"label" : "Pago de pedido"}])

		this.searchCart();
		this.searchUser();
	}

	async searchUser() {
		let body = {};
		let data = await BasePanel.service.apiSend({
			method: "GET",
			register: "user",
			model: "datos_pago",
			isPublic: false,
			body: body
		});
		if(data["success"]) {
			let preconditions = {
				"departamento" : data["data"]["departamento"]
			}
			this.refDataUserForm.current.setValues(data["data"], preconditions);
		}
		else{
			message.error("Hubo un erro al cargar los datos del usuario");
		}
	}

	async searchCart() {
		this.dataService = await this.getDataCart();
		this.formatCart();
	}

	formatCart() {
		let dataCart = this.store.getCart();
		let data = [];
		this.productos = [];
		let subTotal = 0;
		let descuentos = 0;
		for (let index in dataCart){
			for(let index2 in this.dataService) {
				if(this.dataService[index2]["pk"] + "" === dataCart[index]["pk"] + ""){
					subTotal += this.dataService[index2]["precio"] * dataCart[index]["count"];
					descuentos += (this.dataService[index2]["precio_original"] - this.dataService[index2]["precio"]) * dataCart[index]["count"];

					this.productos.push({
						"pk" : dataCart[index]["pk"],
						"cantidad" : dataCart[index]["count"],
						"nombre" : this.dataService[index2]["nombre"],
						"precio" : this.dataService[index2]["precio"]
					})
				}
			}
		}

		this.refDescuentosLabel.current.setText(descuentos.formatPrice());
		this.refSubTotalLabel.current.setText(subTotal.formatPrice());
		this.refEnvioLabel.current.setText(this.valorEnvio.formatPrice());
		this.refTotalLabel.current.setText((subTotal + this.valorEnvio).formatPrice());
	}

	async nextPage() {
		if(this.state.page === 0) {
			let valid = await this.refDataUserForm.current.validate();
			if(valid) {
				let values = this.refDataUserForm.current.getValues();

				let labelCiudad = this.refDataUserForm.current.getValueLabelSelect(values["ciudad"], "ciudad");
				let labelDepartamento = this.refDataUserForm.current.getValueLabelSelect(values["departamento"], "departamento");
				values["ciudad_name"] = labelCiudad;
				values["departamento_name"] = labelDepartamento;

				this.setState({
					page: this.state.page + 1,
					dataUser: values
				})
			}
		}
	}

	async pagar() {

		let productos = this.productos;
		let dataForm = this.state.dataUser;

		if(productos.length === 0) {
			message.error("No hay productos para comprar.");
		}
		else{

			let body = {
				"direccion" : dataForm["direccion"],
				"adicional" : dataForm["adicional"],
				"first_name" : dataForm["first_name"],
				"last_name" : dataForm["last_name"],
				"ciudad" : dataForm["ciudad"],
				"celular" : dataForm["celular1"],
				"productos" : productos
			}

			let data = await BasePanel.service.apiSend({
				method: "POST",
				register: "pedido",
				model: "crear",
				isPublic: false,
				body: body
			});
			console.log("---", data);
			if(data["success"]) {
				this.refPayModal.current.open();
				this.user.updateNroPedidos();
			}
			else{
				message.error("Hubo un erro al realizar el pedido");
			}
		}
	}

	render() {
		return (
			<div>
				<Row gutter={[40, 16]}>
					<Col xs={24} md={16}>
						<Steps current={this.state.page} responsive={true}>
							<Step title={"Datos de envío"} />
							<Step title={"Resúmen"} />
						</Steps>
						<div className="pay-card">

							<Card style={{display: this.state.page === 0 ? "block" : "none"}}>
								<PayDataForm
									ref={this.refDataUserForm}
									vertical={true}
									 />
							</Card>

							<Card style={{display: this.state.page === 1 ? "block" : "none"}}>
								{
									(this.state.dataUser) ?
										<div>
											<b>Nombre quien recibe: </b> {this.state.dataUser.first_name} {this.state.dataUser.last_name}<br />
											<b>Ciudad: </b> {this.state.dataUser.ciudad_name} - {this.state.dataUser.departamento_name}<br />
											<b>Dirección: </b> {this.state.dataUser.direccion}<br />
											<b>información adicional: </b> {this.state.dataUser.adicional ? this.state.dataUser.adicional : "No hay información adicional"}<br />
										</div>
									:
									null
								}
							</Card>

							<Divider />
							{
								this.state.page === 1 ?
								<Button type="primary" size={"large"} icon={<CreditCardOutlined />} onClick={this.pagar} block>Pagar</Button>
								:
								<Button type="primary" onClick={this.nextPage}>Siguiente</Button>
							}
						</div>
					</Col>


					<Col xs={24} md={8}>
						<Card title="Resumen de orden">
							<b>Subtotal: </b> <Label ref={this.refSubTotalLabel} /><br />
							<b>Descuentos: </b> <Label ref={this.refDescuentosLabel} /><br />
							<b>Envío: </b>  <Label ref={this.refEnvioLabel} /><br />
							<h2><b>Total: </b> <Label ref={this.refTotalLabel} /><br /></h2>
						</Card>

					</Col>

				</Row>

				<PayModal ref={this.refPayModal} />

			</div>
		);
	}
}
PayView.getInitialProps = async ({query, req, pathname}) => {
	let isLogged = BasePanel.store.isLogged({query, req, pathname});
	return {query, isLogged};
}
PayView.getPageName = () => {
	return "Pago de pedido";
}
export default PayView;
