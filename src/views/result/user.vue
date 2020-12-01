<template>
  <div class="user-container">
    <div class="user_wrap" v-for="(item,index) in userprofiles" :key="index">
      <div class="user_icon">
            <el-image
            class="user_pic"
      style="width: 100px; height: 100px"
      :src="item.avatarUrl"
      fit="cover"></el-image>
      </div>
      <div class="user_name">{{item.nickname}}</div>
      <div class="user_desc">{{item.signature}}</div>
    </div>
    <el-pagination
    class="pagination"
  background
  page-size="30"
  @current-change='changePage'
  :total="userprofileCount">
</el-pagination>
  </div>
</template>
<script>
import { searchResult } from '@/api/get.js'
export default {
  name: 'ResultUser',
  data () {
    return {
      userprofileCount: 0,
      userprofiles: []
    }
  },
  created () {
    searchResult(this.$route.query.query, 0, 1002).then(res => {
      this.userprofileCount = res.data.result.userprofileCount
      this.$emit('Count', this.userprofileCount)
      this.userprofiles = res.data.result.userprofiles
    })
  },
  methods: {
    changePage (e) {
      searchResult(this.$route.query.query, e - 1, 1002).then(res => {
        this.userprofiles = res.data.result.userprofiles
      })
    }
  }
}
</script>
<style lang="less" scoped>
.user-container{
  padding-bottom: 15%;
  .user_wrap{
    font-size: 14px;
    padding: 5px;
    display: flex;
    .user_icon{
      flex: 1;
      .user_pic{
        border-radius: 50px;
      }
    }
    .user_name{
      flex: 7;
      display: flex;
      align-items: center;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .user_desc{
      flex: 2;
      color: #ccc;
      display: flex;
      align-items: center;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
  .pagination{
    padding-top: 10px;
    display: flex;
    justify-content: center;
  }
}
</style>
