<template>
  <article class="main">
    <NavBar style="background:#fff"
      title="优惠券"
      @back="$router.go(-1)" />
    <p class="title">
      <span v-if="userInfo">可用积分: <span class="count">{{userInfo.score}}</span></span>
      <span class="method"
        @click="showRule">积分攻略</span>
    </p>
    <section class="tabs">
      <div @click="handleTabs(index)"
        :class="{'active': active===index}"
        v-for="(item, index) in tabs"
        :key="index">
        {{item.title}}
        <span v-if="item.red"
          class="red"></span>
      </div>
    </section>
    <article class="score-detail-wrapper">
      <article class=score-container>
        <section v-if="active===0 && !defaultEffectText"
          class="score-content">
          <Card class="card"
            v-for="(item, index) in effect"
            :info="item"
            :key="index">
            <div>
              <div @click="useCoupon"
                class="use-button">立即使用</div>
              <p>可用于购买盲盒</p>
            </div>
          </Card>
        </section>
        <section v-if="active===1 && !defaultLoseText"
          class="score-content">
          <Card class="card"
            v-for="(item, index) in lose"
            :info="item"
            :key="index">
            <img class="stauts"
              :src="item.status === 2 ?require('./components/card/assets/use.png'):require('./components/card/assets/timeout.png')"
              alt="">
          </Card>
        </section>
      </article>
      <article v-if="defaultEffectText || defaultLoseText"
        align="center"
        class="default">
        <img src="../score/components/add-score/assets/icon.png"
          alt="">
        <p>{{defaultEffectText}}{{defaultLoseText}}</p>
      </article>
    </article>
    <Rule @viewGoods="viewGoods"
      @close="isRule=false"
      :show="isRule" />
  </article>
</template>

<script>
import NavBar from '../../components/navBar'
import Rule from '../score/components/rule'
import Card from './components/card'
import { UserInfo } from '../../apis/user'
import { List } from '../../apis/coupon'

export default {
  data () {
    return {
      addScoreList: null,
      effect: [],
      lose: [],
      isRule: false,
      active: 0,
      userInfo: null,
      tabs: [
        {
          title: '有效券'
        },
        {
          title: '失效券'
        }
      ]
    }
  },
  methods: {
    showRule () {
      this.isRule = true
    },
    useCoupon () {
      this.$router.push({
        name: 'BlindBox'
      })
    },
    viewGoods (val) {
      if (val) {
        // GLOBALS.marchSetsPoint('A_H5PT0225002950')
      }
      this.$router.push({
        name: 'Score',
        query: {
          position: true
        }
      })
    },
    use () {
      GLOBALS.marchSetsPoint('A_H5PT0225002949')
      this.$router.push({
        name: 'Index'
      })
    },
    handleTabs (index) {
      this.active = index
      this.$nextTick(() => {
        if (index === 0) {
          GLOBALS.marchSetsPoint('A_H5PT0225002957')
        } else {
          GLOBALS.marchSetsPoint('A_H5PT0225002947')
        }
      })
    }
  },
  async mounted () {
    ({ data: { data: this.userInfo } } = await UserInfo());
    ({ data: { data: this.effect } } = await List({ gameId: 28, params: true }));
    ({ data: { data: this.lose } } = await List({ gameId: 28, params: false }))
    if (this.effect.length > 0) {
      this.$set(this.tabs[0], 'red', true)
    }
  },
  computed: {
    defaultEffectText () {
      if (this.active === 0 && this.effect && this.effect.length === 0) return '暂无有效券'
      return null
    },
    defaultLoseText () {
      if (this.active === 1 && this.lose && this.lose.length === 0) return '暂无失效券'
      return null
    }
  },
  components: {
    NavBar,
    Rule,
    Card
  }
}
</script>

<style lang="less" scoped>
.main {
  height: 100vh;
  background: #eeeeee;
  padding-bottom: 1.7rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  .tabs {
    display: flex;
    background: #fff;
    position: relative;
    .red {
      width: 0.08rem;
      height: 0.08rem;
      display: block;
      position: absolute;
      border-radius: 50%;
      background: #ff2828;
      top: -0.04rem;
      right: 36%;
    }
    & > div {
      flex: 1;
      color: #1b1f29;
      font-size: 0.24rem;
      text-align: center;
      position: relative;
      padding-bottom: 0.24rem;
      &.active {
        color: #d0ab40;
        &::after {
          content: "";
          position: absolute;
          width: 0.62rem;
          height: 0.04rem;
          border-radius: 0.02rem;
          background: #d0ab40;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
        }
      }
    }
  }
  .default {
    padding-top: 1.6rem;
    font-size: 0.24rem;
    color: #1b1f29;
    img {
      width: 1.26rem;
    }
    p {
      padding-top: 0.15rem;
    }
  }
  .button {
    position: fixed;
    left: 1.95rem;
    bottom: 0.45rem;
    width: 3.3rem;
    line-height: 0.8rem;
    text-align: center;
    color: #fff;
    background: #d1ac42;
    font-size: 0.32rem;
    border-radius: 0.16rem;
  }
}
.title {
  font-size: 0.24rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #1b1f29;
  padding: 0.25rem 0.3rem;
  background: #fff;
  .count {
    color: #ff2828;
    font-size: 0.3rem;
  }
}
.method {
  background: rgba(222, 192, 114, 0.6);
  color: #af8226;
  font-size: 0.22rem;
  border-radius: 0.22rem;
  padding: 0.11rem 0.16rem;
}
.score-detail-wrapper {
  padding: 0.33rem 0.3rem;
  flex: 1;
  overflow: scroll;
}
.score-container {
  // overflow: scroll;
  border-radius: 0.16rem;
  background: #eee;
  width: 6.6rem;
  box-sizing: border-box;
  .card {
    margin-bottom: 0.2rem;
    .use-button {
      width: 1.3rem;
      border-radius: 0.26rem;
      line-height: 0.52rem;
      background: #d1ac42;
      font-size: 0.24rem;
      color: #fff;
      text-align: center;
      margin: 0 auto;
      margin-bottom: 0.26rem;
    }
  }
  .stauts {
    width: 1.03rem;
  }
}
</style>
