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
              <el-menu :default-active="activeIndex" class="el-menu-demo song-bar" mode="horizontal" @select="handleSelect">
  <el-menu-item index="1" class="item1">全部</el-menu-item>
  <el-menu-item index="2" class="item2">华语</el-menu-item>
  <el-menu-item index="3" class="item3">欧美</el-menu-item>
  <el-menu-item index="4" class="item4">韩国</el-menu-item>
  <el-menu-item index="5" class="item5">日本</el-menu-item>
  </el-menu>
            </div>
            <div>123</div>
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
      weekData: []
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
    }
  },
  created () {
    getTopAlbum(0).then(res => {
      this.weekData = res.data.weekData
      for (let i = 0; i < this.weekData.length; i++) {
        if (this.weekData[i].name.length > 22) {
          this.weekData[i].name = this.weekData[i].name.slice(0, 22) + '...'
        }
      }
    })
    getTopSong(0).then(res => {
      console.log(res)
    })
  }
}
</script>
<style scoped>
.newSong-container{
  width: 1100px;
  margin-left: 10px;
  margin-bottom: 10%;
}
.top-bar {
  display: block;
  text-align: center;
  margin-top: -20px;
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
  width: 250px;
  margin-top: 20px;
  padding-bottom: 30px;
}
.name-size {
  font-size: 15px;
}
.artist-size {
  font-size: 14px;
  color: #cccccc;
}
.item1 {
  left: 34%;
  padding-bottom: -3px;
}
.item2 {
  left: 34.5%;
  padding-bottom: -3px;
}
.item3 {
  left: 35%;
  padding-bottom: -3px;
}
.item4 {
  left: 35.5%;
  padding-bottom: -3px;
}
.item5{
  left: 36%;
  padding-bottom: -3px;
}
</style>
