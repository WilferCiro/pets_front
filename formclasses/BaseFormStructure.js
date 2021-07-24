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
import FormtextArea   from '@/formcomponents/FormtextArea';
import FormSwitch     from '@/formcomponents/FormSwitch';
import FormMultiImage from '@/formcomponents/FormMultiImage';
import FormPasswordRepeat from '@/formcomponents/FormPasswordRepeat';

import { Form, Input, Row, Col, Modal } from 'antd';

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
		this.modal         = this.props.modal ? this.props.modal : false;

		// References
		this.formRef       = React.createRef();

		// Methods
		this.validate      = this.validate.bind(this);
		this.setValues     = this.setValues.bind(this);

		this.state = {
			modal: {
				open: false,
				title: "Hola mundo"
			},
			defaultFileList : this.props.defaultFileList || null
		}

		this.modalOnOk     = this.props.modalOnOk;
		this.modalOnCancel = this.props.modalOnCancel;

		this.handleOk      = this.handleOk.bind(this);
		this.handleCancel  = this.handleCancel.bind(this);
		this.open          = this.open.bind(this);
		this.clearValues   = this.clearValues.bind(this);

		this.onChange       = this.onChange.bind(this);
		this.getField       = this.getField.bind(this);
		this.onValuesChange = this.props.onValuesChange;

	}

	onChange() {
		if(this.onValuesChange) {
			this.onValuesChange();
		}
	}

	open(title, defaultFileList = null) {
		if(this.modal) {
			this.setState({
				modal: {
					open: true,
					title: title
				},
				defaultFileList: defaultFileList !== null ? defaultFileList : this.state.defaultFileList
			})
		}
	}

	async handleOk() {
		let valid = await this.validate();
		if(valid) {
			if(this.modalOnOk) {
				this.modalOnOk();
			}
			this.setState({
				modal: {
					title: this.state.modal.title,
					open: false
				}
			});
		}

	}

	handleCancel() {
		if(this.modalOnCancel) {
			this.modalOnCancel();
		}
		this.setState({
			modal: {
				title: this.state.modal.title,
				open: false
			}
		});
	}

	clearValues() {
		this.formRef.current.resetFields();
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
			"textarea"        : (item) => <FormtextArea name={item["id"]} ref={item["id"]} {...item} />,
			"switch"          : (item) => <FormSwitch name={item["id"]} ref={item["id"]} {...item} />,
			"password_repeat" : (item) => <FormPasswordRepeat name={item["id"]} ref={item["id"]} {...item} />,
			"multiimage"      : (item) => <FormMultiImage name={item["id"]} ref={item["id"]} {...item} />,
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
			if (this.state.defaultFileList){
				let found = this.state.defaultFileList.find(function(post, index) {
					if(post.id == item["id"]){
						return true;
					}
				});
				if (found){
					item["defaultFileList"] = found["values"];
				}
			}

			if(renderContainers[item["container"]]){
				renderContainers[item["container"]].push(this.getField(item));
			}
			else{
				renderContainers[item["container"]] = [this.getField(item)]
			}
			return null;
		});
		let form = <Form
				labelCol={{ span: this.vertical ? 24 : 7 }}
				wrapperCol={{ span: this.vertical ? 24 : 17 }}
				validateMessages={ validateMessages }
				name={"register"}
				ref={this.formRef}
				layout={this.vertical ? "vertical" : "horizontal"}
				initialValues={this.initialValues}
				onValuesChange={this.onChange}
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

		if (this.modal) {
			return <Modal style={{ top: 20 }} title={this.state.modal.title} visible={this.state.modal.open} onOk={this.handleOk} onCancel={this.handleCancel}>
				{form}
			</Modal>
		}

		return form;
	}
}

export default BaseFormStructure;
