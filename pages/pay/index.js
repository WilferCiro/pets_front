/**
	* Creado por Wilfer Daniel Ciro Maya - 2021
**/

// React Components
import React          from 'react';

// NextJS libraries
import Image from 'next/image'

// Custom classes
import BasePanel      from '@/containers/BasePanel';
import ProductBase    from '@/components/ProductBase';
import ProductCard    from '@/components/ProductCard';
import PayEmailForm   from '@/formclasses/pay_email';
import PayDataForm    from '@/formclasses/pay_data';
import PayRegisterForm from '@/formclasses/pay_register';

// Ant components and icons
import {
	Col,
	Row,
	Steps,
	Button,
	Card,
	Divider
} from 'antd';

const { Step } = Steps;


class PayView extends ProductBase{
	constructor(props) {
		super(props);

		// Props
		this.isLogged = this.props.isLogged || false;

		// States
		this.state = {
			page : this.isLogged ? 1 : 0
		}

		// Methods
		this.nextPage = this.nextPage.bind(this);

		// References
	}

	componentDidMount() {
		this.setBreadCrumb([{"label" : "Carrito de compras", "route" : this.constants.route_cart}, {"label" : "Pago de pedido"}])
	}

	nextPage() {
		this.setState({
			page: this.state.page + 1
		})
	}

	render() {
		return (
			<div>
				<Row gutter={[40, 16]}>
					<Col xs={24} md={16}>
						<Steps current={this.state.page} responsive={true}>
							<Step title={"Correo electrónico"} />
							<Step title={"Datos de envío"} />
							<Step title={"Resúmen"} />
						</Steps>
						<div className="pay-card">
							<Card style={{display: this.state.page === 0 ? "block" : "none"}}>
								<PayEmailForm vertical={true} />
							</Card>

							<Card style={{display: this.state.page === 1 && this.isLogged ? "block" : "none"}}>
								<PayDataForm vertical={true} />
							</Card>
							<Card style={{display: this.state.page === 1 && !this.isLogged ? "block" : "none"}}>
								<PayRegisterForm vertical={true} />
								<p>* Al registrarse usted acepta nuestra <a href="">política de privacidad de datos</a></p>
							</Card>

							<Card style={{display: this.state.page === 2 ? "block" : "none"}}>
								<b>Correo electrónico: </b> w***@g**.com<br />
								<b>Nombre quien recibe: </b> w*** D*** C** M**<br />
								<b>Dirección: </b> Q*** - Q****, C***<br />
							</Card>

							<Divider />
							{
								this.state.page === 2 ?
								<Button type="primary" onClick={this.nextPage} block>Pagar</Button>
								:
								<Button type="primary" onClick={this.nextPage}>Siguiente</Button>
							}
						</div>
					</Col>


					<Col xs={24} md={8}>
						<Card title="Resumen de orden">
							<b>Subtotal: </b> $30.000<br />
							<b>Envío: </b> $5.000<br />
							<h2><b>Total: </b> $35.000<br /></h2>
						</Card>

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
