import React             from 'react';
import BaseFormStructure from '@/formclasses/BaseFormStructure';

class EditUserForm extends BaseFormStructure{
	constructor(props) {
		super(props);

		this.fields = [
			//{type: "photo", id: "foto", label: "Foto"},
			{type: "text", container: 1, size: 12, id: "first_name", label: "Nombres", required: true, max: 20},
			{type: "text", container: 2, size: 12, id: "last_name", label: "Apellidos", required: true, max: 20},
			{type: "cell", container: 3, size: 12, id: "celular1", label: "Celular 1"},
			{type: "cell", container: 4, size: 12, id: "celular2", label: "Celular 2"},
			{type: "cell", container: 5, size: 12, id: "telefono", label: "Teléfono"},
			{type: "multiimage", container: 6, size: 12, id: "avatar", label: "Foto", required : false, maxCount: 1}
		];
	}
}

export default EditUserForm;
