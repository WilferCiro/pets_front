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
			{type: "select_query", container: 2, size: 6, id: "ciudad", label: "Ciudad", required : true, service: "ciudad"},
			{type: "cell", container: 2, size: 6, id: "celular1", label: "Celular", required: true},
			{type: "text", container: 3, size: 12, id: "direccion", label: "Dirección", max: 100, required : true},
			{type: "textarea", container: 5, size: 12, id: "adicional", label: "Observaciones adicionales", placeholder: "Escribenos información que consideres importante para el envío", rows : 2, max: 400},
		];
	}
}

export default PayDataForm;
