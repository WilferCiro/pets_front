/**
	* Creado por Wilfer Daniel Ciro Maya - 2021
**/

// React Components
import React          from 'react';

// Custom classes
import BasePanel      from '@/containers/BasePanel';

import {
	Space,
	Divider,
	Tooltip,
	Button,
	Carousel,
	Row,
	Col,
	Card,
	Avatar
} from 'antd';
import {
	QuestionCircleFilled,
	LeftOutlined,
	RightOutlined
} from '@ant-design/icons';

const { Meta } = Card;

class RadioVariantesProducto extends BasePanel{
	constructor(props) {
		super(props);

		// props
		this.changeVariante = this.props.changeVariante;

		// States

		// Methods
		this.nextImage      = this.nextImage.bind(this);
		this.prevImage      = this.prevImage.bind(this);
		this.onChange       = this.onChange.bind(this);

		// Refs
		this.refCarousel = React.createRef();
	}

	prevImage() {
		this.refCarousel.current.prev();
	}

	nextImage() {
		this.refCarousel.current.next();
	}

	onChange(value) {
		this.changeVariante(value);
	}

	render() {
		let inOptions = this.props.options;
		let pk = this.props.pk;
		let size = 3;
		let options = [];
		let internal = [];
		for (let i = 0; i < inOptions.length; i ++) {
			internal.push(inOptions[i]);
			if (internal.length === size) {
				options.push(internal);
				internal = [];
			}
		}
		if(internal.length > 0){
			options.push(internal);
		}

		return (
			<div>
				{
					inOptions.length > 1?
					<div>
						<Space align="middle">
							<Tooltip title="Selecciona variantes de nuestro producto y llévate las que más te gusten">
								<Button size="small" type="link" icon={<QuestionCircleFilled key="copy-icon" />}></Button>
							</Tooltip>
							<b>También tenemos estas opciones:</b>
							{
								options.length > 1 ?
								<div>
									<Button size="small" onClick={this.prevImage} type="link" icon={<LeftOutlined />}></Button>
									<Button size="small" onClick={this.nextImage} type="link" icon={<RightOutlined />}></Button>
								</div>
								:
								null
							}
						</Space>
						<br />
						<Carousel dots={false} ref={this.refCarousel}>
							{
								options.map((opci, ind) => {
									return (
										<div key={Math.random()} className="div-variante">
											<Row gutter={[5, 5]}>
												{
													opci.map((item, index) => {
														return (
														<Col span={24 / size} key={Math.random()}>
															<Card size="small"
																key={Math.random()}
																className={item["pk"] === pk ? "card-variante card-variante-selected" : "card-variante"}
																style={{ width: "100%", height: "100%" }}
																onClick={(e) => this.changeVariante(item["value"])}
																>
																	<Meta
																		avatar={<Avatar size={"large"} src={item.foto} />}
																		description={<div className="descripcion-variante">
																			{item.label}
																		</div>}
																	/>
															</Card>
														</Col>
														)
													})
												}
											</Row>
										</div>
									)
								})

							}
						</Carousel>
					</div>
					:
					null
				}
			</div>
		);
	}
}

export default RadioVariantesProducto;
