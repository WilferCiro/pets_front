/**
	* Creado por Wilfer Daniel Ciro Maya - 2021
**/

// Custom classes
import BaseFormStructure from '@/formclasses/BaseFormStructure';

class LoginForm  extends BaseFormStructure{
	constructor(props) {
		super(props);

		// Variables
		this.fields = [
			{type: "text", container: 1, size: 12, id: "username", placeholder: "Correo electrónico", required: true, max: 50},
			{type: "password", container: 2, size: 12, id: "password", placeholder: "Contraseña", required: true, max: 40}
		];
	}
}

export default LoginForm;
