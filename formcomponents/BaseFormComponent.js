import React          from 'react';
import BasePanel      from '@/containers/BasePanel';

class BaseFormComponent extends BasePanel{
	constructor(props) {
		super(props);
		// Variables
		this.input            = React.createRef();
		this.label            = props["label"];
		this.placeholder      = props["placeholder"];
		this.id               = props["id"];
		this.max              = props["max"];
		this.min              = props["min"];
		this.required         = props["required"];
		this.regex            = props["regex"];
		this.disabled         = props["disabled"];
		this.name             = props["name"];
		this.inputType        = props["inputType"];
		this.tooltip          = props["tooltip"];

		this.state = {
			options : props.options ? props.options : [],
			errores : []
		};

		// Methods
		this.getValue         = this.getValue.bind(this);
		this.setValue         = this.setValue.bind(this);
		this.validate         = this.validate.bind(this);
		this.setOptions       = this.setOptions.bind(this);
		this.getOptions       = this.getOptions.bind(this);

		this.getID            = this.getID.bind(this);
		this.getLabel         = this.getLabel.bind(this);
		this.getPlaceholder   = this.getPlaceholder.bind(this);

		this.handleChange     = this.handleChange.bind(this);
		this.handleKeyPress   = this.handleKeyPress.bind(this);

		// User Functions
		this.onChange         = this.props.onChange;
		this.onEnter          = this.props.onEnter;
		this.getName          = this.getName.bind(this);
		this.getRules         = this.getRules.bind(this);

		this.style = {margin: "2px"};
	}

	getRules() {
		let data = [
			{required: this.required}
		]
		if(this.regex) {
			data.push({pattern : this.regex});
		}
		if(this.min) {
			data.push({min : this.min});
		}
		if(this.max) {
			data.push({max : this.max});
		}
		if(this.inputType) {
			data.push({type : this.inputType});
		}
		return data;
	}

	getName() {
		return this.name;
	}

	handleChange() {
		this.validate();
		if(this.onChange) {
			this.onChange();
		}
	}

	handleKeyPress(e) {
		if (e.key === 'Enter') {
			if(this.onEnter) {
				this.onEnter();
			}
		}
	}

	getPlaceholder() {
		return this.placeholder ? this.placeholder : this.label;
	}
	getLabel() {
		return this.label;
	}

	getID() {
		return this.id;
	}

	getOptions() {
		return this.state.options;
	}

	setOptions(options) {
		this.setState({
			options: options
		});
	}

	validate() {
		let valid = true;
		let errores = [];

		if (this.required === true && this.getValue() === "") {
			errores.push("Este campo es requerido");
			valid = false;
		}
		if (this.type === "FormCheckBox" && this.required === true && this.getValue() === false) {
			errores.push("Este campo es requerido");
			valid = false;
		}
		if (this.max && this.getValue().length > this.max && this.getValue() !== "") {
			errores.push("Este campo solo acepta " + this.max + " caracteres");
			valid = false;
		}
		if (this.min && this.getValue().length < this.min && this.getValue() !== "") {
			errores.push("Este campo necesita " + this.min + " caracteres");
			valid = false;
		}
		if (this.regex && !this.regex.test(this.getValue()) && this.getValue() !== "") {
			errores.push("Este campo no cumple con el formato deseado");
			valid = false;
		}

		if ((this.state.errores.length === 0 && errores.length > 0) || (this.state.errores.length !== errores)) {
			this.setState({
				errores : errores
			})
		}
		return valid;
	}

	getValue() {
		console.log(this.input.value)
		return 111;
		return this.input.current.state.value;
	}
	setValue(value) {
		//this.input.current.input.value = value;
	}
}

export default BaseFormComponent;
