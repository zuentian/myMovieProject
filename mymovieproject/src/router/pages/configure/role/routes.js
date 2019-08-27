export const routes=[{
    name:"role-list",
    path:"role-list",
    meta:{
        title:"角色管理",
        code:"menu:role-list",
    },
    component:()=>import('@/components/pages/configure/role/RoleList.vue')
}]