<template>
    <div class="album_wrap">
        <div class="album_content">
            <div v-for="(item, index) in albums" :key="index" class="single-album">
                <el-image
      style="width: 150px; height: 150px"
      class="album-pic"
      :src="item.picUrl"
      fit='cover'></el-image>
      <div class="album-name">{{item.name}}</div>
      <!--<div class="album-time">{{new Date(parseInt(item.publishTime))}}</div>-->
            </div>
        </div>
        <el-pagination
        @current-change='changePage'
  background
  page-size="20"
  :total="albumSize">
</el-pagination>
    </div>
</template>
<script>
import { getArtistAlbum } from '@/api/artist.js'
export default {
  name: 'artistAlbumIndex',
  data () {
    return {
      albums: []
    }
  },
  props: ['albumSize'],
  created () {
    getArtistAlbum(this.$route.query.id, 0).then(res => {
      console.log(res)
      this.albums = res.data.hotAlbums
    })
  },
  methods: {
    changePage (e) {
      this.albums = []
      getArtistAlbum(this.$route.query.id, e - 1).then(res => {
        this.albums = res.data.hotAlbums
      })
    }
  }
}
</script>
<style lang="less" scoped>
.single-album{
  display: inline-block;
  width: 18%;
  padding: 20px;
  vertical-align: top;
}
.el-pagination{
  display: flex;
  justify-content: center;
}
.album-name{
    display: -webkit-box;
    overflow: hidden;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    font-size: 14px;
}
</style>
