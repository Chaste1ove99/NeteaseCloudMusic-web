<template>
    <div class="album-container">
        <div class="album_top_wrap">
            <div class="album_img">
    <el-image
    class='album_pic'
      style="width: 200px; height: 200px"
      :src="album.picUrl"
      fit="cover"></el-image></div>
      <div class="album_menu">
          <div class="album_title">
              <div class="album_icon">专辑</div>
              <div class="album_name">{{album.name}}<span class="transNames" v-if='album.transNames'>({{album.transNames[0]}})</span></div>
          </div>
          <div class="album_btn_list">
  <el-button icon="el-icon-caret-right" round>播放全部</el-button>
  <el-button icon="el-icon-folder-add"   round size="small">收藏</el-button>
  <el-button round icon='el-icon-top' size="small">分享</el-button>
  <el-button round  icon='el-icon-bottom' size="small">下载全部</el-button>
          </div>
          <div class="album_singer">歌手:<a :href="'http://localhost:8080/#/app/artist/hotsong?id='+album.artist.id+'.html'">{{album.artist.name}}</a></div>
          <div class="album_time">时间:{{(new Date(album.publishTime)).format("yyyy-MM-dd")}}</div>
      </div>
        </div>
        <el-menu :default-active="activeIndex" class="album_mid_bar" mode="horizontal">
  <el-menu-item index="1" @click="toAlbum">歌曲列表</el-menu-item>
  <el-menu-item index="2" @click="toComment">评论<span class="commentCount">({{album.info.commentCount}})</span></el-menu-item>
  <el-menu-item index="3" @click="toDesc">专辑详情</el-menu-item>
        </el-menu>
        <div class="album_router">
            <router-view :desc='desc' :album='album'></router-view>
        </div>
    </div>
</template>
<script>
import { getAlbum } from '@/api/song.js'
export default {
  name: 'AlbumIndex',
  data () {
    return {
      activeIndex: 1,
      album: {},
      desc: ''
    }
  },
  methods: {
    toAlbum () {
      this.activeIndex = 1
      this.$router.push('/app/album?id=' + this.album.id)
    },
    toComment () {
      this.activeIndex = 2
      this.$router.push('/app/album/comment?id=' + this.album.id)
    },
    toDesc () {
      this.activeIndex = 3
      this.$router.push('/app/album/desc?id=' + this.album.id)
    }
  },
  created () {
    const timestamp = Date.parse(new Date())
    getAlbum(this.$route.query.id, timestamp).then(res => {
      console.log(res)
      this.album = res.data.album
      this.desc = this.album.description
    })
  }
}
</script>
<style lang="less" scoped>
.album-container{
  padding: 10px;
  padding-left: 20px;
  .album_top_wrap{
    .album_img{
        display: inline-block;
        .album_pic{
          border-radius: 20px;
        }
    }
    .album_menu{
        display: inline-block;
        vertical-align: top;
        padding-left: 20px;
      .album_title{
          padding: 5px;
          .album_icon{
            display: inline-block;
            font-size: 14px;
            border: 1px solid red;
            border-radius: 5px;
            color: red;
            padding: 2px 4px 2px 4px;
          }
          .album_name{
            display: inline-block;
            font-size: 22px;
            padding-left: 10px;
            .transNames{
                font-size: 16px;
                color: #ccc;
            }
          }
      }
      .album_btn_list{
          padding: 5px;
      }
      .album_singer{
          padding: 5px;
          padding-top: 10px;
          font-size: 12px;
      }
      .album_time{
        padding: 5px;
        padding-top: 0px;
        font-size: 12px;
      }
    }
  }
  .album_mid_bar {
      width: 700px;
      .commentCount{
          font-size: 12px;
      }
  }
  .album_router{
      width: 700px;
  }
}
</style>
