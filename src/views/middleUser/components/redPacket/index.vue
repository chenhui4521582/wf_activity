<template>
  <section class="red-packet">
    <div class="red-packet-wrapper">
      <h4>3个游戏在任务开放时段累计支持金叶</h4>
      <div class="number-wrapper">
        <p class="current-number">
          <span>
            当前支持金叶:
          </span>
          <span class="number">
            {{info.currentNumber|conversion}}
          </span>
        </p>
        <p class="next-number">
          <span>
            下个梯度解锁还需支持金叶:
          </span>
          <span class="number">
            {{info.nextNumber|conversion}}
          </span>
        </p>
      </div>
      <div class="process-wrapper">
        <div class="percent-wrapper">
          <div class="percent" :style="{width:percentWidth}"></div>
        </div>
        <ul>
          <li class="title">
            <p>
              累计支持<br />金叶
            </p>
            <p>
              获得<br />奖励
            </p>
          </li>
          <li v-for="(item,index) in list" :class="{opened:item.status!==1}">
            <p>{{item.number|conversion}}</p>
            <p class="red-packet-img" :class="{'shake-rotate':item.status===0}">
              <img v-if="item.status===2" src="./img/red-packet-opened.png" alt="已解锁红包">
              <img v-else src="./img/red-packet-locked.png" alt="未解锁红包">
            </p>
            <p>{{item.awards|awardsNumberFilter}}</p>
          </li>
        </ul>
      </div>
    </div>
    <img class="receive-btn need-open" src="./img/receive-icon.png" alt="领取奖励" v-if="isNeedOpen">
    <img class="receive-btn" src="./img/not-receive-icon.png" alt="领取奖励" v-else>
  </section>
</template>

<script>
export default {
  name: 'redPacket',
  components: {

  },
  props: {
    // info: {
    //   type: Object,
    //   default: () => ({})
    // }
  },
  data () {
    return {
      info: {
        currentNumber: 120000,
        nextNumber: 10000
      },
      list: [
        {
          awards: 5,
          number: 50000,
          status: 2
        },
        {
          awards: 5,
          number: 100000,
          status: 0
        },
        {
          awards: 5,
          number: 150000,
          status: 1
        },
        {
          awards: 5,
          number: 250000,
          status: 1
        },
        {
          awards: 5,
          number: 350000,
          status: 1
        },
        {
          awards: 5,
          number: 450000,
          status: 1
        },
        {
          awards: 5,
          number: 950000,
          status: 1
        }
      ]
    }
  },
  computed: {
    isNeedOpen () {
      let bool = false
      let index = this.list.findIndex(item => item.status === 0)
      if (index > -1) {
        bool = true
      }
      return bool
    },
    percentWidth () {
      let currentNumber = this.info.currentNumber || 0
      let basePercent = 0.125
      let index = this.list.findIndex(item => item.status === 1)
      let percent = 0
      if (index > -1) {
        let prevNumber = index ? this.list[index - 1].number : 0
        let nextNumber = this.list[index].number
        let addPercent = (currentNumber - prevNumber) / (nextNumber - prevNumber)
        percent = basePercent * (index + addPercent) * 100
      } else {
        percent = 100
      }

      return `${percent}%`
    },
  },
  filters: {
    conversion (value) {
      if (value >= 10000) {
        return `${Math.floor(value / 1000) / 10}万`
      } else {
        return value || 0
      }
    },
    awardsNumberFilter (value) {
      return `${value / 10}元`
    }
  },
  mounted () {

  },
  methods: {
  }
}
</script>

<style lang="less" scoped>
.backImg(@url) {
  background: url(@url) no-repeat center center;
  background-size: 100% 100%;
}
.red-packet {
  position: relative;
  .red-packet-wrapper {
    width: 6.8rem;
    height: 3.44rem;
    .backImg('./img/red-packet-bg.png');
    margin: 0.8rem auto 0;
    text-align: center;
    padding: 0.36rem 0.1rem 0;
    box-sizing: border-box;
    h4 {
      font-size: 0.24rem;
      font-weight: bold;
      color: #e5c6ff;
      line-height: 0.3rem;
      margin: 0 auto 0.24rem;
    }
    .number-wrapper {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 0.2rem;
      color: #d3a0ff;
      .current-number {
        border-radius: 0 0.2rem 0.2rem 0;
        .number {
          color: #04feff;
        }
      }
      .next-number {
        border-radius: 0.2rem 0 0 0.2rem;
        .number {
          color: #feeb4c;
        }
      }
      .current-number,
      .next-number {
        height: 0.4rem;
        line-height: 0.44rem;
        background: #220856;
        padding: 0 0.2rem;
        .number {
          font-weight: bold;
          margin-left: 0.06rem;
        }
      }
    }
    .process-wrapper {
      margin-top: 0.3rem;
      position: relative;
      ul {
        display: flex;
        align-content: center;
        align-items: center;
        padding-left: 0.16rem;
        li {
          font-size: 0.2rem;
          color: #d3a0ff;
          margin-left: 0.28rem;
          .red-packet-img {
            width: 0.5rem;
            height: 0.6rem;
            margin: 0.08rem 0 0.1rem;
          }
          &:nth-child(2) {
            margin-left: 0.14rem;
          }
          &.opened {
            color: #feeb4e;
          }
        }
        .title {
          text-align: left;
          font-size: 0.2rem;
          color: #feeb4e;
          margin-left: 0;
          p:first-child {
            margin-bottom: 0.36rem;
          }
        }
      }
      .percent-wrapper {
        position: absolute;
        top: 50%;
        margin-top: -0.04rem;
        left: 0.86rem;
        width: 5.66rem;
        height: 0.08rem;
        background: #704feb;
        border-radius: 0.04rem;
        overflow: hidden;
        .percent {
          width: 0;
          max-width: 100%;
          height: 0.08rem;
          background: #feeb4e;
        }
      }
    }
  }
  .receive-btn {
    position: absolute;
    width: 2.3rem;
    height: 0.84rem;
    bottom: -0.42rem;
    left: 50%;
    margin-left: -1.15rem;
  }
}
.shake-rotate {
  animation: shake-rotate 200ms infinite ease-in-out 0s running;
}

@keyframes shake-rotate {
  0% {
    transform: translate(0px, 0px) rotate(0deg);
  }

  2% {
    transform: translate(0px, 0px) rotate(2deg);
  }

  50% {
    transform: translate(0px, 0px) rotate(0deg);
  }

  98% {
    transform: translate(0px, 0px) rotate(-2deg);
  }

  100% {
    transform: translate(0px, 0px) rotate(0deg);
  }
}
</style>
