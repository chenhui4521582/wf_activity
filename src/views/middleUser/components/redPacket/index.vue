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
            {{conversion(info.curGameProgress)}}
          </span>
        </p>
        <p class="next-number">
          <span>
            下个梯度解锁还需支持金叶:
          </span>
          <span class="number">
            {{conversion(info.diffNextProgress)}}
          </span>
        </p>
      </div>
      <div class="process-wrapper">
        <div class="title">
          <p>
            累计支持<br />金叶
          </p>
          <p>
            获得<br />奖励
          </p>
        </div>
        <ul class="content-wrapper" v-if="list&&list.length">
          <li class="percent-wrapper" :style="{width:(0.78*list.length +0.28)+'rem'}">
            <div class="percent" :style="{width:percentWidth}"></div>
          </li>
          <li v-for="(item,index) in list" :class="{opened:item.status!==0}">
            <div class="red-packet-content">
              <p>{{conversion(item.amount)}}</p>
              <p class="red-packet-img" :class="{'shake-rotate':item.status===1}">
                <img v-if="item.status===2" src="./img/red-packet-opened.png" alt="已解锁红包">
                <img v-else src="./img/red-packet-locked.png" alt="未解锁红包">
              </p>
              <p>{{item.awards|awardsNumberFilter}}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <img class="receive-btn need-open" src="./img/receive-icon.png" alt="领取奖励" v-if="isNeedOpen"
      @click="gameReceive">
    <img class="receive-btn" src="./img/not-receive-icon.png" alt="无法领取奖励" v-else>
  </section>
</template>

<script>
export default {
  name: 'redPacket',
  components: {

  },
  props: {
    info: {
      type: Object,
      default: () => ({})
    },
    list: {
      type: Array,
      default: () => ([])
    }
  },
  computed: {
    isNeedOpen () {
      let bool = false
      let index = this.list && this.list.findIndex(item => item.status === 1)
      if (index > -1) {
        bool = true
      }
      return bool
    },
    percentWidth () {
      let currentNumber = this.info.curGameProgress || 0
      let index = this.list && this.list.findIndex(item => item.status === 0)
      let percent = 0
      if (index > -1) {
        let prevNumber = index ? this.list[index - 1].amount : 0
        let nextNumber = this.list[index].amount
        let addPercent = (currentNumber - prevNumber) / (nextNumber - prevNumber)
        percent = addPercent * 0.28 + index * 0.78
        return `${percent}rem`
      } else {
        percent = 100
        return `${percent}%`
      }
    }
  },
  filters: {
    awardsNumberFilter (value) {
      return `${value / 10}元`
    }
  },
  mounted () {

  },
  methods: {
    conversion (value) {
      if (value >= 100000000) {
        return `${Math.floor(value / 10000000) / 10}亿`
      } else if (value >= 10000000) {
        return `${Math.floor(value / 1000000) / 10}千万`
      } else if (value >= 10000) {
        return `${Math.floor(value / 1000) / 10}万`
      } else {
        return value || 0
      }
    },
    gameReceive () {
      GLOBALS.marchSetsPoint('A_H5PT0332004186', {
        task_name: `当前支持金叶:${this.conversion(this.info.curGameProgress)}`
      }) // H5平台-超级任务活动页-累计支持金叶领取奖励按钮点击
      this.$emit('gameReceive')
    }
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
        line-height: 0.4rem;
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
      display: flex;
      align-content: center;
      align-items: center;
      padding-left: 0.16rem;
      .title {
        text-align: left;
        font-size: 0.2rem;
        color: #feeb4e;
        margin-left: 0;
        min-width: 0.8rem;
        p {
          white-space: nowrap;
        }
        p:first-child {
          margin-bottom: 0.36rem;
        }
      }
      .content-wrapper {
        width: 5.66rem;
        position: relative;
        overflow-x: scroll;
        overflow-y: hidden;
        -webkit-overflow-scrolling: touch;
        display: flex;
        align-content: center;
        align-items: center;
        padding-left: 0.28rem;
        li:not(.percent-wrapper) {
          font-size: 0.2rem;
          color: #d3a0ff;
          display: block;
          min-width: 0.78rem;
          max-width: 0.78rem;
          .red-packet-content {
            width: 0.5rem;
            p {
              white-space: nowrap;
            }
            .red-packet-img {
              width: 0.5rem;
              height: 0.6rem;
              margin: 0.08rem 0 0.1rem;
            }
          }
          &.opened {
            color: #feeb4e;
          }
        }
      }
      .percent-wrapper {
        position: absolute;
        top: 50%;
        margin-top: -0.04rem;
        left: 0;
        height: 0.08rem;
        background: #704feb;
        border-radius: 0.04rem;
        overflow: hidden;
        margin-left: 0;
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
