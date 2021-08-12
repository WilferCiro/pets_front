/**
	* Creado por Wilfer Daniel Ciro Maya - 2021
**/

// React Components
import React, {useState, useRef} from 'react';

// Custom classes
import BasePanel      from '@/containers/BasePanel';

// Third part
import YouTube from 'react-youtube';

// Ant components and icons
import {
	Modal
} from 'antd';

function VideoHome({forwardRef}) {
	const [visible, setVisible] = useState(false);
	const refVideo = useRef(null);


	const close = () => {
		refVideo.current.resetPlayer();
		setVisible(false);
	}

	const open = () => {
		setVisible(true);
	}

	forwardRef(open);

	const opts = {
		height: '390',
		width: '100%',
		playerVars: {
			// https://developers.google.com/youtube/player_parameters
			autoplay: 0,
		},
	};

	return (
		<Modal width={700} centered title="Somos Kiwi Peluditos" visible={visible} onOk={close} onCancel={close}>

			<YouTube ref={refVideo} videoId="fAMp8Np0okg" opts={opts} />

		</Modal>
	);
}

export default VideoHome;
