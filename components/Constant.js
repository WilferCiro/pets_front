import NProgress from 'nprogress';
import Cookie   from 'js-cookie';
import jwt      from 'jsonwebtoken';
import ConstantServer from '@/components/ConstantServer';
import moment from 'moment';
moment.locale('es');

class Constant{
	static instance = null;
	// general
	static URL_public = ConstantServer["URL_public"];
	static URL_private = ConstantServer["URL_private"];
	static URL_login = ConstantServer["URL_login"];
	static URL_recover = ConstantServer["URL_recover"];
	static Name_webpage = "Kiwi Peluditos";
	static URL_FRONT    = ConstantServer["URL_FRONT"];
	static URL_PAYU     = ConstantServer["URL_PAYU"];

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
		this.route_login               = '/login';

		this.route_mascotas            = '/mascotas';
		this.route_profile_mascotas    = '/mascotas/[pk]';

		this.route_vacunas             = '/vacunas';

		this.route_razas               = '/razas';

		this.route_blog                = '/blog';
		this.route_subblog             = '/blog/[pk]';

		this.route_tienda              = '/tienda';
		this.route_tienda_cat1         = '/tienda/1/[categoria1]';
		this.route_tienda_cat2         = '/tienda/2/[categoria2]';
		this.route_tienda_cat3         = '/tienda/3/[categoria3]';

		this.route_ayuda               = '/ayuda';

		this.route_perdidas            = '/desaparecidas';
		this.route_recover             = '/recover'
		this.route_profile             = '/profile'
		this.route_cart                = '/cart'
		this.route_pay                 = '/pay'
		this.route_cookies             = '/cookies'
		this.route_condiciones         = '/condiciones'
		this.route_profile_producto    = '/producto/[pk]'


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

		this.img_index_video        = "/images/index/video.png";
		this.img_producto           = "/images/general/producto.jpg";
		this.img_user               = "/images/general/user.jpg";
		this.img_no_mascota         = "/images/general/user.jpg";
		this.img_huella             = "/images/index/huella.svg";
		this.img_huella_qr          = "/images/index/huella_qr.svg";
		this.img_huella_shop        = "/images/index/huella_shop.svg";
		this.img_swipe              = "/images/index/swipe.svg";


		/// Documentos legales
		this.registrar_document   = "https://ant.design/components/button/#API";

	}

	formatString(s) {
		s = s.toLowerCase();
		s = s.charAt(0).toUpperCase() + s.slice(1)
		return s;
	}

	getWebName() {
		return Constant.Name_webpage;
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
	getRecoverEndPoint() {
		return Constant.URL_server + Constant.URL_recover;
	}
	getUrlFront() {
		return Constant.URL_FRONT;
	}

	get_key() {
		return "123";
	}

	getPayuUrl() {
		return Constant.URL_PAYU;
	}


}

export default  new Constant();


String.prototype.formatDateTime = function () {
	let a = this;
	let date = new Date(a);
	return moment(a).format('DD MMMM [de] YYYY, h:mm:ss a');
};

String.prototype.formatDate = function () {
	let a = this;
	let date = new Date(a);
	return moment(a).format('DD MMMM [de] YYYY');
};
String.prototype.formatURL  = function (){
	let name = this;
	let data = name.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
	data = data.replace(/\//g, '-');
	return data.replace(/ /g, "-");
}
Number.prototype.formatPrice = function () {
	let a = this;
	return a.toLocaleString('es-CO', {style: 'currency',currency: 'COP', minimumFractionDigits: 2})
};
