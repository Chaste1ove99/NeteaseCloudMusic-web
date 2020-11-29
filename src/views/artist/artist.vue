<template>
<div class="artist-container">
    <div class="artist-alias"><span class="artist-name">{{artist.name}}</span><span v-if="artist.alias.length > 0">({{artist.alias[0]}})</span></div>
    <div class="artist-icon">
         <el-image
         class="artist-img"
      :src=artist.picUrl
      fit='cover'></el-image>
    </div>
    <div class="artist-bar">
        <el-menu :default-active="activeIndex" class="artist-menu" mode="horizontal" @select="handleSelect">
  <el-menu-item class="item" index="1" @click="gethotsong">热门单曲</el-menu-item>
   <el-menu-item class="item" index="2" @click="getAlbum">专辑</el-menu-item>
   <el-menu-item class="item" index="3" @click="getMV">相关MV</el-menu-item>
   <el-menu-item class="item" index="4" @click="getDesc">歌手信息</el-menu-item>
</el-menu>
    </div>
    <div class="artist-wrap">
      <router-view :albumSize='albumSize' :artistName='artistName' @toggle='toggle'></router-view>
    </div>
</div>
</template>
<script>
import { getArtistSong } from '@/api/artist.js'
export default {
  name: 'artistIndex',
  data () {
    return {
      artist: {},
      hotsong: [],
      activeIndex: '1',
      albumSize: 0,
      artistName: ''
    }
  },
  methods: {
    gethotsong () {
      this.$router.push('/app/artist/hotsong?id=' + this.$route.query.id)
    },
    getAlbum () {
      this.$router.push('/app/artist/album?id=' + this.$route.query.id)
      this.activeIndex = '2'
    },
    getMV () {
      this.$router.push('/app/artist/mv?id=' + this.$route.query.id)
      this.activeIndex = '3'
    },
    getDesc () {
      this.$router.push('/app/artist/desc?id=' + this.$route.query.id)
      this.activeIndex = '4'
    },
    toggle (data) {
      this.artist = data
    }
  },
  created () {
    getArtistSong(this.$route.query.id).then(res => {
      this.artist = res.data.artist
      this.hotsong = res.data.hotSongs
      this.albumSize = res.data.artist.albumSize
      this.artistName = res.data.artist.name
    })
  }
}
</script>
<style lang="less" scoped>
.artist-container{
  padding: 10px;
  padding-bottom: 20%;
  .artist-alias{
    .artist-name{
      font-size: 28px;
    }
  }
  .artist-icon{
    .artist-img{
      width: 700px;
      height: 300px;
    }
  }
  .artist-bar{
    width: 700px;
    .artist-menu{
        display: flex;
        .item{
            flex: 1;
            text-align: center;
            color: black;
        }
    }
  }
  .artist-wrap{
    padding-top: 5px;
    width: 700px;
    .hotsong-wrap{
      .song-wrap{
        border-bottom: 1px solid #ccc;
        padding: 5px;
        display: flex;
        .num {
          display: inline-block;
          flex: 1;
          text-align: center;
        }
        .song-name{
          display: inline-block;
          flex: 5;
        }
        .song-album{
          display: inline-block;
          flex: 4;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }
        .song-time{
          display: inline-block;
          flex: 1;
          text-align: center;
        }
      }
    }
  }
  .collect-bar {
  }
}
.none {
}
</style>
