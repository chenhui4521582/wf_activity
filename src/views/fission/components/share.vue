<template>
  <div class="share">
    <div class="mask" v-if="value"></div>
    <transition name="slide1">
      <div class="share-box" v-if="value">
        <div class="fission-box">
          <div class="wrap">
            <swiper :options="options" ref="mySwiper">
              <swiper-slide data="1"><img src="../img/share/pic1.png" alt="" /></swiper-slide>
              <swiper-slide data="2"><img src="../img/share/pic2.png" alt="" /></swiper-slide>
              <swiper-slide data="3"><img src="../img/share/pic3.png" alt="" /></swiper-slide>
            </swiper>
          </div>
          <div class="swiper-button-prev" slot="button-prev"></div>
          <div class="swiper-button-next" slot="button-next"></div>
        </div>
        <div class="fission-bottom">
          <div class="info">邀请好友 得开宝箱钥匙</div>
          <div class="list">
            <div class="item" @click="shareWechat('0')">
              <img src="../img/share/wechat.png" alt="">
              <p>邀请微信好友</p>
            </div>
            <div class="item" @click="shareWechat('1')">
              <img src="../img/share/wechat1.png" alt="">
              <p>发送朋友圈</p>
            </div>
            <div class="item" @click="shareWechat('1')">
              <img src="../img/share/link.png" alt="">
              <p>发送专属链接</p>
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
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
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
  data(){
    return {
      options: {
        slidesPerView: 1,
        spaceBetween: 0,
        centeredSlides: true,
        loop: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        on: {
          slideChangeTransitionEnd: () => {
            let element = document.querySelector('.swiper-slide-active')
            boxVm.$emit('slideChange', element.getAttribute('data'))
          }
        }
      }
    }
  },
  components: {
    swiper,
    swiperSlide
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
    .fission-box {
      .swiper-slide {
        display: flex;
        justify-content: flex-start;
        height: 10.23rem;
        justify-items: center;
        align-items: center;
        img {
          width: 100%;
        }
        .bottom {
          display: none;
        }
      }
      .swiper-slide-active {
        position: relative;
        justify-content: center;
        img {
          position: relative;
          z-index: 1;
          width: 100%;
        }
        .bottom {
          display: block;
          position: absolute;
          left: 50%;
          top: 2.8rem;
          transform:  translate(-50%, 0);
          margin-left: -1.92rem;
          width: 3.84rem;
          height: 1.42rem;
          background: url(../img/bottom.png) no-repeat center center;
          background-size: 100% 100%;
          animation: cover infinite 2s;
        }
        &.active {
          img {
            animation: award 1s 1;
          }
        }
      }
      .swiper-slide-prev {
        justify-content: flex-end;
      }
      .swiper-slide-next {
        justify-content: flex-start;
      }
      .swiper-button-prev {
        width: .9rem;
        height: .9rem;
        background: url(../img/box-btn.png) no-repeat center center;
        background-size: 100% 100%;
        cursor: auto;
        outline: none;
      }
      .swiper-button-next {
        transform: rotate(180deg);
        width: .9rem;
        height: .9rem;
        background: url(../img/box-btn.png) no-repeat center center;
        background-size: 100% 100%;
        cursor: auto;
        outline: none;
      }
    }
    .fission-bottom{
      height: 3.85rem;
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      margin: 0;
      background:rgba(247,247,247,1);
      border-radius:.32rem .32rem 0 0;
      padding: .3rem 0 0;
      box-sizing: border-box;
      z-index: 1;
      .info{
        font-size:.24rem;
        font-weight:400;
        color:rgba(136,136,136,1);
      }
      .list {
        height: 2.4rem;
        display: flex;
        justify-content: space-around;
        align-items: center;
        .item {
          img {
            width: .88rem;
            height: .88rem;
            margin-bottom: .29rem;
          }
          p {
            font-size: .24rem;
            color:rgba(0,0,0,1);
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
        color:rgba(0,0,0,1);
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
