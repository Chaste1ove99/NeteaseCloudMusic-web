<template>
    <div class='home-page'>
    <div class='login-ui'>
    <div class='log'> <img id='logo' src='./1.jpg'><div class='title'>网易云音乐</div></div>
    <el-form  :rules="rules" :model="user" ref="user" class="demo-ruleForm">
        <el-form-item prop='email'>
    <el-input class='input' v-model="user.email" placeholder="请输入邮箱账号" prefix-icon='el-icon-s-custom'></el-input></el-form-item>
    <el-form-item prop='password'>
    <el-input  class='input' type='password' v-model="user.password" placeholder="请输入密码" prefix-icon='el-icon-view'></el-input></el-form-item>
    </el-form><el-row>
  <el-button @click="submit">登录</el-button>
    </el-row>
    </div>
    </div>
</template>
<script>
import { loginbyEmail } from '@/api/get.js'
export default {
  name: 'MobileIndex',
  data () {
    return {
      user: {
        email: '',
        password: ''
      },
      rules: {
        email: [
          { required: true, message: '请输入163邮箱账号', trigger: 'blur' },
          { pattern: /^\w+@\w+.com$/, message: '您输入的邮箱账号格式错误', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 20, message: '您输入的密码不满足格式要求', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submit () {
      loginbyEmail(this.user).then(res => {
        console.log(res)
        this.$message('登录成功,等待页面刷新')
      }).catch(error => {
        console.log(error)
        this.$message.error(error.data.msg)
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
  display: block;
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
</style>
