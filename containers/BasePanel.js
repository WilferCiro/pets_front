import React, {
	Component
} from 'react';

import router       from 'next/router';
import Router, { withRouter } from 'next/router'

import Constant     from '@/components/Constant';
import Services     from '@/utils/Services';
import User         from '@/utils//User';
import Store        from '@/utils//Store';

export default class BasePanel extends Component {
	static history = undefined;
	static urls_servidores = undefined;
	static service = Services;
	static alertLocal = new React.createRef();
	static user = User;
	static refBreadcrumb = new React.createRef();

	static store = Store;


	constructor(props) {
		super(props);
		this.constants = Constant;
		this.store     = BasePanel.store;

		this.redirectPage = this.redirectPage.bind(this);
		this.goHome = this.goHome.bind(this);
		this.URLSave = null;

		this.send = this.send.bind(this);
		this.error = this.error.bind(this);
		this.logout = this.logout.bind(this);
	}


	logout() {
		BasePanel.user.deleteToken();
		this.redirectPage(this.constants.route_index);
	}
	error(data) {
		console.log("--ERRR----", data);
	}

	redirectPage(to, query = {}) {
		//router.push(to, alias);
		Router.push({ pathname: to, query: query });
	}

	goHome() {
		this.redirectPage(this.constants.route_index);
	}

	send(data) {
		BasePanel.service.setAlertModel(BasePanel.alertDavinci);
		BasePanel.service.send(data);
	}
	static async send(endpoint, method, body, success, error, fields, showMessage, _headers) {
		BasePanel.service.setAlertModel(BasePanel.alertModel);
		return await BasePanel.service.sendServer(endpoint, method, body, success, error, fields, showMessage, _headers);
	}

}
//export default BasePanel;
