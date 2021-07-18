import React                                 from 'react';
import BaseFormComponent                     from '@/formcomponents/BaseFormComponent';
import { Input, Space, Form }                from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone }  from '@ant-design/icons';

class FormPassword extends BaseFormComponent{
	constructor(props) {
		super(props);

		this.type = "FormPassword";
	}

	render() {
		return (
			<Form.Item
				label={this.getLabel()}
				name={this.getName()}
				rules={this.getRules()}
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
