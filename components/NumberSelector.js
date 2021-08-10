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
	Button,
	message
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
		this.min             = this.props.min || 0;
		this.defaultValue    = this.props.defaultValue || 0;
		this.onUpdate        = this.props.onUpdate;
		this.parameterUpdate = this.props.parameterUpdate;
		this.showMax         = this.props.showMax || false;
		// States
		this.state = {
			value : this.defaultValue,
			disabled: this.props.disabled || false,
			max: this.props.max || 100,
			pk: null
		}

		// Methods
		this.minus        = this.minus.bind(this);
		this.plus         = this.plus.bind(this);
		this.buttonClick  = this.buttonClick.bind(this);
		this.setValue     = this.setValue.bind(this);

		// Variables
	}

	setValue(value, disabled, max = null, pk = null) {
		this.setState({
			value: value,
			disabled: disabled,
			max: max || 100,
			pk: pk
		});
	}

	minus() {
		let newValue = this.state.value - 1;
		if(newValue >= this.min){
			this.setState({
				value: newValue
			});

			if(this.onUpdate) {
				this.onUpdate(newValue, this.state.pk)
			}
		}
	}

	plus() {
		let newValue = this.state.value + 1;
		if(newValue <= this.state.max){
			this.setState({
				value: newValue
			});

			if(this.onUpdate) {
				this.onUpdate(newValue, this.state.pk)
			}
		}else{
			message.error("Solo hay " + this.state.max + " unidades de este producto");
		}
	}

	buttonClick() {
		this.plus();
	}

	render() {

		if(this.state.value === 0) {
			return (
				<div>
					<Button disabled={this.state.disabled} block type="primary" onClick={this.buttonClick} icon={<ShoppingCartOutlined />}>Agregar al carrito</Button>
					{
						this.showMax ?
						<p>{this.state.max} Unidades</p>
						:
						null
					}
				</div>
			)
		}

		return (
			<div>
				<div className="number-selector">
					<Button disabled={this.state.disabled} onClick={this.minus} size="small" type="link" shape="circle" icon={this.state.value === 1 && this.min < 1 ? <DeleteFilled /> : <MinusOutlined />} />
					<Input disabled={this.state.disabled} size="small" value={this.state.value} min={this.min} max={this.state.max} style={{border: "none", width: "100%", textAlign: "center"}} />
					<Button disabled={this.state.disabled} onClick={this.plus} size="small" type="link" shape="circle" icon={<PlusOutlined />} />
				</div>
				{
					this.showMax ?
					<p>{this.state.max} Unidades</p>
					:
					null
				}
			</div>
		);
	}
}

export default NumberSelector;
