<template>
    <div class="mail-container">
        <div class="return_menu"><i class="iconfont" @click="closemenu">&#xe611;</i>返回<span class="nickname">{{profile.nickname}}</span></div>
        <div class="text_wrap" id='wrap'>
            <div v-for="(item,index) in newmsgs" :key="index" class="text_block">
                <div v-if="item.fromUser.nickname == profile.nickname" class="user_msg">
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
import { sendtext } from '@/api/subscriber.js'
export default {
  name: 'mailIndex',
  data () {
    return {
      newmsgs: [],
      userid: 0,
      content: ''
    }
  },
  props: ['profile'],
  created () {
    this.userid = this.$route.query.id
    this.sendmsg()
    // 设置防抖
    window.setInterval(this.debounce(this.snedmsg(), 5000), 1000)
  },
  methods: {
    sendmsg (msg) {
      const timestamp = Date.parse(new Date())
      const _this = this
      async function sendmail () {
        const result = await sendtext(_this.userid, timestamp, msg)
        // console.log(result.data)
        console.log(_this.newmsgs === result.data.newMsgs.reverse())
        if (_this.newmsgs === result.data.newMsgs.reverse()) {
          return false
        } else {
          console.log('123')
          _this.newmsgs = result.data.newMsgs.reverse()
        }
      }
      sendmail()
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
    // 防抖
    debounce (fn, wait) {
      var timeout = null // 初始化定时器
      return function () {
        if (timeout !== null) {
          clearTimeout(timeout)
        }
        timeout = setTimeout(fn, wait)
      }
    }
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
