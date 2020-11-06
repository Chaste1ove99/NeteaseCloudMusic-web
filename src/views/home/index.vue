<template>
    <div class="login-home">
        <div class='log'> <img id='logo' src='./components/1.jpg'><div class='title'>网易云音乐</div></div>
        <el-row>
  <el-button type="danger" icon="el-icon-user-solid" circle @click="onLoginByMobile"></el-button>
  <el-button type="danger" icon="el-icon-message" circle @click="onLoginByEmail"></el-button>
  <el-button type="danger" icon="el-icon-edit" circle @click="register"></el-button>
</el-row>
    </div>
</template>
<script>
export default {
  name: 'HomeLoginIndex',
  methods: {
    onLoginByMobile () {
      this.$router.push('/mobileLogin')
    },
    onLoginByEmail () {
      this.$router.push('./emailLogin')
    },
    register () {
      this.$router.push('./register')
    }
  }
}
</script>
<style scoped>
.login-home {
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
</style>
