/**
	* Creado por Wilfer Daniel Ciro Maya - 2021
**/

// React Components
import React, { useState, useEffect } from 'react';

// Custom classes
import BaseFormComponent   from '@/formcomponents/BaseFormComponent';

// Ant components and icons
import { Upload, Form }    from 'antd';
import { UploadOutlined }  from '@ant-design/icons';
import ImgCrop             from 'antd-img-crop';



const CroppedInput = ({ value = {}, onChange, maxCount=1, defaultFileList=[] }) => {
	const [fotos, setfotos] = useState(defaultFileList);

	useEffect(() => {
		triggerChange({
			fotos: fotos,
		});
	}, []);

	const triggerChange = (changedValue) => {
		onChange?.({
			fotos,
			...value,
			...changedValue,
		});
	};

	const onChange2 = (file) => {
		setfotos(file.fileList);
		triggerChange({
			fotos: file.fileList,
		});
	};

	return (
		<ImgCrop>
			<Upload listType="picture-card" maxCount={maxCount} onChange={e => onChange2(e)} defaultFileList={defaultFileList}>
				{fotos.length < maxCount && <UploadOutlined />}
			</Upload>
		</ImgCrop>
	);
};


class FormMultiImage extends BaseFormComponent{
	constructor(props) {
		super(props);

		// Methods
		this.checkValidator = this.checkValidator.bind(this);
	}

	checkValidator (_, value) {
		if(this.required === true && ((value !== undefined && value.fotos.length === 0) || value === undefined)){
			return Promise.reject(new Error('Por favor seleccione una imagen.'));
		}
		if ((value !== undefined && value.fotos.length > 0) || this.required === false) {
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
					<CroppedInput
						maxCount={this.props.maxCount || 1}
						defaultFileList={this.props.defaultFileList || []}
						/>
				</Form.Item>
			</div>
		);
	}
}

export default FormMultiImage;
