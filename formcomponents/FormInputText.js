/**
	* Creado por Wilfer Daniel Ciro Maya - 2021
**/

// Custom classes
import BaseFormComponent from '@/formcomponents/BaseFormComponent';

// Ant components and icons
import {
	Input,
	Form
} from 'antd';

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
				style={this.style}
			>
				<Input
					placeholder={this.getPlaceholder()}
				/>
			</Form.Item>
		);
	}
}

export default FormInputText;
