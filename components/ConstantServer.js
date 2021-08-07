const isProduction = false;

const ConstantServer = {
	URL_public        : '/api/public/',
	URL_private       : '/api/private/',
	URL_login         : '/api/login/',
	//URL_server        : 'https://kiwipeluditosapi.herokuapp.com',
	URL_server        : !isProduction ? 'http://127.0.0.1:8000' : 'https://kiwipeluditosapi.herokuapp.com',
	URL_recover       : '/api/public/recover/',
	URL_FRONT         : 'https://kiwipeluditos.herokuapp.com',
	URL_PAYU          : !isProduction ? 'https://sandbox.checkout.payulatam.com/ppp-web-gateway-payu/' : 'https://sandbox.checkout.payulatam.com/ppp-web-gateway-payu/'
};
// 'https://checkout.payulatam.com/ppp-web-gateway-payu/'
export default ConstantServer;
