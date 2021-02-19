<template>
    <div class='songlist'>
      <div class="header">
        <div class="demo-image">
    <el-image
      style="width: 220px; border-radius:8px"
      :src="listdetails.coverImgUrl"
      fit="fill"></el-image>
      <div class="demo-datails">
        <div class="title"><div class="label">歌单</div>{{listdetails.name}}<div class="edit_btn" @click="intoedit"><i class="el-icon-edit"></i>编辑</div></div>
        <div class="creator">
          <div class="demo-image">
    <el-image
    class="creator-img"
    @click="intouser"
      style="width: 30px; height: 30px;border-radius:15px"
      :src="listdetails.creator.avatarUrl"
      fit="fill"></el-image><div class="creator-name">{{listdetails.creator.nickname}}  {{localTime}} 创建</div>
</div></div>
<div class="btn"><el-row>
  <el-button icon="el-icon-caret-right" round @click='playall'>播放全部</el-button>
  <el-button icon="el-icon-folder-add"   round size="small">收藏</el-button>
  <el-button round icon='el-icon-top' size="small">分享</el-button>
  <el-button round  icon='el-icon-bottom' size="small" @click="download">下载全部</el-button>
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
</el-menu>
<div class="tabs" ref="song-desk" v-loading='loading'>
  <div class="songtabs">
    <div class="head-bar"><span></span></div>
    <div class="song-bar" style="padding-right: 25px"><span class="bar-title">歌曲名称</span></div>
    <div class="singer-bar"><span class="bar-title">歌手</span></div>
    <div class="alb-bar"><span class="bar-title">专辑</span></div>
  </div>
  <div class="songblocks" v-if="songs.length>0">
    <div v-for="(item, index) in songs" :key='index' class="song-border" @dblclick="playSong(item)">
      <span class="head-bar">{{index+1}}</span>
      <div class="song-bar">{{item.name}}</div>
        <div class="menu_bar" @click.stop="addtolist(item)"><i class="el-icon-plus"></i>
        </div>
    <div class="singer-bar">{{item.ar[0].name}}</div>
    <div class="alb-bar">{{item.al.name}}</div>
        </div>
  </div>
  <div v-else class="nosong_block">快去添加第一首歌曲吧~</div>
</div>
<div class="comment-tab none" ref="comment-desk">
          <div class="comment_input"><el-input
  type="textarea"
  :rows="4"
  placeholder="留下你的评论..."
  v-model="content">
</el-input><div class="comment_btn" @click="sendComment">评论</div>
</div>
<div class="hot_comment" v-if="hotcomment.length">
  <div class="comment_title">最热评论</div>
  <div class="comment_wrap" v-for="(item, index) in hotcomment" :key="index">
          <div class="Comment_icon">
        <el-image
        class="Comment_img"
      style="width: 50px; height: 50px"
      :src="item.user.avatarUrl"
      fit="cover"></el-image></div>
      <div class="Comment_detail">
        <div class="Comment_content"><a>{{item.user.nickname}}: </a><span>{{item.content}}</span></div>
        <div class="Comment_reply" v-if="item.beReplied.length > 0"><a>@{{item.beReplied[0].user.nickname}}: </a><span>{{item.beReplied[0].content}}</span></div>
          <div class="Comment_menu"><div class="comment_time">{{(new Date(item.time)).format("yyyy年MM月dd日 hh:mm")}}</div>
          <div class="comment_tool">
            <div class="comment_like" :class="[item.liked?'liked':'']"><i class="iconfont" style="font-size: 22px" @click="handleHotLike(item,index)">&#xe775;</i>
            <span class="like_count" :id="index">{{item.likedCount}}</span></div>
            <div class="comment_share"><i class="iconfont">&#xe600;</i></div>
            <div class="comment_comt" @click="replyComment(item)"><i class="iconfont">&#xe67e;</i></div>
          </div>
          </div>
      </div>
  </div>
</div>
  <div class="lateComment_wrap">
    <span style="font-weight: bold">最近评论</span>
        <div v-for="(item,index) in comments" :key="index" class="lateComment_block">
      <div class="lateComment_icon">
        <el-image
        class="lateComment_img"
      style="width: 50px; height: 50px"
      :src="item.user.avatarUrl"
      fit="cover"></el-image></div>
      <div class="lateComment_detail">
        <div class="lateComment_content"><a>{{item.user.nickname}}: </a><span>{{item.content}}</span></div>
        <div class="lateComment_reply" v-if="item.beReplied.length > 0"><a>@{{item.beReplied[0].user.nickname}}: </a><span>{{item.beReplied[0].content}}</span></div>
          <div class="lateComment_menu">
            <div class="comment_time">{{(new Date(item.time)).format("yyyy年MM月dd日 hh:mm")}}</div>
            <div class="comment_tool">
              <div class="comment_like" :class="[item.liked?'liked':'']"><i class="iconfont" style="font-size: 22px" @click="handleLateLike(item,index)">&#xe775;</i>
              <span class="like_count" :id="100+index">{{item.likedCount}}</span></div>
            <div class="comment_share"><i class="iconfont">&#xe600;</i></div>
            <div class="comment_comt" @click="replyComment(item)"><i class="iconfont">&#xe67e;</i></div>
            </div>
            </div>
      </div>
    </div>
          <el-pagination
  background
  page-size="20"
  :current-page.sync='currentPage'
  @current-change='changePage'
  :total="Sum">
</el-pagination>
  </div>
  </div>
<div class="collect-tab none" ref="collect-desk">
  <div>
    <div v-for="(item, index) in listdetails.subscribers" :key="index" class="sub-container" @click="intosubscriber(item)">
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
               <el-dialog
               v-loading='dialogloading'
  title="选择添加到的歌单"
  :visible.sync="visible"
  width="500px">
  <div v-for="(item,index) in userlist" :key="index" class="list_wrap" @click="selectlist(item,index)" :id='index'>
     <el-image
     class="list_image"
      style="width: 60px; height: 60px"
      :src="item.coverImgUrl"
      fit="cover"></el-image>
      <div class="list_detail">
        <div class="list_name">{{item.name}}</div>
          <div class="list_num">{{item.trackCount}}首</div>
      </div>
  </div>
  </el-dialog>
</div>
</template>
<script>
import { userPlayList } from '@/api/user.js'
import { getListDetail, getListComment, handlesonglist } from '@/api/songlist.js'
import { likeComment, handleComment, getallsongs } from '@/api/song.js'
export default {
  name: 'ListDetailIndex',
  data () {
    return {
      listdetails: {},
      description: '',
      elIcon: 'el-icon-arrow-down',
      activeName: 'first',
      localTime: 0,
      userID: 0,
      ids: [],
      activeIndex: '1',
      content: '',
      comments: [],
      hotcomment: [],
      Sum: 0,
      currentPage: 1,
      songs: [],
      replyCode: 0,
      commentId: 0,
      loading: false,
      visible: false,
      userlist: [],
      addsong: {},
      dialogloading: true
    }
  },
  created () {
    const timestamp = Date.parse(new Date())
    this.loading = true
    if (this.$route.query.id) {
      // console.log(this.$route.query.id)
      getListDetail(this.$route.query.id).then(res => {
        this.listdetails = res.data.playlist
        for (let i = 0; i < res.data.playlist.trackIds.length; i++) {
          this.ids[i] = res.data.playlist.trackIds[i].id
        }
        // async 函数需要在外部定义this
        const idString = this.ids.join(',')
        const _this = this
        async function getlist () {
          const result = await getallsongs(idString)
          console.log(result.data.songs)
          _this.songs = result.data.songs
          for (let i = 0; i < _this.songs.length; i++) {
            _this.songs[i].order = i
          }
          _this.loading = false
        }
        if (this.ids.length === 0) {
          this.songs = []
          this.loading = false
        } else {
          getlist()
        }
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
    // 进入编辑页面
    intoedit () {
      this.$router.push('/app/listedit?id=' + this.$route.query.id)
    },
    selectlist (item, index) {
      const timestamp = Date.parse(new Date())
      handlesonglist('add', item.id, this.addsong.id, timestamp).then(res => {
        console.log(res)
        this.visible = false
        if (res.data.body.code === 502) {
          this.$message({
            type: 'warning',
            message: '歌单内已经有这首歌了哦'
          })
        } else {
          this.$message('添加成功')
        }
      })
    },
    addtolist (item) {
      const timestamp = Date.parse(new Date())
      this.visible = true
      this.addsong = item
      userPlayList(localStorage.getItem('userID'), 0, timestamp).then(res => {
        this.userlist = res.data.playlist
        this.dialogloading = false
      })
    },
    download () {
      this.$message('请到官方客户端下载哦~')
    },
    playall () {
      this.$store.commit('intoplaying', this.songs[0])
      this.$store.commit('publishList', this.songs)
    },
    getcomment () {
      const timestamp = Date.parse(new Date())
      getListComment(this.$route.query.id, 0, timestamp).then(res => {
        this.Sum = res.data.total
        this.comments = res.data.comments
        this.hotcomment = res.data.hotComments
      })
    },
    open () {
      if (this.elIcon === 'el-icon-arrow-down') {
        this.elIcon = 'el-icon-arrow-up'
        this.$refs.desk.classList.remove('ab')
      } else {
        this.elIcon = 'el-icon-arrow-down'
        this.$refs.desk.classList.add('ab')
      }
    },
    intouser () {
      this.$router.push('/app/subscriber?id=' + this.listdetails.creator.userId)
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
      getListComment(this.$route.query.id, pageNum).then(res => {
        console.log(res)
        this.Sum = res.data.total
        this.comments = res.data.comments
        this.hotcomment = []
        // this.hotcomment = res.data.hotComments
      })
    },
    // 进入用户
    intosubscriber (item) {
      console.log(item)
      this.$router.push('/app/subscriber?id=' + item.userId)
    },
    handleHotLike (item, index) {
      const timestamp = Date.parse(new Date())
      const dom1 = document.getElementById(index)
      if (item.liked === true) {
        likeComment(this.$route.query.id, item.commentId, 0, 2, timestamp).then(res => {
          // console.log(res)
          item.liked = !item.liked
          item.likedCount = item.likedCount - 1
          dom1.innerHTML = item.likedCount
        })
      } else if (item.liked === false) {
        likeComment(this.$route.query.id, item.commentId, 1, 2, timestamp).then(res => {
          // console.log(res)
          item.liked = !item.liked
          item.likedCount = item.likedCount + 1
          dom1.innerHTML = item.likedCount
        })
      }
    },
    handleLateLike (item, index) {
      const timestamp = Date.parse(new Date())
      const dom2 = document.getElementById(index + 100)
      if (item.liked === true) {
        likeComment(this.$route.query.id, item.commentId, 0, 2, timestamp).then(res => {
          // console.log(res)
          item.liked = !item.liked
          item.likedCount = item.likedCount - 1
          dom2.innerHTML = item.likedCount
        })
      } else if (item.liked === false) {
        likeComment(this.$route.query.id, item.commentId, 1, 2, timestamp).then(res => {
          // console.log(res)
          item.liked = !item.liked
          item.likedCount = item.likedCount + 1
          dom2.innerHTML = item.likedCount
        })
      }
    },
    sendComment () {
      // 直接评论
      const timestamp = Date.parse(new Date())
      if (this.replyCode === 0) {
        handleComment(1, 2, this.$route.query.id, this.content, timestamp).then(res => {
          this.$message('评论成功')
          this.content = ''
          setTimeout(() => {
            this.getcomment()
          }, 2000
          )
        })
        // 回复别人的评论
      } else {
        // 将字符串拆开
        const content = this.content.split('')
        const index = content.findIndex(v => v === ':')
        const newContent = this.content.slice(index + 1, content.length)
        handleComment(2, 2, this.$route.query.id, newContent, this.commentId, timestamp).then(res => {
          // console.log(res)
          this.$message('回复成功')
          this.replyCode = 0
          this.content = ''
          setTimeout(() => {
            this.getcomment()
          }, 2000
          )
        })
      }
    },
    // 回复评论
    replyComment (item) {
      window.scrollTo(0, 300)
      this.content = '回复' + item.user.nickname + ':'
      this.replyCode = 1
      this.commentId = item.commentId
      // console.log(this.commentId)
    },
    // 双击获取音乐url并且播放功能
    playSong (item) {
      // 第一次播放
      if (this.playing === null) {
        this.$store.commit('intoplaying', item)
        // 为了防止刷新后丢失的情况 这里将最后一次的数据存到本地储存中
        // 当页面刷新后保证上次播放的音乐不丢失
        window.localStorage.setItem('intoPlaying', JSON.stringify(item))
        // 应该把歌单传到footer组件中
        this.$store.commit('publishList', this.songs)
      } else if (item.id === this.playing.id) {
        return false
      } else {
        // console.log(item)
        // 本地储存只能储存JSON字符串
        // 否则对象只显示obj obj
        // 必须先把对象转化才能储存
        // window.localStorage.setItem('intoPlaying', JSON.stringify(this.intoPlaying))
        // 同一页面监听本地储存变化
        // 必要要定义新的本地储存方式
        // 这里使用vuex监听
        this.$store.commit('intoplaying', item)
        // 为了防止刷新后丢失的情况 这里将最后一次的数据存到本地储存中
        // 当页面刷新后保证上次播放的音乐不丢失
        window.localStorage.setItem('intoPlaying', JSON.stringify(item))
        // 应该把歌单传到footer组件中
        this.$store.commit('publishList', this.songs)
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
<style lang="less" scoped>
    .comment_input{
      padding-top: 15px;
    }
    .comment_btn{
      padding: 5px;
      padding-left: 20px;
      padding-right: 20px;
      border-radius: 20px;
      border: 1px solid #ccc;
      position: absolute;
      right: 0;
      margin-top: 5px;
      font-size: 14px;
    }
    .comment_btn:hover{
      cursor: pointer;
      opacity: 65%;
    }
.red{
  color:red;
}
.liked{
  color:red
}
  .songlist {
    margin-left: 40px;
    width: 800px;
    margin-bottom: 20%;
  }
  .demo-datails {
    display: inline-block;
    margin-left: 15px;
    vertical-align: top;
  }
  .title {
    font-size: 22px;
    font-weight: bold;
    width: 400px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .label {
    display: inline-block;
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
  .creator-name:hover{
    cursor: pointer;
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
    width: 225px;
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
  .menu_bar{
    display: inline-block;
    width: 25px;
    vertical-align: middle;
    top: 0;
    visibility: hidden;
  }
  .head-bar {
    display: inline-block;
    width: 40px;
    text-align: center;
  }
  .creator-img:hover{
    cursor: pointer;
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
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    width: 200px;
  }
  .comment-tab {
    padding-bottom: 20%;
  }
   .comment_text{
    padding-top: 40px;
    position: relative;
    .comment_title{
      .title_name{
        font-size: 18px;
      }
      .title_count{
        color: #ccc;
        font-size: 12px;
        padding-left: 5px;
      }
    }
    .comment_input{
      padding-top: 15px;
    }
    .comment_btn{
      padding: 5px;
      padding-left: 20px;
      padding-right: 20px;
      border-radius: 20px;
      border: 1px solid #ccc;
      position: absolute;
      right: 0;
      margin-top: 5px;
      font-size: 14px;
    }
    .comment_btn:hover{
      cursor: pointer;
      opacity: 65%;
    }
  }
  .hot_comment{
    padding-top: 50px;
    font-size: 16px;
    .comment_wrap{
       margin: 20px;
      margin-left: 0;
      font-size: 12px;
      position: relative;
      .Comment_icon{
        padding-right: 10px;
        display: inline-block;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        .Comment_img{
          border-radius: 25px;
        }
      }
      .Comment_detail{
        padding-top: 15px;
       margin-left: 60px;
        width: 600px;
        display: inline-block;
        border-bottom: 1px solid #ccc;
        .Comment_reply{
          background-color: #ccc;
        }
        .Comment_menu{
          padding-top: 10px;
          color: #ccc;
          overflow: hidden;
          .comment_time{
            display: inline-block;
          }
          .comment_tool{
            display: inline-block;
            float: right;
            .comment_like{
              display: inline-block;
              width: 50px;
              padding: 5px;
              .like_count{
                vertical-align: mid;
              }
            }
            .comment_like:hover{
              cursor: pointer;
            }
            .comment_share{
              width: 20px;
              padding: 5px;
              display: inline-block;
            }
            .comment_comt{
              width: 20px;
              padding: 5px;
              display: inline-block;
            }
             .comment_comt:hover{
               cursor: pointer;
             }
          }
        }
      }
    }
  }
  .lateComment_wrap{
       padding-top: 50px;
    font-size: 16px;
      .lateComment_block{
      margin: 20px;
      font-size: 12px;
      margin-left: 0;
      position: relative;
      .lateComment_icon{
        padding-right: 10px;
        display: inline-block;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        .lateComment_img{
          border-radius: 25px;
        }
      }
      .lateComment_detail{
        margin-left: 60px;
        width: 600px;
        display: inline-block;
        padding-top: 15px;
        border-bottom: 1px solid #ccc;
        .lateComment_reply{
          background-color: #ccc;
        }
        .lateComment_menu{
          padding-top: 10px;
          color: #ccc;
          overflow: hidden;
          .comment_time{
            display: inline-block;
          }
          .comment_tool{
              display: inline-block;
              float: right;
            .comment_like{
              display: inline-block;
              width: 40px;
              padding: 5px;
              .like_count{
                vertical-align: mid;
              }
            }
            .comment_like:hover{
              cursor: pointer;
            }
            .comment_share{
              width: 20px;
              padding: 5px;
              display: inline-block;
            }
            .comment_comt{
              width: 20px;
              padding: 5px;
              display: inline-block;
            }
            .comment_comt:hover{
               cursor: pointer;
             }
          }
        }
      }
      }
  }
  .nosong_block {
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    color:red
  }
  .song-border:hover{
    opacity: 80%;
    cursor: pointer;
    .menu_bar{
      visibility: visible;
    }
  }
  .list_image{
  }
  .list_detail{
    display: inline-block;
    font-size: 15px;
    vertical-align: top;
    padding: 5px;
  }
  .list_name{
    text-overflow: ellipsis;
    overflow: hidden;
    width: 200px;
    white-space: nowrap;
  }
  .list_num{
    padding-top: 15px;
  }
  .list_wrap:hover{
    cursor: pointer;
    opacity: 65%;
  }
  .selected{
    background-color: red;
  }
  .edit_btn{
    display: inline-block;
    padding-left: 250px;
    font-size: 14px;
    font-weight: normal;
  }
  .edit_btn:hover{
    cursor: pointer;
  }
</style>
