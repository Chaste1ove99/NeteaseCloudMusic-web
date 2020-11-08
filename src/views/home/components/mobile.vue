<template>
    <div class='home-page'>
    <div class='login-ui'>
    <div class='log'> <img id='logo' src='./1.jpg'><div class='title'>网易云音乐</div></div>
    <el-form  :rules="rules" :model="user" ref="user" class="demo-ruleForm">
       <el-form-item prop="mobile">
    <el-input class='input' v-model="user.mobile" placeholder="请输入手机号" prefix-icon='el-icon-s-custom'></el-input></el-form-item>
    <el-form-item prop='password'>
    <el-input  class='input' type='password' v-model="user.password" placeholder="请输入密码" prefix-icon='el-icon-view'></el-input>
    </el-form-item>
    </el-form>
    <el-row>
  <el-button @click="submit">登录</el-button>
    </el-row>
    </div>
    </div>
</template>
<script>
import { loginbyMobile } from '@/api/get.js'
export default {
  name: 'MobileIndex',
  data () {
    return {
      user: {
        mobile: '',
        password: ''
      },
      rules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { min: 11, max: 11, message: '您输入的号码不满足格式要求', trigger: 'blur' }
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
      loginbyMobile(this.user).then(res => {
        console.log(res)
        if (res.data.code === 200) {
          this.$message({
            type: 'success',
            message: '登陆成功'
          })
          // 获取用户ID 储存到本地 或者这里用vuex调用也未尝不可
          localStorage.setItem('userID', res.data.account.id)
          this.$router.push('/app/find/1')
        } else if (res.data.code === 502) {
          this.$message({
            type: 'error',
            message: '密码错误'
          })
        }
      }).catch(err => {
        console.log(err)
        if (err.response.status === 501) {
          this.$message({
            type: 'error',
            message: '您的账号不存在'
          })
        }
        if (err.response.status === 509) {
          this.$message({
            type: 'error',
            message: '您的密码错误次数已达到上限,请稍后重试'
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
  display: block;
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
