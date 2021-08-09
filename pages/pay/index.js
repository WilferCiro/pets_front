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
import DiscountAlert   from '@/components/DiscountAlert';

// Ant components and icons
import {
	Col,
	Row,
	Steps,
	Button,
	Card,
	Divider,
	message,
	Alert
} from 'antd';
import {
	CreditCardOutlined,
	EditFilled
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
		this.nextPage      = this.nextPage.bind(this);
		this.prevPage      = this.prevPage.bind(this);
		this.searchUser    = this.searchUser.bind(this);
		this.searchCart    = this.searchCart.bind(this);
		this.pagar         = this.pagar.bind(this);
		this.initialGET    = this.initialGET.bind(this);
		this.applyDiscount = this.applyDiscount.bind(this);

		// References
		this.refTotalLabel            = React.createRef();
		this.refSubTotalLabel         = React.createRef();
		this.refDescuentosLabel       = React.createRef();
		this.refDescuentosPuntosLabel = React.createRef();
		this.refEnvioLabel            = React.createRef();
		this.refDataUserForm          = React.createRef();
		this.refPayModal              = React.createRef();
		this.refDiscountAlert         = React.createRef();

		// Variables
		this.productos = [];
		this.discountPointPercent = 0;
	}

	componentDidMount() {
		this.setBreadCrumb([{"label" : "Carrito de compras", "route" : this.constants.route_cart}, {"label" : "Pago de pedido"}])

		let dataCart = this.store.getCart();
		if (dataCart === null || dataCart === undefined || dataCart.length === 0) {
			this.redirectPage(this.constants.route_cart);
		}
		else{
			this.initialGET();
		}
	}

	async initialGET() {
		let data = await BasePanel.service.apiSend({
			method: "GET",
			register: "pedido",
			model: "valor_envio"
		});
		if(data["success"]) {
			this.valorEnvio = data["data"]["valor"];
			await this.searchUser();
			await this.searchCart();
		}
		else{
			message.error("Hubo un error al consultar los datos, por favor intente de nuevo más tarde");
		}
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

			if(this.props.query["points"] && data["data"]["puntos_porcentaje"] > 0){
				this.discountPointPercent = data["data"]["puntos_porcentaje"];
			}
			else if(data["data"]["puntos_porcentaje"] > 0) {
				this.refDiscountAlert.current.setDiscount(data["data"]["puntos_porcentaje"]);
			}

		}
		else{
			message.error("Hubo un erro al cargar los datos del usuario");
		}
	}

	async searchCart() {
		this.dataService = await this.getDataCart();
		this.formatCart();
	}

	applyDiscount(percent) {
		this.discountPointPercent = percent;
		this.formatCart();
	}

	formatCart() {
		let dataCart = this.store.getCart();
		let data = [];
		this.productos = [];
		let subTotal = 0;
		let descuentos = 0;
		let valorEnvio = this.valorEnvio;
		for (let index in dataCart){
			for(let index2 in this.dataService) {

				let aditional = "";
				let cartCodeArray = [];
				let error = false;

				if(dataCart[index]["code"]){
					let opciones = this.dataService[index2]["opciones"];

					let newCode = "";
					let cartCode = dataCart[index]["code"].split(",");

					let seleccion_mascota = this.dataService[index2]["seleccion_mascota"];

					if ((dataCart[index]["user_pk"] === this.store.getUserPK() && seleccion_mascota) || !seleccion_mascota) {
						for (let i in cartCode){
							if (cartCode[i]) {
								cartCodeArray.push(cartCode[i])
							}
						}
						for(let i in opciones) {
							let item = opciones[i]["tipo"] + ":" + opciones[i]["pk"];
							let inArray = cartCodeArray.indexOf(item);
							if(inArray > -1) {
								cartCodeArray.splice(inArray, 1);
								aditional +=  opciones[i]["tipo_nombre"] + ": " + opciones[i]["nombre"] + "<br />";
							}
						}
						if(cartCodeArray.length === 1) {
							if(cartCodeArray[0].includes("mascota:")) {
								aditional +=  "Mascota: " + cartCodeArray[0].split("_")[1];
							}
							cartCodeArray = [];
						}
					}
					else{
						error = true;
						this.updateCart({"pk" : dataCart[index]["pk"], "count" : 0, "code" : dataCart[index]["code"]});
						message.error("Un producto contenía referencia a una mascota de otro usuario, por ello no se cuenta en el pedido.")
					}
				}

				if(this.dataService[index2]["pk"] + "" === dataCart[index]["pk"] + "" && cartCodeArray.length === 0 && !error){
					subTotal += this.dataService[index2]["precio"] * dataCart[index]["count"];
					descuentos += (this.dataService[index2]["precio_original"] - this.dataService[index2]["precio"]) * dataCart[index]["count"];

					this.productos.push({
						"pk" : dataCart[index]["pk"],
						"cantidad" : dataCart[index]["count"],
						"nombre" : this.dataService[index2]["nombre"],
						"precio" : this.dataService[index2]["precio"],
						"adicional" : aditional
					})
				}
			}
		}
		let valorDescuentoPuntos = (subTotal * this.discountPointPercent / 100);
		subTotal = subTotal - valorDescuentoPuntos;

		if (subTotal === 0) {
			valorEnvio = 0;
			this.redirectPage(this.constants.route_cart);
		}
		this.refDescuentosPuntosLabel.current.setText(valorDescuentoPuntos.formatPrice());
		this.refDescuentosLabel.current.setText(descuentos.formatPrice());
		this.refSubTotalLabel.current.setText(subTotal.formatPrice());
		this.refEnvioLabel.current.setText(valorEnvio.formatPrice());
		this.refTotalLabel.current.setText((subTotal + valorEnvio).formatPrice());
	}

	prevPage(){
		this.setState({
			page: this.state.page - 1
		})
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
				"productos" : productos,
				"descontar_puntos" : this.discountPointPercent > 0 ? true : false
			}

			let data = await BasePanel.service.apiSend({
				method: "POST",
				register: "pedido",
				model: "crear",
				isPublic: false,
				body: body
			});
			if(data["success"]) {
				this.refPayModal.current.open();
				this.user.updateNroPedidos();
				this.finalBuy(data["data"]);
			}
			else{
				message.error("Hubo un erro al realizar el pedido");
			}
		}
	}

	render() {
		return (
			<div>
				<form id="form-pay"></form>
				<Row gutter={[40, 16]}>
					<Col xs={24} md={8}>
						<Card title="Resumen de orden">
							<Row>
								<Col span={15}>
									<b>Subtotal: </b>
								</Col>
								<Col span={9}>
									<p className="right-text"><Label ref={this.refSubTotalLabel} /></p>
								</Col>
								<Col span={15}>
									<b>Descuentos: </b>
								</Col>
								<Col span={9}>
									<p className="right-text"><Label ref={this.refDescuentosLabel} /></p>
								</Col>
								<Col span={15}>
									<b>Descuentos por puntos: </b>
								</Col>
								<Col span={9}>
									<p className="right-text"><Label ref={this.refDescuentosPuntosLabel} /></p>
								</Col>
								<Col span={15}>
									<b>Envío: </b>
								</Col>
								<Col span={9}>
									<p className="right-text"><Label ref={this.refEnvioLabel} /></p>
								</Col>
								<Col span={15}>
									<h2><b>Total: </b></h2>
								</Col>
								<Col span={9}>
									<h3 className="right-text"><Label ref={this.refTotalLabel} /></h3>
								</Col>
							</Row>
							<Divider />
							<Alert
								message="Esta es una compra segura"
								type="success"
								/>
						</Card>

					</Col>
					<Col xs={24} md={16}>

						<PayModal ref={this.refPayModal} />
						<DiscountAlert onApply={this.applyDiscount} ref={this.refDiscountAlert} />

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
											<Row>
												<Col xs={24} md={8}>
													<b>Nombre quien recibe: </b>
												</Col>
												<Col xs={24} md={16}>
													{this.state.dataUser.first_name} {this.state.dataUser.last_name}
												</Col>
												<Col xs={24} md={8}>
													<b>Ciudad: </b>
												</Col>
												<Col xs={24} md={16}>
													{this.state.dataUser.ciudad_name} - {this.state.dataUser.departamento_name}
												</Col>
												<Col xs={24} md={8}>
													<b>Dirección: </b>
												</Col>
												<Col xs={24} md={16}>
													{this.state.dataUser.direccion}
												</Col>
												<Col xs={24} md={8}>
													<b>información adicional: </b>
												</Col>
												<Col xs={24} md={16}>
													{this.state.dataUser.adicional ? this.state.dataUser.adicional : "No hay información adicional"}
												</Col>
											</Row>
											<Divider />
											<Button type="primary" onClick={this.prevPage} icon={<EditFilled />}>Editar datos</Button>
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



				</Row>

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
