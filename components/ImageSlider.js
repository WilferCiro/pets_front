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
	Row,
	Col,
	Carousel,
	Button,
	Avatar
} from 'antd';
import {
	RightOutlined,
	LeftOutlined,
	VideoCameraFilled
} from '@ant-design/icons';

class ImageSlider extends BasePanel{
	constructor(props) {
		super(props);

		// Props


		// References
		this.refCarousel = React.createRef();

		// Methods
		this.nextImage      = this.nextImage.bind(this);
		this.prevImage      = this.prevImage.bind(this);
		this.goToImage      = this.goToImage.bind(this);
	}

	prevImage() {
		this.refCarousel.current.prev();
	}

	nextImage() {
		this.refCarousel.current.next();
	}

	goToImage(index) {
		this.refCarousel.current.goTo(index);
	}

	render() {
		this.fotos  = this.props.fotos;

		if (this.fotos.length === 0) {
			this.fotos = [{
				"foto" : this.constants.img_producto,
				"descripcion" : "Foto del producto"
			}];
		}

		this.videos = this.props.videos;
		
		return (
			<Row gutter={[5, 5]}>
				<Col span={4}>
					<div className="thumbnail-container">
						{
							(this.fotos).map((foto, index) => {
								return (
									<div key={Math.random()} className="thumbnail" onClick={(e) => this.goToImage(index)}>
										<Image
											src={foto["foto"]}
											alt="Foto producto"
											layout="responsive"
											width="200"
											height="200"
											/>
									</div>
								)
							})
						}
						{
							(this.videos).map((video, index) => {
								return (
									<div key={Math.random()} className="thumbnail" onClick={(e) => this.goToImage(this.fotos.length + index)}>
										<Avatar size={68} icon={<VideoCameraFilled className="icon-big" />} style={{ backgroundColor: '#BFB5E6' }} />
									</div>
								)
							})
						}
					</div>
				</Col>
				<Col span={20}>
					<div className="slider">
						<div className="slider-left-button slider-button">
							<Button type="primary" size={"large"} icon={<LeftOutlined />} onClick={this.prevImage}/>
						</div>
						<div className="slider-right-button slider-button">
							<Button type="primary" size={"large"} icon={<RightOutlined />} onClick={this.nextImage} />
						</div>
						<Carousel ref={this.refCarousel}>
							{
								(this.fotos).map((foto, index) => {
									return (
										<div key={Math.random()} className="preview-image">
											<Image
												src={foto["foto"]}
												alt="Foto producto"
												layout="responsive"
												width="200"
												height="200"
												/>
										</div>
									)
								})
							}
							{
								(this.videos).map((video, index) => {
									return (
										<div key={Math.random()} className="preview-image">
											<iframe width="100%" height="370px" src={"https://www.youtube.com/embed/" + video["url"].replace("https://www.youtube.com/watch?v=", "")} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
										</div>
									)
								})
							}
						</Carousel>
					</div>
				</Col>
			</Row>
		);
	}
}

export default ImageSlider;
