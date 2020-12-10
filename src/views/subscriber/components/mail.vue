<template>
    <div class="mail-container" v-loading='loading'>
        <div class="return_menu"><i class="iconfont" @click="closemenu">&#xe611;</i>返回<span class="nickname">{{profile.nickname}}</span></div>
        <div class="text_wrap" id='wrap' ref='wrap'>
          <div v-if="more" @click="getmore" class="more_info">查看过去消息</div>
            <div v-for="(item,index) in newmsgs" :key="index" class="text_block" :id="index">
                <div v-if="item.fromUser.userId === profile.userId" class="user_msg">
                        <el-image
                        class="user_icon"
      style="width: 40px; height: 40px"
      :src="item.fromUser.avatarUrl"
      fit="cover"></el-image>
                    <div class="user_title">{{JSON.parse(item.msg).msg}}</div>
                </div>
                <div v-else-if="item.toUser.userId === profile.userId" class="my_msg">{{JSON.parse(item.msg).msg}}</div>
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
      loading: false,
      n: 0
    }
  },
  props: ['profile'],
  mounted () {
    // 在mounted获取数据才能操作dom
    this.loading = true
    this.userid = this.$route.query.id
    this.newmsgs[0] = { time: '' }
    const timestamp = Date.parse(new Date())
    const _this = this
    async function getoldmsg () {
      const result = await getPrivateHistory(_this.userid, 0, timestamp)
      const length = result.data.msgs.length
      if (length > 0) {
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
      } else {
        _this.newmsgs = []
        return false
      }
    }
    getoldmsg()
    // 设置定时器 每三秒执行一次防抖函数 三秒发送一次请求
    window.setInterval(() => this.debounce(this.getMsg(0), 3000), 3000)
    this.$nextTick(() => {
      const wrap = this.$refs.wrap
      // console.log(wrap.scrollHeight)
      // 这里获取到scrollHeight为390 其实是容器的高
      // 对比发现这里的v-for dom其实没渲染 缺少解决办法
      // 目前的方法是通过loading过渡 避免视觉上的瑕疵
      function endloading () {
        wrap.scrollBy(0, 999)
        _this.loading = false
      }
      setTimeout(() => endloading(), 1000)
    })
  },
  methods: {
    sendmsg (msg) {
      this.debounce(this.getMsg(0), 3000)
      const timestamp = Date.parse(new Date())
      const wrap = document.getElementById('wrap')
      const _this = this
      async function sendmail () {
        const result = await sendtext(_this.userid, timestamp, msg)
        // console.log(result)
        // 视觉上存在一点BUG 发送消息后默认数据被隐藏
        const lengthB = _this.newmsgs.length
        // 再次防抖
        if (_this.newmsgs[lengthB - 1].time === result.data.newMsgs[0].time) {
          return false
        } else {
          _this.newmsgs.push(result.data.newMsgs[0])
        }
        // 由于vue异步更新dom 等待dom更新后再下拉到底
        _this.$nextTick(() => {
          wrap.scrollBy(0, 9999)
          // console.log(wrap.scrollHeight)
        })
        // 这里的思路是将发送的信息元素直接添加到数组中 并且添加返回数据中相应的时间戳
      }
      try {
        sendmail()
      } catch (error) {
        this.$message(error)
      }
    },
    // 获取私信内容
    getMsg (e) {
      const timestamp = Date.parse(new Date())
      const _this = this
      const wrap = document.getElementById('wrap')
      async function getoldmsg () {
        const result = await getPrivateHistory(_this.userid, e, timestamp)
        const lengthA = result.data.msgs.length
        const lengthB = _this.newmsgs.length
        // 如果聊天记录为空
        if (result.data.msgs.length > 0) {
        // reverse会改变原数组,所以这里reverse一次就可以 每次循环都只reverse一次
          if (_this.newmsgs[lengthB - 1].time === result.data.msgs.reverse()[lengthA - 1].time) {
            return false
          } else {
            const index = result.data.msgs.findIndex(v => v.time === _this.newmsgs[lengthB - 1].time)
            // console.log(index)
            if (index === -1) {
              _this.newmsgs = _this.newmsgs.concat(result.data.msgs)
              // slice方法限制 分两种情况
            } else if (index === lengthA - 2) {
              // const message = result.data.msgs.slice(index + 1, lengthA).push(result.data.msgs[lengthA])
              // console.log(message)
              _this.newmsgs.push(result.data.msgs[lengthA - 1])
              _this.$nextTick(() => {
                wrap.scrollBy(0, 9999)
              })
              // console.log(_this.newmsgs)
            } else {
              const message = result.data.msgs.slice(index + 1, lengthA - 1)
              message.push(result.data.msgs[lengthA - 1])
              _this.newmsgs = _this.newmsgs.concat(message)
              _this.$nextTick(() => {
                wrap.scrollBy(0, 9999)
              })
            }
          }
          // _this.newmsgs = _this.newmsgs.concat(result.data.msgs)
        } else if (result.data.msgs.length === 0) {
          return false
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
    // 防抖
    debounce (fn, wait) {
      var timeout = null
      return function () {
        if (this.timeout !== null) {
          clearTimeout(timeout)
        }
        timeout = setTimeout(fn, wait)
      }
    },
    getmore () {
      this.debounce(this.getMsg(0), 3000)
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
          overflow: hidden;
          font-size: 14px;
          margin-top: 10px;
          .user_msg{
            float: left;
            position: relative;
            .user_icon{
            border-radius: 20px;
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            }
            .user_title{
                background-color: #ccc;
                padding: 5px;
                border-radius: 8px;
                margin-left: 50px;
                max-width: 200px;
            }
          }
          .my_msg{
            float: right;
            display: block;
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
