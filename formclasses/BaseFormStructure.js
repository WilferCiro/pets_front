/**
	* Creado por Wilfer Daniel Ciro Maya - 2021
**/

// React Components
import React              from 'react';

// Custom classes
import FormPasswordRepeat from '@/formcomponents/FormPasswordRepeat';
import FormMultiImage     from '@/formcomponents/FormMultiImage';
import FormInputText      from '@/formcomponents/FormInputText';
import FormPassword       from '@/formcomponents/FormPassword';
import FormtextArea       from '@/formcomponents/FormtextArea';
import FormDateTime       from '@/formcomponents/FormDateTime';
import FormSelect         from '@/formcomponents/FormSelect';
import FormSearch         from '@/formcomponents/FormSearch';
import FormNumber         from '@/formcomponents/FormNumber';
import FormSwitch         from '@/formcomponents/FormSwitch';
import FormLabel          from '@/formcomponents/FormLabel';
import FormUrl            from '@/formcomponents/FormUrl';

// Ant components and icons
import {
	Form,
	Input,
	Row,
	Col,
	Modal
} from 'antd';

const validateMessages = {
	required: "'${label}' es requerido"
};

class BaseFormStructure  extends React.Component{
	constructor(props) {
		super(props);

		// Props Data
		this.id             = this.props.id || "";
		this.fields         = this.props.fields || [];
		this.vertical       = this.props.vertical || false;
		this.initialValues  = this.props.initialValues || {};
		this.modal          = this.props.modal || false;
		this.modalOnOk      = this.props.modalOnOk;
		this.modalOnCancel  = this.props.modalOnCancel;
		this.onValuesChange = this.props.onValuesChange;

		// States
		this.state = {
			modal: {
				open: false,
				title: "Hola mundo"
			},
			preconditions: null,
			defaultFileList : this.props.defaultFileList || null
		}

		// References
		this.formRef       = React.createRef();

		// Methods
		this.validate       = this.validate.bind(this);
		this.setValues      = this.setValues.bind(this);
		this.handleOk       = this.handleOk.bind(this);
		this.handleCancel   = this.handleCancel.bind(this);
		this.open           = this.open.bind(this);
		this.clearValues    = this.clearValues.bind(this);
		this.onChange       = this.onChange.bind(this);
		this.getFieldRender = this.getFieldRender.bind(this);
		this.getFormField   = this.getFormField.bind(this);

		// Específico para select
		this.getValueLabelSelect = this.getValueLabelSelect.bind(this);
		this.setPreconditions    = this.setPreconditions.bind(this);

	}

	setPreconditions(preconditions) {
		this.setState({
			preconditions : preconditions
		})
	}

	getValueLabelSelect(value, id){
		return this.refs[id].getValueLabel(value);
	}

	getFormField(id) {
		return this.refs[id];
	}

	onChange() {
		if(this.onValuesChange) {
			this.onValuesChange();
		}
	}

	open(title, defaultFileList = null, preconditions = null) {
		if(this.modal) {
			this.setState({
				modal: {
					open: true,
					title: title
				},
				defaultFileList: defaultFileList !== null ? defaultFileList : this.state.defaultFileList,
				preconditions : preconditions
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

	getFieldRender(item) {
		let props = {
			name : item["id"],
			ref : item["id"],
			getFormField : this.getFormField,
			formRef: this.formRef,
			preconditions: this.state.preconditions
		}
		let allFields = {
			"cell"            : (item) => <FormInputText {...props} {...item} max={10} min={10} />,
			"text"            : (item) => <FormInputText {...props} {...item} />,
			"facebook_url"    : (item) => <FormUrl {...props} {...item} beforeText="https://facebook.com/" regex={/^(https?:\/\/){0,1}(www\.){0,1}facebook\.com/} />,
			"instagram_url"   : (item) => <FormUrl {...props} {...item} beforeText="https://instagram.com/" regex={/^(https?:\/\/){0,1}(www\.){0,1}instagram\.com/} />,
			"twitter_url"     : (item) => <FormUrl {...props} {...item} beforeText="https://twitter.com/" regex={/^(https?:\/\/){0,1}(www\.){0,1}twitter\.com/} />,
			"tiktok_url"      : (item) => <FormUrl {...props} {...item} beforeText="https://tiktok.com/" regex={/^(https?:\/\/){0,1}(www\.){0,1}tiktok\.com/} />,
			"url"             : (item) => <FormInputText {...props} {...item} inputType={"url"} />,
			"email"           : (item) => <FormInputText {...props} {...item} inputType={"email"} max={200} />,
			"datetime"        : (item) => <FormDateTime {...props} {...item} />,
			"select"          : (item) => <FormSelect {...props} {...item} />,
			"label"           : (item) => <FormLabel {...props} {...item} />,
			"search"          : (item) => <FormSearch {...props} {...item} />,
			"price"           : (item) => <FormNumber {...props} ref={item["id"]} {...item} />,
			"percent"         : (item) => <FormNumber {...props} ref={item["id"]} {...item} />,
			"password"        : (item) => <FormPassword {...props} {...item} />,
			"textarea"        : (item) => <FormtextArea {...props} {...item} />,
			"switch"          : (item) => <FormSwitch {...props} {...item} />,
			"password_repeat" : (item) => <FormPasswordRepeat {...props} {...item} />,
			"multiimage"      : (item) => <FormMultiImage {...props} {...item} />,
		};

		return <Col xs={24} md={item["size"] * 2}>
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
				renderContainers[item["container"]].push(this.getFieldRender(item));
			}
			else{
				renderContainers[item["container"]] = [this.getFieldRender(item)]
			}
			return null;
		});
		let form = <Form
				labelCol={{ span: this.vertical ? 24 : 7 }}
				wrapperCol={{ span: this.vertical ? 24 : 17 }}
				validateMessages={ validateMessages }
				name={"form" + this.id}
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
			return <Modal width={550} style={{ top: 20 }} title={this.state.modal.title} visible={this.state.modal.open} onOk={this.handleOk} onCancel={this.handleCancel}>
				{form}
			</Modal>
		}

		return form;
	}
}

export default BaseFormStructure;
