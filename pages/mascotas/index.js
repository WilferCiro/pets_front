import React          from 'react';
import BasePanel      from '@/containers/BasePanel';
import { Card, Avatar, Skeleton, Space, Result, Button } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined, InboxOutlined } from '@ant-design/icons';

const { Meta } = Card;
class MascotasView extends BasePanel{
	constructor(props) {
		super(props);

		this.state = {
			mascotas: null
		}

		this.searchMascotas        = this.searchMascotas.bind(this);
		this.successSearchMascotas = this.successSearchMascotas.bind(this);
	}

	componentDidMount() {
		this.searchMascotas(1);
	}

	searchMascotas(page) {
		let body = {
			"cantidad" : 10,
			"pagina" : page,
			"modelo" : "card"
		}
		this.send({
			endpoint: this.constants.getPrivateEndpoint() + "mascota",
			method: 'GET',
			success: this.successSearchMascotas,
			body: body,
			showMessage : true,
			requires_token: true
		});
	}

	successSearchMascotas(data) {
		console.log(data);
		if(data["estado_p"] === 200) {
			this.setState({
				mascotas: data["data"]
			});
		}
	}

	render() {
		if (!this.state.mascotas) {
			return (
				<Card
					style={{ width: 300, marginTop: 16 }}
					>
					<Space>
						<Skeleton.Image style={{width: 260}} />
					</Space>
					<Skeleton loading={true} active />
					<Space>
						<Skeleton.Button active={true} size={"default"} shape={"default"} />
						<Skeleton.Button active={true} size={"default"} shape={"default"} />
						<Skeleton.Button active={true} size={"default"} shape={"default"} />
					</Space>
				</Card>
			);
		}

		if(this.state.mascotas.length === 0) {
			return (
				<Result
					icon={<InboxOutlined />}
					title="No has inscrito tus mascotas, inscríbelas totalmente gratis y obtén su código QR para su propio collar"
					extra={<Button type="primary">Registrar</Button>}
				/>
			);
		}

		return (
			<div>
				<h2>Mis mascotas</h2>
				{
					(this.state.mascotas).map((mascota, index) => {
						let foto = mascota.foto.length > 0 ? mascota.foto[0] : null;
						return <Card
							key={Math.random()}
							style={{ width: 300 }}
							cover={
								<img
									className="image-card"
									alt={foto ? foto.descripcion : "Foto de mascota"}
									src={foto ? foto.foto : "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"}
								/>
							}
							actions={[
								<SettingOutlined key="setting" />,
								<EditOutlined key="edit" />
							]}
							>
								<Meta
									title={<a onClick={(e) => this.redirectPage(this.constants.route_profile_mascotas, this.constants.route_profile_mascotas_alias.formatUnicorn({0:mascota.pk}))}>{mascota.nombre}</a>}
									description={mascota.presentacion}
								/>
						</Card>
					})
				}

			</div>
		);
	}
}

export default MascotasView;
