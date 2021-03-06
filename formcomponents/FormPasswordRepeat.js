/**
	* Creado por Wilfer Daniel Ciro Maya - 2021
**/

// React Components
import React, { useState } from 'react';

// Custom classes
import BaseFormComponent   from '@/formcomponents/BaseFormComponent';

// Ant components and icons
import {
	Form,
	Input,
	Space,
	Col,
	Row
} from 'antd';
import {
	EyeInvisibleOutlined,
	EyeTwoTone
} from '@ant-design/icons';

const PasswordRepeat = ({ value = {}, onChange }) => {
	const [password1, setPassword1] = useState([]);
	const [password2, setPassword2] = useState([]);

	const triggerChange = (changedValue) => {
		onChange?.({
			password1,
			password2,
			...value,
			...changedValue,
		});
	};

	const onChangePass1 = (e) => {
		let password1 = e.target.value;
		setPassword1(password1);

		triggerChange({
			password1: password1,
		});
	};

	const onChangePass2 = (e) => {
		let password2 = e.target.value;
		setPassword1(password2);

		triggerChange({
			password2: password2,
		});
	};

	return (
		<Row gutter={[8, 3]}>
			<Col xs={24} md={12}>
				<Input.Password
					iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
					onChange={onChangePass1}
					placeholder={"Contraseña"}
					style={{width: "100%"}}
				/>
			</Col>
			<Col xs={24} md={12}>
				<Input.Password
					iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
					onChange={onChangePass2}
					placeholder={"Repita la contraseña"}
					style={{width: "100%"}}
				/>
			</Col>
		</Row>
	);
};


class FormPasswordRepeat extends BaseFormComponent{
	constructor(props) {
		super(props);

		// Methods
		this.checkValidator = this.checkValidator.bind(this);
	}

	checkValidator (_, value) {
		if (value !== undefined && value.password1.length > 0 && value.password2.length > 0 && value.password1 === value.password2) {
			return Promise.resolve();
		}
		return Promise.reject(new Error('Las contraseñas no coinciden'));
	};

	render() {
		return (
			<div>
				<Form.Item
					label={this.getLabel()}
					name={this.getName()}
					rules={[
						{
							validator: this.checkValidator,
						},
					]}
					style={this.style}
				>
					<PasswordRepeat />
				</Form.Item>
			</div>
		);
	}
}

export default FormPasswordRepeat;
