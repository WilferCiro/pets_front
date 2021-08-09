/**
	* Creado por Wilfer Daniel Ciro Maya - 2021
**/

// Custom classes
import BaseFormStructure from '@/formclasses/BaseFormStructure';

class EditUserForm extends BaseFormStructure{
	constructor(props) {
		super(props);

		// Variables
		this.fields = [
			{type: "text", container: 1, size: 12, id: "first_name", label: "Nombres", required: true, max: 40},
			{type: "text", container: 2, size: 12, id: "last_name", label: "Apellidos", required: true, max: 40},
			{type: "cell", container: 3, size: 12, id: "celular1", label: "Celular 1"},
			{type: "cell", container: 4, size: 12, id: "celular2", label: "Celular 2"},
			{type: "cell", container: 5, size: 12, id: "telefono", label: "Teléfono"},
			{type: "text", container: 6, size: 12, id: "direccion", label: "Dirección"},
			{type: "select_query", container: 7, size: 12, id: "ciudad", label: "Ciudad residencia", service: "ciudad"},
			{type: "multiimage", container: 8, size: 12, id: "avatar", label: "Foto", required : false, maxCount: 1}
		];
	}
}

export default EditUserForm;
