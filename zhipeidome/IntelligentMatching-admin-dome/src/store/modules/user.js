import {
  loginByUsername,
  LogOut,
  getInfo
} from '@/api/login'
import {
  getToken,
  setToken,
  removeToken,
  setAccType
} from '@/utils/auth'
import {
  errorStatus
} from '@/utils/index'

const user = {
  state: {
    user: '',
    status: '',
    code: '',
    token: getToken(),
    name: '',
    avatar: '',
    introduction: '',
    setting: {
      articlePlatform: []
    },
    account_type: '',
    cashierDeskindex: ''
  },

  mutations: {
    SET_CODE: (state, code) => {
      state.code = code
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_INTRODUCTION: (state, introduction) => {
      state.introduction = introduction
    },
    SET_SETTING: (state, setting) => {
      state.setting = setting
    },
    SET_STATUS: (state, status) => {
      state.status = status
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_INFOR: (state, infor) => {
      state.infor = infor
    },
    ACCOUT_TYPE: (state, type ) => {
      state.account_type = type
    },
    CASHIERDESKINDEX: (state, type ) => {
      state.cashierDeskindex = type
    },
  },

  actions: {
    // 用户名登录
    LoginByUsername({
      commit
    }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        loginByUsername(username, userInfo.password, userInfo.login_type,userInfo.facility).then(response => {
          const data = response.data
          if (errorStatus(data)) {
            if (data.code == 200) {
              if(data.data.userinfo == undefined){
                var data1 = data.data
              }else{
                var data1 = data.data
              }
              commit('SET_TOKEN', data1.api_token)
              setAccType(data1.account_type)
              setToken(data1.api_token)
              localStorage.setItem('Admin-Token',data1.api_token)
            }
          }
          resolve(data)
        }).catch(error => {
          console.log('error', error)
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetUserInfo({
      commit,
      state
    }) {
      // console.log('111', state.token)
      return new Promise((resolve, reject) => {
        getInfo(state.token).then(response => {
          // console.log('获取用户信息1212--', response)
          const data1 = response.data
          if (errorStatus(data1)) {
            const data2 = data1.userinfo
            commit('SET_NAME', data2.adm_name)
          }
          resolve(response)
        }).catch(error => {
          // alert(1111111)
          reject(error)
        })
      })
    },

    // 第三方验证登录
    // LoginByThirdparty({ commit, state }, code) {
    //   return new Promise((resolve, reject) => {
    //     commit('SET_CODE', code)
    //     loginByThirdparty(state.status, state.email, state.code).then(response => {
    //       commit('SET_TOKEN', response.data.token)
    //       setToken(response.data.token)
    //       resolve()
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },

    // 登出
    LogOut({
      commit,
      state
    }) {
      return new Promise((resolve, reject) => {
        LogOut(state.token).then((response) => {
          // console.log('退出--', response)
          const data = response.data
          if (errorStatus(data)) {
            commit('SET_TOKEN', '')
            removeToken()
          }
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({
      commit,
      state
    }) {
      return new Promise((resolve, reject) => {
        LogOut(state.token).then((response) => {
          const data = response.data
          if (errorStatus(data)) {
            commit('SET_TOKEN', '')
            removeToken()
          }
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 动态修改权限
    ChangeRoles({
      commit,
      dispatch
    }, role) {
      return new Promise(resolve => {
        commit('SET_TOKEN', role)
        setToken(role)
        getInfo(role).then(response => {
          const data = response.data
          commit('SET_ROLES', data.roles)
          commit('SET_NAME', data.name)
          commit('SET_AVATAR', data.avatar)
          commit('SET_INTRODUCTION', data.introduction)
          dispatch('GenerateRoutes', data) // 动态修改权限后 重绘侧边菜单
          resolve()
        })
      })
    }
  }
}

export default user
