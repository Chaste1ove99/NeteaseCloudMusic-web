<template>
    <div class='songlist'>
      <div class="header">
        <div class="demo-image">
    <el-image
      style="width: 220px; border-radius:8px"
      :src="listdetails.coverImgUrl"
      fit="fill"></el-image>
      <div class="demo-datails">
        <div class="title"><div class="label">歌单</div>{{listdetails.name}}</div>
        <div class="creator">
          <div class="demo-image">
    <el-image
    class="creator-img"
      style="width: 30px; height: 30px;border-radius:15px"
      :src="listdetails.creator.avatarUrl"
      fit="fill"></el-image><div class="creator-name">{{listdetails.creator.nickname}}  {{localTime}} 创建</div>
</div></div>
<div class="btn"><el-row>
  <el-button icon="el-icon-caret-right" @click='playall' round>播放全部</el-button>
  <el-button icon="el-icon-folder-add"   round size="small">收藏</el-button>
  <el-button round icon='el-icon-top' size="small">分享</el-button>
  <el-button round  icon='el-icon-bottom' size="small">下载全部</el-button>
</el-row></div>
<div class="list-label">标 签: <div class='tag' v-for="(tag, index) in listdetails.tags" :key="index">{{tag}} </div></div>
<div class="list-play">歌 曲: <div class="count">{{listdetails.trackCount}}</div> <div class="list-play"> 播放数: <div class="count">{{listdetails.playCount}}</div></div></div>
<div class="list-intro">简 介: <div class="intro ab" ref="desk">{{listdetails.description}}</div>
<el-row class="down-btn">
  <el-button circle :icon="elIcon" class="down-icon" size="mini" @click="open" :autofocus='true'></el-button></el-row></div>
  <div class="main-list">
    <el-menu :default-active.sync="activeIndex" class="el-menu-demo menu" mode="horizontal" @select="handleSelect">
  <el-menu-item index="1" class="top-bar" @click="toggletoList">歌曲列表</el-menu-item>
<el-menu-item index="2" class="top-bar" @click="toggletoComment">评论</el-menu-item>
<el-menu-item index="3" class="top-bar" @click='toggletoCollect'>最近的收藏者</el-menu-item>
</el-menu>
<div class="tabs" ref="song-desk">
  <div class="songtabs">
    <div class="head-bar"><span></span></div>
    <div class="song-bar"><span class="bar-title">歌曲名称</span></div>
    <div class="singer-bar"><span class="bar-title">歌手</span></div>
    <div class="alb-bar"><span class="bar-title">专辑</span></div>
  </div>
  <div class="songblocks">
    <div v-for="(item, index) in listdetails.tracks" :key='index' class="song-border" @dblclick="playSong(item)">
      <span class="head-bar">{{index+1}}</span>
      <div class="song-bar">{{item.name}}</div>
    <div class="singer-bar">{{item.ar[0].name}}</div>
    <div class="alb-bar">{{item.al.name}}</div></div>
  </div>
</div>
<div class="comment-tab none" ref="comment-desk">
  <div class="text">
    <el-tiptap
      v-model="content"
      :extensions="extensions"
      placeholder="留下你的评论 …"
    />
    <el-button class='comt-btn' round>评论</el-button>
  </div>
  <div class="comment-block">
    <div class="hot-comt" v-if='hotcomment'>
      <div class="hot-title" v-if='hotcomment'>精彩评论</div>
      <div v-for="(item,index) in hotcomment" :key="index" class="comt-block">
        <el-image class="comter-img" :src='item.user.avatarUrl' fit='fit'></el-image>
        <div class="comter-detail">
        <div class="comter-name">{{item.user.nickname}}: <span class="comter-cont">{{item.content}}</span></div>
        <div class="comter-time">{{item.time}}</div>
        </div>
      </div>
    </div>
    <div class="comt">最近评论({{Sum}})</div>
    <div v-for="(item,index) in comment" :key="index" class="comt-block">
        <el-image class="comter-img" :src='item.user.avatarUrl' fit='fit'></el-image>
        <div class="comter-detail">
        <div class="comter-name">{{item.user.nickname}}: <span class="comter-cont">{{item.content}}</span></div>
        <div class="comter-time">{{item.time}}</div>
        </div>
      </div>
      <el-pagination
  class="page"
  page-size=20
  @current-change='changePage'
  :current-page.sync="currentPage"
  :total="Sum">
</el-pagination>
  </div>
  </div>
<div class="collect-tab none" ref="collect-desk">
  <div>
    <div v-for="(item, index) in listdetails.subscribers" :key="index" class="sub-container">
      <el-image
      class="suber-img"
      :src="item.avatarUrl"
      fit="fill"></el-image>
      <div class="suber-detail">
        <div class="suber-name">{{item.nickname}}</div>
        <div class="suber-siganature">{{item.signature}}</div>
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
import { getListDetail, getListComment } from '@/api/songlist.js'
import axios from 'axios'
import { Doc, Text, Paragraph, Heading, Bold, Underline, Italic, Strike, ListItem, BulletList, OrderedList } from 'element-tiptap'
export default {
  name: 'likeListIndex',
  data () {
    return {
      listID: 0,
      listdetails: {},
      description: '',
      elIcon: 'el-icon-arrow-down',
      activeName: 'first',
      localTime: 0,
      userID: 0,
      ids: [],
      activeIndex: '1',
      extensions: [
        new Doc(),
        new Text(),
        new Paragraph(),
        new Heading({ level: 5 }),
        new Bold({ bubble: true }), // 在气泡菜单中渲染菜单按钮
        new Underline({ bubble: true, menubar: false }), // 在气泡菜单而不在菜单栏中渲染菜单按钮
        new Italic(),
        new Strike(),
        new ListItem(),
        new BulletList(),
        new OrderedList()
      ],
      content: '',
      comment: [],
      hotcomment: [],
      Sum: 0,
      currentPage: 1
    }
  },
  created () {
    const timestamp = Date.parse(new Date())
    if (this.$route.query.id) {
      // console.log(this.$route.query.id)
      getListDetail(this.$route.query.id, timestamp).then(res => {
        console.log(res)
        this.listdetails = res.data.playlist
        // console.log(res)
        // 没做付费的那个判断
        // console.log(this.listdetails.description)
        // this.description = this.listdetails.description.replace(/\n/g, '<br />')
        this.userID = localStorage.getItem('userID')
        for (let i = 0; i < res.data.playlist.trackIds.length; i++) {
          this.ids[i] = res.data.playlist.trackIds[i].id
        }
        this.idString = this.ids.join(',')
        axios.get('http://localhost:3000/song/detail', {
          params: {
            ids: this.idString
          }
        }).then(res1 => {
          // console.log(res1)
          this.songs = res1.data.songs
          for (let i = 0; i < this.songs.length; i++) {
            this.songs[i].order = i
          }
        })
        // 获取歌单评论
        getListComment(this.$route.query.id, 0, timestamp).then(res => {
          // console.log(res)
          this.Sum = res.data.total
          this.comments = res.data.comments
          this.hotcomment = res.data.hotComments
        })
        // 转化作者时间戳
        this.getLocalCreateTime(this.listdetails.createTime)
        for (let i = 0; i < this.listdetails.tracks.length; i++) {
          this.listdetails.tracks[i].order = i
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
    // 转化作者时间戳
    getLocalCreateTime (nS) {
      var date = new Date(nS)
      var Y = date.getFullYear() + '-'
      var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
      var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' '
      var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
      var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
      var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds())
      var strDate = Y + M + D + h + m + s
      this.localTime = strDate.slice(0, 10)
    },
    // 转化评论时间戳
    getLocalCommentTime (nS) {
      var date = new Date(nS)
      var Y = date.getFullYear() + '-'
      var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
      var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' '
      var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
      var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
      var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds())
      var strDate = Y + M + D + h + m + s
      return strDate.slice(0, 10)
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
    },
    // 评论翻页功能
    changePage (page) {
      const pageNum = page - 1
      getListComment(this.$store.state.ListID, pageNum).then(res => {
        // console.log(res)
        this.Sum = res.data.total
        this.comment = []
        this.hotcomment = []
        this.comment = res.data.comments
        this.hotcomment = res.data.hotComments
        // 转化评论时间戳问题
        // 这里热评放下面的原因是 当热评不存在的时候会中断下面的进程
        for (let i = 0; i < this.comment.length; i++) {
          this.comment[i].time = this.getLocalCommentTime(this.comment[i].time)
        }
        for (let i = 0; i < this.hotcomment.length; i++) {
          this.hotcomment[i].time = this.getLocalCommentTime(this.hotcomment[i].time)
        }
      })
    },
    playall () {
      this.$store.commit('intoplaying', this.songs[0])
      this.$store.commit('publishList', this.songs)
    },
    // 双击获取音乐url并且播放功能
    playSong (item) {
      if (this.playing === null) {
        this.$store.commit('intoplaying', item)
        // 为了防止刷新后丢失的情况 这里将最后一次的数据存到本地储存中
        // 当页面刷新后保证上次播放的音乐不丢失
        window.localStorage.setItem('intoPlaying', JSON.stringify(item))
        // 应该把歌单传到footer组件中
        this.$store.commit('publishList', this.listdetails.tracks)
      } else if (item.id === this.playing.id) {
        return false
      } else {
        // 本地储存只能储存JSON字符串
        // 否则对象只显示obj obj
        // 必须先把对象转化才能储存
        // window.localStorage.setItem('intoPlaying', JSON.stringify(this.intoPlaying))
        // 同一页面监听本地储存变化
        // 必要要定义新的本地储存方式
        // 这里使用vuex监听
        for (let i = 0; i < this.listdetails.tracks; i++) {
          this.listdetails.tracks[i].index = i
        }
        this.$store.commit('intoplaying', item)
        // 为了防止刷新后丢失的情况 这里将最后一次的数据存到本地储存中
        // 当页面刷新后保证上次播放的音乐不丢失
        window.localStorage.setItem('intoPlaying', JSON.stringify(item))
        // 应该把歌单传到footer组件中
        this.$store.commit('publishList', this.listdetails.tracks)
      }
    }
  },
  computed: {
    playing: function () {
      return this.$store.state.playing
    }
  }
}
</script>
<style scoped>
  .songlist {
    margin-left: 40px;
    width: 800px;
  }
  .demo-datails {
    display: inline-block;
    margin-left: 15px;
    vertical-align: top;
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
    overflow: hidden;
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
  .tabs {
    font-size: 14px;
    margin-bottom: 20%;
  }
  .song-bar {
    display: inline-block;
    width: 250px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: middle;
  }
  .alb-bar {
    display: inline-block;
    width: 250px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: middle;
  }
  .singer-bar {
    display: inline-block;
    width: 200px;
    position: relative;
    top: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: middle;
  }
  .head-bar {
    display: inline-block;
    width: 40px;
    text-align: center;
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
    width: 200px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  .hot-comt {
    margin-top: 60px;
    width: 800px;
  }
  .comt-btn {
    float: right;
    margin-top: 10px;
  }
  .comter-img {
    height: 50px;
    width: 50px;
    border-radius: 25px;
    display: inline-block;
  }
  .comter-detail {
    display: inline-block;
    width: 700px;
    height: 100%;
    margin-left: 20px;
    vertical-align: top;
  }
  .comt-block {
    margin-top: 30px;
  }
  .comter-time {
    color: #b2adab;
    font-size: 10px;
  }
  .comter-name {
    color: #409EFF;
    font-size: 14px;
  }
  .comter-cont {
    color: black;
  }
  .comt {
    margin-top: 30px;
  }
  .comment-block {
    margin-bottom: 20%;
  }
</style>
