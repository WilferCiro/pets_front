/**
	* Creado por Wilfer Daniel Ciro Maya - 2021
**/

// React Components
import React          from 'react';

// Custom classes
import BasePanel      from '@/containers/BasePanel';

import {
	Radio,
	Space,
	Divider,
	Typography,
	Tooltip,
	Button
} from 'antd';
import {QuestionCircleFilled} from '@ant-design/icons';
const { Paragraph } = Typography;

class RadioMascotasProducto extends BasePanel{
	constructor(props) {
		super(props);

		// props

		// States
		this.state = {
			value : null
		}

		// Methods
		this.onChange = this.onChange.bind(this);
		this.getValue = this.getValue.bind(this);
	}


	onChange(value) {
		this.setState({
			value: value.target.value
		});
		if(this.props.changeMascota) {
			this.props.changeMascota(value.target.value);
		}
	}

	getValue() {
		return this.state.value
	}

	render() {
		let radioMascotas = this.props.options;
		return (
			<div>
				{
					radioMascotas.length > 0 ?
					<div>
						<Space direction="vertical">
							<Space align="middle">
								<Tooltip title="El producto será fabricado especialmente para la mascota seleccionada">
									<Button size="small" type="link" icon={<QuestionCircleFilled key="copy-icon" />}></Button>
								</Tooltip>
								<b>Selecciona una mascota</b>
							</Space>
							<Radio.Group
								onChange={this.onChange}
								options={radioMascotas}
								optionType="button"
								value={this.state.value}
							/>
						</Space>
					</div>
					:
					null
				}
			</div>
		);
	}
}

export default RadioMascotasProducto;
