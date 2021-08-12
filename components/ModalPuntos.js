/**
	* Creado por Wilfer Daniel Ciro Maya - 2021
**/

// React Components
import React, {useState}          from 'react';

// Custom classes
import BasePanel      from '@/containers/BasePanel';

// Ant components and icons
import {
	Modal,
} from 'antd';


function ModalPuntos({forwardRef}) {
	const [visible, setVisible] = useState(false);

	forwardRef(setVisible);

	const close = () => {
		setVisible(false);
	}

	const open = () => {
		setVisible(true);
	}

	return (
		<Modal centered title={"¿Cómo gano puntos en Kiwi Peluditos?"} visible={visible} onOk={close} onCancel={close}>
			<p>En Kiwi Peluditos puedes ganar puntos que puedes redimir por porcentaje de descuento en tus compras, puedes hacer esto cada mes con máximo 1000 puntos.</p>
			<p>Por ahora, la forma de obtener estos puntos es realizando compras, en un futuro esperamos ampliar estas posibilidades.</p>
		</Modal>
	)
}

export default ModalPuntos;
