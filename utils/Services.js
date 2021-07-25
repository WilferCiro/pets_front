import fetch     from 'isomorphic-unfetch';
import NProgress from 'nprogress';
import Constant     from '@/components/Constant';
import Store from '@/utils/Store';

import {message} from 'antd';

class Services {
	static instance;
	static alertModel;
	constructor() {
		if (Services.instance){
			return Services.instance;
		}
		Services.instance              = this;
		this.send                      = this.send.bind(this);
		this.setAlertModel             = this.setAlertModel.bind(this);
		this.sendServer                = this.sendServer.bind(this);

		this.apiSend                   = this.apiSend.bind(this);
	}

	setAlertModel(alertModel) {
		if(alertModel){
			Services.alertModel = alertModel;
		}
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
			settings["headers"]["Authorization"] = "Bearer " + (token ? token : Store.readValue("token", ctx));
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

	async sendServer({
		endpoint=undefined,
		method,
		body = {},
		success=undefined,
		error=undefined,
		showMessage=false,
		_headers=true,
		formData=false,
		requires_token=false
	}={})
	{
		let headers ={};
		let options = {
			method
		}
		if(!requires_token){
			body["api_key"] = Constant.get_key();
		}
		if(method==='GET') {
			endpoint = new URL(endpoint);
			endpoint.searchParams.append("body", JSON.stringify(body));
		}
		else if(!formData){
			body = JSON.stringify(body);
		}
		else {
			const data_ = new FormData();
			for(let attribute in body) {
				data_.append(attribute, body[attribute]);
			}
			body = data_;
		}

		if(endpoint !== undefined) {
			if (_headers!==false && !(formData)){
				headers['Content-Type']='application/json';
			}
			if (_headers!==false && !(formData)){
				options['headers']      = headers;
			}

			let buffer = await fetch(new Request(endpoint, options)).catch(function() {
				return false;
			});

			let decoder = new TextDecoder("UTF-8");//new TextDecoder("iso-8859-1");
			let data ={};
			try {
				data = await buffer.json();///JSON.parse(decoder.decode(buffer));
				data["estado_p"] = buffer.status;
				if(data.status!==200) {
					let message ="";
					if(data.data !== undefined && data.data !== null) {
						for(let error in data.data) {
							message += (message === "") ? error + ": " + data.data[error][0] : ', ' + error + ": " + data.data[error][0];
						}
					}

					if(showMessage && Services.alertModel && Services.alertModel.current){
						if(message !== ''){
							Services.alertModel.current.toggle(true, message, "error");
						}
						else{
							Services.alertModel.current.toggle(true, xhr.status+":"+(( data.data === undefined || data.data.mensaje ===undefined)?Services.messages_requests.get(data.estado_p):data.data.mensaje), "error");
						}
					}
				}
				else if(showMessage && Services.alertModel && Services.alertModel.current){
					Services.alertModel.current.toggle(true,((data.data === undefined  || data.data.mensaje === undefined)?"Acción Exitosa":data.data.mensaje),"success");
				}
				if(data.data !== undefined && method==='GET'&& Array.isArray(data.data)){
					data['model']= data.data;
				}
				return data;
			}
			catch (err) {
				console.log(err);
				return {"estado_p" : 500};
			}
		}
	}

	send({
		endpoint=undefined,
		method,
		body = {},
		success=undefined,
		error=undefined,
		showMessage=false,
		_headers=true,
		formData=false,
		requires_token=false,
		page=1,
		token=undefined
	}={}) {
		NProgress.start();
		let xhr = new XMLHttpRequest();
		xhr.responseType = "arraybuffer";
		let options = {
			method
		}

		if(!requires_token){
			body["api_key"] = Constant.get_key();
		}

		if(method==='GET') {
			endpoint = new URL(endpoint);
			endpoint.searchParams.append("body", JSON.stringify(body));
			endpoint.searchParams.append("page", page);
		}
		else if(!formData){
			body = JSON.stringify(body);
		}
		else {
			const data_ = new FormData();
			for(let attribute in body) {
				data_.append(attribute, body[attribute]);
			}
			body = data_;
		}

		if(endpoint !== undefined) {
			//console.log(method, endpoint);
			xhr.open(method, endpoint, true);
			if (_headers !== false && !(formData)){
				xhr.setRequestHeader('Content-Type','application/json');
			}
			if (_headers !== false && requires_token){
				if(token) {
					xhr.setRequestHeader('Authorization','Bearer ' + token);
				}
				else{
					xhr.setRequestHeader('Authorization','Bearer ' + Store.readValue("token"));
				}
			}
			xhr.onload = function() {
				const decoder = new TextDecoder("UTF-8");
				const buffer = xhr.response;
				let data ={};
				if(buffer !== undefined && buffer !== null && buffer.byteLength > 0) {
					try {
						data = JSON.parse(decoder.decode(buffer));
						data["estado_p"] = xhr.status;
						if(xhr.status !== 200) {
							let message ="";
							if(data.data !== undefined && data.data !== null) {
								for(let error in data.data) {
									message += (message === "") ? error + ": " + data.data[error][0] : ', ' + error + ": " + data.data[error][0];
								}
							}

							if(showMessage && Services.alertModel && Services.alertModel.current){
								if(message !== ''){
									Services.alertModel.current.toggle(true, message, "error");
								}
								else{
									Services.alertModel.current.toggle(true, xhr.status+":"+(( data.data === undefined || data.data.mensaje ===undefined)?Services.messages_requests.get(data.estado_p):data.data.mensaje), "error");
								}
							}
						} // Si existió error
						else if(showMessage && Services.alertModel && Services.alertModel.current){
							Services.alertModel.current.toggle(true,((data.data === undefined  || data.data.mensaje === undefined)?"Acción Exitosa":data.data.mensaje),"success");
						}
						if(success !== undefined && success !== null) {
							success(data);
						}
					}
					catch (err) {
						if(error !== undefined && error !== null){
							error(err);
						}
					}
					finally {
						NProgress.done();
					}
				}
			}
			xhr.send(body);
			xhr.onerror = function(){
				NProgress.done();
			}
		}
	}
}



export default  new Services();
