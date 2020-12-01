<template>
  <div class="singer-container">
      <div class="singer_wrap" v-for="(item,index) in artists" :key="index" @dblclick="toSinger(item)">
          <div class="singer-icon">
                  <el-image
                  class="singer-image"
        style="width: 100px; height: 100px"
      :src="item.picUrl"
      fit="cover"></el-image>
          </div>
          <div class="singer-name">{{item.name}}</div>
      </div>
      <el-pagination
      class="pagination"
  background
  page-size="30"
  @current-change='ChangePage'
  :total="artistCount">
</el-pagination>
  </div>
</template>
<script>
import { searchResult } from '@/api/get.js'
export default {
  name: 'ResultSinger',
  data () {
    return {
      artistCount: 0,
      artists: []
    }
  },
  methods: {
    toSinger (item) {
      this.$router.push('/app/artist/hotsong?id=' + item.id)
    },
    ChangePage (e) {
      searchResult(this.$route.query.query, e - 1, 100).then(res => {
        this.artists = res.data.result.artists
        window.scrollTo(0, 0)
      })
    }
  },
  created () {
    searchResult(this.$route.query.query, 0, 100).then(res => {
      this.artistCount = res.data.result.artistCount
      this.$emit('Count', this.artistCount)
      this.artists = res.data.result.artists
    })
  }
}
</script>
<style lang="less" scoped>
.singer-container{
  padding-bottom: 15%;
  .singer_wrap {
    padding: 5px;
    width: 600px;
    display: flex;
    .singer-icon {
        flex: 1;
        .singer-image{
            border-radius: 25px;
        }
    }
    .singer-name {
        flex: 6;
        display: flex;
        align-items: center;
        padding-left: 10px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }
  }
  .pagination {
    display: flex;
    justify-content: center;
    padding-top: 10px;
  }
}
</style>
