import React          from 'react';
import BasePanel      from '@/containers/BasePanel';

// Form Components

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
RazasView.getPageName = () => {
	return "Razas";
}
export default RazasView;
