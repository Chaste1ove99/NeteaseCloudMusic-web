<template>
    <div class="exclusive-container">
      <div class="top-bar">网易独家MV</div>
      <div class="demo-image">
  <div class="list2" v-for="(item, index) in mv" :key="index">
      <el-image
      class="image"
      :src="mv[index].cover"
      @click="intoPlayer(item)"
      fit="fill"></el-image>
       <span class="demonstration decoration content-name">{{ mv[index].name }}</span>
  </div>
      </div>
    </div>
</template>
<script>
import { getNTESMV } from '@/api/mv.js'
export default {
  name: 'exclusiveIndex',
  data () {
    return {
      mv: []
    }
  },
  created () {
    getNTESMV().then(res => {
      // console.log(res)
      // 请求结果没给总数 所以分页功能暂时做不了
      this.mv = res.data.data
    })
  },
  methods: {
    intoPlayer (item) {
      this.$router.push('/app/mvplayer?id=' + item.id)
    }
  }
}
</script>
<style scoped>
.exclusive-container {
   margin-left: 30px;
   width: 1200px;
   margin-bottom: 15%;
}
.top-bar{
  margin-bottom: 15px;
}
.image{
  width: 360px;
  height: 200px;
}
.list2 {
  display: inline-block;
  width: 350px;
  height: 220px;
  padding: 10px 30px 30px 0px;
}
.list2:hover{
  cursor: pointer;
}
.decoration {
  float: left;
}
.content-name {
  font-size: 14px;
}
</style>
