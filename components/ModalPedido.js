/**
	* Creado por Wilfer Daniel Ciro Maya - 2021
**/

// React Components
import React          from 'react';

// NextJS libraries
import Link from 'next/link'

// Custom classes
import BasePanel      from '@/containers/BasePanel';

// Ant components and icons
import {
	Modal,
	message,
	Timeline,
	Row,
	Col,
	Card,
	Avatar,
	Divider
} from 'antd';
import {
	HomeFilled,
	CarFilled
} from '@ant-design/icons';

const { Meta } = Card;

class ModalPedido extends BasePanel{
	constructor(props) {
		super(props);

		// States
		this.state = {
			open : false,
			data : null
		}

		// Methods
		this.open = this.open.bind(this);
		this.close = this.close.bind(this);
	}
	componentDidMount() {
	}

	close() {
		this.setState({
			open: false
		})
	}

	async open(pk) {

		let body = {
			"campos" : {
				"pk" : pk
			}
		}
		let data = await BasePanel.service.apiSend({
			method: "GET",
			register: "pedido",
			model: "todo",
			isPublic: false,
			body: body
		});
		console.log(data);
		if(data["code"] === 200) {
			this.setState({
				data: data["data"][0],
				open: true
			})
		}
		else{
			message.error("Error al cargar el pedido, vuelva a intentar");
		}
	}

	render() {
		let content;
		let data = this.state.data;

		if(data) {
			content = (
				<div>
					<Row gutter={[10, 10]} align="top">
						<Col xs={24} md={14}>
							<Card>
								<Meta
									avatar={<Avatar icon={<HomeFilled />} />}
									description={
										<div>
											{data["direccion"] + " - " + data["ciudad_nombre"]}<br />
											Recibe: {data["first_name"] + " " + data["last_name"]}<br />
											{data["celular"]}
										</div>
									}
									/>
							</Card>
							{
								(data["url_guia"] && data["nro_guia"]) ?
									<Card style={{marginTop: "10px"}}>
										<Meta
											avatar={<Avatar icon={<CarFilled />} />}
											title={"Número de guía: " + data["nro_guia"]}
											description={
												<div>
													<a target="blank" href={data["url_guia"]}>Ver en página de transportadora</a>
												</div>
											}
											/>
									</Card>
								:
								null
							}
							<Card style={{marginTop: "10px"}} title="Estado del envío">
								<Timeline>
									<Timeline.Item color={data["estado"] >= 1 ? "green" : "gray"}>
										En preparación
									</Timeline.Item>
									<Timeline.Item color={data["estado"] >= 2 ? "green" : "gray"}>
										Paquete despachado
									</Timeline.Item>
									<Timeline.Item color={data["estado"] >= 3 ? "green" : "gray"}>
										Paquete en camino
									</Timeline.Item>
									<Timeline.Item color={data["estado"] >= 4 ? "green" : "gray"}>
										Paquete entregado
									</Timeline.Item>
								</Timeline>
							</Card>
						</Col>
						<Col xs={24} md={10}>
							{
								(data["productos"]).map((producto, item) => {
									return (
										<div key={Math.random()}>
											<Card style={{marginBottom: "10px"}}>
												<Meta
													avatar={<Avatar src={producto["foto"]} />}
													title={<a onClick={(e) => this.redirectPage(this.constants.route_profile_producto, {pk: producto["pk"]})}>{producto["producto_nombre"]}</a>}
													description={
														<div>
															{producto["precio"].formatPrice()} x {producto["cantidad"]} unidad(es)
														</div>
													}
													/>
											</Card>
										</div>
									)
								})
							}
						</Col>
					</Row>
				</div>
			)
		}
		else{
			content = <div>Cargando</div>
		}

		return (
			<Modal width={800} footer={[]} centered title="Datos del pedido" visible={this.state.open} onOk={this.close} onCancel={this.close}>

				{content}

			</Modal>
		);
	}
}

export default ModalPedido;
