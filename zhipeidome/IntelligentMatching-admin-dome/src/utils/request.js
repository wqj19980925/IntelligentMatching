import axios from 'axios'
import {Message,MessageBox} from 'element-ui'
import store from '@/store'
import {getToken,removeToken} from '@/utils/auth'

// 自定义配置创建axios的新实例
const service = axios.create({
	baseURL: process.env.BASE_API, // api 的 base_url 将被添加到`url`前面
	timeout: 5000, // request timeout
	params: {} // 无论请求为何种类型，在params中的属性都会以key=value的格式在urlzhong拼
	// headers: {
	//	 'Access-Control-Allow-Methods': '*',
	//	 'Access-Control-Allow-Headers': 'X-Custom-Header',
	//	 'Access-Control-Allow-Credentials': true,
	//	 'Access-Control-Max-Age': '1728000'
	// }
	
})
// request interceptor 添加请求拦截器
service.interceptors.request.use(
	config => {
		// 在发送请求之前做某事
		// Do something before request is sent
		// if (store.getters.token) {
		//	 // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
		//	 config.data.api_token =localStorage.getItem('Admin-Token') /*getToken()*/
		// }
		const toKen = localStorage.getItem('Admin-Token');
		if(toKen){
			config.data.api_token = toKen;
		}else{
			config.data.api_token = '';
		}
		return config
	},
	error => {
		// Do something with request error //请求错误时做些事
		// console.log('err111111111', error) // for debug
		Promise.reject(error) // 返回一个被拒绝的Promise对象 用于调试
	}
)

// response 成功 拦截器
service.interceptors.response.use(
	response =>{
		const res = response.data;
		// console.log( response.data.code)
		if (res.code === 300) {
			if (res.code === 300) {
				// MessageBox.confirm('您已被登出，请重新登录', '确定登出', {
				//	 confirmButtonText: '重新登录',
				//	 // cancelButtonText: '取消',
				//	 showCancelButton:false,
				//	 type: 'warning'
				// }).then(() => {
					removeToken('Admin-Token')
					localStorage.removeItem('Admin-Token')
					// router.push("/login")
					store.dispatch('LogOut').then(() => {
						location.reload() // 为了重新实例化vue-router对象 避免bug
					})
				// })
			}
			return Promise.reject('error');
		} else {
			 return response
		}
		// else if(res.ErrorCode === 1003){
		//			 MessageBox.confirm(res.ErrorMessage, '确定', {
		//				 confirmButtonText: '确定',
		//				 // cancelButtonText: '取消',
		//				 showCancelButton:false,
		//				 type: 'warning'
		//			 }).then(() => {
		//				 // store.dispatch('FedLogOut').then(() => {
		//				 //	 location.reload() // 为了重新实例化vue-router对象 避免bug
		//				 // })
		//				 // this.$router.go(-1);
		//				 next()
		//			 })
		//			 return Promise.reject('error');
		// } 
	},
	error =>{
		return error
	}
)
export default service
