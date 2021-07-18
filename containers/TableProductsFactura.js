import React          from 'react';
import BasePanel      from '@/containers/BasePanel';
import FormInputText  from '@/formcomponents/FormInputText';
import FacturacionProductoFormStructure from '@/formclasses/facturacion_productos';

class TableProductsFactura extends BasePanel{
	constructor(props) {
		super(props);
	}
	componentDidMount() {
	}


	render() {
		return (
			<div>
				<h3>Lista de productos</h3>
				<div className="">
					<FacturacionProductoFormStructure />

					<h4>Total: </h4>
				</div>
			</div>
		);
	}
}


export default TableProductsFactura;
