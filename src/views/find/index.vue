<template>
    <div class="FindPage">
          <div class="option">
            <el-menu :default-active.sync="$route.path" class="el-menu-demo menu" mode="horizontal" router>
              <!--缩放时存在bug 会异常换行--> <!--通过设置页面宽度解决-->
  <el-menu-item index="1" class="item1">推荐</el-menu-item>
  <el-menu-item index="2" class="item2">歌单</el-menu-item>
  <el-menu-item index="3" class="item3">电台</el-menu-item>
  <el-menu-item index="4" class="item4">排行榜</el-menu-item>
  <el-menu-item index="5" class="item5">新歌</el-menu-item>
   <div class="search-bar">
  <el-autocomplete
  v-model="search"
  :fetch-suggestions="querySearchAsync"
  placeholder="搜索内容"
  class="search"
  @select="handleSelect"
></el-autocomplete>
   <el-button icon="el-icon-mic" class="icon" circle></el-button>
  </div>
</el-menu>
        </div>
        <div class="main"><router-view></router-view></div>
    </div>
</template>
<script>
import { searchAdvice } from '@/api/get.js'
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
        const result = res.data.result
        // 别忘了清空
        if (result.songs) {
          for (let i = 0; i < result.songs.length; i++) {
            console.log(result.songs[i])
            this.searchSuggest.push(result.songs[i])
          }
        }
        if (result.albums) {
          for (let i = 0; i < result.albums.length; i++) {
            console.log(result.albums[i])
            this.searchSuggest.push(result.albums[i])
          }
        }
        if (result.artists) {
          for (let i = 0; i < result.artists.length; i++) {
            console.log(result.artists[i])
            this.searchSuggest.push(result.artists[i])
          }
        }
        this.suggest = []
        const results = this.searchSuggest
        console.log(results)
        // 利用新的对象建立value属性 再把这些对象推入到数组里面去
        for (let i = 0; i < results.length; i++) {
          this.advice.value = results[i].name
          this.suggest.push(this.advice)
          this.advice = { value: '' }
        }
        clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
          callback(this.suggest)
        }, 3000 * Math.random())
      })
    }
  }
}
</script>
<style scoped>
.item1 {
  left: 20%;
}
.item2 {
  left: 24%;
}
.item3 {
  left: 28%;
}
.item4 {
  left: 32%;
}
.item5 {
  left: 36%;
}
.search-bar {
  left: 80%;
  float: right;
  width: 250px;
  margin: 10px 25px 0 0;
}
.icon {
    border: none;
}
.search {
    border-radius: 5px;
}
.main {
  margin-top: 10px;
}
.FindPage {
  width: 1150px;
}
.option {
  height: 100px;
}
</style>
