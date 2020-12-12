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
          <div class="btn" v-if="item.followed"><i class="el-icon-check btn_icon" @click="followitem (item,0)"></i>已关注</div>
          <div class="btn" v-else @click="followitem (item,1)"><i class="el-icon-plus btn_icon" style="color: red"></i>关注</div>
      </div>
        </div>
    </div>
</template>
<script>
import { getFollowed, followUser } from '@/api/subscriber.js'
export default {
  name: 'followIndex',
  data () {
    return {
      follow: [],
      more: true,
      lasttime: 0
    }
  },
  created () {
    this.sendFollow()
  },
  mounted () {
    // 作防抖 dom操作要在这里进行
    window.addEventListener('scroll', this.debounce(this.handleScroll, 3000))
  },
  methods: {
    intouser (item) {
      this.$router.push('/app/subscriber?id=' + item.userId)
    },
    sendFollow () {
      if (this.more === true) {
        switch (this.lasttime) {
          case 0:
            this.lasttime = Date.parse(new Date())
            break
        }
        const these = this
        const getFollows = async function () {
          const result = await getFollowed(these.$route.query.id, these.lasttime)
          const length = result.data.followeds.length
          these.lasttime = result.data.followeds[length - 1].time
          these.follow = these.follow.concat(result.data.followeds)
          these.more = result.data.more
        }
        getFollows()
      }
    },
    debounce (fn, wait) { // 节流方法
      var timeout = null // 初始化定时器
      // 本质是闭包
      // 作用是在闭包内保存了外部变量timeout不会被销毁
      return function () {
        if (timeout !== null) {
          clearTimeout(timeout)
        }
        // 如果scroll方法反复触发，则清空定时器
        timeout = setTimeout(fn, wait)
        // 如果方法没有反复触发，那么就调用我们判断滚动的方法，然后去调用数据，他就只会请求一次了
      }
    },
    handleScroll () {
      const scrollTop = document.documentElement.scrollTop // 屏幕滚动高度
      const innerHeight = document.querySelector('#app').clientHeight // 容器高度
      const outerHeight = document.documentElement.clientHeight // 屏幕高度
      if (outerHeight + scrollTop >= innerHeight + 10) {
        this.sendFollow()
      }
    },
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
}
</style>
