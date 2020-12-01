<template>
  <div class="lyrics-container">
          <div class="cate_wrap">
          <div class="cate-num"></div>
          <div class="cate-title">音乐标题</div>
          <div class="cate-singer">歌手</div>
          <div class="cate-album">专辑</div>
          <div class="cate-time">时长</div>
      </div>
      <div class="song_wrap">
        <div v-for="(item, index) in songs" :key="index" class="music_wrap">
          <div class="song_detail" @dblclick="playmusic(index)">
         <div class="song-num">{{index+1}}</div>
          <div class="song-title">{{item.name}}</div>
          <div class="song-singer">{{item.artists[0].name}}</div>
          <div class="song-album">{{item.album.name}}</div>
          <div class="song-time">{{Math.floor(item.duration/60000)}}:{{Math.floor(item.duration/1000)-Math.floor(item.duration/60000)*60}}</div>
          </div>
                    <div class="lyrics_wrap">
            <div class="lyrics-blank_1"></div>
            <!--动态设置dom元素的id来控制dom元素-->
            <p v-html="item.lyrics.txt" class="lyrics fold" :id="index">{{item.lyrics.txt}}</p>
            <div class="lyrics-blank_2">
              <el-button @click="fold(index)" class="lyrics-btn" :id="index+30">展开歌词</el-button>
            </div>
          </div>
      </div>
  </div>
  <el-pagination
  class="pagination"
  background
  page-size="30"
  @current-change='changePage'
  layout="prev, pager, next"
  :total="songCount">
</el-pagination>
  </div>
</template>
<script>
import { searchResult } from '@/api/get.js'
import { getAlbum } from '@/api/song.js'
export default {
  name: 'ResultLyrics',
  data () {
    return {
      songCount: 0,
      songs: []
    }
  },
  created () {
    searchResult(this.$route.query.query, 0, 1006).then(res1 => {
      console.log(res1)
      this.songCount = res1.data.result.songCount
      this.$emit('Count', this.songCount)
      this.songs = res1.data.result.songs
      for (let i = 0; i < this.songs.length; i++) {
        // 有单曲专辑信息为空
        getAlbum(this.songs[i].album.id).then(res2 => {
          // console.log(res2)
          this.songs[i].al = {}
          this.songs[i].al.picUrl = res2.data.album.picUrl
        })
        this.songs[i].order = i
        this.songs[i].fold = 1
        this.songs[i].ar = []
        this.songs[i].ar[0] = {}
        const name = this.songs[i].artists[0].name
        this.songs[i].ar[0].name = name
      }
      // console.log(res)
    })
  },
  methods: {
    playmusic (index) {
      this.$store.commit('intoplaying', this.songs[index])
      this.$store.commit('publishList', this.songs)
    },
    // 动态设置dom元素的id
    fold (index) {
      const dom1 = document.getElementById(index)
      const dom2 = document.getElementById(index + 30)
      if (this.songs[index].fold === 1) {
        dom1.classList.remove('fold')
        this.songs[index].fold = 0
        dom2.innerHTML = '收起歌词'
      } else {
        dom1.classList.add('fold')
        this.songs[index].fold = 1
        dom2.innerHTML = '展开歌词'
      }
    },
    changePage (e) {
      searchResult(this.$route.query.query, e - 1, 1006).then(res1 => {
        console.log(res1)
        this.songs = res1.data.result.songs
        for (let i = 0; i < this.songs.length; i++) {
          // 有单曲专辑信息为空
          getAlbum(this.songs[i].album.id).then(res2 => {
            // console.log(res2)
            this.songs[i].al = {}
            this.songs[i].al.picUrl = res2.data.album.picUrl
          })
          this.songs[i].order = i
          this.songs[i].fold = 1
          this.songs[i].ar = []
          this.songs[i].ar[0] = {}
          const name = this.songs[i].artists[0].name
          this.songs[i].ar[0].name = name
        }
      // console.log(res)
      })
    }
  }
}
</script>
<style lang="less" scoped>
.lyrics-container {
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
    width: 100%;
    .music_wrap{
      border-bottom: 1px #ccc solid;
      padding: 5px;
      .song_detail{
        display: flex;
        .song-num{
        flex: 1;
        display: inline-block;
        text-align: center;
    }
    .song-title{
        flex: 4;
        display: inline-block;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }
    .song-singer{
        flex: 2;
        display: inline-block;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }
    .song-album{
        flex: 3;
        display: inline-block;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }
    .song-time{
        flex: 1;
        display: inline-block;
        text-align: center;
        color: #ccc;
    }
      }
      .lyrics_wrap{
        padding-top: 10px;
        display: flex;
        .lyrics-blank_1{
          flex: 1;
        }
        .lyrics{
          white-space: pre-wrap;
          flex: 4;
          color: #ccc;
        }
        .fold{
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3;
          overflow: hidden;
        }
        .lyrics-blank_2{
          flex: 6;
          overflow: hidden;
          .lyrics-btn{
            display: flex;
            align-items: center;
            float: right;
            margin: 5px;
          }
        }
      }
    }
  }
  .pagination{
    display: flex;
    justify-content: center;
    padding-top: 10px;
  }
}
</style>
