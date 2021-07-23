import React          from 'react';
import BasePanel      from '@/containers/BasePanel';
import Label          from '@/components/Label';

import { Modal, Button, Avatar, Divider } from 'antd';

import { CloudDownloadOutlined } from '@ant-design/icons';

import MissingForm from '@/formclasses/missing';

import PDFMissing from '@/components/PDFMissing';
import * as htmlToImage from 'html-to-image';
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image';
import { QRCode } from 'react-qrcode-logo';
import { saveAs } from 'file-saver';

class ModalMissing extends BasePanel{
	constructor(props) {
		super(props);

		this.state = {
			open: false
		}

		this.mascotaData = this.props.mascotaData;

		this.download = this.download.bind(this);
		this.onValuesChange = this.onValuesChange.bind(this);
		this.open = this.open.bind(this);
		this.close = this.close.bind(this);

		this.node = React.createRef();

		this.refFormMissing = React.createRef();
		this.refLabelDescripcion = React.createRef();
		this.refLabelUser = React.createRef();
		this.refLabelPhones = React.createRef();
	}

	componentDidMount() {
		//this.node = document.getElementById('my-node');
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
		this.refLabelUser.current.setText("wilfer ciro");
		this.refLabelPhones.current.setText("3173587462 - 3117986061");
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
				>
				<img src={this.state.image} />
				<div className="perdido-container">
					<div>
						<h3 className="landing-title">Controles</h3>
						<MissingForm
							vertical={true}
							onValuesChange={this.onValuesChange}
							ref={this.refFormMissing}
							initialValues={{
								"nombre" : this.mascotaData ? this.mascotaData["user__nombre"] : "",
								"celulares" : this.mascotaData ? this.mascotaData["user__celular1"] + " - " + this.mascotaData["user__celular2"] : "",
								"descripcion" : this.mascotaData ? this.mascotaData["descripcion_desaparecido"] : ""
							}}
							 />

						<Divider />
						<Button type="primary" icon={<CloudDownloadOutlined />} onClick={this.download}>Descargar</Button>
					</div>
					<div id="my-node" className="perdido-cartel" ref={this.node}>
						<div className="perdido-cartel-qr">
							<QRCode value="Puto el que lo escanee" size={100} />
						</div>
						<h2 className="landing-title">MASCOTA PERDIDA</h2>
						<h4 className="landing-title">SOMBRA · CRIOLLO</h4>
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
				</div>
			</Modal>
		);
	}
}

export default ModalMissing;