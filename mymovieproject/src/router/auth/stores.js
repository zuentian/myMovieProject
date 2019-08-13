import {getCurrentUser,logout,register} from '../api'
import {getToken} from '../utils'

const state = {
  token:null,//token的值
  userInfo:null,//用户信息
}

const getters = {
  userInfo:state=>state.userInfo//一定要是这种写法
}

const mutations = {
  GET_CURRENTUSER(state,payload){
    state.userInfo=payload;
  },
  CLEAR_USER_INFO(state,payload){
    //removeToken()
    state.userInfo = null
  }
}

const actions = {
  AC_GetUserInfo({commit,state:{token}}){
    return getCurrentUser({token:token||getToken()}).then(response=>{//获取当前用户信息
      commit("GET_CURRENTUSER",response)
      return response;
    })
  },
  AC_Redirect2Login({dispatch,commit},targetUrl){
      return dispatch('AC_LOGOUT').then(response=>{  
      window.location.href = `#/login?targetUrl=${targetUrl?encodeURIComponent(targetUrl):encodeURIComponent(window.location.href)}`
      window.location.reload()
    })
  },
  AC_LOGOUT({dispatch,commit}){
      return logout().then(response=>{
      commit("CLEAR_USER_INFO");
    })
  },
  AC_REGISTER({dispatch,commit},payload){
    return register(payload).then(response => {
    })
  }
}

export const stores = {
  state,
  getters,
  mutations,
  actions,
  modules: {}
}
