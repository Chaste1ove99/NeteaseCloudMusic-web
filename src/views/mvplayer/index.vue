<template>
    <div class="mvPlayer_container">
        <div @click="goback" class="color back_wrap"><i class="iconfont">&#xe611;</i><span class="back_btn">返回</span></div>
        <div class="main_tab">
           <video :src="src" controls autoplay class="video_player"></video>
        <div class="creator_detail">
              <el-image
              class="creator_icon"
              @click="toartist"
      style="width: 50px; height: 50px"
      :src="mv.artists[0].img1v1Url"
      fit='cover'></el-image>
      <span class="creator_name" @click="toartist">{{mv.artistName}}</span>
      <!--<div class="creator_btn"><el-button v-if='mv.artists[0].followed === false' icon="el-icon-plus" class="notice_btn">关注</el-button></div>-->
        </div>
        <div class="mv_detail">
            <div class="mv_name">{{mv.name}}</div>
            <div class="mv_info"><span class="mv_publishTime">发布: {{mv.publishTime}}</span><span>播放次数: {{mv.playCount}}次</span></div>
        </div>
        <div class="mv_menu">
          <div class="mv_btn" @click="handleresource"><i class="iconfont font" :class="[liked?'red':'']">&#xe775;</i><span v-if="liked === false">赞({{likedCount}})</span>
          <span v-else>已赞({{likedCount}})</span></div>
          <div class="mv_btn"><i class="el-icon-folder-add font"></i><span>收藏({{mv.subCount}})</span></div>
          <div class="mv_btn"><i class="iconfont font">&#xe600;</i><span>分享({{shareCount}})</span></div>
        </div>
        <div class="comment_text">
          <div class="comment_title"><span class="title_name">听友评论</span><span class="title_count">(已有{{mv.commentCount}}条评论)</span></div>
          <div class="comment_input"><el-input
  type="textarea"
  :rows="4"
  placeholder="留下你的评论..."
  v-model="content">
</el-input><div class="comment_btn" @click="sendComment">评论</div>
</div>
<div class="hot_comment" v-if="hotcomment">
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
        </div>
        </div>
        <el-pagination
  background
  page-size="20"
  @current-change='changePage'
  :total="mv.commentCount">
</el-pagination>
        </div>
        <div class="aside_tab">
            <div class="related_wrap">
            <div class="related_video" v-for="(item,index) in relatedvideo" :key="index">
                  <el-image
                  @click="intorelatedmv(item)"
                  class="related_coverUrl"
      style="width: 180px; height: 90px"
      :src="item.coverUrl"
      fit="cover"></el-image>
      <div class="related_detail">
          <div class="related_name">{{item.title}}</div>
          <div class="related_creator">by <span class="related_creatorName">{{item.creator[0].userName}}</span></div>
      </div>
            </div>
            </div>
        </div>
    </div>
</template>
<script>
import { getmvdetail, getmvurl, getrelatedvideo, getdetailinfo, getmvcomment } from '@/api/mvplayer.js'
import { resourcelike } from '@/api/get.js'
import { likeComment, handleComment } from '@/api/song.js'
export default {
  name: 'MVplayerIndex',
  data () {
    return {
      mv: {},
      src: '',
      relatedvideo: [],
      likedCount: 0,
      shareCount: 0,
      liked: false,
      hotcomment: [],
      comments: [],
      content: '',
      replyCode: 0,
      commentId: 0
    }
  },
  created () {
    getmvdetail(this.$route.query.id).then(res => {
      // console.log(res)
      this.mv = res.data.data
    })
    getmvurl(this.$route.query.id).then(res => {
      // console.log(res)
      this.src = res.data.data.url
    })
    getrelatedvideo(this.$route.query.id).then(res => {
      this.relatedvideo = res.data.data
    })
    const timestamp = Date.parse(new Date())
    getdetailinfo(this.$route.query.id, timestamp).then(res => {
      this.shareCount = res.data.shareCount
      this.likedCount = res.data.likedCount
      this.liked = res.data.liked
    })
    getmvcomment(this.$route.query.id, 0, timestamp).then(res => {
      this.comments = res.data.comments
      this.hotcomment = res.data.hotComments
    })
  },
  methods: {
    handleHotLike (item, index) {
      const timestamp = Date.parse(new Date())
      const dom1 = document.getElementById(index)
      if (item.liked === true) {
        likeComment(this.$route.query.id, item.commentId, 0, 1, timestamp).then(res => {
          // console.log(res)
          item.liked = !item.liked
          item.likedCount = item.likedCount - 1
          dom1.innerHTML = item.likedCount
        })
      } else if (item.liked === false) {
        likeComment(this.$route.query.id, item.commentId, 1, 1, timestamp).then(res => {
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
        likeComment(this.$route.query.id, item.commentId, 0, 1, timestamp).then(res => {
          // console.log(res)
          item.liked = !item.liked
          item.likedCount = item.likedCount - 1
          dom2.innerHTML = item.likedCount
        })
      } else if (item.liked === false) {
        likeComment(this.$route.query.id, item.commentId, 1, 1, timestamp).then(res => {
          // console.log(res)
          item.liked = !item.liked
          item.likedCount = item.likedCount + 1
          dom2.innerHTML = item.likedCount
        })
      }
    },
    goback () {
      this.$router.go(-1)
    },
    intorelatedmv (item) {
      this.$router.push('/app/videoplayer?id=' + item.vid)
      this.$touter.go(0)
    },
    toartist () {
      this.$router.push('/app/artist/hotsong?id=' + this.mv.artists[0].id)
    },
    handleresource () {
      const timestamp = Date.parse(new Date())
      switch (this.liked) {
        case false:
          resourcelike(1, 1, this.$route.query.id, timestamp).then(res => {
            // console.log(res)
            this.liked = true
            this.likedCount = this.likedCount + 1
          })
          break
        case true:
          resourcelike(1, 0, this.$route.query.id, timestamp).then(res => {
            // console.log(res)
            this.liked = false
            this.likedCount = this.likedCount - 1
            this.$message('取消点赞成功')
          })
      }
    },
    changePage (e) {
      const timestamp = Date.parse(new Date())
      getmvcomment(this.$route.query.id, e - 1, timestamp).then(res => {
        this.comments = res.data.comments
        this.hotcomment = res.data.hotComments
      })
    },
    // 发送评论
    sendComment () {
      // 直接评论
      const timestamp = Date.parse(new Date())
      if (this.replyCode === 0) {
        handleComment(1, 1, this.$route.query.id, this.content, timestamp).then(res => {
          this.$message('评论成功')
          this.content = ''
        })
        this.$router.go(0)
        // 回复别人的评论
      } else {
        // 将字符串拆开
        const content = this.content.split('')
        const index = content.findIndex(v => v === ':')
        const newContent = this.content.slice(index + 1, content.length, timestamp)
        handleComment(2, 1, this.$route.query.id, newContent, this.commentId, timestamp).then(res => {
          console.log(res)
          this.$message('回复成功')
          this.replyCode = 0
          this.content = ''
        })
        this.$router.go(0)
      }
    },
    // 回复评论
    replyComment (item) {
      window.scrollTo(0, 300)
      this.content = '回复' + item.user.nickname + ':'
      this.replyCode = 1
      this.commentId = item.commentId
      // console.log(this.commentId)
    }
  }
}
</script>
<style lang="less" scoped>
.color{
    font-size: 30px;
}
.mvPlayer_container{
  margin: 40px;
  margin-top: 25px;
  .back_wrap{
      .back_btn{
        padding-left: 10px;
        font-size: 18px;
      }
  }
  .back_wrap:hover{
      cursor: pointer;
  }
  .main_tab{
    width: 600px;
    margin-right: 15px;
    margin-top: 20px;
    display: inline-block;
  .back_wrap:hover{
      cursor: pointer;
  }
      .video_player{
          width: 600px;
          height: 350px;
      }
  .creator_detail{
      margin-top: 20px;
      position: relative;
      overflow: hidden;
      .creator_icon{
          border-radius: 25px;
      }
      .creator_icon:hover{
          border-radius: 25px;
      }
      .creator_name{
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          padding-left: 10px;
          font-size: 14px;
      }
      .creator_name:hover{
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          padding-left: 10px;
          font-size: 14px;
      }
      .creator_btn{
          display: inline-block;
          // float: right;
          .notice_btn{
              border-radius: 20px;
          }
      }
  }
  .mv_detail{
      padding-top: 20px;
      .mv_name{
          font-weight: bold;
          font-size: 24px;
      }
      .mv_info{
          color: #ccc;
          font-size: 12px;
          padding-top: 10px;
          .mv_publishTime{
              padding-right: 10px;
          }
      }
  }
  .mv_menu{
    padding-top: 20px;
    .mv_btn {
      display: inline-block;
      border: 1px solid #ccc;
      font-size: 14px;
      padding-left: 25px;
      padding-right: 25px;
      padding-top: 5px;
      padding-bottom: 5px;
      margin: 5px;
      border-radius: 20px;
    }
    .mv_btn:hover{
      cursor: pointer;
      opacity: 65%;
      border: 1px solid red;
    }
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
  }
  .aside_tab{
      width: 400px;
    display: inline-block;
    vertical-align: top;
    .related_wrap{
        padding-top: 20px ;
        .related_video{
            font-size: 14px;
            padding: 5px;
            .related_coverUrl{
                border: 1px solid #ccc;
                border-radius: 5px;
                display: inline-block;
            }
            .related_coverUrl:hover{
            cursor: pointer;
            opacity: 65%;
             }
            .related_detail{
                display: inline-block;
                width: 150px;
                padding: 5px 0 5px 5px;
                vertical-align: top;
                position: relative;
                .related_name{
            display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
                }
                .related_creator{
                    position: absolute;
                    top: 45px;
                    padding-top: 20px;
                    font-size: 12px;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    white-space: nowrap;
                    .related_creatorName{
                        color: #ccc;
                    }
                }
            }
        }
    }
  }
}
.red{
  color:red;
}
.liked{
  color:red
}
</style>
