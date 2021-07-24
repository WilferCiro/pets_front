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
			{type: "text", container: 1, size: 12, id: "username", placeholder: "Nombre de usuario", required: true, max: 20},
			{type: "password", container: 2, size: 12, id: "password", placeholder: "Contraseña", required: true, max: 20}
		];
	}
}

export default LoginForm;
