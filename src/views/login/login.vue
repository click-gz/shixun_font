<template>
  <div class="login" >
    <div class="back" @click="back">
       首页
    </div>


    <div class="formlogin">
      <el-form :model="loginForm" :rules="rules" ref="loginForm" label-width="100px" class="demo-loginForm">

        <el-form-item label="手机号" prop="tel">
          <el-input v-model.number="loginForm.tel"></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="password" style="width: 300px">
          <el-input type="password" v-model="loginForm.password"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
          <el-button @click="resetForm('loginForm')">重置</el-button>
        </el-form-item>
      </el-form>

      <el-button class="btu" @click="getpwd">忘记密码</el-button>
      <el-button class="btu" @click="getregister">注册账号</el-button>
    </div>


  </div>
</template>

<script>
import {loginApi} from "@/getData/getdata";

export default {
  name: "Login",
  data() {
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
      loginForm: {
        tel: null,
        password: '',
        code: '',
        token: '',
      },

      rules: {
        tel: [
          { required:true, validator: checkTel, trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
        ],
      },

    };
  },
  methods: {
    back(){
      this.$router.push('/')
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {

          //调用登录接口
          loginApi(this.loginForm.tel, this.loginForm.password).then((res) => {
              if (res.data.code === 200) {
                let logintime=new Date()
                localStorage.setItem('logintime', logintime)
                this.$store.dispatch('setLogintime',logintime)

                localStorage.setItem('user_id', res.data.data.id)
                this.$store.dispatch('setuserid',res.data.data.id)

                //保存token
                localStorage.setItem('token', res.data.data.token)
                localStorage.setItem('username', res.data.data.name)
                localStorage.setItem('avater', res.data.data.avater)


                this.$store.dispatch('setToken',res.data.data.token)
                this.$store.dispatch('setName',res.data.data.name)
                this.$store.dispatch('setAvater',res.data.data.avater)


                this.$router.push({ path: '/' })
              }else if(res.data.code === 401){
                alert(res.data.msg)
                location.reload()
              }


          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    getpwd(){
      this.$router.push('/forget_pwd')
    },
    getregister(){
      this.$router.push({ path: '/register' })
    }

  },
}
</script>

<style scoped>
body{
  margin: 0;
}
.login{
  background:url("../../assets/background.jpg");
  width:100%;
  height:100%;
  position:fixed;
  background-size:100% auto;
  overflow-y: hidden;
}
.formlogin{
  position: absolute;
  left: 35%;
  top: 30%;
  z-index: 1;
  background-color: floralwhite;
  opacity: 0.8;
}
.background{

  z-index:-1;
  position: absolute;
  margin-left: -5px;
}
.demo-loginForm{
  margin-top:20px;
  margin-right: 40px;
}
.btu{
  background-color: transparent;
  border: 0px;
  margin-left:60px;
}
.back{
  margin-left: 10px;
  margin-top: 10px;
  color: white;
  font-size: 18px;
  cursor: pointer;

}
.back:hover{
  color: lightskyblue;
}
</style>
