
/**
	* Creado por Wilfer Daniel Ciro Maya - 2021
**/

// Custom classes
import BaseFormStructure from '@/formclasses/BaseFormStructure';

class SuscribirForm  extends BaseFormStructure{
	constructor(props) {
		super(props);

		// Variables
		this.fields = [
			{type: "email", container: 3, size: 12, id: "email", placeholder: "Correo electrónico", required: true}
		];
	}
}

export default SuscribirForm;
