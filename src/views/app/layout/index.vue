<template>
   <el-menu
     class="menu"
     :default-active='activeIndex'
      background-color='#fff'
      text-color="#000"
      router
      active-text-color="red">
      <div class="item-block">
      <el-menu-item index='/app/find' class="item" route='/app/find/1'>
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
      </div>
      <el-menu-item index='/FM/1' class="item-fm">
        <i class="el-icon-service"></i>
        <span slot="title">私人FM</span>
      </el-menu-item>
    </el-menu>
</template>
<script>
export default {
  name: 'asideIndex',
  data () {
    return {
      reg: '/^/[0-9a-zA-Z_]*/[0-9a-zA-Z_]*/',
      activeIndex: this.reg.exec(this.$route.path)
    }
  }
}
</script>
<style scoped>
.menu{
  padding-top: 80px;
  height: 80%;
  display: flex;
  flex-direction: column;
}
.item-block{
  flex: 4;
  display: flex;
  flex-direction: column;
}
.item{
  flex: 1;
}
.item-fm{
  padding-top: 50px;
  flex: 2;
}
</style>
