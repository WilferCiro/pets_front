import React              from 'react';
import BasePanel          from '@/containers/BasePanel';
import BaseFormComponent  from '@/formcomponents/BaseFormComponent';

class FormtextArea extends BaseFormComponent{
	constructor(props) {
		super(props);

		this.type = "FormtextArea";
	}

	render() {
		return (
			<div class="form-input-container">
				<textarea
					ref={this.input}
					className="form-textarea"
					placeholder={this.props.placeholder}
					defaultValue={this.props.defaultValue}
				>
				</textarea>
			</div>
		);
	}
}

export default FormtextArea;
