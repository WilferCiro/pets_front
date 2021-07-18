import React          from 'react';
import BasePanel      from '@/containers/BasePanel';

class VacunasView extends BasePanel{
	constructor(props) {
		super(props);
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

export default VacunasView;
