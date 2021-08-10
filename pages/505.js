/**
	* Creado por Wilfer Daniel Ciro Maya - 2021
**/

// Custom classes
import BasePanel      from '@/containers/BasePanel';

// Ant components and icons
import { Result, Button } from 'antd';

class Custom404 extends BasePanel {

	render() {
		return (
			<Result
				status="505"
				title="505"
				subTitle="Lo sentimos, estamos presentando inconvenientes."
				extra={<Button type="primary" onClick={(e) => this.redirectPage(this.constants.route_index)}>Volver al inicio</Button>}
			/>
		)
	}
}
export default Custom404;
