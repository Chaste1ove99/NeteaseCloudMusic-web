<template>
    <el-container class="container">
  <el-aside class="aside" width='auto' height='100%'>
      <layout class="layout"></layout>
  </el-aside>
  <el-container class="main">
    <el-main>
    <router-view></router-view>
    </el-main>
    <el-container class="footer">
    <el-footer>
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
  position: relative;
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
  border: 1px solid black;
  height: 15%;
}
</style>
