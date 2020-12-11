<template>
    <div class="mail_wrap">
        <div class="mail_top">
            <div class="top_msg">消息</div>
            <div class="top_btn">一键已读</div>
        </div>
        <div class="mail_menu">
            <div class="mail_btn" style="display: inline-block" @click="intomsg" :class="active===1?'active':''">私信</div>
            <div class="mail_btn" style="display: inline-block" :class="active===2?'active':''" @click="intocomt">评论</div>
            <div class="mail_btn" style="display: inline-block" :class="active===3?'active':''" @click="intomy">@我</div>
            <div class="mail_btn" style="display: inline-block" :class="active===4?'active':''" @click="intonotice">通知</div>
        </div>
        <div class="mail_router">
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
export default {
  name: 'mailwrapIndex',
  data () {
    return {
      active: 1
    }
  },
  methods: {
    intomsg () {
      this.active = 1
    },
    intocomt () {
      this.active = 2
    },
    intomy () {
      this.active = 3
    },
    intonotice () {
      this.active = 4
    }
  }
}
</script>
<style lang="less" scoped>
.mail_wrap{
    width: 350px;
    padding: 20px;
    padding-bottom: 15%;
    border-right: 1px solid #ccc;
    .mail_top{
        display: flex;
        justify-content: space-between;
        .top_msg{
            font-size: 20px;
        }
        .top_btn{
            font-size: 16px;
            color: #1e6ef0;
        }
        .top_btn:hover{
            cursor: pointer;
            font-weight: bold;
        }
    }
    .mail_menu {
        margin-top: 10px;
        border: 1px solid #ccc;
        border-radius: 20px;
        .mail_btn{
            box-sizing: border-box;
            width: 25%;
            padding: 3px;
            padding-left: 20px;
            padding-right: 20px;
            text-align: center;
        }
        .mail_btn:hover{
            opacity: 65%;
            border: 1px solid #ccc;
            border-radius: 20px;
            cursor: pointer;
            background-color: #e9eaec;
            border-top: none;
            border-bottom: none;
        }
        .active {
            background-color: #515356;
            opacity: 65%;
            border-radius: 20px;
            cursor: pointer;
            color:#fff
        }
    }
    .mail_router{
    }
}
</style>
