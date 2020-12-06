<template>
  <div class="friend-container">
      <div class="left-container">
      <div class="top-bar">
<el-menu class="el-menu-demo menu" mode="horizontal">
  <el-menu-item index="1" class="item">朋友动态</el-menu-item>
</el-menu>
      </div>
      <div>目前web版本不支持朋友动态功能...</div>
      </div>
      <div class="right-container">目前web版本不支持朋友动态功能...</div>
  </div>
</template>
<script>
export default {
  name: 'FriendIndex'
}
</script>
<style scoped>
.friend-container {
    width: 1250px;
}
.menu {
    display: flex;
    align-items: center;
    justify-content: center;
}
.left-container {
    display: inline-block;
    width: 750px;
}
.right-container {
    display: inline-block;
    width: 300px;
    border-left: 1px solid #cccccc;
    height: 100%;
    position: absolute;
}
</style>
