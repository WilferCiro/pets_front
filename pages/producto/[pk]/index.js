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
import Constant       from '@/components/Constant';
import ModalAvisame   from '@/components/ModalAvisame';
// React-shared
import {
	FacebookShareButton,
	FacebookIcon,
	TwitterShareButton,
	TwitterIcon,
	WhatsappShareButton,
	WhatsappIcon,
	TelegramShareButton,
	TelegramIcon
} from "react-share";

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
	Tooltip,
	message,
	Radio
} from 'antd';
import {
	MinusOutlined,
	PlusOutlined,
	FileSearchOutlined
} from '@ant-design/icons';


const { TabPane } = Tabs;

class PreviewView extends ProductBase{
	constructor(props) {
		super(props);

		// Props
		this.producto = this.props.producto;
		let opciones = this.producto["opciones"];

		this.options = {}

		for (let index in opciones) {
			this.options[opciones[index]["tipo"]] = null;
		}

		this.stock = this.producto.stock;

		// States

		// Methods
		this.localUpdateCart  = this.localUpdateCart.bind(this);
		this.changeOption     = this.changeOption.bind(this);
		this.isEnabledAddCart = this.isEnabledAddCart.bind(this);
		this.getCode          = this.getCode.bind(this);
		this.avisame          = this.avisame.bind(this);

		// References
		this.refNroSelector  = React.createRef();
		this.refModalAvisame = React.createRef();
	}

	componentDidMount() {
		let dataBread = [];
		if(this.producto) {
			dataBread.push({
				"label" : this.producto["categorias"]["categoria1"]["nombre"],
				"route" : this.constants.route_tienda_cat1,
				"params" : {"categoria1" : this.producto["categorias"]["categoria1"]["pk"] + "-" + this.producto["categorias"]["categoria1"]["nombre"].formatURL()}
			});
			dataBread.push({
				"label" : this.producto["categorias"]["categoria2"]["nombre"],
				"route" : this.constants.route_tienda_cat2,
				"params" : {"categoria2" : this.producto["categorias"]["categoria2"]["pk"] + "-" + this.producto["categorias"]["categoria2"]["nombre"].formatURL()}
			});
			dataBread.push({
				"label" : this.producto["categorias"]["categoria3"]["nombre"],
				"route" : this.constants.route_tienda_cat3,
				"params" : {"categoria3" : this.producto["categorias"]["categoria3"]["pk"] + "-" + this.producto["categorias"]["categoria3"]["nombre"].formatURL()}
			});
			this.setBreadCrumb(dataBread);
		}
	}

	localUpdateCart(nro) {
		if(parseInt(this.stock) >= parseInt(nro)) {
			let data = {
				count: nro,
				pk: this.props.productPK,
				code: this.getCode()
			}
			if(this.props.producto.seleccion_mascota){
				data["user_pk"] = this.store.getUserPK();
			}
			this.updateCart(data);
		}
		else{
			message.error("Solo hay " + this.stock + " unidades de este producto");
		}
	}

	isEnabledAddCart() {
		let valid = true;
		for (let index in this.options) {
			if (this.options[index] == null) {
				valid = false;
			}
		}
		return valid;
	}

	getCode() {
		let code = [];
		for (let index in this.options) {
			if (this.options[index] != null) {
				code.push(index + ":" + this.options[index].split("-")[0]);
			}
		}
		return code.join(",");
	}


	changeOption(value, type) {
		//console.log(value.target.value, type);
		this.options[type] = value.target.value;

		let valid = true;
		let stock = 100000;

		let code = [];
		for (let index in this.options) {
			if (this.options[index] == null) {
				valid = false;
			}
			else{
				code.push(index + ":" + this.options[index].split("-")[0]);
				stock = parseInt(this.options[index].split("-")[1]) < stock ? parseInt(this.options[index].split("-")[1]) : stock;
			}
		}
		code = code.join(",");
		//console.log(this.options);
		if(this.refNroSelector.current) {
			let nroCart = BasePanel.store.getNumCart(null, this.producto.pk, code);

			this.stock = stock;

			if (valid) {
				this.refNroSelector.current.setValue(nroCart, false, stock)
			}
			else{
				this.refNroSelector.current.setValue(0, true, stock)
			}
		}

		//console.log(valid, code.join(","));

	}

	avisame() {
		this.refModalAvisame.current.open(this.props.productPK);
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
		let productURL = this.constants.getUrlFront() + this.constants.route_profile_producto.replace("[pk]", producto["pk"] + "-" + producto["nombre"].formatURL());

		let opciones = producto["opciones"];
		let radioOptions = {};
		for(let index in opciones) {
			if (radioOptions[opciones[index]["tipo"]] === undefined) {
				radioOptions[opciones[index]["tipo"]] = {"nombre" : opciones[index]["tipo_nombre"], "options" : []};
			}
			if(opciones[index]["tipo"] === "mascota"){
				radioOptions[opciones[index]["tipo"]]["options"].push({
					label: opciones[index]["nombre"],
					value: opciones[index]["pk"] + "_" + opciones[index]["nombre"] + "-" + opciones[index]["stock"],
				})
			}
			else{
				radioOptions[opciones[index]["tipo"]]["options"].push({
					label: opciones[index]["nombre"],
					value: opciones[index]["pk"] + "-" + opciones[index]["stock"],
				})
			}
		}

		return (
			<div>
				<ModalAvisame ref={this.refModalAvisame} />
				<Row gutter={[40, 1]} align="top">
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
								<p className="real-price">{producto.precio ? producto.precio.formatPrice() : ""}</p>
							</Space>
						</Space>
						<br />
						<p>{producto.descripcion}</p>
						<Divider />

							{
								Object.keys(radioOptions).map((key, index) => {
									return <Row gutter={[3, 15]} align="middle" key={Math.random()} style={{marginBottom: "15px"}}>
										<Col xs={24} md={5}>
											<b>{radioOptions[key]["nombre"]}</b>
										</Col>
										<Col xs={24} md={19}>
											<Radio.Group
												onChange={(e) => this.changeOption(e, key)}
												options={radioOptions[key]["options"]}
												optionType="button"
											/>
										</Col>
									</Row>
								})
							}
						<Space direction="vertical">
							{
								producto.stock === 0 ?
								<Alert
									message="Este producto está agotado, ¿Te avisamos cuando tengamos disponible?"
									type="error"
									action={
										<Button type="primary" onClick={this.avisame}>
											Si, Avísame
										</Button>
									} />
								:

								((this.props.isLogged && producto.seleccion_mascota) || !producto.seleccion_mascota) ?
									this.props.mascotas === 0 && producto.seleccion_mascota ?
										<Alert
											message="Para agregar este producto al carrito necesitas seleccionar una de tus mascotas, inscribe a tu primer mascota"
											type="error"
											action={
												<Button type="primary" onClick={(e) => this.redirectPage(this.constants.route_mascotas)}>Inscribir</Button>
											} />
									:
									<div className="preview-number-selector">
										<NumberSelector showMax={false} disabled={!this.isEnabledAddCart()} ref={this.refNroSelector} onUpdate={this.localUpdateCart} max={this.stock} defaultValue={this.props.nroCart || 0} />
									</div>
								:
								<div>
									<Alert
										message="Para agregar este producto al carrito necesitas seleccionar una de tus mascotas, por ello es necesario iniciar sesión"
										type="error"
										action={
											<Button type="primary" onClick={(e) => this.openLogin({"producto" : producto.pk})}>Iniciar sesión</Button>
										} />

								</div>
							}
						</Space>


						<Divider />
						<Row>
							<Col xs={10} md={12} >
								Compartir
							</Col>
							<Col xs={14} md={12} >
								<Tooltip title="Compartir en facebook">
									<FacebookShareButton
										url={productURL}
										quote={"Mira este espectacular producto que encontré en el mundo de Kiwipeluditos."}
										>
										<FacebookIcon size={32} round />
									</FacebookShareButton>
								</Tooltip>
								<Tooltip title="Compartir en telegram">
									<TelegramShareButton
										url={productURL}
										title={"Mira este espectacular producto que encontré en el mundo de Kiwipeluditos."}
										>
										<TelegramIcon size={32} round />
									</TelegramShareButton>
								</Tooltip>
								<Tooltip title="Compartir en twitter">
									<TwitterShareButton
										url={productURL}
										title={"Mira este espectacular producto que encontré en el mundo de Kiwipeluditos."}
										>
										<TwitterIcon size={32} round />
									</TwitterShareButton>
								</Tooltip>
								<Tooltip title="Compartir en whatsapp">
									<WhatsappShareButton
										url={productURL}
										title={"Mira este espectacular producto que encontré en el mundo de Kiwipeluditos."}
										>
										<WhatsappIcon size={32} round />
									</WhatsappShareButton>
								</Tooltip>
							</Col>
						</Row>
					</Col>
				</Row>

				<Tabs style={{marginTop: "40px"}} defaultActiveKey="1" type="card">
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

						<Row gutter={[3, 1]} align="middle" key={Math.random()}>
							<Col xs={24} md={5}>
								<b>SKU</b>
							</Col>
							<Col  xs={24} md={19}>
								{producto.sku}
							</Col>
						</Row>
						<Row gutter={[3, 1]} align="middle" key={Math.random()}>
							<Col xs={24} md={5}>
								<b>Código</b>
							</Col>
							<Col  xs={24} md={19}>
								{producto.codigo}
							</Col>
						</Row>
					</TabPane>

					{
						(producto.documentos && producto.documentos.length > 0) ?
							<TabPane tab="Documentos" key="2">
								<span style={{ marginRight: 8 }}>Documentos:</span>
								{
									producto.documentos.map((item, index) => {
										return <Button href={item.url} target="_blank" icon={<FileSearchOutlined />} key={Math.random()}>{item.descripcion}</Button>
									})
								}
							</TabPane>
						:
						null
					}


				</Tabs>
				{
					(producto.relacionados && producto.relacionados.length > 0) ?
					<div>
						<Divider />

						<Card style={{marginTop: "40px"}} title="Productos relacionados" extra={<a onClick={(e) => this.redirectPage(this.constants.route_tienda_cat2, {"categoria2" : producto["categorias"]["categoria2"]["pk"]})}>Ver más</a>} >
							<Row gutter={[5, 5]}>
								{
									producto.relacionados.map((producto, index) => {
										return <Col xs={12} md={6} key={Math.random()}>
											<ProductCard product={producto} />
										</Col>
									})
								}
							</Row>
						</Card>
					</div>
					:
					null
				}

			</div>
		);
	}
}
PreviewView.getInitialProps = async ({query, req, pathname}) => {
	let productPK = query.pk;
	let isLogged = BasePanel.store.isLogged({query, req, pathname});
	if(productPK && productPK.split("-").length > 0){
		productPK = productPK.split("-")[0];
	}
	let nroCart = BasePanel.store.getNumCart({query, req, pathname}, productPK);
	let mascotas = 0;
	let producto = null;
	let [_productos] = await Promise.all([
		BasePanel.service.apiSend({
			method: "GET",
			register: "producto",
			model: "todo",
			showLoad: false,
			aditional : [productPK]
		})
	]);
	if(_productos["success"]) {
		producto = _productos["data"];

		if (producto["seleccion_mascota"] === true && isLogged) {
			let data = await BasePanel.service.apiSend({
				method: "GET",
				register: "mascota",
				model: "card",
				isPublic: false,
				body: {},
				showLoad: false,
				ctx: {query, req, pathname}
			});
			if(data["success"]) {
				let mascotas_data = data["data"];
				mascotas = mascotas_data.length;
				for (let index in mascotas_data){
					let name = mascotas_data[index]["nombre"] + "";
					producto["opciones"].push({
						"pk" : mascotas_data[index]["pk"],
						"tipo" : "mascota",
						"tipo_nombre" : "Mascota",
						"nombre" : (name).replace(/-/g, ' ').replace(/_/g, ' '),
						"stock" : producto["stock"]
					});
				}
			}
		}

		query["head"] = {
			"title" : producto["nombre"],
			"description" : producto["descripcion"],
			"image" : producto["fotos"].length > 0 ? producto["fotos"][0]["foto"] : null,
			"keywords" : producto["palabras_clave"] || "kiwipeluditos, producto, " + producto["nombre"]
		};
		let structuredData = {
			"@context":"https://schema.org/",
			"@type":"Product",
			"name": producto["nombre"],
			"brand": {
				"name" : producto["marca"],
				"url" : Constant.getUrlFront() + Constant.route_tienda + "?marcas=" + producto["marca_pk"]
			},
			"image": producto["fotos"].length > 0 ? producto["fotos"][0]["foto"] : null,
			"description": producto["descripcion"],
			"sku" : producto["sku"],
			"offers": {
				"@type": "Offer",
				"priceCurrency": "COP",
				"price": producto["precio"],
				"availability": "http://schema.org/InStock"
			}
		};

		query["structuredData"] = structuredData;
	}
	return {query, nroCart, productPK, producto, isLogged, mascotas};
}
PreviewView.getPageName = () => {
	return "Producto";
}
export default PreviewView;
