/**
	* Creado por Wilfer Daniel Ciro Maya - 2021
**/

// React Components
import React          from 'react';

// Custom classes
import AddMascotaForm from '@/formclasses/add_mascota';
import MascotaCard    from '@/components/MascotaCard';
import BasePanel      from '@/containers/BasePanel';

// Ant components and icons
import {
	Card,
	Skeleton,
	Space,
	Result,
	Button,
	List,
	message,
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
		this.refFormAdd = React.createRef();
	}

	componentDidMount() {
		this.searchMascotas(1);

		this.setBreadCrumb([{"label" : "Mascotas desaparecidas"}])
	}

	async searchMascotas(page) {
		let body = {
			"cantidad" : this.pageSize,
			"page" : page,
			"modelo" : "perdidas",
			"ordenar_por" : "-pk"
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

		if(this.state.mascotas.length === 0) {
			return (
				<Result
					icon={<InboxOutlined />}
					title="No hay mascotas reportadas como desaparecidas"
				/>
			);
		}

		return (
			<div>
				<AddMascotaForm
					modal={true}
					vertical={false}
					ref={this.refFormAdd}
					modalOnOk={this.onAddMascota}
					initialValues={{
						"visible" : true
					}} />
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
PerdidasView.getPageName = () => {
	return "Mascotas Perdidas";
}
export default PerdidasView;
