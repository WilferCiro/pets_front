import React          from 'react';
import BasePanel      from '@/containers/BasePanel';
import Constant       from '@/components//Constant';
import Image from 'next/image'
import Link from 'next/link'

class Product extends BasePanel{
	constructor(props) {
		super(props);
		this.state = {
			producto : this.props.producto
		}
	}
	componentDidMount() {
	}

	render() {
		return (
			<div className="product">
				<div>
					<button className="product-btn-properties">!</button>
					<div className="product-properties">Presentación: 10 unidades</div>
				</div>
				<div className="product-seller">
					<Link href={`/empresa/${this.state.producto.empresa__id}/${encodeURIComponent(this.state.producto.empresa__nombre)}`} replace>
						<a onClick={(event) => {
									event.preventDefault();
									this.redirectPage(this.constants.empresa_profile, this.constants.empresa_profile_alias.formatUnicorn({
										0: this.state.producto.empresa__pk,
										1: encodeURIComponent("".removeAccents(this.state.producto.empresa__nombre))
									})
							)}}>
							{this.state.producto.empresa__nombre}
						</a>
					</Link>
				</div>
				<div className="product-image">
					{
						(this.state.producto.fotos.length === 0) ?
							<div key={Math.random()}>
								<Image
									src={this.constants.img_producto_empty}
									alt={"foto del producto"}
									width={200}
									height={200}
									layout={"responsive"}
									/>
							</div>
						:
						<div key={Math.random()}>
							<Image
								src={this.constants.getServer() + this.state.producto.fotos[0].foto}
								alt={this.state.producto.fotos[0].descripcion}
								width={200}
								height={200}
								layout={"responsive"}
								/>
							</div>
					}
				</div>
				<b>{this.state.producto.nombre}</b><br />
				<div className="product-footer">
					<div className="precio">
						<label className="precio-actual">$ {this.state.producto.precio_iva}</label>
						<label className="precio-original">$ 8000</label>
					</div>
					<div className="center-vertical">
						<button>Vista previa</button>
					</div>
				</div>
			</div>
		);
	}
}

export default Product;
