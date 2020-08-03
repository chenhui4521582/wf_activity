<template>
  <article class="sign-in">
    <section class="title">累计登陆，赚话费红包</section>
    <section class="sign-in-wrapper">
      <p class="desc">
        已累计登陆
        <span>{{info.loginDayNum}}天</span>
      </p>
      <ul class="list">
        <li v-for="item in list" :class="`type-${item.day}${item.status}`" @click="receive(item)">
          <p>
            <template v-if="item.day%2"><span class="fs24">{{item.day}}天</span></template>
            <template v-else-if="item.status===2">
              <span class="fs18">红包</span> <br /><span class="fs18">已领取</span>
            </template>
            <template v-else>
              <span class="fs20">{{item.awardNum}}个</span> <br /><span class="fs18">话费红包</span>
            </template>
          </p>
        </li>
      </ul>
    </section>
  </article>
</template>

<script>
/* eslint-disable no-undef */
import { loginAward } from '../../services/api'
import _get from 'lodash.get'
export default {
  name: 'signIn',
  components: {

  },
  props: {
    info: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      actInfo: JSON.parse(JSON.stringify(this.info))
    }
  },
  computed: {
    list () {
      let currentDay = this.actInfo.loginDayNum
      let list = [{ day: 1, status: 0, num: 0 }, { day: 2, status: 0, num: 0 }, { day: 3, status: 0, num: 0 }, { day: 4, status: 0, num: 0 }, { day: 5, status: 0, num: 0 }, { day: 6, status: 0, num: 0 }]
      let loginAwardRsps = this.actInfo.loginAwardRsps.map(item => ({
        day: item.loginDayNum,
        status: item.status,
        awardNum: item.awardNum || 0
      }))
      loginAwardRsps.forEach(element => {
        let index = list.findIndex(item => {
          return element.day === item.day
        })
        list[index].status = element.status
        list[index].awardNum = element.awardNum
      })
      list = list.map(item => ({
        day: item.day,
        status: (item.day % 2 ? currentDay >= item.day ? 2 : 0 : item.status),
        awardNum: item.awardNum
      }))
      return list
    }
  },
  mounted () {

  },
  methods: {
    async receive (item) {
      if (!(item.day % 2) && item.status === 1) {
        const res = await loginAward(item.day)
        const code = _get(res, 'code', 0)
        const data = _get(res, 'data', 0)
        if (code === 200) {
          let award = {
            name: `话费红包*${item.awardNum}，价值${item.awardNum / 10}元`,
            desc: ''
          }
          this.$set(this.actInfo.loginAwardRsps, item.day / 2 - 1, data)
          this.$emit('show-pop', 'redpackage', award, '恭喜获得')
          GLOBALS.marchSetsPoint('A_H5PT0312003886', { 'awards_id': item.day, 'awards_name': item.awardNum + '个话费红包' }) // H5平台-累充0用户回流活动-登录奖励领取
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.sign-in {
  position: relative;
  margin-top: 0.3rem;
  .title {
    width: 6.24rem;
    height: 0.7rem;
    background: url('../../img/title-bg.png') no-repeat center center;
    background-size: 100% 100%;
    font-size: 0.3rem;
    color: #ffd5d5;
    text-align: center;
    line-height: 0.56rem;
    margin: auto;
  }
  .sign-in-wrapper {
    width: 6.6rem;
    height: 2.36rem;
    margin: 0.1rem auto 0;
    background: url('../../img/sign-bg.png') no-repeat center center;
    background-size: 100% 100%;
    .desc {
      font-size: 0.3rem;
      color: #783111;
      text-align: center;
      line-height: 0.46rem;
      span {
        color: #dd2930;
        font-weight: bold;
      }
    }
    .list {
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      li {
        width: 0.86rem;
        height: 1.16rem;
        white-space: nowrap;
        font-weight: 400;
        position: relative;
        margin: 0.36rem 0.1rem 0;
        p {
          position: absolute;
          bottom: 0.1rem;
          width: 100%;
          line-height: 1;
        }
        .fs18 {
          font-size: 0.18rem;
        }
        .fs20 {
          font-weight: bold;
          font-size: 0.2rem;
        }
        .fs24 {
          font-size: 0.24rem;
        }
        background: no-repeat center center;
        background-size: 100% 100%;
        &.type-10,
        &.type-30,
        &.type-50 {
          color: #4e4c4c;
          background-image: url('../../img/odd-grey-bg.png');
        }
        &.type-12,
        &.type-32,
        &.type-52 {
          color: #e3292a;
          background-image: url('../../img/odd-orange-bg.png');
        }
        &.type-20,
        &.type-40,
        &.type-60 {
          color: #4e4c4c;
          background-image: url('../../img/even-grey-bg.png');
        }
        &.type-21,
        &.type-41,
        &.type-61 {
          color: #fff;
          background-image: url('../../img/even-red-bg.png');
          animation: shake 0.5s infinite;
        }
        &.type-22,
        &.type-42,
        &.type-62 {
          color: #e3292a;
          background-image: url('../../img/even-orange-bg.png');
        }
      }
    }
  }
}
@keyframes shake {
  0% {
    transform-origin: center center;
    transform: rotateZ(0deg);
  }
  20% {
    transform-origin: center center;
    transform: rotateZ(10deg);
  }
  40% {
    transform-origin: center center;
    transform: rotateZ(-10deg);
  }
  60% {
    transform-origin: center center;
    transform: rotateZ(5deg);
  }
  80% {
    transform-origin: center center;
    transform: rotateZ(-5deg);
  }
  100% {
    transform-origin: center center;
    transform: rotateZ(0deg);
  }
}
</style>