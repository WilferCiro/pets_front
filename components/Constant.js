import NProgress from 'nprogress';
import Cookie   from 'js-cookie';
import jwt      from 'jsonwebtoken';
import ConstantServer from '@/components/ConstantServer';
import moment from 'moment';
moment.locale('es');

class Constant{
	static instance = null;
	// general
	static URL_webpage = "https://kiwipyme.herokuapp.com";
	static URL_public = ConstantServer["URL_public"];
	static URL_private = ConstantServer["URL_private"];
	static URL_login = ConstantServer["URL_login"];
	static URL_recover = ConstantServer["URL_recover"];
	static Name_webpage = "Kiwi Peluditos";

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

		this.route_ayuda               = '/ayuda';

		this.route_perdidas            = '/perdidas';
		this.route_recover             = '/recover'
		this.route_profile             = '/profile'


		/*** IMÁGENES ***/
		this.img_logo                       = "/images/general/logo.png";
		this.img_no_mascota                 = "/images/general/logo.png";
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

	get_key() {
		return "123";
	}


}

export default  new Constant();


String.prototype.formatDateTime = function () {
	let a = this;
	let date = new Date(a);
	return moment(a).format('DD MMMM [de] YYYY, h:mm:ss a');
};
