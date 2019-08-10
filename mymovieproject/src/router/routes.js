import Vue from 'vue'
import VueRouter from 'vue-router'

import { routes as auth } from './auth'

Vue.use(VueRouter)
const rootPath = ''
const routes =[
  {
    name:'401',
    path:'/401',
    hidden:true,
    component:r=>require(['@/components/views/error/401'],r)
  },
  ...auth
].map(route=>{
    //console.log("router routes.js route1=",route);
    route.path=rootPath+route.path//此处是获取到所有的路由地址
    //console.log("router routes.js route2=",route);
    return route;
})


export const router = new VueRouter({
  routes: routes
})
