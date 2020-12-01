<template>
  <div class="album-container">
    <div class="album_wrap" v-for="(item, index) in albums" :key="index" @dblclick="toAlbum(item)">
      <div class="album_pic"> <el-image
      style="width: 100px; height: 100px"
      class="album_icon"
      :src="item.picUrl"
      fit="cover"></el-image></div>
      <div class="album_name">{{item.name}}</div>
      <div class="album_artist">{{item.artist.name}}</div>
    </div>
    <el-pagination
    class="pagination"
    page-size="30"
    @current-change='changePage'
  background
  :total="albumCount">
</el-pagination>
  </div>
</template>
<script>
import { searchResult } from '@/api/get.js'
export default {
  name: 'ResultAlbum',
  data () {
    return {
      albumCount: 0,
      albums: []
    }
  },
  methods: {
    changePage (e) {
      searchResult(this.$route.query.query, e - 1, 10).then(res => {
        this.albums = res.data.result.albums
      })
    },
    toAlbum (item) {
      this.$router.push('/app/album?id=' + item.id)
    }
  },
  created () {
    searchResult(this.$route.query.query, 0, 10).then(res => {
      this.albumCount = res.data.result.albumCount
      this.$emit('Count', this.albumCount)
      this.albums = res.data.result.albums
      // console.log(res)
    })
  }
}
</script>
<style lang="less" scoped>
.album-container{
  padding-bottom: 15%;
  .album_wrap{
    padding: 5px;
    display: flex;
    font-size: 14px;
    .album_pic{
      flex: 1;
      .album_icon{
        border-radius: 25px;
      }
    }
    .album_name{
      flex: 5;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      padding-left: 10px;
      display: flex;
      align-items: center;
    }
    .album_artist{
      flex: 3;
      display: flex;
      align-items: center;
    }
  }
  .pagination{
    display: flex;
    justify-content: center;
    padding-top: 10px;
  }
}
</style>
