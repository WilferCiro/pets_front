/**
	* Creado por Wilfer Daniel Ciro Maya - 2021
**/

// Custom classes
import BasePanel      from '@/containers/BasePanel';

// Ant components and icons
import { Result, Button } from 'antd';

function Custom404 () {
	return (
		<Result
			status="404"
			title="404"
			subTitle="Lo sentimos, esta página no existe."
			extra={<Button type="primary" onClick={(e) => this.redirectPage(this.constants.route_index)}>Volver al inicio</Button>}
		/>
	)
}
export default Custom404;
