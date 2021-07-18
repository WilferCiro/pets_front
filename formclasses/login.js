import React             from 'react';
import BaseFormStructure from '@/formclasses/BaseFormStructure';

class LoginFormStructure  extends BaseFormStructure{
	constructor(props) {
		super(props);

		this.fields = [
			{type: "text", container: 1, size: 12, id: "username", placeholder: "Nombre de usuario", required: true, max: 20},
			{type: "password", container: 2, size: 12, id: "password", placeholder: "Contraseña", required: true, max: 20}
		];
	}
}

export default LoginFormStructure;
