<template>
   <el-menu
     class="menu"
     :default-active='activeIndex'
      background-color='#fff'
      text-color="#000"
      router
      active-text-color="red">
      <el-menu-item index='/app/find' class="item1" route='/app/find/1'>
        <i class="el-icon-s-grid"></i>
        <span slot="title">发现</span>
      </el-menu-item>
      <el-menu-item index='/app/mv' class="item" route='/app/mv/1'>
        <i class="el-icon-video-camera-solid"></i>
        <span slot="title">MV</span>
      </el-menu-item>
      <el-menu-item index='/app/my' class="item" route='/app/my'>
        <i class="el-icon-headset"></i>
        <span slot="title">我的</span>
      </el-menu-item>
      <el-menu-item index='/app/friend' class="item" route='/app/friend'>
        <i class="el-icon-user-solid"></i>
        <span slot="title">朋友</span>
      </el-menu-item>
      <el-menu-item index='/app/user' class="item" route='/app/user'>
        <i class="el-icon-user"></i>
        <span slot="title">账号</span>
      </el-menu-item>
      <el-menu-item index='/FM/1' class="fm">
        <i class="el-icon-service"></i>
        <span slot="title">私人FM</span>
      </el-menu-item>
    </el-menu>
</template>
<script>
export default {
  name: 'LayoutIndex',
  data () {
    return {
      reg: '/^/[0-9a-zA-Z_]*/[0-9a-zA-Z_]*/',
      activeIndex: this.reg.exec(this.$route.path)
    }
  }
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
