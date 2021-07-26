/**
	* Creado por Wilfer Daniel Ciro Maya - 2021
**/

// React Components
import React          from 'react';

// NextJS libraries
import Image from 'next/image'

// Custom classes
import BasePanel      from '@/containers/BasePanel';
import ProductBase    from '@/components/ProductBase';
import ProductCard    from '@/components/ProductCard';
import NumberSelector from '@/components/NumberSelector';

// Ant components and icons
import {
	Row,
	Col,
	Space,
	Button,
	Tag,
	Divider,
	Tabs,
	Carousel,
	InputNumber,
	Input,
	Badge
} from 'antd';
import {
	MinusOutlined,
	PlusOutlined
} from '@ant-design/icons';

const { TabPane } = Tabs;

class PreviewView extends ProductBase{
	constructor(props) {
		super(props);

		// Props

		// States

		// Methods

		// References
	}

	componentDidMount() {
		this.setBreadCrumb([{"label" : "Collar ..."}])
	}

	render() {
		return (
			<div>
				<Row gutter={[40, 16]} align="middle">
					<Col span={11}>

						<Row gutter={[5, 5]}>
							<Col span={6}>
								<div className="preview-image">
									<Image
										src={"http://127.0.0.1:8000/media/av/1627174875/WhatsApp_Image_2021-07-17_at_4.14.28_PM.webp"}
										alt="HOLA MUNDO"
										layout="responsive"
										width="200"
										height="200"
										/>
								</div>
								<div className="preview-image">
									<Image
										src={"http://127.0.0.1:8000/media/producto/1627238960/Amarillo-1.webp"}
										alt="HOLA MUNDO"
										layout="responsive"
										width="200"
										height="200"
										/>
								</div>
								<div className="preview-image">
									<Image
										src={"http://127.0.0.1:8000/media/av/1627174875/WhatsApp_Image_2021-07-17_at_4.14.28_PM.webp"}
										alt="HOLA MUNDO"
										layout="responsive"
										width="200"
										height="200"
										/>
								</div>
							</Col>
							<Col span={18}>
								<Badge.Ribbon color="green" text="10% dcto">
									<Carousel>
										<div className="preview-image">
											<Image
												src={"http://127.0.0.1:8000/media/av/1627174875/WhatsApp_Image_2021-07-17_at_4.14.28_PM.webp"}
												alt="HOLA MUNDO"
												layout="responsive"
												width="200"
												height="200"
												/>
										</div>
										<div className="preview-image">
											<Image
												src={"http://127.0.0.1:8000/media/producto/1627238960/Amarillo-1.webp"}
												alt="HOLA MUNDO"
												layout="responsive"
												width="200"
												height="200"
												/>
										</div>
									</Carousel>
								</Badge.Ribbon>
							</Col>
						</Row>
					</Col>
					<Col span={12}>
						<h2>Collar metálico para gato</h2>
						<Space align="center" size="large">
							<Tag color="purple">Nuevo</Tag>
							<Space align="center">
								<p className="discount-price">$25.000</p>
								<p className="real-price">$30.000</p>
							</Space>
						</Space>
						<br />
						<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat</p>
						<Space align="center" size="large">
							<p>SKU: </p>
							<p>CMPG-1</p>
						</Space>

						<div style={{width: "30%"}}>
						<NumberSelector />
						</div>
					</Col>
				</Row>
				<Divider />
				<Tabs defaultActiveKey="1">
					<TabPane tab="Descripción" key="1">
						Content of Tab Pane 1
					</TabPane>
					<TabPane tab="Documentos" key="2">
						Content of Tab Pane 2
					</TabPane>
				</Tabs>
				<Divider />

				<Row gutter={[40, 16]}>
					<Col span={6}>
						<ProductCard />
					</Col>
					<Col span={6}>
						<ProductCard />
					</Col>
					<Col span={6}>
						<ProductCard />
					</Col>
					<Col span={6}>
						<ProductCard />
					</Col>
				</Row>
			</div>
		);
	}
}
PreviewView.getInitialProps = async ({query}) => {
	return {query};
}
PreviewView.getPageName = () => {
	return "Producto";
}
export default PreviewView;
