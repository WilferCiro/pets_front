import React          from 'react';
import FormInputText  from '@/formcomponents/FormInputText';
import FormImage      from '@/formcomponents/FormImage';
import FormUrl        from '@/formcomponents/FormUrl';
import FormDateTime   from '@/formcomponents/FormDateTime';
import FormSelect     from '@/formcomponents/FormSelect';
import FormLabel      from '@/formcomponents/FormLabel';
import FormSearch     from '@/formcomponents/FormSearch';
import FormNumber     from '@/formcomponents/FormNumber';
import FormPassword   from '@/formcomponents/FormPassword';

import { Form, Input, Row, Col } from 'antd';

const validateMessages = {
	required: "'${label}' es requerido"
};

class BaseFormStructure  extends React.Component{
	constructor(props) {
		super(props);

		// Props Data
		this.fields        = this.props.fields ? this.props.fields : [];
		this.vertical      = this.props.vertical ? this.props.vertical : false;
		this.initialValues = this.props.initialValues ? this.props.initialValues : {};

		// References
		this.formRef       = React.createRef();

		// Methods
		this.getField      = this.getField.bind(this);
		this.validate      = this.validate.bind(this);
		this.setValues     = this.setValues.bind(this);
	}

	async validate() {
		return this.formRef.current.validateFields();
	}

	getValues() {
		return this.formRef.current.getFieldsValue();
	}

	setValues(values) {
		this.formRef.current.setFieldsValue(values);
	}

	getField(item) {
		let allFields = {
			"cell"            : (item) => <FormInputText name={item["id"]} ref={item["id"]} {...item} max={10} min={10} />,
			"text"            : (item) => <FormInputText name={item["id"]} ref={item["id"]} {...item} />,
			"facebook_url"    : (item) => <FormUrl name={item["id"]} ref={item["id"]} {...item} beforeText="https://facebook.com/" regex={/^(https?:\/\/){0,1}(www\.){0,1}facebook\.com/} />,
			"instagram_url"   : (item) => <FormUrl name={item["id"]} ref={item["id"]} {...item} beforeText="https://instagram.com/" regex={/^(https?:\/\/){0,1}(www\.){0,1}instagram\.com/} />,
			"twitter_url"     : (item) => <FormUrl name={item["id"]} ref={item["id"]} {...item} beforeText="https://twitter.com/" regex={/^(https?:\/\/){0,1}(www\.){0,1}twitter\.com/} />,
			"tiktok_url"      : (item) => <FormUrl name={item["id"]} ref={item["id"]} {...item} beforeText="https://tiktok.com/" regex={/^(https?:\/\/){0,1}(www\.){0,1}tiktok\.com/} />,
			"url"             : (item) => <FormInputText name={item["id"]} ref={item["id"]} {...item} inputType={"url"} />,
			"email"           : (item) => <FormInputText name={item["id"]} ref={item["id"]} {...item} inputType={"email"} max={200} />,
			"photo"           : (item) => <FormImage name={item["id"]} ref={item["id"]} {...item} />,
			"datetime"        : (item) => <FormDateTime name={item["id"]} ref={item["id"]} {...item} />,
			"select"          : (item) => <FormSelect name={item["id"]} ref={item["id"]} {...item} />,
			"label"           : (item) => <FormLabel name={item["id"]} ref={item["id"]} {...item} />,
			"search"          : (item) => <FormSearch name={item["id"]} ref={item["id"]} {...item} />,
			"price"           : (item) => <FormNumber name={item["id"]} price={true} ref={item["id"]} {...item} />,
			"percent"         : (item) => <FormNumber name={item["id"]} percent={true} ref={item["id"]} {...item} />,
			"password"        : (item) => <FormPassword name={item["id"]} ref={item["id"]} {...item} />,
		};

		return <Col span={item["size"] * 2}>
			{allFields[item["type"]](item)}
		</Col>;
	}

	render() {
		let renderFields = [];
		let renderContainers = {
		};

		(this.fields).map((item, index) => {
			if(renderContainers[item["container"]]){
				renderContainers[item["container"]].push(this.getField(item));
			}
			else{
				renderContainers[item["container"]] = [this.getField(item)]
			}
			return null;
		});

		return <Form
				validateMessages={ validateMessages }
				name="register"
				ref={this.formRef}
				layout={this.vertical ? "vertical" : "horizontal"}
				initialValues={this.initialValues}
			>
			{
				Object.keys(renderContainers).map((key, index) => {
					return <Row key={Math.random()} gutter={[8, 0]}>
					{
						renderContainers[key].map((item, index2) => {
							return <React.Fragment key={Math.random()}>{item}</React.Fragment>
						})
					}
					</Row>
				})
			}
		</Form>
	}
}

export default BaseFormStructure;
