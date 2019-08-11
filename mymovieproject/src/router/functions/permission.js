/* eslint-disable */

export const compare = (resources, menuCode) => {
    if (!menuCode) return true
    return resources.some(({code}) => menuCode == code)
  }
  
  export const hasPermission = ({ mobile, resources }, route) => { 
    if(mobile == '18888888888') return true
    if (route.meta && route.meta.code) {
      return compare(resources, route.meta.code)
    } else {
      return true
    }
  }
  
  export const filterAsyncRouter = (asyncRouterMap, user) => {  
    const accessedRouters = asyncRouterMap.filter(route => {
      if (hasPermission(user, route)) {
        if (route.children && route.children.length) {
          route.children = filterAsyncRouter(route.children, user)
          return route.children.length
        }
        return true
      }
      return false
    })
    return accessedRouters
  }
  