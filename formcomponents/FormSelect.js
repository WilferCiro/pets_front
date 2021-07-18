import React              from 'react';
import BasePanel          from '@/containers/BasePanel';
import BaseFormComponent  from '@/formcomponents/BaseFormComponent';
import { Dropdown } from 'primereact/dropdown';
import { Select, Form } from 'antd';
const { Option } = Select;

class FormSelect extends BaseFormComponent{
	constructor(props) {
		super(props);

		this.type = "FormSelect";
	}


	render() {
		return (
			<Form.Item
				label={this.getLabel()}
				name={this.getName()}
				rules={this.getRules()}
			>
				<Select
					showArrow
					placeholder={this.getPlaceholder()}
					style={{ width: '100%' }}
				>
				{
					(this.state.options).map((option, index) => {
						return <Option key={Math.random()} value={option.value}>{option.label}</Option>
					})
				}
				</Select>
			</Form.Item>
		);
	}
}

export default FormSelect;
