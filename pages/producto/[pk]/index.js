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
import RadioMascotasProducto from '@/components/RadioMascotasProducto';
import RadioVariantesProducto from '@/components/RadioVariantesProducto';
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
	Radio,
	Skeleton,
	Avatar
} from 'antd';
import {
	MinusOutlined,
	PlusOutlined,
	FileSearchOutlined,
	QuestionCircleFilled
} from '@ant-design/icons';

const { Meta } = Card;
const { TabPane } = Tabs;

class PreviewView extends ProductBase{
	constructor(props) {
		super(props);

		// Props
		this.mascota = null;

		// States
		this.state = {
			producto: null
		}

		// Methods
		this.localUpdateCart  = this.localUpdateCart.bind(this);
		this.changeMascota    = this.changeMascota.bind(this);
		this.isEnabledAddCart = this.isEnabledAddCart.bind(this);
		this.avisame          = this.avisame.bind(this);
		this.changeVariante   = this.changeVariante.bind(this);
		this.initialSetup     = this.initialSetup.bind(this);
		this.searchProducto   = this.searchProducto.bind(this);

		// References
		this.refNroSelector  = React.createRef();
		this.refModalAvisame = React.createRef();
		this.refRadioMascota = React.createRef();


		// Variables
		this.cartProducto = null;
		this.pk = this.props.productPK;
	}

	componentDidMount() {
		this.searchProducto();
	}
	componentDidUpdate() {
		if (this.pk !== this.props.productPK) {
			this.pk = this.props.productPK;
			this.mascota = null;
			this.searchProducto();
		}
	}

	async searchProducto() {
		let data = await BasePanel.service.apiSend({
			method: "GET",
			register: "producto",
			model: "todo",
			showLoad: true,
			aditional : [this.pk]
		})
		if (data["success"]) {
			let producto = data["data"];

			if (producto["seleccion_mascota"] === true && this.props.isLogged) {
				let dataM = await BasePanel.service.apiSend({
					method: "GET",
					register: "mascota",
					model: "card",
					isPublic: false,
					body: {},
					showLoad: false
				});
				if(dataM["success"]){
					producto["mascotas"] = dataM["data"];
				}
			}

			this.setState({
				producto: producto
			});

			this.initialSetup();
		}
		else{
			message.error("Hubo un error al cargar el producto, por favor recargue la página");
		}
	}

	initialSetup(){
		let dataBread = [];
		if(this.state.producto) {
			let producto = this.state.producto;
			dataBread.push({
				"label" : producto["categorias"]["categoria1"]["nombre"],
				"route" : this.constants.route_tienda_cat1,
				"params" : {"categoria1" : producto["categorias"]["categoria1"]["pk"] + "-" + producto["categorias"]["categoria1"]["nombre"].formatURL()}
			});
			dataBread.push({
				"label" : producto["categorias"]["categoria2"]["nombre"],
				"route" : this.constants.route_tienda_cat2,
				"params" : {"categoria2" : producto["categorias"]["categoria2"]["pk"] + "-" + producto["categorias"]["categoria2"]["nombre"].formatURL()}
			});
			dataBread.push({
				"label" : producto["categorias"]["categoria3"]["nombre"],
				"route" : this.constants.route_tienda_cat3,
				"params" : {"categoria3" : producto["categorias"]["categoria3"]["pk"] + "-" + producto["categorias"]["categoria3"]["nombre"].formatURL()}
			});
			dataBread.push({
				"label" : producto["nombre"]
			});
			this.setBreadCrumb(dataBread);

			if (this.props.isLogged) {
				this.getCartProducto();
			}
		}
	}


	async getCartProducto() {
		if(this.refNroSelector.current) {
			this.refNroSelector.current.disable();
		}
		let body = {
			"producto" : this.state.producto["pk"]
		}
		let data = await BasePanel.service.apiSend({
			method: "GET",
			register: "carrito",
			model: "producto",
			body: body,
			isPublic: false,
			showError: true
		});
		if(data["success"]) {
			this.cartProducto = data["data"];
			this.changeMascota(this.refRadioMascota.current.getValue());
			/*if(!this.state.producto.seleccion_mascota && this.cartProducto.length > 0) {
				if(this.refNroSelector.current){
					this.refNroSelector.current.setValue(this.cartProducto[0]["cantidad"], false, this.state.producto.stock, this.cartProducto[0]["pk"]);
				}
			}
			else if(this.isEnabledAddCart()) {
				if(this.refNroSelector.current){
					this.refNroSelector.current.setValue(0, false, this.state.producto.stock, null);
				}
			}*/
		}
	}


	async localUpdateCart(nro, pk = null) {
		if(parseInt(this.state.producto.stock) >= parseInt(nro)) {
			let data = {
				"nro" : nro,
				"pk" : pk,
				"producto" : this.state.producto.pk,
				"mascota" : this.mascota
			}
			let newPk = await this.updateCart(data);
			this.refNroSelector.current.setValue(nro, false, this.state.producto.stock, newPk);
			await this.getCartProducto();
		}
		else{
			message.error("Solo hay " + this.state.producto.stock + " unidades de este producto");
		}
	}

	isEnabledAddCart() {
		return (this.mascota !== null && this.mascota !== undefined && this.state.producto.seleccion_mascota) || !this.state.producto.seleccion_mascota;
	}

	changeMascota(value) {
		this.mascota = value; //value.target.value;

		if(this.state.producto.seleccion_mascota && this.mascota === null){
			if(this.refNroSelector.current) {
				this.refNroSelector.current.setValue(0, true, this.state.producto.stock, null);
			}
			return;
		}
		this.refNroSelector.current.enable();
		let updated = false;
		this.cartProducto.map((item, index) => {
			if(item["mascota"] === this.mascota) {
				this.refNroSelector.current.setValue(item["cantidad"], false, this.state.producto.stock, item["pk"]);
				updated = true;
			}
			return null;
		});

		if (!updated) {
			this.refNroSelector.current.setValue(0, false, this.state.producto.stock, null);
		}
	}

	changeVariante(value) {
		this.redirectPage(this.constants.route_profile_producto, {pk: value})
	}


	avisame() {
		this.refModalAvisame.current.open(this.state.producto.pk);
	}

	render() {
		let producto = this.state.producto;

		if (!producto) {
			return (
				<div>
					<Row gutter={[40, 16]} align="top">
						<Col xs={24} md={11} lg={8}>
							<Skeleton.Avatar active={true} style={{width: "300px", height: "300px"}} />
						</Col>
						<Col xs={24} md={13} lg={16}>
							<Skeleton active={true}/>
							<Skeleton active={true}/>
							<Skeleton active={true}/>
						</Col>
					</Row>
				</div>
			)
		}
		let productURL = this.constants.getUrlFront() + this.constants.route_profile_producto.replace("[pk]", producto["pk"] + "-" + producto["nombre"].formatURL());

		let radioMascotas = [];
		for(let index in this.state.producto.mascotas) {
			radioMascotas.push({
				label: this.state.producto.mascotas[index]["nombre"],
				value: this.state.producto.mascotas[index]["pk"]
			})
		}

		let radioVariantes = [];
		let descripcion_prod = [];
		let variantes = this.state.producto.variantes;
		for(let index in variantes) {
			let opciones = [];
			for (let iOpcion in variantes[index]["opciones"]) {
				opciones.push(variantes[index]["opciones"][iOpcion]["nombre"])
			}
			radioVariantes.push({
				label: opciones.join(", "),
				value: variantes[index]["pk"],
				pk: variantes[index]["pk"],
				foto: variantes[index]["foto"],
			})

			if (variantes[index]["pk"] === this.state.producto.pk) {
				descripcion_prod = variantes[index]["opciones"];
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
						<Space align="center">
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
						<Tooltip title="Marca del producto">
							<Tag color="purple">{producto.marca}</Tag>
						</Tooltip>
						{
							producto.dias_fabricacion > 0 ?
							<Tooltip title="Tiempo de fabricación">
								<Tag color="purple">{producto.dias_fabricacion} días de fabricación</Tag>
							</Tooltip>
							:
							null
						}

						{
							radioVariantes.length > 1 ?
							<div>
								<Divider />
								<RadioVariantesProducto options={radioVariantes} pk={this.state.producto.pk} changeVariante={this.changeVariante}/>
								<br />
							</div>
							:
							null
						}


						<RadioMascotasProducto ref={this.refRadioMascota} changeMascota={this.changeMascota} options={radioMascotas} />
						<Divider />

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

								(this.props.isLogged && (producto.seleccion_mascota || !producto.seleccion_mascota)) ?
									radioMascotas.length === 0 && producto.seleccion_mascota ?
										<Alert
											message="Para agregar este producto al carrito necesitas seleccionar una de tus mascotas, inscribe a tu primer mascota"
											type="error"
											action={
												<Button type="primary" onClick={(e) => this.redirectPage(this.constants.route_mascotas, {add: true})}>Inscribir</Button>
											} />
									:
									<div className="preview-number-selector">
										<NumberSelector showMax={false} disabled={!this.isEnabledAddCart()} ref={this.refNroSelector} onUpdate={this.localUpdateCart} max={this.state.producto.stock} defaultValue={0} />
									</div>
								:
								<div>
									<Alert
										message={producto.seleccion_mascota ? "Para agregar este producto al carrito necesitas seleccionar una de tus mascotas, por ello es necesario iniciar sesión" : "Para agregar este producto al carrito necesitas iniciar sesión"}
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
							<Col span={6}>
								<b>SKU</b>
							</Col>
							<Col span={18}>
								{producto.sku}
							</Col>
						</Row>
						<Row gutter={[3, 1]} align="middle" key={Math.random()}>
							<Col span={6}>
								<b>Código</b>
							</Col>
							<Col span={18}>
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
										return <Col xs={24} md={6} key={Math.random()}>
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
	let mascotas = [];
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
