/**
	* Creado por Wilfer Daniel Ciro Maya - 2021
**/

// Custom classes
import BaseFormStructure from '@/formclasses/BaseFormStructure';

class FilterDesaparecidoForm extends BaseFormStructure{
	constructor(props) {
		super(props);

		// Variables
		this.fields = [
			{type: "select_query", container: 1, size: 12, id: "ciudad_desaparecido", label: "Ciudad", required: false, service: "ciudad"}
		];
	}
}

export default FilterDesaparecidoForm;
