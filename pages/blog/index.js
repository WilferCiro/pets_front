/**
	* Creado por Wilfer Daniel Ciro Maya - 2021
**/

// NextJS libraries
import Image from 'next/image'

// Custom classes
import BasePanel  from '@/containers/BasePanel';

// Ant components and icons
import {
	List,
	Avatar,
	Card,
	Skeleton,
	Row,
	Col,
	Button,
	Result
} from 'antd';
import {
	MessageOutlined,
	LikeOutlined,
	StarOutlined,
	InboxOutlined
} from '@ant-design/icons';

class BlogView extends BasePanel{
	constructor(props) {
		super(props);

		// States
		this.state = {
			blogs : null,
			paginator: null
		}

		// Methods
		this.searchBlogs        = this.searchBlogs.bind(this);
	}

	componentDidMount() {
		this.searchBlogs(1);
		let dataBread = [];
		dataBread.push({
			"label" : "Blog"
		});
		this.setBreadCrumb(dataBread);
	}

	async searchBlogs(page) {
		let body = {
			"page" : page
		}
		let data = await BasePanel.service.apiSend({
			method: "GET",
			register: "blog",
			model: "card",
			isPublic: true,
			body: body
		});
		if(data["success"]) {
			this.setState({
				blogs: data["data"],
				paginator: data["paginator"]
			});
		}
	}

	render() {

		if (!this.state.blogs) {
			return (
				<div>
					<Card
						style={{ marginTop: 16 }}
						>
						<Row  gutter={[40, 16]} align="middle">
							<Col span={18}>
								<Skeleton loading={true} active />
							</Col>
							<Col span={6}>
								<Skeleton.Image />
							</Col>
						</Row>
					</Card>
					<Card
						style={{ marginTop: 16 }}
						>
						<Row  gutter={[40, 16]} align="middle">
							<Col span={18}>
								<Skeleton loading={true} active />
							</Col>
							<Col span={6}>
								<Skeleton.Image />
							</Col>
						</Row>
					</Card>
				</div>
			);
		}

		if(this.state.blogs.length === 0) {
			return (
				<Result
					icon={<InboxOutlined />}
					title="No hay blogs"
					extra={<Button type="primary" onClick={this.goHome}>Volver al inicio</Button>}
				/>
			);
		}

		return (
			<div className="page-center">
				<List
					itemLayout="vertical"
					size="large"
					pagination={{
						onChange: page => {
							this.searchBlogs(page);
						},
						total: this.state.paginator.total,
						pageSize: 10,
					}}
					dataSource={this.state.blogs}
					renderItem={item => (
						<List.Item
							key={item.titulo}
							extra={
								<Image
									className="image-card"
									src={item.portada}
									alt={"Portada del blog"}
									layout='intrinsic'
									width={200}
									height={100}
								/>
							}
						>
							<List.Item.Meta
								avatar={<Avatar src={item.portada} size={60} />}
								title={<a onClick={(e) => this.redirectPage(this.constants.route_subblog, {"pk" : item.pk})}>{item.titulo}</a>}
								description={"Modificado: " + item.fecha_modificacion.formatDateTime() + ", por: " + item.usuario}
							/>
						</List.Item>
						)}
					/>
			</div>
		);
	}
}

BlogView.getInitialProps = async ({query}) => {
	query["head"] = {
		"title" : "Blog",
		"description" : "Bienvenido a nuestro blog, descubre información sobre tu peludito.",
		"keywords" : "kiwipeluditos, mascota, tienda, peludito, blog, información"
	};
	return {query};
}
BlogView.getPageName = () => {
	return "Blog";
}
export default BlogView;
