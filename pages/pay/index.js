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

// Ant components and icons
import {
	Row,
	Col
} from 'antd';
import {
	MinusOutlined,
	PlusOutlined
} from '@ant-design/icons';


class PayView extends ProductBase{
	constructor(props) {
		super(props);

		// Props

		// States

		// Methods

		// References
	}

	componentDidMount() {
		this.setBreadCrumb([{"label" : "Carrito de compras", "route" : this.constants.route_cart}, {"label" : "Pago de pedido"}])
	}

	render() {
		return (
			<div>

			</div>
		);
	}
}
PayView.getInitialProps = async ({query}) => {
	return {query};
}
PayView.getPageName = () => {
	return "Pago de pedido";
}
export default PayView;
