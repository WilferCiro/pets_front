/**
	* Creado por Wilfer Daniel Ciro Maya - 2021
**/

// React Components
import React          from 'react';

// Custom classes
import BasePanel      from '@/containers/BasePanel';

class TiendaView extends BasePanel{
	constructor(props) {
		super(props);

		// Props

		// States

		// Methods

		// References
	}

	componentDidMount() {
	}

	render() {

		return (
			<div className="page-center">
				Tienda
			</div>
		);
	}
}

TiendaView.getInitialProps = async ({query}) => {
	return {query};
}
TiendaView.getPageName = () => {
	return "E-commerce";
}
export default TiendaView;
