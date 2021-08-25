<template>
  <div class="affix-container" style="font-size: 25px;font-family: '幼圆';font-weight: bold">
    <el-affix target=".affix-container" :offset="80">
    <div class="topnav">
        <div id="tit">康复训练平台</div>
        <div class="topm">
          <div class="menu leftm" @click="ToHome">首页</div>
          <div class="menu" @click="ToTalk">讨论圈</div>

          <div class="menu" @click="ToKnw">知识圈</div>
          <div class="menu" @click="ToAbout">关于我们</div>
        </div>

      <div class="per" v-show="Info.username !== '' " @click="person" >

        <el-dropdown style="width: auto;height: 100%"  @command="handleCommand">
          <div type="primary" style="display: flex">
            <img :src="Info.avater" @click="get" id="user_avater">
            <div id="username">{{Info.username}}</div>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="a">
                个人主页
            </el-dropdown-item>
            <el-dropdown-item command="b">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>

      <div class="user"  v-show="Info.username === '' ">
        <div class="button" @click="login">登录</div>
        <div class="button" @click="register">注册</div>
      </div>

    </div>

    </el-affix>


  </div>

</template>
<script>
export default {
  name: "Header",
  props: {
    Info: {
      type: Object,
      required: true,
    }
  },
  data(){
    return {
      turn: 1
    }
  },

  methods:{
    handleCommand(command) {
        if(command==="a"){
          this.person()
        }else{
          this.signOut()
        }
    },
    async signOut() {
      // 退出登录，清除token
      // this.$store.dispatch 触发 action里面定义的方法
      await this.$store.dispatch('clearToken')
      await this.$store.dispatch('clearUsername')
      await this.$store.dispatch('clearAvater')
      await this.$store.dispatch('clearUserid')
      await this.$store.dispatch('clearLogintime')

      localStorage.removeItem('token')
      localStorage.removeItem('username')
      localStorage.removeItem('avater')
      localStorage.removeItem('user_id')
      localStorage.removeItem('logintime')
      //刷新界面
      location.reload()
    },
    get(){
      console.log("avater:"+this.Info.avater)
    },
    person(){
      this.$router.push('/personal')
    },
    ToHome(){
      this.$router.push('/')
    },
    ToTalk(){
      this.$router.push('/talk')
    },
    // ToShop(){
    //   this.$router.push('/shop')
    // },
    ToKnw(){
      this.$router.push('/knowledge')
    },
    ToAbout(){
      console.log(this.Info.username);
      this.$router.push('/about')
    },
    login(){
      this.$router.push('/login')
    },
    register(){
      this.$router.push('/register')
    }
  },
  created() {

  }
}
</script>

<style scoped>
#user_avater{
  width: 60px;
  height: 60px;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
}
.topnav{
  padding-top: 5px;
  background-color:rgb(51, 133, 255);
  display: flex;
  border: 0;
  height: 60px;
}
.leftm{
  margin-left: 100px ;
}
.topm{
  display: flex;
  width: 70%;
}
.menu{
  color: white;
  flex:1;
  padding-top: 10px;
  padding-left: 20px;
  text-align: center;
}
.menu:hover{
  color: rgb(13,13,12);
  cursor: pointer;
}
#tit{
  margin-left: 100px;
  padding-top: 10px;
  cursor: default;
  color: white;
}
.topnav span{
  height: 100%;
}
.per{
  cursor: pointer;
}

#username{
  text-align: center;
  font-size: larger;
  line-height: 70px;
  margin-left: 10px;
  color: white;
  width:auto;
  display: inline;
}
.user:hover{
  cursor: pointer;
}
.user{

  width: 180px;
  display: flex;
}
.button{
  height: 20px;
  margin-top: 20px;
  flex:1;
  background-color: transparent;
  border: 1px solid white;
  color: white;
  font-size: 13px;
  margin-left: 15%;
  padding-left: 17px;
  padding-top: 3px;

}
.button:hover{
  color: rgb(51,133,255);
  background-color: rgb(213,227,251);
}
</style>
