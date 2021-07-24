/**
	* Creado por Wilfer Daniel Ciro Maya - 2021
**/

// Custom classes
import BaseFormComponent from '@/formcomponents/BaseFormComponent';

// Ant components and icons
import {
	DatePicker,
	Form
} from 'antd';

class FormDateTime extends BaseFormComponent{
	constructor(props) {
		super(props);
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
