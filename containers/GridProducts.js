import React          from 'react';
import BasePanel      from '@/containers/BasePanel';
import Constant       from '@/components//Constant';
import Product       from '@/components//Product';
//import { Carousel } from 'react-responsive-carousel';

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

// TODO: Optimizar si o si la carga dinámica de productos
const responsive = {
	superLargeDesktop: {
		// the naming can be any, depends on you.
		breakpoint: { max: 4000, min: 3000 },
		items: 5
	},
	desktop: {
		breakpoint: { max: 3000, min: 1024 },
		items: 4
	},
	tablet: {
		breakpoint: { max: 1024, min: 464 },
		items: 3
	},
	mobile: {
		breakpoint: { max: 464, min: 0 },
		items: 1
	}
};

class GridProducts extends BasePanel{
	constructor(props) {
		super(props);

		this.state = {
			productos : this.props.productos !== undefined && this.props.productos !== null ? this.props.productos : []
		};

	}
	componentDidMount() {
	}


	render() {
		return (
			<Carousel
				ssr={true}
				responsive={responsive}
				>
				{
					(this.state.productos).map((item, index2) => {
						return <Product
							producto={item}
							key={Math.random()} />
					})
				}
			</Carousel>
		);
	}
}

export default GridProducts;
