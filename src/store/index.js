import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('token') || "",
    username: localStorage.getItem('username') || "",
    avater: localStorage.getItem('avater') || "",
    logintime: localStorage.getItem('logintime')||"",
    user_id: localStorage.getItem('user_id')||"",
  },
  //同步修改state的值
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.username = name
    },
    SET_AVATER: (state, avater) => {
      state.avater = avater
    },
    SET_LOGINTIME: (state,logintime) =>{
      state.logintime = logintime
    },
    SET_USERID: (state,user_id) =>{
      state.user_id = user_id
    }
  },
  //异步调用mutations里的方法
  //context.commit 利用上下文触发mutations某个方法
  //vue代码里面 this.$store.dispatch 触发 action里面定义的方法
  actions: {
    setToken(context,token) {
      context.commit('SET_TOKEN', token)
    },
    setName(context,name) {
      context.commit('SET_NAME', name)
    },
    setAvater(context,avater) {
      context.commit('SET_AVATER', avater)
    },
    setLogintime(context,logintime) {
      context.commit('SET_LOGINTIME', logintime)
    },
    setuserid(context,user_id) {
      context.commit('SET_USERID', user_id)
    },

    clearToken(context){
      context.commit('SET_TOKEN','')
    },
    clearAvater(context){
      context.commit('SET_AVATER','')
    },
    clearUsername(context){
      context.commit('SET_NAME','')
    },
    clearUserid(context){
      context.commit('SET_USERID','')
    },
    clearLogintime(context){
      context.commit('SET_LOGINTIME','')
    }
  }

})
