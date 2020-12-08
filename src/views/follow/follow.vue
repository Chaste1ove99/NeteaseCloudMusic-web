<template>
    <div class="follow_container">
        <div class="follow_wrap" v-for="(item,index) in follow" :key="index">
                <el-image
                class="follow_img"
                @click="intouser(item)"
      style="width: 100px; height: 100px"
      :src="item.avatarUrl"
      fit="cover"></el-image>
      <div class="follow_detail">
          <div class="follow_name"  @click="intouser(item)">{{item.nickname}}</div>
          <div class="follow_sign" v-html="item.signature"></div>
          <div class="follow_info"><span style="padding-right: 24px">歌单: {{item.playlistCount}}</span>|<span style="padding-left: 24px">粉丝: {{item.followeds}}</span></div>
      </div>
      <div class="follow_btn">
          <div class="btn" v-if="item.followed" @click="followitem(item,0)"><i class="el-icon-check btn_icon"></i>已关注</div>
          <div class="btn" v-else @click="followitem(item,1)"><i class="el-icon-plus btn_icon" style="color: red"></i>关注</div>
      </div>
        </div>
        <el-pagination
        class="pagination"
  background
  page-size="10"
  @current-change='changePage'
  :total="followCount">
</el-pagination>
    </div>
</template>
<script>
import { getFollow, followUser } from '@/api/subscriber.js'
export default {
  name: 'followIndex',
  data () {
    return {
      follow: [],
      followCount: 0
    }
  },
  created () {
    this.sendFollow(0)
    this.followCount = this.$store.state.follow
  },
  methods: {
    intouser (item) {
      this.$router.push('/app/subscriber?id=' + item.userId)
    },
    changePage (e) {
      this.sendFollow(e - 1)
      window.scrollTo(0, 0)
    },
    sendFollow (m) {
      const _this = this
      const timestamp = Date.parse(new Date())
      const getFollows = async function () {
        const result = await getFollow(_this.$route.query.id, m, timestamp)
        console.log(result)
        _this.follow = result.data.follow
      }
      getFollows()
    },
    // 关注取关用户
    followitem (item, e) {
      const timestamp = Date.parse(new Date())
      const id = item.userId
      const handle = async function () {
        console.log(id)
        const result = await followUser(id, e, timestamp)
        console.log(result)
      }
      handle()
      item.followed = e
    }
  }
}
</script>
<style lang="less" scoped>
.follow_container{
    width: 900px;
    padding: 10px;
    padding-bottom: 15%;
    .follow_wrap{
        display: inline-block;
        width: 420px;
        padding: 5px 10px 5px 10px;
        position: relative;
         .follow_img{
            border-radius: 50px;
            border: 1px solid #ccc;
         }
         .follow_img:hover{
             opacity: 65%;
             cursor: pointer;
         }
         .follow_detail{
             display: inline-block;
             vertical-align: top;
             padding-left: 10px;
             padding-top: 10px;
             padding-bottom: 10px;
             max-width: 200px;
             .follow_name{
                 font-size: 15px;
             }
             .follow_name:hover{
                 font-weight: bold;
                 cursor: pointer;
             }
             .follow_sign{
                 padding-top: 15px;
                 text-overflow: ellipsis;
                 overflow: hidden;
                 white-space: nowrap;
                 font-size: 13px;
                 color:#aeaeae;
             }
             .follow_info{
                font-size: 13px;
                 color:#aeaeae;
                 padding-top: 3px;
             }
         }
         .follow_btn{
             display: inline-block;
             position: absolute;
             left: 350px;
             top: 50%;
             padding-bottom: 10px;
             transform: translateY(-50%);
             .btn{
                 border: 1px solid #ccc;
                 border-radius: 15px;
                 padding: 3px 5px 3px 5px;
                 font-size: 13px;
                 width: 60px;
                 display: flex;
                 justify-content: center;
                 .btn_icon{
                     padding-right: 5px;
                     font-size: 14px;
                 }
             }
         }
    }
    .pagination{
        display: flex;
        justify-content: center;
        padding-top: 20px;
    }
}
</style>
