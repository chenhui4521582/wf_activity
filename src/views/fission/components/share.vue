<template>
  <div class="share">
    <div class="mask" v-if="value" :class="{showAnimation:showAnimation&&!isNewVersion}" @click="maskClick">
      <template v-if="showAnimation&&!isNewVersion">
        <p>选择图片</p>
        <p>点击截屏保存</p>
        <img src="../img/share/figure.png" alt="">
      </template>
    </div>
    <transition :name="transitionName">
      <div class="share-box" v-if="value">
        <div class="fission-box" :class="{'product': isProduct}">
          <div class="wrap" @click="showPicIndex">
            <swiper :options="options" ref="mySwiper">
              <template v-for="(item,index) in newSrc">
                <swiper-slide :data="index+1"><img :src="item" alt=""/></swiper-slide>
              </template>
            </swiper>
          </div>
          <div class="swiper-button-prev" :class="{showPic:showPic}" slot="button-prev" @click="swiperbtnClick(0)"></div>
          <div class="swiper-button-next" :class="{showPic:showPic}" slot="button-next" @click="swiperbtnClick(1)"></div>
        </div>
        <div class="fission-bottom" :class="{showPic:showPic}">
          <template v-show="!showPic">
            <div class="tips" v-show="!isNewVersion">提示：选择图片，点击截屏保存到手机相册，再选择图片分享微信好友，邀请成功 率更高哦~</div>
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
              <div class="item" @click="modalOpen">
                <img src="../img/share/link.png" alt="">
                <p>发送专属链接</p>
              </div>
            </div>
          </template>
          <div class="close" @click="hide">
            关闭
          </div>
        </div>
        <modal v-model="showModal" @on-close="modalClose" title="分享下载链接">
          <div class="modal-container">
            浏览器打开可直接下载：<br>
            <p v-clipboard:copy="qrCodeUrl" v-clipboard:success="onCopy" v-clipboard:error="onError">
              {{qrCodeUrl}}</p>
            <br>
          </div>
          <div class="btn" slot="footer" v-clipboard:copy="qrCodeUrl" v-clipboard:success="onCopy"
               v-clipboard:error="onError">复制链接</div>
        </modal>
      </div>
    </transition>

  </div>
</template>
<script>
import AppCall from './native'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import modal from '../components/modal/modal'
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
    },
    newSrc: {
      type: Array,
      default: () => []
    },
    qrCodeUrl: {
      type: String,
      default: ''
    },
    isNewVersion:{
      type: Boolean,
      default: false
    }
  },
  data(){
    return {
      options: {
        loop: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      },
      showAnimation:false,
      showModal:false,
      showPic:false,
      timer:null
    }
  },
  computed:{
    transitionName(){
      return this.showAnimation?'':'slide1'
    },
    /** 解决swiper 上了生产环境样式问题 **/
    isProduct () {
      return process.env.NODE_ENV === "production"
    }
  },
  components: {
    swiper,
    swiperSlide,
    modal
  },
  methods: {
    hide () {
      if(!this.showPic){
        this.$emit('input')
      }else{
        this.showPic=false
      }
    },
    shareWechat (type) {
      const url = this.qrCodeUrl
      const title = `我在这个APP里赚了${this.hfqNum || 20}话费，好东西也要分享给你。`
      const content = '玩游戏就能赚话费，真的能领！'
      const imgData=document.querySelector('.share .swiper-slide-active')
      const imgUrl=imgData&&imgData.getAttribute('data')&&this.newSrc[parseInt(imgData.getAttribute('data'))-1]||''
      try {
        if(this.isNewVersion){
          AppCall.shareContent(JSON.stringify({ url:'', title:'', content:'', type, imgUrl}))
        }else{
          AppCall.shareContent(JSON.stringify({ url, title, content, type }))
        }
      } catch (e) {
        console.log(e,e)
      }
      if(type == 0) {
        GLOBALS.marchSetsPoint('A_H5PT0308004049')
      } else {
        GLOBALS.marchSetsPoint('A_H5PT0308004050')
      }
    },
    onCopy () {
      GLOBALS.marchSetsPoint('A_H5PT0308004054')
      this.$toast.show({ message: '复制成功' })
    },
    onError () {
      GLOBALS.marchSetsPoint('A_H5PT0308004054')
      this.$toast.show({ message: '复制失败' })
    },
    modalOpen(){
      GLOBALS.marchSetsPoint('A_H5PT0308004051')
      this.showModal = true
      GLOBALS.marchSetsPoint('A_H5PT0308004053')
    },
    modalClose () {
      this.showModal = false
    },
    showPicIndex(){
      if(!this.isNewVersion){
        this.showPic=true
      }
    },
    swiperbtnClick(type){
      GLOBALS.marchSetsPoint(type?'A_H5PT0308004048':'A_H5PT0308004047')
    },
    maskClick(){
      if(this.showAnimation&&!this.isNewVersion){
        GLOBALS.marchSetsPoint('A_H5PT0308004052')
        if(this.timer){
          clearTimeout(this.timer)
          this.timer=null
          this.showAnimation=false
        }
      }
    }
  },
  watch:{
    value(val){
      if(val){
        GLOBALS.marchSetsPoint('A_H5PT0308004046')//H5平台-裂变开宝箱活动-邀请分享页面加载完成
        /** 今天12点时间搓 **/
        let resetTime = new Date(new Date().toLocaleDateString()).getTime()
        /** 查看储存状态 **/
        let tipsData = JSON.parse(window.localStorage.getItem('fissionTips'))
        /** 本地没有缓存或者本地缓存时间搓不对，重新记录数据 **/
        if (!tipsData || tipsData.resetTime !== resetTime) {
          window.localStorage.setItem('fissionTips', JSON.stringify({ resetTime, show: true }))
        }else{
          window.localStorage.setItem('fissionTips', JSON.stringify({ resetTime, show: false }))
        }
        tipsData = JSON.parse(window.localStorage.getItem('fissionTips'))
        this.showAnimation=tipsData && tipsData.show
        this.timer=setTimeout(()=>{
          this.showAnimation=false
          this.timer=null
        },4000)
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
  font-size: .28rem;
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
    &.showAnimation{
      z-index: 13;
      padding-top: 3.13rem;
      box-sizing: border-box;
      p{
        font-size:.36rem;
        font-weight:bold;
        color:rgba(255,255,255,1);
      }
      img{
        margin-top: .42rem;
        width: 1.5rem;
        height: 2.28rem;
        animation: fingerMove 1s infinite ease-in-out;
      }
    }
  }
  .share-box {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 100vh;
    z-index: 12;
    background: #4112bf;
    .fission-box {
      .swiper-slide {
        display: flex;
        justify-content: flex-start;
        justify-items: center;
        align-items: center;
        height: 12.8rem;
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
        &.showPic{
          opacity: 0;
        }
      }
      .swiper-button-next {
        transform: rotate(180deg);
        width: .9rem;
        height: .9rem;
        background: url(../img/box-btn.png) no-repeat center center;
        background-size: 100% 100%;
        cursor: auto;
        outline: none;
        &.showPic{
          opacity: 0;
        }
      }
      &.product {
        .swiper-wrapper {
          display: flex;
          position: absolute;
          height: 12.8rem;
        }
        .swiper-button-prev {
          position: absolute;
          left: 0;
          z-index: 4;
          top: 50%;
          width: .9rem;
          height: .9rem;
          background: url(../img/box-btn.png) no-repeat center center;
          background-size: 100% 100%;
        }
        .swiper-button-next {
          position: absolute;
          right: 0;
          top: 50%;
          z-index: 4;
          transform: rotate(180deg);
          width: .9rem;
          height: .9rem;
          background: url(../img/box-btn.png) no-repeat center center;
          background-size: 100% 100%;
        }
      }
    }
    .fission-bottom{
      height: 4.45rem;
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      margin: 0;
      background:rgba(247,247,247,1);
      border-radius:.32rem .32rem 0 0;
      padding: .2rem 0 0;
      box-sizing: border-box;
      z-index: 1;
      .tips{
        padding: 0 .4rem;
        box-sizing: border-box;
        font-size:.2rem;
        font-weight:500;
        color:rgba(255,120,0,1);
        margin-bottom: .32rem;
      }
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
      &.showPic{
        height: .9rem;
        border-radius:0;
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
  .modal-container {
    padding: 0.37rem 0 0;
    font-size: 0.24rem;
    font-weight:500;
    color:rgba(136,136,136,1);
    p {
      margin: 0.1rem 0 0;
      word-break: break-all;
    }
  }
  .btn {
    width: 4.1rem;
    height: 0.7rem;
    line-height: 0.7rem;
    font-size: 0.24rem;
    color: #fff;
    background: #ff4141;
    border-radius: 0.16rem;
  }
}
@keyframes fingerMove {
  0% {
    transform: scale(0.9);
  }
  10% {
    transform: scale(1);
  }
  20% {
    transform: scale(0.9);
  }
  30% {
    transform: scale(1);
  }
  40% {
    transform: scale(0.9);
  }
  50% {
    transform: scale(1);
  }
  60% {
    transform: scale(0.9);
  }
  70% {
    transform: scale(1);
  }
  80% {
    transform: scale(0.9);
  }
  90% {
    transform: scale(1);
  }
  100% {
    transform: scale(0.9);
  }
}
</style>
