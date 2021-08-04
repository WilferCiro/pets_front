/**
	* Creado por Wilfer Daniel Ciro Maya - 2021
**/

// React Components
import React          from 'react';

// Custom classes
import BasePanel      from '@/containers/BasePanel';
import Label          from '@/components/Label';
import MissingForm    from '@/formclasses/missing';

// Third part libraries
import * as htmlToImage from 'html-to-image';
import { QRCode }       from 'react-qrcode-logo';
import { saveAs }       from 'file-saver';
import { toBlob }       from 'html-to-image';

// Ant components and icons
import { Modal, Button, Avatar, Divider, Row, Col } from 'antd';
import { CloudDownloadOutlined } from '@ant-design/icons';

class ModalMissing extends BasePanel{
	constructor(props) {
		super(props);

		// States
		this.state = {
			open: false
		}

		// References
		this.refLabelDescripcion = React.createRef();
		this.refFormMissing      = React.createRef();
		this.refLabelPhones      = React.createRef();
		this.refLabelUser        = React.createRef();
		this.node                = React.createRef();

		// Props
		this.mascotaData = this.props.mascotaData;

		// Methods
		this.onValuesChange = this.onValuesChange.bind(this);
		this.download       = this.download.bind(this);
		this.close          = this.close.bind(this);
		this.open           = this.open.bind(this);

	}

	open() {
		this.setState({
			open: true
		})
	}
	close() {
		this.setState({
			open: false
		})
	}

	download() {
		htmlToImage.toBlob(this.node.current, { quality: 1, canvasWidth: 1500, canvasHeight: 2100 })
		.then(function (dataUrl) {
			saveAs(dataUrl, "Cartel desaparición.png");
		})
		.catch(function (error) {
			console.error('oops, something went wrong!', error);
		});

	}

	onValuesChange() {
		let values = this.refFormMissing.current.getValues();
		this.refLabelDescripcion.current.setText(values["descripcion"]);
		this.refLabelUser.current.setText(values["nombre"]);
		this.refLabelPhones.current.setText(values["celulares"]);
	}

	render() {
		return (
			<Modal
				title="Cartel de desaparecido"
				centered
				visible={this.state.open}
				width={1000}
				onOk={this.close}
				onCancel={this.close}
				footer={[]}
				>
				<img src={this.state.image} />
				<Row gutter={[40, 1]} align="top">
					<Col xs={24} md={9}>
						<h3 className="landing-title">Controles</h3>
						<MissingForm
							vertical={true}
							onValuesChange={this.onValuesChange}
							ref={this.refFormMissing}
							initialValues={{
								"nombre" : this.mascotaData ? this.mascotaData["user__nombre"] : "",
								"celulares" : (this.mascotaData ? this.mascotaData["user__celular1"] + " - " + this.mascotaData["user__celular2"] : "").replaceAll("null", "").replaceAll(" - ", ""),
								"descripcion" : this.mascotaData ? this.mascotaData["descripcion_desaparecido"] : ""
							}}
							 />

						<Divider />
						<Button type="primary" icon={<CloudDownloadOutlined />} onClick={this.download}>Descargar</Button>
					</Col>
					<Col xs={24} md={15}>
						<div id="my-node" className="perdido-cartel" ref={this.node}>
							<div className="perdido-cartel-qr">
								<QRCode value="Puto el que lo escanee" size={100} />
							</div>
							<h2 className="landing-title">MASCOTA PERDIDA</h2>
							<h4 className="landing-title">{this.mascotaData["nombre"]} {this.mascotaData["raza_nombre"] ? " · " + this.mascotaData["raza_nombre"] : ""}</h4>
							<div className="avatar-user">
								<Avatar src={this.mascotaData && this.mascotaData["fotos"].length > 0 ? this.mascotaData["fotos"][0]["foto"] : ""} size={{ xs: 250, sm: 250, md: 250, lg: 250, xl: 300, xxl: 350 }}>
									A
								</Avatar>
							</div><br />
							<p><i><b>Fecha de desaparición: </b> {this.mascotaData && this.mascotaData["fecha_desaparecido"] ? this.mascotaData["fecha_desaparecido"].formatDateTime() : ""}</i></p>
							<Divider />
							<p className="text-uppercase">
								<Label
									ref={this.refLabelDescripcion}
									text={this.mascotaData ? this.mascotaData["descripcion_desaparecido"] : ""}
									/>
							</p>
							<p className="text-uppercase"><b>SI TIENES ALGUNA INFORMACIÓN, CONTACTA A:</b> <br />
								<Label
									ref={this.refLabelUser}
									text={this.mascotaData ? this.mascotaData["user__nombre"] : ""}
									/><br />
								<Label
									ref={this.refLabelPhones}
									text={this.mascotaData ? this.mascotaData["user__celular1"] + " - " + this.mascotaData["user__celular2"] : ""}
									/>
							</p>
							<Divider />
							<div className="perdido-cartel-footer">
								<p>Visita <br /><i>www.kiwipeluditos.com/mascota/{this.mascotaData["pk"]}</i><br /> para más información	</p>
							</div>
						</div>
					</Col>
				</Row>
			</Modal>
		);
	}
}

export default ModalMissing;
