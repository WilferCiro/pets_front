/**
	* Creado por Wilfer Daniel Ciro Maya - 2021
**/

// Custom classes
import BaseFormStructure from '@/formclasses/BaseFormStructure';

class RecoverPassFinalForm  extends BaseFormStructure{
	constructor(props) {
		super(props);

		// Variables
		this.fields = [
			{type: "password_repeat", container: 1, size: 12, id: "password"}
		];
	}
}

export default RecoverPassFinalForm;
