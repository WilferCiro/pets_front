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
	Button
} from 'antd';
import {
	RightOutlined,
	LeftOutlined
} from '@ant-design/icons';

class ImageSlider extends BasePanel{
	constructor(props) {
		super(props);

		// Props
		this.fotos  = this.props.fotos;
		this.videos = this.props.videos;

		// References
		this.refCarousel = React.createRef();

		// Methods
		this.nextImage = this.nextImage.bind(this);
		this.prevImage = this.prevImage.bind(this);
		this.goToImage = this.goToImage.bind(this);
	}
	componentDidMount() {
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
									<div key={Math.random()} className="thumbnail" onClick={(e) => this.goToImage(index)}>
										<Image
											src={"http://127.0.0.1:8000/media/av/1627174875/WhatsApp_Image_2021-07-17_at_4.14.28_PM.webp"}
											alt="Video producto"
											layout="responsive"
											width="200"
											height="200"
											/>
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
