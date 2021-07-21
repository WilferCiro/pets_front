import React          from 'react';
import BasePanel      from '@/containers/BasePanel';

import { List, Avatar, Space, Card, Skeleton, Row, Col } from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';



class ConfirmView extends BasePanel{
	constructor(props) {
		super(props);

		this.state = {
			success: null
		}

		this.sendConfirmation        = this.sendConfirmation.bind(this);
		this.successSendConfirmation = this.successSendConfirmation.bind(this);
	}

	componentDidMount() {
		this.sendConfirmation();
	}

	sendConfirmation() {
		let body = {
			"pk" : this.props.user,
			"codigo_confirmado" : this.props.code,
			"modelo" : "confirmar"
		}
		this.send({
			endpoint: this.constants.getPublicEndpoint() + "user",
			method: 'PUT',
			success: this.successSendConfirmation,
			body: body,
			showMessage : true
		});
	}

	successSendConfirmation(data) {
		if(data["estado_p"] === 200) {
			this.setState({
				success: true
			});
		}
		else{
			this.setState({
				success: false
			});
		}
	}

	render() {

		if(this.state.success === null) {
			return (
				<div>
					Estamos validando la información
				</div>
			)
		}

		if(!this.state.success) {
			return (
				<div>
					Ocurrió un error al validar
				</div>
			)
		}

		return (
			<div>
				Datos validados con éxito
			</div>
		);
	}
}

ConfirmView.getInitialProps = async ({query}) => {
	let code = query.code;
	let user = query.user;
	return {query, user, code};
}

export default ConfirmView;
