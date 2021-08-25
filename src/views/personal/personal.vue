<template>
<div>

  <div class="person_head">
    <img :src="bk" class="bk">
    <div class="person_head_contain">
      <div class="head_left">
        <div class="person_img"><img :src="this.info.avater"></div>
      </div>
      <div class="head_right">
        <div class="person_name">{{this.info.name}}</div>
        <div class="person_sentence">
          <i class="el-icon-edit-outline"></i>
          <span class="sentence" style="font-family: 华文行楷;font-size: 20px">
            {{ this.info.introduce }}
          </span>
        </div>
      </div>
    </div>

    <div class="allnum">
      <div class="name">
        推文
      </div>
      <div class="number">
        {{this.info.post_cnt }}
      </div>
    </div>
  </div>

  <main>
    <div class="person_information" style="cursor: default">
      <div class="inner">
        <div class="username" style="font-size: 30px;margin-top: 5px;font-weight: bold;font-family: 华文楷体">
          {{this.info.name}}
        </div>
        <div class="phone" style="font-size: 17px;margin-top: 20px;padding-bottom:5px;border-bottom: 1px solid lightgray">
          <img :src="this.phone" alt="" width="20px" style="margin-bottom: -5px">
          已绑定手机
        </div>
        <div class="email" style="font-size: 17px;margin-top: 20px;border-bottom: 1px solid lightgray;padding-bottom:5px">
          <img :src="this.mail" alt="" width="20px" style="margin-bottom: -5px" >
          已绑定邮箱
        </div>
        <div class="gender" style="font-size: 17px;margin-top: 20px;border-bottom: 1px solid lightgray;padding-bottom:5px">

          性别：<img :src="this.sex" alt="" width="20px">
          <span style="font-size: 13px;cursor: default">
            {{this.sex_msg[this.info.sex]}}
          </span>

        </div>
      </div>
    </div>
    <div class="time_contain">
      <div class="inner" >
        <div class="title" style="font-size: 30px;width: 100%;height:20px;font-weight: bold;font-family: 华文楷体">活跃概况</div>
        <div style="display: flex;">
        <div style="margin-top: 30px;width: 50%" >
          在线时间：<span id="jishi"></span>
        </div>
        <div style="width:50%;margin-top: 30px">
          最后访问：{{this.info.last_login_time}}
        </div>

        </div>
        <div style="width: 50%;margin-top: 40px">
          注册时间：{{this.info.register_time}}
        </div>
      </div>
    </div>
    <div class="tw" style="margin-left: 10%;cursor: pointer;margin-bottom: 20px;margin-top: 10px;font-family: 华文中宋;font-size: 20px" @click="to_own_post">
      查看我的文章库>>
    </div>

    <div
        style="
      position:fixed;
     bottom: 50px;
      right:100px;
      width:90px;
      height:120px;
      background-color:lightcyan;
   "
    >
      <div class="person_out">
        <el-popover
            placement="left"
            width="fit-content"
            trigger="hover">
          <div>退出登录</div>
          <el-button slot="reference" style="background-color: transparent;width: 100%" @click="signOut"><i class="el-icon-user" ></i></el-button>
        </el-popover>
        <el-popover
            placement="left"
            width="fit-content"
            trigger="hover">
          <div>返回主页</div>
          <el-button slot="reference" style="background-color: transparent;width: 100%" @click="back"><i class="el-icon-s-home" ></i></el-button>
        </el-popover>

        <el-popover
            placement="left"
            width="fit-content"
            trigger="hover">
          <div>修改个人信息</div>
          <el-button slot="reference" style="background-color: transparent;width: 100%"  @click="dialogVisible = true"><i class="el-icon-edit" ></i></el-button>
        </el-popover>
      </div>
    </div>
  </main>



  <el-dialog
      title="编辑个人信息"
      :visible.sync="dialogVisible"
      width="18%"
      :close-on-click-modal="false"
      >
    <el-form :model="changeForm" ref="changeForm" :rules="rules" label-width="100px" >
    <div style="display: flex;flex-direction: column">

      <div class="cha">
        <el-form-item label="用户名：" prop="name" >
          <el-input v-model="changeForm.name"></el-input>
        </el-form-item>
      </div>
      <div class="cha">
        <el-form-item label="密码: " prop="pwd">
          <el-input v-model="changeForm.pwd"></el-input>
        </el-form-item>
      </div>
      <div class="cha">
        <el-form-item label="手机号：" prop="tel">
          <el-input v-model="changeForm.tel"></el-input>
        </el-form-item>
      </div>

      <div class="cha">
        <el-form-item
            prop="mail"
            label="邮箱"
        >
          <el-input v-model="changeForm.mail"></el-input>
        </el-form-item>
      </div>
      <div class="cha">
        <el-form-item label="个性签名：" prop="sen">
          <el-input v-model.number="changeForm.sen"></el-input>
        </el-form-item>
      </div>
      <div class="cha">
          性别：
        <el-radio-group v-model="changeForm.sex">
          <el-radio :label="1">男性</el-radio>
          <el-radio :label="2">女性</el-radio>

        </el-radio-group>
    </div>
    </div>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submitForm('changeForm')">提交</el-button>
      <el-button @click="cancel">取消</el-button>
  </span>
  </el-dialog>
</div>
</template>

<script>

import {getUserInfo} from "@/getData/getdata";
import {change_user_info} from "@/getData/getdata";

export default {
  name: "personal",
  data() {

    let validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        callback();
      }
    };
    let validateUsername = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'));
      } else {
        if (this.changeForm.checkPass !== '') {
          this.$refs.changeForm.validateField('checkPass');
        }
        callback();
      }
    };
    let checkTel = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('电话号码不能为空'));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error('请输入数字值'));
        } else {
          if ((value+'').length !== 11) {
            callback(new Error('必须为11位'));
          } else {
            callback();
          }
        }
      }, 1000);
    };
    return {
      change: require("@/assets/change.png"),
      mail: require("@/assets/mail.png"),
      phone: require("@/assets/phone.png"),
      gender: require("@/assets/gender.png"),
      male: require("@/assets/male.png"),
      female: require("@/assets/female.png"),
      bk: require("@/assets/person_head_bk.png"),
      info: {},
      sex:null,
      sex_msg:["暂未设置性别，请及时修改","雄雄火火","可可爱爱"],
      dialogVisible: false,
      changeForm:{
        "name": '',
        "tel":null,
        "mail":null,
        "sex":1,
        "sen":'',
        "pwd":''

      },
      rules: {
        name:[
          { required: true,validator: validateUsername, trigger: 'blur' }
        ],
        tel: [
          { required: true, validator: checkTel, trigger: 'blur' }
        ],
        mail:[
            { required: true, message: '请输入邮箱地址', trigger: 'blur' },
            { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ],
        pwd: [
          { required: true,validator: validatePass, trigger: 'blur' }
        ],
      },

    }
  },
  computed: {
    getToken() {
      return this.$store.state.token
    }
  },
  methods: {
    to_own_post(){
      this.$router.push('/personal/own_post')
    },
    clockon() {
      let thistime = new Date();
      //时间差
      let diff = new Date();
      let lo=new Date(this.$store.state.logintime)
      console.log(lo.getTime())
      diff.setTime(Math.abs(thistime.getTime() - lo.getTime()));
      let timediff = diff.getTime();
      let hos = Math.floor(timediff / (1000 * 60 * 60));
      let mins = Math.floor(timediff / (1000 * 60));
      let secs = Math.floor(timediff / 1000);
      //end
      let hours = thistime.getHours();
      let minutes = thistime.getMinutes();
      let seconds = thistime.getSeconds();

      if (eval(hours) < 10) {
        hours = "0" + hours;
      }
      if (eval(minutes) < 10) {
        minutes = "0" + minutes;
      }
      if (seconds < 10) {
        seconds = "0" + seconds;
      }
      thistime = hours + ":" + minutes + ":" + seconds;

      let clo=document.getElementById("jishi")
      //如果不取余的话，秒数是一直上升的，所以在达到一个60的时候就取余就可以解决这个问题了
      if (secs > 59) {
        secs = secs % 60;
      }
      if (mins > 59) {
        mins = mins % 60;
      }
      if (eval(secs) < 10) {
        secs = "0" + secs;
      }
      if (eval(mins) < 10) {
        mins = "0" + mins;
      }
      if (eval(hos) < 10) {
        hos = "0" + hos;
      }
      // }
      clo.innerHTML = hos + ":" + mins + ":" + secs;
      // /var timer = setTimeout("clockon()", 200);
    },
    cancel(){
      this.dialogVisible=false
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
          .then(() => {
            done();
          })
          .catch(() => {});
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.dialogVisible=false

          change_user_info(this.changeForm.name,this.changeForm.tel,this.changeForm.mail,this.changeForm.sex,this.changeForm.sen,this.changeForm.pwd,this.getToken).then(
              (res) =>{

                if(res.data.code===200){
                  console.log(res.data.data.name)
                  console.log(res.data.data.token)
                  localStorage.removeItem('token')
                  localStorage.removeItem('username')
                  localStorage.setItem('token', res.data.data.token)
                  localStorage.setItem('username', res.data.data.name)
                  this.$store.dispatch('setToken',res.data.data.token)
                  this.$store.dispatch('setName',res.data.data.name)
                  location.reload()
                }else{
                  alert(res.data.msg)

                }
              })

        }else {
          console.log('error submit!!');
          return false;
        }
      })
    },

    back(){
      this.$router.push('/')
    },
    async getInfo() {
      // 获取用户信息
      try {
        const result = await getUserInfo(this.getToken)
        if(result.data.code===200){
          console.log(result.data.data)
          this.info = result.data.data
          this.changeForm.sen=this.info.introduce
          this.changeForm.sex=this.info.sex
          this.changeForm.name=this.info.name
          this.changeForm.tel=Number(this.info.phone)
          this.changeForm.mail=this.info.mail

          if(this.info.sex===0){
            this.sex=this.gender
          }else if(this.info.sex === 1){
            this.sex=this.male
          }else{
            this.sex=this.female
          }
        }else{
          console.log("err")
          console.log(result.data.data)
          alert(result.data.msg)
          this.$router.push('/')
        }

      } catch (error) {
        console.log(error)
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

      await this.$router.push('/')
    },
  },

//页面dom渲染完成会调用mounted， create的话是刚创建vue实例
  mounted() {
    this.clockon()
    if (this.getToken) {
      this.getInfo()

    }
  },
}
</script>

<style scoped>
body{
  margin: 0;
}
.bk{
  position:absolute;
  width: 100%;
  height: 250px;
  z-index:-1;
}
.person_head{
  width: 100%;
  height: 250px;
}
.person_head_contain{
  display: flex;
}
.head_left{
  width: 200px;
  margin-left: 20%;
}
.head_right{
  cursor: default;
}
.person_img{
  position: relative;
  width: 120px;
  height: 120px;
  background-color: transparent;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  overflow: hidden;
  margin-left: 15%;
  top: 50px;
}
.person_img img{
  width: 100%;
  height: 100%;
  object-fit:cover;

}
.person_name{
  margin-right: 10px;
  font-family: 华文行楷;
  margin-top: 80px;
  width:fit-content;
  font-size: 40px;
  color: #fff;
  font-weight: 600;
}
.person_sentence{
  margin-top: 10px;
}
.allnum{
  float:right;
  margin-top: -80px;
  width:auto;
  height: auto;
  margin-right: 20%;
  border-right: 1px solid grey;
}
.name{
  font-size: 30px;
  margin-right: 20px;
}
.number{
  font-size: 50px;
  color: #bfffe3;
}
.person_information{
  margin-top: 30px;
  height: 200px;
}
.time_contain{
  height: 200px;
  margin-top: 30px;
}

.inner{
  height: 100%;
  margin-left: 10%;
  width: 80%;
  background-color: floralwhite;
  cursor: default;
}
.tw:hover{
  color: lightskyblue;
}


/deep/ .el-form-item__content{
  margin-left: 0 !important;
}
/deep/ .el-form-item__label{
  text-align: left;
float: left;
}
</style>
