/**
	* Creado por Wilfer Daniel Ciro Maya - 2021
**/

// React Components
import React          from 'react';

// Custom classes
import BasePanel      from '@/containers/BasePanel';
import ProductCard    from '@/components/ProductCard';
import ShopFilters    from '@/components/ShopFilters';

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
	Divider
} from 'antd';
import { DownOutlined, FilterFilled } from '@ant-design/icons';
const { Panel } = Collapse;

class TiendaView extends BasePanel{
	constructor(props) {
		super(props);

		// Props

		// States

		// Methods

		// References
		this.refFiltersMobile = React.createRef();
	}

	componentDidMount() {
		this.setBreadCrumb([{"label" : "Tienda"}])
	}

	render() {

		const menu = (
			<Menu>
				<Menu.Item key={"nameSortAZ"}>
					Nombre (A-Z)
				</Menu.Item>
				<Menu.Item key={"nameSortZA"}>
					Nombre (Z-A)
				</Menu.Item>
				<Menu.Item key={"priceSortM"}>
					Mayor precio
				</Menu.Item>
				<Menu.Item key={"priceSortm"}>
					Menor precio
				</Menu.Item>
			</Menu>
		);


		return (
			<div className="page-center">
				<div>
					<ShopFilters ref={this.refFiltersMobile} />
				</div>


				<Row gutter={[40, 16]}>
					<Col xs={24} md={6}>
						<div className="show-desktop">
							<h4>Filtros</h4>
							<Collapse defaultActiveKey={['1', '2', '3']} expandIconPosition="right">
								<Panel header="Seleccionados" key="1">
									<Tag closable color="purple">
										Collares
									</Tag>
								</Panel>
								<Panel header="Categorías" key="2">
									<Checkbox>Collares</Checkbox><br />
									<Checkbox>Camisetas</Checkbox><br />
									<Checkbox>Collares</Checkbox><br />
								</Panel>
								<Panel header="Marca" key="3">
									<Checkbox>KiwiPeluditos</Checkbox><br />
									<Checkbox>Otras</Checkbox><br />
								</Panel>
							</Collapse>
						</div>

					</Col>
					<Col xs={24} md={18}>

						<Row gutter={[10, 16]}>
							<Col xs={15} md={14}>
								<Dropdown overlay={menu}>
									<Button>Ordenar por <DownOutlined /></Button>
								</Dropdown>
							</Col>
							<Col xs={9} md={0}>
								<div className="show-mobile">
									<Badge count={5}>
										<Button type="primary" icon={<FilterFilled />} onClick={(e) => {this.refFiltersMobile.current.open()}}>Filtros</Button>
									</Badge>
								</div>
							</Col>
							<Col xs={24} md={10}>
								<Pagination defaultPageSize={12} responsive={true} defaultCurrent={1} total={this.props.paginator.total} />
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
					</Col>
				</Row>



			</div>
		);
	}
}

TiendaView.getInitialProps = async ({query}) => {
	let categoria = query.categorias;
	let materiales = query.materiales;
	let marcas = query.marcas;
	let querySearch = query.query;
	let orderBy = query.order;

	let body = {
		"pagina" : 1,
		"cantidad" : 12,
		"order_by" : orderBy || "-precio"
	};
	if (categoria){
		body["categoria"] = categoria;
	}
	if (materiales){
		body["materiales"] = materiales;
	}
	if (marcas){
		body["marcas"] = marcas;
	}
	if (querySearch){
		body["query"] = querySearch;
	}

	let productos = null;
	let paginator = null;
	let [_productos] = await Promise.all([
		BasePanel.service.apiSend({
			method: "GET",
			register: "producto",
			model: "consultar",
			showLoad: false,
			body: body
		})
	]);
	if(_productos["code"] === 200) {
		productos = _productos["data"];
		paginator = _productos["paginator"];
	}
	console.log(_productos);
	return {query, productos, paginator};
}
TiendaView.getPageName = () => {
	return "E-commerce";
}
export default TiendaView;
