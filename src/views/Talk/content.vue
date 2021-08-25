<template>
<div style="background-color: rgb(246,246,246);width:100%;overflow:hidden;min-height: 1000px;height: 100%;margin: 0">

    <header style="background-color: #8cc5ff">
      <div style="position: absolute;">
      <el-page-header @back="goBack"  title="返回知识圈" class="bak" >
      </el-page-header>
    </div>
      <div style="background-color: white;width: 80%;margin-left: 10%;min-height: 300px">

        <span id="tittle">
       《{{head_content.title}}》
        </span>

        <div class="user">
          <div id="username" >
            发布者：{{head_content.author_name }}
          </div>
          {{head_content.create_time}}
        </div>
        <div class="con">
          {{head_content.content}}
        </div>
        <div style="display: flex;margin-top: 30px;">
          <div class="btu">
            <button class="btuc"
                    style="background-color: transparent;
                cursor: pointer;
                border: 1px solid lightskyblue;
                width :80px;height: 30px"
                    @click="dialogVisible=true"
            >
              发表评论
            </button>
          </div>
          <div  class="num">
        <span style="float: left">
          <i class="el-icon-chat-round" ></i> <span style="margin-left: 3px">
          <span v-if="page_num===0">{{0}}</span>
          <span v-else>{{comment.length}}</span>
          条评论
        </span>
        </span>
            <span style="float: left;margin-left: 20px">
              <span v-if="is_like_post===0" style="margin-top: 0" @click="like">
               <img  :src="hearticon" width="16px"><span style="margin-left: 5px">喜欢数:{{like_num_post}}</span>
              </span>
              <span v-else @click="like">
                <img :src="hearticon2" width="16px"><span style="margin-left: 5px">喜欢数:{{like_num_post}}</span>
             </span>
          </span>
            <span class="del" style="margin-left: 20px;cursor: pointer" @click="del_p" v-if="head_content.author_id===Number(uid)">
              <i class="el-icon-delete" ></i>
            点击删除推文
          </span>


          </div>
        </div>
      </div>


    </header>

  <main  >
    <div v-if="this.comment!==null">
      <div class="comment" v-for="(item,index) in comment" :key="item">
        <div style="margin-top: 3px">
            <div class="comment_title" style="flex: 0.8;margin-top: 5px;font-family: '幼圆';width: 700px;overflow: hidden;height: 20px">
          {{item.author_name}}
            </div>
          <span v-if="item['author_id'] === Number(uid)" style="width: 20px;float: right;margin-right: 30px" @click="del(item['id'])">
            <i class="el-icon-delete"></i>
          </span>
        </div>

        <div class="comment_time" style="font-size: 14px;flex: 0.5;font-weight: normal;color: #999999">
          评论时间：{{item.create_time}}
        </div>
        <div class="comment_content" style="font-size:20px;flex: 10;margin-top: 3px;font-family:  cursive;">
          {{item.content}}
        </div>
        <div style="position:relative;left:68%">
          <span v-if="item.is_like===0" style="margin-top: 0" @click="like_com(item.id,index)">
               <img  :src="hearticon" width="16px"><span style="margin-left: 5px; font-size: 16px">喜欢数：{{item.like_num}}</span>
              </span>
          <span v-else @click="like_com(item.id,index)">
                <img :src="hearticon2" width="16px"><span style="margin-left: 5px">喜欢数：{{item.like_num}}</span>
             </span>
        </div>

      </div>


      <footer style="border-top: 1px solid lightsteelblue;height:50px">
        <div class="page">
          <el-pagination
              :current-page=this.cur_page
              :total=this.page_num
              layout="prev, pager, next"
              style="margin-left: 40%"
              @current-change="handleArticleCurrentChange"
          >
          </el-pagination>
        </div>
      </footer>
    </div>

    <div v-else >
      <el-empty :image-size="100" description="暂无评论"></el-empty>
    </div>
  </main>
  <el-dialog
      title="编辑评论"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
    <div style="width: 100%;height: 200px;">

      <textarea type="text" v-model="post_content" style="height: 90%;width: 99%;resize:none;"></textarea>
    </div>

    <span slot="footer" class="dialog-footer">
        {{post_content.length}}字
        <el-button @click="dialogVisible = false;this.post_content='';" style="margin-left: 10px">取 消</el-button>
        <el-button type="primary" @click="publish(head_content.id)">确 定</el-button>
      </span>
  </el-dialog>


</div>
</template>

<script>
import {add_com, del_com, del_post, get_talk_contain, like_com, like_post} from "@/getData/getdata";

export default {
  name: "content",
  data(){
    return{
      uid:0,
      like_num_post: 0,
      is_like_post:0,
      hearticon: require("@/assets/heart.png"),
      hearticon2: require("@/assets/heart2.png"),
      post_content:"",
      dialogVisible: false,
      page_num:1,
      cur_page:1,
      page:1,
      id:1,
      comment: '',
      head_content:'',
    }
  },
  methods:{
    async del_p(){
      const res= await del_post(this.id)
      if(res.data.code===200){
        const h = this.$createElement;

        this.$notify({
          message: h('i', { style: 'color: teal'}, '删除成功')
        });
        new Promise((resolve) => setTimeout(resolve, 1000));
        this.$router.push('/talk')
      }else{
        alert(res.data.msg)
        location.reload()
      }
    },
    like_com(id,index){
      if(this.$store.state.user_id){
        like_com(id,this.uid,this.comment[index].is_like).then((res)=>{
          if(res.data.code===200){
            this.comment[index].is_like=res.data.data.is_like
            this.comment[index].like_num=res.data.data.like_num
          }else{
            alert(res.data.msg)
          }
        })
      }else{
        alert("请先登录！！！ ")
        this.router.push('/login')
      }

    },
    like(){
      if(this.$store.state.user_id){
        like_post(this.id,this.uid,this.is_like_post).then((res)=>{
          if(res.data.code===200){
            this.is_like_post=res.data.data.is_like
            this.like_num_post=res.data.data.like_num
          }else{
            alert(res.data.msg)
          }
        })
      }else{
        alert("请先登录！！！ ")
        this.router.push('/login')
      }

    },
    del(id){
      del_com(id,this.id).then((res)=>{
        const h = this.$createElement;

        this.$notify({
          message: h('i', { style: 'color: teal'}, '删除成功')
        });

        new Promise((resolve) => setTimeout(resolve, 10000));
        if(res.data.code!==200){
          alert(res.data.msg)
        }
        location.reload()
      })
    },
    async publish(id){
      this.dialogVisible = false
      if(this.$store.state.user_id){

        if(this.post_content!==""){
          const res=await add_com(this.post_content,id,this.$store.state.user_id)
          console.log(res.data.data)
          if(res.data.code===200){

            const h = this.$createElement;

            this.$notify({
              message: h('i', { style: 'color: teal'}, '评论成功')
            });

            new Promise((resolve) => setTimeout(resolve, 1000000));
            location.reload()
          }else{
            alert(res.data.msg)
          }

        }else{
          this.post_content=""
          alert("请将内容填写完整")
        }
      }else{
        alert("请先登录！！！")
        this.$router.push('/login')
      }


    },
    goBack(){
      this.$router.push('/talk')
    },
    async getInfo() {
      try {
        let uid=-1;
      if(this.$store.state.user_id){
        uid=this.$store.state.user_id
      }else{
        uid=-1
      }
        const res=await get_talk_contain(this.id,uid,this.page)

        if(res.data.code===200){
          this.head_content=res.data.data.post
          this.comment=res.data.data.comment_list
          this.page_num=res.data.data.page_num
          this.is_like_post=res.data.data.post.is_like
          this.like_num_post=res.data.data.post.like_num
console.log(res.data.data.post)
        }else{
          alert(res.data.msg)
        }

      } catch (error) {
        console.log(error)
      }
    },
  },
  created() {
    this.id = this.$route.query.id;//获取上个页面传递的id,在下面获取数据的时候先提交id
    this.page = this.$route.query.page

  },
  mounted() {
    if(this.$store.state.user_id){
      this.uid=this.$store.state.user_id
    }

    this.getInfo()
  }
}
</script>

<style scoped>
body{
  margin: 0;
width: 100%;

}
/deep/ .el-page-header__title{
  font-size: 20px !important;
}
/deep/  .el-page-header__left:hover{
  color: white !important;
}
header{
  min-height: 300px;
  min-width: 750px;
  box-shadow:0 2px 0 0  #615f62;
  background-color: white;
  width: 100%;
  overflow: hidden;
}
.bak:hover{
  color: #9ac7e8;
}
#tittle{
  font-family: 华文楷体;
  font-size: 35px;
  font-weight: bold;
  padding-top: 30px;
  padding-left: 200px;
}
.user{
  color: #999999;
  font-size: 18px;
  padding-top: 30px;
  padding-left: 200px;
}
.con{
  font-family:  cursive;;
  font-size: 19px;
  padding-top: 30px;
  padding-left: 200px;
  max-width: 900px;
  word-break:break-all
}
.btu{
  padding-top: 30px;
  padding-left: 310px;
  margin-bottom: 10px;
}
.num{
  padding-top: 40px;
  padding-left: 100px;
  font-size: 15px;
}
main{
  margin-top: 20px;
  margin-left: 25%;

  width: 50%;

}
.comment{
  min-width: 600px;
  padding-left: 10px;
  margin-bottom: 20px;
  box-shadow: 0 0 3px 1px #999;
  margin-left: 20px;
  background-color: white;
  margin-right: 10px;
  min-height: 100px;
  display: flex;
  flex-direction: column;
}
.page{
  margin-top: 10px;
}
.btuc:hover{
  background-color: rgb(240,246,255) !important;
}

.del:hover{
  color: #8cc5ff;
}
</style>
