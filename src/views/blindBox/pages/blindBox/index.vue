<template>
  <main>
    <article class="blind-box-wrap activity"
      :style="{'padding-top': `${bannerHeight + translateY}px`}">
      <!-- <article class="blind-box-wrap"> -->
      <section ref="banner"
        :style="{'transform': `translateY(${translateY}px)`}"
        class="banner">
        <!-- <div class="time"></div> -->
      </section>
      <article class="container"
        :class="{'active': (bannerHeight + translateY)}">
        <!-- <article class="container"> -->
        <span @click="toPlatform"
          v-if="!isWechat"
          class="back">返回</span>
        <current-product-list :show="isOldUser"></current-product-list>
        <div class="main-wrapper">
          <horn-and-more></horn-and-more>
          <box-list @load="init"></box-list>
        </div>
      </article>
    </article>
    <Guide v-if="show"
      @close="show=false" />
    <CouponDialog @onConfirm="onCouponConfirm"
    @onClose="onCouponClose"
      :coupon-info = "couponInfo"
      :show="showCoupon" />
  </main>
</template>

<script>
/* eslint-disable no-undef */
import currentProductList from './components/currentProductList'
import hornAndMore from './components/hornAndMore'
import boxList from './components/boxList'
import { FirstLoad } from '../../apis/box'
import { BoxCoupon } from '../../apis/user'
import Guide from './components/guide'
import { isWechat } from '../../global'
import CouponDialog from '../../components/coupon-dialog'

export default {
  data () {
    return {
      show: false,
      showCoupon: false,
      isOldUser: true,
      couponInfo: null,
      translateY: 0,
      startY: 0,
      endY: 0,
      bannerHeight: 0,
      isFirst: false,
      isTouchBannerHide: false
    }
  },
  components: {
    currentProductList, hornAndMore, boxList, Guide, CouponDialog
  },
  computed: {
    toucheMoveY () {
      return this.endY - this.startY
    },
    isWechat () {
      return isWechat
    }
  },
  methods: {
    // 返回平台
    toPlatform () {
      GLOBALS.marchSetsPoint('A_H5PT0225002684')
      location.href = 'https://wap.beeplaying.com/xmWap/#/'
    },
    onCouponConfirm () {
      this.showCoupon = false
    },
    onCouponClose () {
      this.showCoupon = false
    },
    initToucheListener () {
      // if (!this.isFirst) this.translateY = 0
      this.bannerHeight = this.$refs.banner.offsetHeight
      if (!this.isFirst) this.translateY = -this.bannerHeight
      document.addEventListener('touchstart', this.onToucheStart)
      document.addEventListener('touchmove', this.onToucheMove)
      document.addEventListener('touchend', this.onToucheEnd)
    },
    removeToucheListener () {
      document.removeEventListener('touchstart', this.onToucheStart)
      document.removeEventListener('touchmove', this.onToucheMove)
      document.removeEventListener('touchend', this.onToucheEnd)
    },
    onToucheStart (e) {
      this.startY = Number(e.touches[0].pageY)
      this.endY = 0
      this.isTouchBannerHide = false
    },
    onToucheMove (e) {
      this.endY = Number(e.touches[0].pageY)
      const scrollY = document.documentElement.scrollTop
      // 向下拉动时banner出现
      if (this.translateY < 0 && scrollY <= 0) {
        this.translateY = this.toucheMoveY - this.bannerHeight
        this.isTouchBannerHide = true
      }
    },
    onToucheEnd (e) {
      const scrollY = document.documentElement.scrollTop||document.body.scrollTop
      // banner图向下滑动，收起banner
      if (this.translateY === 0 && scrollY > 0) {
        this.translateY = -this.bannerHeight
        setTimeout(()=>{
          document.body.scrollTop=0
        },300)
        if (this.isTouchBannerHide) document.documentElement.scrollTop = 0
        GLOBALS.marchSetsPoint('A_H5PT0225002748')
        return
      }
      // banner向上拉动
      // if (this.translateY <= 0 && scrollY <= 0 && this.toucheMoveY > 0.3 * this.bannerHeight) {
      if (this.translateY <= 0 && scrollY <= 0 && this.toucheMoveY > 0) {
        this.translateY = 0
        setTimeout(()=>{
          document.body.scrollTop=0
        },300)
      } else {
        this.translateY = -this.bannerHeight
      }
    },
    // 盲盒banner24H只出现一次 年货节，不需要注释掉
    init () {
      const oldDate = localStorage.getItem('boxUserTime')
      const nowDate = new Date().getTime()
      if (!oldDate || (nowDate - Number(oldDate)) / 1000 > 86400) {
        this.isFirst = true
        localStorage.setItem('boxUserTime', nowDate)
        this.$nextTick(this.initToucheListener)
      } else {
        this.$nextTick(this.initToucheListener)
      }
    },
    // AB测试,是否走新手引导
    guideTest () {
      let _token = localStorage.getItem('ACCESS_TOKEN') || getUrlParams('token') || ''
      let xhr = new XMLHttpRequest()
      xhr.open('get', '//smarteyes-api.beeplaying.com/box/new/user/guide')
      xhr.setRequestHeader('Authorization', _token)
      xhr.send()
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
          if (xhr.getResponseHeader('version') === 'v2') {
            this.isOldUser = false
            setTimeout(() => {
              this.isOldUser = true
              this.show = true
            }, 2000)
          }
        }
      }
    }
  },
  async mounted () {
    const data = await FirstLoad()
    const coupon = await BoxCoupon()
    if (coupon.data.data) {
      this.couponInfo = coupon.data.data
      this.showCoupon = true
    }
    GLOBALS.marchSetsPoint('P_H5PT0225', {
      source_address: GLOBALS.getUrlParam('from') || null
    }) // H5平台-盲盒页面加载完成
    if (data.data.data) {
      this.guideTest()
    }
  },
  beforeDestroy () {
    this.removeToucheListener()
  }
}
</script>

<style scoped lang="less">
.blind-box-wrap {
  background: #1b1f29;
  min-height: 100vh;
  overflow: hidden;
  box-sizing: border-box;
  padding-bottom: 1.2rem;
  display: flex;
  flex-direction: column;
  transition: all 200ms linear;
  position: relative;
  z-index: 2;
  &.activity {
    background: #5A4DAF;
    .back {
      background: #9D88EC;
    }
  }
  .main-wrapper {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
}

.banner {
  width: 100%;
  height: 6.13rem;
  transition: all 200ms linear;
  transform: translateY(0);
  position: absolute;
  z-index: 1;
  left: 0;
  top: 0;
  background:#30569F url("./activity/banner.png") no-repeat;
  background-size: cover;
  .time {
    line-height: 0.4rem;
    font-size: 0.24rem;
    // background: #fd6d31;
    // color: #ffeabd;
    // box-shadow: 0px 17px 28px 0px rgba(147, 0, 7, 0.93);
    // border-bottom-left-radius: 0.1rem;
    // border-bottom-right-radius: 0.1rem;
    width: 1.95rem;
    height: 0.59rem;
    margin: 0 auto;
    text-align: center;
    background: url("./activity/time.png") no-repeat;
    background-size: 100% 100%;
  }
}

.back {
  padding: 0 0.15rem 0 0.09rem;
  line-height: 0.45rem;
  font-size: 0.24rem;
  position: fixed;
  z-index: 9;
  left: 0;
  top: 0.18rem;
  color: #fff;
  border: 1px solid #fff;
  border-left: none;
  border-top-right-radius: 0.23rem;
  border-bottom-right-radius: 0.23rem;
}

.container {
  position: relative;
  z-index: 8;
  flex: 1;
  flex-direction: column;
  display: flex;
  &.active {
    margin-top: -0.1rem;
  }
}

div,
section {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
</style>
