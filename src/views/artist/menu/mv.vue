<template>
    <div class="mv_wrap">
        <div v-for="(item, index) in mvList" :key="index" class="single-mv">
              <el-image
              class="item-image"
      style="width: 160px; height: 90px"
      :src="item.imgurl16v9"
      @click="intomv(item)"
      fit="cover"></el-image>
      <div class="item-name">{{item.name}}</div>
        </div>
    </div>
</template>
<script>
import { getArtistMV } from '@/api/artist.js'
export default {
  name: 'ArtistMvIndex',
  data () {
    return {
      mvList: []
    }
  },
  created () {
    getArtistMV(this.$route.query.id).then(res => {
      this.mvList = res.data.mvs
    })
  },
  methods: {
    intomv (item) {
      this.$router.push('/app/mvplayer?id=' + item.id)
    }
  }
}
</script>
<style lang="less" scoped>
.item-name{
font-size: 18px;
display: inline-block;
vertical-align: top;
padding: 2px 0 2px 5px;
text-overflow: ellipsis;
overflow: hidden;
white-space: nowrap;
width: 520px;
}
.item-image{
display: inline-block;
}
.item-image:hover{
display: inline-block;
cursor: pointer;
}
</style>
