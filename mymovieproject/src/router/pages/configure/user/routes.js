export const routes=[{
    name:'user-list',
    path:'user-list',
    meta:{
        meta:null,title:'用户管理',code:'menu:user-list'
    },
    component:()=>import('@/components/pages/configure/user/UserList.vue')
}]