/**
	* Creado por Wilfer Daniel Ciro Maya - 2021
**/

// Custom classes
import Constant           from '@/components/Constant';
import BasePanel          from '@/containers/BasePanel';
import BaseFormComponent  from '@/formcomponents/BaseFormComponent';

// Ant components and icons
import {
	Select,
	Form
} from 'antd';
const { Option } = Select;

class FormSelect extends BaseFormComponent{
	constructor(props) {
		super(props);

		// Props
		this.service = props.service;

		// Methods
		this.searchService       = this.searchService.bind(this);
	}

	componentDidMount() {
		if (this.service) {
			this.searchService();
		}
	}

	async searchService() {
		let body = {}
		let data = await BasePanel.service.apiSend({
			method: "GET",
			register: this.service,
			model: "select",
			body: body
		});

		if(data["code"] === 200) {
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
