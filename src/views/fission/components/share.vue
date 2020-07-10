<template>
  <div class="share">
    <div class="mask" v-if="value"></div>
    <transition name="slide1">
      <div class="share-box" v-if="value">
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
    </transition>
    <!-- 原生粘贴板 -->
    <textarea cols="20" rows="10" id="copy" style="width:0;height:0;opacity:0"></textarea>
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
    /** 复制src到原生粘贴板 **/
    copy () {
      let text = `from=fission&token=${localStorage.getItem('ACCESS_TOKEN')}`
      let input = document.getElementById("copy")
      input.value = text;
      input.select()
      document.execCommand("copy")
    },
    shareWechat (type) {
      const url = `https://wap.beeplaying.com/activities/bdMiddlePage.html?token=${localStorage.getItem('ACCESS_TOKEN')}`
      const title = `我在这个APP里赚了${this.hfqNum || 20}话费，好东西也要分享给你。`
      const content = '玩游戏就能赚话费，真的能领！'
      try {
        AppCall.shareContent(JSON.stringify({ url, title, content, type }))
        this.copy()
      } catch (e) {

      }
    },
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
    height: 3.3rem;
    z-index: 12;
    background: #F5F5F5;
    border-radius: .3rem .3rem 0 0;
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
    &.slide1-enter,
    .slide1-leave {
      bottom: -100%;
    }
    &.slide1-enter-active,
    .slide1-leave-active {
      transition: all .5s ease-in-out;
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
</style>