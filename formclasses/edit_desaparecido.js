/**
	* Creado por Wilfer Daniel Ciro Maya - 2021
**/

// Custom classes
import BaseFormStructure from '@/formclasses/BaseFormStructure';

class EditDesaparecidoForm extends BaseFormStructure{
	constructor(props) {
		super(props);

		// Variables
		this.fields = [
			{type: "datetime", container: 1, size: 12, id: "fecha_desaparecido", label: "Fecha desaparición", required: true},
			{type: "textarea", container: 1, size: 12, id: "descripcion_desaparecido", label: "Descripción", placeholder:"Describe la información de la desaparición, último lugar, características, etc.", max: 300, required : true}
		];
	}
}

export default EditDesaparecidoForm;
