<template>
    <div class="FindPage">
          <div class="option">
            <el-menu :default-active.sync="$route.path" class="el-menu-demo menu" mode="horizontal" router>
              <!--缩放时存在bug 会异常换行--> <!--通过设置页面宽度解决-->
  <el-menu-item index="1" class="item">推荐</el-menu-item>
  <el-menu-item index="2" class="item">歌单</el-menu-item>
  <el-menu-item index="3" class="item">电台</el-menu-item>
  <el-menu-item index="4" class="item">排行榜</el-menu-item>
  <el-menu-item index="5" class="item">新歌</el-menu-item>
   <div class="search-bar">
  <el-autocomplete
  v-model="search"
  :fetch-suggestions="querySearchAsync"
  placeholder="搜索内容"
  class="search"
></el-autocomplete>
   <el-button icon="el-icon-search" class='search-btn' circle @click="handleSearch"></el-button>
  </div>
</el-menu>
        </div>
        <div class="main"><router-view></router-view></div>
    </div>
</template>
<script>
import { searchAdvice } from '@/api/get.js'
// import { getSongUrl } from '@/api/song.js'
export default {
  name: 'FindIndex',
  data () {
    return {
      search: '',
      searchSuggest: [],
      timeout: null,
      suggest: [],
      advice: { value: '' }
    }
  },
  methods: {
    querySearchAsync (queryString, callback) {
      this.searchSuggest = []
      // if (typeof queryString === Number) {
      // queryString = queryString.toString()
      // }
      searchAdvice(queryString).then(res => {
        const { result } = res.data
        // console.log(result)
        // 别忘了清空
        if (result.songs) {
          for (let i = 0; i < result.songs.length; i++) {
            // console.log(result.songs[i])
            this.searchSuggest.push(result.songs[i])
          }
        }
        if (result.albums) {
          for (let i = 0; i < result.albums.length; i++) {
            // console.log(result.albums[i])
            this.searchSuggest.push(result.albums[i])
          }
        }
        if (result.artists) {
          for (let i = 0; i < result.artists.length; i++) {
            // console.log(result.artists[i])
            this.searchSuggest.push(result.artists[i])
          }
        }
        if (result.playlists) {
          for (let i = 0; i < result.playlists.length; i++) {
            this.searchSuggest.push(result.playlists[i])
          }
        }
        this.suggest = []
        const results = this.searchSuggest
        // console.log(results)
        // 利用新的对象建立value属性 再把这些对象加入到数组里面去
        for (let i = 0; i < results.length; i++) {
          this.advice.value = results[i].name
          this.suggest.push(this.advice)
          this.advice = { value: '' }
        }
        // 防抖 清除之前的timeout
        clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
          callback(this.suggest)
        }, 1000)
      })
    },
    // 搜索
    handleSearch () {
      if (this.search === '') {
        this.$message('您还没输入内容哦')
      } else {
        this.$router.push('/app/result/song?query=' + this.search)
      }
    }
  }
}
</script>
<style scoped>
.menu{
  display: flex;
  width: 1250px;
  padding-left: 100px;
}
.item{
  flex: 1;
  display: flex;
  justify-content: center;
}
.search-bar{
  margin-left: 50px;
  flex: 3;
}
.icon {
  border: none;
}
.search {
  border-radius: 5px;
  width: 250px;
  position: relative;
}
.main {
  margin-top: 10px;
  flex: 3;
}
.option {
  flex: 1;
}
.FindPage{
  display: flex;
  flex-direction: column;
}
.search-btn{
  border: none;
  position: absolute;
  margin-right: 20px;
}
</style>
