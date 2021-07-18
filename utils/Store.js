import Cookie   from 'js-cookie';
import jwt      from 'jsonwebtoken';

class Store {
	static instance = null;

	constructor(){
		if (Store.instance!==null){
			return Store.instance;
		}
		Store.instance = this;

		this.saveData = this.saveData.bind(this);
		//this.getData = this.getData.bind(this);
		this.readValue = this.readValue.bind(this);
		//this.getDataServer = this.getDataServer.bind(this);

		/** Specific **/
		// Empresa
		this.getEmpresa = this.getEmpresa.bind(this);
		this.setEmpresa = this.setEmpresa.bind(this);

		// Token
		this.setToken   = this.setToken.bind(this);
		this.checkIsLogged   = this.checkIsLogged.bind(this);
		this.isLogged   = this.isLogged.bind(this);
	}


	readValue(index, ctx = null) {
		if (ctx) {
			return this.getDataServer(index, ctx, null);
		}
		else if(typeof document) {
			return this.getDataServer(index, null, document);
		}
		return this.getData(index);
	}

	getDataServer(index, ctx, document = null) {
		let source = document ? document.cookie : ctx && ctx.req && ctx.req.headers.cookie ? ctx.req.headers.cookie : null;
		if(source){
			const tag_token = source.split(';').find(c=>c.trim().startsWith(index + '='));
			if(tag_token) {
				const arr_token = tag_token.split('=');
				if(arr_token.length>0){
					return arr_token[1];
				}
			}
		}
		return null;
	}

	saveData(index, data) {
		Cookie.set(index, data, { sameSite: 'strict'});
	}

	getData(index) {
		return Cookie.get(index);
	}

	// Empresa
	getEmpresa() {
		return this.readValue("empresa");
	}
	setEmpresa(empresa) {
		return this.saveData("empresa", empresa);
	}

	// Token
	setToken(token) {
		return this.saveData("token", token);
	}
	checkIsLogged(token = null) {
		try {
			let options = {
				algorithms: ['HS256', 'HS384', 'HS512'],
				ignoreExpiration: false
			}
			if(token && token !== "undefined"){
				jwt.verify(token, "CIRO", options);
				return true;
			}
		} catch (e) {
			//console.log(e);
		}
		return false;
	}

	isLogged(ctx, pToken = null) {
		if (pToken) {
			return this.checkIsLogged(pToken);
		}
		let token_user = this.getData("token");
		let token_server = this.readValue("token", ctx);
		if (this.checkIsLogged(token_server) || this.checkIsLogged(token_user)) {
			return true;
		}
		return false;
	}
}
export default new Store();
