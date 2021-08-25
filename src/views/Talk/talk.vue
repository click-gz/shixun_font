<template>
  <div>
    <Header :Info="info" style="position: fixed; width: 100%"></Header>
  <main>

    <div class="point" >
      <div style="font-size:24px;cursor:default;color: firebrick;margin-left: 20px;margin-top: 5px">
      最新话题：
        <div style="float: right;margin-right: 10%;height: 20px;margin-bottom: 3px" v-if="!pointer">
          <el-popover
              placement="right-start"
              width="100"
              trigger="hover"
              content="点击新建话题"
              style="float: right;margin-right: 10%;height: 20px;margin-bottom: 3px"
          >
            <el-button slot="reference" class="btu"><img :src="add" alt="" width="20px" @click="add_pointer"></el-button>
          </el-popover>
        </div>
        <div style="float: right;margin-right: 10%;height: 20px;margin-bottom: 3px" v-if="pointer">
          <el-popover
              placement="right-start"
              width="100"
              trigger="hover"
              content="点击关闭新建"
              style="float: right;margin-right: 10%;height: 20px;margin-bottom: 3px"
          >
            <el-button slot="reference" class="btu"><img :src="no" alt="" width="20px" @click="add_pointer"></el-button>
          </el-popover>
        </div>



      </div>

      <div class="weibo" style="display: none">
        <div style="display: flex;flex-direction: column;width: 90%;margin-left: 10px">
          标题：<textarea class="weibo-text" v-model="value_title" maxlength="50" style="word-break:break-all;flex: 0.4;resize:none;"  >
        </textarea>
          话题：<textarea class="weibo-text" v-model="value" maxlength="200" style="word-break:break-all;resize:none;" >
        </textarea>
        </div>

        <div style="display: flex;flex-direction: column;margin-top: 20px">

          <button class="weibo-btn" value="发布" @click="publish(1)"
                 style="
                  border: none;
                 height: 30px;margin-bottom: 50px;
                 -moz-border-radius: 50%;
                  -webkit-border-radius: 50%;
                  cursor: pointer"
          >
          发布
          </button>
          <span class="spans">{{value.length}}/200</span>
        </div>
      </div>

      <div class="point_card" v-for="item in this.short_page" :key="item" >

          <div style="font-size: 25px;font-weight: bold;margin-left: 10px;max-height: 30px;overflow: hidden;font-family: 华文楷体" @click="gg(item['id'])">
            {{item['title']}}
          </div>
          <span v-if="item['author_id'] === Number(uid)" style="width: 20px;float:right;margin-right: 10px;margin-top: 10px" @click="del(item['id'])"><i class="el-icon-delete"></i></span>
        <div style="margin-top: 9px;margin-left: 14px;color: #999999 ">
          {{item['author_name']}}
          <span style="margin-left: 10px">
            {{item['create_time']}}
          </span>
        </div>

        <div style="margin-top: 20px;margin-left: 10px;height: 85px;padding-bottom: 7px;overflow: hidden;font-family: 华文中宋">
          {{item['summary']}}
        </div>

        <div style="font-size: 16px;margin-left: 40%;">
          <i class="el-icon-chat-round" ></i> <span style="margin-left: 5px;margin-right: 50px">评论数:{{item['comment_num']}}</span>
          <span v-if="item['is_like']===0" >
             <img  :src="hearticon" width="16px"><span style="margin-left: 5px">喜欢数:{{item['like_num']}}</span>
          </span>
         <span v-else>
            <img :src="hearticon2" width="16px"><span style="margin-left: 5px">喜欢数:{{item['like_num']}}</span>
         </span>

          <i class="el-icon-view" style="margin-left: 10%"></i><span style="margin-left: 5px;margin-right: 50px">阅读量:{{item['view']}}</span>
        </div>


      </div>
      <div class="page">
        <el-pagination
            :current-page="cur_short_page"
            :total=short_page_tot*10
            layout="prev, pager, next"
            style="margin-left: 20%"
            @current-change="handleCurrentChange0"
        >
        </el-pagination>
      </div>
    </div>


    <div class="twitter">
      <div  style="font-size:24px;cursor:default;color: firebrick;margin-left: 20px;margin-top: 5px">
        最新推文：
        <div style="float: right;margin-right: 10%;height: 20px;margin-bottom: 3px" >
          <el-popover
              placement="right-start"
              width="100"
              trigger="hover"
              content="点击新建推文"
              style="float: right;margin-right: 10%;height: 20px;margin-bottom: 3px"
          >
            <el-button slot="reference" class="btu"><img :src="add" alt="" width="20px" @click="new_p"></el-button>
          </el-popover>
        </div>

      </div>

      <ul>
        <li v-for="item in long_page" :key="item" class="twi" >
          <div class="twi_title" style="font-family: 华文楷体" @click="gg(item['id'])">
            {{item['title']}}
          </div>
          <span v-if="item['author_id'] === Number(uid)" style="width: 20px;float: right" >
            <i class="el-icon-delete" @click="del(item['id'])"></i>
            <i class="el-icon-edit"
               @click="dialogVisiblep=true ; change_title=item['title']; change_content=item['content'];change_id=item['id']"></i>
          </span>
          <div style="font-size: 10px;width: 300px;height:75px;margin-top: 4px" @click="gg(item['id'])">
            <div  style="height: 110%;width: 99%;resize: none;border: 0;overflow: hidden;font-family: 华文中宋;font-size: 15px" readonly>
              {{ item.summary.substring(0,60) }}...
            </div>
          </div>



        </li>
      </ul>

      <div class="page" style="background-color: transparent">
        <el-pagination
            :current-page="cur_long_page"
            :total=long_page_tot*10
            layout="prev, pager, next"
            style="margin-left: 5%;background-color: transparent !important;"
            @current-change="handleCurrentChange1"
        >
        </el-pagination>
      </div>
    </div>



    <el-dialog
        title="编辑推文"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose">
      <div style="width: 100%;height: 700px;">
        标题：
        <textarea type="text" v-model="twitter_title" maxlength="50" style="height: 3%;width: 99%;resize:none;"></textarea>
        内容：
        <textarea type="text" v-model="twitter_content" style="height: 90%;width: 99%;resize:none;"></textarea>
      </div>

      <span slot="footer" class="dialog-footer">
        {{twitter_content.length}}字
        <el-button @click="dialogVisible = false; twitter_content=''; twitter_title=''" style="margin-left: 10px">取 消</el-button>
        <el-button type="primary" @click="publish(0)">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
        title="修改推文"
        :visible.sync="dialogVisiblep"
        width="30%"
        :before-close="handleClose">
      <div style="width: 100%;height: 700px;">
        标题：
        <textarea type="text" v-model="change_title" maxlength="50" style="height: 3%;width: 99%;resize:none;"></textarea>
        内容：
        <textarea type="text" v-model="change_content" style="height: 90%;width: 99%;resize:none;"></textarea>
      </div>

      <span slot="footer" class="dialog-footer">
        {{change_content.length}}字
        <el-button @click="dialogVisible = false;change_content='';change_title=''" style="margin-left: 10px">取 消</el-button>
        <el-button type="primary" @click="edit">确 定</el-button>
      </span>
    </el-dialog>
  </main>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import {add_post, change_com, del_post, get_twitter} from "@/getData/getdata";

export default {
  name: "talk",
  components: {
    Header,
  },
  data(){
    return{
      change_id:0,
      change_title:'',
      change_content:'',
      uid: 1,
      twitter_title: '',
      twitter_content:'',
      dialogVisible: false,
      dialogVisiblep: false,
      hearticon: require("@/assets/heart.png"),
      hearticon2: require("@/assets/heart2.png"),
      pointer:false,
      value_title:'',
      value: '',
      no: require("@/assets/no.png"),
      add: require("@/assets/add.png"),
      info: {
        "avater": "",
        "username": ''
      },
      short_page_tot: 1,
      long_page_tot: 1,
      short_page:'',
      long_page:'',
      cur_short_page: 1,
      cur_long_page:1,
    }
  },
  methods:{
    new_p(){
      if(this.$store.state.user_id){
        this.dialogVisible=true
      }else{
        alert("请先登录")
      }
    },
   async handleCurrentChange0(val){
        this.cur_short_page=val
        console.log(`当前页: ${val}`);
      const res=await get_twitter(1,this.cur_short_page,this.cur_long_page)
      console.log(res)
      if(res.data.code===200){
        console.log(res.data.data)
        this.short_page_tot=res.data.data.short_page_num
        this.long_page_tot=res.data.data.long_page_num
        this.short_page=res.data.data.short_post_list
        this.long_page=res.data.data.long_post_list
      }else{
        alert(res.data.msg)
      }

    },
    async handleCurrentChange1(val){
      this.cur_long_page=val
      console.log(`当前页: ${val}`);
      const res=await get_twitter(1,this.cur_short_page,this.cur_long_page)
      console.log(res)
      if(res.data.code===200){
        console.log(res.data.data)
        this.short_page_tot=res.data.data.short_page_num
        this.long_page_tot=res.data.data.long_page_num
        this.short_page=res.data.data.short_post_list
        this.long_page=res.data.data.long_post_list
      }else{
        alert(res.data.msg)
      }

    },
    async edit(){
      const res=await change_com(this.change_id,this.change_title,this.change_content)
      if(res.data.code!==200){
        alert(res.data.msg)
      }
      this.dialogVisiblep=false;
      location.reload()
    },
    async del(id){
      const res= await del_post(id)
      if(res.data.code===200){
        const h = this.$createElement;

        this.$notify({
          message: h('i', { style: 'color: teal'}, '提交成功')
        });
        new Promise((resolve) => setTimeout(resolve, 10000));
        location.reload()
      }else{
        alert(res.data.msg)
        location.reload()
      }

    },
    handleClose(done) {
      this.$confirm('确认关闭？')
          .then(() => {
            this.twitter_content=""
            done();
          })
          .catch(() => {});
    },
    add_pointer(){

      if(this.$store.state.token){
        let dom=document.getElementsByClassName("weibo")[0]
        if(!this.pointer){
          dom.style.display="flex"
        }else{
          dom.style.display="none"
        }
        this.pointer=!this.pointer
      }else{
        alert("请先登录")
      }

    },
    async publish(type){
      if(type===0){
        if(this.twitter_content!==""&&this.twitter_title!==""){
          const res=await add_post(this.twitter_title,this.twitter_content,this.$store.state.user_id,type)
          if(res.data.code===200){

            const h = this.$createElement;

            this.$notify({
              message: h('i', { style: 'color: teal'}, '提交成功')
            });
          }else{
            alert(res.data.msg)
          }
        }else{
          this.twitter_content=""
          this.twitter_title=''
          alert("请将标题以及内容填写完整")
        }
        new Promise((resolve) => setTimeout(resolve, 1500));

      }
      else{
        if(this.value!==""&&this.value_title!==""){
          const res=await add_post(this.value_title,this.value,this.$store.state.user_id,type)
          if(res.data.code===200){

            const h = this.$createElement;

            this.$notify({
              message: h('i', { style: 'color: teal'}, '提交成功')
            });
          }else{
            alert(res.data.msg)
          }
        }else{
          this.value=""
          this.value_title=''
          alert("请将标题以及内容填写完整")
        }
      }
      new Promise((resolve) => setTimeout(resolve, 1500));
      location.reload()
    },
    gg(id){
      this.$router.push({path: '/talk/detail', query: {id: id,page:1}})
    },
    async takeInfo() {
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
    async getInfo() {
      try {
        const res=await get_twitter(1,1,1)
        console.log(res)
        if(res.data.code===200){
          console.log(res.data.data)
          this.short_page_tot=res.data.data.short_page_num
          this.long_page_tot=res.data.data.long_page_num
          this.short_page=res.data.data.short_post_list
          this.long_page=res.data.data.long_post_list
        }else{
          alert(res.data.msg)
        }

      } catch (error) {
        console.log(error)
      }
    },
  },
  created() {
    this.getInfo()

    if (this.getToken) {
      this.takeInfo()
    }
  },
  computed: {

    getToken() {
      return this.$store.state.token
    }
  },mounted() {
    this.uid=this.$store.state.user_id
  }

}
</script>

<style scoped>
body{
  margin: 0;
}
main{

  display: flex;
}
.point{
  margin-top: 90px;
  width: 50%;
  height: auto;
  margin-left: 10%;
  display: flex;
  flex-direction: column;
  background-color: aliceblue;
  min-width: 320px;
}
.point_card{
  min-width: 300px;
  background-color: white;
  width: auto;
  height: 200px;
  margin: 10px 10px 10px 10px ;
  cursor: pointer;

}
.point_card:hover{
  background-color: rgb(245,245,245);
}
.weibo-text{
  flex:1;
  margin: 10px 10px 10px 10px ;
  min-width: 300px;
  width: 90%;
  height: 100px;
}
.twitter{
  border: 1px solid lightslategray;
  position: fixed;
  width: 400px;
  height: 600px;
  margin-left: 64%;
  margin-top: 90px;
  background-color: floralwhite;
}
.twi{
  background-color: white;
  cursor: pointer;
  width: 330px;
  height: 110px;
  margin-bottom: 20px;
}
.twi_title{
  font-size: 25px;
  font-weight: bold;
  max-height: 29px;
  overflow: hidden;
}
.twi:hover .twi_title{
  color: #8cc5ff;
}
.btu{
  border: none;
  margin: 0;
  padding:0;
  padding-top: 3px;
}
/deep/ .btn-prev{
  background-color: transparent !important;
}
/deep/ .el-pager li{
  background-color: transparent !important;
}
/deep/ .btn-next{
  background-color: transparent !important;
}
</style>
