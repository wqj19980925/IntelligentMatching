const path = require('path')

module.exports = {
	dev: {
		// Paths
		assetsSubDirectory: 'static',
		assetsPublicPath: '/',
		proxyTable: {
			'/api': {
				target: 'http://jx254.bluearp.com',
				changeOrigin: true, // 如果接口跨域，需要进行这个参数配置
				pathRewrite: {
					'^/api': ''
				}
			}
		},
 
		host: '192.168.1.88',
		// host: 'localhost',
		port: 9200, 
		autoOpenBrowser: true,
		errorOverlay: true,
		notifyOnErrors: false,
		poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

		useEslint: false,

		showEslintErrorsInOverlay: false,

		/**
		 * Source Maps
		 */

		// https://webpack.js.org/configuration/devtool/#development
		devtool: 'cheap-source-map',

		// CSS Sourcemaps off by default because relative paths are "buggy"
		// with this option, according to the CSS-Loader README
		// (https://github.com/webpack/css-loader#sourcemaps)
		// In our experience, they generally work as expected,
		// just be aware of this issue when enabling this option.
		cssSourceMap: false
	},

	build: {
		index: path.resolve(__dirname, '../dist/index.html'),

		// Paths
		assetsRoot: path.resolve(__dirname, '../dist'),
		assetsSubDirectory: 'static',

		/**
		 * You can set by youself according to actual condition
		 * You will need to set this if you plan to deploy your site under a sub path,
		 * for example GitHub pages. If you plan to deploy your site to https://foo.github.io/bar/,
		 * then assetsPublicPath should be set to "/bar/".
		 * In most cases please use '/' !!!
		 */
		assetsPublicPath: './',

		/**
		 * Source Maps
		 */
		productionSourceMap: false,
		// https://webpack.js.org/configuration/devtool/#production
		devtool: 'source-map',

		// Gzip off by default as many popular static hosts such as
		// Surge or Netlify already gzip all static assets for you.
		// Before setting to `true`, make sure to:
		// npm install --save-dev compression-webpack-plugin
		productionGzip: false,
		productionGzipExtensions: ['js', 'css'],

		// Run the build command with an extra argument to
		// View the bundle analyzer report after build finishes:
		// `npm run build:prod --report`
		// Set to `true` or `false` to always turn it on or off
		bundleAnalyzerReport: process.env.npm_config_report || false,

		// `npm run build:prod --generate_report`
		generateAnalyzerReport: process.env.npm_config_generate_report || false
	}
}
