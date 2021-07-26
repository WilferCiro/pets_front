/**
	* Creado por Wilfer Daniel Ciro Maya - 2021
**/

// React Components
import React          from 'react';

// Custom classes
import BasePanel      from '@/containers/BasePanel';
import ProductCard    from '@/components/ProductCard';

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
	Button
} from 'antd';
import { DownOutlined } from '@ant-design/icons';
const { Panel } = Collapse;

class TiendaView extends BasePanel{
	constructor(props) {
		super(props);

		// Props

		// States

		// Methods

		// References
	}

	componentDidMount() {
		this.setBreadCrumb([{"label" : "Tienda"}])
	}

	render() {

		const menu = (
			<Menu>
				<Menu.Item>
					Nombre (A-Z)
				</Menu.Item>
				<Menu.Item>
					Nombre (Z-A)
				</Menu.Item>
				<Menu.Item>
					Mayor precio
				</Menu.Item>
				<Menu.Item>
					Menor precio
				</Menu.Item>
			</Menu>
		);


		return (
			<div className="page-center">
				<Row gutter={[40, 16]}>
					<Col span={6}>
						<h4>Filtros</h4>
						<Collapse defaultActiveKey={['1']} size="small" expandIconPosition="right">
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

					</Col>
					<Col span={16}>

						<Row gutter={[40, 16]}>
							<Col span={16}>
								<Dropdown overlay={menu}>
									<Button>Ordenar por <DownOutlined /></Button>
								</Dropdown>
							</Col>
							<Col span={8}>
								<Pagination defaultCurrent={1} size="small" total={30} />
							</Col>
						</Row>

						<Row gutter={[40, 16]}>
							<Col span={8}>
								<ProductCard />
							</Col>
							<Col span={8}>
								<ProductCard />
							</Col>
							<Col span={8}>
								<ProductCard />
							</Col>
						</Row>
					</Col>
				</Row>



			</div>
		);
	}
}

TiendaView.getInitialProps = async ({query}) => {
	return {query};
}
TiendaView.getPageName = () => {
	return "E-commerce";
}
export default TiendaView;
