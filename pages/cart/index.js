/**
	* Creado por Wilfer Daniel Ciro Maya - 2021
**/

// React Components
import React          from 'react';

// NextJS libraries
import Image from 'next/image'

// Custom classes
import BasePanel      from '@/containers/BasePanel';

// Ant components and icons
import {
	Row,
	Col,
	Card,
	Button,
	Divider,
	Table
} from 'antd';

class CartView extends BasePanel{
	constructor(props) {
		super(props);

		// Props

		// States

		// Methods
		this.goPay = this.goPay.bind(this);
		// References
	}

	componentDidMount() {
		this.setBreadCrumb([{"label" : "Carrito de compras"}])
	}

	goPay() {
		// TODO: validations
		this.redirectPage(this.constants.route_pay);
	}

	render() {
		const getMyHTML = (text) => <Image
			src={"http://127.0.0.1:8000/media/av/1627174875/WhatsApp_Image_2021-07-17_at_4.14.28_PM.webp"}
			alt="HOLA MUNDO"
			layout="responsive"
			width="150"
			height="150"
			/>

		const dataSource = [
			{
			key: '1',
			name: 'Mike',
			age: 32,
			address: '10 Downing Street',
			},
			{
			key: '2',
			name: 'John',
			age: 42,
			address: '10 Downing Street',
			},
		];

		const columns = [
			{
				title: 'Foto',
				dataIndex: 'name',
				key: 'name',
				render: getMyHTML,
			},
			{
				title: 'Producto',
				dataIndex: 'name',
				key: 'name',
			},
			{
				title: 'Precio',
				dataIndex: 'age',
				key: 'age',
			},
			{
				title: 'Cantidad',
				dataIndex: 'age',
				key: 'age',
			},
			{
				title: 'Total',
				dataIndex: 'age',
				key: 'age',
			},
			{
				title: '',
				dataIndex: 'age',
				key: 'age',
			},
		];

		return (
			<div>
				<Row gutter={[40, 16]}>
					<Col span={16}>
						<Table dataSource={dataSource} columns={columns} />
					</Col>
					<Col span={8}>
						<Card title="Resumen de orden">
							<b>Subtotal: </b> $30.000<br />
							<b>Envío: </b> $5.000<br />
							<h2><b>Total: </b> $35.000<br /></h2>
						</Card>
						<Divider />
						<Button type="primary" block onClick={this.goPay}>
							Pagar
						</Button>
					</Col>
				</Row>
			</div>
		);
	}
}

CartView.getInitialProps = async ({query}) => {
	return {query};
}
CartView.getPageName = () => {
	return "Carrito de compras";
}
export default CartView;
