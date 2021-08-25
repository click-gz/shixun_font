<template>
<div>
   <div class="header" style="background-color: lavender;min-width:700px;">
     <div style="position: absolute;margin-top: 10px;margin-left: 10px;cursor: pointer" class="back" @click="$router.push('/')">
       返回首页
     </div>
     <div class="header_inner" style="min-width:500px;width: 70%;margin-left: 15%;padding-top: 30px;padding-bottom: 10px">
       <el-steps :active="step">
         <el-step title="步骤 1" description="填写账号"></el-step>
         <el-step title="步骤 2" description="身份验证"></el-step>
         <el-step title="步骤 3" description="设置新密码"></el-step>
         <el-step title="步骤 4" description="完成"></el-step>
       </el-steps>
     </div>
   </div>

  <main v-loading="loading">
    <div v-if="step===1" class="table">

      <el-form :model="checkForm" ref="checkForm"  label-width="100px">
        <el-form-item

            prop="tel"
            label="手机号"
            :rules="[
                      { required: true, message: '请输入手机号', trigger: 'blur' },
                    ]"
        >
          <el-input v-model="checkForm.tel"></el-input>
        </el-form-item>

      </el-form>
    </div>
    <div v-else-if="step===2" class="table">
      <div style="margin-bottom: -20px">
        已查询到您的邮箱为：{{this.checkForm.mail}}，<br>请关注验证码接收。
      </div>
      <el-form :model="checkForm" ref="checkForm"  label-width="100px">
        <el-form-item
            prop="code"
            label="验证码"
            :rules="[
                      { required: true, message: '请输入验证码', trigger: 'blur' }
                    ]"
        >
          <el-input v-model="checkForm.code"></el-input>
        </el-form-item>

      </el-form>
    </div>

    <div v-else-if="step===3" class="table">
      <el-form :model="checkForm" ref="checkForm"  label-width="100px">
        <el-form-item
            prop="newpwd"
            label="新密码："
            :rules="[
                      { required: true, message: '请输入新密码', trigger: 'blur' }
                    ]"
        >
          <el-input v-model="checkForm.newpwd"></el-input>
        </el-form-item>

      </el-form>
    </div>
    <div v-else-if="step===4" class="table">
      <div style="margin-top: 60px;margin-left: 10px">
        <img :src="ok" alt="">
        <div style="position: relative;left: 70px;top: -50px">
          <span>
            恭喜你完成了新密码的修改，
          </span><br>
          <span>
            <span style="color: yellowgreen">{{this.x}}</span>秒后将完成跳转
          </span>
        </div>
      </div>
    </div>

    <button @click="submitForm('checkForm')" class="btu" v-show="this.step!=4">下一步</button>

  </main>
</div>
</template>

<script>
import {forget_pwd, new_pwd} from "@/getData/getdata";

export default {
  name: "getpwd",
  data(){
    return {
      loading: false,
      ok: require("@/assets/ok.png"),
      step: 1,
      x:5,
      mistake:0,
      checkForm: {
        "tel": '',
        "user_id":'',
        "mail":'',
        "pwd":'',
        "code":'',
        "newpwd": '',
        "check_code":''
      }
    }
  },
  methods:{
    run(){
      this.x--;
      if(this.x>0) {

        window.setTimeout(this.run, 1000);
      }else{
        this.$router.push('/login')
      }
      /* 上面一句也可以用以下替换
      window.setTimeout("run()",1000);*/
    },
    submitForm(formName) {

      this.$refs[formName].validate((valid) => {
        if (valid) {

            if(this.step===1){
              this.loading=true
              forget_pwd(this.checkForm.tel).then((res)=>{

                if(res.data.code===200){
                  this.step++;
                  this.checkForm.user_id=res.data.data.user_id
                  this.checkForm.mail=res.data.data.mail
                  this.checkForm.check_code=res.data.data.check_code

                  this.loading=false
                }else{
                  alert(res.data.msg)
                  location.reload()
                }
              })
            }
            else if(this.step===2){
              console.log(this.checkForm.code)
              if(this.checkForm.check_code===this.checkForm.code){
                this.step++;
              }else{
                if(this.mistake<3){
                  this.mistake++;
                  this.$message("验证码错误，还有"+(3-this.mistake)+"次机会！！")

                }
                else{
                  location.reload()
                }
              }
            }
            else if(this.step===3){
              new_pwd(this.checkForm.user_id,this.checkForm.newpwd).then((res)=>{
                console.log(this.checkForm.newpwd)
                if(res.data.code===200){
                  this.step++
                  this.run()
                }else{
                  alert(res.data.msg)
                  location.reload()
                }

              })

            }
        }else {
          console.log('error submit!!');
          return false;
        }
      })
    },
  }
}
</script>

<style scoped>
body{
  margin: 0;
}
.back:hover{
  color: lightskyblue;
}
.table{
  margin-top: 40px;
  width: 400px;
  height: 300px;
  margin-left: 35%;
}
/deep/ .el-form-item__label{
  margin-top: 70px;
  text-align: left;
  margin-bottom: 20px;
}
/deep/ .el-form-item__content{
  margin-left: 0 !important;
}
.btu{
  margin-left: 43%;
  border: 0;
  background-color: transparent;
  font-size: 20px;
  cursor: pointer;
}
.btu:hover{
  background-color: skyblue;
  color: white;
}
</style>
