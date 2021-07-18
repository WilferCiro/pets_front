import React          from 'react';
import BasePanel      from '@/containers/BasePanel';
import Constant       from '@/components//Constant';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import ImageLocal from '@/components//ImageLocal'

class SliderImages extends BasePanel{
	constructor(props) {
		super(props);

		this.state = {
			images : this.props.images
		}
	}
	componentDidMount() {
	}

	render() {
		return (
			<Carousel
				autoPlay={true}
				showThumbs={false}
				infiniteLoop={true}
				showStatus={false}
				swipeable={true}
				verticalSwipe={'natural'}
				interval={7000}>
				{
					(this.state.images).map((item, index) => {
						return <div key={Math.random()}>
							<ImageLocal
								image={item}
								width={this.props.width}
								height={this.props.height}
								/>
						</div>
					})
				}
			</Carousel>
		);
	}
}

export default SliderImages;
