<template>
    <div class="msg_wrap">
        <div v-for="(item,index) in msgs" :key="index" class="msg_block" @click="intomail(item)">
                <el-image
      style="width: 40px; height: 40px"
      class="msg_img"
      :src="item.fromUser.avatarUrl"
      fit="cover"></el-image>
      <div class="msg_detail">
          <div class="top_slot">
          <div class="user_name">{{item.fromUser.nickname}}</div>
          <div class="user_time">{{(new Date(item.lastMsgTime)).format("MM月dd日 hh:mm")}}</div>
          </div>
          <div class="user_msg">{{JSON.parse(item.lastMsg).msg}}</div>
      </div>
        </div>
    </div>
</template>
<script>
import { getmsgprivate } from '@/api/user.js'
export default {
  name: 'usermsgIndex',
  data () {
    return {
      msgs: [],
      page: 1,
      more: true
    }
  },
  created () {
    const timestamp = Date.parse(new Date())
    const _this = this
    async function getmsg (e) {
      const result = await getmsgprivate(e, timestamp)
      console.log(result)
      _this.msgs = result.data.msgs
    }
    getmsg(0)
  },
  mounted () {
    window.addEventListener('scroll', this.debounce(this.handleScroll, 2000))
  },
  methods: {
    intomail (item) {
      this.$router.push('/app/mail/detail?fromId=' + item.fromUser.userId + '&toId=' + item.toUser.userId + '&name=' + item.fromUser.nickname)
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
        this.changePage()
      }
    },
    changePage () {
      // 取消监听器 提高性能
      if (this.more === false) {
        window.removeEventListener('scroll')
      }
      const timestamp = Date.parse(new Date())
      const _this = this
      async function getmsg (e) {
        const result = await getmsgprivate(e, timestamp)
        console.log(result)
        _this.msgs = _this.msgs.concat(result.data.msgs)
        _this.more = result.data.more
      }
      getmsg(this.page)
      this.page = this.page + 1
    }
  }
}
</script>
<style lang="less" scoped>
.msg_wrap{
    margin-top: 10px;
    margin-bottom: 10px;
    overflow: scroll;
    .msg_block{
        padding: 5px;
        .msg_img{
            border: 1px solid #ccc;
            border-radius: 20px;
        }
        .msg_detail{
            display: inline-block;
            border-bottom: 1px solid #ccc;
            padding-top: 5px;
            padding-bottom: 5px;
            padding-left: 5px;
            width: 290px;
            font-size: 14px;
            .top_slot{
                display: flex;
                justify-content: space-between;
                .user_name{
                    color:#3f70e8;
                }
                .user_time{
                    color:#ccc;
                    font-size: 12px;
                }
            }
            .user_msg{
                text-overflow: ellipsis;
                white-space: nowrap;
                overflow: hidden;
            }
        }
    }
}
  .msg_wrap::-webkit-scrollbar{
      display: none;
  }
</style>
