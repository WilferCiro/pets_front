import React             from 'react';
import BaseFormStructure from '@/formclasses/BaseFormStructure';

class AyudaFormStructure  extends BaseFormStructure{
	constructor(props) {
		super(props);

		this.fields = [
			//{type: "photo", id: "foto", label: "Foto"},
			{type: "text", container: 1, size: 6, id: "nombre", label: "Nombre", required: true, max: 100},
			{type: "email", container: 1, size: 6, id: "email", label: "Correo electrónico", required: true, max: 100},
			{type: "text", container: 2, size: 12, id: "asunto", label: "Asunto", required: true, max: 100},
			{type: "textarea", container: 3, size: 12, id: "mensaje", label: "Mensaje", max: 200, min: 10, required : true},
		]
	}
}

export default AyudaFormStructure;
