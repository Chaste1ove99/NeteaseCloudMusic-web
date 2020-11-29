<template>
    <div class="newSong-container">
      <div class="top-bar">
      <el-button-group>
  <el-button type="danger" icon="el-icon-arrow-left" size="small" @click="toNewSong">新歌速递</el-button>
  <el-button type="danger" size='small' @click="toNewAlbum">新碟上架<i class="el-icon-arrow-right el-icon--right"></i></el-button>
  </el-button-group>
          </div>
          <div class="main">
          <div class="new-music" ref="new-music">
            <div>
              <el-menu :default-active="activeIndex" class="el-menu-demo song-bar" mode="horizontal">
  <el-menu-item index="1" class="item" @click="getSong(0)">全部</el-menu-item>
  <el-menu-item index="2" class="item" @click="getSong(7)">华语</el-menu-item>
  <el-menu-item index="3" class="item" @click="getSong(96)">欧美</el-menu-item>
  <el-menu-item index="4" class="item" @click="getSong(16)">韩国</el-menu-item>
  <el-menu-item index="5" class="item" @click="getSong(8)">日本</el-menu-item>
  </el-menu>
            </div>
            <div>
              <div class="top-nav">
                <el-button icon="el-icon-caret-right" class="play-btn">播放全部</el-button>
              </div>
              <div class="top100-block">
                <div v-for="(item, index) in top100" :key="index" class="single-block">
                  <div class="num">{{index + 1}}</div>
                  <div class="song-title">
                  <div class="song-name">{{item.information}}</div>
                  <div class="song-detail">
                    {{item.detail}}
                  </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="new-album no-view" ref="new-album">
            <div class="al-bar">本周新碟</div>
            <div class="album-block">
              <div v-for="(item, index) in weekData" :key='index' class="single-album">
               <el-image
      style="width: 200px; height: 200px"
      :src="item.picUrl"
      fit="fill"></el-image>
      <div class="name-size">{{item.name}}</div>
      <div class="artist-size">{{item.artists[0].name}}</div>
              </div>
            </div>
          </div>
          </div>
    </div>
</template>
<script>
import { getTopAlbum, getTopSong } from '@/api/song.js'
export default {
  name: 'newSongIndex',
  data () {
    return {
      weekData: [],
      top100: []
    }
  },
  methods: {
    toNewSong () {
      this.$refs['new-music'].classList.add('view')
      this.$refs['new-music'].classList.remove('no-view')
      this.$refs['new-album'].classList.add('no-view')
      this.$refs['new-album'].classList.remove('view')
    },
    toNewAlbum () {
      this.$refs['new-music'].classList.add('no-view')
      this.$refs['new-music'].classList.remove('view')
      this.$refs['new-album'].classList.remove('no-view')
      this.$refs['new-music'].classList.add('view')
    },
    getSong (num) {
      getTopSong(num).then(res => {
        this.top100 = res.data.data
        for (let i = 0; i < this.top100.length; i++) {
          this.top100[i].artistCount = ''
          this.top100[i].information = ''
          if (this.top100[i].alias.length > 0) {
            this.top100[i].information = this.top100[i].name + '(' + this.top100[i].alias[0] + ')'
          } else {
            this.top100[i].information = this.top100[i].name
          }
          for (let j = 0; j < this.top100[i].artists.length; j++) {
            if (j > 0) {
              this.top100[i].artists[j].name = '/' + this.top100[i].artists[j].name
            }
            this.top100[i].artistCount += this.top100[i].artists[j].name
            this.top100[i].detail = this.top100[i].artistCount + ' - ' + this.top100[i].album.name
          }
        }
      })
    }
  },
  created () {
    getTopAlbum(0).then(res => {
      this.weekData = res.data.weekData
    })
    getTopSong(0).then(res => {
      this.top100 = res.data.data
      for (let i = 0; i < this.top100.length; i++) {
        this.top100[i].artistCount = ''
        this.top100[i].information = ''
        if (this.top100[i].alias.length > 0) {
          this.top100[i].information = this.top100[i].name + '(' + this.top100[i].alias[0] + ')'
        } else {
          this.top100[i].information = this.top100[i].name
        }
        for (let j = 0; j < this.top100[i].artists.length; j++) {
          if (j > 0) {
            this.top100[i].artists[j].name = '/' + this.top100[i].artists[j].name
          }
          this.top100[i].artistCount += this.top100[i].artists[j].name
          this.top100[i].detail = this.top100[i].artistCount + ' - ' + this.top100[i].album.name
        }
      }
    })
  }
}
</script>
<style scoped>
.newSong-container{
  margin-left: 10px;
  margin-bottom: 10%;
}
.top-bar {
  display: block;
  text-align: center;
}
.no-view {
  display: none;
}
.al-bar {
  font-weight: bold;
  font-size: 20px;
  display: inline-block;
  width: 50px;
  margin-left: 20px;
  margin-top: 20px;
  vertical-align: top;
}
.album-block {
  display: inline-block;
  width: 1000px;
}
.single-album {
  display: inline-block;
  width: 50%;
  margin-top: 20px;
  padding-bottom: 30px;
  overflow: hidden;
}
.name-size {
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 15px;
}
.artist-size {
  font-size: 14px;
  color: #cccccc;
}
/**这里设置了固定位置*/

.play-btn {
  border: none;
}
.top-nav {
  margin-top: 20px;
  border: 1px solid #F0EDEC;
  width: 1000px;
}
.song-name {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.song-alias {
  color: #676463;
}
.song-detail {
  color: #676463;
  font-size: 13px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.single-block {
  display: inline-block;
  border: 1px solid #F0EDEC;
  border-top: none;
  width: 499px;
  overflow: hidden;
}
.num {
  display: inline-block;
  position: relative;
  width: 20px;
  padding-left: 10px;
  padding-right: 10px;
  top: 50%;
  transform: translateY(50%);
  text-align: center;
  vertical-align: top;
}
.song-title {
  display: inline-block;
  overflow: hidden;
  width: 455px;
}
.top100-block{
  width: 1100px;
}
.song-bar{
  display: flex;
  padding-left: 30%;
  padding-right: 30%;
}
.item{
  flex: 1;
  text-align: center;
}
</style>
