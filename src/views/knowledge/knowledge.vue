<template>
<div class="btp" style="height:calc(100vh); overflow: auto">
  <div
      style="
      position:fixed;
      top:50px;
      left:2%;
      width:80px;
      height:80px;
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



  <div v-for="(value,item) in video" :key="item" class="contain_class" >

    <div class="contain_class_name">
      <div class="name" @click="to_list(Number(item.replace('video','')))">{{map[item]}}</div>

    </div>
    <div class="video_contain">
      <div v-for="res in value" :key="res" class="video_class_item"  @click="to_video(res['id'],Number(item.replace('video','')))">
        <div class="single_video">
          <img :src="res['summary']" style="width: 180px;height: 180px;margin-left: 10px">

          <textarea class="video_item_title" rows="3" cols="20" v-model="res['title']" disabled
                    style="background-color: transparent;
                    margin-left: 20px;
                    font-family: '幼圆';
                    font-size: 15px;
                     font-weight: bolder">

          </textarea>
          <div class="video_item_author">
            发布者：{{res['author']}}
          </div>
        </div>


      </div>

    </div>

    <div class="article_contain" >
      <img :src="linesrc" class="line">
      <div v-for="con in article['article'+item.replace('video','')]" :key="con" class="article_card">
       <div class="article_title" style="font-family: '幼圆';font-weight: bolder">
         {{con["title"]}}
       </div>
       <div class="article_time">
         <img :src="iconsrc" style="width: 15px;margin-right: 0px;">
         发表于：{{con["create_time"]}}
       </div>
       <div class="article_summary">
         摘要：{{con["summary"]}}
       </div>

       <div class="article_detail" @click="to_article(con['id'],item.replace('video',''))">
         阅读原文 >>
       </div>
     </div>

    </div>

  </div>
  <el-backtop target=".btp" :visibility-height = 10></el-backtop>
</div>
</template>

<script>
import {getknowledge} from "@/getData/getdata";

export default {
  name: "knowledge",
  data(){
    return{
      homeicon: require("@/assets/home.png"),
      iconsrc: require("@/assets/time.png"),
      linesrc: require("@/assets/line.png"),
      video: {},
      article: {},
      map:{
        "video1": "儿童康复",
        "video2":"脑颅损伤康复",
        "video3":"脊髓损伤康复",
        "video4":"周围神经损伤康复",
        "video5":"骨关节康复",
        "video6": "烧伤与伤疤康复",
        "video7":"疼痛康复",
        "video8":"心肺康复",
        "video9":"老年病康复",
        "video10":"运动与软组织损伤康复",
      }
    }
  },
  methods: {
    to_article(uid,type){
      this.$router.push({ name : 'article',params:{id: uid,type: type}})
    },
    to_video(id,type){
      this.$router.push({ name : 'video',params:{id: id ,type:type}})
    },
    to_list(type){

      this.$router.push({ path : '/knowledge/list/list_contain',query: { id : type}})
    },
    back(){
      this.$router.push({ path: '/' })
    },
    async get() {
      // 获取用户信息
      try {
        //const表示在方法中定义一个变量，和var类似
        const result = await getknowledge();
        console.log(result)
        //result本身还有一层包装，看打印日志
        if (result.data.code === 200) {
          this.article=result.data.data.article
          this.video=result.data.data.video
          console.log(this.article);


        }
      } catch (error) {
        console.log(error);
      }
    },
  },
  mounted() {
    this.get()
  }
}
</script>

<style scoped>
body{
  margin: 0;
}
.back:hover{
  color: cornflowerblue;
  font-weight: bold;
}
.list:hover{
  color: cornflowerblue;
  font-weight: bold;
}
.contain_class{
  background-color: rgb(242,243,245);
  height: 780px;
  width: 80%;
  margin-top: 30px;
  margin-left: calc(10%);

}
.contain_class_name{
  font:30px "楷书";
  font-weight: bold;
  width: 100%;
  height: 8%;
  border-bottom: 1px solid gray;
  display: flex;
}
.contain_class_name .name{
  flex: 10;
  width: 150px;
  margin-left: 50px;
  padding-top: 10px;
  color: rgb(51,122,183);
  cursor: pointer;
}
.contain_class_name .name:hover{
  color: rgb(35,82,145);
}
.video_contain{
  width: 100%;
  height: 300px;
  display: flex;
  margin-top: 15px;
}
.video_class_item{
  flex:1;
  background-color: transparent;
  height: 280px;
  flex-basis: 200px;
  margin-left: 20px;
  padding: 5px;
  cursor: pointer;

}
.single_video{
  width:200px;
  background-color: white;
  box-shadow: 0 1px 1px 0 rgba(0, 0, 0, .15);
  border-radius: 8px;
}
.single_video:hover {
  box-shadow: 0 5px 5px 0 rgba(0, 0, 0, .25);
  transition: all .2s ease-in-out;
  margin-top: -5px;

}

.video_item_title{
  font-size: small;
  overflow: hidden;
  word-break:break-all;
  margin-top: 5px;
  text-overflow: ellipsis;
  border: none;
  resize: none;
  cursor: pointer;

}

.video_item_author{
  margin-left: 60px;
  font-size: smaller;
  cursor: pointer;
}

.article_card{
  margin-top: 10px;
  margin-left: 20px;
  width: 95%;

}
.article_title{
  font-size: 19px;
  font-weight: revert;

}
.line{
  width: 100%;
  height: 70px;
}
.article_time{

  font-size: 5px;
  color: gray;
  margin-top: 5px;
  margin-left: 10px;
  margin-bottom: 5px;
}
.article_summary{
  font-size: 15px;
  font-weight: bolder;
}
.article_detail{
  margin-top: 20px;
  margin-bottom: 30px;
  font-weight: bold;
  font-size: 13px;
  width: 78px;
  border-bottom: 1px solid black;
  cursor: pointer;
}
.article_detail:hover{
  color: cornflowerblue;
}
</style>
