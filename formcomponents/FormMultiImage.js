import React, { useState } from 'react';
import BasePanel           from '@/containers/BasePanel';
import BaseFormComponent   from '@/formcomponents/BaseFormComponent';
import { Upload, Form }    from 'antd';
import { UploadOutlined }  from '@ant-design/icons';
import ImgCrop             from 'antd-img-crop';



const CroppedInput = ({ value = {}, onChange }) => {
	const [fotos, setfotos] = useState([]);

	const triggerChange = (changedValue) => {
		onChange?.({
			fotos,
			...value,
			...changedValue,
		});
	};

	const onChange2 = (file) => {
		setfotos(file);

		triggerChange({
			fotos: file.fileList,
		});
	};

	return (
		<ImgCrop>
			<Upload listType="picture-card" maxCount={3} onChange={e => onChange2(e)}>
				<UploadOutlined />
			</Upload>
		</ImgCrop>
	);
};


class FormMultiImage extends BaseFormComponent{
	constructor(props) {
		super(props);

		this.checkValidator = this.checkValidator.bind(this);
	}

	checkValidator (_, value) {
		if (value !== undefined && value.fotos.length > 0) {
			return Promise.resolve();
		}
		return Promise.reject(new Error('Por favor seleccione una imagen'));
	};

	render() {
		return (
			<div>
				<Form.Item
					label={this.getLabel()}
					name={this.getName()}
					rules={[
						{
							validator: this.checkValidator,
						},
					]}
					style={this.style}
				>
					<CroppedInput />
				</Form.Item>
			</div>
		);
	}
}

export default FormMultiImage;
