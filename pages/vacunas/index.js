/**
	* Creado por Wilfer Daniel Ciro Maya - 2021
**/

// React Components
import React          from 'react';

// Custom classes
import BasePanel      from '@/containers/BasePanel';

class VacunasView extends BasePanel{
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
				VACUNAS
			</div>
		);
	}
}

VacunasView.getInitialProps = async ({query}) => {
	return {query};
}
VacunasView.getPageName = () => {
	return "Vacunas";
}
export default VacunasView;
