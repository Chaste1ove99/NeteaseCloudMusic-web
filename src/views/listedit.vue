<template>
    <div class="edit_container">
        <div class="top_bar"><router-link :to="address" style="color: #2397e5">{{playlist.name}}</router-link><span> > 编辑歌单</span></div>
        <div class="edit_detail">
                        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="auto" >
  <el-form-item label="歌单名" prop="name" style="color:black" class="name_list">
    <el-input v-model="ruleForm.name" style="color:black"></el-input>
  </el-form-item>
            </el-form>
            <div class="label_wrap">
                <span>标签 : </span>
                <div class="label_block" v-for="(item,index) in playlist.tags" :key="index">{{item}}<i class="el-icon-close delete_btn" @click="deletetag(index)"></i></div>
                <div class="tag_select">选择标签</div>
                <div class="tag_desc" style="color: #ccc">选择合适的标签 最多三个</div>
            </div>
            <div class="textarea">
                <span class="textarea_title">介绍 : </span>
                <el-input
                class="textarea_input"
  type="textarea"
  :rows="4"
  max='1000'
  placeholder="请输入内容"
  v-model="content">
</el-input>
            </div>
        </div>
        <div class="edit_img">
                <el-image
                class="edit_cover"
      style="width: 150px; height: 150px"
      :src="playlist.coverImgUrl"
      @click="changecover"
      fit="fill"></el-image>
      <div class="edit_title">更换封面</div>
        </div>
    </div>
</template>
<script>
import { getListDetail } from '@/api/songlist.js'
export default {
  name: 'editIndex',
  data () {
    return {
      playlist: {},
      address: '',
      ruleForm: {
        name: ''
      },
      rules: {
        name: [
          { required: true, message: '歌单名不能为空哦~', trigger: 'blur' },
          { min: 1, max: 20, message: '长度最大为20个字符~', trigger: 'blur' }
        ]
      },
      content: ''
    }
  },
  methods: {
    deletetag (index) {
      this.playlist.tags.splice(index, 1)
    },
    changecover () {
    }
  },
  created () {
    this.address = '/app/list?id=' + this.$route.query.id
    getListDetail(this.$route.query.id).then(res => {
      console.log(res)
      this.playlist = res.data.playlist
      this.ruleForm.name = this.playlist.name
      this.content = this.playlist.description
    })
  }
}
</script>
<style lang="less" scoped>
.edit_container{
    width: 800px;
    padding: 20px;
    .top_bar{
        font-size: 14px;
        border-bottom: 1px solid #ccc;
        padding-bottom: 10px;
        margin-bottom: 20px;
    }
    .edit_detail{
        display: inline-block;
        width: 500px;
        vertical-align: top;
        padding: 20px;
        padding-left: 0;
        font-size: 14px;
        .label_wrap{
            text-align: left;
            .label_block{
                display: inline-block;
                border: 1px solid #ccc;
                border-radius: 10px;
                padding: 5px 10px 5px 10px;
                background-color: #eeeeee;
                margin-right: 10px;
            }
            .tag_select{
                    color: #2397e5;
                    float: right;
            }
            .tag_select:hover{
                cursor: pointer;
            }
            .tag_desc{
                margin-top: 10px;
            }
        }
        .textarea{
            vertical-align: top;
            padding-top: 20px;
            .textarea_input{
                display: inline-block;
                width: 450px;
            }
            .textarea_title{
                vertical-align: top;
            }
        }
    }
    .edit_img{
        display: inline-block;
        width: 250px;
        position: relative;
        .edit_cover{
            padding: 20px;
        }
        .edit_title{
            margin-left: 20px;
            position: absolute;
            top: 150px;
            display: flex;
            width: 150px;
            justify-content: center;
            background-color: #ccc;
            opacity: 90%;
            font-size: 14px;
        }
        .edit_cover:hover{
            cursor: pointer;
        }
    }
}
.delete_btn{
    cursor: pointer;
}
</style>
