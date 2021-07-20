import React             from 'react';
import BaseFormStructure from '@/formclasses/BaseFormStructure';

class EditDesaparecidoFormStructure  extends BaseFormStructure{
	constructor(props) {
		super(props);

		this.fields = [
			//{type: "photo", id: "foto", label: "Foto"},
			{type: "datetime", container: 1, size: 12, id: "fecha_desaparecido", label: "Fecha desaparición", required: true},
			{type: "textarea", container: 1, size: 12, id: "descripcion_desaparecido", label: "Descripción", placeholder:"Describe la información de la desaparición, último lugar, características, etc.", max: 300, required : true}
		];
	}
}

export default EditDesaparecidoFormStructure;
