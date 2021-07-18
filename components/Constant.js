import NProgress from 'nprogress';
import Cookie   from 'js-cookie';
import jwt      from 'jsonwebtoken';
import ConstantServer from '@/components/ConstantServer';

class Constant{
	static instance = null;
	// general
	static URL_webpage = "https://kiwipyme.herokuapp.com";
	static URL_public = ConstantServer["URL_public"];
	static URL_private = ConstantServer["URL_private"];
	static URL_login = ConstantServer["URL_login"];

	// Dev
	//static URL_server = "http://127.0.0.1:8000";
	// prod
	static URL_server = ConstantServer["URL_server"];


	constructor(){
		if (Constant.instance!==null){
			return Constant.instance;
		}
		Constant.instance = this;

		this.privatePages = [];
		this.noLoggedPages = [];

		/// Routes
		this.route_index               = '/';
		this.route_index_alias         = '/';
		this.route_login               = '/login';
		this.route_login_alias         = '/login';

		this.route_mascotas            = '/mascotas';
		this.route_mascotas_alias      = '/mascotas';
		this.route_profile_mascotas            = '/mascotas/[pk]';
		this.route_profile_mascotas_alias      = '/mascotas/{0}';

		this.route_vacunas             = '/vacunas';
		this.route_vacunas_alias       = '/vacunas';

		this.route_razas               = '/razas';
		this.route_razas_alias         = '/razas';

		this.route_blog                = '/blog';
		this.route_blog_alias          = '/blog';
		this.route_subblog             = '/blog/[pk]';
		this.route_subblog_alias       = '/blog/{0}';

		this.route_tienda              = '/tienda';
		this.route_tienda_alias        = '/tienda';

		this.route_ayuda               = '/ayuda';
		this.route_ayuda_alias         = '/ayuda';

		this.route_perdidas            = '/perdidas';
		this.route_perdidas_alias      = '/perdidas';


		/*** IMÁGENES ***/
		this.img_logo                       = "/images/general/logo.png";
		this.img_lupa_white                 = "/images/icons/lupa-white.svg";
		this.img_box_black                  = "/images/icons/box-black.svg";
		this.img_shop_black                 = "/images/icons/shop-black.svg";
		this.img_flash_black                = "/images/icons/flash-black.svg";
		this.img_shoppingcart_black         = "/images/icons/shopping-cart-black.svg";
		this.img_user_white                 = "/images/icons/user-white.svg";
		this.img_promotions_white           = "/images/icons/promotion-white.svg";

		this.img_producto_empty             = "/images/general/product_empty.png";

	}

	formatString(s) {
		s = s.toLowerCase();
		s = s.charAt(0).toUpperCase() + s.slice(1)
		return s;
	}

	getServer() {
		return Constant.URL_server;
	}
	getPublicEndpoint() {
		return Constant.URL_server + Constant.URL_public;
	}
	getPrivateEndpoint() {
		return Constant.URL_server + Constant.URL_private;
	}
	getLoginEndPoint() {
		return Constant.URL_server + Constant.URL_login;
	}

	get_key() {
		return "123";
	}


}

export default  new Constant();

/**
 * @returns {string} a
 * @memberof Constant
 */
String.prototype.format = function () {
    let a = this;
    for (let k in arguments) {
        a = a.replace("{" + k + "}", encodeURIComponent(arguments[k]));
    }
    return a
};

/**
 * @param {number} decimales -Decimales aproximación
 * @param {number}  valor -Valor
 * @returns {number}
 * @memberof Constant
 */
String.prototype.redondear = (valor,decimales) => {
    decimales = (decimales===undefined && decimales == null)?2:decimales;
    return Math.round(parseFloat(valor) * Math.pow(10, parseFloat(decimales))) / Math.pow(10, parseFloat(decimales));
}

String.prototype.removeAccents  = function (name ){
	let data = name.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
	data = data.replace(/\//g, '-');
	return data.replace(/ /g, "-");
}
