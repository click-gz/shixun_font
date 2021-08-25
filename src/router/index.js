import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home/Home'

Vue.use(VueRouter)
const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
  {
    path:"/",
    name:"Home",
    component:Home
  },{
    path:"/login",
    name:"login",
    component:()=>import("../views/login/login")
  },{
    path:"/register",
    name:"register",
    component:()=>import("../views/register/register")
  },{
    path:"/shop",
    name:"shop",
    component:()=>import("../views/shop/shop")
  },{
    path:"/knowledge",
    name:"knowledge",
    component:()=>import("../views/knowledge/knowledge")
  },{
    path:"/about",
    name:"about",
    component:()=>import("../views/about/about")
  },{
    path:"/talk",
    name:"talk",
    component:()=>import("../views/Talk/talk")
  },{
    path:"/personal",
    name:"personal",
    meta: {
      requireAuth: true
    },
    component:()=>import("../views/personal/personal")
  },{
    path:"/knowledge/list",
    name:"list",
    component:()=>import("../views/knowledge/list"),
    children:[
      {
        path:"/knowledge/list/list_contain",
        name:"list_contain",
        component:()=>import("../components/list_contain")
      },
    ]
  },{
    path:"/knowledge/article",
    name:"article",
    component:()=>import("../views/knowledge/article")
  },{
    path:"/knowledge/video",
    name:"video",
    component:()=>import("../views/knowledge/video")
  },{
    path:"/knowledge/type",
    name:"type",
    component:()=>import("../views/knowledge/type")
  },
  {
    path:"/forget_pwd",
    name:"pwd",
    component:()=>import("../views/login/getpwd")
  },{
    path:"/talk/add_twitter",
    name:"add_twitter",
    component:()=>import("../views/Talk/twitter")
  },{
    path:"/talk/detail",
    name:"detail",
    component:()=>import("../views/Talk/content")
  },{
    path:"/personal/own_post",
    name:"own_post",
    meta: {
      requireAuth: true
    },
    component:()=>import("../views/personal/own_post")
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
