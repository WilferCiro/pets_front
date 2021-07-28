/**
	* Creado por Wilfer Daniel Ciro Maya - 2021
**/

// Custom classes
import BaseFormStructure from '@/formclasses/BaseFormStructure';

class PayRegisterForm extends BaseFormStructure{
	constructor(props) {
		super(props);

		// Variables
		this.fields = [
			{type: "text", container: 1, size: 6, id: "nombres", label: "Nombre(s)", required: true, max: 40},
			{type: "text", container: 1, size: 6, id: "apellidos", label: "Apellido(s)", required: true, max: 40},
			{type: "select", container: 2, size: 6, id: "departamento", label: "Departamento", required : true},
			{type: "select", container: 2, size: 6, id: "ciudad", label: "Ciudad", required : true},
			{type: "text", container: 3, size: 12, id: "direccion", label: "Dirección", max: 100, required : true},
			{type: "password_repeat", container: 4, size: 12, label:"Contraseña", id: "password"},
			{type: "textarea", container: 5, size: 12, id: "adicional", label: "Observaciones adicionales", placeholder: "Escribenos información que consideres importante para el envío", rows : 2},
		];
	}
}

export default PayRegisterForm;
