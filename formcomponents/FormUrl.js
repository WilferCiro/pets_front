/**
	* Creado por Wilfer Daniel Ciro Maya - 2021
**/

// Custom classes
import BaseFormComponent  from '@/formcomponents/BaseFormComponent';

// Ant components and icons
import { Input } from 'antd';

class FormUrl extends BaseFormComponent{
	constructor(props) {
		super(props);
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
