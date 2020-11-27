<template>
    <div class='songlist'>
        <div class='header'>精选歌单</div>
            <div class="choose"><el-button type="text" class="btn" @click="changetag('华语')">华语</el-button><el-button type="text" class="btn" @click="changetag('华语')">流行</el-button>
            <el-button type="text" class="btn" @click="changetag('摇滚')">摇滚</el-button><el-button type="text" class="btn" @click="changetag('民谣')">民谣</el-button>
            <el-button type="text" class="btn" @click="changetag('电子')">电子</el-button><el-button class="btn" round icon="el-icon-search" @click="dialogVisible = true">选择分类</el-button>
            <el-dialog
  :visible.sync="dialogVisible"
  class="dialog"
  width="1200px">
    <el-button @click="dialogVisible = false" class="top-bar">全部歌单</el-button>
    <div class="cate"><div class="cate-tag"><img  src="@/assets/icon/1.png" class="cate-img"><div class="title">语种</div></div>
  <div class="cate-block"><el-button class="cate-btn" @click="changetag('华语')">华语</el-button>
  <el-button class="cate-btn" @click="changetag('欧美')">欧美</el-button>
  <el-button class="cate-btn" @click="changetag('日语')">日语</el-button>
  <el-button class="cate-btn" @click="changetag('韩语')">韩语</el-button>
  <el-button class="cate-btn" @click="changetag('粤语')">粤语</el-button>
  </div></div>
     <div class="cate"><div class="cate-tag"><img  src="@/assets/icon/2.png" class="cate-img"><div class="title">风格</div></div>
  <div class="cate-block"><div>
    <el-button class="cate-btn" @click="changetag('流行')" >流行</el-button>
  <el-button class="cate-btn" @click="changetag('摇滚')">摇滚</el-button>
  <el-button class="cate-btn" @click="changetag('民谣')">民谣</el-button>
  <el-button class="cate-btn" @click="changetag('电子')">电子</el-button>
  <el-button class="cate-btn" @click="changetag('舞曲')">舞曲</el-button>
  <el-button class="cate-btn" @click="changetag('说唱')">说唱</el-button>
  <el-button class="cate-btn" @click="changetag('轻音乐')">轻音乐</el-button>
  <el-button class="cate-btn" @click="changetag('爵士')">爵士</el-button>
  <el-button class="cate-btn" @click="changetag('乡村')">乡村</el-button>
  <el-button class="cate-btn" @click="changetag('R&B/Soul')">R&B/Soul</el-button>
  <el-button class="cate-btn" @click="changetag('古典')">古典</el-button>
    <el-button class="cate-btn" @click="changetag('民族')">民族</el-button>
  </div>
  <div>
    <el-button class="cate-btn" @click="changetag('英伦')">英伦</el-button>
  <el-button class="cate-btn" @click="changetag('金属')">金属</el-button>
  <el-button class="cate-btn" @click="changetag('朋克')">朋克</el-button>
  <el-button class="cate-btn" @click="changetag('蓝调')">蓝调</el-button>
  <el-button class="cate-btn" @click="changetag('雷鬼')">雷鬼</el-button>
  <el-button class="cate-btn" @click="changetag('世界音乐')" >世界音乐</el-button>
  <el-button class="cate-btn" @click="changetag('拉丁')">拉丁</el-button>
  <el-button class="cate-btn" @click="changetag('New Age')">New Age</el-button>
  <el-button class="cate-btn" @click="changetag('古风')">古风</el-button>
  <el-button class="cate-btn" @click="changetag('后摇')">后摇</el-button>
  <el-button class="cate-btn" @click="changetag('Bossa Nova')">Bossa Nova</el-button>
  </div>
  </div></div>
     <div class="cate"><div class="cate-tag"><img  src="@/assets/icon/3.png" class="cate-img"><div class="title">场景</div></div>
  <div class="cate-block"><el-button class="cate-btn" @click="changetag('清晨')" >清晨</el-button>
  <el-button class="cate-btn" @click="changetag('夜晚')">夜晚</el-button>
  <el-button class="cate-btn" @click="changetag('学习')">学习</el-button>
  <el-button class="cate-btn" @click="changetag('工作')">工作</el-button>
  <el-button class="cate-btn" @click="changetag('午休')">午休</el-button>
  <el-button class="cate-btn" @click="changetag('地铁')">地铁</el-button>
  <el-button class="cate-btn" @click="changetag('驾车')">驾车</el-button>
  <el-button class="cate-btn" @click="changetag('运动')">运动</el-button>
  <el-button class="cate-btn" @click="changetag('酒吧')">酒吧</el-button>
  <el-button class="cate-btn" @click="changetag('旅行')">旅行</el-button>
  <el-button class="cate-btn" @click="changetag('散步')">散步</el-button>
    <el-button class="cate-btn" @click="changetag('下午茶')">下午茶</el-button>
  </div></div>
     <div class="cate"><div class="cate-tag"><img  src="@/assets/icon/4.png" class="cate-img"><div class="title">情感</div></div>
  <div class="cate-block"><el-button class="cate-btn"  >怀旧</el-button>
  <el-button class="cate-btn" >清新</el-button>
  <el-button class="cate-btn" >浪漫</el-button>
  <el-button class="cate-btn" >伤感</el-button>
  <el-button class="cate-btn" >治愈</el-button>
  <el-button class="cate-btn" >放松</el-button>
  <el-button class="cate-btn" >孤独</el-button>
  <el-button class="cate-btn" >感动</el-button>
  <el-button class="cate-btn" >兴奋</el-button>
  <el-button class="cate-btn" >快乐</el-button>
  <el-button class="cate-btn" >安静</el-button>
  <el-button class="cate-btn" >思念</el-button>
  </div></div>
</el-dialog></div>
      <div class="list-block">
  <div class="song-list" v-for="(item, index) in playlist" :key="index" @click="intolist(item)">
      <el-image
      class="image"
      :src="playlist[index].coverImgUrl"
      fit="fill"></el-image>
      <div class="decoration">{{ playlist[index].name }}</div>
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
    intolist (cate) {
      this.$router.push('/app/list?id=' + cate.id)
      this.$store.commit('getListID', cate.id)
    }
  }
}
</script>
<style lang="less" scoped>
 .list-block{
   padding-top: 20px;
 }
  .songlist {
  margin-left: 10px;
  padding-bottom: 20%;
  overflow: hidden;
  }
  .song-list{
  width: 15%;
  display: inline-block;
  padding: 10px;
  vertical-align: top;
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
.decoration {
  display: -webkit-box;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
.choose{
  display: inline-block;
  float: right;
}
.btn{
  font-size: 14px;
  font-family: 'DFKai-SB';
  color: grey;
  margin-right: 20px;
}
.dialog{
  display: flex;
  flex-direction: column;
}
.cate{
  flex: 1;
  padding: 10px;
}
.toAll-btn{
  flex: 1;
}
.cate-block{
  display: inline-block;
  vertical-align: top;
  padding: 10px;
}
.cate-tag{
  display: inline-block;
}
.title{
  text-align: center;
}
.style-block{
  display: inline-block;
}
</style>
