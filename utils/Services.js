/**
	* Creado por Wilfer Daniel Ciro Maya - 2021
**/

// Third party libraries
import fetch      from 'isomorphic-unfetch';
import NProgress  from 'nprogress';

// custom classes
import Constant   from '@/components/Constant';
import Store      from '@/utils/Store';
import { saveAs } from 'file-saver';

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
		aditional = [],
		isPublic = true,
		showError = false,
		formData = false,
		token,
		ctx = null,
		download = null,
		showLoad = true
	}){
		if(showLoad){
			NProgress.start();
		}
		let dataGet = {};
		let addURL = aditional.length > 0 ? "/" + aditional.join("/") : "";

		let url = (isPublic ? Constant.getPublicEndpoint() : Constant.getPrivateEndpoint()) + register + "/" + model + addURL;
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
			for(let attribute in body) {
				url.searchParams.append(attribute, body[attribute]);
			}
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
		//console.log(url, settings);
		const fetchResponse = await fetch(url, settings).catch((error) => {
			return new Response(
				JSON.stringify({
					message: "Error en la conexión con el servidor"
				}),
				{ "status" : 400}
			);
		});

		if (download) {
			saveAs(await fetchResponse.blob(), download)
		}

		try{
			dataGet = await fetchResponse.json();
		}
		catch(e) {
			//console.log(await fetchResponse.text());
			console.log("Error->", e);
		}
		//console.log(dataGet);
		let data = {};
		if ("results" in dataGet){
			data["paginator"] = {
				"total" : dataGet["count"]
			}
			data["data"] = dataGet["results"];
		}
		else{
			data["data"] = dataGet;
		}
		if ("aditional" in dataGet){
			data["aditional"] = dataGet["aditional"];
		}

		data["success"] = fetchResponse.status < 300 && fetchResponse.status >= 200 ? true : false;
		if (!data["success"] && showError) {
			let mensaje = "";
			for(let index in data["data"]){
				mensaje += index + ": ";
				if (typeof data["data"][index] === 'list' || typeof data["data"][index] === 'object'){
					for (let index2 in data["data"][index]){
						mensaje += "" + data["data"][index][index2].toString()
					}
				}
				else{
					mensaje += "" + data["data"][index].toString()
				}
			}
			if(mensaje !== "") {
				message.error(mensaje);
			}


		}
		if(showLoad){
			NProgress.done();
		}
		return data;
	}

}



export default  new Services();
