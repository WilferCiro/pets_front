/**
	* Creado por Wilfer Daniel Ciro Maya - 2021
**/

// React Components
import React     from 'react';

// Custom classes
import BasePanel from '@/containers/BasePanel';

// Ant components and icons
import {
	Breadcrumb
} from 'antd';

class CustomBreadcrumb extends BasePanel{
	constructor(props) {
		super(props);

		// States
		this.state = {
			items : []
		};

		// Methods
		this.setItems = this.setItems.bind(this);
	}

	setItems(items) {
		this.setState({
			items: items
		})
	}

	render() {

		if(this.state.items.length === 0) {
			return (
				<div />
			);
		}

		return (
			<div className="breadcrumb-container">
				<Breadcrumb>
					<Breadcrumb.Item>
						<a onClick={this.goHome}>Inicio</a>
					</Breadcrumb.Item>
					{
						(this.state.items).map((item, index) => {
							return <Breadcrumb.Item key={Math.random()}>
							{
								item.route ?
								<a onClick={(e) => this.redirectPage(item.route, item.params)}>{item.label}</a>
								:
								<React.Fragment>{item.label}</React.Fragment>
							}

							</Breadcrumb.Item>
						})
					}
				</Breadcrumb>
			</div>
		);
	}
}

export default CustomBreadcrumb;
