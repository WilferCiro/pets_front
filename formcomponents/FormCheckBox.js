import React              from 'react';
import BasePanel          from '@/containers/BasePanel';
import BaseFormComponent  from '@/formcomponents/BaseFormComponent';

class FormCheckBox extends BaseFormComponent{
	constructor(props) {
		super(props);

		this.type = "FormCheckBox";
	}

	getValue() {
		return this.input.current.checked;
	}

	setValue(value) {
		this.input.current.checked = value;
	}

	render() {
		return (
			<div className="">
				<input
					ref={this.input}
					className="form-text"
					placeholder={this.props.placeholder}
					type="checkbox"
					id={this.getID()}
					defaultChecked={this.props.defaultValue}
				/>
				<label htmlFor={this.getID()}>{this.getLabel()}</label><br />
				{
					(this.state.errores).map((item, index) => {
						return <label key={Math.random()}>{item}</label>
					})
				}
			</div>
		);
	}
}

export default FormCheckBox;
