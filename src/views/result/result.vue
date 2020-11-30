<template>
    <div class="result-container">
        <div class="top_wrap">
          <span class="query_desc">{{$route.query.query}}</span>
          <span class="query_num">找到了{{desc}}</span>
        </div>
        <div class="menu_bar">
          <el-menu :default-active="activeIndex" class="result-menu" mode="horizontal">
  <el-menu-item class="item" index="1" @click="getsong">单曲</el-menu-item>
   <el-menu-item class="item" index="2" @click="getAlbum">专辑</el-menu-item>
   <el-menu-item class="item" index="3" @click="getSinger">歌手</el-menu-item>
   <el-menu-item class="item" index="4" @click="getMV">视频</el-menu-item>
   <el-menu-item class="item" index="5" @click="getList">歌单</el-menu-item>
   <el-menu-item class="item" index="6" @click="getLyrics">歌词</el-menu-item>
   <el-menu-item class="item" index="7" @click="getChannel">主播电台</el-menu-item>
   <el-menu-item class="item" index="8" @click="getUser">用户</el-menu-item>
</el-menu>
        </div>
        <div class="router">
          <router-view @Count='Count'></router-view>
        </div>
    </div>
</template>
<script>
import { searchResult } from '@/api/get.js'
export default {
  name: 'ResultIndex',
  data () {
    return {
      desc: '',
      activeIndex: '1',
      songCount: 0
    }
  },
  methods: {
    getsong () {
      this.activeIndex = 1
      this.$router.push('/app/result/song?query=' + this.$route.query.query)
    },
    getAlbum () {
      this.activeIndex = 2
      this.$router.push('/app/result/album?query=' + this.$route.query.query)
    },
    getSinger () {
      this.activeIndex = 3
      this.$router.push('/app/result/singer?query=' + this.$route.query.query)
    },
    getMV () {
      this.activeIndex = 4
      this.$router.push('/app/result/mv?query=' + this.$route.query.query)
    },
    getList () {
      this.activeIndex = 5
      this.$router.push('/app/result/list?query=' + this.$route.query.query)
    },
    getLyrics () {
      this.activeIndex = 6
      this.$router.push('/app/result/lyrics?query=' + this.$route.query.query)
    },
    getChannel () {
      this.activeIndex = 7
      this.$router.push('/app/result/channel?query=' + this.$route.query.query)
    },
    getUser () {
      this.activeIndex = 8
      this.$router.push('/app/result/user?query=' + this.$route.query.query)
    },
    Count (data) {
      if (this.activeIndex === 1) {
        this.desc = data.toString() + '首单曲'
      }
      if (this.activeIndex === 2) {
        this.desc = data.toString() + '张专辑'
      }
      if (this.activeIndex === 3) {
        this.desc = data.toString() + '位歌手'
      }
      if (this.activeIndex === 4) {
        this.desc = data.toString() + '个视频'
      }
      if (this.activeIndex === 5) {
        this.desc = data.toString() + '个歌单'
      }
      if (this.activeIndex === 6) {
        this.desc = data.toString() + '首歌词'
      }
      if (this.activeIndex === 7) {
        this.desc = data.toString() + '个电台'
      }
      if (this.activeIndex === 8) {
        this.desc = data.toString() + '位用户'
      }
    }
  },
  created () {
    searchResult(this.$route.query.query, 0, 1).then(res => {
      this.songCount = res.data.result.songCount
      this.desc = this.songCount.toString() + '首单曲'
    })
  }
}
</script>
<style lang="less" scoped>
.result-container{
  padding: 10px;
  .top_wrap{
    .query_desc{
      font-size: 24px;
      padding-right: 5px;
    }
    .query_num{
      color: #ccc;
    }
  }
  .router {
    padding: 10px;
  }
}
</style>
