<template>
    <div class="allMV-container">
          <div class="choice">
            <div class="area">
              <div class="bar">地区:</div>
              <el-radio-group v-model="area" @change="changeArea">
      <el-radio-button label="全部" class="btn"></el-radio-button>
      <el-radio-button label="内地" class="btn"></el-radio-button>
      <el-radio-button label="港台" class="btn"></el-radio-button>
      <el-radio-button label="欧美" class="btn"></el-radio-button>
      <el-radio-button label="韩国" class="btn"></el-radio-button>
      <el-radio-button label="日本" class="btn"></el-radio-button>
    </el-radio-group>
            </div>
            <div class="type">
              <div class="bar">类型:</div >
               <el-radio-group v-model="type" @change="changeType">
      <el-radio-button label="全部" class="btn"></el-radio-button>
      <el-radio-button label="官方版" class="btn"></el-radio-button>
      <el-radio-button label="原声" class="btn"></el-radio-button>
      <el-radio-button label="现场版" class="btn"></el-radio-button>
      <el-radio-button label='网易出品' class="btn"></el-radio-button>
    </el-radio-group>
            </div>
            <div class="order">
              <div class="bar">排序:</div>
             <el-radio-group v-model="order" @change="changeOrder">
      <el-radio-button label="上升最快" class="btn"></el-radio-button>
      <el-radio-button label="最热" class="btn"></el-radio-button>
      <el-radio-button label="最新" class="btn"></el-radio-button>
    </el-radio-group>
            </div>
          </div>
          <div class="container">
          <div class="demo-image">
  <div class="block list3" v-for="(item, index) in mv" :key="index">
      <el-image
      class="image"
      :src="mv[index].cover"
      fit="fill"></el-image>
       <span class="demonstration decoration artfont2">{{ mv[index].name }}</span>
       <p class="demonstration decoration artfont1" style="clear:both">{{ mv[index].artistName }}</p>
  </div>
          </div>
          </div>
          <div class="pagination">
            <el-pagination
  class="page"
  :page-size='size'
  @current-change='changePage'
  :current-page.sync="currentPage"
  :total="Sum">
</el-pagination>
          </div>
    </div>
</template>
<script>
import { getAllMV } from '@/api/mv.js'
export default {
  name: 'allMVIndex',
  data () {
    return {
      area: '全部',
      type: '全部',
      order: '上升最快',
      mv: [],
      size: 20,
      currentPage: 1,
      pageNum: 0
    }
  },
  methods: {
    changePage (page) {
      this.pageNum = page + 1
      getAllMV(this.area, this.type, this.order, this.pageNum).then(res => {
        // console.log(res)
        this.mv = res.data.data
        for (let i = 0; i < this.mv.length; i++) {
          if (this.mv[i].name.length > 20) {
            this.mv[i].name = this.mv[i].name.slice(0, 19) + '...'
          }
        }
      })
    },
    changeArea (newArea) {
      getAllMV(newArea, this.type, this.order, 0).then(res => {
        // console.log(res)
        this.Sum = res.data.count
        this.mv = res.data.data
        for (let i = 0; i < this.mv.length; i++) {
          if (this.mv[i].name.length > 20) {
            this.mv[i].name = this.mv[i].name.slice(0, 19) + '...'
          }
        }
      })
    },
    changeType (newType) {
      getAllMV(this.area, newType, this.order, 0).then(res => {
        // console.log(res)
        this.Sum = res.data.count
        this.mv = res.data.data
        for (let i = 0; i < this.mv.length; i++) {
          if (this.mv[i].name.length > 20) {
            this.mv[i].name = this.mv[i].name.slice(0, 19) + '...'
          }
        }
      })
    },
    changeOrder (newOrder) {
      getAllMV(this.area, this.type, newOrder, 0).then(res => {
        // console.log(res)
        this.Sum = res.data.count
        this.mv = res.data.data
        for (let i = 0; i < this.mv.length; i++) {
          if (this.mv[i].name.length > 20) {
            this.mv[i].name = this.mv[i].name.slice(0, 19) + '...'
          }
        }
      })
    }
  },
  created () {
    getAllMV('全部', '全部', '上升最快', 0).then(res => {
      // console.log(res)
      this.mv = res.data.data
      this.Sum = res.data.count
      for (let i = 0; i < this.mv.length; i++) {
        if (this.mv[i].name.length > 20) {
          this.mv[i].name = this.mv[i].name.slice(0, 19) + '...'
        }
      }
    })
  }
}
</script>
<style scoped>
.allMV-container{
   margin-left: 30px;
   width: 1200px;
   margin-bottom: 15%;
}
.choice {
  border-bottom: 1px solid #dbd3d2;
}
.btn{
  border: false;
}
.bar {
  display: inline-block;
  margin-right: 20px;
}
.area {
  margin-bottom: 10px;
}
.type {
  margin-bottom: 10px;
}
.order {
  margin-bottom: 20px;
}
.container {
  margin-top: 20px;
}
.list3 {
  display: inline-block;
  width: 240px;
  height: 180px;
  padding-right: 15px;
  padding-top: 15px;
  padding-bottom: 10px;
}
.artfont1 {
  font-family: 'DFKai-SB';
  color: grey;
  font-size: 12px;
}
.artfont2 {
  display: inline;
  font-size: 12px;
}
.pagination {
  display: flex;
  margin-top: 50px;
  justify-content: center;
  align-items: center;
  margin-right: 150px;
}
</style>
