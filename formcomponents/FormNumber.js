import React              from 'react';
import BasePanel          from '@/containers/BasePanel';
import BaseFormComponent  from '@/formcomponents/BaseFormComponent';
import { InputNumber } from 'antd';


class FormNumber extends BaseFormComponent{
	constructor(props) {
		super(props);

		this.price   = this.props.price ? this.props.price : false;
		this.percent = this.props.percent ? this.props.percent : false;
		this.type    = "FormNumber";

		this.formatter = this.formatter.bind(this);
		this.parser    = this.parser.bind(this);
	}

	formatter(value) {
		if (this.price) {
			return `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
		}
		if (this.percent) {
			return `${value}%`
		}
		return value
	}

	parser(value) {
		if (this.price) {
			return value.replace(/\$\s?|(,*)/g, '')
		}
		if (this.percent) {
			return value.replace('%', '')
		}
		return value
	}

	render() {
		return (
			<div className="input-text">
				{this.getLabel()}
				<InputNumber
					style={{width: "100%"}}
					ref={this.input}
					className="form-text"
					placeholder={this.getPlaceholder() + (this.required ? "*" : "")}
					type="text"
					disabled={this.disabled}
					defaultValue={this.props.defaultValue}
					onChange={this.handleChange}
					onKeyPress={this.handleKeyPress}
					formatter={value => this.formatter(value)}
					parser={value => this.parser(value)}
					/><br />
				{
					(this.state.errores).map((item, index) => {
						return <label key={Math.random()}>{item}</label>
					})
				}
			</div>
		);
	}
}

export default FormNumber;
