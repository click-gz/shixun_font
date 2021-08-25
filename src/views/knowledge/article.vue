<template>
<div class="contain" id="main">
  <div class="breadcrumb" >
    <el-breadcrumb separator-class="el-icon-arrow-right" style="font-size: 23px;">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{path: '/knowledge/list/list_contain' , query: { id : Number(this.type) }}">知识圈</el-breadcrumb-item>

      <el-breadcrumb-item > 文章详情</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
  <div class="adjust">
    <div  class="btu" style="padding-left: 10px;padding-right: 10px;border: 1px solid #99a9bf" @click="change_background">
      夜间模式
    </div>
    <div class="btu b1" style="padding-left: 10px;padding-right: 10px;border: 1px solid #99a9bf"
         @mouseover="mouseOver"
         @mouseleave="mouseLeave"

    >
      文章背景
      <div style="width: auto;position: absolute">
        <div class="choose" >
          <ul class="drop-menu" id="color">
            <li id="color1" @click="change_page(1)">默认</li>
            <li id="color2" @click="change_page(2)">浅灰</li>
            <li id="color3" @click="change_page(3)">蓝色</li>
            <li id="color4" @click="change_page(4)">绿色</li>
            <li id="color5" @click="change_page(5)">深灰</li>
          </ul>
        </div>
      </div>

    </div>
    <div class="btu b2" style="padding-left: 10px;padding-right: 10px;border: 1px solid #99a9bf"
         @mouseover="mouseOver2"
         @mouseleave="mouseLeave2"

    >
      字体大小
      <div style="width: auto;position: absolute">
        <div class="choose" style="background-color: rgb(164,219,242)" >
          <ul class="drop-menu d2" >
            <li style="font-size: initial" @click="change_font(1)">默认</li>
            <li style="font-size: larger" @click="change_font(2)">偏大</li>
            <li style="font-size: small" @click="change_font(3)">偏小</li>
          </ul>
        </div>
      </div>

    </div>
  </div>

  <div class="inner">
    <div class="page">
      <div class="title">
        《 {{con.title}} 》
      </div>
      <div class="bet" >
        <div  class="author">
          发布者：{{con.author_name}}
        </div>

        <div class="time">
          发布时间：{{con.create_time}}
        </div>
        <div style="float: left;margin-left: 100px;width: auto;">
          <i class="el-icon-view"></i>
          <span>
            阅读量:{{con.view}}
          </span>
          <span v-if="is_like===0" style="margin-left: 20px" @click="likeit">
            <img :src="zan1" style="width: 20px;cursor: pointer">
            <span>
              点赞数:{{like_num}}
            </span>
          </span>
          <span v-else style="margin-left: 20px;cursor: pointer" @click="likeit">
            <img :src="zan2" style="width: 20px;">
            <span style="color: rgb(18,150,219)">
              点赞数:{{like_num}}
            </span>
          </span>
        </div>
      </div>

      <div  v-html="this.article" class="article_content" style="font-family: 华文楷体;font-size: 25px">

      </div>
    </div>

  </div>

</div>
</template>

<script>
import {get_article, like_article} from "@/getData/getdata";

export default {
  name: "article",
  data(){
    return {
      zan1: require("@/assets/zan1.png"),
      zan2: require("@/assets/zan2.png"),
      is_like:0,
      bk: false,
      article: null,
      id: 1,
      type:1,
      con:null
    }
  },
  methods:{
     async likeit(){
       if(this.$store.state.user_id){
         const res=await like_article(this.id,this.$store.state.user_id,this.is_like)
         if(res.data.code===200){
           this.is_like=res.data.data.is_like
           this.like_num=res.data.data.like_num
         }else{
           alert(res.data.msg)
         }
       }else{
         alert("请先登录!!!")
         this.$router.push('/login')
       }

    },
    mouseOver2: function(){
      let col=document.getElementsByClassName("choose")[1]
      col.style.display="block"
    },
    mouseLeave2: function () {
      let col=document.getElementsByClassName("choose")[1]
      col.style.display="none"
    },
    mouseOver: function(){
      let col=document.getElementsByClassName("choose")[0]
      col.style.display="block"
    },
    mouseLeave: function () {
      let col=document.getElementsByClassName("choose")[0]
      col.style.display="none"
    },
    change_font(type){
      let dom=document.getElementsByClassName("article_content")[0];
      //154,154,154
      if(type===1){
        dom.style.fontSize="25px"
      }else if(type===3){
        dom.style.fontSize="20px"
      }else{
        dom.style.fontSize="35px"
      }
    },
    change_page(color){
      let dom=document.getElementsByClassName("page")[0];
      //154,154,154
      let art=document.getElementsByClassName("inner")[0];
      if(color===1){
        dom.style.backgroundColor="#cce8b6"
        art.style.color="rgb(10,10,10)"
      }else if(color===2){
        dom.style.backgroundColor="rgb(239,239,239)";
        art.style.color="rgb(10,10,10)"

      }else if(color===3){
        dom.style.backgroundColor="rgb(210,230,250)";
        art.style.color="rgb(10,10,10)"
      }else if(color===4){
        dom.style.backgroundColor="rgb(210,239,195)";
        art.style.color="rgb(10,10,10)"
      }else {
        dom.style.backgroundColor = "rgb(53,52,52)";
        art.style.color="rgb(254,254,254)"

      }
    },
    change_background(){
      let page=document.getElementsByClassName("page")[0];
      let dom=document.getElementById("main");
      let bread=document.getElementsByClassName("breadcrumb")[0]
      let art=document.getElementsByClassName("inner")[0];
      if(!this.bk){
        dom.style.backgroundColor="rgb(53,52,52)"
        bread.style.backgroundColor="rgb(130,129,132)"
        page.style.backgroundColor = "rgb(53,52,52)";
        art.style.color="rgb(254,254,254)"
      }else{
        dom.style.backgroundColor="rgb(210,239,195)"
        bread.style.backgroundColor="transparent"
        page.style.backgroundColor = "rgb(204,232,182)";
        art.style.color="rgb(10,10,10)"
      }
      this.bk=!this.bk

    },
    async get() {
      // 获取用户信息
      try {
        let uid=-1
        if(this.$store.state.user_id)
        {
          uid=this.$store.state.user_id
        }else{
          uid=-1
        }
        //const表示在方法中定义一个变量，和var类似
        const result = await get_article(this.id,uid);
        //result本身还有一层包装，看打印日志
        if (result.data.code === 200) {
          this.con=result.data.data
          this.article = result.data.data.content.replace(/\n/g, '<br>')
          this.like_num=result.data.data.like_num
          this.is_like=result.data.data.is_like
          this.id=result.data.data.id

          console.log(this.con);


        }
      } catch (error) {
        console.log(error);
      }
    },
  },
  created(){
    this.$nextTick(function () {
      //获取传递的参数
      this.id=this.$route.params.id;
      this.type=this.$route.params.type;
    })

  },
 watch: {
    id(){
      this.get()
    }

  }
}
</script>

<style scoped>
body{
  margin: 0;
  width: 100%;
  height: 100vh;

}
.contain{
  min-height:100vh;
  width: 100%;
  background-color: rgb(210,239,195);
}
.breadcrumb{
  width: 300px;
  height: auto;
  margin-left: 15%;
  margin-top: 20px;
  position: absolute;
}
.adjust{
  position: absolute;
  margin-left: 70%;
  width: 280px;
  display: flex;
  margin-top: 15px;
}
.btu{
  cursor: pointer;

}
.btu:hover{
  background-color: #43e8e2;
}
.choose{
  background-color: #9ac7e8;
  margin-top: 3px;
  margin-right: -3px;
  width: 80px;
  display: none;
}
ul{
  list-style: none;
  cursor: pointer;
  padding-left: 30%;
}
li{
  padding: 0;
}
li:hover{
  font-size: 18px;
}
#color1{
  color: #cce8b6;
}
#color2{
  color: rgb(239,239,239);
}
#color3{
  color:rgb(210,230,250);
}
#color4{
  color: rgb(210,239,195);
}
#color5{
  color: rgb(154,154,154);
}
.inner{
  padding-top: 50px;
  height: auto;
  overflow: hidden;
}
.page{
  width: 70%;
  min-width: 800px;
  margin-left: 15%;
  background-color: #cce8b6;
  padding-bottom: 80px;
  padding-top: 20px;
}
.article_content{
  width: 90%;
  margin-left: 5%;
  letter-spacing: 3px;
  padding-top: 5px;
}
.title{
  padding-left: 10%;
  font-size: 40px;
  font-family: 华文楷体;
}
.bet{
  margin-top: 10px;
  height: 20px;
  width: 90%;
  margin-left: 5%;
  padding-bottom: 10px;
  margin-bottom: 20px;
  border-bottom: 1px solid lightsteelblue;
}
.author{
  font-family: "Agency FB";
  width: auto;
  float: left;
  margin-left: 5%;
}
.time{
  float: left;
  width: auto;
  margin-left: 100px;
}
d2 li{
  margin-top: 2px;
}
.d2 li:hover{
  padding-bottom: 3px;
}
</style>
