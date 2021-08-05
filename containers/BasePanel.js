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
	static service         = Services;
	static store           = Store;
	static user            = User;

	// Global references
	static refBreadcrumb = new React.createRef();
	static refButtonCart = new React.createRef();
	static refMobileMenu = new React.createRef();

	constructor(props) {
		super(props);

		// Variables
		this.constants  = Constant;
		this.URLSave    = null;
		this.store      = BasePanel.store;
		this.user       = BasePanel.user;
		this.valorEnvio = 10000;

		// Methods
		this.redirectPage  = this.redirectPage.bind(this);
		this.goHome        = this.goHome.bind(this);
		this.logout        = this.logout.bind(this);
		this.setBreadCrumb = this.setBreadCrumb.bind(this);
		this.updateCart    = this.updateCart.bind(this);
		this.getDataCart   = this.getDataCart.bind(this);

		this.finalBuy      = this.finalBuy.bind(this);

		BasePanel.service.setLogout(this.logout);
	}

	updateCart(obj) {
		if (obj["count"] === 0) {
			this.store.removeCart(obj["pk"], obj["code"]);
		}
		else{
			this.store.updateCart(obj);
		}
		BasePanel.refButtonCart.current.setNro(this.store.getNumCart());
	}

	async getDataCart() {
		let cart = this.store.getCart();
		let pks = [];
		cart.map((item, index) => {
			pks.push(item["pk"]);
			return null;
		});

		let data = await BasePanel.service.apiSend({
			method: "GET",
			register: "producto",
			model: "carrito",
			body: {
				"pks" : pks.join(",")
			}
		});
		console.log(data);
		if(data["success"]) {
			return data["data"];
		}
		return [];
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


	finalBuy(data) {

		let form = document.getElementById("form-pay");
		form.setAttribute("method", "post");
		form.setAttribute("action", this.constants.getPayuUrl());
		for (let key in data) {
			let input = document.createElement("input");
			input.setAttribute("id", key);
			input.setAttribute("type", "hidden");
			input.setAttribute("name", key);
			input.setAttribute("value", data[key]);
			form.appendChild(input);
		}
		let button = document.createElement("input");
		button.setAttribute("type", "submit");
		button.setAttribute("value", "Enviar");
		form.appendChild(button);
		//ShoppingCart.deleteCart();
		button.click();

	}

}
//export default BasePanel;
