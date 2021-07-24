/**
	* Creado por Wilfer Daniel Ciro Maya - 2021
**/

// Custom classes
import BaseFormComponent from '@/formcomponents/BaseFormComponent';

// Ant components and icons
import {
	Input,
	Space,
	Form
}  from 'antd';
import {
	EyeInvisibleOutlined,
	EyeTwoTone
} from '@ant-design/icons';

class FormPassword extends BaseFormComponent{
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
				<Input.Password
					iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
					placeholder={this.getPlaceholder()}
				/>
			</Form.Item>
		);
	}
}

export default FormPassword;
