<template>
  <div class="main" :class="{'open' : !show}">
    <article class="wrapper">
      <HornList class="notice"
        :notice-list="noticeList"
        v-if="show" />
      <img v-if="show"
        class="get"
        src="./assets/box-get.png">
      <div
        class="prize"
        v-if="box && isLoad"
        :style="{'background':`url(${box.animation}) no-repeat`,'background-size':'cover'}">
        <img v-if="show" class="goods"
          :src="awardsInfo.awardsImage | imgFilter">
        <img v-if="show" class="shine" src="./assets/shine.png" alt="">
      </div>
      <p v-if="show"
        class="name">{{awardsInfo.awardsName | textFilter}}</p>
      <p v-if="show"
        class="des">
        <span class="price">价值：¥{{awardsInfo.showAmount}}</span>
        <span>数量：1</span>
      </p>
      <p @click="viewMyPrize"
        v-if="show"
        class="view-prize">查看我的奖品>></p>
      <MButton class="button"
        v-if="show"
        @confirm="openAgain">再开一次</MButton>
    </article>
  </div>
</template>

<script>
import HornList from '../blindBox/components/hornList'
import MButton from '../../components/MButton'
import { boxGroup } from '../../config/box'
import { Operation, NoticeList } from '../../apis/box'

export default {
  data () {
    return {
      noticeList: [],
      show: false,
      box: null,
      goods: null,
      isLoad: false,
      type: null,
      sort: null,
      isTransparent: false,
      awardsInfo: null
    }
  },
  components: {
    HornList,
    MButton
  },
  async mounted () {
    GLOBALS.marchSetsPoint('A_H5PT0225002564')
    await this.getNoticeList()
    this.type = Number(this.$route.params.type)
    this.sort = Number(this.$route.query.sort)
    this.isTransparent = this.$route.query.isTransparent
    this.box = boxGroup.find(res => res.type === this.type)
    const { data: { data } } = await Operation({
      category: 1,
      sort: this.sort
    })
    this.awardsInfo = data
    this.isLoad = true
    setTimeout(() => {
      this.show = true
    }, 700)
    GLOBALS.marchSetsPoint('A_H5PT0225002564') // H5平台-盲盒页面-开盲盒页面加载完成
  },
  methods: {
    // 再开一次
    openAgain () {
      GLOBALS.marchSetsPoint('A_H5PT0225002565')
      this.$router.push({ name: 'Index' })
    },
    async getNoticeList () {
      // 获取跑马灯信息
      const res = await NoticeList()
      const { data } = res.data
      this.noticeList = data || []
    },
    // 查看我的奖品
    viewMyPrize () {
      GLOBALS.marchSetsPoint('A_H5PT0225002566')
      this.$router.push({ name: 'MyPrize' })
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
  box-sizing: border-box;
  &.open {
    padding-top: 1.31rem;
  }
  .wrapper {
    // height: 100vh;
    position: relative;
    background: #2a2d3c;
    padding-top: 0.5rem;
    box-sizing: border-box;
    // overflow: hidden;
    text-align: center;
    .notice {
      margin: 0 auto;
      width: 5rem;
    }
    .get {
      width: 2.18rem;
      height: 0.79rem;
    }
    .prize {
      width: 6.71rem;
      height: 6.23rem;
      margin-left: auto;
      margin-right: auto;
      // margin-top: -0.3rem;
      padding-top: 1.1rem;
      box-sizing: border-box;
      position: relative;
      .goods {
        width: 2.3rem;
        // transform-origin: right bottom;
        animation: show 1s linear;
      }
      .shine {
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
      }
    }
    .name {
      padding: 0.4rem 0;
      color: #b6b9cb;
      font-size: 0.26rem;
      font-weight: bold;
    }
    .des {
      padding-bottom: 0.3rem;
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
      font-size: 0.26rem;
      padding-top: 0.33rem;
      padding-bottom: 0.33rem;
    }
  }
}
</style>
