import HumButton from '@/components/HumButton.vue'
import RouteSon from '@/views/RouteSon.vue'
import MyrouteTest from '@/views/MyrouteTest.vue'
import NotFound from '@/views/NotFound.vue'
import LevelTwo from '@/views/LevelTwo.vue'


import MyArticle from '../views/MyArticle.vue'
import MyCollect from '../views/MyCollect.vue'
import MyLike from '../views/MyLike.vue'
import MyUser from '../views/MyUser.vue'

import VueRouter from 'vue-router'
import Vue from 'vue'
Vue.use(VueRouter)
const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/HumButton' },
    // redirect重定向
    { name:'HumButton', path: '/HumButton', component: HumButton },
    { name:'RouteSon',  path: '/RouteSon/:words?', component: RouteSon },
    // 可以使用name，在path过长时使用
    {
      name: 'MyrouteTest', path: '/MyrouteTest/:words?', component: MyrouteTest,
      children: [{
        // 如果children不写path，则路由出口会默认在这个组件
        name: 'two' , path: 'LevelTwo/:item?' , component: LevelTwo
      },{ path: 'article', component:MyArticle },
      { path: 'collect', component:MyCollect },
      { path: 'like', component:MyLike },
      { path: 'user', component:MyUser},
      ]
    },
    // 动态路由默认情况下必须传参，不传参就空白，但如果加上一个可选符‘?’就可以不传参了
    { path: '*', component: NotFound },
    // 配置404返回页需要在最后，用*
    ],
  linkActiveClass: 'link-active',
  linkExactActiveClass: 'link-e-active',
  mode:"history",
    /* 
        模式设置：hash模式(默认)       http://localhost:8080/#/xxx
                 history模式(常用)    http://localhost:8080/xxx     (更自然但是上线之后需要服务器端支持)
     */
})
export default router

/*
    区分一下route和router
    route是只读的，你不能直接修改它的值，用来访问当前路由的各种信息
    router 是 Vue Router 的路由实例,提供了一系列方法，如 push、replace、go、forward、back 等，用于在不同的场景下操作路由
 */