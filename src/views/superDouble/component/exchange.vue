<template>
  <article class="exchange-wrapper">
    <h4 class="module-title">欢乐兑换专区</h4>
    <section class="other">
      <p>
        可兑换糖豆{{info.totalNum}}个
      </p>
      <div class="profit-btn" @click="openPop(3)">
        <img src="../img/profit-icon.png" alt="">
      </div>
    </section>
    <section class="awards-list-wrapper" v-if="awardsConfigList&&awardsConfigList.length">
      <ul class="awards-list">
        <li v-for="(item,index) in awardsConfigList" :key="index">
          <div class="award-wrapper">
            <div class="award-img">
              <img :class="item.desc" :src="item.img|filter" alt="">
            </div>
            <p class="award-name">{{item.name}}</p>
          </div>
          <div class="award-price" @click="hanleClick(item)">{{item.cost}}个糖豆</div>
        </li>
      </ul>
    </section>
    <section>
      <div class="cost-btn" @click="openPop(99)">
        {{btnText}}
      </div>
    </section>
  </article>
</template>

<script>
import { exchange } from '../services/api'
export default {
  name: 'exchange',
  data () {
    return {
      btnText: '>>获取更多糖豆<<'
    }
  },
  computed: {
    awardsConfigList () {
      return this.info.awardsConfigList
    }
  },
  props: {
    info: {
      type: Object,
      default: () => ({})
    }
  },
  mounted () {

  },
  methods: {
    openPop (type, item) {
      switch (type) {
        case 3:
          GLOBALS.marchSetsPoint('A_H5PT0301003589') // H5平台-疯狂翻倍活动-排行榜按钮点击
          break
        case 99:
          GLOBALS.marchSetsPoint('A_H5PT0301003590') // H5平台-疯狂翻倍活动-底部获取更多糖豆点击
          break

        default:
          break
      }
      this.$emit('open-pop', type, item)
    },
    hanleClick (item) {
      if (item.cost > this.info.totalNum) {
        this.openPop(7)
      } else {
        this.openPop(10, item)
        GLOBALS.marchSetsPoint('A_H5PT0301003603') // H5平台-疯狂翻倍活动-确认兑换弹窗加载完成
      }
    },
    async _exchange (item) {
      const { code, data } = await exchange(item.level)
      if (code === 200) {
        let awardInfo = {
          name: data.awardsName,
          desc: data.awardsType,
          img: data.img
        }
        this.openPop(11, awardInfo)
        this.$emit('change-activity-info', { totalNum: data.totalNum })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.exchange-wrapper {
  height: 6.04rem;
  background-image: url(../img/exchange-bg.png);
  background-repeat: no-repeat;
  background-position: center top;
  background-size: 6.76rem 5.58rem;
  margin-top: 0.38rem;
  position: relative;
  text-align: center;
  .cost-btn {
    background-image: url(../img/yellow-btn-bg.png);
  }
  .other {
    color: #b2fff8;
    font-size: 0.28rem;
    margin-top: 0.48rem;
    position: relative;
    .profit-btn {
      position: absolute;
      width: 1.7rem;
      height: 0.66rem;
      top: -0.2rem;
      left: 70%;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .awards-list-wrapper {
    margin: 0.3rem auto 0;
    overflow: hidden;
    box-sizing: border-box;
    width: 6.3rem;
    .awards-list {
      width: 100%;
      overflow-y: hidden;
      overflow-x: scroll;
      -webkit-overflow-scrolling: touch;
      display: flex;
      flex-wrap: nowrap;
      align-items: center;
      justify-content: flex-start;
      li {
        &:not(:last-child) {
          margin-right: 0.22rem;
        }
        .award-wrapper {
          width: 1.5rem;
          height: 1.78rem;
          background: url(../img/exchange-item-bg.png) no-repeat;
          background-size: 100% 100%;
          .award-img {
            width: 1.5rem;
            height: 1.2rem;
            position: relative;
            padding-top: 0.08rem;
            img {
              position: absolute;
              left: 50%;
              top: 50%;
              max-width: 90%;
              max-height: 80%;
              transform: translate(-50%, -43%);
              &.hfq,
              &.jdk {
                padding-top: 0.04rem;
              }
              &.jyz {
                width: 70%;
              }
              &.sw {
                height: 70%;
              }
            }
          }
          .award-name {
            color: #003e5c;
            line-height: 0.5rem;
            font-size: 0.24rem;
            font-weight: bold;
            width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            box-sizing: border-box;
            padding: 0 0.08rem;
          }
        }
        .award-price {
          margin-top: 0.16rem;
          width: 1.5rem;
          height: 0.66rem;
          line-height: 0.72rem;
          background: url(../img/exchange-item-btn.png) no-repeat;
          background-size: 100% 100%;
          color: #003e5c;
          font-size: 0.24rem;
          font-weight: bold;
        }
      }
    }
  }
}
</style>
