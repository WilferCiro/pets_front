/**
	* Creado por Wilfer Daniel Ciro Maya - 2021
**/

// Custom classes
import BaseFormStructure from '@/formclasses/BaseFormStructure';

class EditPasswordForm extends BaseFormStructure{
	constructor(props) {
		super(props);

		// Variables
		this.fields = [
			{type: "password", container: 1, size: 12, id: "last_password", label: "Contraseña actual", required: true, max: 20},
			{type: "password_repeat", container: 2, size: 12, id: "password", label: "Contraseñas"}
		];
	}
}

export default EditPasswordForm;
