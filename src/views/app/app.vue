<template>
    <el-container class="container">
  <el-aside class="aside" width='auto' height='100%'>
      <layout></layout>
  </el-aside>
  <el-container class="main">
    <el-main>
    <router-view></router-view>
    </el-main>
    <el-container class="footer">
    <el-footer class="el-ft">
      <footer-player></footer-player>
       </el-footer>
    </el-container>
     </el-container>
</el-container>
</template>
<script>
import layout from './layout/index.vue'
import footerPlayer from './footer/index.vue'
export default {
  name: 'FooterIndex',
  components: {
    layout,
    footerPlayer
  }
}
</script>
<style scoped>
.main {
  margin-left: 100px;
}
.container {
  position: relative;
}
.aside {
  height: 100%;
  position: fixed;
}
.footer {
  position:fixed;
  bottom: 0;
  right: 0;
  left: 0;
  height: 20%;
  width: 100%;
  padding: 0;
  background: #fff;
}
.el-ft {
  padding: 0;
}
</style>
