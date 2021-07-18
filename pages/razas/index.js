import React          from 'react';
import BasePanel      from '@/containers/BasePanel';

// Form Components
import FacturacionFormStructure from '@/formclasses/facturacion';
import TableProductsFactura  from '@/containers/TableProductsFactura';

class RazasView extends BasePanel{
	constructor(props) {
		super(props);
	}

	componentDidMount() {
	}

	render() {

		return (
			<div className="page-center">
				Razas
			</div>
		);
	}
}

RazasView.getInitialProps = async ({query}) => {
	return {query};
}

export default RazasView;
