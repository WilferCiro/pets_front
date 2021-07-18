import React          from 'react';
import BasePanel      from '@/containers/BasePanel';

import { List, Avatar, Space, Card, Skeleton, Row, Col } from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';



class BlogView extends BasePanel{
	constructor(props) {
		super(props);

		this.state = {
			blogs : null,
			paginator: null
		}

		this.searchBlogs        = this.searchBlogs.bind(this);
		this.successSearchBlogs = this.successSearchBlogs.bind(this);
	}

	componentDidMount() {
		this.searchBlogs(1);
	}

	searchBlogs(page) {
		let body = {
			"cantidad" : 10,
			"pagina" : page,
			"modelo" : "card"
		}
		this.send({
			endpoint: this.constants.getPublicEndpoint() + "blog",
			method: 'GET',
			success: this.successSearchBlogs,
			body: body,
			showMessage : true
		});
	}

	successSearchBlogs(data) {
		console.log(data);
		if(data["estado_p"] === 200) {

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
					extra={<Button type="primary">Registrar</Button>}
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
								<img
									width={200}
									height={100}
									alt="logo"
									src={item.portada}
								/>
							}
						>
							<List.Item.Meta
								avatar={<Avatar src={item.portada} size={60} />}
								title={<a onClick={(e) => this.redirectPage(this.constants.route_subblog, this.constants.route_subblog_alias.formatUnicorn({0:item.pk}))}>{item.titulo}</a>}
								description={"Modificado: " + item.fecha_modificacion + ", por: " + item.usuario}
							/>
						</List.Item>
						)}
					/>
			</div>
		);
	}
}

BlogView.getInitialProps = async ({query}) => {
	return {query};
}

export default BlogView;
