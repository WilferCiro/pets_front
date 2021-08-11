import Cookie   from 'js-cookie';
import jwt      from 'jsonwebtoken';
import CryptoAES from 'crypto-js/aes';
import CryptoENC from 'crypto-js/enc-utf8';

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
		this.setToken       = this.setToken.bind(this);
		this.deleteData     = this.deleteData.bind(this);
		this.checkIsLogged  = this.checkIsLogged.bind(this);
		this.isLogged       = this.isLogged.bind(this);
		this.isAdmin        = this.isAdmin.bind(this);
		this.getUserPK      = this.getUserPK.bind(this);

		// Cart
		this.getNumCart     = this.getNumCart.bind(this);
		this.setNumCart     = this.setNumCart.bind(this);
		this.updateCart     = this.updateCart.bind(this);
		this.removeCart     = this.removeCart.bind(this);
		this.getCart        = this.getCart.bind(this);
		this.encrypt        = this.encrypt.bind(this);
		this.decrypt        = this.decrypt.bind(this);

		// Cookies
		this.acceptCookies    = this.acceptCookies.bind(this);
		this.getAcceptCookies = this.getAcceptCookies.bind(this);
	}

	decrypt(data) {
		return CryptoAES.decrypt(data.toString(), "CIRO").toString(CryptoENC);
	}
	encrypt(data){
		return CryptoAES.encrypt(data.toString(), "CIRO");
	}

	readValue(index, ctx = null) {
		let data = null;
		if (ctx && ctx.req && ctx.req.headers.cookie) {
			data = this.getDataServer(index, ctx, null);
		}
		else{
			data = this.getData(index);
		}

		if(data) {
			return this.decrypt(data);
		}
		return null;
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
		if(data !== null && data !== undefined) {
			Cookie.set(index, this.encrypt(data), { sameSite: 'strict'});
		}
	}

	deleteData(index) {
		Cookie.remove(index);
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
	getUserPK(ctx = null) {
		let dataLogged = this.isLogged(ctx, null, true);
		if (dataLogged !== false) {
			if(dataLogged["user_id"]){
				return dataLogged["user_id"];
			}
		}
		return null;
	}
	isAdmin(ctx = null) {
		let dataLogged = this.isLogged(ctx, null, true);
		if (dataLogged !== false) {
			if(dataLogged["admin"] === true){
				return true;
			}
		}
		return false;
	}

	setToken(token) {
		return this.saveData("token", token);
	}


	checkIsLogged(token = null, complete = false) {
		try {
			let options = {
				algorithms: ['HS256', 'HS384', 'HS512'],
				ignoreExpiration: false,
				complete: complete
			}
			if(token && token !== "undefined"){
				let decoded = jwt.verify(token, "CIRO", options);
				if (complete) {
					return decoded.payload;
				}
				return true;
			}
		} catch (e) {
			//console.log(e);
		}
		return false;
	}

	isLogged(ctx, pToken = null, complete = false) {
		if(complete) {
			let token_user = this.getData("token");
			let token_server = this.readValue("token", ctx);
			if (this.checkIsLogged(token_server, complete) !== false) {
				return this.checkIsLogged(token_server, complete);
			}
			else if(this.checkIsLogged(token_user, complete)){
				return this.checkIsLogged(token_user, complete);
			}
		}
		else{
			if (pToken) {
				return this.checkIsLogged(pToken);
			}
			let token_user = this.getData("token");
			let token_server = this.readValue("token", ctx);
			if (this.checkIsLogged(token_server) || this.checkIsLogged(token_user)) {
				return true;
			}
		}
		return false;
	}

	// Cart handler
	setNumCart(nro) {
		this.saveData("kiwi_nro_cart", nro);
	}

	getNumCart(ctx = null) {
		let cart = this.readValue("kiwi_nro_cart", ctx);
		return cart || 0;
		/*let cart = this.getCart(ctx);
		if(cart.length === 0) {
			return 0;
		}
		if(pk !== null) {
			for(let index in cart) {
				if(cart[index]["pk"] + "" === "" + pk && cart[index]["code"] + "" === "" + code) {
					return cart[index]["count"];
				}
			}
			return 0;
		}
		return cart.length;*/
	}

	getCart(ctx = null) {
		let cart = this.readValue("kiwi_cart", ctx);
		if (!cart){
			return [];
		}
		cart = cart;
		let dataReturn = null;
		try{
			dataReturn = JSON.parse(cart);
		}
		catch (e) {}
		return dataReturn;
	}

	removeCart(pk, code) {
		let cart = this.getCart();
		if (cart.length === 1) {
			cart = [];
		}
		for(let index in cart) {
			if(cart[index]["pk"] === pk && cart[index]["code"] === code) {
				cart.splice(index, 1);
				break;
			}
		}
		let dataSave = [];
		try{
			dataSave = JSON.stringify(cart);
		}
		catch (e) {}
		this.saveData("kiwi_cart", dataSave);
	}

	updateCart(obj) {
		let cart = this.getCart();
		let updated = false;
		cart = typeof cart === 'string' || typeof cart === 'number' ? [] : cart;
		for(let index in cart) {
			if(cart[index]["pk"] + "" === obj["pk"] + "" && cart[index]["code"] + "" === obj["code"] + "") {
				cart[index] = obj;
				updated = true;
			}
		}
		if(!updated) {
			cart.push(obj);
		}
		let dataSave = [];
		try{
			dataSave = JSON.stringify(cart);
		}
		catch (e) {}
		this.saveData("kiwi_cart", dataSave);
	}

	// Cookies
	acceptCookies() {
		this.saveData("cookies", true);
	}
	getAcceptCookies(ctx = null) {
		if (this.getData("cookies", ctx)) {
			return true;
		}
		return false;
	}
}
export default new Store();
