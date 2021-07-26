/**
	* Creado por Wilfer Daniel Ciro Maya - 2021
**/

// NextJS libraries
import Image from 'next/image'

// Custom classes
import BasePanel      from '@/containers/BasePanel';
import ProductBase    from '@/components/ProductBase';

// Ant components and icons
import {
	Button,
	Space,
	Badge
} from 'antd';

class ProductCard extends ProductBase{
	constructor(props) {
		super(props);

	}

	render() {

		return (
			<div className="product-card">
				<Badge.Ribbon text="10% dcto">
					<div className="product-card-photo">
						<Image
							src={"http://127.0.0.1:8000/media/producto/1627238960/Amarillo-1.webp"}
							alt="HOLA MUNDO"
							layout="responsive"
							width="200"
							height="200"
							/>
					</div>
				</Badge.Ribbon>

				<div className="product-card-data">
					<h5>Collar metálico para gato</h5>
					<Space align="center" size="large">
						<Button type="primary">+ detalles</Button>
						<Space align="center">
							<p className="discount-price">$25.000</p>
							<p className="real-price">$30.000</p>
						</Space>
					</Space>
				</div>
			</div>
		);
	}
}

export default ProductCard;
