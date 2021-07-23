import React             from 'react';
import BaseFormStructure from '@/formclasses/BaseFormStructure';

class MissingForm  extends BaseFormStructure{
	constructor(props) {
		super(props);

		this.fields = [
			{type: "text", container: 5, size: 12, id: "nombre", label: "Nombre del dueño", placeholder:"Escribe el nombre del dueño", max: 40, required : true},
			{type: "text", container: 5, size: 12, id: "celulares", label: "Ingresa información de contacto", placeholder:"Celular1 - Celular2", max: 30, required : true},
			{type: "textarea", container: 5, size: 12, id: "descripcion", label: "Descripción", placeholder:"Escribe una descripción corta de la desaparición", max: 200, required : true},
		];
	}
}

export default MissingForm;
