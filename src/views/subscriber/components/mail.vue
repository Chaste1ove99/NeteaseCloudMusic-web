<template>
    <div class="mail-container">
        <div class="return_menu"><i class="iconfont" @click="closemenu">&#xe611;</i>返回<span class="nickname">{{profile.nickname}}</span></div>
        <div class="text_wrap" id='wrap'>
          <div v-if="more" @click="getmore" class="more_info">查看过去消息</div>
            <div v-for="(item,index) in newmsgs" :key="index" class="text_block">
                <div v-if="item.fromUser.nickname === profile.nickname" class="user_msg">
                        <el-image
                        class="user_icon"
      style="width: 40px; height: 40px"
      :src="item.fromUser.avatarUrl"
      fit="cover"></el-image>
                    <div class="user_title">{{JSON.parse(item.msg).msg}}</div></div>
                <div v-else class="my_msg">{{JSON.parse(item.msg).msg}}</div>
            </div>
        </div>
        <div class="text_input">
            <el-input
  type="textarea"
  placeholder='请输入内容...'
  :rows="4"
  v-model="content">
</el-input>
<div class="input_btn" @click="pushmsg">发送</div>
        </div>
    </div>
</template>
<script>
import { sendtext, getPrivateHistory } from '@/api/subscriber.js'
export default {
  name: 'mailIndex',
  data () {
    return {
      newmsgs: [],
      userid: 0,
      content: '',
      more: false,
      before: 0,
      timeout: null
    }
  },
  props: ['profile'],
  created () {
    this.userid = this.$route.query.id
    this.newmsgs[0] = { time: '' }
    const timestamp = Date.parse(new Date())
    const _this = this
    async function getoldmsg () {
      const result = await getPrivateHistory(_this.userid, 0, timestamp)
      const length = result.data.msgs.length
      _this.before = result.data.msgs[length - 1].time
      // reverse会改变原数组,所以这里reverse一次就可以 每次循环都只reverse一次
      if (_this.newmsgs[0].time === result.data.msgs.reverse()[0].time) {
        return false
      } else {
        // 第一次要清空原始数组
        _this.newmsgs = []
        _this.newmsgs = _this.newmsgs.concat(result.data.msgs)
      }
      _this.more = result.data.more
    }
    getoldmsg()
    // 设置定时器 每三秒执行一次防抖函数 三秒发送一次请求
    window.setInterval(() => this.debounce(this.getMsg(0), 3000), 3000)
  },
  methods: {
    sendmsg (msg) {
      this.timeout = null
      const timestamp = Date.parse(new Date())
      const _this = this
      async function sendmail () {
        const result = await sendtext(_this.userid, timestamp, msg)
        console.log(result)
        // 因为借口高频BUG暂时没法继续开发
        // 这里的思路是将发送的信息元素直接添加到数组中 并且添加返回数据中相应的时间戳
      }
      try {
        sendmail()
        this.getMsg(0)
      } catch (error) {
        this.$message(error)
      }
    },
    // 获取私信内容
    getMsg (e) {
      this.timeout = null
      const timestamp = Date.parse(new Date())
      const _this = this
      async function getoldmsg () {
        const result = await getPrivateHistory(_this.userid, e, timestamp)
        const lengthA = result.data.msgs.length
        const lengthB = _this.newmsgs.length
        // reverse会改变原数组,所以这里reverse一次就可以 每次循环都只reverse一次
        if (_this.newmsgs[lengthB - 1].time === result.data.msgs.reverse()[lengthA - 1].time) {
          return false
        } else {
          const index = result.data.msgs.findIndex(v => v.time === _this.newmsgs[lengthB - 1].time)
          // console.log(index)
          if (index === -1) {
            _this.newmsgs = _this.newmsgs.concat(result.data.msgs)
          } else if (index === lengthA - 2) {
            // const message = result.data.msgs.slice(index + 1, lengthA).push(result.data.msgs[lengthA])
            // console.log(message)
            _this.newmsgs.push(result.data.msgs[lengthA - 1])
            // console.log(_this.newmsgs)
          } else {
            const message = result.data.msgs.slice(index + 1, lengthA - 1)
            message.push(result.data.msgs[lengthA - 1])
            _this.newmsgs = _this.newmsgs.concat(message)
          }
          // _this.newmsgs = _this.newmsgs.concat(result.data.msgs)
        }
      }
      getoldmsg()
    },
    pushmsg () {
      const wrap = document.getElementById('wrap')
      this.sendmsg(this.content)
      wrap.scrollTo(0, 999)
      this.content = ''
    },
    closemenu () {
      this.$emit('foldmenu', 0)
    },
    // 防抖 本质是个闭包结构
    debounce (fn, wait) {
      return function () {
        if (this.timeout !== null) {
          clearTimeout(this.timeout)
        }
        this.timeout = setTimeout(fn, wait)
      }
    },
    getmore () {
      this.timeout = null
      const timestamp = Date.parse(new Date())
      const _this = this
      async function getoldmsg () {
        const result = await getPrivateHistory(_this.userid, _this.before, timestamp)
        const length = result.data.msgs.length
        _this.before = result.data.msgs[length - 1].time
        // reverse会改变原数组,所以这里reverse一次就可以 每次循环都只reverse一次
        // 肯定是获取新数据 没必要判断
        _this.newmsgs = result.data.msgs.reverse().concat(_this.newmsgs)
        _this.more = result.data.more
      }
      try {
        getoldmsg()
      } catch (error) {
        this.$message(error)
      }
    }
  },
  destroyed () {
    clearTimeout(this.timeout)
  }
}
</script>
<style lang="less" scoped>
.mail-container{
    padding: 5px;
    padding-top: 30px;
    border-left: 1px solid #ccc;
    height: 100vh;
    width: 300px;
    border-right: 1px solid #ccc;
  .return_menu{
      padding-bottom: 10px;
      .nickname{
       padding-left: 60px;
      }
  }
  .text_wrap::-webkit-scrollbar{
      display: none;
  }
  .text_wrap{
      padding: 5px;
      overflow: scroll;
      height: 380px;
      .more_info{
        font-size: 14px;
        display: flex;
        justify-content: center;
        opacity: 65%;
        cursor: pointer;
      }
      .text_block{
          margin-bottom: 10px;
          position: relative;
          font-size: 14px;
          overflow: hidden;
          .user_msg{
            left: 0;
            position: relative;
            .user_icon{
            border-radius: 20px;
            }
            .user_title{
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                background-color: #ccc;
                padding: 5px;
                border-radius: 8px;
                display: inline-block;
                margin-left: 10px;
                max-width: 200px;
            }
          }
          .my_msg{
              float: right;
            right: 0;
            color: #fff;
            background-color: red;
            padding: 5px;
            border-radius: 8px;
            max-width: 200px;
          }
      }
  }
  .text_input{
    position: fixed;
    top: 440px;
    width: 300px;
    overflow: hidden;
    .input_btn{
        margin-top: 5px;
        padding: 5px 10px 5px 10px;
        border: 1px solid #ccc;
        font-size: 14px;
        border-radius: 12px;
        float: right;
    }
    .input_btn:hover{
        cursor: pointer;
        opacity: 65%;
    }
  }
}
</style>
