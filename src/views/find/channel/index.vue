<template>
    <div class="channel-container">
      <div class="paylist">
          <el-carousel interval=6000 type="card" height="400px" class="carousel">
    <el-carousel-item v-for="(item, index) in paylist" :key="index">
      <el-image
      class="paylist-pic"
      :src="item.picUrl"
      fit="scale-down"></el-image>
      <div class="decoration">{{item.name}}</div>
    </el-carousel-item>
       </el-carousel>
      </div>
      <div class="catelist">
        <div class="cate" v-for="(item, index) in categories" :key='index'>
           <el-image
           class="cate-icon"
      style="width: 40px; height: 40px"
      :src="item.pic56x56Url"
      fit="fill"></el-image><div class="cate-name">{{item.name}}</div>
        </div>
      </div>
      <div class="hotlist">
        <div class="hotlist-title">热门电台</div>
        <div class="hotlist-block" v-for="(item, index) in djRadios" :key="index">
          <el-image
           class="hotlist-icon"
      style="width: 200px; height: 200px"
      :src="item.picUrl"
      fit="fill"></el-image><div>{{item.name}}</div>
        </div>
      </div>
      <div>
   <el-pagination
  class="page-change"
  :page-size='size'
  @current-change='changePage'
  :current-page="currentPage1"
  :total="804">
       </el-pagination>
      </div>
    </div>
</template>
<script>
import { gethotChannel, getcatelist, getpaygift } from '@/api/channel.js'
export default {
  name: 'ChannelIndex',
  data () {
    return {
      categories: [],
      paylist: [],
      djRadios: [],
      currentPage1: 1,
      size: 20
    }
  },
  created () {
    gethotChannel(0).then(res => {
      this.djRadios = res.data.djRadios
      for (let i = 0; i < this.djRadios.length; i++) {
        if (this.djRadios[i].name.length > 10) {
          this.djRadios[i].name = this.djRadios[i].name.slice(0, 10) + '...'
        }
      }
    })
    getcatelist().then(res => {
      // console.log(res)
      this.categories = res.data.categories
    })
    getpaygift().then(res => {
      // console.log(res)
      this.paylist = res.data.data.list
    })
  },
  methods: {
    changePage (page) {
      const newPage = page - 1
      gethotChannel(newPage).then(res => {
        console.log(res)
        this.djRadios = res.data.djRadios
        for (let i = 0; i < this.djRadios.length; i++) {
          if (this.djRadios[i].name.length > 10) {
            this.djRadios[i].name = this.djRadios[i].name.slice(0, 10) + '...'
          }
        }
      })
    }
  }
}
</script>
<style scoped>
 .channel-container{
  width: 1100px;
  margin-left: 10px;
  margin-bottom: 10%;
 }
 .cate {
   display: inline-block;
   width: 150px;
   padding: 15px;
   position: relative;
   height: 80px;
 }
 .cate-name {
   top: 50%;
   position: absolute;
   left: 50%;
   transform: translateX(-50%)
 }
 .cate-icon {
    position: absolute;
   left: 50%;
   transform: translateX(-50%);
   padding-bottom: 100px;
 }
 .catelist {
   margin-top: -20px;
   margin-bottom: 20px;
 }
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
  .paylist {
  padding-left:20px;
  margin-left:3px;
  margin-bottom: 20px;
  }
  .hotlist {
  padding-left:20px;
  margin-left:3px;
  margin-bottom: 40px;
  }
  .hotlist-block {
    display: inline-block;
    width: 210px;
    padding-bottom: 10px;
    padding-top: 20px;
  }
  .page-change {
    display: block;
    text-align: center;
  }
</style>
