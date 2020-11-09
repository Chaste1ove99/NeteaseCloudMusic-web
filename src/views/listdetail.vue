<template>
    <div class='songlist'>
      <div class="header">
        <div class="demo-image">
    <el-image
      style="width: 220px; border-radius:8px"
      :src="listdetails.coverImgUrl"
      fit="fit"></el-image>
      <div class="demo-datails">
        <div class="title"><div class="label">歌单</div>{{listdetails.name}}</div>
        <div class="creator"><div class="demo-image">
    <el-image
    class="creator-img"
      style="width: 30px; height: 30px;border-radius:15px"
      :src="listdetails.creator.avatarUrl"
      fit="fit"></el-image><div class="creator-name">{{listdetails.creator.nickname}}  {{localTime}} 创建</div>
</div></div>
<div class="btn"><el-row>
  <el-button icon="el-icon-caret-right" round>播放全部</el-button>
  <el-button icon="el-icon-folder-add"   round size="small">收藏</el-button>
  <el-button round icon='el-icon-top' size="small">分享</el-button>
  <el-button round  icon='el-icon-bottom' size="small">下载全部</el-button>
</el-row></div>
<div class="list-label">标 签: <div class='tag' v-for="(tag, index) in listdetails.tags" :key="index">{{tag}} </div></div>
<div class="list-play">歌 曲: <div class="count">{{listdetails.trackCount}}</div> <div class="list-play"> 播放数: <div class="count">{{listdetails.playCount}}</div></div></div>
<div class="list-intro">简 介: <div class="intro ab" ref="desk">{{listdetails.description}}</div><el-row class="down-btn">
  <el-button circle :icon="elIcon" class="down-icon" size="mini" @click="open" :autofocus='true'></el-button></el-row></div>
  <div class="main-list">
    <el-menu :default-active.sync="activeIndex" class="el-menu-demo menu" mode="horizontal" @select="handleSelect">
  <el-menu-item index="1" class="top-bar" @click="toggletoList">歌曲列表</el-menu-item>
<el-menu-item index="2" class="top-bar" @click="toggletoComment">评论</el-menu-item>
<el-menu-item index="3" class="top-bar" @click='toggletoCollect'>最近的收藏者</el-menu-item>
<div class="search-bar">
<el-autocomplete
  v-model="state"
  :fetch-suggestions="querySearchAsync"
  placeholder="在当前歌单内搜索"
  @select="handleSelect"
></el-autocomplete><el-button icon="el-icon-search" circle></el-button></div>
</el-menu>
<div class="tabs" ref="song-desk">
  <div class="songtabs">
    <div class="head-bar"><span></span></div>
    <div class="dwl-bar"><span></span></div>
    <div class="dwl-bar"><span></span></div>
    <div class="song-bar"><span class="bar-title">歌曲名称</span></div>
    <div class="singer-bar"><span class="bar-title">歌手</span></div>
    <div class="alb-bar"><span class="bar-title">专辑</span></div>
  </div>
  <div class="songblocks">
    <div v-for="(item, index) in tracks" :key='index' class="song-border">
      <span class="head-bar">{{item.head}}</span>
      <span class="dwl-bar"><i class="el-icon-download"/></span>
      <span class="dwl-bar" @click="togger(item.id,item.like)"><i v-if="item.like" class="el-icon-star-on"/><i v-else class="el-icon-star-off"></i></span>
      <span class="song-bar">{{item.name}}</span>
    <span class="singer-bar">{{item.singer}}</span>
    <span class="alb-bar">{{item.albums}}</span></div>
  </div>
</div>
<div class="comment-tab none" ref="comment-desk">123</div>
<div class="collect-tab none" ref="collect-desk">
  <div>
    <div v-for="(item, index) in listdetails.subscribers" :key="index" class="sub-container">
      <el-image
      class="suber-img"
      :src="item.avatarUrl"
      fit="fit"></el-image>
      <div class="suber-detail">
        <div class="suber-name">{{item.nickname}}</div>
        <div class="suber-siganature">{{item.signature.slice(0,15)}}<span v-if="item.signature">...</span></div>
        </div>
    </div>
  </div>
</div>
  </div>
      </div>
</div>
</div>
    </div>
</template>
<script>
import { getListDetail } from '@/api/songlist.js'
import { getlikelist, toggerlike } from '@/api/user.js'
import { getSongDetail } from '@/api/song.js'
export default {
  name: 'ListDetailIndex',
  data () {
    return {
      listdetails: {},
      description: '',
      elIcon: 'el-icon-arrow-down',
      activeName: 'first',
      song: { name: '', albums: '', singer: '', time: '', head: '', like: false, id: 0 },
      tracks: [],
      localTime: 0,
      userID: 0,
      ids: [],
      activeIndex: '1'
    }
  },
  created () {
    if (this.$route.query.id) {
      // console.log(this.$route.query.id)
      getListDetail(this.$route.query.id).then(res => {
        // 没做付费的那个判断
        this.listdetails = res.data.playlist
        // console.log(this.listdetails.description)
        // this.description = this.listdetails.description.replace(/\n/g, '<br />')
        this.userID = localStorage.getItem('userID')
        // 判断是不是小红心歌曲
        getlikelist(this.userID).then(res => {
          this.ids = res.data.ids
          for (let j = 0; j < this.ids.length; j++) {
            for (let i = 0; i < this.tracks.length; i++) {
              if (this.ids[j] === this.tracks[i].id) {
                this.tracks[i].like = true
              }
            }
            // if (this.listdetails.tracks[i].id === this.ids[j]) {
            // console.log('123')
            // }
          }
          // console.log(this.ids)
        })
        this.getLocalTime(this.listdetails.createTime)
        for (let i = 0; i < this.listdetails.tracks.length; i++) {
          if (this.listdetails.tracks[i].name.length < 22) {
            this.song.name = this.listdetails.tracks[i].name
          } else {
            this.song.name = this.listdetails.tracks[i].name.slice(0, 21) + '...'
          }
          if (this.listdetails.tracks[i].al.name.length < 15) {
            this.song.albums = this.listdetails.tracks[i].al.name
          } else {
            this.song.albums = this.listdetails.tracks[i].al.name.slice(0, 14) + '...'
          }
          if (i < 9) {
            this.song.head = '0' + (i + 1)
          } else {
            this.song.head = (i + 1)
          }
          this.song.singer = this.listdetails.tracks[i].ar[0].name
          this.song.id = this.listdetails.tracks[i].id
          this.tracks.push(this.song)
          this.song = { name: '', albums: '', singer: '', time: '', head: '', like: false, id: 0 }
        }
      })
    } else {
      this.$message.error('您的页面找不到啦')
      this.$router.go(-1)
    }
  },
  methods: {
    open () {
      if (this.elIcon === 'el-icon-arrow-down') {
        this.elIcon = 'el-icon-arrow-up'
        this.$refs.desk.classList.remove('ab')
      } else {
        this.elIcon = 'el-icon-arrow-down'
        this.$refs.desk.classList.add('ab')
      }
    },
    loadsongdetail () {
      getSongDetail(this.listdetails.trackIds).then(res => {
        console.log(res)
      })
    },
    // 转化时间戳
    getLocalTime (nS) {
      var date = new Date(nS)
      var Y = date.getFullYear() + '-'
      var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
      var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' '
      var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
      var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
      var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds())
      var strDate = Y + M + D + h + m + s
      this.localTime = strDate.slice(0, 10)
      console.log(this.localTime)
    },
    // 收藏切换
    togger (id, like) {
      toggerlike(id, !like).then(res => {
        console.log(res)
      })
      for (let i = 0; i < this.tracks.length; i++) {
        if (this.tracks[i].id === id) {
          this.tracks[i].like = !this.tracks[i].like
        }
      }
    },
    // 实现中部栏的切换视图
    toggletoList () {
      this.activeIndex = '1'
      this.$refs['song-desk'].classList.remove('none')
      this.$refs['comment-desk'].classList.add('none')
      this.$refs['collect-desk'].classList.add('none')
    },
    toggletoComment () {
      this.activeIndex = '2'
      this.$refs['song-desk'].classList.add('none')
      this.$refs['comment-desk'].classList.remove('none')
      this.$refs['collect-desk'].classList.add('none')
    },
    toggletoCollect () {
      this.activeIndex = '3'
      this.$refs['song-desk'].classList.add('none')
      this.$refs['comment-desk'].classList.add('none')
      this.$refs['collect-desk'].classList.remove('none')
    }
  }
}
</script>
<style scoped>
  .songlist {
    margin-left: 40px;
  }
  .demo-datails {
    display: inline-block;
    top: 10%;
    position: absolute;
    margin-left: 15px;
  }
  .title {
    font-size: 22px;
    font-weight: bold;
  }
  .label {
    display: inline;
    font-size: 15px;
    border: 1px solid red;
    border-radius: 5px;
    color: red;
    padding: 2px 4px 2px 4px;
    margin-right: 12px;
  }
  .creator-img {
    display: inline-block;
  }
  .creator {
    margin-top: 20px;
  }
  .creator-name {
    font-size: 12px;
    display: inline;
    position: absolute;
    margin-left: 10px;
    vertical-align: top;
    margin-top: 5px;
  }
  .btn {
    margin-top: 10px;
    margin-bottom: 20px;
  }
  .list-label {
    font-size: 10px;
  }
  .tag {
    display: inline;
  }
  .list-play {
    display: inline;
    font-size: 10px;
  }
  .count {
    color: #897c7a;
    display: inline;
  }
  .intro {
    white-space:pre-wrap;
    display: inline-block;
    font-size: 10px;
    vertical-align: top;
    width: 480px;
  }
  .list-intro {
    font-size: 10px;
    display: block;
    margin-top: 4px;
  }
  .down-icon {
    border: none;
  }
  .down-btn {
    display: inline-block;
    vertical-align: top;
    float: right;
  }
  .ab {
    height: 17px;
    overflow: hidden
  }
  .main-list {
    position: absolute;
    margin-left: -235px;
    width: 800px;
  }
  .search-bar {
  float: right;
  width: 250px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0px 25px 0 0;
  }
  .tabs {
    font-size: 14px;
  }
  .song-bar {
    display: inline-block;
    width: 300px;
  }
  .alb-bar {
    display: inline-block;
  }
  .singer-bar {
    display: inline-block;
    width: 200px;
    position: relative;
    top: 0;
  }
  .head-bar {
    display: inline-block;
    width: 40px;
  }
  .song-border {
    border: 1px solid #f5eeec;
    border-left: none;
    border-right: none;
  }
  .menu {
    margin-top: 20px;
  }
  .songblocks {
    margin-bottom: 20%;
  }
  .dwl-bar {
    display: inline-block;
    width: 30px;
  }
  .bar-title {
    color: grey;
  }
  .none {
    display: none;
  }
  .block {
    display: block;
  }
  .collect-tab {
    width: 900px;
    margin-bottom: 20%;
  }
  .suber-img {
    width: 150px;
    height: 150px;
    border-radius: 75px;
  }
  .suber-detail {
    display: inline-block;
    margin-top: 20%;
    position: relative;
    top: -70px;
    margin-left: 20px;
  }
 .sub-container {
    display: inline-block;
    margin-top: 20px;
    width: 400px;
  }
  .suber-siganature {
    font-size: 12px;
    color: #b2adab;
  }
</style>
