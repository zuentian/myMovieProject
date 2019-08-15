import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
import { stores as auth } from './auth'
import {stores as pages} from './pages'
import { filterAsyncRouter } from './functions'
import{constRouterMap,asyncRouterMap } from './routes'
import { app, errorLog,tagsView } from './utils'
Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'//如果是生产环境就不用显示debug


//状态管理
//当我们在页面上点击一个按钮，它会处发(dispatch)一个action, 
//action 随后会执行(commit)一个mutation, mutation 立即会改变state,
// state 改变以后,我们的页面会state 获取数据，页面发生了变化。

const state = {
    routers:constRouterMap,
    addRouters:[],
    loading:false,
}
const getters = {
    addRouters:state=>state.addRouters,
    routers:state=>state.routers,
    loading:state=>state.loading,
}

const actions = {

    AC_GenerateRoutes({commit},user){//此处开始涉及权限路由，感觉很难
        return new Promise(resolve=>{
            const accessedRouters=filterAsyncRouter(asyncRouterMap,user)
            commit('SET_ROUTERS',accessedRouters)
            resolve(accessedRouters)
            console.log("AC_GenerateRoutes accessedRouters", accessedRouters);
        })
    }

}
const mutations = {
    SET_ROUTERS: (state, routers) => {
        console.log("AC_GenerateRoutes SET_ROUTERS",state,routers,constRouterMap);
        state.addRouters = routers
        state.routers = constRouterMap.concat(routers)
    },
    SHOW_ERROR_TOAST(state, message) {
    Vue.modal.toast({
        showClose: true,
        message: message,
        type: 'error'
    })
    },
}
export const store = new Vuex.Store({

    //state为单一状态树，在state中需要定义我们所需要管理的数组、对象、字符串等等，
    //只有在这里定义了，在vue.js的组件中才能获取你定义的这个对象的状态。
    state,
    //如果state需要派生，即需要计算，可以将值放入getters
    getters,
    //更改store中state状态的唯一方法就是提交mutation，就很类似事件。
    //每个mutation都有一个字符串类型的事件类型和一个回调函数，我们需要改变state的值就要在回调函数中改变。
    //我们要执行这个回调函数，那么我们需要执行一个相应的调用方法：store.commit。
    //mutation 必须同步执行
    mutations,
    //Action 通过 store.dispatch 方法触发
    //可以异步执行
    actions,
    modules:{
        //Vuex 允许我们将 store 分割成模块（module）。
        //每个模块拥有自己的 state、mutation、action、getter、甚至是嵌套子模块——从上至下进行同样方式的分割
        auth,
        app,
        errorLog,
        tagsView, 
        pages,
    },
    //插件作用通常是用来监听每次 mutation 的变化，来做一些事情。
    plugins:debug?[createLogger()]:[]//为了打印日志

})
