<template>
   <el-menu
     class="menu"
     :default-active="$route.path"
      background-color='#fff'
      text-color="#000"
      router
      active-text-color="red">
      <el-menu-item index='/app/find/1' class="item1">
        <i class="el-icon-s-grid"></i>
        <span slot="title">发现</span>
      </el-menu-item>
      <el-menu-item index='/app/mv/1' class="item">
        <i class="el-icon-video-camera-solid"></i>
        <span slot="title">MV</span>
      </el-menu-item>
      <el-menu-item index='/app/my' class="item">
        <i class="el-icon-headset"></i>
        <span slot="title">我的</span>
      </el-menu-item>
      <el-menu-item index='/app/friend' class="item">
        <i class="el-icon-user-solid"></i>
        <span slot="title">朋友</span>
      </el-menu-item>
      <el-menu-item index='/app/user' class="item">
        <i class="el-icon-user"></i>
        <span slot="title">账号</span>
      </el-menu-item>
      <el-menu-item index='/FM' class="fm">
        <i class="el-icon-service"></i>
        <span slot="title">私人FM</span>
      </el-menu-item>
    </el-menu>
</template>
<script>
export default {
  name: 'LayoutIndex'
}
</script>
<style scoped>
.item1{
  margin-top: 80px;
}
.item {
  margin-top: 20px;
}
.fm{
  margin-top: 100px;
}
.menu{
  height: 700px;
}
</style>
