import BasePanel      from '@/containers/BasePanel';
import { Result, Button } from 'antd';

class Custom404 extends BasePanel {

	render() {

		return (
			<Result
				status="404"
				title="404"
				subTitle="Lo sentimos, esta página no existe."
				extra={<Button type="primary">Volver al inicio</Button>}
			/>
		)
	}
}
export default Custom404;
