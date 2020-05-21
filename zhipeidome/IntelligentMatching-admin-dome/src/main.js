import Vue from 'vue'

import Cookies from 'js-cookie'
import elTableInfiniteScroll from 'el-table-infinite-scroll';

import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import Print from 'vue-print-nb'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import moment from 'moment'//引入进行格式转换
import '@/styles/common.scss' // global css
import '@/styles/index.scss' // global css
import '@/styles/element-ui.scss' // global css
import '@/styles/btn.scss' // global css

　　
import App from './App'
import router from './router'
import store from './store'


import i18n from './lang' // Internationalization
import './icons' // icon
import './errorLog' // error log
import './permission' // permission control

import '@/assets/map/city-data'
import echarts from 'echarts'
// import './mock' // simulation data

// import * as filters from './filters' // global filters

// Vue.use(Element, {
//   size: Cookies.get('size') || 'medium', // set element-ui default size
//   i18n: (key, value) => i18n.t(key, value)
// })
// Vue.use(elTableInfiniteScroll);
// register global utility filters.
// Object.keys(filters).forEach(key => {
//   Vue.filter(key, filters[key])
// })
// Vue.filter('datefmt', function (input, fmtstring) {
//   return moment.unix(input).format(fmtstring)
// })
Vue.use(Element)
new Vue({
	el: '#app',
	router,
	store,
	i18n,
	render: h => h(App)
})
