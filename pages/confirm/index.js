/**
	* Creado por Wilfer Daniel Ciro Maya - 2021
**/
// Custom classes
import BasePanel from '@/containers/BasePanel';

class ConfirmView extends BasePanel{
	constructor(props) {
		super(props);

		// States
		this.state = {
			success: null
		}

		// Methods
		this.sendConfirmation        = this.sendConfirmation.bind(this);
	}

	componentDidMount() {
		this.sendConfirmation();
	}

	async sendConfirmation() {
		let body = {
			"codigo_confirmado" : this.props.code
		}
		let data = await BasePanel.service.apiSend({
			method: "PUT",
			register: "user",
			model: "confirmar",
			body: body,
			aditional: [this.props.user]
		});

		if(data["success"]) {
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
ConfirmView.getPageName = () => {
	return "Confirmación de correo";
}
export default ConfirmView;
