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
      <div class="creator_btn"><el-button v-if='mv.artists[0].followed === false' icon="el-icon-plus" class="notice_btn">关注</el-button></div>
        </div>
        <div class="mv_detail">
            <div class="mv_name">{{mv.name}}</div>
            <div class="mv_info"><span class="mv_publishTime">发布: {{mv.publishTime}}</span><span>播放次数: {{mv.playCount}}</span></div>
        </div>
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
import { getmvdetail, getmvurl, getrelatedvideo } from '@/api/mvplayer.js'
export default {
  name: 'MVplayerIndex',
  data () {
    return {
      mv: {},
      src: '',
      relatedvideo: []
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
  },
  methods: {
    goback () {
      this.$router.go(-1)
    },
    intorelatedmv (item) {
      this.$router.push('/app/videoplayer?id=' + item.vid)
      this.$touter.go(0)
    },
    toartist () {
      this.$router.push('/app/artist/hotsong?id=' + this.mv.artists[0].id)
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
          float: right;
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
</style>
