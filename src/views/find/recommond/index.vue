<template>
  <div class="recommond-page">
      <div class='header'>推荐歌单</div>
      <div class="demo-image">
  <div class="block list1" v-for="(item, index) in list" :key="index">
      <el-image
      class="image"
      :src="list[index].picUrl"
      fit="cover"></el-image>
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
       <span class="demonstration decoration content-name">{{ content[index].name }}</span>
  </div>
  <div class='content'>推荐MV</div>
<div class="demo-image">
  <div class="block list3" v-for="(item, index) in mv" :key="index">
      <el-image
      class="image"
      :src="mv[index].picUrl"
      fit="fit"></el-image>
       <span class="demonstration decoration artfont2">{{ mv[index].name }}</span>
       <p class="demonstration decoration artfont1" style="clear:both">{{ mv[index].artistName }}</p>
  </div>
  <div class='content'>推荐电台</div>
<div class="demo-image  bottom">
  <div class="block list4" v-for="(item, index) in channel" :key="index">
      <el-image
      class="image channel-image"
      :src="channel[index].picUrl"
      fit="fit"></el-image>
       <span class="demonstration decoration channel-name">{{ channel[index].name }}</span>
  </div>
</div>
</div>
</div>
</div>
</template>
<script>
import { getRecommondList, getOnlyByCloud, getRecommondMV, getRecommondChannel } from '@/api/recommond.js'
export default {
  name: 'RecommondIndex',
  data () {
    return {
      list: [],
      content: [],
      mv: [],
      channel: []
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
    getRecommondChannel().then(res => {
      // console.log(res)
      this.channel = res.data.result
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
  height: 180px;
  padding: 15px;
  padding-bottom: 40px;
}
.decoration {
  float: left;
}
.header {
  padding-left:20px;
  margin-left:3px;
}
.list2 {
  display: inline-block;
  width: 220px;
  height: 80px;
  padding: 15px;
  padding-top: 10px;
}
.content {
  margin-top:75px;
  padding-left: 20px;
  margin-left:3px;
}
.list3 {
  display: inline-block;
  width: 200px;
  height: 150px;
  padding: 15px;
  padding-bottom: 10px;
}
.artfont1 {
  font-family: 'DFKai-SB';
  color: grey;
  font-size: 12px;
}
.artfont2 {
  display: inline;
  font-size: 12px;
}
.list4 {
  display: inline-block;
  width: 500px;
}
.channel-image {
  width:120px;
  height: 120px;
  float: left;
  margin: 20px 10px 20px 20px;
}
.channel-name {
  margin-top: 60px;
  width: 300px;
}
.bottom {
  margin-bottom: 20%;
}
.content-name {
  font-size: 14px;
}
</style>
