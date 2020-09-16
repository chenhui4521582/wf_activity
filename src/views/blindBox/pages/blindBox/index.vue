<template>
  <main>
    <article class="blind-box-wrap activity">
      <article class="container">
        <!-- <article class="container"> -->
        <span class="back" v-if="!isWechat" @click="toPlatform">返回</span>
        <current-product-list :show="isOldUser"></current-product-list>
        <div class="main-wrapper">
          <horn-and-more></horn-and-more>
          <box-list ref="boxList" @load="init"></box-list>
        </div>
      </article>
    </article>
    <Guide v-if="show" @close="show=false" />
    <CouponDialog @onConfirm="onCouponConfirm" @onClose="onCouponClose" :coupon-info="couponInfo"
      :show="showCoupon" />
    <invite @refresh="refreshInfo" />
  </main>
</template>

<script>
/* eslint-disable no-undef */
import currentProductList from './components/currentProductList'
import hornAndMore from './components/hornAndMore'
import boxList from './components/boxList'
// import { FirstLoad } from '../../apis/box'
import { BoxCoupon } from '../../apis/user'
import Guide from './components/guide'
import { isWechat } from '../../global'
import CouponDialog from '../../components/coupon-dialog'
import invite from './components/invite/invite.vue'

export default {
  data () {
    return {
      show: false,
      showCoupon: false,
      isOldUser: true,
      couponInfo: null,
      startY: 0,
      endY: 0,
      isFirst: false,
      isTouchBannerHide: false
    }
  },
  components: {
    currentProductList, hornAndMore, boxList, Guide, CouponDialog, invite
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
    async getCoupons () {
      const coupon = await BoxCoupon()
      if (coupon.data.data) {
        this.couponInfo = coupon.data.data
        this.showCoupon = true
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
    },
    refreshInfo () {
      this.$refs.boxList.getUserInfo()
    }
  },
  async mounted () {
    await this.getCoupons()
    // H5平台-盲盒页面加载完成
    GLOBALS.marchSetsPoint('P_H5PT0225', {
      source_address: GLOBALS.getUrlParam('from') || null
    })
    /*  新手AB测试功能关闭 （胡瑶）
      const data = await FirstLoad()
      if (data.data.data) {
        this.guideTest()
      }
     */
  }
}
</script>

<style scoped lang="less">
.blind-box-wrap {
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
    background: #f2edd7;
    .back {
      background: #9d88ec;
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
  background: #30569f url('./activity/banner.png') no-repeat;
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
    background: url('./activity/time.png') no-repeat;
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
