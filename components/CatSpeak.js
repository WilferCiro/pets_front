/**
	* Creado por Wilfer Daniel Ciro Maya - 2021
**/

// React Components
import React          from 'react';

// NextJS libraries
import Image from 'next/image'

// Custom classes
import BasePanel      from '@/containers/BasePanel';

// Ant components and icons
import {
	Popconfirm,
	Tooltip
} from 'antd';

class CatSpeak extends BasePanel{
	constructor(props) {
		super(props);

		// Props
		this.text = this.props.text
	}

	render() {
		return (
			<div className="cat-speak">
				{/*<Tooltip zIndex={2} color="purple" visible={true} placement="left" title={this.text}  okText="Yes" cancelText={null}>*/}
					<div>
						<Image
							priority={true}
							alt="Gato Kiwi"
							src={this.constants.img_index_video}
							width={260}
							height={260}
							layout="fixed" />
					</div>
				{/*</Tooltip>*/}
			</div>
		);
	}
}

export default CatSpeak;
