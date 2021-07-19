import React              from 'react';
import BasePanel          from '@/containers/BasePanel';
import Constant           from '@/components/Constant';
import BaseFormComponent  from '@/formcomponents/BaseFormComponent';
import { Dropdown } from 'primereact/dropdown';
import { Select, Form } from 'antd';
const { Option } = Select;

class FormSelect extends BaseFormComponent{
	constructor(props) {
		super(props);

		this.service = props.service;


		this.searchService       = this.searchService.bind(this);
		this.succesSearchService = this.succesSearchService.bind(this);
	}

	componentDidMount() {
		if (this.service) {
			this.searchService();
		}
	}

	searchService() {
		let body = {
			"modelo" : "select"
		}
		this.send({
			endpoint: Constant.getPublicEndpoint() + this.service,
			method: 'GET',
			success: this.succesSearchService,
			body: body,
			showMessage : true
		});
	}
	succesSearchService(data) {
		console.log(",,,,", data);
		if(data["estado_p"] === 200) {
			let newData = [];
			for (let index in data["data"]) {
				newData.push({
					"label" : data["data"][index]["nombre"],
					"value" : data["data"][index]["pk"],
				});
			}

			this.setState({
				options: newData
			})
		}
	}


	render() {
		return (
			<Form.Item
				label={this.getLabel()}
				name={this.getName()}
				rules={this.getRules()}
				style={this.style}
			>
				<Select
					showSearch
					showArrow
					placeholder={this.getPlaceholder()}
					style={{ width: '100%' }}
					filterOption={(input, option) =>
						option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
					}
				>
				{
					(this.state.options).map((option, index) => {
						return <Option key={Math.random()} value={option.value}>{option.label}</Option>
					})
				}
				</Select>
			</Form.Item>
		);
	}
}

export default FormSelect;
