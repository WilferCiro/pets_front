import React             from 'react';
import BaseFormStructure from '@/formclasses/BaseFormStructure';

class RecoverPassForm  extends BaseFormStructure{
	constructor(props) {
		super(props);

		this.fields = [
			{type: "email", container: 1, size: 12, id: "email", label: "Correo electrónico", required: true}
		];
	}
}

export default RecoverPassForm;
