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
		this.max = this.props.max || 100;
		this.min = this.props.min || 0;
		this.defaultValue = this.props.defaultValue || 0;

		// States
		this.state = {
			value : this.defaultValue
		}

		// Methods
		this.minus        = this.minus.bind(this);
		this.plus         = this.plus.bind(this);
		this.buttonClick  = this.buttonClick.bind(this);
	}
	componentDidMount() {
	}

	minus() {
		if(this.state.value - 1 >= this.min){
			this.setState({
				value: this.state.value - 1
			});
		}
	}

	plus() {
		if(this.state.value + 1 <= this.max){
			this.setState({
				value: this.state.value + 1
			})
		}
	}

	buttonClick() {
		this.plus();
	}

	render() {

		if(this.state.value === 0) {
			return (
				<Button block type="primary" size="large" onClick={this.buttonClick} icon={<ShoppingCartOutlined />}>Agregar al carrito</Button>
			)
		}

		return (
			<div className="number-selector">
				<Button onClick={this.minus} type="link" shape="circle" icon={this.state.value === 1 && this.min < 1 ? <DeleteFilled /> : <MinusOutlined />} />
				<Input value={this.state.value} min={this.min} max={this.max} style={{border: "none", width: "100%", textAlign: "center"}} />
				<Button onClick={this.plus} type="link" shape="circle" icon={<PlusOutlined />} />
			</div>
		);
	}
}

export default NumberSelector;
