import React          from 'react';
import BasePanel      from '@/containers/BasePanel';
import {Breadcrumb}    from 'antd';

class CustomBreadcrumb extends BasePanel{
	constructor(props) {
		super(props);
		this.state = {
			items : []
		};

		this.setItems = this.setItems.bind(this);
	}

	setItems(items) {
		this.setState({
			items: items
		})
	}

	render() {
		return (
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
		);
	}
}

export default CustomBreadcrumb;
