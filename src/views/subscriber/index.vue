<template>
    <div class="subscriber_container">
        <div class="subscriber_info">
            <div class="subscriber_icon"> <el-image
            class="subscriber_image"
      style="width: 200px; height: 200px"
      :src="profile.avatarUrl"
      :fit="cover"></el-image>
      </div>
      <div class="subscriber_detial">
          <div class="subscriber_name">{{profile.nickname}}</div>
          <div class="subscriber_menu">
              <div class="subscriber_level">Lv{{level}}</div>
              <div class="subscriber_sex">
                  <i v-if="profile.gender === 2" class="iconfont pink">&#xe615;</i>
                  <i v-else-if="profile.gender === 1" class="iconfont blue">&#xe9bf;</i>
              </div>
              <div class="subscriber_btn subsciber_dis"><div class="subscriber_btn_wrap" @click="foldmail"><i class="iconfont btn_icon">&#xe673;</i>发私信</div></div>
              <div class="subscriber_btn">
                  <div class="subscriber_btn_wrap" @click="follow(0)" v-if="profile.followed"><i class="el-icon-check btn_icon"></i>已关注</div>
            <div class="subscriber_btn_wrap" @click="follow(1)" v-else><i class="el-icon-plus btn_icon red"></i>关注</div></div>
              <div class="subscriber_listmenu" @click="slidemenu($event)"><i class="iconfont">&#xe637;</i></div>
              </div>
              <div class="subscriber_event">
                  <div class="subscriber_event_wrap no_padding"><div class="count_wrap">{{profile.eventCount}}</div><div class="cate_name">动态</div></div>
                  <div class="subscriber_event_wrap border" @click="intoFollows"><div class="count_wrap">{{profile.newFollows}}</div><div class="cate_name">关注</div></div>
                  <div class="subscriber_event_wrap" @click="intoFollowed"><div class="count_wrap">{{profile.followeds}}</div><div class="cate_name">粉丝</div></div>
              </div>
              <div class="subscriber_general">
                  <div class="signature_block">
                  <span>个人介绍: </span>
                  <div v-html="profile.signature" v-if="profile.signature" class="html subscriber_signature swap" id="signature">{{profile.signature}}</div>
                  <span v-else>暂无</span>
                  </div>
              </div>
                <div class="fold_btn" @click="fold">
                      <i class="iconfont" v-if="foldstatus">&#xe607;</i>
                      <i class="iconfont" v-else>&#xe606;</i>
                  </div>
      </div>
        <div class="songlist_wrap">
                      <div class="songlist_title">歌单 <span style="fontSize: 12px">({{userplaylist.length}})</span></div>
                      <div class="songlist_block" v-for="(item,index) in playlist" :key="index">
                              <el-image
      style="width: 180px; height: 180px"
      @click="intoplaylist(item)"
      :src="item.coverImgUrl"
      class="songlist_img"
      fit="cover"></el-image>
      <div class="songlist_name">{{item.name}}</div>
      <div class="songlist_count">{{item.trackCount}}首</div>
                      </div>
    <el-pagination
    page-size="20"
    class="pagination"
    @current-change='changePage'
  background
  :total="userplaylist.length">
</el-pagination>
                  </div>
        </div>
            <div class="subscriber_list" id="menu" style="display:none">
                  <div class="list_item">拉入黑名单</div>
                  <div class="list_item">举报</div>
              </div>
              <div class="subscriber_mail" v-if="mailcode">
                  <mail :profile='profile' @foldmenu='foldmenu'></mail>
              </div>
    </div>
</template>
<script>
import { userPlayList } from '@/api/user.js'
import { getuserdetail, followUser } from '@/api/subscriber.js'
import mail from './components/mail'
export default {
  name: 'subscriberIndex',
  data () {
    return {
      profile: {},
      level: 0,
      foldstatus: 0,
      userplaylist: [],
      playlist: [],
      userid: 0,
      mailcode: 0
    }
  },
  components: { mail },
  created () {
    this.userid = this.$route.query.id
    getuserdetail(this.$route.query.id).then(res => {
      // console.log(res)
      this.profile = res.data.profile
      this.level = res.data.level
    })
    userPlayList(this.$route.query.id, 0).then(res => {
      // console.log(res)
      this.userplaylist = res.data.playlist
      this.userplaylist[0].like = true
      this.playlist = this.userplaylist.slice(0, 20)
    })
  },
  methods: {
    slidemenu (e) {
      const menu = document.getElementById('menu')
      menu.style.top = '45px'
      menu.style.left = '770px'
      menu.style.display = 'inline-block'
      // console.log(menu.style.display)
      // 监听鼠标离开事件
      menu.addEventListener('mouseleave', function () {
        menu.style.display = 'none'
      })
    },
    foldmail () {
      switch (this.mailcode) {
        case 0:
          this.mailcode = 1
          break
        case 1:
          this.mailcode = 0
      }
    },
    fold () {
      const signature = document.getElementById('signature')
      switch (this.foldstatus) {
        case 0:
          this.foldstatus = 1
          signature.classList.remove('swap')
          break
        case 1:
          this.foldstatus = 0
          signature.classList.add('swap')
      }
    },
    changePage (e) {
      const num1 = (e - 1) * 20
      const num2 = e * 20
      this.playlist = this.userplaylist.slice(num1, num2)
    },
    intoplaylist (item) {
      this.$router.push('/app/list?id=' + item.id)
    },
    foldmenu (e) {
      this.mailcode = e
    },
    // 关注取关用户
    follow (e) {
      const timestamp = Date.parse(new Date())
      const _this = this
      const handle = async function () {
        const result = await followUser(_this.$route.query.id, e, timestamp)
        console.log(result)
      }
      handle()
      this.profile.followed = e
    },
    // 进入关注页面
    intoFollows () {
      this.$router.push('/app/follow?id=' + this.$route.query.id)
      this.$store.commit('followCount', this.profile.newFollows)
    },
    intoFollowed () {
      this.$router.push('/app/followed?id=' + this.$route.query.id)
      this.$store.commit('followCount', this.profile.followeds)
    }
  }
}
</script>
<style lang="less" scoped>
.subscriber_container{
    position: relative;
    width: 1000px;
    padding-bottom: 15%;
    padding-left: 40px;
    .subscriber_info{
        .subscriber_icon{
            width: 250px;
            display: inline-block;
        .subscriber_image{
            border-radius: 100px;
            border: 1px solid #ccc;
        }
        }
        .subscriber_detial{
            display: inline-block;
            vertical-align: top;
            .subscriber_name{
                font-weight: bold;
                font-size: 22px;
            }
            .subscriber_menu{
                padding-top: 5px;
                border-bottom: 1px solid #ccc;
                padding-bottom: 10px;
              .subscriber_level{
                  font-size: 12px;
                  background-color: #f5f5f5;
                  border-radius: 15px;
                  width: 20px;
                  padding-left: 10px;
                  padding-right: 10px;
                  display: inline-block;
              }
              .subscriber_sex{
                display: inline-block;
                padding-left: 5px;
              }
              .subsciber_dis{
                 margin-left: 220px;
              }
              .subscriber_btn{
                  font-size: 12px;
                  margin-right: 5px;
                  border: 1px solid #ccc;
                  padding: 5px;
                  padding-left: 8px;
                  padding-right: 8px;
                  width: 70px;
                  border-radius: 20px;
                  display: inline-block;
                  .subscriber_btn_wrap:hover{
                      cursor: pointer;
                      opacity: 65%;
                  }
                  .subscriber_btn_wrap{
                      display: flex;
                      justify-content: center;
                      align-items: center;
                  .btn_icon{
                      padding-right: 5px;
                      font-size: 18px;
                  }
                  }
              }
              .subscriber_listmenu{
                  font-size: 18px;
                  display: inline-block;
                  border-radius: 15px;
                  border: 1px solid #ccc;
                  padding-left: 5px;
                  padding-right: 5px;
                  z-index: 1;
              }
              .subscriber_listmenu:hover{
                  cursor: pointer;
                  background-color: #ccc;
              }
            }
            .subscriber_event{
                padding-top: 15px;
                .subscriber_event_wrap{
                    display: inline-block;
                    width: 60px;
                    padding: 20px;
                    padding-top: 5px;
                    padding-bottom: 5px;
                    .count_wrap{
                        font-weight: bold;
                        display: flex;
                        justify-content: center;
                        font-size: 20px;
                    }
                    .cate_name{
                        font-size: 14px;
                        color:#7d7e7f;
                        display: flex;
                        justify-content: center;
                    }
                }
            }
            .subscriber_general{
                font-size: 13px;
                padding-top: 10px;
                line-height: 30px;
                overflow: hidden;
                display: inline-block;
                   .signature_block{
                    width: 450px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                .subscriber_signature{
                    color: #989794;
                    margin-top: -30px;
                    margin-left: 60px;
                }
                   }
            }
                .fold_btn{
                    display: inline-block;
                    margin-top: 15px;
                    vertical-align: top;
                    padding-left: 10px;
                }
                .fold_btn:hover{
                    cursor: pointer;
                }
        }
        .songlist_wrap{
            padding-top: 30px;
            .songlist_block{
                padding-top: 20px;
                padding-bottom: 20px;
                padding-right: 10px;
                display: inline-block;
                width: 200px;
                .songlist_img{
                    border-radius: 10px;
                }
                .songlist_name{
                    font-size: 14px;
                    width: 180px;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    white-space: nowrap;
                }
                .songlist_count{
                    font-size: 14px;
                    color: #ccc
                }
            }
            .pagination{
                padding-top: 20px;
                display: flex;
                justify-content: center;
            }
        }
    }
  .subscriber_list{
    display: inline-block;
position: absolute;
font-size: 14px;
border: 1px solid #ccc;
border-radius: 5px;
z-index: 2;
background-color: #e4e9f0;
.list_item{
    width: 100px;
    padding: 5px;
}
}
.subscriber_mail{
    position: fixed;
    left: 980px;
    top: 0px;
}
}
.pink{
    color: pink;
}
.red{
    color: red;
}
.blue{
    color:#2f82f4
}
.border{
    border-left: 1px solid #ccc;
    border-right: 1px solid #ccc;
}
.html{
    white-space: pre-wrap;
}
.swap{
display: -webkit-box;
-webkit-box-orient: vertical;
-webkit-line-clamp: 1;
overflow: hidden;
margin-top: -30px;
margin-left: 60px;
}
</style>
