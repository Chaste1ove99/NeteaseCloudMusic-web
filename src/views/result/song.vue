<template>
  <div class="song-container" v-loading='loading'>
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
          <div class="cate-singer">{{item.artists[0].name}}</div>
          <div class="cate-album">{{item.album.name}}</div>
          <div class="cate-time" style="color: #ccc">{{Math.floor(item.duration/60000)}}:{{Math.floor(item.duration/1000)-Math.floor(item.duration/60000)*60}}</div>
          </div>
      </div>
      <el-pagination
      class="pagination"
  background
  @current-change='changePage'
  page-size=30
  :total="songCount">
</el-pagination>
  </div>
</template>
<script>
import { searchResult } from '@/api/get.js'
import { getAlbum } from '@/api/song.js'
export default {
  name: 'ResultSong',
  data () {
    return {
      songs: [],
      songCount: 0,
      loading: false
    }
  },
  methods: {
    changePage (e) {
      searchResult(this.$route.query.query, e - 1, 1).then(res => {
        this.songs = res.data.result.songs
        for (let i = 0; i < this.songs.length; i++) {
          this.songs[i].order = i
          this.songs[i].ar = []
          this.songs[i].ar[0] = {}
          const name = this.songs[i].artists[0].name
          this.songs[i].ar[0].name = name
        }
        window.scrollTo(0, 0)
      })
    },
    playmusic (index) {
      this.$store.commit('intoplaying', this.songs[index])
      this.$store.commit('publishList', this.songs)
    }
  },
  created () {
    this.loading = true
    searchResult(this.$route.query.query, 0, 1).then(res1 => {
      this.songs = res1.data.result.songs
      for (let i = 0; i < this.songs.length; i++) {
        // 有单曲专辑信息为空
        getAlbum(this.songs[i].album.id).then(res2 => {
          this.songs[i].al = {}
          this.songs[i].al.picUrl = res2.data.album.picUrl
        })
        this.songs[i].order = i
        this.songs[i].ar = []
        this.songs[i].ar[0] = {}
        const name = this.songs[i].artists[0].name
        this.songs[i].ar[0].name = name
        this.loading = false
      }
      this.songCount = res1.data.result.songCount
      this.$emit('Count', this.songCount)
    })
  }
}
</script>
<style lang="less" scoped>
.song-container{
  padding-bottom: 15%;
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
  .pagination{
      display: flex;
      justify-content: center;
      padding-top: 10px;
  }
}
</style>
