import React             from 'react';
import BaseFormStructure from '@/formclasses/BaseFormStructure';

class EmpresaFormStructure  extends BaseFormStructure{
	constructor(props) {
		super(props);

		this.fields = [
			//{type: "photo", id: "foto", label: "Foto"},
			{type: "text", id: "nombre", label: "Nombre",  required: true, max: 100},
			{type: "text", id: "nit", label: "Nit",  required: true, max: 100},
			{type: "text", id: "dane", label: "Dane",  required: true, max: 100},
			{type: "cell", id: "whatsapp", label: "Whatsapp"},
			{type: "cell", id: "celular", label: "Celular"},
			{type: "email", id: "email", label: "Email"},
			{type: "facebook_url", id: "facebook", label: "Facebook"},
			{type: "twitter_url", id: "twitter", label: "Twitter"},
			{type: "tiktok_url", id: "tiktok", label: "TikTok"},
			{type: "text", id: "direccion", label: "Dirección", max: 200},
			{type: "text", id: "descripcion", label: "Descripción", max: 200},
		]
	}
}

export default EmpresaFormStructure;
