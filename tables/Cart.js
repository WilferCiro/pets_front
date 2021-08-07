/**
	* Creado por Wilfer Daniel Ciro Maya - 2021
**/

// React Components
import React          from 'react';

// NextJS libraries
import Image from 'next/image'

// Custom classes
import BasePanel           from '@/containers/BasePanel';
import MascotaVacunaForm   from '@/formclasses/mascota_vacuna';
import NumberSelector      from '@/components/NumberSelector';

// Ant components and icons
import {
	Table,
	Space,
	Popconfirm,
	Button,
	Badge,
} from 'antd';
import {
	DeleteOutlined
} from '@ant-design/icons';

class TableCart extends BasePanel{
	constructor(props) {
		super(props);

		// Props
		this.update = this.props.update;

		// States
		this.state = {
			cart : this.props.cart || []
		}

		// Methods
		this.setCart        = this.setCart.bind(this);
		this.onDeleteCart   = this.onDeleteCart.bind(this);
		this.onUpdateCart   = this.onUpdateCart.bind(this);
		this.validate       = this.validate.bind(this);

		// References

		// Variables
		this.columnsCart = [
			{
				title: 'Foto',
				dataIndex: 'foto',
				render: (value, record) => (
					(record["promocion"]) ?
						<Badge.Ribbon color="green" text={record["promocion"] + "%"}>
							<Image width="200" height="200" layout="responsive" src={value ? value : this.constants.img_producto} alt="foto producto" />
						</Badge.Ribbon>
					:
					<Image width="200" height="200" layout="responsive" src={value ? value : this.constants.img_producto} alt="foto producto" />
				),
			},
			{
				title: 'Descripción',
				dataIndex: 'descripcion',
				render: (value, record) => (
					<span  dangerouslySetInnerHTML={{__html: value }} />
				),
			},
			{
				title: 'Precio',
				dataIndex: 'precio',
				render: (value, record) => (
					<span>{value.formatPrice()}</span>
				),
			},
			{
				title: 'Cantidad',
				dataIndex: 'count',
				render: (value, record) => (
					<div style={{width: "100px"}}><NumberSelector defaultValue={value} min={1} max={record["stock"]} onUpdate={this.onUpdateCart} parameterUpdate={record} /></div>
				),
			},
			{
				title: 'Total',
				dataIndex: 'total',
				render: (value, record) => (
					<span>{(record["precio"] * record["count"]).formatPrice()}</span>
				),
			},
			{
				title: '',
				dataIndex: 'code',
				render: (pk, record) => (
					<Popconfirm
						title="¿Está seguro de eliminar este producto?"
						okText="Si, eliminar"
						cancelText="No"
						onConfirm={(e) => this.onDeleteCart(record["pk"], record["code"])}
						>
							<Button type="danger" icon={<DeleteOutlined />}></Button>
					</Popconfirm>
				),

			},
		];

	}

	validate() {
		let cart = this.state.cart;
		let valid = true;
		for (let index in cart) {
			if (cart[index]["count"] > cart[index]["stock"]) {
				valid = false;
			}
		}
		return valid;
	}

	setCart(cart) {
		this.setState({
			cart: cart
		})
	}

	onDeleteCart(pk, code) {
		this.updateCart({"pk" : pk, "count" : 0, "code" : code});
		if(this.update) {
			this.update();
		}
	}

	onUpdateCart(value, data) {
		data["count"] = value;
		this.updateCart(data);
		if(this.update) {
			this.update();
		}
	}

	render() {
		if(this.state.cart === null) {
			return (
				<div>
					Cargando...
				</div>
			)
		}
		return (
			<div>
				<Table
					pagination={false}
					dataSource={this.state.cart}
					columns={this.columnsCart}
					size="small"
					rowKey="code" />
			</div>
		);
	}
}


export default TableCart;
