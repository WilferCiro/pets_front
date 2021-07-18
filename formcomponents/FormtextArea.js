import React              from 'react';
import BaseFormComponent  from '@/formcomponents/BaseFormComponent';
import { Input, Form }    from 'antd';

const { TextArea } = Input;

class FormtextArea extends BaseFormComponent{
	constructor(props) {
		super(props);

		this.type = "FormtextArea";
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
