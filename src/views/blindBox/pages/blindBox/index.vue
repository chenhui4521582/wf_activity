<template>
  <main class="blind-box-wrap">
    <section :style="(height || height === 0) ? {'height': height} : {}"
      :class="{'hide': hide}"
      class="banner">
        <div>dffsafdsadsa</div>
        <div>答复地方撒大方式</div>
      </section>
    <current-product-list></current-product-list>
    <div class="main-wrapper">
      <horn-and-more></horn-and-more>
      <box-list></box-list>
    </div>
  </main>
</template>

<script>
/* eslint-disable no-undef */
import currentProductList from './components/currentProductList'
import hornAndMore from './components/hornAndMore'
import boxList from './components/boxList'

export default {
  data () {
    return {
      show: false,
      hide: false,
      height: null,
      startY: 0,
      endY: 0,
      bannerHeight: null
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
    // 监听滚动
    onToucheStart (e) {
      this.startY = Number(e.touches[0].pageY)
      this.endY = 0
    },
    onToucheMove (e) {
      this.endY = Number(e.touches[0].pageY)
      const scrollY = document.documentElement.scrollTop
      // banner隐藏时滚动到顶部
      if (this.hide && scrollY <= 0) {
        // 滚到banner整体高度时 banner高度等于自身
        if (this.toucheMoveY >= this.bannerHeight) {
          this.height = `${this.bannerHeight}px`
          return
        }
        // 未滚到banner整体高度时 banner高度等于滚动高度
        this.height = `${this.toucheMoveY}px`
      }
    },
    onToucheEnd (e) {
      const scrollY = document.documentElement.scrollTop
      // banner图向下滑动到一定距离时，收起banner
      if (!this.hide && scrollY !== 0) {
        this.hide = true
        this.height = 0
        return
      }
      // banner隐藏时滚动到顶部
      if (this.hide && scrollY <= 0 && this.toucheMoveY > 0.3 * this.bannerHeight) {
        this.hide = false
        this.height = `${this.bannerHeight}px`
      } else {
        this.hide = true
        this.height = 0
      }
    }
  },
  mounted () {
    this.bannerHeight = document.getElementsByClassName('banner')[0].offsetHeight
    document.addEventListener('touchstart', this.onToucheStart)
    document.addEventListener('touchmove', this.onToucheMove)
    document.addEventListener('touchend', this.onToucheEnd)
    GLOBALS.marchSetsPoint('P_H5PT0225', {
      source_address: GLOBALS.getUrlParam('from') || null
    }) // H5平台-盲盒页面加载完成
  },
  beforeDestroy () {
    document.removeEventListener('touchstart', this.onToucheStart)
    document.removeEventListener('touchmove', this.onToucheMove)
    document.removeEventListener('touchend', this.onToucheEnd)
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
  .main-wrapper {
    // background: #f0ead1;
    display: flex;
    flex: 1;
    flex-direction: column;
  }
}

.banner {
  width: 100%;
  height: 5rem;
  background: pink;
  transition: height 200ms linear;
  &.hide {
    height: 0rem;
  }
}

div,
section {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
</style>
