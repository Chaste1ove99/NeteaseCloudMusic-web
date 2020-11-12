<template>
    <div class="rank-container">
      <div class="official-container">
      <div class="head">云音乐官方榜</div>
  <div><div class="percent-rank" v-for="(item, index) in officialList" :key='index'>
    <div class="cover">
                <el-image
      style="width:150px; height: 150px"
      :src="item.coverImgUrl"
      fit="fill"></el-image><div class="decoration">每日更新</div></div>
      <div class="detail">
      <div class="top3">1.{{item.top1.name}} - {{item.top1.ar[0].name}}</div>
     <div class="top3">2.{{item.top2.name}} - {{item.top2.ar[0].name}}</div>
     <div class="top3">3.{{item.top3.name}} - {{item.top3.ar[0].name}}</div>
      </div>
      </div></div>
        </div>
        <div class="global-container"></div>
         <div class="head">全球榜</div>
          <div><div class="global-rank" v-for="(item, index) in globalList" :key='index'>
    <div class="cover">
                <el-image
      style="width:195px; height: 195px"
      :src="item.coverImgUrl"
      fit="fill"></el-image><div>{{item.name}}</div></div>
      </div></div>
        </div>
</template>
<script>
import { getTopList } from '@/api/get.js'
import { getListDetail } from '@/api/songlist.js'
export default {
  name: 'rankIndex',
  data () {
    return {
      officialList: [],
      globalList: [],
      list1: { coverImgUrl: '', name: '', top1: '', top2: '', top3: '', index: 0 },
      topList: [],
      playlist1: {},
      list2: { coverImgUrl: '', name: '', index: 0 },
      playlist2: {}
    }
  },
  created () {
    getTopList().then(res => {
      this.topList = res.data.list
      // 异步请求 ！！！！！！！
      // 当异步请求嵌套异步请求的时候 存在的时间差非常明显
      // 会导致页面获取数据的进度 与代码逻辑不符
      // 赋值的时候尽量选择 已经接收到的变量
      // 确保当你赋值给所需变量时
      // 这些值都是可用 不为空的
      for (let i = 0; i < 4; i++) {
        // 因为异步请求的速度不受开发者控制
        // 所以产生的结果顺序也有所偏差
        // 遍历的时候重新设置index 进行正确排序
        getListDetail(this.topList[i].id).then(res => {
          this.playlist1 = res.data.playlist
          this.list1.coverImgUrl = this.topList[i].coverImgUrl
          this.list1.name = this.topList[i].name
          this.list1.top1 = this.playlist1.tracks[0]
          this.list1.top2 = this.playlist1.tracks[1]
          this.list1.top3 = this.playlist1.tracks[2]
          this.list1.index = i
          this.playlist1 = {}
          this.officialList.push(this.list1)
          // 重新排序 确保加载顺序正确
          this.officialList.sort(this.compare('index'))
          this.list1 = { coverImgUrl: '', name: '', top1: '', top2: '', top3: '', index: 0 }
        })
      }
      for (let i = 4; i < this.topList.length; i++) {
        getListDetail(this.topList[i].id).then(res => {
          this.playlist2 = res.data.playlist
          this.list2.coverImgUrl = this.topList[i].coverImgUrl
          this.list2.name = this.topList[i].name
          this.list2.index = i
          this.playlist2 = {}
          this.globalList.push(this.list2)
          // 重新排序 确保加载顺序正确
          this.globalList.sort(this.compare('index'))
          this.list2 = { coverImgUrl: '', name: '', top1: '', top2: '', top3: '', index: 0 }
        })
      }
    })
  },
  methods: {
    compare (property) {
      return function (a, b) {
        var value1 = a[property]
        var value2 = b[property]
        return value1 - value2
      }
    }
  }
}
</script>
<style scoped>
.rank-container {
  margin-left: 10px;
  width: 1100px;
  margin-bottom: 10%;
}
.head {
  padding-left:20px;
  margin-left:3px;
  margin-bottom: 20px;
}
.percent-rank{
  padding-left: 15px;
  padding-right: 15px;
  display: inline-block;
  width: 450px;
}
.detail {
  display: inline-block;
  position: relative;
  top: -60px;
}
.cover {
  display: inline-block;
  margin-right: 10px;
}
.top3 {
  padding: 5px;
  color:#7d7371;
}
.decoration {
    position: relative;
    top: -40px;
    left: 15px;
    color: #fff;
    font-size: 14px;
}
.global-rank {
  display: inline-block;
  width: 200px;
  padding-left: 10px;
}
</style>
