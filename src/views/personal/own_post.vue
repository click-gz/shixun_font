<template>
<div class="home">
  <div
      class="bk"
      style="
      font-size: 20px;
      position:fixed;
      top:66px;
      left:2%;
      width:90px;
      height:90px;
      background-color:lightcyan;
      -moz-border-radius: 50%;
      -webkit-border-radius: 50%;
   "
  >
    <div style="padding-left: 25px;padding-top: 30px;cursor: pointer" @click="back" class="back" >
      <img :src="homeicon" alt="" width="15px" style="margin-left: -10px;margin-bottom: -3px">
      首页
    </div>
  </div>
  <div class="head" style="font-size: 40px;padding-left: 20%;box-shadow:0px 0px 2px 2px #615f62; ">
    <span >
    我的推文库:

  </span>
    <span style="float: right;margin-right: 20%;"> 推文数量：
      <span style="color: #43e8e2"> {{this.post_list.length}}</span>
    </span>
  </div>

  <div class="contain" style="margin-top: 40px">
    <div v-if="post_list.length===0">
      <el-empty :image-size="200"></el-empty>
    </div>
    <div v-else style="
    width: 70%;
    margin-left: 15%;
    min-width: 700px;
    display: flex;
    flex-flow: wrap;
    padding-bottom: 10px;
  ">
      <div v-for="item in this.post_list" :key="item" class="post_card" @click="to_post(item.id)">
        <div class="title">
          《{{item.title}}》
        </div>
        <div class="create_time">
          {{item.create_time}}
        </div>
        <div class="con">
          {{item.summary}}
        </div>
        <div class="foot">
          <span>点赞数：{{item.like_num}}</span>
          <span>评论数：{{item.comment_num}}</span>
        </div>

      </div>
    </div>
  </div>
</div>
</template>

<script>
import {to_own_post} from "@/getData/getdata";

export default {
  name: "own_post",
  data(){
    return{
      homeicon: require("@/assets/home.png"),
      tot: 0,
      post_list:[],
    }
  },
  methods:{
    to_post(id){
      this.$router.push({path: '/talk/detail', query: {id: id,page:1}})
    },
    back(){
      this.$router.push({ path: '/' })
    },
    async getInfo(page){
      const res=await to_own_post(page,this.$store.state.token)

      if(res.data.code===200){
          this.tot=res.data.data.total_page
        this.post_list=res.data.data.post_list
      }else{
        alert(res.data.msg)
        this.$router.push('/')
      }
    }
  },
  mounted(){
    this.getInfo(1)
  }
}
</script>

<style scoped>
body{
  margin: 0;
}
.home{
  width: 100%;
  min-height: 100vh;
  background: url("../../assets/per_bk.png");
}
.post_card{
  width: 300px;
  height: 200px;
  margin-top: 5px;
  box-shadow: 1px 1px 1px 1px #999999;
  margin-left: 10px;
  cursor: pointer;
  background-color: #d1ffe0;
}
.post_card:hover{
  margin-top: 3px;
}
.title{
  font-size: 25px;
  font-family: 华文楷体;
  max-height: 34px;
  overflow: hidden;
}
.create_time{
  margin-left: 10px;
  color: #999999;
  font-size: small;
}
.con{
  font-family: 华文中宋;
  margin-top: 10px;
  margin-bottom: 10px;
  margin-left: 5px;
  height: auto;
  height: 104px;
  overflow: hidden;
}
.foot{
  margin-left: 50px;
}
.foot span{
  margin-right: 15px;
}
.bk:hover{
  color: #d3dce6;
}
</style>
