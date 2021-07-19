import React              from 'react';
import BasePanel          from '@/containers/BasePanel';
import BaseFormComponent  from '@/formcomponents/BaseFormComponent';
import { Switch, Form }   from 'antd';

class FormSwitch extends BaseFormComponent{
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Form.Item
				label={this.getLabel()}
				name={this.getName()}
				rules={this.getRules()}
				style={this.style}
				tooltip={this.tooltip}
				valuePropName="checked"
			>
				<Switch checkedChildren="Si" unCheckedChildren="No" />
			</Form.Item>
		);
	}
}

export default FormSwitch;
