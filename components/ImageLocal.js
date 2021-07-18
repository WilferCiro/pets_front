import React          from 'react';
import Carousel       from 'react-multi-carousel';
import BasePanel      from '@/containers/BasePanel';
import Image from 'next/image'


class ImageLocal extends BasePanel{
	constructor(props) {
		super(props);
		this.setImage    = this.setImage.bind(this);
		this.state = {
			image : this.props.image
		};
		this.showURL = this.props.showURL !== undefined && this.props.showURL !== null ? this.props.showURL : true;

		this.divClass = this.props.divClass;
	}

	setImage(image) {
		this.setState({image : image});
	}

	render() {
		return (
			<div>
				{
					(this.state.image !== null && this.state.image !== undefined && this.state.image["imagen"] !== null) ?
					(this.state.image["url"] !== undefined && this.state.image["url"] !== null && this.state.image["url"] !== "." && this.showURL) ?
						<div className={this.divClassName}>
							<a href={this.state.image["url"]} target="_blank">
								<Image
									src={this.state.image["imagen"]}
									alt={this.state.image["descripcion"]}
									width={this.props.width}
									height={this.props.height}
									layout={"responsive"}
									priority={this.props.priority !== null && this.props.priority !== undefined ? true : false}
									/>
							</a>
					</div>
					:
					<div  className={this.divClassName}>
						<Image
							src={this.state.image["imagen"]}
							alt={this.state.image["descripcion"]}
							width={this.props.width}
							height={this.props.height}
							layout={"responsive"}
							priority={this.props.priority !== null && this.props.priority !== undefined ? true : false}
							/>
					</div>
					:
					null
				}
			</div>
		);
	}
}

export default ImageLocal;
