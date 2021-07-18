import React             from 'react';
import BaseFormStructure from '@/formclasses/BaseFormStructure';

class FacturacionProductoFormStructure  extends BaseFormStructure{
	constructor(props) {
		super(props);

		this.fields = [
			//{type: "photo", id: "foto", label: "Foto"},
			{type: "search", container: 1, size: 2, id: "codigo", placeholder: "Código", required: true, max: 20},
			{type: "text", container: 1, size: 2, id: "descripcion_producto", placeholder: "Descripción producto", disabled: true},
			{type: "price", container: 1, size: 2, id: "precio_iva", placeholder: "Precio con iva"},
			{type: "text", container: 1, size: 2, id: "cantidad", placeholder: "Cantidad"},
			{type: "percent", container: 1, size: 2, id: "iva", placeholder: "IVA", disabled: true, min: 0, max: 100},
			{type: "price", container: 1, size: 2, id: "total", placeholder: "Total", disabled: true},
		];
	}
}

export default FacturacionProductoFormStructure;
