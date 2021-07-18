import React          from 'react';
import BasePanel      from '@/containers/BasePanel';
import Constant       from '@/components//Constant';
import TextField from '@material-ui/core/TextField';

class InputText extends BasePanel{
	constructor(props) {
		super(props);

		this.getValue = this.getValue.bind(this);
		this.ref = React.createRef();
		this.setValue = this.setValue.bind(this);
		this.valid = this.valid.bind(this);
	}
	componentDidMount() {
	}

	valid() {
		return true;
	}

	setValue(value) {
		this.ref.current.value = value;
	}

	getValue() {
		return (this.props.type == "F" || this.props.type == "I") ? parseInt(this.ref.current.value) : this.ref.current.value;
	}

	render() {
		return (
			<div className="">
				{
					<TextField
						inputRef={this.ref}
						defaultValue={this.props.defaultValue}
						placeholder={this.props.placeholder}
						label={this.props.label}
						fullWidth
						multiline={this.props.multiline !== true ? false : true}
						rows={this.props.rows !== undefined && this.props.rows !== null ? this.props.rows : 1}
						inputProps={(this.props.type == "F" || this.props.type == "I") ? { inputMode: 'numeric', pattern: (this.props.type === "F")? '[0-9].[0-9]*' : '[0-9]*', type: 'number' } : {}}
					/>
				}
			</div>
		);
	}
}

export default InputText;
