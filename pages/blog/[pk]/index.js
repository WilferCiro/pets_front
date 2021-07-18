import React          from 'react';
import BasePanel      from '@/containers/BasePanel';
import Constant       from '@/components/Constant';

import { Image, Result, Button } from 'antd';
import {ArrowLeftOutlined} from '@ant-design/icons';

class BlogProfileView extends BasePanel{
	constructor(props) {
		super(props);

	}

	componentDidMount() {
	}

	render() {
		let blog = this.props.blog;
		if(!blog) {
			return (
				<Result
					//icon={<InboxOutlined />}
					title="Esta mascota no existe"
					extra={<Button type="primary">Volver atrás</Button>}
				/>
			);
		}


		return (
			<div>
				<Button icon={<ArrowLeftOutlined />} primary>Atrás</Button>
				<br />
				<br />
				<Image
					width={"100%"}
					src={blog.portada}
					placeholder={
						<p>Cargando...</p>
					}
				/>
				<h2>{blog.titulo}</h2>
				<div className="content" dangerouslySetInnerHTML={{__html: blog.cuerpo}}></div>
				<p>Modificado: {blog.fecha_modificacion} por {blog.usuario}</p>
			</div>
		);
	}
}

BlogProfileView.getInitialProps = async ({query, req, pathname}) => {
	let blog = null;
	let [_blogs] = await Promise.all([
		BasePanel.send(
		{
			endpoint: Constant.getPublicEndpoint() + "blog",
			method: 'GET',
			token: true,
			body: {
				"modelo" : "todo",
				"campos" : {
					"pk" : 1
				}
			}
		}),
	]);
	if(_blogs["estado_p"] === 200) {
		blog = _blogs["data"][0];
	}
	return {query, blog};
}

export default BlogProfileView;

//<img className="carousel-foto" src={foto["foto"]} />
