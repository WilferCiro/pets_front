import React             from 'react';
import BaseFormStructure from '@/formclasses/BaseFormStructure';

class RecoverPassFinalForm  extends BaseFormStructure{
	constructor(props) {
		super(props);

		this.fields = [
			{type: "password_repeat", container: 1, size: 12, id: "password"}
		];
	}
}

export default RecoverPassFinalForm;
