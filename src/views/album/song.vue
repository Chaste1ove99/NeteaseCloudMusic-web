<template>
    <div class="song_container">
        <div class="cate_wrap">
          <div class="cate-num"></div>
          <div class="cate-title">音乐标题</div>
          <div class="cate-singer">歌手</div>
          <div class="cate-album">专辑</div>
          <div class="cate-time">时长</div>
      </div>
       <div class="song_wrap">
          <div v-for="(item, index) in songs" :key="index" class="cate_wrap" @dblclick="playmusic(index)">
         <div class="cate-num">{{index+1}}</div>
          <div class="cate-title">{{item.name}}</div>
          <div class="cate-singer" @click="intoArtist(item.ar[0])">{{item.ar[0].name}}</div>
          <div class="cate-album">{{item.al.name}}</div>
          <div class="cate-time" style="color: #ccc">{{Math.floor(item.dt/60000)}}:{{Math.floor(item.dt/1000)-Math.floor(item.dt/60000)*60}}</div>
          </div>
      </div>
    </div>
</template>
<script>
import { getAlbum } from '@/api/song.js'
export default {
  name: 'AlbumSongIndex',
  data () {
    return {
      songs: []
    }
  },
  methods: {
    playmusic (index) {
      this.$store.commit('intoplaying', this.songs[index])
      this.$store.commit('publishList', this.songs)
    },
    intoArtist (item) {
      this.$router.push('/app/artist/hotsong?id=' + item.id)
    }
  },
  created () {
    getAlbum(this.$route.query.id).then(res => {
      this.songs = res.data.songs
    })
  },
  mounted () {
    this.$nextTick(function () {
      this.$on('playall', this.playmusic(0))
    })
  }
}
</script>
<style lang="less" scoped>
.song_container{
  padding-bottom: 15%;
  font-size: 14px;
  .cate_wrap{
    display: flex;
    border-bottom: 1px #ccc solid;
    padding: 5px;
    .cate-num{
        flex: 1;
        display: inline-block;
        text-align: center;
    }
    .cate-title{
        flex: 4;
        display: inline-block;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }
    .cate-singer{
        flex: 2;
        display: inline-block;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }
    .cate-singer:hover{
       cursor: pointer;
       text-decoration: underline;
    }
    .cate-album{
        flex: 3;
        display: inline-block;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }
    .cate-time{
        flex: 1;
        display: inline-block;
        text-align: center;
    }
  }
  .song_wrap{
    font-size: 14px;
  }
}
</style>
