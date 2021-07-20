import React              from 'react';
import BasePanel          from '@/containers/BasePanel';
import RecoverPassForm    from '@/formclasses/recover_pass';
import {Button, Divider, Alert}  from 'antd';

class RecoverView extends BasePanel{
	constructor(props) {
		super(props);
	}

	componentDidMount() {
	}

	render() {
		let token = this.props.token;
		return (
			<div className="page-center">

				<section className="landing-section">
					<div className="help-form">
						<h4 className="landing-h4 landing-title">Recuperar contraseña</h4>
						<Alert
							message="Información importante"
							description="Se enviará un correo electrónico con las instrucciones para recuperar la contraseña."
							type="info"
							showIcon
						/>
						<Divider />
						<RecoverPassForm vertical={true} />
						<Divider />
						<Button type="primary">Enviar instrucciones</Button>
					</div>
				</section>
				{token ? "Token puesto" : "No token"}

			</div>
		);
	}
}

RecoverView.getInitialProps = async ({query}) => {
	let token = query.token;
	return {query, token};
}

export default RecoverView;
