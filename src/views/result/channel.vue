<template>
  <div class="channel-container">
    <div class="top-title">主播标题</div>
    <div class="channel_wrap" v-for="(item,index) in djRadios" :key="index">
      <div class="channel_img">
       <el-image
      style="width: 100px; height: 100px"
      class="channel_pic"
      :src="item.picUrl"
      fit="cover"></el-image></div>
      <div class="channel_name">{{item.name}}</div>
      <div class="channel_creator">by {{item.dj.nickname}}</div>
    </div>
    <el-pagination
    class="pagination"
  background
  page-size="30"
  @current-change='changePage'
  :total="djRadiosCount">
</el-pagination>
  </div>
</template>
<script>
import { searchResult } from '@/api/get.js'
export default {
  name: 'ResultChannel',
  data () {
    return {
      djRadiosCount: 0,
      djRadios: []
    }
  },
  methods: {
    changePage (e) {
      searchResult(this.$route.query.query, e - 1, 1009).then(res => {
        this.djRadios = res.data.result.djRadios
      })
    }
  },
  created () {
    searchResult(this.$route.query.query, 0, 1009).then(res => {
      this.djRadiosCount = res.data.result.djRadiosCount
      this.$emit('Count', this.djRadiosCount)
      this.djRadios = res.data.result.djRadios
    })
  }
}
</script>
<style lang="less" scoped>
.channel-container{
  padding-bottom: 15%;
  font-size: 14px;
  .top-title{
    color: #ccc;
    padding-left: 110px;
  }
  .channel_wrap{
    padding: 5px;
    display: flex;
    .channel_img{
      flex: 1;
      .channel_pic{
        border-radius: 25px;
      }
    }
    .channel_name{
      flex: 5;
      display: flex;
      align-items: center;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      padding-left: 10px;
    }
    .channel_creator{
      flex: 3;
      display: flex;
      align-items: center;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
  }
  .pagination{
    display: flex;
    padding-top: 10px;
    justify-content: center;
  }
}
</style>
