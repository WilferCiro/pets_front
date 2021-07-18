import React          from 'react';
import BasePanel      from '@/containers/BasePanel';

class PerdidasView extends BasePanel{
	constructor(props) {
		super(props);
	}

	componentDidMount() {
	}

	render() {

		return (
			<div className="page-center">
				Perdidas
			</div>
		);
	}
}

PerdidasView.getInitialProps = async ({query}) => {
	return {query};
}

export default PerdidasView;
