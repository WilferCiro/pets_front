import React             from 'react';
import BaseFormStructure from '@/formclasses/BaseFormStructure';

class AddMascotaFormStructure  extends BaseFormStructure{
	constructor(props) {
		super(props);

		this.fields = [
			//{type: "photo", id: "foto", label: "Foto"},
			{type: "text", container: 1, size: 12, id: "nombre", label: "Nombre", placeholder: "Nombre de la mascota", required: true, max: 20},
			{type: "datetime", container: 4, size: 12, id: "fecha_nacimiento", label: "Fecha de nacimiento"},
			{type: "select", container: 4, size: 12, id: "tipo", label: "Tipo de mascota", service: "tipomascota", required : true},
			{type: "select", container: 4, size: 12, id: "raza", label: "Raza mascota", service: "raza"},
			{type: "switch", container: 4, size: 12, id: "visible", label: "¿Perfil público?", tooltip: "Selecciona 'No' si deseas que solo tu puedas ver esta mascota."},
			{type: "textarea", container: 5, size: 12, id: "presentacion", label: "Presentación", placeholder:"Escribe una presentación corta de tu mascota", disabled: true, max: 100, required : true},
			{type: "multiimage", container: 6, size: 12, id: "imagenes", label: "Imágenes", required : true, maxCount: 3}
		];
	}
}

export default AddMascotaFormStructure;
