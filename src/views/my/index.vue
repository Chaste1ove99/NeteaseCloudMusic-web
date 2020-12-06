<template>
    <div class="user">
            <div class="header">我的</div>
            <div class="function-list">
            <div class="item"><icon class="el-icon-cloudy icon"></icon><span>我的音乐云盘</span></div>
            <div class="item"><icon class="el-icon-headset icon"></icon><span>我的电台</span></div>
            <div class="item-bottom"><icon class="el-icon-star-off icon"></icon><span>我的收藏</span></div>
            </div>
            <div class="songlist">
                <div class="top"><span class='create-list'>我创建的歌单</span><el-button icon="el-icon-plus" circle class='list-btn'></el-button></div>
                <div class="list" v-for="(item,index) in playlist" :key="index" @click="intolist(item, index)">
              <el-image
              class="image"
             :src="item.coverImgUrl"
            fit="fill"></el-image>
                    <div class="listname">{{item.name}}</div>
                    <div class="clear"></div>
                    <div class="listtotal">{{item.trackCount}}首</div>
                    <div class="clear"></div>
                    </div>
            </div>
    </div>
</template>
<script>
import { userPlayList } from '@/api/user.js'
export default {
  name: 'MyIndex',
  data () {
    return {
      userID: 0,
      playlist: [],
      ids: []
    }
  },
  created () {
    userPlayList(localStorage.getItem('userID')).then(res => {
      console.log(res)
      this.playlist = res.data.playlist
      this.playlist[0].name = '我喜欢的音乐'
    })
  },
  methods: {
    intolist (item, index) {
      if (index === 0) {
        localStorage.setItem('ListID', item.id)
        this.$router.push('/app/my/likelist')
      } else {
        this.$router.push('/app/list?id=' + item.id)
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
    width: 1250px;
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
</style>
