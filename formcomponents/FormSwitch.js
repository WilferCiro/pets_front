/**
	* Creado por Wilfer Daniel Ciro Maya - 2021
**/

// Custom classes
import BaseFormComponent from '@/formcomponents/BaseFormComponent';

// Ant components and icons
import {
	Switch,
	Form
} from 'antd';

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
