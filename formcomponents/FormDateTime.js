import React              from 'react';
import BasePanel          from '@/containers/BasePanel';
import BaseFormComponent  from '@/formcomponents/BaseFormComponent';
import { DatePicker, Form } from 'antd';
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
			<Form.Item
				label={this.getLabel()}
				name={this.getName()}
				rules={this.getRules()}
				style={this.style}
			>
				<DatePicker
					showTime
					style={{width: "100%"}}
					placeholder={this.getPlaceholder() + (this.required ? "*" : "")}
					/>
			</Form.Item>
		);
	}
}

export default FormDateTime;
