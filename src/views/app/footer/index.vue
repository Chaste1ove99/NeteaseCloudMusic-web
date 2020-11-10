<template>
    <div class="player">
      <el-slider v-model="sliderTime" @change="changeCurrentTime"></el-slider>
      <div class="playing-container">
      <audio v-if="Object.keys(playing).length == 0" :src="played.url" ref="audioA" autoplay=“true”
      @loadedmetadata='loaded' @timeupdate='updateSlider'>
      </audio>
      <audio v-else :src="playing.url" ref="audioB" autoplay=“true” @loadedmetadata='loaded' @timeupdate='updateSlider'></audio>
      <!--这里判断空对象的方法特殊 详情csdn https://blog.csdn.net/qq_18671415/article/details/105014700-->
      <el-image
      v-if="Object.keys(playing).length == 0"
      class="pic"
      :src='played.picUrl'
      fit="fit"></el-image>
        <el-image
      v-else
      class="pic"
      :src='playing.picUrl'
      fit="fit"></el-image>
      <div class="song-detail">
      <div class='player-name' v-if="Object.keys(playing).length == 0">{{played.name}}</div>
      <div class='player-name' v-else>{{playing.name}}</div>
      <div class='player-singer' v-if="Object.keys(playing).length == 0">{{played.singer}}</div>
      <div class='player-singer' v-else>{{playing.singer}}</div>
      </div>
      <div class='playing-tool'>
      <div class="tool-btn"><el-button circle class='btn1' icon="el-icon-star-off"></el-button></div>
      <div class="tool-btn"><el-button circle class='btn1' icon="el-icon-arrow-left" @click="playBefore"></el-button></div>
      <div class="tool-btn" v-if="!status"><el-button circle class='btn1'  icon="el-icon-video-play" @click="play"></el-button></div>
      <div class="tool-btn" v-if="status"><el-button  circle class='btn1' icon="el-icon-video-pause" @click="pause"></el-button></div>
      <div class="tool-btn"><el-button circle class='btn1' icon='el-icon-arrow-right' @click="playAfter"></el-button></div>
      <div class="tool-btn"><el-button circle class='btn1' icon='el-icon-top'></el-button></div>
      </div>
      </div>
    </div>
</template>
<script>
export default {
  name: 'FootPlayer',
  data () {
    return {
      // status 为1是播放状态 status为0为停止状态
      status: 0,
      sliderTime: 0,
      audio: { maxTime: '' },
      before: 0
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
    // 加载完毕 改变图标
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
    playBefore () {
      const beforeIndex = this.playing.index - 1
      this.$store.commit('intoplaying', this.playingList[beforeIndex])
    },
    playAfter () {
      const afterIndex = this.playing.index + 1
      this.$store.commit('intoplaying', this.playingList[afterIndex])
    }
  },
  mounted () {
  },
  computed: {
    // 监听vuex中playing的变化 便于及时获取新要播放的歌曲
    playing: function () {
      // console.log('123')
      // 监听没办法计次。。。。
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
  }
}
</script>
<style scoped>
.player {
  background: #fff;
  margin-left: 10px;
}
.pic {
  width: 100px;
  height: 100px;
  border-radius: 20px;
  margin-top: 10px;
}
.playing-container {
  display: inline-block;
  margin-top: -23px;
}
.song-detail {
  display: inline-block;
  top: -30px;
  position: relative;
  margin-top: 10px;
  margin-left: 15px;
  width: 300px;
}
.player-name {
  padding-bottom: 10px;
}
.player-singer {
  font-size: 14px;
  color: #b2adab;
}
.playing-tool {
  display: inline-block;
  position: relative;
  margin-top: 10px;
  margin-left: 140px;
  top: -45px;
}
.tool-btn {
  display: inline;
  margin-right: 10px;
}
.btn1 {
  border: none;
  size: middle;
}
</style>
