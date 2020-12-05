<template>
  <div class="MV-container">
    <div class="mv_wrap" v-for="(item,index) in mvs" :key="index">
      <div class="mv_pic" @click="intomvpage(item)"><el-image
      style="width: 240px; height: 120px"
      :src="item.cover"
      fit="cover"></el-image></div>
      <div class="mv_name">{{item.name}}</div>
      <div class="mv_arname">{{item.artistName}}</div>
    </div>
    <el-pagination
    class="pagination"
  background
  page-size="30"
  @current-change='changePage'
  :total="mvCount">
</el-pagination>
  </div>
</template>
<script>
import { searchResult } from '@/api/get.js'
export default {
  name: 'ResultMv',
  data () {
    return {
      mvCount: 0,
      mvs: []
    }
  },
  methods: {
    changePage (e) {
      searchResult(this.$route.query.query, e - 1, 1004).then(res => {
        this.mvs = res.data.result.mvs
        window.scrollTo(0, 0)
      })
    },
    intomvpage (item) {
      this.$router.push('/app/mvplayer?id=' + item.id)
    }
  },
  created () {
    searchResult(this.$route.query.query, 0, 1004).then(res => {
      // console.log(res)
      this.mvCount = res.data.result.mvCount
      this.mvs = res.data.result.mvs
      this.$emit('Count', this.mvCount)
    })
  }
}
</script>
<style lang="less" scoped>
.MV-container{
  padding-bottom: 15%;
  .mv_wrap{
    width: 30%;
    display: inline-block;
    padding: 10px;
    .mv_pic:hover{
      opacity: 65%;
      cursor: pointer;
    }
    .mv_name{
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      font-size: 14px;
    }
    .mv_arname{
      font-size: 14px;
      color: #ccc;
    }
  }
  .pagination{
    display: flex;
    justify-content: center;
  }
}
</style>
