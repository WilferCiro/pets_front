/**
	* Creado por Wilfer Daniel Ciro Maya - 2021
**/

// React Components
import React          from 'react';

// Custom classes
import BasePanel      from '@/containers/BasePanel';
import ShopFilters    from '@/components/ShopFilters'

import {
	Collapse,
	Checkbox,
	Tag,
	Drawer
} from 'antd';

const { Panel } = Collapse;

class ShopFiltersMobile extends BasePanel{
	constructor(props) {
		super(props);

		// Props
		this.update = this.props.update;

		// States
		this.state = {
			open : false
		}

		// Methods
		this.open           = this.open.bind(this);
		this.close          = this.close.bind(this);
		this.updateFilters  = this.updateFilters.bind(this);
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

	updateFilters(data) {
		this.close();
		this.update(data);
	}

	render() {
		return (
			<Drawer
				title="Filtros"
				placement={"left"}
				onClose={this.close}
				visible={this.state.open}
				closable={true}
				width={300}
			>
				<ShopFilters
					{...this.props}
					update={this.updateFilters}
				/>
			</Drawer>
		);
	}
}

export default ShopFiltersMobile;
