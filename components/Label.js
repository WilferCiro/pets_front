import React          from 'react';
import BasePanel      from '@/containers/BasePanel';
import Constant       from '@/components//Constant';

class Label extends BasePanel{
	constructor(props) {
		super(props);
		this.state = {
			text : this.props.text
		}
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
