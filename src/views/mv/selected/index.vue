<template>
    <div class="selected-container">
        <div class="new-mv">
            <div class="top-bar">最新MV</div>
            <div class="first" @click="intoPlayer(firstMV)">
                <el-image
      style="width:480px; height: 325px"
      :src="firstMV.cover"
      class="mv_page"
      fit="fill"></el-image><div class="decoration1">{{firstMV.name}} - {{firstMV.artistName}}</div></div>
            <div class="Others"><div class="percent-mv" v-for="(item, index) in newMVList" :key='index' @click="intoPlayer(item)" :id="'a'+index">
                <el-image
                class="new-image mv_page"
      style="width:250px; height: 150px"
      :src="item.cover"
      fit="fill"></el-image><div class="decoration2">{{item.name}} - {{item.artistName}}</div></div></div>
        </div>
        <div class="hot-mv">
          <div class="top-bar">推荐MV</div>
          <div class="demo-image">
  <div class="list3 mv_page" v-for="(item, index) in mv" :key="index">
      <el-image
      class="image"
      :src="mv[index].picUrl"
      @click="intoPlayer(item)"
      fit="fill"></el-image>
       <span class="demonstration decoration artfont2">{{ mv[index].name }}</span>
       <p class="demonstration decoration artfont1" style="clear:both">{{ mv[index].artistName }}</p>
  </div>
          </div>
        </div>
    </div>
</template>
<script>
import { getNewMV } from '@/api/mv.js'
import { getRecommondMV } from '@/api/recommond.js'
export default {
  name: 'selectedIndex',
  data () {
    return {
      firstMV: {},
      newMVList: [],
      mv: []
    }
  },
  created () {
    getNewMV().then(res => {
      // console.log(res)
      this.newMVList = res.data.data
      this.firstMV = this.newMVList.shift()
    })
    getRecommondMV().then(res => {
      this.mv = res.data.result
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
  .selected-container {
    margin-left: 30px;
    width: 1200px;
    margin-bottom: 15%;
  }
  .top-bar {
    margin-bottom: 15px;
  }
  .decoration1 {
      position: relative;
      top: -50px;
      left: 5px;
      font-size: 14px;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      color: #fff;
  }
  .Others {
      display: inline-block;
      width: 550px;
      position: relative;
      margin-left: 110px;
      vertical-align: top;
  }
  .first {
      display: inline-block;
      width: 400px;
      vertical-align: top;
  }

  #a0{
      display: inline-block;
      width: 260px;
      height: 140px;
      margin-right: 5px;
      vertical-align: top;
  }
  #a1{
      display: inline-block;
      width: 260px;
      height: 140px;
      margin-right: 5px;
      vertical-align: top;
  }
  #a2{
      display: inline-block;
      width: 260px;
      height: 140px;
      margin-right: 5px;
      margin-top: 33px;
      vertical-align: bottom;
  }
   #a3{
      display: inline-block;
      width: 260px;
      height: 140px;
      margin-right: 5px;
      margin-top: 33px;
      vertical-align: text-bottom;
  }
  .new-image {
    border: 1px solid #9d9795;
  }
  .decoration2 {
      position: relative;
      top: -50px;
      left: 5px;
      font-size: 14px;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      color: #fff;
  }
  .hot-mv {
    margin-top: 20px;
  }
  .list3 {
  display: inline-block;
  width: 200px;
  height: 150px;
  padding-right: 15px;
  padding-top: 15px;
  padding-bottom: 10px;
}
.decoration {
  float: left;
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
.mv_page:hover{
  cursor: pointer;
  opacity: 50%;
}
</style>
