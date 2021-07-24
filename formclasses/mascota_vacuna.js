/**
	* Creado por Wilfer Daniel Ciro Maya - 2021
**/

// Custom classes
import BaseFormStructure from '@/formclasses/BaseFormStructure';

class MascotaVacunaForm extends BaseFormStructure{
	constructor(props) {
		super(props);

		// Variables
		this.fields = [
			{type: "text", container: 5, size: 12, id: "vacuna", label: "Vacuna", placeholder:"Escribe el nombre de la vacuna aplicada", max: 40, required : true},
			{type: "datetime", container: 5, size: 12, id: "fecha_aplicacion", label: "Fecha de aplicación", required : true}
		];
	}
}

export default MascotaVacunaForm;
