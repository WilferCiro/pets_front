/**
	* Creado por Wilfer Daniel Ciro Maya - 2021
**/

// Custom classes
import BaseFormStructure from '@/formclasses/BaseFormStructure';

class AyudaForm extends BaseFormStructure{
	constructor(props) {
		super(props);

		// Variables
		this.fields = [
			{type: "text", container: 1, size: 6, id: "nombre", label: "Nombre", required: true, max: 100},
			{type: "email", container: 1, size: 6, id: "email", label: "Correo electrónico", required: true, max: 100},
			{type: "text", container: 2, size: 12, id: "asunto", label: "Asunto", required: true, max: 100},
			{type: "textarea", container: 3, size: 12, id: "mensaje", label: "Mensaje", max: 200, min: 10, required : true},
		]
	}
}

export default AyudaForm;
