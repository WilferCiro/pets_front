import React          from 'react';
import BasePanel      from '@/containers/BasePanel';
import Constant       from '@/components//Constant';
import TextField from '@material-ui/core/TextField';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

class LabelJSON extends BasePanel{
	constructor(props) {
		super(props);

		this.state = {
			text : this.props.text
		}

		this.saveResponse = this.saveResponse.bind(this);
		this.refDetails = React.createRef();
	}
	componentDidMount() {
	}

	setText(value) {
		this.setState({
			text: value
		})
	}

	saveResponse() {
		let detalle = this.refDetails.current.text;
		this.props.saveResponse(this.state.text, detalle);
	}

	render() {
		return (
			<div>
				{
					(this.state.text !== undefined && this.state.text !== "") ?
					<div>
						<SyntaxHighlighter language="json">
							{JSON.stringify(this.state.text, null, 2) }
						</SyntaxHighlighter>
						<TextField
							id="filled-multiline-static"
							label="Observaciones de la respuesta"
							multiline
							fullWidth
							inputRef={this.refDetails}
							rows={4}
							defaultValue="Detalles"
							variant="filled"
						/><br />
					<br />
					<button className={"button button" + this.props.type} onClick={(e) => this.saveResponse()}>Guardar respuesta JSON</button>
					</div>
					:
					null
				}
			</div>
		);
	}
}

export default LabelJSON;
