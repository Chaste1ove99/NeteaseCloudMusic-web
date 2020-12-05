<template>
    <el-container class="container">
  <el-aside class="aside" width='auto' height='100%'>
      <asideBar id="a1"></asideBar>
  </el-aside>
  <el-container class="main">
    <el-main>
    <router-view></router-view>
    </el-main>
    <el-container class="footer">
    <el-footer>
      <footer-player id="a2"></footer-player>
       </el-footer>
    </el-container>
     </el-container>
</el-container>
</template>
<script>
import asideBar from './layout/index.vue'
import footerPlayer from './footer/index.vue'
export default {
  name: 'APPIndex',
  components: {
    asideBar,
    footerPlayer
  }
}
</script>
<style scoped>
.main {
  margin-left: 100px;
}
.aside {
  height: 100vh;
  position: fixed;
}
.footer {
  position:fixed;
  bottom: 0;
  left: 0;
  height: 20%;
  width: 100%;
  padding: 0;
  background: #fff;
}
.none{
  display: none;
}
</style>
