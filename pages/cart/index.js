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
	Space
} from 'antd';

class CartView extends BasePanel{
	constructor(props) {
		super(props);

		// Props

		// States

		// Methods
		this.goPay         = this.goPay.bind(this);
		this.update        = this.update.bind(this);
		this.searchCart    = this.searchCart.bind(this);
		this.formatCart    = this.formatCart.bind(this);
		this.applyDiscount = this.applyDiscount.bind(this);
		this.searchUser    = this.searchUser.bind(this);

		// References
		this.refTable                 = React.createRef();
		this.refTotalLabel            = React.createRef();
		this.refSubTotalLabel         = React.createRef();
		this.refDescuentosLabel       = React.createRef();
		this.refDescuentosPuntosLabel = React.createRef();
		this.refEnvioLabel            = React.createRef();
		this.refButtonPay             = React.createRef();
		this.refDiscountAlert         = React.createRef();

		// variables
		this.dataService          = [];
		this.discountPointPercent = 0;
	}

	componentDidMount() {
		this.setBreadCrumb([{"label" : "Carrito de compras"}]);

		if(this.props.isLogged){
			this.searchUser();
		}
		this.searchCart();
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
			if(data["data"]["puntos_porcentaje"] > 0){
				//this.discountPointPercent = data["puntos_porcentaje"];
				this.refDiscountAlert.current.setDiscount(data["data"]["puntos_porcentaje"]);
			}
		}
	}

	async searchCart() {
		this.refTable.current.setCart(null);

		let data = await BasePanel.service.apiSend({
			method: "GET",
			register: "pedido",
			model: "valor_envio"
		});
		if(data["success"]) {
			this.valorEnvio = data["data"]["valor"];
			this.dataService = await this.getDataCart();
			this.formatCart();
		}
		else{
			message.error("Hubo un error al consultar los datos, por favor intente de nuevo más tarde");
		}
	}

	formatCart() {
		let dataCart = this.store.getCart();
		let data = [];
		let subTotal = 0;
		let descuentos = 0;
		let valorEnvio = this.valorEnvio;
		for (let index in dataCart){
			for(let index2 in this.dataService) {
				let aditional = "";
				let cartCodeArray = [];

				if(dataCart[index]["code"]){
					let opciones = this.dataService[index2]["opciones"];
					let newCode = "";

					let cartCode = dataCart[index]["code"].split(",");
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
							aditional +=  "<br />" + opciones[i]["tipo_nombre"] + ": " + opciones[i]["nombre"];
						}
					}
					if(cartCodeArray.length === 1) {
						if(cartCodeArray[0].includes("mascota:")) {
							aditional +=  "<br />" + "Mascota: " + cartCodeArray[0].split("_")[1];
						}
						cartCodeArray = [];
					}
				}

				if(this.dataService[index2]["pk"] + "" === dataCart[index]["pk"] + "" && cartCodeArray.length === 0){
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
					subTotal += this.dataService[index2]["precio"] * dataCart[index]["count"];
					descuentos += (this.dataService[index2]["precio_original"] - this.dataService[index2]["precio"]) * dataCart[index]["count"];
				}
			}
		}

		let valorDescuentoPuntos = (subTotal * this.discountPointPercent / 100);
		subTotal = subTotal - valorDescuentoPuntos;
		if (dataCart.length === 0) {
			valorEnvio = 0;
			this.refButtonPay.current.setDisabled(true);
		}
		else{
			this.refButtonPay.current.setDisabled(false);
		}
		this.refDescuentosLabel.current.setText(descuentos.formatPrice());
		this.refDescuentosPuntosLabel.current.setText(valorDescuentoPuntos.formatPrice());
		this.refSubTotalLabel.current.setText(subTotal.formatPrice());
		this.refEnvioLabel.current.setText(valorEnvio.formatPrice());
		this.refTotalLabel.current.setText((subTotal + valorEnvio).formatPrice());
		this.refTable.current.setCart(data);
	}

	goPay() {
		// TODO: validations
		if(!this.props.isLogged){
			let properties = {"from_cart" : true}
			this.redirectPage(this.constants.route_login, properties);
		}
		else{
			let valid = this.refTable.current.validate();
			if(valid) {
				let properties = {}
				if (this.discountPointPercent > 0) {
					properties["points"] = true;
				}
				this.redirectPage(this.constants.route_pay, properties);
			}
			else{
				message.error("Error en las existencias de los productos");
			}
		}
	}

	update() {
		//this.dataCart = BasePanel.store.getCart();
		this.formatCart();
	}

	applyDiscount(percent) {
		this.discountPointPercent = percent;
		this.formatCart();
	}

	render() {
		return (
			<div>
				<Row gutter={[40, 16]}>
					<Col xs={24} md={16}>

						<DiscountAlert onApply={this.applyDiscount} ref={this.refDiscountAlert} />

						<div style={{width: "100%", overflow: "auto"}}>
							<TableCart update={this.update} ref={this.refTable} />
						</div>

					</Col>
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
							<ButtonCustom onClick={this.goPay} text="Ir a pasarela de pago" ref={this.refButtonPay} disabled={true} />
							<Divider />
							<Alert
								message="Esta es una compra segura"
								type="success"
								/>
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
	return {query, isLogged};
}
CartView.getPageName = () => {
	return "Carrito de compras";
}
export default CartView;
