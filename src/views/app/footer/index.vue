<template>
    <div class="player">
      <el-slider v-model="sliderTime" @change="changeCurrentTime" class="slider" :format-tooltip="formatTooltip"></el-slider>
      <div class="playing-container">
        <audio :src="playing.musicurl" ref="audioA" autoplay=“true” @loadedmetadata='loaded' @timeupdate='updateSlider' @ended="ended"></audio>
      <!--这里判断空对象的方法 详情csdn https://blog.csdn.net/qq_18671415/article/details/105014700-->
      <el-image
      class="pic"
      :src='playing.al.picUrl'
      fit="cover"></el-image>
      <div class="song-detail">
      <div class='player-name'>{{playing.name}}</div>
      <div class='player-singer'>{{playing.ar[0].name}}</div>
      </div>
      <div class='playing-tool'>
      <div class="tool-btn" :class="[liked?'liked':'']"><i class="iconfont btn" @click="toggerLike">&#xe687;</i></div>
      <div class="tool-btn liked"><i class="iconfont btn" @click="playBefore">&#xe603;</i></div>
      <div class="tool-btn liked" v-if="!status"><i class='iconfont btn'  @click="play">&#xe618;</i></div>
      <div class="tool-btn liked" v-if="status"><i class='iconfont btn' @click="pause">&#xe632;</i></div>
      <div class="tool-btn liked"><i class="iconfont btn" @click="playAfter">&#xe602;</i></div>
      <div class="tool-btn liked" v-if="mode === 1"><i class="iconfont btn" @click="changeMode()">&#xe60f;</i></div>
      <div class="tool-btn liked" v-if="mode === 2"><i class="iconfont btn" @click="changeMode()">&#xe601;</i></div>
      <div class="tool-btn liked" v-if="mode === 3"><i class="iconfont btn" @click="changeMode()">&#xe604;</i></div>
      </div>
      <div class="list_wrap">
        <div class="vol_menu">
         <div class="vol_btn liked"><i class="iconfont btn">&#xe626;</i></div>
          <div class="vol_control">
 <el-slider v-model="vol" @input='changevol'></el-slider>
          </div>
        </div>
        <div class="list_menu">
          <div class="list_btn liked"><i class="iconfont" @click="openlist">&#xe60b;</i></div>
        </div>
      </div>
      </div>
      <div v-show="show" class="list_page">
            <div class="list_warp">
        <div class="playlist_wrap">
            <div class="list_title">播放列表</div>
            <div class="list_block">
                <div v-for="(item,index) in playingList" :key="index" class="song_wrap" @dblclick="playsong(item)">
                    <div class="song_name">{{item.name}}</div>
                    <div class="song_singer">{{item.ar[0].name}}</div>
                </div>
            </div>
            </div>
       <div class="lyrics_wrap">
           <div class="lyrics_title">{{playing.name}}</div>
           <div class="lyrics_block" id="lycBlock">
             <div v-for="(item,index) in lyric" :key="index" class="single_lys" :id="item.time">{{item.lys}}</div>
           </div>
           </div>
      </div>
    </div>
    </div>
</template>
<script>
import { getSongUrl, getlyrics } from '@/api/song.js'
import { getlikelist, toggerlike } from '@/api/user.js'
export default {
  name: 'FootPlayer',
  data () {
    return {
      // status 为1是播放状态 status为0为停止状态
      status: 0,
      sliderTime: 0,
      audio: { maxTime: '' },
      before: 0,
      afterIndex: 0,
      beforeIndex: 0,
      singerName: '',
      diasbled: false,
      step: 1,
      userID: 0,
      ids: [],
      liked: false,
      mode: 1,
      vol: 50,
      show: false,
      lyric: []
    }
  },
  created () {
    const timestamp = Date.parse(new Date())
    this.userID = JSON.parse(window.localStorage.getItem('userID'))
    this.played = JSON.parse(window.localStorage.getItem('intoPlaying'))
    const list = []
    list.push(this.played)
    this.$store.commit('publishList', list)
    this.$store.commit('intoplaying', this.played)
    getlikelist(this.userID, timestamp).then(res => {
      this.ids = res.data.ids
      // console.log(this.ids)
    })
  },
  mounted () {
    this.$nextTick(() => {
      this.$refs.audioA.volume = 0.5
    })
  },
  methods: {
    playsong (item) {
      this.$store.commit('intoplaying', item)
    },
    openlist () {
      this.show = !this.show
    },
    changevol (e) {
      this.$refs.audioA.volume = e / 100
    },
    // 将资源分为100份 并赋值给进度条的两个属性
    changeCurrentTime (index) {
      // 进度条的一份进度
      // console.log(index)
      this.$refs.audioA.currentTime = parseInt(index / 100 * this.audio.maxTime)
    },
    formatTooltip (val) {
      // console.log(this.step)
      // console.log(val)
      const num = parseInt(val / 100 * this.audio.maxTime)
      const progress = (Math.floor(num / 60)).toString() + ':' + (num - Math.floor(num / 60) * 60).toString()
      return progress
    },
    // 播放
    play () {
      this.status = 1
      this.$refs.audioA.play()
    },
    // 暂停
    pause () {
      this.status = 0
      this.$refs.audioA.pause()
    },
    // 加载完毕 通过回调函数改变图标
    loaded (res) {
      this.status = 1
      this.audio.maxTime = parseInt(res.target.duration)
      window.setInterval(() => this.con(), 1000)
      // console.log(this.audio.maxTime)
    },
    // 播放下一首
    ended () {
      switch (this.mode) {
        case 1:
          // 保证当前播放是歌单最后一首的时候 点击下一首不影响当前播放
          if (this.playing.order === (this.playingList.length - 1)) {
            this.afterIndex = this.playing.order
          } else {
            this.afterIndex = this.playing.order + 1
          }
          this.$store.commit('intoplaying', this.playingList[this.afterIndex])
          break
        case 2:
        // mode为 2随机播放
          this.afterIndex = Math.ceil(Math.random() * this.playingList.length)
          this.$store.commit('intoplaying', this.playingList[this.afterIndex])
          break
        case 3:
          this.$refs.audioA.currentTime = 0
          this.sliderTime = 0
          this.$refs.audioA.play()
      }
    },
    // 动态加载滑块进度
    updateSlider () {
      // console.log(this.sliderTime)
      // 别忘了浮点清理 浮点太多会输出nan
      // 集中处理浮点的方法 Math的ceil(向上) floor(向下) round(四舍五入) parseInt
      // 可以优化 比如保留多几位小数 会美观很多
      this.sliderTime = parseInt(parseInt(this.$refs.audioA.currentTime) * 100 / this.audio.maxTime)
    },
    // 上一首
    playBefore () {
      switch (this.mode) {
        case 1:
          // 保证当前播放是歌单最后一首的时候 点击下一首不影响当前播放
          if (this.playing.order === 0) {
            this.afterIndex = this.playing.order
          } else {
            this.afterIndex = this.playing.order - 1
          }
          this.$store.commit('intoplaying', this.playingList[this.afterIndex])
          break
        case 2:
        // mode为 2随机播放
          this.afterIndex = Math.ceil(Math.random() * this.playingList.length)
          this.$store.commit('intoplaying', this.playingList[this.afterIndex])
          break
        case 3:
          // 保证当前播放是歌单最后一首的时候 点击下一首不影响当前播放
          if (this.playing.order === 0) {
            this.afterIndex = this.playing.order
          } else {
            this.afterIndex = this.playing.order - 1
          }
          this.$store.commit('intoplaying', this.playingList[this.afterIndex])
          break
      }
    },
    // 下一首
    playAfter () {
      switch (this.mode) {
        case 1:
          // 保证当前播放是歌单最后一首的时候 点击下一首不影响当前播放
          if (this.playing.order === (this.playingList.length - 1)) {
            this.afterIndex = this.playing.order
          } else {
            this.afterIndex = this.playing.order + 1
          }
          this.$store.commit('intoplaying', this.playingList[this.afterIndex])
          break
        case 2:
        // mode为 2随机播放
          this.afterIndex = Math.ceil(Math.random() * this.playingList.length)
          this.$store.commit('intoplaying', this.playingList[this.afterIndex])
          break
        case 3:
          // 保证当前播放是歌单最后一首的时候 点击下一首不影响当前播放
          if (this.playing.order === (this.playingList.length - 1)) {
            this.afterIndex = this.playing.order
          } else {
            this.afterIndex = this.playing.order + 1
          }
          this.$store.commit('intoplaying', this.playingList[this.afterIndex])
          break
      }
    },
    // 切换喜欢
    toggerLike () {
      const timestamp = Date.parse(new Date())
      if (this.playing.liked === true) {
        toggerlike(this.playing.id, false, timestamp).then(res => {
          console.log(res)
        })
        this.playing.liked = false
        this.liked = false
      } else {
        toggerlike(this.playing.id, true, timestamp).then(res => {
          console.log(res)
        })
        this.playing.liked = true
        this.liked = true
      }
      // 重新获取一次我喜欢列表 或者用算法操作也可以
      getlikelist(this.userID, timestamp).then(res => {
        this.ids = res.data.ids
        // console.log(this.ids)
      })
    },
    // 改变播放模式
    changeMode (e) {
      // 当前mode为1
      if (this.mode === 1) {
        this.mode = 2
      } else if (this.mode === 2) {
        this.mode = 3
      } else {
        this.mode = 1
      }
    },
    // 操作dom动画 可以添加防抖等功能
    con () {
      if (this.$refs.audioA.currentTime) {
        const domID = Math.round(this.$refs.audioA.currentTime)
        const dom = document.getElementById(domID)
        if (dom) {
          dom.classList.add('playing')
          dom.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
          })
          // 上个元素移除
          dom.previousElementSibling.classList.remove('playing')
        } else {
          return false
        }
      }
    }
  },
  computed: {
    // 监听vuex中playing的变化 便于及时获取新要播放的歌曲
    playing: function () {
      // 监听没办法计次
      return this.$store.state.playing
    },
    // 想要在刷新后用在vuex为空时 本地储存中最后一次数据输出到组件中
    // 但playing为空对象的判断让我迷惑了
    // v-if="playing === Object (empty)"
    played: function () {
      return JSON.parse(window.localStorage.getItem('intoPlaying'))
    },
    playingList: function () {
      return this.$store.state.playingList
    },
    br: function () {
      return this.$store.state.br
    }
  },
  watch: {
    // 监听playing 以获取url等属性
    playing (e) {
      getSongUrl(e.id, this.br).then(res1 => {
        const url = res1.data.data[0].url
        if (url == null) {
          // 未付费时会终止音乐
          this.$message('您没有权限听这首歌哦,请在网易云官方客户端购买')
          this.diasbled = true
          this.status = 0
          this.sliderTime = 0
          this.pause()
        } else {
          this.diasbled = false
        }
        const likeId = this.ids.findIndex(v => v === e.id)
        switch (likeId) {
          case -1:
            this.liked = false
            e.liked = false
            break
          default:
            e.liked = true
            this.liked = true
        }
        // console.log(res1)
        this.$set(e, 'musicurl', url)
        if (e.album.id === undefined) {
          e.al = {}
          e.al.picUrl = 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=408198463,3915178618&fm=26&gp=0.jpg'
        }
        return e
      })
      getlyrics(e.id).then(res => {
        this.lyric = []
        const lyric = res.data.lrc.lyric
        const single = lyric.split('\n')
        let ly = { lys: '', time: '' }
        for (let i = 0; i < single.length; i++) {
          const time = single[i].slice(2, 12).split('')
          const min = time[0]
          const sec = time[2] + time[3]
          const index = time.findIndex(v => v === ']')
          ly.time = parseInt(min) * 60 + parseInt(sec)
          ly.lys = single[i].slice(index + 3, 999)
          this.lyric.push(ly)
          ly = { lys: '', time: '' }
        }
        // const reg = '/^[[0-9a-zA-Z_]*]/'
      })
      const lycBlock = document.getElementById('lycBlock')
      for (let i = 0; i < lycBlock.children.length; i++) {
        lycBlock.children[i].classList.remove('playing')
      }
    }
  }
}
</script>
<style lang="less" scoped>
.player {
  background: #fff;
  margin-left: 10px;
  position: relative;
}
.pic {
  width: 100px;
  height: 100px;
  border-radius: 20px;
}
.playing-container{
  position: relative;
}
.song-detail {
  width: 300px;
  padding-left: 110px;
  flex-direction: column;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}
.player-name {
  padding-bottom: 5px;
  white-space: nowrap;
  width: 300px;
  text-overflow: ellipsis;
  overflow: hidden;
}
.player-singer {
  font-size: 14px;
  color: #b2adab;
  width: 300px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.playing-tool {
  position: absolute;
  top: 50%;
  transform: translateY(-50px);
  width: 400px;
  padding-left: 400px;
  padding-right: 500px;
}
.tool-btn {
  display: inline-block;
  width: 20px;
  padding-top: 30px;
  padding-left: 20px;
  padding-right: 20px;
}
.btn{
  border: none;
}
.btn:hover{
  cursor: pointer;
}
.liked{
  color: red;
}
.list_wrap{
  position: absolute;
  top: 50%;
  transform: translateY(-50px);
  width: 400px;
  margin-left: 900px;
  padding-right: 200px;
  .vol_menu{
    display: inline-block;
    width: 150px;
    padding-top: 25px;
    vertical-align: top;
  .vol_btn{
    width: 20px;
    padding-right: 10px;
    display: inline-block;
    padding-top: 5px;
  }
  .vol_control{
    width: 100px;
    display: inline-block;
    vertical-align: top;
  }
  }
  .list_menu{
    display: inline-block;
    width: 150px;
    padding-top: 25px;
    vertical-align: top;
    padding-left: 20px;
    .list_btn{
        width: 20px;
        padding-top: 5px;
    }
    .list_btn:hover{
      cursor: pointer;
    }
  }
}
.list_page{
  position: absolute;
  top: -250px;
  left: 250px;
    background-color:#fff;
    width: 900px;
    height: 250px;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    border: 1px solid #ccc;
    border-bottom: none;
     .playlist_wrap{
        display: inline-block;
        width: 500px;
        padding-left: 5px;
        .list_title{
            padding-left: 5px;
            padding-top: 10px;
        }
        .list_block{
            overflow: scroll;
            height: 220px;
            padding-left: 5px;
            .song_wrap{
                padding-top: 3px;
                font-size: 15px;
                display: flex;
                .song_name{
                    flex: 7;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    white-space: nowrap;
                }
                .song_singer{
                    flex: 2;
                    vertical-align: top;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    white-space: nowrap;
                }
            }
            .song_wrap:hover{
                opacity: 65%;
                cursor: pointer;
                background-color:  #ccc;
            }
        }
        .list_block::-webkit-scrollbar{
                display: none;
            }
    }
    .lyrics_wrap{
        display: inline-block;
        width: 350px;
        vertical-align: top;
        border-left: 1px solid #ccc;
        padding-left: 5px;
        .lyrics_title{
            padding-left: 10px;
            display: flex;
            justify-content: center;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            width: 320px;
            padding-top: 10px;
        }
        .lyrics_block{
            height: 120px;
            overflow: scroll;
            font-size: 14px;
            padding-top: 50px;
            padding-bottom: 50px;
            .single_lys{
              text-align: center;
              padding: 5px;
            }
        }
        .lyrics_block::-webkit-scrollbar{
            display: none;
        }
    }
}
.playing{
  color: red;
  font-size: 16px;
}
</style>
