/**
	* Creado por Wilfer Daniel Ciro Maya - 2021
**/

// React Components
import React          from 'react';

// NextJS libraries
import Image from 'next/image'

// Custom classes
import BasePanel      from '@/containers/BasePanel';
import TableCart      from '@/tables/Cart';
import Label          from '@/components/Label';
import ButtonCustom   from '@/components/ButtonCustom';
import DiscountAlert  from '@/components/DiscountAlert';
import PayDataForm     from '@/formclasses/pay_data';
import PayModal        from '@/components/PayModal';

// Ant components and icons
import {
	Row,
	Col,
	Card,
	Button,
	Divider,
	Table,
	Popconfirm,
	message,
	Alert,
	Space,
	Result
} from 'antd';
import {
	CreditCardOutlined
} from '@ant-design/icons';

class CartView extends BasePanel{
	constructor(props) {
		super(props);

		// Props

		// States

		// Methods
		this.update           = this.update.bind(this);
		this.searchCart       = this.searchCart.bind(this);
		this.formatCart       = this.formatCart.bind(this);
		this.applyDiscount    = this.applyDiscount.bind(this);
		this.searchUser       = this.searchUser.bind(this);
		this.pagar            = this.pagar.bind(this);
		this.searchValorEnvio = this.searchValorEnvio.bind(this);
		this.onFormChange     = this.onFormChange.bind(this);

		// References
		this.refTable                 = React.createRef();
		this.refTotalLabel            = React.createRef();
		this.refSubTotalLabel         = React.createRef();
		this.refDescuentosLabel       = React.createRef();
		this.refDescuentosPuntosLabel = React.createRef();
		this.refEnvioLabel            = React.createRef();
		this.refButtonPay             = React.createRef();
		this.refDiscountAlert         = React.createRef();
		this.refDataUserForm          = React.createRef();
		this.refPayModal              = React.createRef();
		this.refCardUser              = React.createRef();

		// variables
		this.dataService          = [];
		this.discountPointPercent = 0;
		this.productos = [];
		this.dataValorEnvio = {};
		this.lastCity = null;
	}

	componentDidMount() {
		this.setBreadCrumb([{"label" : "Carrito de compras"}]);

		if(this.props.isLogged){
			this.searchUser();
		}
		else{
			this.openLogin({"from_cart" : true})
		}
	}

	componentDidUpdate() {
		if(this.props.isLogged){
			this.searchUser();
		}
		else{
			this.openLogin({"from_cart" : true})
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
			this.searchValorEnvio(data["data"]["ciudad"]);

			let preconditions = {
				ciudad: data["data"]["ciudad"]
			}
			this.refDataUserForm.current.setValues(data["data"], preconditions);

			if(data["data"]["puntos_porcentaje"] > 0){
				//this.discountPointPercent = data["puntos_porcentaje"];
				this.refDiscountAlert.current.setDiscount(data["data"]["puntos_porcentaje"]);
			}
		}
		else{
			message.error("Hubo un error al cargar los datos del usuario, por favor recargue");
		}
	}

	async searchValorEnvio(city) {
		this.lastCity = city;
		let data = await BasePanel.service.apiSend({
			method: "GET",
			register: "ciudad",
			model: "costo_envio",
			aditional: [city]
		});
		if(data["success"]) {
			this.dataValorEnvio = data["data"];
			if(this.dataService.length === 0) {
				this.searchCart();
			}
			else{
				this.formatCart();
			}
		}
		else{
			message.error("Hubo un error al consultar los datos, por favor intente de nuevo más tarde");
		}
	}

	async searchCart() {
		this.refTable.current.setCart(null);
		this.dataService = await this.getDataCart();
		this.formatCart();
	}

	formatCart() {
		let dataCart = this.store.getCart();
		let data = [];
		this.productos = [];
		let subTotal = 0;
		let descuentos = 0;
		let valorEnvio = 0;
		for (let index in dataCart){
			for(let index2 in this.dataService) {
				let aditional = "";
				let cartCodeArray = [];
				let error = false;

				if(dataCart[index]["code"] && dataCart[index]["code"] !== ""){
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
					data.push({
						"pk" : dataCart[index]["pk"],
						"count" : dataCart[index]["count"],
						"descripcion" : this.dataService[index2]["nombre"] + " " + aditional,
						"foto" : this.dataService[index2]["foto"].length > 0 ? this.dataService[index2]["foto"][0]["foto"] : null,
						"precio" : this.dataService[index2]["precio"],
						"promocion" : this.dataService[index2]["promocion"],
						"stock" : this.dataService[index2]["stock"],
						"code" : dataCart[index]["code"]
					});

					this.productos.push({
						"pk" : dataCart[index]["pk"],
						"cantidad" : dataCart[index]["count"],
						"nombre" : this.dataService[index2]["nombre"],
						"precio" : this.dataService[index2]["precio"],
						"adicional" : aditional
					})

					subTotal += this.dataService[index2]["precio"] * dataCart[index]["count"];
					descuentos += (this.dataService[index2]["precio_original"] - this.dataService[index2]["precio"]) * dataCart[index]["count"];
				}
			}
		}


		let valorDescuentoPuntos = (subTotal * this.discountPointPercent / 100);
		subTotal = subTotal - valorDescuentoPuntos;

		valorEnvio = subTotal >= this.dataValorEnvio["precio_para_gratis"] ? 0 : subTotal >= this.dataValorEnvio["precio_para_descuento"] ? this.dataValorEnvio["valor_descuento"] : this.dataValorEnvio["valor_envio"];

		if (subTotal === 0 || this.props.isLogged === false) {
			valorEnvio = 0;
			this.refButtonPay.current.setDisabled(true);
			this.refCardUser.current.classList.add("disabled-div");
		}
		else{
			this.refButtonPay.current.setDisabled(false);
			this.refCardUser.current.classList.remove("disabled-div");
		}

		this.refDescuentosLabel.current.setText(descuentos.formatPrice());
		this.refDescuentosPuntosLabel.current.setText(valorDescuentoPuntos.formatPrice());
		this.refSubTotalLabel.current.setText(subTotal.formatPrice());
		this.refEnvioLabel.current.setText(valorEnvio.formatPrice());
		this.refTotalLabel.current.setText((subTotal + valorEnvio).formatPrice());
		this.refTable.current.setCart(data);
	}

	update() {
		this.formatCart();
	}

	applyDiscount(percent) {
		this.discountPointPercent = percent;
		this.formatCart();
	}

	async pagar() {

		let productos = this.productos;

		let valid = await this.refDataUserForm.current.validate();
		if(!valid) {
			message.error("Por favor llene los datos de envío");
			return;
		}
		let dataForm = this.refDataUserForm.current.getValues();

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

	onFormChange() {
		let values = this.refDataUserForm.current.getValues();
		if (values["ciudad"] !== this.lastCity) {
			this.searchValorEnvio(values["ciudad"]);
		}
	}


	render() {

		if (this.props.isLogged === false) {
			return (
				<div>
					<Result
						title="Inicia sesión para continuar con el proceso de compra"
						extra={
							<Button type="primary" key="console" onClick={(e) => this.openLogin({"from_cart" : true})}>
								Iniciar sesión
							</Button>
						}
						/>
				</div>
			)
		}

		return (
			<div>
				<form id="form-pay"></form>
				<PayModal ref={this.refPayModal} />
				<div style={{width: "100%", overflow: "auto"}}>
					<TableCart update={this.update} ref={this.refTable} />
				</div>
				<Divider />
				<Row gutter={[40, 16]} >
					<Col xs={24} md={15}>

						<div ref={this.refCardUser}>
							<Card title="Datos de envío" style={{marginBottom: "5px"}}>
								<PayDataForm
									ref={this.refDataUserForm}
									onValuesChange={this.onFormChange}
									vertical={true}
									 />
							</Card>
							<DiscountAlert onApply={this.applyDiscount} ref={this.refDiscountAlert} />
						</div>

					</Col>
					<Col xs={24} md={9}>
						<Card title="Resumen de orden">
							<Row>
								<Col span={14}>
									<b>Subtotal: </b>
								</Col>
								<Col span={10}>
									<p className="right-text"><Label ref={this.refSubTotalLabel} /></p>
								</Col>
								<Col span={14}>
									<b>Descuentos: </b>
								</Col>
								<Col span={10}>
									<p className="right-text"><Label ref={this.refDescuentosLabel} /></p>
								</Col>
								<Col span={14}>
									<b>Descuentos puntos: </b>
								</Col>
								<Col span={10}>
									<p className="right-text"><Label ref={this.refDescuentosPuntosLabel} /></p>
								</Col>
								<Col span={14}>
									<b>Envío: </b>
								</Col>
								<Col span={10}>
									<p className="right-text"><Label ref={this.refEnvioLabel} /></p>
								</Col>
								<Col span={14}>
									<h2><b>Total: </b></h2>
								</Col>
								<Col span={10}>
									<h3 className="right-text"><Label ref={this.refTotalLabel} /></h3>
								</Col>
							</Row>
							<ButtonCustom type="primary" block size="large" onClick={this.pagar} text="Ir a pasarela de pago de payU" ref={this.refButtonPay} disabled={true} icon={<CreditCardOutlined />} />
							<Divider />
							<Alert style={{marginBottom: "5px"}} type="success" message="El costo del envío se calcula según la ciudad de destino" />
							<Image alt="Métodos de pago" width={430} height={80} layout={"responsive"} src={this.constants.img_medios_pago} />
						</Card>
					</Col>
				</Row>
			</div>
		);
	}
}

CartView.getInitialProps = async ({query, req, pathname}) => {
	//let dataCart = BasePanel.store.getCart({query, req, pathname});
	let isLogged = BasePanel.store.isLogged({query, req, pathname});

	query["head"] = {
		"title" : "Carrito de compras"
	}

	return {query, isLogged};
}
CartView.getPageName = () => {
	return "Carrito de compras";
}
export default CartView;
