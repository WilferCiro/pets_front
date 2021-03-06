/**
	* Creado por Wilfer Daniel Ciro Maya - 2021
**/

// Custom classes
import BaseFormStructure from '@/formclasses/BaseFormStructure';

class AddMascotaForm extends BaseFormStructure{
	constructor(props) {
		super(props);

		// Variables
		this.fields = [
			{type: "text", container: 1, size: 12, id: "nombre", label: "Nombre", placeholder: "Nombre de la mascota", required: true, max: 20},
			{type: "datetime", container: 4, size: 12, id: "fecha_nacimiento", label: "Fecha de nacimiento", showTime: false, limitToday: true},
			{type: "select", container: 4, size: 12, id: "tipo", label: "Tipo de mascota", service: "tipo_mascota", required : true, update_select : "raza"},
			{type: "select", container: 4, size: 12, id: "raza", label: "Raza mascota", service: "raza_mascota", service_index: "tipo"},
			{type: "select", container: 4, size: 12, id: "sexo", label: "Sexo mascota", required: true, options: [{"value" : "M", "label" : "Macho"}, {"value" : "H", "label" : "Hembra"}]},
			{type: "switch", container: 4, size: 12, id: "visible", label: "¿Perfil público?", tooltip: "Selecciona 'No' si deseas mantener oculta la información de tu mascota."},
			{type: "textarea", container: 5, size: 12, id: "presentacion", label: "Presentación", placeholder:"Escribe una presentación corta de tu mascota", disabled: true, max: 100, required : true},
			{type: "multiimage", container: 6, size: 12, id: "imagenes", label: "Imágenes", required : true, maxCount: 3}
		];
	}
}

export default AddMascotaForm;
