<template>
  <div class="share">
    <div class="mask" v-if="value"></div>
    <transition name="slide1">
      <div class="share-box" v-if="value">
        <div class="bottom">
          <div class="list">
            <div class="item" @click="shareWechat('1')">
              <img src="../img/wechat1.png" alt="">
              <p>朋友圈</p>
            </div>
            <div class="item" @click="shareWechat('0')">
              <img src="../img/wechat.png" alt="">
              <p>微信</p>
            </div>
          </div>
          <div class="close" @click="hide">
            关闭
          </div>
        </div>
      </div>
    </transition>

  </div>
</template>
<script>
import AppCall from './native'
export default {
  name: 'Share',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    hfqNum: {
      type: Number,
      default: 0
    }
  },
  methods: {
    hide () {
      this.$emit('input')
    },
    shareWechat (type) {
      let userInfo = localStorage.getItem('user_Info')
      let {userId} = JSON.parse(userInfo)
      const url = `https://wap.beeplaying.com/ddwgame/?type=fission&userId=${userId}&token=${localStorage.getItem('ACCESS_TOKEN')}&channel=${localStorage.getItem('APP_CHANNEL')}`
      const title = `我在这个APP里赚了${this.hfqNum || 20}话费，好东西也要分享给你。`
      const content = '玩游戏就能赚话费，真的能领！'
      try {
        AppCall.shareContent(JSON.stringify({ url, title, content, type }))
      } catch (e) {
      }
      if(type == 0) {
        GLOBALS.marchSetsPoint('A_H5PT0308003737')
      } else {
        GLOBALS.marchSetsPoint('A_H5PT0308003736')
      }
    }
  }
}
</script>
<style scoped lang="less">
.share {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 10;
  text-align: center;
  color: #fff;
  font-size: 28px;
  display: flex;
  justify-content: center;
  .mask {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
    z-index: 11;
  }
  .share-box {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 12.8rem;
    z-index: 12;
    background: #F5F5F5;
    border-radius: .3rem .3rem 0 0;
    .bottom{
      height: 3.85rem;
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      margin: 0;
      background:rgba(247,247,247,1);
      border-radius:.32rem .32rem 0 0;
      .list {
        height: 2.4rem;
        display: flex;
        justify-content: center;
        align-items: center;
        .item {
          margin: 0 .8rem;
          width: 1rem;
          img {
            width: 1rem;
            height: 1rem;
          }
          p {
            font-size: .24rem;
            color: #464545;
          }
        }
      }
      .close {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: .9rem;
        line-height: .92rem;
        font-size: .24rem;
        color: #FF4141;
        text-align: center;
        background: #F0F0F0;
      }
    }
    &.slide1-enter,
    .slide1-leave {
      bottom: -100%;
    }
    &.slide1-enter-active,
    .slide1-leave-active {
      transition: all .5s ease-in-out;
    }
  }
}
</style>
