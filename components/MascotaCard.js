/**
	* Creado por Wilfer Daniel Ciro Maya - 2021
**/

// Custom classes
import BasePanel      from '@/containers/BasePanel';

// Ant components and icons
import {
	Card,
	Tag,
	Space,
	Skeleton
} from 'antd';
const { Meta } = Card;

class MascotaCard extends BasePanel{
	constructor(props) {
		super(props);

		// States
		this.state = {
			mascota : this.props.mascota
		}

		// Methods
		this.loading = this.props.loading;
	}

	render() {
		let mascota = this.state.mascota;

		if (this.loading) {
			return (
				<Card
					style={{ width: 300, marginTop: 16 }}
					>
					<Space>
						<Skeleton.Image style={{width: 260}} />
					</Space>
					<Skeleton loading={true} active />
				</Card>
			);
		}

		return (
			<Card
				key={Math.random()}
				style={{ width: "100%" }}
				cover={
					<img
						className="image-card"
						alt={mascota.foto.length > 0 ? mascota.foto[0].descripcion : "Foto de mascota"}
						src={mascota.foto.length > 0 ? mascota.foto[0].foto : "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"}
					/>
				}
				>
					<Meta
						title={<div>
								<a onClick={(e) => this.redirectPage(this.constants.route_profile_mascotas, {"pk" : mascota.pk})}>
									{mascota.nombre} - @{mascota.identificacion}
								</a>
							</div>
						}
						description={<div>
							{mascota.presentacion}
							{mascota.desaparecido ? <div><Tag color="red">Desaparecid@</Tag></div> : null}
						</div>}
					/>
			</Card>
		);
	}
}

export default MascotaCard;
