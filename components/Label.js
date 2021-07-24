/**
	* Creado por Wilfer Daniel Ciro Maya - 2021
**/

// React Components
import React          from 'react';

// Custom classes
import BasePanel      from '@/containers/BasePanel';

class Label extends BasePanel{
	constructor(props) {
		super(props);

		// States
		this.state = {
			text : this.props.text
		}

		// Methods
		this.setText = this.setText.bind(this);
	}
	componentDidMount() {
	}

	setText(text) {
		this.setState({
			text: text
		})
	}

	render() {
		return (
			<React.Fragment>
				{
					(this.state.text === null && this.props.showLoading) ?
						<label className="loading-text">Cargando...</label>
					:
					(this.props.renderHTML) ?
					<span dangerouslySetInnerHTML={{
						__html: this.state.text
					}}/>
					:
					this.state.text
				}
			</React.Fragment>
		);
	}
}

export default Label;
