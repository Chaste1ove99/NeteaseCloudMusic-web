<template>
  <div class="list-container">
    <div class="list_wrap" v-for="(item,index) in playlists" :key="index" @dblclick="intolist(item)">
      <div class="list_pic">
        <el-image
        class="list_img"
      style="width: 100px; height: 100px"
      :src="item.coverImgUrl"
      :fit="fit"></el-image></div>
      <div class="list_name">{{item.name}}</div>
      <div class="list_creator">by {{item.creator.nickname}}</div>
    </div>
    <el-pagination
    class="pagination"
  background
  page-size="30"
  @current-change='changePage'
  :total="playlistCount">
</el-pagination>
  </div>
</template>
<script>
import { searchResult } from '@/api/get.js'
export default {
  name: 'ResultList',
  data () {
    return {
      playlistCount: 0,
      playlists: []
    }
  },
  methods: {
    changePage (e) {
      searchResult(this.$route.query.query, e - 1, 1000).then(res => {
        this.playlists = res.data.result.playlists
        window.scrollTo(0, 0)
      })
    },
    intolist (item) {
      this.$router.push('/app/list?id=' + item.id)
    }
  },
  created () {
    searchResult(this.$route.query.query, 0, 1000).then(res => {
      // console.log(res)
      this.playlistCount = res.data.result.playlistCount
      this.$emit('Count', this.playlistCount)
      this.playlists = res.data.result.playlists
    })
  }
}
</script>
<style lang="less" scoped>
.list-container{
  padding-bottom: 15%;
  .list_wrap{
    padding: 5px;
    display: flex;
    font-size: 14px;
    .list_pic{
      flex: 1;
      .list_img{
        border-radius: 25px;
      }
    }
    .list_name{
      flex: 5;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      display: flex;
      align-items: center;
      padding-left: 10px;
    }
    .list_creator{
      flex: 2;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
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
