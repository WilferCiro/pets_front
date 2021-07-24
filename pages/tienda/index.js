import React          from 'react';
import BasePanel      from '@/containers/BasePanel';


class TiendaView extends BasePanel{
	constructor(props) {
		super(props);
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
