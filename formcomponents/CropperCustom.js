import React              from 'react';
import BasePanel          from '@/containers/BasePanel';
import BaseFormComponent  from '@/formcomponents/BaseFormComponent';
import Cropper from 'react-easy-crop'

class CropperCustom extends BaseFormComponent{
	constructor(props) {
		super(props);

		this.type = "CropperCustom";

		this.aspect    = props.aspect ? props.aspect : 1;
		this.cropShape = props.cropShape ? props.cropShape : "round";

		this.imageSrc = this.props.imageSrc;
		this.state.crop = { x: 0, y: 0 };
		this.state.zoom = 1;

		this.onCropChange = this.onCropChange.bind(this);
		this.onCropComplete = this.onCropComplete.bind(this);
		this.onZoomChange = this.onZoomChange.bind(this);
	}


	onCropChange(crop) {
		this.setState({ crop })
	}

	onCropComplete(croppedArea, croppedAreaPixels) {
		//console.log(croppedArea, croppedAreaPixels)
	}

	onZoomChange(zoom) {
		this.setState({ zoom })
	}

	render() {
		return (
			<div>
				<React.Fragment>
					<div className={"cropContainer"}>
						<Cropper
							image={this.imageSrc}
							zoom={this.state.zoom}
							aspect={this.aspect}
							cropShape={this.cropShape}
							crop={this.state.crop}
							onCropChange={this.onCropChange}
							onCropComplete={this.onCropComplete}
							onZoomChange={this.onZoomChange}
						/>
					</div>
					<div className={"cropContainer-controls"}>
						<input type="range" min="1" step={0.5} max="5" onChange={(e) => this.onZoomChange(e.target.value)} value={this.state.zoom} className="slider" id="myRange" />
					</div>
				</React.Fragment>
			</div>
		);
	}
}

export default CropperCustom;
