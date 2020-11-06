<template>
  <div class="recommond-page">
      <div class='header'>推荐歌单</div>
      <div class="demo-image">
  <div class="block list1" v-for="(item, index) in list" :key="index">
      <el-image
      class="image"
      :src="list[index].picUrl"
      fit="fit"></el-image>
      <span class="demonstration decoration">{{ list[index].name }}</span>
  </div>
</div>
<div class='content'>独家放送</div>
<div class="demo-image">
  <div class="block list2" v-for="(item, index) in content" :key="index">
      <el-image
      class="image"
      :src="content[index].picUrl"
      fit="fit"></el-image>
  </div>
  <div class='content'>推荐MV</div>
<div class="demo-image">
  <div class="block list3" v-for="(item, index) in mv" :key="index">
      <el-image
      class="image"
      :src="mv[index].picUrl"
      fit="fit"></el-image>
       <span class="demonstration decoration artfont">{{ mv[index].artistName }}</span>
  </div>
</div>
</div>
</div>
</template>
<script>
import { getRecommondList, getOnlyByCloud, getRecommondMV } from '@/api/recommond.js'
export default {
  name: 'RecommondIndex',
  data () {
    return {
      list: [],
      content: [],
      mv: []
    }
  },
  created () {
    getRecommondList().then(res => {
      this.list = res.data.result
    })
    getOnlyByCloud().then(res => {
      this.content = res.data.result
    })
    getRecommondMV().then(res => {
      this.mv = res.data.result
      console.log(this.mv)
    })
  }
}
</script>
<style scoped>
.recommond-page {
  margin-left: 10px;
  width: 1300px;
}
.list1 {
  display: inline-block;
  width: 180px;
  height: 250px;
  padding: 10px;
}
.decoration {
  float: left;
}
.header {
  padding-left:20px;
  margin-left:3px;
  margin-top:20px;
}
.list2 {
  display: inline-block;
  width: 220px;
  height: 120px;
  padding: 15px;
  padding-top: 10px;
}
.content {
  margin-top:20px;
  padding-left: 20px;
  margin-left:3px;
}
.list3 {
  display: inline-block;
  width: 200px;
  height: 240px;
  padding: 15px;
  padding-bottom: 10px;
}
.artfont {
  font-family: 'DFKai-SB';
  color: grey;
  font-size: 12px;
}
</style>
