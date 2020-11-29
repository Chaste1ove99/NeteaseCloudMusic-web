<template>
     <div class="hotsong-wrap">
         <el-button round class="collect-bar" icon="el-icon-folder-add">收藏全部</el-button>
        <div v-for="(item, index) in hotsong" :key="index" class="song-wrap" @dblclick="playmusic(index)">
          <div class='num'>{{index+1}}</div>
          <div class="song-name">{{item.name}}</div>
          <div class="song-album">{{item.al.name}}</div>
          <div class="song-time">{{Math.floor(item.dt/60000)}}:{{Math.floor(item.dt/1000)-Math.floor(item.dt/60000)*60}}</div>
        </div>
      </div>
</template>
<script>
import { getArtistSong } from '@/api/artist.js'
export default {
  name: 'HotsongIndex',
  data () {
    return {
      hotsong: []
    }
  },
  methods: {
    playmusic (index) {
      this.$store.commit('intoplaying', this.hotsong[index])
      this.$store.commit('publishList', this.hotsong)
    }
  },
  created () {
    getArtistSong(this.$route.query.id).then(res => {
      this.hotsong = res.data.hotSongs
      for (let i = 0; i < this.hotsong.length; i++) {
        this.hotsong[i].index = i
      }
    })
  }
}
</script>
<style lang="less" scoped>
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
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
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
</style>
