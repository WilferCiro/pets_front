/**
	* Creado por Wilfer Daniel Ciro Maya - 2021
**/

// React Components
import React, {
	Component
} from 'react';

// NextJS libraries
import router                 from 'next/router';
import Router, { withRouter } from 'next/router'

// Custom classes
import Constant     from '@/components/Constant';
import Services     from '@/utils/Services';
import Store        from '@/utils//Store';
import User         from '@/utils//User';

export default class BasePanel extends Component {
	static urls_servidores = undefined;
	static history         = undefined;
	static service         = Services;
	static store           = Store;
	static user            = User;

	// Global references
	static refBreadcrumb = new React.createRef();

	constructor(props) {
		super(props);

		// Variables
		this.constants = Constant;
		this.URLSave   = null;
		this.store     = BasePanel.store;

		// Methods
		this.redirectPage = this.redirectPage.bind(this);
		this.goHome       = this.goHome.bind(this);
		this.logout       = this.logout.bind(this);
		this.error        = this.error.bind(this);
		this.send         = this.send.bind(this);
	}


	logout() {
		BasePanel.user.deleteToken();
		this.redirectPage(this.constants.route_index);
	}
	error(data) {
		console.log("--ERRR----", data);
	}

	redirectPage(to, query = {}) {
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
