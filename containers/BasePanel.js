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

export default class BasePanel extends Component {
	static service         = Services;
	static store           = Store;

	// Global references
	static refBreadcrumb = new React.createRef();

	constructor(props) {
		super(props);

		// Variables
		this.constants = Constant;
		this.URLSave   = null;
		this.store     = BasePanel.store;

		// Methods
		this.redirectPage  = this.redirectPage.bind(this);
		this.goHome        = this.goHome.bind(this);
		this.logout        = this.logout.bind(this);
		this.setBreadCrumb = this.setBreadCrumb.bind(this);
	}

	setBreadCrumb(data) {
		if(BasePanel.refBreadcrumb.current) {
			BasePanel.refBreadcrumb.current.setItems(data);
		}
	}

	logout() {
		this.store.deleteData("token");
		this.store.deleteData("full_name");
		this.store.deleteData("avatar");
		this.store.deleteData("cantidad_mascotas");
		this.store.deleteData("cantidad_pedidos");
		this.redirectPage(this.constants.route_index);
	}

	redirectPage(to, query = {}) {
		Router.push({ pathname: to, query: query });
	}

	goHome() {
		this.redirectPage(this.constants.route_index);
	}

}
//export default BasePanel;
