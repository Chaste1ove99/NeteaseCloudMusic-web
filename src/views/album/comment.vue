<template>
    <div class="comment_container">
      <div class="text_wrap">
    <el-tiptap
      v-model='content'
      :extensions='extensions'
      placeholder="留下你的评论 …"
    ></el-tiptap>
    <el-button class='comt_btn' round>评论</el-button>
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
            <div class="comment_comt"><i class="iconfont">&#xe67e;</i></div>
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
            <div class="comment_comt"><i class="iconfont">&#xe67e;</i></div>
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
import { getAlbumComment, likeComment } from '@/api/song.js'
import { Doc, Text, Paragraph, Heading, Bold, Underline, Italic, Strike, ListItem, BulletList, OrderedList } from 'element-tiptap'
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
      hotComments: [],
      comments: []
    }
  },
  props: ['album'],
  methods: {
    handleHotLike (item, index) {
      const dom1 = document.getElementById(index)
      if (item.liked === true) {
        likeComment(this.album.id, item.commentId, 0, 3).then(res => {
          // console.log(res)
          item.liked = !item.liked
          item.likedCount = item.likedCount - 1
          dom1.innerHTML = item.likedCount
        })
      } else if (item.liked === false) {
        likeComment(this.album.id, item.commentId, 1, 3).then(res => {
          // console.log(res)
          item.liked = !item.liked
          item.likedCount = item.likedCount + 1
          dom1.innerHTML = item.likedCount
        })
      }
    },
    handleLateLike (item, index) {
      const dom2 = document.getElementById(index + 100)
      if (item.liked === true) {
        likeComment(this.album.id, item.commentId, 0, 3).then(res => {
          // console.log(res)
          item.liked = !item.liked
          item.likedCount = item.likedCount - 1
          dom2.innerHTML = item.likedCount
        })
      } else if (item.liked === false) {
        likeComment(this.album.id, item.commentId, 1, 3).then(res => {
          // console.log(res)
          item.liked = !item.liked
          item.likedCount = item.likedCount + 1
          dom2.innerHTML = item.likedCount
        })
      }
    },
    changePage (e) {
      getAlbumComment(this.$route.query.id, e - 1).then(res => {
        // console.log(res)
        this.hotComments = res.data.hotComments
        this.comments = res.data.comments
        window.scrollTo(0, 600)
      })
    }
  },
  created () {
    getAlbumComment(this.$route.query.id, 0).then(res => {
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
    padding: 20px;
    .Comment_block{
      padding: 20px;
      padding-left: 0;
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
        padding-left: 60px;
        width: 600px;
        display: inline-block;
        vertical-align: top;
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
          }
        }
      }
    }
  }
  .lateComment_wrap{
    padding: 20px;
      .lateComment_block{
      padding: 20px;
      font-size: 12px;
      padding-left: 0;
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
        padding-left: 60px;
        width: 600px;
        display: inline-block;
        vertical-align: top;
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
