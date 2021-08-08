/**
	* Creado por Wilfer Daniel Ciro Maya - 2021
**/

// React Components
import React          from 'react';

// Custom classes
import AddMascotaForm from '@/formclasses/add_mascota';
import MascotaCard    from '@/components/MascotaCard';
import BasePanel      from '@/containers/BasePanel';
import FilterDesaparecidoForm from '@/formclasses/filter_desaparecidos';

// Ant components and icons
import {
	Card,
	Skeleton,
	Space,
	Result,
	Button,
	List,
	message,
	Row,
	Col
} from 'antd';
import {
	InboxOutlined
} from '@ant-design/icons';


class PerdidasView extends BasePanel{
	constructor(props) {
		super(props);

		// Props

		// States
		this.state = {
			mascotas: null,
			paginator: null
		}

		// Variables
		this.pageSize = 12;

		// Methods
		this.searchMascotas        = this.searchMascotas.bind(this);

		// References
		this.refFormAdd          = React.createRef();
		this.refFormDesaparecido = React.createRef();
	}

	componentDidMount() {
		this.searchMascotas(1);

		this.setBreadCrumb([{"label" : "Mascotas desaparecidas"}])
	}

	async searchMascotas(page) {
		let ciudad = null;
		if (this.refFormDesaparecido.current) {
			let valid = await this.refFormDesaparecido.current.validate();
			if (!valid) {
				return;
			}

			ciudad = this.refFormDesaparecido.current.getValues()["ciudad_desaparecido"];
		}
		let body = {
			"page" : page,
			"ciudad" : ciudad
		}
		let data = await BasePanel.service.apiSend({
			method: "GET",
			register: "mascota",
			model: "perdidas",
			body: body
		});
		if(data["success"]) {
			this.setState({
				mascotas: data["data"],
				paginator: data["paginator"]
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

		let filterForm = <Row gutter={[20, 16]} align="top">
				<Col span={8}>
					<FilterDesaparecidoForm ref={this.refFormDesaparecido} />
				</Col>
				<Col span={12}>
					<Button type="primary" onClick={(e) => this.searchMascotas(1)}>Filtrar</Button>
				</Col>
			</Row>

		if(this.state.mascotas.length === 0) {
			return (
				<div>
					{filterForm}
					<Result
						icon={<InboxOutlined />}
						title="No hay mascotas reportadas como desaparecidas en esta ciudad"
					/>
				</div>
			);
		}

		return (
			<div>
				{filterForm}
				<List
					itemLayout="vertical"
					size="large"
					grid={{
						gutter: 8,
						xs: 1,
						sm: 1,
						md: 2,
						lg: 2,
						xl: 3,
						xxl: 4,
					}}
					pagination={{
						onChange: page => {
							this.searchMascotas(page);
						},
						total: this.state.paginator.total,
						pageSize: this.pageSize,
						position: "both"
					}}
					dataSource={this.state.mascotas}
					renderItem={mascota => (
						<List.Item
							key={Math.random()}
						>

							<MascotaCard mascota={mascota} />
						</List.Item>
						)}
					/>
			</div>
		);
	}
}


PerdidasView.getInitialProps = async ({query, req, pathname}) => {
	query["head"] = {
		"title" : "Mascotas desaparecidas",
		"description" : "No hay nada más triste que perder a un ser querido, encuentra nuestros peluditos desaparecidos y ayudanos a encontrarlos.",
		"keywords" : "kiwipeluditos, mascota, desaparecido, perdido, peludito"
	};
	return {query};
}

PerdidasView.getPageName = () => {
	return "Mascotas Perdidas";
}
export default PerdidasView;
