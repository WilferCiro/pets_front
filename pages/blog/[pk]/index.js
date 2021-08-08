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
	Button,
	Divider
} from 'antd';
import {
	ArrowLeftOutlined
} from '@ant-design/icons';


class BlogProfileView extends BasePanel{
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		let dataBread = [];
		dataBread.push({
			"label" : "Blog",
			"route" : this.constants.route_blog,
		});
		dataBread.push({
			"label" : this.props.blog.titulo
		});
		this.setBreadCrumb(dataBread);
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
					width={1600}
					height={200}
				/>
				<div className="blog-content">
					<h2 className="landing-title">{blog.titulo}</h2>
					<p className="foot-entry">Modificado: {blog.fecha_modificacion} <br /> por {blog.usuario}</p>
					<Divider />
					<div className="content" dangerouslySetInnerHTML={{__html: blog.cuerpo}}></div>
					<Divider />
					<p className="foot-entry">Modificado: {blog.fecha_modificacion} <br /> por {blog.usuario}</p>
				</div>
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


		query["head"] = {
			"title" : blog["titulo"],
			"image" : blog["portada"],
			"description" : blog["descripcion"],
			"keywords" : blog["palabras_clave"]
		};

		query["structuredData"] = {
			"@context": "https://schema.org",
			"@type": "NewsArticle",
			"mainEntityOfPage": {
				"@type": "WebPage",
				"@id": Constant.getUrlFront() + "" + Constant.route_blog
			},
			"headline": blog["titulo"],
			"image": [
				blog["portada"]
			],
			"datePublished": blog["fecha_modificacion"],
			"dateModified": blog["fecha_modificacion"],
			"author": {
				"@type": "Person",
				"name": blog["usuario"]
			},
			"publisher": {
				"@type": "Organization",
				"name": "KiwiPeluditos",
				"logo": {
					"@type": "ImageObject",
					"url": "/images/favicon.png"
				}
			}
		}

		blog["fecha_modificacion"] = blog["fecha_modificacion"].formatDateTime();

	}
	return {query, blog};
}
BlogProfileView.getPageName = () => {
	return "Entrada de blog";
}
export default BlogProfileView;
