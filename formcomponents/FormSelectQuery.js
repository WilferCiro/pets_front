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

class FormSelectQuery extends BaseFormComponent{
	constructor(props) {
		super(props);

		// Props
		this.service       = props.service;
		this.service_index = props.service_index;
		this.update_select = props.update_select;
		this.preconditions = props.preconditions || {};

		// Methods
		this.searchService   = this.searchService.bind(this);
		this.onSearch        = this.onSearch.bind(this);
		this.getValueLabel   = this.getValueLabel.bind(this);
	}

	componentDidMount() {
		if (this.service) {
			this.searchService();
		}
	}
	componentDidUpdate() {
		this.preconditions = this.props.preconditions || {};
	}

	getValueLabel(value) {
		let label = "";
		this.state.options.map((item, index) => {
			if(item["value"] === value) {
				label = item["label"];
			}
			return null;
		});

		return label;
	}

	onSearch(value) {
		this.searchService(value);
	}

	async searchService(value = null) {
		let body = {query: value}

		if (this.preconditions && value === null) {
			if(this.preconditions[this.getName()] !== undefined) {
				body["pk"] = this.preconditions[this.getName()];
				this.preconditions = {};
			}
		}

		let data = await BasePanel.service.apiSend({
			method: "GET",
			register: this.service,
			model: "select_query",
			body: body
		});
		if(data["success"]) {
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
					autoComplete="dontshow"
					showSearch
					showArrow
					onSearch={this.onSearch}
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

export default FormSelectQuery;
