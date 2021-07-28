/**
	* Creado por Wilfer Daniel Ciro Maya - 2021
**/

// Custom classes
import BaseFormStructure from '@/formclasses/BaseFormStructure';

class PayEmailForm extends BaseFormStructure{
	constructor(props) {
		super(props);

		// Variables
		this.fields = [
			{type: "email", container: 1, size: 12, id: "email", label: "Correo electrónico", max: 100, required : true}
		];
	}
}

export default PayEmailForm;
