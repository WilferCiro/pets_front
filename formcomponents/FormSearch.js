import React              from 'react';
import BasePanel          from '@/containers/BasePanel';
import BaseFormComponent  from '@/formcomponents/BaseFormComponent';
import { Input } from 'antd';
const { Search } = Input;


class FormSearch extends BaseFormComponent{
	constructor(props) {
		super(props);

		this.type = "FormInputText";

		this.state.loading = false;

		this.onSearch = this.onSearch.bind(this);
		this.onEnter = this.onSearch;
	}

	onSearch() {
		console.log(this.getValue());
	}

	render() {
		return (
			<div className="input-text">
				{this.getLabel()}
				<Search
					loading={this.state.loading}
					enterButton
					ref={node => {
						this.input = node;
					}}
					className="form-text"
					placeholder={this.getPlaceholder() + (this.required ? "*" : "")}
					type="text"
					disabled={this.disabled}
					defaultValue={this.props.defaultValue}
					onChange={this.handleChange}
					onKeyPress={this.handleKeyPress}
					/><br />
				{
					(this.state.errores).map((item, index) => {
						return <label key={Math.random()}>{item}</label>
					})
				}
			</div>
		);
	}
}

export default FormSearch;
