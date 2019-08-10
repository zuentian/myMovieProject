import { store, router } from '../router'
import NProgress from 'nprogress'

const configRouter = (options) => {

  console.log("configRouter",options)
  NProgress.configure({ showSpinner: false })//进度条，不显示环形动画
  router.beforeEach(async function(to, from, next) {
  NProgress.start()
  if (process.env.WHITE_LIST.indexOf(to.path) !== -1) { // 是否在白名单内,设置white_list里的值，可以让/login不会校验，直接正常登录
   //        next()
  //     } else if (!store.getters.userInfo) {// 内存中不存在用户，需要获取登录用户信息
  //           store.dispatch('AC_GetUserInfo').then(user => {
  //           //return store.dispatch('AC_GenerateRoutes', user)
  //         }).then((routers) => {
  //           router.addRoutes(routers)
  //           next({...to, replace: true})
  //         }).catch(err => {
  //           store.dispatch('AC_Redirect2Login')
  //         })
  //     } else {// 存在说明登录正常跳转
  //         next()
    }
  
   })
  
  router.afterEach(() => {
    NProgress.done()
  })


}


export const config = () => {
    const options = { store, router }
    //options.HOST = process.env.HOST
    configRouter(options);
    return {
      store,
      router
    }
  }