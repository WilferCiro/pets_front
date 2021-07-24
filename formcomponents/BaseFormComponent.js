/**
	* Creado por Wilfer Daniel Ciro Maya - 2021
**/

// React Components
import React          from 'react';

// Custom classes
import BasePanel      from '@/containers/BasePanel';

class BaseFormComponent extends BasePanel{
	constructor(props) {
		super(props);

		// Props
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
		this.onChange         = this.props.onChange;
		this.onEnter          = this.props.onEnter;

		// States
		this.state = {
			options : props.options ? props.options : [],
			errores : []
		};

		// References
		this.input            = React.createRef();

		// Methods
		this.setOptions       = this.setOptions.bind(this);
		this.getOptions       = this.getOptions.bind(this);
		this.getID            = this.getID.bind(this);
		this.getLabel         = this.getLabel.bind(this);
		this.getPlaceholder   = this.getPlaceholder.bind(this);
		this.getName          = this.getName.bind(this);
		this.getRules         = this.getRules.bind(this);

		// Variables
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
}

export default BaseFormComponent;
