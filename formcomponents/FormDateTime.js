import React              from 'react';
import BasePanel          from '@/containers/BasePanel';
import BaseFormComponent  from '@/formcomponents/BaseFormComponent';
import { DatePicker } from 'antd';
import moment from 'moment';

class FormDateTime extends BaseFormComponent{
	constructor(props) {
		super(props);

		this.type = "FormInputText";
		var today = new Date();
		var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
		var time = today.getHours()+':'+today.getMinutes()+':'+today.getSeconds();

		this.state.value = this.props.defaultValue ? this.props.defaultValue : date + ' '+ time;
	}

	setValue(value) {
		this.setState({
			value : value
		})
	}

	render() {
		const dateFormat = 'yyyy-MM-dd hh:mm:ss';

		return (
			<div className="input-text">
				{this.getLabel()}
				<DatePicker
					showTime
					style={{width: "100%"}}
					disabled={this.disabled}
					onChange={this.handleChange}
					ref={this.input}
					className="form-text"
					placeholder={this.getPlaceholder() + (this.required ? "*" : "")}
					type="text"
					value={moment(this.state.value, dateFormat)}
					onKeyPress={this.handleKeyPress}
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

export default FormDateTime;
