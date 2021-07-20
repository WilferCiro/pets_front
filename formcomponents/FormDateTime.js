import React              from 'react';
import BasePanel          from '@/containers/BasePanel';
import BaseFormComponent  from '@/formcomponents/BaseFormComponent';
import { DatePicker, Form } from 'antd';

class FormDateTime extends BaseFormComponent{
	constructor(props) {
		super(props);

		this.type = "FormInputText";
	}

	render() {
		const dateFormat = 'YYYY-MM-DD hh:mm:ss';

		return (
			<Form.Item
				label={this.getLabel()}
				name={this.getName()}
				rules={this.getRules()}
				style={this.style}
			>
				<DatePicker
					format={dateFormat}
					showTime
					style={{width: "100%"}}
					placeholder={this.getPlaceholder() + (this.required ? "*" : "")}
					/>
			</Form.Item>
		);
	}
}

export default FormDateTime;
