<template>
  <main>
    <article class="blind-box-wrap">
      <article class="container">
        <span @click="toPlatform"
          class="back">返回</span>
        <current-product-list :show="isOldUser"></current-product-list>
        <div class="main-wrapper">
          <horn-and-more></horn-and-more>
          <box-list></box-list>
        </div>
      </article>
    </article>
    <Guide v-if="show"
      @close="show=false" />
  </main>
</template>

<script>
/* eslint-disable no-undef */
import currentProductList from './components/currentProductList'
import hornAndMore from './components/hornAndMore'
import boxList from './components/boxList'
import { FirstLoad } from '../../apis/box'
import Guide from './components/guide'

export default {
  data () {
    return {
      show: false,
      isOldUser: true,
      translateY: 0,
      startY: 0,
      endY: 0,
      bannerHeight: 0,
      isFirst: false,
      isTouchBannerHide: false
    }
  },
  components: {
    currentProductList, hornAndMore, boxList, Guide
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
    GLOBALS.marchSetsPoint('P_H5PT0225', {
      source_address: GLOBALS.getUrlParam('from') || null
    }) // H5平台-盲盒页面加载完成
    if (data.data.data) {
      this.guideTest()
    }
  },
  beforeDestroy () {

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
  flex: 1;
  background: #1b1f29;
  flex-direction: column;
  display: flex;
  &.active {
    margin-top: -0.25rem;
  }
}

div,
section {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
</style>
