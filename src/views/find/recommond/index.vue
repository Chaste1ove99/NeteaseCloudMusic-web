<template>
  <div class="recommond-page">
      <div class='header'>推荐歌单</div>
      <div class="list-block">
  <div class="songlist" v-for="(item, index) in list" :key="index" @click="intolist(item)">
      <el-image
      class="image"
      :src="list[index].picUrl"
      fit="fill"></el-image>
      <div class="list-name decoration">{{ list[index].name }}</div>
  </div>
</div>
<div class='content'>独家放送</div>
<div class="list-block">
  <div class="content-list" v-for="(item, index) in content" :key="index">
      <el-image
      class="image"
      :src="content[index].picUrl"
      fit="fill"></el-image>
       <div class="decoration content-name">{{ content[index].name }}</div>
  </div>
  <div class='content'>推荐MV</div>
<div class="list-block">
  <div class="mv-list" v-for="(item, index) in mv" :key="index">
      <el-image
      class="image"
      :src="mv[index].picUrl"
      fit="fill"></el-image>
       <span class="mv-name artfont2">{{ mv[index].name }}</span>
       <div class="decoration artfont1">{{ mv[index].artistName }}</div>
  </div>
  <div class='content'>推荐电台</div>
<div class="list-block">
  <div class="channel-list" v-for="(item, index) in channel" :key="index">
      <el-image
      class="image channel-image"
      :src="channel[index].picUrl"
      fit="fill"></el-image>
       <div class="decoration channel-name">{{ channel[index].name }}</div>
  </div>
</div>
</div>
</div>
</div>
</template>
<script>
import { getRecommondList, getOnlyByCloud, getRecommondMV, getRecommondChannel } from '@/api/recommond.js'
// import { getListDetail } from '@/api/songlist.js'
// import router from '@/router'
export default {
  name: 'RecommondIndex',
  data () {
    return {
      list: [],
      content: [],
      mv: [],
      channel: [],
      newRoutes: []
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
    })
    getRecommondChannel().then(res => {
      // console.log(res)
      this.channel = res.data.result
    })
  },
  methods: {
    intolist (item) {
      this.$router.push('/app/list?id=' + item.id)
      this.$store.commit('getListID', item.id)
    }
  }
}
</script>
<style scoped>
.recommond-page {
  margin-left: 10px;
  padding-bottom: 15%;
}
 .list-block{
   padding-top: 20px;
 }
.mv-name{
  white-space: nowrap;
  text-overflow: ellipsis;
}
.songlist{
  width: 15%;
  display: inline-block;
  padding: 10px;
  vertical-align: top;
}
.decoration {
    display: -webkit-box;
    overflow: hidden;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
}
.header {
  padding-left:20px;
  margin-left:3px;
}
.content-list {
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
.mv-list {
  display: inline-block;
  width: 200px;
  height: 150px;
  padding: 15px;
  padding-bottom: 10px;
  overflow: hidden;
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
.channel-list {
  display: inline-block;
  width: 40%;
}
.channel-image {
  display: inline-block;
  width: 30%;
  margin: 20px 10px 20px 20px;
  vertical-align: top;
}
.channel-name {
  display: inline-block;
  margin-top: 60px;
  width: 60%;
  vertical-align: middle;
}
.content-name {
  font-size: 14px;
}
</style>
