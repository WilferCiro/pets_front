/**
	* Creado por Wilfer Daniel Ciro Maya - 2021
**/

// React Components
import React          from 'react';

// Custom classes
import BasePanel      from '@/containers/BasePanel';

// Third part
import YouTube from 'react-youtube';

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

		// References
		this.refVideo = React.createRef();
	}
	componentDidMount() {
	}

	close() {
		console.log(this.refVideo.current.resetPlayer());
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
		const opts = {
			height: '390',
			width: '100%',
			playerVars: {
				// https://developers.google.com/youtube/player_parameters
				autoplay: 0,
			},
		};
		return (
			<Modal width={700} centered title="Somos Kiwi Peluditos" visible={this.state.open} onOk={this.close} onCancel={this.close}>

				<YouTube ref={this.refVideo} videoId="fAMp8Np0okg" opts={opts} onReady={this._onReady} />

			</Modal>
		);
	}
}

export default VideoHome;
