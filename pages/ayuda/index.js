import React          from 'react';
import BasePanel      from '@/containers/BasePanel';

class AyudaView extends BasePanel{
	constructor(props) {
		super(props);
	}

	componentDidMount() {
	}

	render() {

		return (
			<div className="page-center">
				somos una página sin ánimo de lucro que se preocupa por el bienestar de los kiwi peluditos, el propósito de esta página es tener toda la información sobre nuestras mascoticas recopilada con la que será fácil identificar a los peluditos si se llegan a extraviar. En el futuro esperamos poder generar códigos QR para imprimirlos en una plaquita que los peluditos llevarán, de esta manera cuando alguien se encuentre al peludito en la calle pueda tomarle foto al código y encontrar los datos necesarios para comunicarse contigo y tu peludito vuelva a casa
			</div>
		);
	}
}

AyudaView.getInitialProps = async ({query}) => {
	return {query};
}

export default AyudaView;
