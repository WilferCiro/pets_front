/**
	* Creado por Wilfer Daniel Ciro Maya - 2021
**/

// Custom classes
import BaseFormStructure from '@/formclasses/BaseFormStructure';

class EditPedidoForm extends BaseFormStructure{
	constructor(props) {
		super(props);

		let opciones =[
			{"value" : "1", "label" : "En espera de pago"},
			{"value" : "2", "label" : "En preparación / Fabricación"},
			{"value" : "3", "label" : "Paquete despachado"},
			{"value" : "4", "label" : "Paquete en camino"},
			{"value" : "5", "label" : "Paquete entregado"},
		];

		// Variables
		this.fields = [
			{type: "select", container: 1, size: 12, id: "estado", label: "Estado", options: opciones},
			{type: "url", container: 1, size: 12, id: "url_guia", label: "URL de guía", max: 300},
			{type: "text", container: 1, size: 12, id: "nro_guia", label: "Número de guía", max: 20},
			{type: "datetime", container: 1, size: 12, id: "fecha_llegada", label: "Fecha de llegada", showTime: false},
			{type: "switch", container: 1, size: 12, id: "cancelado", label: "¿Cancelado?"},
		];
	}
}

export default EditPedidoForm;
