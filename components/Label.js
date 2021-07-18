import React          from 'react';
import BasePanel      from '@/containers/BasePanel';
import Constant       from '@/components//Constant';

class Label extends BasePanel{
	constructor(props) {
		super(props);
		this.state = {
			texto : this.props.texto
		}
		this.setText = this.setText.bind(this);
	}
	componentDidMount() {
	}

	setText(text) {
		this.setState({
			texto: text
		})
	}

	render() {
		let icon = this.props.icon;
		return (
			<React.Fragment>
				{icon}
				{
					(this.state.texto === null && this.props.showLoading) ?
						<label className="loading-text">Cargando...</label>
					:
					(this.props.renderHTML) ?
					<span dangerouslySetInnerHTML={{
						__html: this.state.texto
					}}/>
					:
					this.state.texto
				}
			</React.Fragment>
		);
	}
}

export default Label;
