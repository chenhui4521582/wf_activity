<template>
  <div class="main">
    <article v-if="show"
      class="wrapper">
      <LongSwiper class="notice" />
      <img class="get"
        src="./assets/box-get.png">
      <div v-if="awardsInfo"
        class="prize"
        :style="{'background':`url(${box.boxOpen}) no-repeat`,'background-size':'cover'}">
        <img class="goods"
          :src="awardsInfo.awardsImage | imgFilter">
      </div>
      <p v-if="awardsInfo"
        class="name">{{awardsInfo.awardsName}}</p>
      <p v-if="awardsInfo"
        class="des">
        <span class="price">价值：¥{{awardsInfo.showAmount}}</span>
        <span>数量：{{awardsInfo.awardsNum}}</span>
      </p>
      <MButton class="button"
        @confirm="openAgain">再开一次</MButton>
      <p @click="viewMyPrize"
        class="view-prize">查看我的奖品>></p>
    </article>
  </div>
</template>

<script>
import LongSwiper from '../../components/longSwiper'
import MButton from '../../components/MButton'
import { boxGroup } from '../../config/box'
import { Operation } from '../../apis/box'

export default {
  data () {
    return {
      show: false,
      box: null,
      goods: null,
      type: null,
      sort: null,
      isTransparent: false,
      awardsInfo: null
    }
  },
  methods: {
    // 再开一次
    openAgain () {
      GLOBALS.marchSetsPoint('A_H5PT0225002565')
      this.$router.push({ name: 'Index' })
    },
    // 查看我的奖品
    viewMyPrize () {
      GLOBALS.marchSetsPoint('A_H5PT0225002566')
      this.$router.push({ name: 'MyPrize' })
    }
  },
  components: {
    LongSwiper,
    MButton
  },
  async mounted () {
    GLOBALS.marchSetsPoint('A_H5PT0225002564')
    this.$loading.show({
      render (h) {
        return h('div', '正在为您开盒……')
      }
    })
    this.type = Number(this.$route.params.type)
    this.sort = Number(this.$route.query.sort)
    this.isTransparent = this.$route.query.isTransparent
    this.box = boxGroup.find(res => res.type === this.type)
    const { data: { data } } = await Operation({
      category: 1,
      sort: this.sort
    })
    this.awardsInfo = data
    this.$loading.hide()
    this.show = true
    GLOBALS.marchSetsPoint('A_H5PT0225002564') // H5平台-盲盒页面-开盲盒页面加载完成
  },
  methods: {
    toIndex () {
      this.$router.push({ name: 'Index' })
      GLOBALS.marchSetsPoint('A_H5PT0225002565') // H5平台-盲盒页面-开盲盒页面-再开一次点击
    },
    toMyPrize () {
      this.$router.push({ name: 'MyPrize' })
      GLOBALS.marchSetsPoint('A_H5PT0225002566') // H5平台-盲盒页面-开盲盒页面-查看我的奖品点击
    }
  }
}
</script>

<style lang="less" scoped>
@keyframes show {
  0% {
    transform: translateY(100%) scale3d(0.1, 0.1, 1);
  }
  50% {
    transform: translateY(40%) scale3d(0.4, 0.4, 1);
  }
  100% {
    transform: scale3d(1, 1, 1);
  }
}

.main {
  background: #2a2d3c;
  min-width: 100vw;
  min-height: 100vh;
  .wrapper {
    height: 100vh;
    position: relative;
    background: #2a2d3c;
    padding-top: 0.5rem;
    box-sizing: border-box;
    overflow: hidden;
    text-align: center;
    .notice {
      margin: 0 auto;
      width: 3.87rem;
    }
    .get {
      width: 2.18rem;
      height: 0.79rem;
    }
    .prize {
      width: 6.71rem;
      height: 6.23rem;
      margin-left: 0.49rem;
      margin-top: -0.3rem;
      padding-top: 1.1rem;
      box-sizing: border-box;
      .goods {
        width: 2.3rem;
        // transform-origin: right bottom;
        animation: show 1s linear;
      }
    }
    .name {
      padding: 0.4rem 0;
      color: #b6b9cb;
      font-size: 0.26rem;
      font-weight: bold;
    }
    .des {
      padding-bottom: 0.8rem;
      color: #b6b9cb;
      font-size: 0.22rem;
      font-weight: bold;
      .price {
        padding-right: 0.3rem;
      }
    }
    .button {
      margin: 0 auto;
    }
    .view-prize {
      color: #ecd69a;
      font-weight: bold;
      font-size: 0.22rem;
      padding-top: 0.33rem;
    }
  }
}
</style>
