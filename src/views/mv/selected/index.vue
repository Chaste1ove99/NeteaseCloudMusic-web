<template>
    <div class="selected-container">
        <div class="new-mv">
            <div class="top-bar">最新MV</div>
            <div class="first">
                <el-image
      style="width:480px; height: 325px"
      :src="firstMV.cover"
      fit="fill"></el-image><div class="decoration1">{{firstMV.name}} - {{firstMV.artistName}}</div></div>
            <div class="Others"><div class="percent-mv" v-for="(item, index) in newMVList" :key='index'>
                <el-image
                class="new-image"
      style="width:250px; height: 150px"
      :src="item.cover"
      fit="fill"></el-image><div class="decoration2">{{item.name}} - {{item.artistName}}</div></div></div>
        </div>
        <div class="hot-mv">
          <div class="top-bar">推荐MV</div>
          <div class="demo-image">
  <div class="list3" v-for="(item, index) in mv" :key="index">
      <el-image
      class="image"
      :src="mv[index].picUrl"
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
      for (let i = 0; i < this.newMVList.length; i++) {
        if (this.newMVList[i].name.length > 10) {
          this.newMVList[i].name = this.newMVList[i].name.slice(0, 10) + '...'
        }
      }
      this.firstMV = this.newMVList.shift()
    })
    getRecommondMV().then(res => {
      this.mv = res.data.result
    })
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
      color: #fff;
      font-size: 14px;
  }
  .Others {
      display: inline-block;
      width: 600px;
      position: relative;
      top: 0px;
      margin-left: 110px;
  }
  .first {
      display: inline-block;
      width: 390px;
  }
  .percent-mv {
      display: inline-block;
      width: 260px;
      height: 140px;
      margin-right: 5px;
      margin-top: -5px;
  }
  .new-image {
    border: 1px solid #9d9795;
  }
  .decoration2 {
      position: relative;
      top: -50px;
      left: 5px;
      color: #fff;
      font-size: 14px;
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
</style>
