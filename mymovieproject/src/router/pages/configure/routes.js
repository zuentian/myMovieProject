import { routes as User } from "./user";
import {routes as Dict} from "./dict";


export const routes=[{
    name:'configure',
    path:'/configure',
    meta:{title:'配置'},
    children:[
        ...User,
        ...Dict,
    ]
}]