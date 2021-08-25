import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueCoreVideoPlayer from 'vue-core-video-player'

Vue.use(VueCoreVideoPlayer)
require("./mock/mock")

Vue.config.productionTip = false

Vue.prototype.HOST = '/api';

Vue.use(ElementUI);

//路由拦截, 拦截全部路由，每次操作路由都是被拦截进行判断
router.beforeEach((to, from, next) => {

  const token = localStorage.getItem('token')
  //筛选需要传token的页面, 匹配router里面需要登录的路径，如果匹配到就是true
  if (to.matched.some(res => res.meta.requireAuth)) {
    //根据token判断是否跳转登录页
    if (token) {
      next()
    } else {
      alert("请先登录！！！")
      next({ path: '/login'})
    }
  } else {
    next()
  }
})



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
