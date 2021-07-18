import React              from 'react';
import BasePanel          from '@/containers/BasePanel';
import BaseFormComponent  from '@/formcomponents/BaseFormComponent';
import ImageUploading     from "react-images-uploading";
import CropperCustom      from '@/formcomponents/CropperCustom';

class FormImage extends BaseFormComponent{
	constructor(props) {
		super(props);

		this.state.imageList = [];

		this.multiple  = props.multiple ? props.multiple : false;
		this.maxNumber = props.multiple ? props.multiple : 1;
		this.aspect    = props.aspect ? props.aspect : 1;
		this.cropShape = props.cropShape ? props.cropShape : "round";

		this.type = "FormImage";
		this.onChange = this.onChange.bind(this);
	}

	onChange(imageList, addUpdateIndex) {
		this.setState({
			imageList: imageList
		})
	}

	render() {
		return (
			<div className="input-text">
				<ImageUploading
					multiple={this.multiple}
					value={this.state.images}
					onChange={this.onChange}
					dataURLKey="data_url"
					maxNumber={this.maxNumber}
				>
				{({
					imageList,
					onImageUpload,
					onImageRemoveAll,
					onImageUpdate,
					onImageRemove,
					isDragging,
					dragProps
				}) => (
					<div className="upload__image-wrapper">
						<div className={isDragging ? "form-image-dropper form-image-dropper-drag" : "form-image-dropper"}
							onClick={onImageUpload}
							{...dragProps}
						>
							Selecciona o arrastra aquí.
						</div>
						<div className="form-image-list">
							{this.state.imageList.map((image, index) => (
								<div key={Math.random()} className="image-item">
									<button onClick={() => onImageRemove(index)}>Remove</button>
									<CropperCustom cropShape={this.cropShape} aspect={this.aspect} imageSrc={image["data_url"]} />
								</div>
							))}
						</div>
					</div>
				)}
			</ImageUploading>

			</div>
		);
	}
}

export default FormImage;
