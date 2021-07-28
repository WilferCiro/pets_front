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

// Ant components and icons
import {
	Row,
	Col,
	Card,
	Button,
	Divider,
	Table,
	Popconfirm
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
		this.refTable         = React.createRef();
		this.refTotalLabel    = React.createRef();
		this.refSubTotalLabel = React.createRef();
		this.refEnvioLabel    = React.createRef();

		// variables
		this.dataService = [];
		this.valorEnvio = 10000;
	}

	componentDidMount() {
		this.setBreadCrumb([{"label" : "Carrito de compras"}]);

		this.searchCart();
	}

	searchCart() {
		this.refTable.current.setCart(null);


		let dataCart = this.store.getCart();
		this.dataService = [];

		for (let index in dataCart){
			this.dataService.push({
				"pk" : dataCart[index]["pk"],
				"descripcion" : "Producto " + index,
				"foto" : "Producto " + index,
				"precio" : 20000
			});
		}

		this.formatCart();

	}

	formatCart() {
		let dataCart = this.store.getCart();
		let data = [];
		let subTotal = 0;
		for (let index in dataCart){
			for(let index2 in this.dataService) {
				if(this.dataService[index2]["pk"] === dataCart[index]["pk"]){
					data.push({
						"pk" : dataCart[index]["pk"],
						"count" : dataCart[index]["count"],
						"descripcion" : this.dataService[index2]["descripcion"],
						"foto" : this.dataService[index2]["foto"],
						"precio" : this.dataService[index2]["precio"]
					});
					subTotal += this.dataService[index2]["precio"] * dataCart[index]["count"];
				}
			}
		}

		this.refSubTotalLabel.current.setText(subTotal.formatPrice());
		this.refEnvioLabel.current.setText(this.valorEnvio.formatPrice());
		this.refTotalLabel.current.setText((subTotal + this.valorEnvio).formatPrice());
		this.refTable.current.setCart(data);
	}

	goPay() {
		// TODO: validations
		this.redirectPage(this.constants.route_pay);
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
							<b>Envío: </b>  <Label ref={this.refEnvioLabel} /><br />
							<h2><b>Total: </b> <Label ref={this.refTotalLabel} /><br /></h2>
							<Button type="primary" block onClick={this.goPay}>
								Ir a pasarela de pago
							</Button>
						</Card>
					</Col>
				</Row>
			</div>
		);
	}
}

CartView.getInitialProps = async ({query, req, pathname}) => {
	//let dataCart = BasePanel.store.getCart({query, req, pathname});
	return {query};
}
CartView.getPageName = () => {
	return "Carrito de compras";
}
export default CartView;
