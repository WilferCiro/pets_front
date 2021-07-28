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
import NumberSelector from '@/components/NumberSelector';
import ImageSlider    from '@/components/ImageSlider';

// Ant components and icons
import {
	Row,
	Col,
	Space,
	Button,
	Tag,
	Divider,
	Tabs,
	InputNumber,
	Input,
	Badge,
	Card,
	Result,
	Alert,
	Tooltip
} from 'antd';
import {
	MinusOutlined,
	PlusOutlined,
	FacebookFilled,
	InstagramFilled,
	TwitterSquareFilled,
	WhatsAppOutlined
} from '@ant-design/icons';

const { TabPane } = Tabs;

class PreviewView extends ProductBase{
	constructor(props) {
		super(props);

		// Props
		this.producto = this.props.producto;

		// States

		// Methods
		this.localUpdateCart = this.localUpdateCart.bind(this);

		// References
	}

	componentDidMount() {
		let dataBread = [];
		if(this.producto) {
			dataBread.push({
				"label" : this.producto["categorias"]["categoria1"]["nombre"],
				"route" : this.constants.route_tienda
			});
			dataBread.push({
				"label" : this.producto["categorias"]["categoria2"]["nombre"],
				"route" : this.constants.route_tienda
			});
			dataBread.push({
				"label" : this.producto["categorias"]["categoria3"]["nombre"],
				"route" : this.constants.route_tienda
			});
			this.setBreadCrumb(dataBread);
		}
	}

	localUpdateCart(nro) {
		let data = {
			count: nro,
			pk: this.props.productPK
		}

		this.updateCart(data);
	}

	render() {
		let producto = this.props.producto;

		if (!producto) {
			return (
				<Result
					status="warning"
					title="Este producto no existe."
					extra={
						<Button type="primary" key="console" onClick={(e) => this.redirectPage(this.constants.route_tienda)}>
							Volver a la tienda
						</Button>
					}
				>
				</Result>
			)
		}

		return (
			<div>
				<Row gutter={[40, 1]} align="middle">
					<Col xs={24} md={11}>
						{
							(producto.promocion) ?
							<Badge.Ribbon color="green" text={producto.promocion + "% dcto"}>
								<ImageSlider fotos={producto["fotos"]} videos={producto["videos"]} />
							</Badge.Ribbon>
							:
							<ImageSlider fotos={producto["fotos"]} videos={producto["videos"]} />
						}

					</Col>
					<Col xs={24} md={12}>
						<h2>{producto.nombre}</h2>
						<Space align="center" size="large">
							<Tag color="purple">{producto.marca}</Tag>
							<Space align="center">
								{
									(producto.promocion) ?
										<p className="discount-price">{producto.precio_original.formatPrice()}</p>
									:
										null
								}
								<p className="real-price">{producto.precio.formatPrice()}</p>
							</Space>
						</Space>
						<br />
						<p>{producto.descripcion}</p>

						<div className="preview-number-selector">
							{
								producto.stock === 0 ?
								<Alert message="Producto agotado" type="info" />
								:
								<NumberSelector onUpdate={this.localUpdateCart} defaultValue={this.props.nroCart || 0} />
							}
						</div>
						<Divider />
						<Space align="center" size="large">
							<p>SKU: </p>
							<p>{producto.sku}</p>
						</Space><br />
						<Space align="center" size="large">
							<p>Código: </p>
							<p>{producto.codigo}</p>
						</Space>
						<Divider />
						<Row>
							<Col span={16}>
								Compartir
							</Col>
							<Col span={8}>
								<Tooltip title="Compartir en facebook">
									<Button type="primary" shape="circle" icon={<FacebookFilled />} />
								</Tooltip>
								<Tooltip title="Compartir en instagram">
									<Button type="primary" shape="circle" icon={<InstagramFilled />} />
								</Tooltip>
								<Tooltip title="Compartir en twitter">
									<Button type="primary" shape="circle" icon={<TwitterSquareFilled />} />
								</Tooltip>
								<Tooltip title="Compartir en whatsapp">
									<Button type="primary" shape="circle" icon={<WhatsAppOutlined />} />
								</Tooltip>
							</Col>
						</Row>
					</Col>
				</Row>

				<Tabs style={{marginTop: "40px"}} defaultActiveKey="1">
					<TabPane tab="Descripción" key="1">
						<p>{producto.especificaciones}</p>
						{
							(producto.materiales && producto.materiales.length > 0) ?
								<p>
									<span style={{ marginRight: 8 }}>Materiales:</span>
									{
										producto.materiales.map((item, index) => {
											return <Tag key={Math.random()}>{item.nombre}</Tag>
										})
									}
								</p>
							:
							null
						}
					</TabPane>

					{
						(producto.documentos && producto.documentos.length > 0) ?
							<TabPane tab="Documentos" key="2">
								<span style={{ marginRight: 8 }}>Documentos:</span>
								{
									producto.documentos.map((item, index) => {
										return <Tag key={Math.random()}>{item.url}</Tag>
									})
								}
							</TabPane>
						:
						null
					}


				</Tabs>

				<Card style={{marginTop: "40px"}} title="Productos relacionados">
					<Row gutter={[5, 5]}>
						<Col xs={24} md={6}>
							<ProductCard />
						</Col>
						<Col xs={24} md={6}>
							<ProductCard />
						</Col>
						<Col xs={24} md={6}>
							<ProductCard />
						</Col>
						<Col xs={24} md={6}>
							<ProductCard />
						</Col>
					</Row>
				</Card>
			</div>
		);
	}
}
PreviewView.getInitialProps = async ({query, req, pathname}) => {
	let productPK = query.pk;
	let nroCart = BasePanel.store.getNumCart({query, req, pathname}, productPK);

	let producto = {};
	let [_productos] = await Promise.all([
		BasePanel.service.apiSend({
			method: "GET",
			register: "producto",
			model: "todo",
			showLoad: false,
			body: {
				"campos" : {
					"pk" : productPK
				}
			}
		})
	]);
	if(_productos["code"] === 200) {
		producto = _productos["data"][0];
	}
	console.log(producto)
	return {query, nroCart, productPK, producto};
}
PreviewView.getPageName = () => {
	return "Producto";
}
export default PreviewView;
