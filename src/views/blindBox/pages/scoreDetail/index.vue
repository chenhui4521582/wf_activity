<template>
  <article class="main">
    <NavBar style="background:#fff"
      title="积分明细"
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
      </div>
    </section>
    <article class="score-detail-wrapper">
      <article v-if="active===1"
        class="record-container">
        <article class="header">
          <section class="info">
            <div v-if="userInfo"
              class="card-info">
              <div>
                <p class="count">{{userInfo.transparentTimes}}</p>
                <p>可用透视卡</p>
              </div>
              <div>
                <p class="count">{{userInfo.singlePostTimes}}</p>
                <p>可用包邮卡</p>
              </div>
              <div>
              <p class="count">{{coupon}}</p>
              <p>可用优惠券</p>
            </div>
            </div>
            <p class="use"
              @click="use">点击去使用>></p>
          </section>
        </article>
        <section v-if="minusList && minusList.length > 0"
          class="record-content">
          <Card v-for="(item,index) in minusList"
            :key="index"
            :info="item"
            useType="-"
            :type="minusType" />
        </section>
        <article v-else
          align="center"
          class="default"
          style="background:#fff;padding-bottom:1.6rem">
          <img src="../score/components/add-score/assets/icon.png"
            alt="">
          <p>暂无记录</p>
        </article>
      </article>
      <article class=score-container
        v-if="active===0">
        <section v-if="addScoreList && addScoreList.length > 0"
          class="score-content">
          <Card v-for="(item,index) in addScoreList"
            :key="index"
            :info="item"
            useType="+"
            :type="scoreType" />
        </section>
      </article>
      <article v-if="active===0 && addScoreList && addScoreList.length === 0"
        align="center"
        class="default">
        <img src="../score/components/add-score/assets/icon.png"
          alt="">
        <p>暂无积分</p>
      </article>
    </article>
    <div @click="viewGoods('button')"
      class="button">积分兑好礼</div>
    <Rule @viewGoods="viewGoods"
      @close="isRule=false"
      :show="isRule" />
  </article>
</template>

<script>
import NavBar from '../../components/navBar'
import Rule from '../score/components/rule'
import { AddList, MinusList } from '../../apis/score'
import { UserInfo } from '../../apis/user'
import Card from './components/card'
import { List } from '../../apis/coupon'

export default {
  data () {
    return {
      addScoreList: null,
      minusList: [],
      userInfo: null,
      isRule: false,
      active: 0,
      coupon: 0,
      tabs: [
        {
          title: '获取积分'
        },
        {
          title: '兑换记录'
        }
      ],
      minusType: {
        1: '签到',
        2: '购买盲盒',
        3: '购买透视卡',
        4: '回收奖品'
      },
      scoreType: {
        1: '签到',
        2: '购买盲盒',
        3: '购买透视卡',
        4: '回收奖品'
      }
    }
  },
  methods: {
    showRule () {
      GLOBALS.marchSetsPoint('A_H5PT0225002948')
      this.isRule = true
    },
    use () {
      GLOBALS.marchSetsPoint('A_H5PT0225002949')
      this.$router.push({
        name: 'Index'
      })
    },
    viewGoods (val) {
      if (val) {
        GLOBALS.marchSetsPoint('A_H5PT0225002950')
      }
      this.$router.push({
        name: 'Score',
        query: {
          position: true
        }
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
    ({ data: { data: this.addScoreList } } = await AddList({ page: 1, pageSize: 9999 }));
    ({ data: { data: this.minusList } } = await MinusList({ page: 1, pageSize: 9999 }));
    ({ data: { data: this.userInfo } } = await UserInfo());
    const { data: { data } } = await List({ gameId: 28, params: true })
    this.coupon = data.length
    if (this.$route.query.active) {
      this.active = Number(this.$route.query.active)
    }
    if (this.active === 0) GLOBALS.marchSetsPoint('A_H5PT0225002957')
    else GLOBALS.marchSetsPoint('A_H5PT0225002947')
  },
  components: {
    NavBar,
    Card,
    Rule
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
.record-container {
  border-radius: 0.16rem;
  width: 6.6rem;
  overflow: hidden;
  .record-content {
    padding-top: 0.4rem;
    padding: 0 0.2rem;
    background: #fff;
    border-radius: 0 0 0.16rem 0.16rem;
  }
}
.header {
  padding: 0.4rem 0.3rem 0;
  background: #fff;
  .info {
    background: url("./assets/bg.png") no-repeat;
    background-size: 100% 100%;
    font-size: 0.24rem;
    color: #fff;
    padding: 0.23rem 0.29rem;
    text-align: center;
    border-radius: 0.16rem;
    .card-info {
      display: flex;
      & > div {
        border-right: 1px solid #e5e6ea;
        flex: 1;
        &:last-child {
          border-right: none;
        }
        .count {
          color: #ebd9aa;
          font-size: 0.32rem;
          padding-bottom: 0.2rem;
        }
      }
    }
    .use {
      color: #fff0c8;
      padding-top: 0.3rem;
    }
  }
}
.score-container {
  // overflow: scroll;
  border-radius: 0.16rem;
  background: #fff;
  width: 6.6rem;
  box-sizing: border-box;
  padding: 0 0.3rem;
}
</style>
