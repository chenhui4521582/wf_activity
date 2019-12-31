<template>
  <main>
    <article class="blind-box-wrap"
      :style="{'padding-top': `${bannerHeight + translateY}px`}">
      <section v-if="isBanner" ref="banner"
        :style="{'transform': `translateY(${translateY}px)`}"
        class="banner">
        <div class="time">01.03-01.10</div>
      </section>
      <article class="container"
        :class="{'active':bannerHeight + translateY}">
        <span @click="toPlatform"
          class="back">返回</span>
        <current-product-list></current-product-list>
        <div class="main-wrapper">
          <horn-and-more></horn-and-more>
          <box-list @load="init"></box-list>
        </div>
      </article>
    </article>
  </main>
</template>

<script>
/* eslint-disable no-undef */
import currentProductList from './components/currentProductList'
import hornAndMore from './components/hornAndMore'
import boxList from './components/boxList'
import { FirstLoad } from '../../apis/box'

export default {
  data () {
    return {
      translateY: 0,
      startY: 0,
      endY: 0,
      isBanner: true,
      bannerHeight: 0
    }
  },
  components: {
    currentProductList, hornAndMore, boxList
  },
  computed: {
    toucheMoveY () {
      return this.endY - this.startY
    }
  },
  methods: {
    // 返回平台
    toPlatform () {
      GLOBALS.marchSetsPoint('A_H5PT0225002684')
      location.href = 'https://wap.beeplaying.com/xmWap/#/'
    },
    initToucheListener () {
      this.bannerHeight = this.$refs.banner.offsetHeight
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
    },
    onToucheMove (e) {
      this.endY = Number(e.touches[0].pageY)
      const scrollY = document.documentElement.scrollTop
      // 向下拉动时banner出现
      if (this.translateY < 0 && scrollY <= 0) {
        this.translateY = this.toucheMoveY - this.bannerHeight
      }
    },
    onToucheEnd (e) {
      const scrollY = document.documentElement.scrollTop
      // banner图向下滑动，收起banner
      if (this.translateY === 0 && scrollY > 0) {
        this.translateY = -this.bannerHeight
        return
      }
      // banner向上拉动
      // if (this.translateY <= 0 && scrollY <= 0 && this.toucheMoveY > 0.3 * this.bannerHeight) {
      if (this.translateY <= 0 && scrollY <= 0 && this.toucheMoveY > 0) {
        this.translateY = 0
      } else {
        this.translateY = -this.bannerHeight
      }
    },
    // 盲盒banner24H只出现一次 年货节，不需要注释掉
    init () {
      const oldDate = localStorage.getItem('boxUserTime')
      const nowDate = new Date().getTime()
      if (!oldDate || (nowDate - Number(oldDate)) / 1000 > 86400) {
        localStorage.setItem('boxUserTime', nowDate)
        this.$nextTick(this.initToucheListener)
      } else {
        this.isBanner = false
      }
    }
  },
  mounted () {
    FirstLoad()
    GLOBALS.marchSetsPoint('P_H5PT0225', {
      source_address: GLOBALS.getUrlParam('from') || null
    }) // H5平台-盲盒页面加载完成
  },
  beforeDestroy () {

  }
}
</script>

<style scoped lang="less">
.blind-box-wrap {
  background: #f4d6b0;
  min-height: 100vh;
  overflow: hidden;
  box-sizing: border-box;
  padding-bottom: 1.2rem;
  display: flex;
  flex-direction: column;
  transition: all 200ms linear;
  position: relative;
  z-index: 2;
  .main-wrapper {
    display: flex;
    flex: 1;
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
  background: url("./assets/banner.png") no-repeat;
  background-size: cover;
  .time {
    line-height: 0.4rem;
    font-size: 0.24rem;
    background: #fd6d31;
    color: #ffeabd;
    box-shadow: 0px 17px 28px 0px rgba(147, 0, 7, 0.93);
    border-bottom-left-radius: 0.1rem;
    border-bottom-right-radius: 0.1rem;
    width: 1.55rem;
    margin: 0 auto;
    text-align: center;
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
  &.active {
    margin-top: -0.25rem;
  }
}

div,
section {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
</style>
