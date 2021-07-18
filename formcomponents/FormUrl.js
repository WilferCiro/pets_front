import React              from 'react';
import BasePanel          from '@/containers/BasePanel';
import BaseFormComponent  from '@/formcomponents/BaseFormComponent';
import { Input } from 'antd';

class FormUrl extends BaseFormComponent{
	constructor(props) {
		super(props);

		this.type = "FormUrl";
	}

	render() {
		return (
			<div className="input-text">
				<Input
					addonBefore={this.props.beforeText}
					defaultValue=""
					ref={this.input}
					className="form-text"
					placeholder={this.getPlaceholder() + (this.required ? "*" : "")}
					defaultValue={this.props.defaultValue}
					onChange={this.handleChange}
					onKeyPress={this.handleKeyPress}
				/>
			</div>
		);
	}
}

export default FormUrl;
