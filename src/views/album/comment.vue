<template>
    <div class="comment_container">
      <div class="text_wrap">
    <el-tiptap
      v-model='content'
      :extensions='extensions'
      placeholder="留下你的评论 …"
    ></el-tiptap>
    <el-button class='comt_btn' round>评论</el-button>
  </div>
  <div class="hotComment_wrap" v-if="hotComments.length > 0">
    <span  style="font-weight: bold">精彩评论</span>
    <div v-for="(item,index) in hotComments" :key="index" class="Comment_block">
      <div class="Comment_icon">
        <el-image
        class="Comment_img"
      style="width: 50px; height: 50px"
      :src="item.user.avatarUrl"
      fit="cover"></el-image></div>
      <div class="Comment_detail">
        <div class="Comment_content"><a>{{item.user.nickname}}: </a><span>{{item.content}}</span></div>
        <div class="Comment_reply" v-if="item.beReplied.length > 0"><a>@{{item.beReplied[0].user.nickname}}: </a><span>{{item.beReplied[0].content}}</span></div>
          <div class="Comment_menu">11:11</div>
      </div>
    </div>
    </div>
  <div class="lateComment_wrap">
    <span style="font-weight: bold">最近评论</span>
        <div v-for="(item,index) in comments" :key="index" class="lateComment_block">
      <div class="lateComment_icon">
        <el-image
        class="lateComment_img"
      style="width: 60px; height: 60px"
      :src="item.user.avatarUrl"
      fit="cover"></el-image></div>
      <div class="lateComment_detail">
        <div class="lateComment_content"><a>{{item.user.nickname}}: </a><span>{{item.content}}</span></div>
        <div class="lateComment_reply" v-if="item.beReplied.length > 0"><a>@{{item.beReplied[0].user.nickname}}: </a><span>{{item.beReplied[0].content}}</span></div>
          <div class="lateComment_menu">11:11</div>
      </div>
    </div>
    </div>
    </div>
</template>
<script>
import { getAlbumComment } from '@/api/song.js'
import { Doc, Text, Paragraph, Heading, Bold, Underline, Italic, Strike, ListItem, BulletList, OrderedList } from 'element-tiptap'
export default {
  name: 'AlbumCommentIndex',
  data () {
    return {
      content: '',
      extensions: [
        new Doc(),
        new Text(),
        new Paragraph(),
        new Heading({ level: 5 }),
        new Bold({ bubble: true }), // 在气泡菜单中渲染菜单按钮
        new Underline({ bubble: true, menubar: false }), // 在气泡菜单而不在菜单栏中渲染菜单按钮
        new Italic(),
        new Strike(),
        new ListItem(),
        new BulletList(),
        new OrderedList()
      ],
      hotComments: [],
      comments: []
    }
  },
  methods: {},
  created () {
    getAlbumComment(this.$route.query.id, 0).then(res => {
      console.log(res)
      this.hotComments = res.data.hotComments
      this.comments = res.data.comments
    })
  }
}
</script>
<style lang="less" scoped>
.comment_container{
  padding-bottom: 15%;
  .text_wrap{
    padding: 10px;
    overflow: hidden;
    .comt_btn{
      float: right;
      margin-top: 10px;
    }
  }
  .hotComment_wrap{
    padding: 20px;
    .Comment_block{
      padding: 10px;
      font-size: 14px;
      .Comment_icon{
        padding-right: 10px;
        display: inline-block;
        .Comment_img{
          border-radius: 30px;
        }
      }
      .Comment_detail{
        width: 570px;
        display: inline-block;
        vertical-align: top;
        .Comment_reply{
          background-color: #ccc;
        }
      }
    }
  }
  .lateComment_wrap{
    padding: 20px;
      .lateComment_block{
      padding: 10px;
      font-size: 14px;
      .lateComment_icon{
        padding-right: 10px;
        display: inline-block;
        .lateComment_img{
          border-radius: 30px;
        }
      }
      .lateComment_detail{
        width: 570px;
        display: inline-block;
        vertical-align: top;
        .lateComment_reply{
          background-color: #ccc;
        }
      }
    }
  }
}
</style>
