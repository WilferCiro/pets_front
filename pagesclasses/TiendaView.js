/**
	* Creado por Wilfer Daniel Ciro Maya - 2021
**/

// React Components
import React          from 'react';

// Custom classes
import BasePanel         from '@/containers/BasePanel';
import ProductCard       from '@/components/ProductCard';
import ShopFiltersMobile from '@/components/ShopFiltersMobile';
import ShopFilters       from '@/components/ShopFilters';

// Ant components and icons
import {
	Row,
	Col,
	Space,
	Collapse,
	Checkbox,
	Tag,
	Pagination,
	Menu,
	Dropdown,
	Button,
	Badge,
	Divider,
	Input
} from 'antd';
import { DownOutlined, FilterFilled } from '@ant-design/icons';
const { Panel } = Collapse;
const { Search } = Input;

class TiendaView extends BasePanel{
	constructor(props) {
		super(props);

		// Props

		// States

		// Methods
		this.reloadPage       = this.reloadPage.bind(this);
		this.changeOrder      = this.changeOrder.bind(this);
		this.onSearch         = this.onSearch.bind(this);
		this.onChangePage     = this.onChangePage.bind(this);
		this.updateFilters    = this.updateFilters.bind(this);
		this.updateBreadcrumb = this.updateBreadcrumb.bind(this);

		// References
		this.refFiltersMobile = React.createRef();

		// Variables
		let filters = this.props.query;
		this.categoria1  = filters["categoria1"] || null;
		this.categoria2  = filters["categoria2"] || null;
		this.categoria3  = filters["categoria3"] || null;
		this.materiales  = filters["materiales"] || null;
		this.marcas      = filters["marca"] || null;
		this.query       = filters["query"] || null;
		this.orderBy     = filters["orderBy"] || null;
		this.pagina      = filters["pagina"] || 1;
	}

	componentDidMount() {
		this.updateBreadcrumb();
	}

	componentDidUpdate() {
		this.updateBreadcrumb();
	}

	updateBreadcrumb() {
		let filters = this.props.filters;
		let breadcrumbData = [{"label" : "Tienda", "route" : this.constants.route_tienda}];
		if(filters["categoria1_seleccion"]) {
			breadcrumbData.push({
				"label" : filters["categoria1_seleccion"]["nombre"],
				"route" : this.constants.route_tienda_cat1,
				"params" : {"categoria1" : filters["categoria1_seleccion"]["pk"] + "-" + filters["categoria1_seleccion"]["nombre"].formatURL()}
			})
		}
		if(filters["categoria2_seleccion"]) {
			breadcrumbData.push({
				"label" : filters["categoria2_seleccion"]["nombre"],
				"route" : this.constants.route_tienda_cat2,
				"params" : {"categoria2" : filters["categoria2_seleccion"]["pk"] + "-" + filters["categoria2_seleccion"]["nombre"].formatURL()}
			})
		}
		if(filters["categoria3_seleccion"]) {
			breadcrumbData.push({
				"label" : filters["categoria3_seleccion"]["nombre"],
				"route" : this.constants.route_tienda_cat3,
				"params" : {"categoria3" : filters["categoria3_seleccion"]["pk"] + "-" + filters["categoria3_seleccion"]["nombre"].formatURL()}
			})
		}
		this.setBreadCrumb(breadcrumbData)
	}

	onChangePage(value) {
		this.pagina = value;
		this.reloadPage(true);
	}

	onSearch(data) {
		this.query = data.trim();
		this.reloadPage();
	}

	changeOrder(order) {
		this.orderBy = order;
		this.reloadPage();
	}

	reloadPage(changePage = false) {
		let props = {
			"categoria1" : this.categoria1,
			"categoria2" : this.categoria2,
			"categoria3" : this.categoria3,
			"materiales" : this.materiales,
			"marcas" : this.marcas,
			"query" : this.query,
			"orderBy" : this.orderBy,
			"pagina"  : changePage ? this.pagina : null
		}
		let newProps = {};
		for (let key in props) {
			if(props[key] !== null && props[key] !== "") {
				newProps[key] = props[key];
			}
		}
		if(newProps["categoria1"]) {
			this.redirectPage(this.constants.route_tienda_cat1, newProps);
		}
		else if(newProps["categoria2"]) {
			this.redirectPage(this.constants.route_tienda_cat2, newProps);
		}
		else if(newProps["categoria3"]) {
			this.redirectPage(this.constants.route_tienda_cat3, newProps);
		}
		else{
			this.redirectPage(this.constants.route_tienda, newProps);
		}
	}

	updateFilters(data) {
		this.categoria1 = data["categoria1"];
		this.categoria2 = data["categoria2"];
		this.categoria3 = data["categoria3"];
		this.materiales = data["materiales"];
		this.marcas = data["marcas"];
		this.query = data["query"];
		this.reloadPage();
	}

	render() {
		let query = this.props.query;
		let nombre_categoria = this.props.filters["nombre_categoria"];

		let allFilters = 0;
		if(query.query !== "" && query.query){
			allFilters ++;
		}
		if(nombre_categoria) {
			allFilters ++;
		}
		if(query["marcas"]) {
			allFilters += query["marcas"].split(",").length;
		}
		if(query["materiales"]) {
			allFilters += query["materiales"].split(",").length;
		}

		const menu = (
			<Menu>
				<Menu.Item key={"nameSortAZ"} onClick={(e) => this.changeOrder("nombre")}>
					Nombre (A-Z)
				</Menu.Item>
				<Menu.Item key={"nameSortZA"} onClick={(e) => this.changeOrder("-nombre")}>
					Nombre (Z-A)
				</Menu.Item>
				<Menu.Item key={"priceSortM"} onClick={(e) => this.changeOrder("precio")}>
					Menor precio
				</Menu.Item>
				<Menu.Item key={"priceSortm"} onClick={(e) => this.changeOrder("-precio")}>
					Mayor precio
				</Menu.Item>
			</Menu>
		);


		return (
			<div className="page-center">
				<div>
				</div>


				<Row gutter={[40, 16]}>
					<Col xs={24} md={6}>
						<div className="show-desktop">
							<ShopFilters
								filters={this.props.filters}
								query={this.props.query}
								update={this.updateFilters}
								/>
						</div>

					</Col>
					<Col xs={24} md={18}>
						<Row gutter={[10, 16]} align="middle">
							<Col xs={15} md={8}>
								<Dropdown overlay={menu} trigger={['click']}>
									<Button>Ordenar por: {query.orderBy || "Nombre (A-Z)"} <DownOutlined /></Button>
								</Dropdown>
							</Col>
							<Col xs={9} md={0}>
								<ShopFiltersMobile
									ref={this.refFiltersMobile}
									filters={this.props.filters}
									query={this.props.query}
									update={this.updateFilters}
									/>
								<Badge count={allFilters}>
									<Button type="primary" icon={<FilterFilled />} onClick={(e) => {this.refFiltersMobile.current.open()}}>Filtros</Button>
								</Badge>
							</Col>
							<Col xs={24} md={14}>
								<Search
									placeholder="¿Qué estás buscando?"
									defaultValue={this.query}
									onSearch={this.onSearch}
									allowClear
									enterButton />
							</Col>
							<Col xs={24} md={8}>
								{this.props.paginator.total} resultado(s)
							</Col>
							<Col xs={24} md={16}>
								<Pagination onChange={this.onChangePage}  defaultPageSize={12} responsive={true} defaultCurrent={this.pagina} total={this.props.paginator.total} />
							</Col>
						</Row>

						<Divider />

						<Row gutter={[4, 5]}>
							{
								(this.props.productos).map((producto, index) => {
									return (
										<Col key={Math.random()} xs={24} md={8}>
											<ProductCard product={producto} />
										</Col>
									)
								})
							}
						</Row>
						<Divider />
						<Pagination onChange={this.onChangePage}  defaultPageSize={12} responsive={true} defaultCurrent={this.pagina} total={this.props.paginator.total} />
					</Col>
				</Row>



			</div>
		);
	}
}

TiendaView.getInitialProps = async ({query}) => {
	let categoria1 = query.categoria1;
	let categoria2 = query.categoria2;
	let categoria3 = query.categoria3;

	if(categoria1 && categoria1.split("-").length > 0) {
		categoria1 = categoria1.split("-")[0];
	}
	if(categoria2 && categoria2.split("-").length > 0) {
		categoria2 = categoria2.split("-")[0];
	}
	if(categoria3 && categoria3.split("-").length > 0) {
		categoria3 = categoria3.split("-")[0];
	}

	let materiales = query.materiales;
	let marcas = query.marcas;
	let queryS = query.query;
	let orderBy = query.orderBy;
	let pagina = query.pagina ? parseInt(query.pagina) : 1;

	let body = {
		"pagina" : pagina,
		"ordenar_por" : orderBy || "nombre"
	};
	if (categoria1){
		body["categoria1"] = categoria1;
	}
	if (categoria2){
		body["categoria2"] = categoria2;
	}
	if (categoria3){
		body["categoria3"] = categoria3;
	}
	if (materiales){
		body["materiales"] = materiales;
	}
	if (marcas){
		body["marcas"] = marcas;
	}
	if (queryS){
		body["query"] = queryS;
	}
	let productos = null;
	let paginator = null;
	let filters = null;
	let [_productos] = await Promise.all([
		BasePanel.service.apiSend({
			method: "GET",
			register: "producto",
			model: "consultar",
			showLoad: false,
			body: body
		})
	]);
	if(_productos["success"]) {
		productos = _productos["data"];
		paginator = _productos["paginator"];
		filters   = _productos["aditional"];
	}

	query["head"] = {
		"title" : "Tienda",
		"description" : "Bienvenido a la tienda oficial de kiwipeluditos, donde podrás encontrar todos los productos que tu peludito necesita.",
		"keywords" : "Tienda kiwipeluditos, mascota, peludito, collar, camiseta, mugs"
	};

	return {query, productos, paginator, filters};
}
TiendaView.getPageName = () => {
	return "E-commerce";
}
export default TiendaView;
