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
	static refLogin      = new React.createRef();

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
		this.openLogin     = this.openLogin.bind(this);

		this.finalBuy      = this.finalBuy.bind(this);

		BasePanel.service.setLogout(this.logout);
	}

	openLogin(attrs = {}) {
		if(BasePanel.refLogin.current) {
			BasePanel.refLogin.current.open(attrs);
		}
	}

	async updateCart(obj) {
		/*if (obj["count"] === 0) {
			this.store.removeCart(obj["pk"], obj["code"]);
		}
		else{
			this.store.updateCart(obj);
		}*/
		let pkReturn = null;
		let nroCart = 0;
		if (obj["nro"] === 0) {
			// Delete
			let data = await BasePanel.service.apiSend({
				method: "DELETE",
				register: "carrito",
				model: "eliminar",
				isPublic: false,
				showError: true,
				aditional: [obj["pk"]]
			});
			if(data["success"]) {
				pkReturn = null;
				//this.refNroSelector.current.setValue(obj["nro"], false, obj["stock"], null);
				nroCart = data["data"]["total_usuario"];
			}
		}
		else {
			if (obj["pk"] === null) {
				// Add
				let body = {
					"cantidad" : obj["nro"],
					"producto" : obj["producto"],
					"opciones" : obj["opciones"],
					"mascota" : obj["mascota"]
				}
				let data = await BasePanel.service.apiSend({
					method: "POST",
					register: "carrito",
					model: "crear",
					body: body,
					isPublic: false,
					showError: true
				});
				if(data["success"]) {
					pkReturn = data["data"]["pk"];
					//this.refNroSelector.current.setValue(obj["nro"], false, obj["stock"], data["data"]["pk"]);
					nroCart = data["data"]["total_usuario"];
				}

			}
			else{
				// Modify
				let body={
					cantidad: obj["nro"]
				}
				let data = await BasePanel.service.apiSend({
					method: "PUT",
					register: "carrito",
					model: "modificar",
					body: body,
					isPublic: false,
					showError: true,
					aditional: [obj["pk"]]
				});
				if(data["success"]) {
					pkReturn = data["data"]["pk"];
					nroCart = data["data"]["total_usuario"];
				}
			}
		}

		if(BasePanel.refButtonCart.current) {
			BasePanel.refButtonCart.current.setNro(nroCart);
		}

		return pkReturn;
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
