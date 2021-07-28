/**
	* Creado por Wilfer Daniel Ciro Maya - 2021
**/

// NextJS libraries
import Image from 'next/image'
import Link from 'next/link'

// Custom classes
import BasePanel      from '@/containers/BasePanel';
import ProductBase    from '@/components/ProductBase';

// Ant components and icons
import {
	Button,
	Space,
	Badge,
	Tag
} from 'antd';

class ProductCard extends ProductBase{
	constructor(props) {
		super(props);

		// Props
		this.producto = this.props.product;

	}

	render() {

		if(!this.producto){
			return (<></>);
		}

		return (
			<div>
				<Link href={"/producto/" + this.producto.pk} passHref>
					<a>
						<div className="product-card">
							{
								(this.producto.promocion) ?
								<Badge.Ribbon text={this.producto.promocion + "% dcto"}>
									<div className="product-card-photo">
										<Image
											src={this.producto.fotos[0] ? this.producto.fotos[0].foto : "http://127.0.0.1:8000/media/producto/1627238960/Amarillo-1.webp"}
											alt={"Foto del artículo"}
											layout="responsive"
											width="200"
											height="200"
											/>
									</div>
								</Badge.Ribbon>
								:
								<div className="product-card-photo">
									<Image
										src={this.producto.fotos[0] ? this.producto.fotos[0].foto : "http://127.0.0.1:8000/media/producto/1627238960/Amarillo-1.webp"}
										alt={"Foto del artículo"}
										layout="responsive"
										width="200"
										height="200"
										/>
								</div>
							}


							<div className="product-card-data">
								<h5>{this.producto.nombre}</h5>
								<Space size="middle" direction="vertical">
									<Tag color="purple">{this.producto.marca}</Tag>
									<Space align="center">
										{
											(this.producto.promocion) ?
											<p className="discount-price">{this.producto.precio_original.formatPrice()}</p>
											:
											null
										}
										<p className="real-price">{this.producto.precio.formatPrice()}</p>
									</Space>
								</Space>
								{
									(this.producto.stock === 0) ?
									<p>Producto agotado</p>
									:
									null
								}
							</div>
						</div>
					</a>
				</Link>
			</div>
		);
	}
}

export default ProductCard;
