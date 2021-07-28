/**
	* Creado por Wilfer Daniel Ciro Maya - 2021
**/

// React Components
import React          from 'react';

// Custom classes
import BasePanel      from '@/containers/BasePanel';

// Ant components and icons
import {
	Input,
	Button
} from 'antd';
import {
	MinusOutlined,
	PlusOutlined,
	DeleteFilled,
	ShoppingCartOutlined
} from '@ant-design/icons';

class NumberSelector extends BasePanel{
	constructor(props) {
		super(props);

		// props
		this.max             = this.props.max || 100;
		this.min             = this.props.min || 0;
		this.defaultValue    = this.props.defaultValue || 0;
		this.onUpdate        = this.props.onUpdate;
		this.parameterUpdate = this.props.parameterUpdate;
		// States
		this.state = {
			value : this.defaultValue
		}

		// Methods
		this.minus        = this.minus.bind(this);
		this.plus         = this.plus.bind(this);
		this.buttonClick  = this.buttonClick.bind(this);
	}

	minus() {
		let newValue = this.state.value - 1;
		if(newValue >= this.min){
			this.setState({
				value: newValue
			});

			if(this.onUpdate) {
				this.onUpdate(newValue, this.parameterUpdate)
			}
		}
	}

	plus() {
		let newValue = this.state.value + 1;
		if(newValue <= this.max){
			this.setState({
				value: newValue
			});

			if(this.onUpdate) {
				this.onUpdate(newValue, this.parameterUpdate)
			}
		}
	}

	buttonClick() {
		this.plus();
	}

	render() {

		if(this.state.value === 0) {
			return (
				<Button block type="primary" onClick={this.buttonClick} icon={<ShoppingCartOutlined />}>Agregar al carrito</Button>
			)
		}

		return (
			<div className="number-selector">
				<Button onClick={this.minus} size="small" type="link" shape="circle" icon={this.state.value === 1 && this.min < 1 ? <DeleteFilled /> : <MinusOutlined />} />
				<Input size="small" value={this.state.value} min={this.min} max={this.max} style={{border: "none", width: "100%", textAlign: "center"}} />
				<Button onClick={this.plus} size="small" type="link" shape="circle" icon={<PlusOutlined />} />
			</div>
		);
	}
}

export default NumberSelector;
