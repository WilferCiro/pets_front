/**
	* Creado por Wilfer Daniel Ciro Maya - 2021
**/

// React Components
import React          from 'react';

// Custom classes
import BasePanel      from '@/containers/BasePanel';


import {
	Collapse,
	Checkbox,
	Tag,
	Drawer
} from 'antd';

const { Panel } = Collapse;

class ShopFilters extends BasePanel{
	constructor(props) {
		super(props);

		// States
		this.state = {
			open : false
		}

		// Methods
		this.open  = this.open.bind(this);
		this.close = this.close.bind(this);
	}
	componentDidMount() {
	}

	open() {
		this.setState({
			open: true
		})
	}

	close() {
		this.setState({
			open: false
		})
	}

	render() {
		return (
			<Drawer
				title="Filtros"
				placement={"left"}
				closable={false}
				onClose={this.close}
				visible={this.state.open}
				closable={true}
				width={300}
			>
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
			</Drawer>
		);
	}
}

export default ShopFilters;
