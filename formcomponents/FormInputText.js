import React              from 'react';
import BasePanel          from '@/containers/BasePanel';
import BaseFormComponent  from '@/formcomponents/BaseFormComponent';
import { Input, Form } from 'antd';

class FormInputText extends BaseFormComponent{
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Form.Item
				label={this.getLabel()}
				name={this.getName()}
				rules={this.getRules()}
			>
				<Input
					placeholder={this.getPlaceholder()}
				/>
			</Form.Item>
		);
	}
}

export default FormInputText;
