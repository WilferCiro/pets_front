/**
	* Creado por Wilfer Daniel Ciro Maya - 2021
**/

// React Components
import React          from 'react';

// Custom classes
import BasePanel      from '@/containers/BasePanel';

// Ant components and icons
import {
	Modal
} from 'antd';

class VideoHome extends BasePanel{
	constructor(props) {
		super(props);

		// States
		this.state = {
			open : false
		}

		// Methods
		this.open = this.open.bind(this);
		this.close = this.close.bind(this);
	}
	componentDidMount() {
	}

	close() {
		this.setState({
			open: false
		})
	}

	open() {
		this.setState({
			open: true
		})
	}

	render() {
		return (
			<Modal width={700} centered title="Somos Kiwi Peluditos" visible={this.state.open} onOk={this.close} onCancel={this.close}>
				<iframe width="100%" height="370px" src="https://www.youtube.com/embed/fAMp8Np0okg" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
			</Modal>
		);
	}
}

export default VideoHome;
