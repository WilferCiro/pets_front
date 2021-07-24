/**
	* Creado por Wilfer Daniel Ciro Maya - 2021
**/

// Custom classes
import BaseFormComponent from '@/formcomponents/BaseFormComponent';

class FormLabel extends BaseFormComponent{
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="center-vertical" style={{height: "100%"}}>
				{
					(this.props.title) ?
					<h4 style={{margin: "0px"}}>{this.getLabel()}</h4>
					:
					this.getLabel()
				}
			</div>
		);
	}
}

export default FormLabel;
