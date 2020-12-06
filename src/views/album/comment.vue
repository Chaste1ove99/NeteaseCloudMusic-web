<template>
    <div class="comment_container">
      <div class="text_wrap">
<el-input
  type="textarea"
  :rows="4"
  placeholder="留下你的评论..."
  v-model="content">
</el-input>
    <el-button class='comt_btn' round @click="sendComment">评论</el-button>
  </div>
  <div class="hotComment_wrap" v-if="hotComments">
    <span  style="font-weight: bold">精彩评论</span>
    <div v-for="(item,index) in hotComments" :key="index" class="Comment_block">
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
    </div>
    <el-pagination
    class="pagination"
  background
  page-size="20"
  @current-change='changePage'
  :total="album.info.commentCount">
</el-pagination>
    </div>
</template>
<script>
import { getAlbumComment, likeComment, handleComment } from '@/api/song.js'
Date.prototype.format = function (fmt) {
  var o = {
    'M+': this.getMonth() + 1, // 月份
    'd+': this.getDate(), // 日
    'h+': this.getHours(), // 小时
    'm+': this.getMinutes(), // 分
    's+': this.getSeconds(), // 秒
    'q+': Math.floor((this.getMonth() + 3) / 3) // 季度
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
  }
  return fmt
}
export default {
  name: 'AlbumCommentIndex',
  data () {
    return {
      content: '',
      hotComments: [],
      comments: [],
      replyCode: 0,
      commentId: 0,
      timeout: null
    }
  },
  props: ['album'],
  methods: {
    // 点赞功能 注意这里由于接口原因存在BUG
    handleHotLike (item, index) {
      const timestamp = Date.parse(new Date())
      const dom1 = document.getElementById(index)
      if (item.liked === true) {
        likeComment(this.album.id, item.commentId, 0, 3, timestamp).then(res => {
          // console.log(res)
          item.liked = !item.liked
          item.likedCount = item.likedCount - 1
          dom1.innerHTML = item.likedCount
        })
      } else if (item.liked === false) {
        likeComment(this.album.id, item.commentId, 1, 3, timestamp).then(res => {
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
        likeComment(this.album.id, item.commentId, 0, 3, timestamp).then(res => {
          // console.log(res)
          item.liked = !item.liked
          item.likedCount = item.likedCount - 1
          dom2.innerHTML = item.likedCount
        })
      } else if (item.liked === false) {
        likeComment(this.album.id, item.commentId, 1, 3, timestamp).then(res => {
          // console.log(res)
          item.liked = !item.liked
          item.likedCount = item.likedCount + 1
          dom2.innerHTML = item.likedCount
        })
      }
    },
    // 翻页
    changePage (e) {
      getAlbumComment(this.$route.query.id, e - 1).then(res => {
        // console.log(res)
        // this.hotComments = res.data.hotComments
        this.hotComments = []
        this.comments = res.data.comments
        window.scrollTo(0, 600)
      })
    },
    // 发送评论
    sendComment () {
      // 直接评论
      const timestamp = Date.parse(new Date())
      if (this.replyCode === 0) {
        handleComment(1, 3, this.album.id, this.content, timestamp).then(res => {
          this.$message('评论成功')
          this.content = ''
        })
        setTimeout(() => {
          this.getComment()
        }, 2000
        )
        // 回复别人的评论
      } else {
        // 将字符串拆开
        const content = this.content.split('')
        const index = content.findIndex(v => v === ':')
        const newContent = this.content.slice(index + 1, content.length)
        handleComment(2, 3, this.album.id, newContent, this.commentId, timestamp).then(res => {
          console.log(res)
          this.$message('回复成功')
          this.replyCode = 0
          this.content = ''
        })
        setTimeout(() => {
          this.getComment()
        }, 2000
        )
      }
    },
    // 回复评论
    replyComment (item) {
      window.scrollTo(0, 200)
      this.content = '回复' + item.user.nickname + ':'
      this.replyCode = 1
      this.commentId = item.commentId
      // console.log(this.commentId)
    },
    getComment () {
      const timestamp = Date.parse(new Date())
      getAlbumComment(this.$route.query.id, 0, timestamp).then(res => {
        this.hotComments = res.data.hotComments
        this.comments = res.data.comments
      })
    }
  },
  created () {
    const timestamp = Date.parse(new Date())
    getAlbumComment(this.$route.query.id, 0, timestamp).then(res => {
      // console.log(res)
      this.hotComments = res.data.hotComments
      this.comments = res.data.comments
    })
  }
}
</script>
<style lang="less" scoped>
.comment_container{
  padding-bottom: 16%;
  .text_wrap{
    padding: 10px;
    overflow: hidden;
    .comt_btn{
      float: right;
      margin-top: 10px;
    }
  }
  .hotComment_wrap{
    margin: 20px;
    .Comment_block{
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
    margin: 20px;
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
}
.liked{
  color:red
}
.pagination{
  padding-top: 10px;
  display: flex;
  justify-content: center;
}
</style>
