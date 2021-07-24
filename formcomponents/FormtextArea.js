/**
	* Creado por Wilfer Daniel Ciro Maya - 2021
**/

// Custom classes
import BaseFormComponent  from '@/formcomponents/BaseFormComponent';

// Ant components and icons
import {
	Input,
	Form
}    from 'antd';
const { TextArea } = Input;

class FormtextArea extends BaseFormComponent{
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
				<TextArea
					rows={this.props.rows ? this.props.rows : 5}
					placeholder={this.getPlaceholder()}
				/>
			</Form.Item>
		);
	}
}

export default FormtextArea;
