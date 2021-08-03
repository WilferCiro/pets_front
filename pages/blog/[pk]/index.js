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
				<p className="foot-entry">Modificado: {blog.fecha_modificacion} <br /> por {blog.usuario}</p>
			</div>
		);
	}
}

BlogProfileView.getInitialProps = async ({query, req, pathname}) => {
	let blog = query.pk || 1;
	let [_blogs] = await Promise.all([
		BasePanel.service.apiSend({
			method: "GET",
			register: "blog",
			model: "todo",
			showLoad: false,
			aditional: [blog]
		})
	]);
	if(_blogs["success"]) {
		blog = _blogs["data"];
		blog["fecha_modificacion"] = blog["fecha_modificacion"].formatDateTime();
	}
	return {query, blog};
}
BlogProfileView.getPageName = () => {
	return "Entrada de blog";
}
export default BlogProfileView;
