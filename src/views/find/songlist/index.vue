<template>
    <div class='songlist' ref='top'>
        <div class='header'>精选歌单</div>
            <div class="choose"><el-button type="text" class="btn" @click="changetag('华语')">华语</el-button><el-button type="text" class="btn" @click="changetag('华语')">流行</el-button>
            <el-button type="text" class="btn" @click="changetag('摇滚')">摇滚</el-button><el-button type="text" class="btn" @click="changetag('民谣')">民谣</el-button>
            <el-button type="text" class="btn" @click="changetag('电子')">电子</el-button><el-button class="btn" round icon="el-icon-search" @click="dialogVisible = true">选择分类</el-button>
            <el-dialog
  :visible.sync="dialogVisible"
  width="1200px">
    <el-button @click="dialogVisible = false" class="top-bar">全部歌单</el-button>
    <div class="yuyan"><div class="yuyan-img"><img  src="@/assets/icon/1.png"><div class="title">语种</div></div>
  <div class="yuyan-block"><el-button class="yuyan-btn" @click="changetag('华语')">华语</el-button>
  <el-button class="yuyan-btn" @click="changetag('欧美')">欧美</el-button>
  <el-button class="yuyan-btn" @click="changetag('日语')">日语</el-button>
  <el-button class="yuyan-btn" @click="changetag('韩语')">韩语</el-button>
  <el-button class="yuyan-btn" @click="changetag('粤语')">粤语</el-button>
  </div></div>
     <div class="yuyan"><div class="style-img"><img  src="@/assets/icon/2.png"><div class="title">风格</div></div>
  <div class="style-block"><div><el-button class="yuyan-btn" @click="changetag('流行')" >流行</el-button>
  <el-button class="yuyan-btn" @click="changetag('摇滚')">摇滚</el-button>
  <el-button class="yuyan-btn" @click="changetag('民谣')">民谣</el-button>
  <el-button class="yuyan-btn" @click="changetag('电子')">电子</el-button>
  <el-button class="yuyan-btn" @click="changetag('舞曲')">舞曲</el-button>
  <el-button class="yuyan-btn" @click="changetag('说唱')">说唱</el-button>
  <el-button class="yuyan-btn" @click="changetag('轻音乐')">轻音乐</el-button>
  <el-button class="yuyan-btn" @click="changetag('爵士')">爵士</el-button>
  <el-button class="yuyan-btn" @click="changetag('乡村')">乡村</el-button>
  <el-button class="yuyan-btn" @click="changetag('R&B/Soul')">R&B/Soul</el-button>
  <el-button class="yuyan-btn" @click="changetag('古典')">古典</el-button>
  <el-button class="yuyan-btn" @click="changetag('民族')">民族</el-button>
  <el-button class="yuyan-btn" @click="changetag('英伦')">英伦</el-button>
  </div><div>
  <el-button class="yuyan-btn" @click="changetag('金属')">金属</el-button>
  <el-button class="yuyan-btn" @click="changetag('朋克')">朋克</el-button>
  <el-button class="yuyan-btn" @click="changetag('蓝调')">蓝调</el-button>
  <el-button class="yuyan-btn" @click="changetag('雷鬼')">雷鬼</el-button>
  <el-button class="yuyan-btn" @click="changetag('世界音乐')" >世界音乐</el-button>
  <el-button class="yuyan-btn" @click="changetag('拉丁')">拉丁</el-button>
  <el-button class="yuyan-btn" @click="changetag('New Age')">New Age</el-button>
  <el-button class="yuyan-btn" @click="changetag('古风')">古风</el-button>
  <el-button class="yuyan-btn" @click="changetag('后摇')">后摇</el-button>
  <el-button class="yuyan-btn" @click="changetag('Bossa Nova')">Bossa Nova</el-button>
  </div>
  </div></div>
     <div class="yuyan"><div class="yuyan-img"><img  src="@/assets/icon/3.png"><div class="title">场景</div></div>
  <div class="yuyan-block"><el-button class="yuyan-btn" @click="changetag('清晨')" >清晨</el-button>
  <el-button class="yuyan-btn" @click="changetag('夜晚')">夜晚</el-button>
  <el-button class="yuyan-btn" @click="changetag('学习')">学习</el-button>
  <el-button class="yuyan-btn" @click="changetag('工作')">工作</el-button>
  <el-button class="yuyan-btn" @click="changetag('午休')">午休</el-button>
  <el-button class="yuyan-btn" @click="changetag('地铁')">地铁</el-button>
  <el-button class="yuyan-btn" @click="changetag('驾车')">驾车</el-button>
  <el-button class="yuyan-btn" @click="changetag('运动')">运动</el-button>
  <el-button class="yuyan-btn" @click="changetag('酒吧')">酒吧</el-button>
  <el-button class="yuyan-btn" @click="changetag('旅行')">旅行</el-button>
  <el-button class="yuyan-btn" @click="changetag('散步')">散步</el-button>
    <el-button class="yuyan-btn" @click="changetag('下午茶')">下午茶</el-button>
  </div></div>
     <div class="yuyan"><div class="yuyan-img"><img  src="@/assets/icon/4.png"><div class="title">情感</div></div>
  <div class="yuyan-block"><el-button class="yuyan-btn"  >怀旧</el-button>
  <el-button class="yuyan-btn" >清新</el-button>
  <el-button class="yuyan-btn" >浪漫</el-button>
  <el-button class="yuyan-btn" >伤感</el-button>
  <el-button class="yuyan-btn" >治愈</el-button>
  <el-button class="yuyan-btn" >放松</el-button>
  <el-button class="yuyan-btn" >孤独</el-button>
  <el-button class="yuyan-btn" >感动</el-button>
  <el-button class="yuyan-btn" >兴奋</el-button>
  <el-button class="yuyan-btn" >快乐</el-button>
  <el-button class="yuyan-btn" >安静</el-button>
  <el-button class="yuyan-btn" >思念</el-button>
  </div></div>
</el-dialog></div>
      <div class="demo-image">
  <div class="block list1" v-for="(item, index) in playlist" :key="index" @click="intolist(item)">
      <el-image
      class="image"
      :src="playlist[index].coverImgUrl"
      fit="fit"></el-image>
      <span class="demonstration decoration">{{ playlist[index].name }}</span>
  </div>
  </div>
  <el-pagination
  class="page"
  :page-size='size'
  @current-change='changePage'
  :current-page.sync="currentPage"
  :total="Sum">
</el-pagination>
    </div>
</template>
<script>
import { getAllList, getCatList } from '@/api/songlist.js'
export default {
  name: 'SongListIndex',
  data () {
    return {
      playlist: [],
      Sum: 0,
      size: 48,
      str: '',
      currentPage: 1,
      dialogVisible: false
    }
  },
  created () {
    getAllList(0).then(res => {
      this.playlist = res.data.playlists
      this.Sum = res.data.total
      // console.log(res)
    })
    getCatList().then(res => {
      console.log(res)
    })
  },
  methods: {
    changePage (page) {
      const pageNum = page - 1
      getAllList(pageNum, this.str).then(res => {
        console.log(res)
        this.playlist = res.data.playlists
      })
    },
    changetag (str) {
      this.str = str
      getAllList(0, str).then(res => {
        this.playlist = res.data.playlists
        this.Sum = res.data.total
        this.currentPage = 1
        this.dialogVisible = false
      })
    },
    intolist (item) {
      this.$router.push('/app/list?id=' + item.id)
      this.$store.commit('getListID', item.id)
    }
  }
}
</script>
<style lang="less" scoped>
  .songlist {
    width: 1300px;
    margin-left: 10px;
    margin-bottom: 20%;
  }
  .list1 {
    display: inline-block;
  width: 180px;
  height: 240px;
  padding: 15px;
  }
  .header {
  padding-left:20px;
  margin-left:3px;
  margin-top: -20px;
  display: inline-block;
}
.page {
  margin-top: 50px ;
  text-align: center;
}
.decoration{
  font-size: 15px;
  float: left;
}
.choose{
    float: right;
    margin-right: 70px;
    height: 22px;
    margin-top: -10px;
}
.btn{
  font-size: 14px;
  font-family: 'DFKai-SB';
  color: grey;
  margin-right: 20px;
}
.top-bar {
  width: 1150px;
  margin-bottom: -10px;
}
.yuyan {
  margin-top: 5px;
}
.yuyan-block {
  display: inline-block;
}
.yuyan-btn {
  margin-top: 20px;
}
.yuyan-img {
  display: inline-block;
  margin-right: 20px;
  position: relative;
  top:20px;
}
.style-img {
  top: 45%;
  position: absolute;
}
.style-block {
  display: inline-block;
  margin-left: 69px;
}
.title {
  margin-left: 10px;
}
</style>
