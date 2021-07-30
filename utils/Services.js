/**
	* Creado por Wilfer Daniel Ciro Maya - 2021
**/

// Third party libraries
import fetch      from 'isomorphic-unfetch';
import NProgress  from 'nprogress';

// custom classes
import Constant   from '@/components/Constant';
import Store      from '@/utils/Store';

// Ant
import {message}  from 'antd';

class Services {
	static instance;
	constructor(logout) {
		if (Services.instance){
			return Services.instance;
		}
		Services.instance              = this;
		this.apiSend                   = this.apiSend.bind(this);
		this.setLogout        = this.setLogout.bind(this);
		this.logout = null;
	}

	setLogout(logout) {
		this.logout = logout;
	}

	async apiSend({
		method,
		register,
		model,
		body = {},
		isPublic = true,
		showError = false,
		formData = false,
		token,
		ctx,
		showLoad = true
	}){
		if(showLoad){
			NProgress.start();
		}
		let data = {};
		let url = (isPublic ? Constant.getPublicEndpoint() : Constant.getPrivateEndpoint()) + register;
		let settings = {
			method: method,
			headers: {}
		};

		if(!formData) {
			settings["headers"] = {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			}
		}

		// FIXME: QUITAR
		body["modelo"] = model;
		// FIXME: QUITAR

		if(!isPublic) {
			if(Store.checkIsLogged(token ? token : Store.readValue("token", ctx))) {
				settings["headers"]["Authorization"] = "Bearer " + (token ? token : Store.readValue("token", ctx));
			}
			else{
				this.logout();
			}
		}
		if(method === 'GET') {
			url = new URL(url);
			url.searchParams.append("body", JSON.stringify(body));
		}
		else if(!formData){
			settings["body"] = JSON.stringify(body);
		}
		else {
			const data_ = new FormData();
			for(let attribute in body) {
				data_.append(attribute, body[attribute]);
			}
			settings["body"] = data_;
		}
		const fetchResponse = await fetch(url, settings).catch((error) => {
			return new Response(
				JSON.stringify({
					message: "Error en la conexión con el servidor"
				}),
				{ "status" : 400}
			);
		});
		data = await fetchResponse.json();
		data["code"] = fetchResponse.status;
		if (data["code"] !== 200 && showError) {
			message.error(data["message"]);
		}
		if(showLoad){
			NProgress.done();
		}
		return data;
	}

}



export default  new Services();
