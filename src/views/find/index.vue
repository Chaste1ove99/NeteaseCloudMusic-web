<template>
    <div class="FindPage">
        <div class="header">
            <el-menu :default-active="$route.path" class="el-menu-demo menu" mode="horizontal" router>
  <el-menu-item index="1" class="item" >推荐</el-menu-item>
  <el-menu-item index="2" class="item">歌单</el-menu-item>
  <el-menu-item index="3" class="item">电台</el-menu-item>
  <el-menu-item index="4" class="item">排行榜</el-menu-item>
  <el-menu-item index="5" class="item">新歌</el-menu-item>
  <div class="search-bar">
  <el-input v-model="search" placeholder="请输入内容" class="search"></el-input>
   <el-button icon="el-icon-mic" class="icon" circle></el-button>
  </div>
</el-menu>
        </div>
        <div class="main"><router-view></router-view></div>
    </div>
</template>
<script>
export default {
  name: 'FindIndex',
  data () {
    return {
      search: ''
    }
  }
}
</script>
<style scoped>
.header {
  height: 100px
}
.item {
  margin-left: 50px;
}
.menu {
  padding-left: 100px;
}
.search-bar {
  float: right;
  width: 250px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 25px 0 0;
}
.icon {
    border: none;
}
.search {
    border-radius: 5px;
}
</style>
