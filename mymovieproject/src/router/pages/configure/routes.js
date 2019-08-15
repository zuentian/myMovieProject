import { routes as User } from "./user";


export const routes=[{
    name:'configure',
    path:'/configure',
    meta:{title:'配置'},
    children:[
        ...User,
    ]
}]