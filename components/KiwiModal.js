import React          from 'react';
import BasePanel      from '@/containers/BasePanel';
import Constant       from '@/components//Constant';
import { Modal, Button } from 'antd';

class KiwiModal extends BasePanel{
	constructor(props) {
		super(props);
		this.state = {
			open : false
		}

		this.close = this.close.bind(this);
		this.open = this.open.bind(this);
	}
	componentDidMount() {
	}

	close() {
		this.setState({
			open: false
		})
	}

	open() {
		this.setState({
			open: true
		})
	}

	render() {
		let classModal = this.state.open ? "open" : "";
		let classbg = this.state.open ? "open-bg" : "";
		let child = <div>{this.props.children}</div>
		return (
			<Modal title="Basic Modal" visible={this.state.open} onOk={this.close} onCancel={this.close}>
				{child}
			</Modal>
		);
	}
}

export default KiwiModal;

/*
<div>
	<div className={"modal-background " + classbg} onClick={(e) => this.close()}></div>
	<div className={"modal modal-1 " + classModal}>
		<div className="modal-header">
			<div>{this.props.title}</div>
			<div><button onClick={(e) => this.close()}>x</button></div>
		</div>
		<div className="modal-body">
			{this.props.children}
		</div>
		<div className="modal-footer">

		</div>
	</div>
</div>
*/
