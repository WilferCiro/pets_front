import React             from 'react';
import BaseFormStructure from '@/formclasses/BaseFormStructure';

class FacturacionFormStructure  extends BaseFormStructure{
	constructor(props) {
		super(props);

		this.fields = [
			//{type: "photo", id: "foto", label: "Foto"},
			{type: "label", title: true, container: 1, size: 3, id: "label_factura", label: "Datos de la factura"},
			{type: "text", container: 1, size: 2, id: "titulo", label: "Titulo", required: true, max: 100},
			{type: "text", container: 1, size: 2, id: "numero", label: "Número de factura",  required: true, max: 100},
			{type: "select", container: 1, size: 2, id: "forma_pago", label: "Forma de pago", defaultValue: "efectivo", options: [{"label" : "Efectivo", "value" : "efectivo"}]},
			{type: "select", container: 1, size: 2, id: "tamano_factura", label: "Tamaño de factura", defaultValue: "grande", options: [{"label" : "Grande", "value" : "grande"}]},

			{type: "label", title: true, container: 4, size: 3, id: "label_empresa", label: "Datos de la empresa"},

			{type: "text", container: 4, size: 2, id: "razon_social", label: "Razón social",  required: true, max: 100, disabled: true},
			{type: "text", container: 4, size: 2, id: "nit", label: "Nit Empresa", required: true, disabled: true},
			{type: "text", container: 4, size: 2, id: "direccion", label: "Dirección", required: false, disabled: true},
			{type: "text", container: 4, size: 2, id: "telefono", label: "Teléfono", required: false, disabled: true},

			{type: "label", title: true, container: 6, size: 3, id: "label_cliente", label: "Datos del cliente"},
			{type: "text", container: 6, size: 2, id: "nit_cliente", label: "Nit cliente"},
			{type: "text", container: 6, size: 2, id: "nombre_cliente", label: "Nombre cliente"},
			{type: "email", container: 6, size: 4, id: "email_cliente", label: "Correo electrónico"},

		];
	}
}

export default FacturacionFormStructure;
