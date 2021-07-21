import React             from 'react';
import BaseFormStructure from '@/formclasses/BaseFormStructure';

class EditPasswordForm extends BaseFormStructure{
	constructor(props) {
		super(props);

		this.fields = [
			//{type: "photo", id: "foto", label: "Foto"},
			{type: "password", container: 1, size: 12, id: "last_password", label: "Contraseña actual", required: true, max: 20},
			{type: "password_repeat", container: 2, size: 12, id: "password", label: "Contraseñas"}
		];
	}
}

export default EditPasswordForm;
