/**
	* Creado por Wilfer Daniel Ciro Maya - 2021
**/

// Custom classes
import BaseFormStructure from '@/formclasses/BaseFormStructure';

class PayDataForm extends BaseFormStructure{
	constructor(props) {
		super(props);

		// Variables
		this.fields = [
			{type: "text", container: 1, size: 6, id: "first_name", label: "Nombre(s)", required: true, max: 40},
			{type: "text", container: 1, size: 6, id: "last_name", label: "Apellido(s)", required: true, max: 40},
			{type: "select", container: 2, size: 6, id: "departamento", label: "Departamento", required : true, service: "departamento", update_select : "ciudad"},
			{type: "select", container: 2, size: 6, id: "ciudad", label: "Ciudad", required : true, service: "ciudad", service_index: "departamento__pk"},
			{type: "text", container: 3, size: 12, id: "direccion", label: "Dirección", max: 100, required : true},
			{type: "textarea", container: 4, size: 12, id: "adicional", label: "Observaciones adicionales", placeholder: "Escribenos información que consideres importante para el envío", rows : 2},
		];
	}
}

export default PayDataForm;
