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

// Ant components and icons
import {
	Row,
	Col,
	Card,
	Button,
	Divider,
	Table,
	Popconfirm,
	message
} from 'antd';

class CartView extends BasePanel{
	constructor(props) {
		super(props);

		// Props

		// States

		// Methods
		this.goPay      = this.goPay.bind(this);
		this.update     = this.update.bind(this);
		this.searchCart = this.searchCart.bind(this);
		this.formatCart = this.formatCart.bind(this);

		// References
		this.refTable           = React.createRef();
		this.refTotalLabel      = React.createRef();
		this.refSubTotalLabel   = React.createRef();
		this.refDescuentosLabel = React.createRef();
		this.refEnvioLabel      = React.createRef();
		this.refButtonPay       = React.createRef();

		// variables
		this.dataService = [];
	}

	componentDidMount() {
		this.setBreadCrumb([{"label" : "Carrito de compras"}]);

		this.searchCart();
	}

	async searchCart() {
		this.refTable.current.setCart(null);
		this.dataService = await this.getDataCart();
		this.formatCart();
	}

	formatCart() {
		let dataCart = this.store.getCart();
		let data = [];
		let subTotal = 0;
		let descuentos = 0;
		let valorEnvio = this.valorEnvio;
		for (let index in dataCart){
			for(let index2 in this.dataService) {
				if(this.dataService[index2]["pk"] + "" === dataCart[index]["pk"] + ""){
					data.push({
						"pk" : dataCart[index]["pk"],
						"count" : dataCart[index]["count"],
						"descripcion" : this.dataService[index2]["nombre"],
						"foto" : this.dataService[index2]["foto"].length > 0 ? this.dataService[index2]["foto"][0]["foto"] : null,
						"precio" : this.dataService[index2]["precio"],
						"promocion" : this.dataService[index2]["promocion"],
						"stock" : this.dataService[index2]["stock"],
					});
					subTotal += this.dataService[index2]["precio"] * dataCart[index]["count"];
					descuentos += (this.dataService[index2]["precio_original"] - this.dataService[index2]["precio"]) * dataCart[index]["count"];
				}
			}
		}

		if (dataCart.length === 0) {
			valorEnvio = 0;
			this.refButtonPay.current.setDisabled(true);
		}
		else{
			this.refButtonPay.current.setDisabled(false);
		}
		this.refDescuentosLabel.current.setText(descuentos.formatPrice());
		this.refSubTotalLabel.current.setText(subTotal.formatPrice());
		this.refEnvioLabel.current.setText(valorEnvio.formatPrice());
		this.refTotalLabel.current.setText((subTotal + valorEnvio).formatPrice());
		this.refTable.current.setCart(data);
	}

	goPay() {
		// TODO: validations
		if(!this.props.isLogged){
			this.redirectPage(this.constants.route_login, {"from_cart" : true});
		}
		else{
			let valid = this.refTable.current.validate();
			if(valid) {
				this.redirectPage(this.constants.route_pay);
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

	render() {
		return (
			<div>
				<Row gutter={[40, 16]}>
					<Col xs={24} md={16}>
						<div style={{width: "100%", overflow: "auto"}}>
							<TableCart update={this.update} ref={this.refTable} />
						</div>
					</Col>
					<Col xs={24} md={8}>
						<Card title="Resumen de orden">
							<b>Subtotal: </b> <Label ref={this.refSubTotalLabel} /><br />
							<b>Descuentos: </b> <Label ref={this.refDescuentosLabel} /><br />
							<b>Envío: </b>  <Label ref={this.refEnvioLabel} /><br />
							<h2><b>Total: </b> <Label ref={this.refTotalLabel} /><br /></h2>
							<ButtonCustom onClick={this.goPay} text="Ir a pasarela de pago" ref={this.refButtonPay} disabled={true} />
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
