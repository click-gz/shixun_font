<template>
  <div class="home" >
    <!--header-->
    <Header :Info="info"></Header>

    <Banner :banners="banners"></Banner>

    <div class="type">
      <div v-for="(value,index) in this.type" :key="index" class="single_type" @click="to_list(index+1)">

        <img :src="value['link']" alt="" height="100%" style="margin-left: 20px">
        <div class="summary">
          {{summary[index]}}
        </div>
      </div>

      <div style="width: 100px">
        <div style="float: right; margin-top:40px;">
        <el-popover
            placement="bottom"
            width="200"
            trigger="hover"
        >
          <div style="display: flex;flex-direction: column">
            <div id="more" v-for="(item,index) in summary" :key="item" style="cursor: pointer" @click="to_list(index+1)">
              {{index+1}}. {{item}}
            </div>

          </div>
          <el-button slot="reference" style="border: 0;font-size: 15px">更多</el-button>
        </el-popover>
        </div>
      </div>
    </div>

    <footer >
      <div class="contain" style="display: flex">
        <div class="title" style="width: 20px;font-size: 29px">
          热门讨论
        </div>
        <div class="twitter">

          <div class="single_contain" v-if="top_empty1===false">
              <div v-for="item in top_twi" :key="item" class="talk" style="margin-left: 10px;overflow:hidden;" @click="twi(item.id)">
                <div style="margin-top: 3px;
                margin-left: 9px;
                font-weight: bold;
                font-size: 23px;
                 height: 30px;
                 overflow: hidden;
                 font-family: 华文楷体;
               "
                 >
                  {{item.title}}
                </div>
                <div style="margin-top: 5px;font-size: small;margin-left: 20px;height: 35px;overflow: hidden;">
                  <div style="height: 16px;overflow: hidden;">
                    {{item.author_name}}
                  </div>

                  <div>
                    {{item.create_time}}
                  </div>
                </div>
                <div style="margin-top: 5px;letter-spacing: 3px;height: 110px;max-height: 110px;overflow: hidden;">
                  <br>
                  {{item.summary.slice(0,60)}}...
                </div>
            </div>
          </div>
          <div class="single_contain" v-else>
            <el-empty :image-size="200"></el-empty>
          </div>
        </div>
      </div>

      <div class="contain contain1" style="display: flex;margin-left: 300px;">
        <div class="title" style="width: 20px;font-size: 29px">
          推荐科普

        </div>
        <div style="display: flex">

          <div class="single_contain" v-if="top_empty2===false" >
            <div v-for="item in top_art" :key="item" class="knowl" style="margin-left: 10px;overflow:hidden;" @click="kno(item.id)">
              <div style="margin-top: 3px;
              margin-left: 9px;
                font-weight: bold;
                font-size: 23px;
                 height: 30px;
                 overflow: hidden;
                 font-family: 华文楷体;

               "
              >
                {{item.title}}
              </div>
              <div style="margin-top: 5px;font-size: small;margin-left: 20px;height: 35px;overflow: hidden;">
                <div style="height: 16px;overflow: hidden;">

                  {{item.author}}
                </div>

                <div>
                  {{item.create_time}}
                </div>
              </div>

            </div>
          </div>
          <div class="single_contain" v-else>
            <el-empty :image-size="200"></el-empty>
          </div>
        </div>

      </div>

    </footer>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'
import Banner from '@/components/Banner.vue'
import {getBanner, getTypeData, top_article, top_post} from '@/getData/getdata.js'

export default {
  name: 'Home',
  data() {
    return {
      top_twi:'',
      top_art:'',
      top_empty1: false,
      top_empty2: false,
      banners:[],
      type:[],
      summary:["儿童康复","脑颅损伤康复","脊髓损伤康复","周围神经损伤康复","骨关节康复","烧伤与疤痕康复","疼痛康复","心肺康复","老年病康复","运动与软组织损伤康复"],
      info: {
        "avater":this.defaultHeadImg,
        "username":""
      },
      defaultHeadImg: require("@/assets/default.png")
    }
  },
  components: {
    Header,
    Banner
  },

  methods: {
    kno(id){
      this.$router.push({ name : 'article',params:{id: id,type: 1}})
    },
    twi(id){
        this.$router.push({path: '/talk/detail', query: {id: id,page:1}})
    },
    async top_article(){
      const res=await top_article()
      console.log(res)
      if(res.data.code===200){

        this.top_empty2=false
        this.top_art=res.data.data.top_article
      }else{

        this.top_empty2=true
      }
    },
    async top_post(){
      const res=await top_post()
      console.log(res)
      if(res.data.code===200){

        this.top_empty1=false
        this.top_twi=res.data.data.top_post
      }else{

        this.top_empty1=true
      }
    },
    to_list(id) {
      this.$router.push({path: '/knowledge/list/list_contain', query: {id: id}})
    },
    async getTypeData() {
      try {
        //const表示在方法中定义一个变量，和var类似
        const result = await getTypeData();

        //result本身还有一层包装，看打印日志
        if (result.data.code === 200) {
          this.type = result.data.data.type_list;
          console.log(this.type)
        }
      } catch (error) {
        console.log(error);
      }
    },
    async takeInfo() {
      // 获取用户信息
      try {
        //{"avater","username"}
        //const result = await getUserInfo(this.getToken)
        this.info.avater = this.$store.state.avater
        this.info.username = this.$store.state.username
        console.log("getname:" + this.info.username)
        console.log(this.info.avater)

      } catch (error) {
        console.log(error)
      }
    },
    // 获取轮播图数据
    //async和await异步获取数据固定用法
    async getBannerData() {
      try {
        //const表示在方法中定义一个变量，和var类似
        const result = await getBanner();
        //result本身还有一层包装，看打印日志
        if (result.data.code === 200) {

          this.banners = result.data.data.picture_list;

        }
      } catch (error) {
        console.log(error);
      }
    },
  },
  //页面dom开始渲染完成会调用mounted，
  created() {

    if (this.getToken) {
      this.takeInfo()
    }
    this.getBannerData()
    this.getTypeData()
    this.top_article()
    this.top_post()
  },
  computed: {

    getToken() {
      return this.$store.state.token
    }
  },
}
</script>
<style scoped>
body{
  margin: 0;
}
.type{
  font-size: 24px;
  height: 80px;
  display: flex;
  border-bottom:1px solid gray ;
  min-width: 250px;
  font-family: "幼圆";
}
.single_type{
  flex: 1;
  display: flex;
  cursor: pointer;
  padding-bottom: 5px;


}
.single_type:hover{
  color: #475669;
  font-size: 20px;
}
.single_type:hover img{
  filter: brightness(117%);
}
.summary{
  margin-left: 15px;
  margin-top: 20px;
}
.el-button:hover{
  background-color: transparent;
}

footer{
  margin-left: 50px;
  height: 230px;
  margin-top: 30px;
  margin-bottom: 30px;
  display: flex;
  width: auto;
  min-width: 900px;
}
.contain{

  border-left: 2px solid lightgray;
  flex:1;
  width: 600px;
  height: 250px;
  max-width: 500px;
}
.title{
  margin-top: 30px;
  font-size: 26px;
  margin-left: 10px;
  font-weight: bold;
}
.single_contain{

  width: 550px;
  margin-top: 5px;
  margin-left: 10%;
  height: 270px;
  display: flex;
  flex-direction: column;
}

.talk{
  flex: 1;
  background-color: rgb(210,245,255);
  border-radius: 25px;
  box-shadow:  6px 6px 13px #9d9d9d,
  -6px -6px 13px #ffffff;
  margin-bottom: 10px;
  cursor: pointer;


}
.talk:hover{
  color: #475669;
  flex: 1.3;
}

.knowl{
  flex: 1;
  background-color: rgb(210,245,255);
  border-radius: 25px;
  box-shadow:  6px 6px 13px #9d9d9d,
  -6px -6px 13px #ffffff;
  margin-bottom: 10px;
  cursor: pointer;
}
.knowl:hover{
  color: #475669;
  flex: 1.3;
}
#more:hover{
  border-bottom: 1px solid grey;
}
</style>
