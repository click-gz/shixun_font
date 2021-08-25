<template>
<div class="container">
  <div class="video_contain">
    <div class="title">视频专区</div>
    <div v-if="video.length===0">
      <el-empty size="200"></el-empty>
    </div>
    <div v-else>
      <div class="video_contain_inner">

        <div v-for="value in this.video" :key="value" class="video_item" @click="Watchvideo(value['id'],id)">
          <div class="video_item_inner" style="padding-top: 5px">
            <img :src="value['summary']"  alt="">

            <div class="video_item_title"
                      style="background-color: transparent;margin-left: 5%;
                    font-size: 15px;
                     font-weight: bolder;
                     font-family: '华文宋体';
                          ">
              {{ value['title'] }}
          </div>
          </div>
        </div>
      </div>
      <div class="page">
        <el-pagination
            :total=video_tot*10
            layout="prev, pager, next"
            style="margin-left: 30%"
            @current-change="handleVideoCurrentChange"
        >
        </el-pagination>
      </div>
    </div>

  </div>
  <div class="article_contain">
    <div class="title">文章专区</div>
    <div class="article_contain_inner">

      <div v-for="value in article" :key="value" class="article_item"  @click="Watcharticle(value['id'],id)">
        <div class="article_item_inner" style="background-color: white">


          <div class="article_item_title"
                    style="text-overflow: ellipsis;
                    font-family: '华文楷体';
                    max-height: 60px;
                    width: 98%;
                    background-color: transparent;
                    font-weight: bolder;
                    font-size: 24px;
                    overflow: hidden;
                    ">
            {{value.title}}

          </div>
          <div class="time">
            <span style="margin-right: 20px">{{value.author}}</span>
            {{value['create_time']}}
          </div>
          <div class="article_item_summary" disabled
                    style="background-color: transparent;font-size: 15px;overflow: hidden;
                          max-height: 60px;
                          font-family: '华文中宋';
                                ">
              {{value.summary}}

          </div>
        </div>
      </div>
    </div>
    <div class="page">
      <el-pagination
          :current-page="cur_page"
          :total=article_tot*10
          layout="prev, pager, next"
          style="margin-left: 30%"
          @current-change="handleArticleCurrentChange"
      >
      </el-pagination>
    </div>
  </div>
</div>
</template>

<script>
import {getlist_contain_article, getlist_contain_video} from "@/getData/getdata";

export default {
  name: "list_contain",
  data(){
    return{
      id:null,
      cur_page: 1,
      video: [],
      article: [],
      video_tot:1,
      article_tot:1,
    }
  },
  methods:{
    Watcharticle(id,num){
      this.$router.push({ name : 'article',params:{id: id,type: num}})
    },
    Watchvideo(id,num){
      this.$router.push({ name : 'video',params:{id: id,type : num}})

    },
    handleVideoCurrentChange(val) {
      this.cur_page=val
      this.getVideo()
      console.log(`当前页: ${val}`);
    },
    handleArticleCurrentChange(val) {
      this.cur_page=val
      console.log('当前页: '+this.cur_page);
      this.getArticle()

    },
    async getVideo(){
      try {
        const result_video = await getlist_contain_video (this.id,this.cur_page);
        //result本身还有一层包装，看打印日志
        console.log(result_video)
        if ( result_video.data.code === 200) {
          this.video_tot=result_video.data.data.total_page
          this.video = result_video.data.data.video_list
          console.log(this.video)
        }else{
          alert(result_video.data.msg)
          this.cur_page-=1;
          console.log(this.cur_page)
        }
      } catch (error) {
        console.log(error);
      }
    },
    async getArticle(){
      try {
        const result_article = await getlist_contain_article (this.id,this.cur_page);
        if (result_article.data.code === 200) {
          this.article_tot=result_article.data.data.total_page
          console.log("most"+ this.article_tot)
          this.article = result_article.data.data.article_list
          console.log(this.article);
        }else{
          alert(result_article.data.msg)
        }
      } catch (error) {
        console.log(error);
      }
    }
  },
  created() {

    this.id = this.$route.query.id;//获取上个页面传递的id,在下面获取数据的时候先提交id
  },
  watch:{
    $route () {
      location.reload()
      this.id = this.$route.query.id;//获取上个页面传递的id,在下面获取数据的时候先提交id
      this.cur_page=1
      this.getArticle()
      this.getVideo()
    },
    id(){
      this.getArticle()
      this.getVideo()
    }
  }
}
</script>

<style scoped>


body{
  margin: 0;
}
.container{
  width: 100%;
  display: flex;
  flex-direction: column;
}
.video_contain{
  background-color:aliceblue;
  height: 375px;
}
.article_contain{
  background-color:aliceblue;
  height: 425px;
  margin-top: 28px;

}
.title{
  font-size: 30px;
  font-weight: bold;
  color: cornflowerblue;
  cursor: default;
  margin-bottom: 10px;
}
.video_contain_inner{
  height: 270px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom: 20px;
}
.video_item{

  margin-left: 0.5%;
  width: 19%;
  height: 100%;
  overflow: hidden;

}
.video_item_inner{
  width: 90%;
  height: 100%;
  margin-left: 5%;
  background-color: white;
}
.video_item_inner img{
  height: 80%;
  width: 90%;
  margin-left: 5%;
}
.video_item_title{
  font-size: small;
  overflow: hidden;
  word-break:break-all;
  margin-top: 5px;
  text-overflow: ellipsis;
  border: 0;
  resize: none;
  cursor: pointer;

}
.video_item_inner:hover{
  box-shadow: 0 5px 5px 0 rgba(0, 0, 0, .25);
  transition: all .2s ease-in-out;
  margin-top: -5px;

}
.video_item_inner:hover .video_item_title{
  color: cornflowerblue;
}
.article_contain_inner{
  display: flex;
  height: 335px;
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom:5px;

}
.article_item{
  margin-left: 0.5%;
  width: 49%;
  height: 48%;
  overflow: hidden;
  margin-bottom: 10px;
}
.article_item_inner{
  width: 90%;
  height: 100%;
  margin-left: 2%;
}
.article_item_inner:hover{
  box-shadow: 0 5px 5px 0 rgba(0, 0, 0, .25);
  transition: all .2s ease-in-out;
  margin-top: -5px;
}
.article_item_inner:hover .article_item_title{
  color: cornflowerblue;
}
.article_item_title{
  font-size: larger;
  overflow: hidden;
  word-break:break-all;
  margin-top: 5px;
  text-overflow: ellipsis;
  border: none;
  resize: none;
  cursor: pointer;
}

.time{
  margin-left:20px;
  font-size:14px;
  color: #999999;
}
.article_item_summary{
  font-size: small;
  overflow: hidden;
  word-break:break-all;
  margin-top: 5px;
  text-overflow: ellipsis;
  border: none;
  resize: none;
  cursor: pointer;

}
.page{
  height: 40px;
  background-color: transparent;
}
</style>
