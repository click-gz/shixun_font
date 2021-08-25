<template>
<div>
  <el-container>
    <el-header class="header">

      <div class="back" @click="back" style="width: 200px">  <img :src="home" alt="" style="width: 23px;margin-right: 5px">
        <div style="font-size: 20px;font-weight: bolder" >返回主页</div>
      </div>
    </el-header>
    <el-container>
      <el-aside width="200px" class="aside">
        <el-menu style="margin-top: 100px;background-color: transparent;margin-left: -4px" default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
          <div v-for="(item,index) in summary" :key="index">
            <router-link :to="{path: '/knowledge/list/list_contain' , query: { id : index+1 }}"  >
              <el-menu-item :index="index+1">
                <img :src="medical" width="23px" alt="">
                <span slot="title" style="margin-left: 4px">{{item}}</span>
              </el-menu-item>
            </router-link>
          </div>





        </el-menu>

        <el-radio-group>
          <div style="background-color: lightgoldenrodyellow;margin-left: 10px;margin-top: 10px;cursor: pointer" @click="turn" class="turn">
            <img :src="openicon" width="20px">
          </div>
        </el-radio-group>

      </el-aside>
      <el-main class="main">
        <router-view></router-view>

      </el-main>
    </el-container>
  </el-container>
</div>
</template>

<script>
export default {
  name: "list",
  data() {
    return {
      home: require("@/assets/home.png"),
      medical: require("@/assets/medical.png"),
      surgery: require("@/assets/shu.png"),
      burn: require("@/assets/burn.png"),
      bone: require("@/assets/medical_body_bones.png"),
      openicon: require("@/assets/open_top.png"),
      isCollapse: true,
      summary:
          ["儿童康复",
            "脑颅损伤康复",
            "脊髓损伤康复",
            "周围神经损伤康复",
            "骨关节康复",
            "烧伤与疤痕康复",
            "疼痛康复",
            "心肺康复",
            "老年病康复",
            "运动与软组织损伤康复"
          ],

  };
  },
  methods: {
    back(){
      this.$router.push("/")
    },
    turn(){
      this.isCollapse=!this.isCollapse
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
}
</script>

<style scoped>
body{
  margin: 0;
}

a{
  text-decoration: none;
}
.header{
  background-color: skyblue;
  position: fixed;
  width:100%;
  z-index:10;
}
.back{
  display: flex;
  width: 90px;
  margin-top: 15px;
  color: black;
  cursor: pointer;
}
.back:hover{
  color: white;
}
.aside{
  position: fixed;
  height: 100%;
  width: 100%;
}
.turn:hover img{
  width: 22px;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}

.main{

  padding-top: 60px;
  padding-left: 200px;
  padding-right: 0;
}

</style>
