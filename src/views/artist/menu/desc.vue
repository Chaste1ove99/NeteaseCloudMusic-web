<template>
    <div class="desc_wrap">
        <div class="simi-artists_wrap">
            <div>相似歌手</div>
            <div class="simi-artist" v-for="(item, index) in simiArtists" :key="index"  @click="toArtist(index)">
                <el-image
              class="item-image"
      style="width: 100px; height: 100px"
      :src="item.picUrl"
      fit="cover"></el-image>
      <div class="item-name">{{item.name}}</div>
            </div>
        </div>
        <div class="artist-desc_wrap">
            <div class="brief_desc_wrap">
                <div>{{artistName}}简介</div>
                <p>{{briefDesc}}</p>
            </div>
            <div class="introduction_wrap">
                <div v-for="(item ,index) in introduction" :key="index" class="single-introduction">
                    <div>{{item.ti}}</div>
                    <p v-html="item.txt" class="txt">{{item.txt}}</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { getSimiArtist, getArtistDesc } from '@/api/artist.js'
export default {
  name: 'ArtistDescIndex',
  props: ['artistName'],
  data () {
    return {
      simiArtists: [],
      briefDesc: '',
      introduction: []
    }
  },
  methods: {
    toArtist (index) {
      const id = this.simiArtists[index].id
      this.$emit('toggle', this.simiArtists[index])
      this.$router.push('/app/artist/hotsong?id=' + id)
    }
  },
  created () {
    getSimiArtist(this.$route.query.id).then(res => {
      this.simiArtists = res.data.artists
    })
    getArtistDesc(this.$route.query.id).then(res => {
      console.log(res)
      this.briefDesc = res.data.briefDesc
      this.introduction = res.data.introduction
    })
  }
}
</script>
<style lang="less" scoped>
.simi-artists_wrap{
  white-space: nowrap;
  overflow: scroll;
  padding-bottom: 10px;
  .simi-artist{
    display: inline-block;
  }
}
.txt {
  white-space: pre-wrap;
}
.item-name{
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    font-size: 14px;
}
</style>
