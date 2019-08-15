import {routes as reception} from './reception'
import {routes as configure } from './configure'

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
    },
    ...reception,
    ...configure
]