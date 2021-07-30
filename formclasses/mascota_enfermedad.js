/**
	* Creado por Wilfer Daniel Ciro Maya - 2021
**/

// Custom classes
import BaseFormStructure from '@/formclasses/BaseFormStructure';

class MascotaEnfermedadForm extends BaseFormStructure{
	constructor(props) {
		super(props);

		// Variables
		this.fields = [
			{type: "select", container: 5, size: 12, id: "enfermedad", label: "Enfermedad", service: "enfermedad", required : true},
			{type: "textarea", container: 5, size: 12, id: "descripcion", label: "Descripción adicional", required : false}
		];
	}
}

export default MascotaEnfermedadForm;
