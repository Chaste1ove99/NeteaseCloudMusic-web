<template>
    <div class="user">
            <div class="header">我的</div>
            <div class="function-list">
            <div class="item"><icon class="el-icon-cloudy icon"></icon><span>我的音乐云盘</span></div>
            <div class="item"><icon class="el-icon-headset icon"></icon><span>我的电台</span></div>
            <div class="item-bottom"><icon class="el-icon-star-off icon"></icon><span>我的收藏</span></div>
            </div>
            <div class="songlist">
                <div class="top"><span class='create-list'>我创建的歌单</span>
                <el-button icon="el-icon-plus" circle class='list-btn' @click="addlist"></el-button>
                                    <el-dialog
  title="输入歌单名"
  :visible.sync="visible"
  width="30%">
  <el-input v-model="content"></el-input>
  <span slot="footer" class="dialog-footer">
        <el-button @click.stop="addconfirm(false)">取 消</el-button>
    <el-button type="primary" @click.stop="addconfirm(true)">确 定</el-button>
  </span>
                                    </el-dialog>
                <el-button icon="el-icon-edit" circle class="list-btn" @click="editlist"></el-button>
                </div>
                <div class="list" v-for="(item,index) in playlist" :key="index" @click="intolist(item, index)">
              <el-image
              class="image"
             :src="item.coverImgUrl"
            fit="fill"></el-image>
                    <div class="listname">{{item.name}}</div>
                    <div class="clear"></div>
                    <div class="listtotal">{{item.trackCount}}首</div>
                    <div class="clear"></div>
                    <div class="delete_btn" v-show="code && index !== 0" @click.stop='todelete(item, index)'>删除</div>
                    <el-dialog
  title="提示"
  :visible.sync="dialogVisible"
  width="30%">
  <span>您确定要删除吗</span>
  <span slot="footer" class="dialog-footer">
    <el-button @click.stop="confirm(false)">取 消</el-button>
    <el-button type="primary" @click.stop="confirm(true)">确 定</el-button>
  </span>
</el-dialog>
                    </div>
            </div>
    </div>
</template>
<script>
import { deletelist, cretalist } from '@/api/songlist.js'
import { userPlayList } from '@/api/user.js'
export default {
  name: 'MyIndex',
  data () {
    return {
      userID: 0,
      playlist: [],
      ids: [],
      code: 0,
      dialogVisible: false,
      deleteid: 0,
      deleteindex: 0,
      visible: false,
      content: ''
    }
  },
  created () {
    const timestamp = Date.parse(new Date())
    userPlayList(localStorage.getItem('userID'), 0, timestamp).then(res => {
      console.log(res)
      this.playlist = res.data.playlist
      this.playlist[0].name = '我喜欢的音乐'
    })
  },
  methods: {
    intolist (item, index) {
      if (index === 0) {
        this.$router.push('/app/my/likelist?id=' + item.id)
      } else {
        this.$router.push('/app/list?id=' + item.id)
      }
    },
    editlist () {
      switch (this.code) {
        case 1:
          this.code = 0
          break
        case 0:
          this.code = 1
      }
    },
    todelete (item, index) {
      this.dialogVisible = true
      this.deleteid = item.id
      this.deleteindex = index
    },
    confirm (bol) {
      this.dialogVisible = !bol
      switch (bol) {
        case true:
          deletelist(this.deleteid).then(res => {
            this.$message('删除成功')
          })
          this.playlist.splice(this.deleteindex, 1)
          break
        case false:
          this.dialogVisible = false
      }
    },
    addlist () {
      this.visible = true
    },
    addconfirm (bol) {
      switch (bol) {
        case true:
          cretalist(this.content).then(res => {
            console.log(res)
            this.content = ''
            this.visible = false
            this.playlist.push(res.data.playlist)
          })
          break
        case false:
          this.visible = false
      }
    }
  }
}
</script>
<style scoped>
  .item {
    margin-top: 5px;
    border: 0.5px solid #D6D2D1 ;
    border-top: none;
    border-left: none;
    border-right: none;
    height: 50px;
  }
  .item-bottom {
    margin-top: 5px;
    border: 8px solid #F0EDEC  ;
    border-top: none;
    border-left: none;
    border-right: none;
    height: 50px;
  }
  .user{
    width: 850px;
  }
  .header{
    text-align: center;
    margin-bottom: 30px;
  }
  .function-list {
    margin-left: 45px;
  }
  .icon {
    padding: 10px;
  }
  .songlist {
    margin-left: 45px;
    margin-top: 15px;
  }
  .create-list {
      font-size: 20px;
      font-weight: bold;
  }
  .list-btn {
    float: right;
    border: none;
  }
  .list {
    display: block;
    padding-bottom: -20px;
    position: relative;
  }
  .top {
    margin-bottom: 10px;
  }
  .image {
    width: 70px;
    height: 70px;
  }
  .listname {
    display: inline-block;
    position: relative;
    top: -40px;
    padding-left: 10px;
  }
  .listtotal {
    position: relative;
    display: inline-block;
    padding-top: 10px;
    float: left;
    top: -15px;
    left: 82px;
  }
  .clear {
    clear: both;
    margin-top: -30px;
  }
  .delete_btn {
    display: inline-block;
    position: absolute;
    left: 600px;
    top: 50%;
    transform: translateY(-50%);
    border-radius: 15px;
    padding: 5px 20px 5px 20px;
    border: 1px solid red;
    background-color: red;
    color: #fff;
  }
  .delete_btn:hover{
    cursor: pointer;
    opacity: 65%;
  }
</style>
