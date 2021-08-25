<template>
<div style="height: calc(100vh);overflow: hidden;background-color: rgb(244,244,245)">
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
    <div style="padding-left: 25px;padding-top: 30px;cursor: pointer" @click="backhome" class="back" >
      <img :src="homeicon" alt="" width="15px" style="margin-left: -10px;margin-bottom: -3px">
      首页
    </div>
    <div style="
    background-color: lightcyan;
    padding-left: 25px;padding-top: 60px;padding-bottom:20px;cursor: pointer" @click="back()" class="back" >
      <img :src="pageicon" alt="" width="15px" style="margin-left: -10px;margin-bottom: -3px">
      专页
    </div>
  </div>

  <main style="height: 70%;width: 80%;margin-top:90px;margin-left: 180px; ">
    <div class="top">
      <div class="tit">
        <el-tag type="info">官方视频</el-tag>
        <span style="font-size: 20px;margin-left: 8px">
          {{this.video.title}}
        </span>
      </div>
      <div class="data" style="margin-top: 5px;margin-bottom: 5px;color: #99a9bf;font-size: 10px">
          视频观看量：{{this.video.view}}
      </div>
    </div>
    <div class="container" style="display: flex;height: 100%;">
      <div class="player-container" style="height: 100%;width:100%;min-width: 600px;min-height: 500px;">
        <vue-core-video-player :src="video.link"></vue-core-video-player>
      </div>

      <div class="aside">
        <div style="font-size: 20px;font-weight: bold;margin-bottom: 20px;">
          相关视频
        </div>
        <div class="video_card" style="height: 400px">
          <div v-if="recommand_video===''">
            <el-empty :image-size="100"></el-empty>
          </div>
          <div v-else  v-for="item in recommand_video" :key="item"
               style="margin-top:5px;width: 100%;height: 90px;"
                @click="w_video(item['id'])"
          >
            <div style="display: flex">
              <div class="video_summary" >
                <img :src="item['summary']" style="width: 90px">
              </div>
              <div style="width:70%;">
                <div class="video_title">
                  {{item['title']}}
                </div>
                <div class="author">
                  {{item['author']}}
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>

    </div>
    <div class="footer">
      <div class="fo" style="display: flex" @click="like">
        <div v-if="this.is_like===0" class="icon_zan" id="zan"></div>
        <div v-else class="icon_zan2" id="zan2"></div>
        <span style="margin-left: 15px;margin-top: 8px;font-size: 19px">
          {{ this.like_num }}
        </span>
      </div>
      <div class="fo" style="display: flex">
        <div class="icon_store"></div>
        <span style="margin-left: 15px;margin-top: 8px;font-size: 19px">
          123
        </span>
      </div>
    </div>
  </main>

  </div>

</template>

<script>
import {get_video, get_video_recommend, like_video} from "@/getData/getdata";
//import {get_video_recommand} from "@/getData/getdata";

export default {
  name: "video",
  data(){
    return{
      recommand_video: '',
      pageicon: require("@/assets/page.png"),
      homeicon: require("@/assets/home.png"),
      video:null,
      id: null,
      drawer: false,
      type:1,
      is_like: 0,
      like_num: 0
    }
  },
  methods:{
    async video_recommend(){
      const res=await get_video_recommend(this.type)
      if(res.data.code===200){
       this.recommand_video=res.data.data.video_list
      }else{
        alert(res.data.msg)
      }
    },
    async like(){
      const res=await like_video(this.id,this.$store.state.user_id,this.is_like)
      if(res.data.code===200){
        this.like_num=res.data.data.like_num
        this.is_like=res.data.data.is_like
      }else{
        alert(res.data.msg)
      }
    },
    w_video(id){
      this.id=id
      this.$router.push({ path : '/knowledge/video',params:{id: id,type : this.type}})
    },
    backhome(){
      this.$router.push('/')
    },
    back(){
      if(this.type){
        this.$router.push({ path : '/knowledge/list/list_contain',query: { id : this.type}})
      }
      else{
        this.backhome()
      }

    },

    async get() {

      try {
        if(this.$store.state.token){
          const result = await get_video(this.id,this.$store.state.user_id)
          //result本身还有一层包装，看打印日志
          if (result.data.code === 200) {
            this.like_num=result.data.data.like_num
            this.is_like=result.data.data.is_like
            this.video=result.data.data

          }
        }
        else{
          const result = await get_video(this.id,-1);

          //result本身还有一层包装，看打印日志
          if (result.data.code === 200) {
            this.video=result.data.data
            console.log(this.video);
          }else{
            alert(result.data.msg)
          }
        }

      } catch (error) {
        console.log(error);
      }
    },
  },
  created() {
    console.log(123)
    this.$nextTick(function () {
      //获取传递的参数

      this.id=this.$route.params.id;
      this.type=this.$route.params.type
    })

  },

  watch:{
    id(){
      this.get()
      this.video_recommend()
    },

  }
}

</script>

<style scoped>
body{
  margin: 0;

}
.back{
  color: black;
  padding-top: 20px;
  padding-left: 10px;
  cursor: pointer;
}
.back:hover{
  color: skyblue;
}

.aside{
  background-color: rgb(250,248,245);
  margin-top: 100px;
  width: 30%;
  min-width: 300px;
  margin-left: 40px;
  height: 50%;
  min-height: 450px;
}

.footer{
  margin-top: 5px;
  display: flex;
  cursor: pointer;
  height: 50px;
  z-index: 2018
}
.fo{
  width: 200px;

}
.fo:hover{
  color: rgb(18,150,219);
}
.fo:hover .icon_zan{
  background: url("../../assets/zan2.png") no-repeat;
  background-size: cover;
}
.fo:hover .icon_store{
  background: url("../../assets/store2.png") no-repeat;
  background-size: 100%;
}
.icon_zan{
  background: url("../../assets/zan1.png") no-repeat;
  background-size: cover;
  margin-top: 7px;
  width: 30px;
  height: 30px;
}
.icon_zan2{
  background: url("../../assets/zan2.png") no-repeat;
  background-size: cover;
  margin-top: 7px;
  width: 30px;
  height: 30px;
}

.icon_store{
  background: url("../../assets/store1.png") no-repeat;
  background-size: 100%;
  margin-top: 7px;
  width: 36px;
  height: 36px;
}
.video_title{
  font-weight: bold;
  font-size: 15px;
  cursor: pointer;
}
.video_title:hover{
  color: #9ac7e8;
}

.author{
  margin-top: 10px;
  margin-left: 100px;
  width: auto;


}
</style>
