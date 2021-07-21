import React             from 'react';
import BaseFormStructure from '@/formclasses/BaseFormStructure';

class SignUpForm  extends BaseFormStructure{
	constructor(props) {
		super(props);

		this.fields = [
			{type: "text", container: 1, size: 12, id: "nombres", placeholder: "Nombre(s)", required: true, max: 40},
			{type: "text", container: 2, size: 12, id: "apellidos", placeholder: "Apellido(s)", required: true, max: 40},
			{type: "email", container: 3, size: 12, id: "email", placeholder: "Correo electrónico", required: true},
			{type: "password_repeat", container: 4, size: 12, id: "password"}
		];
	}
}

export default SignUpForm;
