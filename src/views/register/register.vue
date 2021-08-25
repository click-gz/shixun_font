<template>
  <div class="register" >

    <div class="formregister">
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">

        <el-form-item label="用户名" prop="username">
          <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="pass">
          <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="手机号" prop="tel">
          <el-input v-model.number="ruleForm.tel"></el-input>
        </el-form-item>

        <el-form-item
            prop="email"
            label="邮箱"
            :rules="[
                      { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                      { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
                    ]"
        >
          <el-input v-model="ruleForm.email"></el-input>
        </el-form-item>


        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>

    </div>


  </div>
</template>

<script>
import {registerApi} from "@/getData/getdata";

export default {

  name: "register",
  data() {
    let validateUsername = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'));
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
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


    let validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        callback();
      }
    };
    let validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      screenWidth: document.body.clientWidth,
      imgSrc: require('../../assets/background.jpg'),
      ruleForm: {
        username: '',
        pass: '',
        checkPass: '',
        tel: '',
        email:''
      },
      rules: {
        username:[
          { required: true,validator: validateUsername, trigger: 'blur' }
        ],
        pass: [
          { required: true,validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { required: true,validator: validatePass2, trigger: 'blur' }
        ],
        tel: [
          { required: true,validator: checkTel, trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 调用注册业务
          //phone,username, pwd
          registerApi(this.ruleForm.tel,this.ruleForm.username , this.ruleForm.pass,this.ruleForm.email).then( (res) => {
            if (res.data.code === 200) {
              console.log(res.data.data.token)
              //保存token
              localStorage.setItem('token', res.data.data.token)
              localStorage.setItem('username', res.data.data.name)
              localStorage.setItem('avater', res.data.data.avater)//headimg


              this.$store.dispatch('setToken',res.data.data.token)
              this.$store.dispatch('setName',res.data.data.name)
              this.$store.dispatch('setAvater',res.data.data.avater)

              this.$router.push('/')
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

    },
    getregister(){
      this.$router.push({ path: '/register' })
    }

  },

  mounted(){
    const that = this
    window.onresize = () => {
      return (() => {
        window.screenWidth = document.body.clientWidth
        that.screenWidth = window.screenWidth
      })()
    }
  },
  watch:{
    screenWidth(val){
      // 为了避免频繁触发resize函数导致页面卡顿，使用定时器
      if(!this.timer){
        // 一旦监听到的screenWidth值改变，就将其重新赋给data里的screenWidth
        this.screenWidth = val
        this.timer = true
        let that = this
        setTimeout(function(){
          // 打印screenWidth变化的值
          console.log(that.screenWidth)
          that.timer = false
        },40)
      }
    },
  }
}
</script>

<style scoped>
body{
  margin: 0;
}
.formregister{
  position: absolute;
  left: 35%;
  top: 28%;
  z-index: 1;
  background-color: floralwhite;
  opacity: 0.8;
}
.register{
  background:url("../../assets/background.jpg");
  width:100%;
  height:100%;
  position:fixed;
  background-size:100% auto;
  overflow-y: hidden;
}

.demo-ruleForm{
  margin-top:20px;
  margin-right: 40px;
}

</style>
