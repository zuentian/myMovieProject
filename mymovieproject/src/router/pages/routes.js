export const routes=[
    {
        name:'',
        path:'',
        redirect:'dashboard',
        children:[{
            path:'dashboard',
            component:r=>require(['@/components/pages/dashboard/index'],r),
            name:'dashboard',
            meta:{title:'首页',noCache:false}
        }]
    }
]