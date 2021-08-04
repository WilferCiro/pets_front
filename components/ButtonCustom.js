/**
	* Creado por Wilfer Daniel Ciro Maya - 2021
**/

// React Components
import React          from 'react';

// Custom classes
import BasePanel      from '@/containers/BasePanel';

// Ant components and icons
import {
	Button
} from 'antd';

class ButtonCustom extends BasePanel{
	constructor(props) {
		super(props);

		this.state = {
			disabled : this.props.disabled || false,

		}

		// Props
		this.text = this.props.text
		this.onClick = this.props.onClick;

		// Methods
		this.handleClick = this.handleClick.bind(this);
		this.setDisabled = this.setDisabled.bind(this);

	}

	handleClick() {
		if(this.onClick) {
			this.onClick()
		}
	}

	setDisabled(status) {
		this.setState({
			disabled: status
		})
	}

	render() {
		return (
			<Button type="primary" block onClick={this.handleClick} disabled={this.state.disabled}>
				{this.text}
			</Button>
		);
	}
}

export default ButtonCustom;
