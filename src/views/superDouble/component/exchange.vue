<template>
  <article class="exchange-wrapper">
    <h4 class="module-title">欢乐兑换专区</h4>
    <section class="other">
      <p>
        可兑换糖豆{{info.totalNum}}个
      </p>
      <div class="profit-btn">
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
          <div class="award-price">{{item.cost}}个糖豆</div>
        </li>
      </ul>
    </section>
    <section>
      <div class="cost-btn">
        {{btnText}}
      </div>
    </section>
  </article>
</template>

<script>
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
    padding-top: 0;
    line-height: 1.14rem;
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
      right: 0.6rem;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .awards-list-wrapper {
    margin: 0.3rem 0.5rem 0;
    overflow: hidden;
    box-sizing: border-box;
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
