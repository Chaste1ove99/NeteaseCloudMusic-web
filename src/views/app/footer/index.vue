<template>
    <div class="player">
      <el-slider v-model="sliderTime" @change="changeCurrentTime" class="slider"></el-slider>
      <div class="playing-container">
      <audio v-if="Object.keys(playing).length == 0" :src="played.musicurl" ref="audioA" autoplay=“true”
      @loadedmetadata='loaded' @timeupdate='updateSlider'>
      </audio>
      <audio v-else :src="playing.musicurl" ref="audioB" autoplay=“true” @loadedmetadata='loaded' @timeupdate='updateSlider'></audio>
      <!--这里判断空对象的方法 详情csdn https://blog.csdn.net/qq_18671415/article/details/105014700-->
      <el-image
      v-if="Object.keys(playing).length == 0"
      class="pic"
      :src='played.picUrl'
      fit="fill"></el-image>
        <el-image
      v-else
      class="pic"
      :src='playing.picUrl'
      fit="fill"></el-image>
      <div class="song-detail">
      <div class='player-name' v-if="Object.keys(playing).length == 0">{{played.name}}</div>
      <div class='player-name' v-else>{{playing.name}}</div>
      <div class='player-singer' v-if="Object.keys(playing).length == 0">{{played.singer}}</div>
      <div class='player-singer' v-else>{{playing.singer}}</div>
      </div>
      <div class="blank-box1"></div>
      <div class='playing-tool'>
      <div class="tool-btn" v-if="Object.keys(playing).length == 0" ><el-button v-if="played.like" @click="togger"  circle class='btn' icon="el-icon-star-on"/><el-button v-else @click="togger" circle class='btn1' icon="el-icon-star-off"/></div>
      <div class="tool-btn" v-else ><el-button v-if="playing.like" circle class='btn'  @click="togger" icon="el-icon-star-on"/><el-button v-else @click="togger" circle class='btn1' icon="el-icon-star-off"/></div>
      <div class="tool-btn"><el-button circle class='btn' icon="el-icon-arrow-left" @click="playBefore"></el-button></div>
      <div class="tool-btn" v-if="!status"><el-button circle class='btn'  icon="el-icon-video-play" @click="play" :disabled.sync='diasbled'></el-button></div>
      <div class="tool-btn" v-if="status"><el-button  circle class='btn' icon="el-icon-video-pause" @click="pause"></el-button></div>
      <div class="tool-btn"><el-button circle class='btn' icon='el-icon-arrow-right' @click="playAfter"></el-button></div>
      <div class="tool-btn"><el-button circle class='btn' icon='el-icon-top'></el-button></div>
      </div>
      <div class="blank-box2"></div>
      </div>
    </div>
</template>
<script>
import { getSongUrl } from '@/api/song.js'
import { toggerlike } from '@/api/user.js'
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
      diasbled: false
    }
  },
  created () {
  },
  methods: {
    // 将资源分为100份 并赋值给进度条的两个属性
    changeCurrentTime (index) {
      // 进度条的一份进度
      if (this.$refs.audioA) {
        this.$refs.audioA.currentTime = parseInt(index / 100 * this.audio.maxTime)
      } else {
        this.$refs.audioB.currentTime = parseInt(index / 100 * this.audio.maxTime)
      }
    },
    // 播放
    play () {
      this.status = 1
      if (this.$refs.audioA) {
        this.$refs.audioA.play()
      } else {
        this.$refs.audioB.play()
      }
    },
    // 暂停
    pause () {
      this.status = 0
      if (this.$refs.audioA) {
        this.$refs.audioA.pause()
        // console.log(this.$refs.audioA.currentTime)
        // console.log(this.sliderTime)
      } else {
        this.$refs.audioB.pause()
        // console.log(this.$refs.audioB.currentTime)
        // console.log(this.sliderTime)
      }
    },
    // 加载完毕 通过回调函数改变图标
    loaded (res) {
      this.status = 1
      this.audio.maxTime = parseInt(res.target.duration)
      // console.log(this.audio.maxTime)
    },
    // 动态加载滑块进度
    updateSlider () {
      // console.log(this.sliderTime)
      // 别忘了浮点清理 浮点太多会输出nan
      // 集中处理浮点的方法 Math的ceil(向上) floor(向下) round(四舍五入) parseInt
      // 可以优化 比如保留多几位小数 会美观很多
      if (this.$refs.audioA) {
        this.sliderTime = parseInt(parseInt(this.$refs.audioA.currentTime) * 100 / this.audio.maxTime)
      } else {
        this.sliderTime = parseInt(parseInt(this.$refs.audioB.currentTime) * 100 / this.audio.maxTime)
      }
    },
    // 上一首
    playBefore () {
      if (this.playing.index === 0) {
        this.beforeIndex = this.playing.index
      } else {
        this.beforeIndex = this.playing.index - 1
      }
      this.$store.commit('intoplaying', this.playingList[this.beforeIndex])
    },
    // 下一首
    playAfter () {
      // 保证当前播放是歌单最后一首的时候 点击下一首不影响当前播放
      if (this.playing.index === (this.playingList.length - 1)) {
        this.afterIndex = this.playing.index
      } else {
        this.afterIndex = this.playing.index + 1
      }
      this.$store.commit('intoplaying', this.playingList[this.afterIndex])
    },
    // 喜欢与取消喜欢
    togger () {
      if (Object.keys(this.playing).length === 0) {
        toggerlike(this.played.id, !this.played.like).then(res => {
          console.log(res)
          this.played.like = !this.played.like
        })
      } else {
        toggerlike(this.playing.id, !this.playing.like).then(res => {
          console.log(res)
          this.playing.like = !this.playing.like
        })
      }
      // 如果当前页面是在当前歌单点了收藏 要重新获取一次歌单
      // 这里的问题是要保存播放器进度 所以不能刷新
      this.$store.commit('refresh', 0)
    }
  },
  mounted () {
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
    }
  },
  watch: {
    // 监听playing 以获取url等属性
    playing (e) {
      getSongUrl(e.id).then(res1 => {
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
        this.$set(e, 'musicurl', url)
        this.$set(e, 'picUrl', e.al.picUrl)
        this.singerName = e.ar[0].name
        for (let i = 1; i < e.ar.length; i++) {
          this.singerName += '/'
          this.singerName += e.ar[i].name
        }
        this.$set(e, 'singer', this.singerName)
        return e
      })
    }
  }
}
</script>
<style scoped>
.blank-box1{
  flex: 4;
}
.blank-box2{
  flex: 6;
}
.player {
  background: #fff;
  margin-left: 10px;
}
.pic {
  width: 100px;
  border-radius: 20px;
}
.playing-container {
  display: flex;
}
.song-detail {
  width: 300px;
  padding-left: 10px;
  display: flex;
  justify-content: center;
  flex-direction: column;
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
  width: 600px;
  display: flex;
  align-items: center;
  padding-right: 300px;
}
.tool-btn {
  display: inline-block;
  margin-right: 10px;
  width: 50px;
}
.btn{
  border: none;
}
</style>
