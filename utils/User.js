
import Cookie   from 'js-cookie';
import jwt      from 'jsonwebtoken';

class User {
	static instance = undefined;

	constructor() {
		if (User.instance){
			return User.instance;
		}

		this.isLogged    = this.isLogged.bind(this);
		this.setToken    = this.setToken.bind(this);
		this.getToken    = this.getToken.bind(this);
		this.deleteToken    = this.deleteToken.bind(this);
		this.isLoggedServer    = this.isLoggedServer.bind(this);
	}

	setToken(token) {
		if(token && token !== 'undefined'){
			Cookie.set('token',token,{ sameSite: 'strict' });
		}
	}

	getToken() {
		return Cookie.get('token');
	}

	deleteToken() {
		Cookie.remove('token');
	}

	isLogged(pToken = null) {
		try {
			let options = {
				algorithms: ['HS256', 'HS384', 'HS512'],
				ignoreExpiration: false
			}
			let token = pToken ? pToken : this.getToken();
			if(token && token !== "undefined"){
				jwt.verify(token, "CIRO", options);
				return true;
			}
		} catch (e) {
		}
		return false;
	}

	isLoggedServer(ctx) {
		if(ctx && ctx.req && ctx.req.headers.cookie) {
			const tag_token = ctx.req.headers.cookie.split(';').find(c=>c.trim().startsWith('token='));
			if(tag_token) {
				const arr_token = tag_token.split('=');
				if(arr_token.length>0){
					return this.isLogged(arr_token[1]);
				}
			}
		}
		return false;
	}
}

export default new User();
