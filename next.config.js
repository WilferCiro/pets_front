// next.config.js
const withAntdLess = require('next-plugin-antd-less');

module.exports = withAntdLess({
	// optional
	modifyVars: { '@primary-color': 'purple', '@link-color': 'purple' },
	// optional
	lessVarsFilePathAppendToEndOfContent: false,
	// optional https://github.com/webpack-contrib/css-loader#object
	cssLoaderOptions: {},

	// Other Config Here...
	images: {
		domains: [
			'127.0.0.1',
			'kiwipeluditosapi.herokuapp.com'
		],
	},

	webpack(config) {
		return config;
	},
});


/*

const withCSS = require("@zeit/next-css");
const withPWA = require('next-pwa')

//const {	nextI18NextRewrites} = require('next-i18next/rewrites')

const localeSubpaths = {}


module.exports = withPWA(withCSS({
	pwa: {
		dest: 'public',
		disable: process.env.NODE_ENV === 'development'
	},
	distDir: 'build',
	assetPrefix: process.env.NEXT_BASE_PATH || '',
	trailingSlash: true,
	//exportTrailingSlash:true,
	exportPathMap: function() {
		return {
			'/': {
				page: '/'
			}
		};
	},
	publicRuntimeConfig: {
		localeSubpaths: process.env.LOCALE_SUBPATHS === 'true',
	},
	images: {
		domains: [
			'127.0.0.1',
			'kiwipyme.pythonanywhere.com'
		],
	},
	pageExtensions: ['mdx', 'jsx', 'js', 'ts', 'tsx'],
	//rewrites: async () => nextI18NextRewrites(localeSubpaths),
	webpack(config, options) {
		config.module.rules.push({
			test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
			use: {
				loader: 'url-loader',
				options: {
					limit: 100000
				}
			}
		});

		return config;
	}
}));


*/
