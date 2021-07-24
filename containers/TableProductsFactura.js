import React          from 'react';
import BasePanel      from '@/containers/BasePanel';
import FormInputText  from '@/formcomponents/FormInputText';

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

					<h4>Total: </h4>
				</div>
			</div>
		);
	}
}


export default TableProductsFactura;
