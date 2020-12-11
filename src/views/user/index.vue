<template>
    <div class="user-container">
        <div class="top-bar">账号</div>
        <div class="img-bar">
      <el-image
      class="img"
      style="width: 80px; height: 80px"
      :src="userImg"
      fit="fill"></el-image>
      <span class="nickname">{{nickname}}</span>
    <el-button icon="el-icon-edit" size="mini" class="edit-btn">编辑</el-button>
      </div>
      <div class="personal-bar">
          <div class="state"><div class="state-name">动态</div><div class="state-name">{{events.length}}</div></div>
          <div class="state"><div class="state-name" @click="intofollows">关注</div><div class="state-name">{{follows.length}}</div></div>
          <div class="state3"><div class="state-name" @click="intofollowed">粉丝</div><div class="state-name">{{followeds.length}}</div></div>
      </div>
      <div class="message-bar"><div class="message" @click="intomail">我的消息</div></div>
      <div class="message-bar"><div class="message">我的会员</div></div>
      <div class="setting-list">
          <div class="setting-bar"><div class="message" @click="dialogVisible = true">音质选择</div>
          <el-dialog
  title="音质选择"
  :visible.sync="dialogVisible"
  width="30%"
  append-to-body='true'>
  <el-form :model="form">
    <el-form-item>
    <el-radio-group v-model="form.br">
      <el-radio label="最高" style="display: block"></el-radio>
      <el-radio label="128k" style="display: block"></el-radio>
      <el-radio label="320k" style="display: block"></el-radio>
    </el-radio-group>
  </el-form-item>
      </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="changebr()">确 定</el-button>
  </span>
</el-dialog>
</div>
          <div class="setting-bar"><div class="message" @click="clear">清除缓存</div></div>
          <div class="setting-bar"><div class="message" @click="Version">关于版本</div></div>
          <div class="exit-bar"><div class="exit">退出登录</div></div>
      </div>
    </div>
</template>
<script>
import { getSubCount, getAccount, getFollows, getFolloweds, getEvent } from '@/api/user.js'
export default {
  name: 'UserIndex',
  data () {
    return {
      follows: [],
      followeds: [],
      events: [],
      nickname: '',
      userImg: '',
      userId: 0,
      dialogVisible: false,
      form: { br: '320k' },
      br: 320000
    }
  },
  created () {
    const timestamp = Date.parse(new Date())
    this.userId = window.localStorage.getItem('userID')
    getSubCount().then(res => {
      console.log(res)
    })
    getAccount().then(res => {
      console.log(res)
      this.nickname = res.data.profile.nickname
      this.userImg = res.data.profile.avatarUrl
    })
    getFollows(localStorage.getItem('userID'), timestamp).then(res => {
      this.follows = res.data.follow
    })
    getFolloweds(localStorage.getItem('userID'), timestamp).then(res => {
      this.followeds = res.data.followeds
    })
    getEvent(localStorage.getItem('userID')).then(res => {
      this.events = res.data.events
    })
  },
  methods: {
    intomail () {
      this.$router.push('/app/mail')
    },
    Version () {
      alert('当前版本号1.31,页面基于VUE 2.0和Element UI搭建,WEB制作者@https://gitee.com/Chastelove,目前存在BUG较多')
    },
    clear () {
      alert('您已清空所有缓存数据 等待页面刷新')
      window.localStorage.removeItem('ListID')
      window.localStorage.removeItem('userID')
      window.localStorage.removeItem('playing')
      window.localStorage.removeItem('user')
      window.localStorage.removeItem('intoPlaying')
      this.$router.push('/mobileLogin')
    },
    intofollows () {
      this.$router.push('/app/follow?id=' + this.userId)
    },
    intofollowed () {
      this.$router.push('/app/followed?id=' + this.userId)
    },
    // 改变音质
    changebr () {
      this.dialogVisible = false
      switch (this.form.br) {
        case '320k':
          this.br = 320000
          break
        case '128k':
          this.br = 128000
          break
        case '最高':
          this.br = 990000
      }
      this.$store.commit('changeBr', this.br)
    }
  }
}
</script>
<style scoped>
.top-bar {
  display: flex;
  align-items: center;
  justify-content: center;
}
.user-container {
    width: 1250px;
    position: fixed;
  width: 550px;
  border-right: 1px solid #cccccc;
  height: 100%;
}
.img {
  border-radius: 40px;
}
.img-bar {
  padding-left: 15px;
  margin-top: 25px;
  padding-bottom: 20px;
  border-bottom: 1px solid #cccccc;
}
.nickname {
  display: inline-block;
  position: relative;
  top: -35px;
  left: 15px;
}
.edit-btn {
    float: right;
    display: inline-block;
    position: relative;
    top: 28px;
    margin-right: 10px;
}
.state {
    margin-top: 10px;
    display: inline-block;
    width: 180px;
    border-right: 1px solid #cccccc;
}
.state-name {
    text-align: center;
}
.state:hover {
  cursor: pointer;
  opacity: 65%;
}
.state3:hover{
  cursor: pointer;
  opacity: 65%;
}
.state3 {
    padding-top: 10px;
    display: inline-block;
    width: 180px;
}
.personal-bar {
    border-bottom: 8px solid #F0EDEC ;
}
.message {
    padding-left: 15px;
    display: inline-block;
    vertical-align: middle;
    position: relative;
    top: 50%;
    transform: translateY(-50%);
}
.message-bar {
   height: 40px;
   border-bottom: 8px solid #F0EDEC;
}
.setting-bar {
    height: 50px;
    border-bottom: 1px solid #cccccc;
}
.exit {
    display: flex;
    justify-content: center;
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    color: red;
}
.exit-bar {
    border-top: 7px solid #F0EDEC;
    height: 50px;
    border-bottom: 100px solid #F0EDEC;
}
</style>
