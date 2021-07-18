import React          from 'react';
import BasePanel      from '@/containers/BasePanel';

class PDFDavinci extends BasePanel{
	constructor(props) {
		super(props);
		this.setUrl    = this.setUrl.bind(this);
		this.state = {
			url : this.props.url
		};
	}

	setUrl(url) {
		this.setState({url : url});
	}

	render() {
		return (
			<p><a href={this.state.url} target="_blank">Visualizar</a></p>
		);
	}
}

export default PDFDavinci;
