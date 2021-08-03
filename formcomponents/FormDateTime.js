/**
	* Creado por Wilfer Daniel Ciro Maya - 2021
**/

// Custom classes
import BaseFormComponent from '@/formcomponents/BaseFormComponent';

// Ant components and icons
import {
	DatePicker,
	Form
} from 'antd';

class FormDateTime extends BaseFormComponent{
	constructor(props) {
		super(props);

		this.showTime = this.props.showTime !== null && this.props.showTime !== undefined ? this.props.showTime : true;
		this.limitToday = this.props.limitToday ? this.props.limitToday : false;

		let today = new Date();
		let dd = String(today.getDate()).padStart(2, '0');
		let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
		let yyyy = today.getFullYear();

		this.current = yyyy + "-" + mm + '-' + dd;
	}

	render() {
		const dateFormat = this.props.showTime ? 'YYYY-MM-DD hh:mm:ss' : 'YYYY-MM-DD';

		return (
			<Form.Item
				label={this.getLabel()}
				name={this.getName()}
				rules={this.getRules()}
				style={this.style}
			>
				<DatePicker
					format={dateFormat}
					size="small"
					showTime={this.props.showTime}
					style={{width: "100%"}}
					placeholder={this.getPlaceholder() + (this.required ? "*" : "")}
					disabledDate={d => !d || (this.limitToday && d.isAfter(this.current)) }
					/>
			</Form.Item>
		);
	}
}

export default FormDateTime;
