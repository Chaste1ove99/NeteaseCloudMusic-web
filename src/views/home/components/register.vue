<template>
  <div class='register-page'>
      <div class='login-ui'>
    <div class='log'> <img id='logo' src='./1.jpg'><div class='title'>网易云音乐</div></div>
    <el-input class='input' v-model="user.mobile" placeholder="请输入手机号" prefix-icon='el-icon-s-custom' @change='checkPhone'></el-input>
    <div class="getCode">
    <el-input  class='inputCode' type='password' v-model="user.code" placeholder="请输入验证码" prefix-icon='el-icon-view' @change='submitCode'></el-input>
     <el-button type="danger" class="send" @click="sendCodeRequest">获取验证码</el-button>
    </div>
    <el-input class='input' v-model="user.password" placeholder="请输入密码" prefix-icon='el-icon-view'></el-input>
    <el-input class='input' v-model="user.nickname" placeholder="请输入昵称" prefix-icon='el-icon-s-custom'></el-input>
    <el-button @click="submitRegister">注册</el-button>
      </div>
  </div>
</template>
<script>
import { sendCode, checkCode, register, checkMobile } from '@/api/get.js'
export default {
  name: 'RegisterIndex',
  data () {
    return {
      user: {
        mobile: '',
        code: '',
        password: '',
        nickname: ''
      }
    }
  },
  methods: {
    sendCodeRequest () {
      sendCode(this.user).then(res => {
        console.log(res)
      })
    },
    submitCode () {
      checkCode(this.user).then(res => {
        console.log(res)
      }).catch(error => {
        console.log(error)
        this.$message.error('您的验证码有误')
      })
    },
    submitRegister () {
      register(this.user).then(res => {
        console.log(res)
      })
    },
    checkPhone () {
      checkMobile(this.user).then(res => {
        console.log(res)
        if (res.data.exist === 1) {
          this.$message({
            message: '您的手机号已经被注册,请检查后重试',
            type: 'warning'
          })
        }
      })
    }
  }
}
</script>
<style scoped>
.login-ui {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.input {
  width: 250px;
  margin-bottom: 20px;
}
#logo {
  width:150px;
  height: 100px;
  float: left;
  margin-right: 60px;
  margin-left: -40px;
}
.log {
  cursor: pointer;
}
.title {
 margin-top: 40px;
 float: right;
 font-family: Arial, Helvetica, sans-serif;
  text-decoration: none;
  color:#333;
  margin-left: -40px
}
.inputCode {
  margin-bottom: 20px;
  width: 120px;
  float: left;
  margin-right: 30px;
}
.getCode {
  display:inline-block;
}
.send {
    width: 100px;
    float: right;
}
</style>
