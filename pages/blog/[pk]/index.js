/**
	* Creado por Wilfer Daniel Ciro Maya - 2021
**/

// NextJS libraries
import Image from 'next/image'

// Custom classes
import BasePanel from '@/containers/BasePanel';
import Constant  from '@/components/Constant';

// Ant components and icons
import {
	Result,
	Button
} from 'antd';
import {
	ArrowLeftOutlined
} from '@ant-design/icons';


class BlogProfileView extends BasePanel{
	constructor(props) {
		super(props);
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
					className="image-card"
					src={blog.portada}
					alt={"Portada del blog"}
					layout='responsive'
					width={700}
					height={100}
				/>
				<h2 className="landing-title">{blog.titulo}</h2>
				<div className="content" dangerouslySetInnerHTML={{__html: blog.cuerpo}}></div>
				<p className="foot-entry">Modificado: {blog.fecha_modificacion.formatDateTime()} <br /> por {blog.usuario}</p>
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
BlogProfileView.getPageName = () => {
	return "Entrada de blog";
}
export default BlogProfileView;

//<img className="carousel-foto" src={foto["foto"]} />
