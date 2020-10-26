<template>
  <section class="red-packet">
    <div class="red-packet-wrapper" :class="{race0:race==0,race1:race==1,race2:race==2,end:isEnd,showBtn:showBtn}">
      <div class="process-wrapper">
        <ul class="content-wrapper" v-if="list&&list.length">
          <li class="percent-wrapper" :style="{width:(1.2*list.length)+'rem'}"
              :class="{race0:race==0,race1:race==1,race2:race==2,end:isEnd,showBtn:showBtn}">
            <div class="percent" :style="{width:percentWidth}"
                 :class="{race0:race==0,race1:race==1,race2:race==2,end:isEnd,showBtn:showBtn}"></div>
          </li>
          <!--opened:item.state!==0,-->
          <li v-for="(item,index) in list"
              :class="{race0:race==0,race1:race==1,race2:race==2,end:isEnd}">
            <div class="red-packet-content">
              <p>{{conversion(item.amount)}}<img src="../../img/cup.png" alt=""></p>
              <!--:class="{'shake-rotate':item.state===1}"-->
              <p class="red-packet-img">
                <img v-if="item.state===2" src="./img/red-packet-opened.png" alt="已解锁红包">
                <img v-else src="./img/red-packet-locked.png" alt="未解锁红包">
              </p>
              <p style="line-height: .26rem">{{item.awardsName.replace('话费券','')}}<br>话费券</p>
              <div class="bonus-btn" v-if="!isEnd&&showBtn" :class="{receive:item.state==1,complete:item.state===0}"
                   @click="gameReceive(item)">{{btnNames[item.state]}}
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    name: 'redPacket',
    props: {
      info: {
        type: Object,
        default: () => ({})
      },
      list: {
        type: Array,
        default: () => ([])
      },
      race: {
        type: Number,
        default: 0
      },
      isEnd: {
        type: Boolean,
        default: false
      },
      showBtn: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        btnNames: ['去完成', '领取', '已领取']
      }
    },
    computed: {
      isNeedOpen() {
        let bool = false
        let index = this.list && this.list.findIndex(item => item.state === 1)
        if (index > -1) {
          bool = true
        }
        return bool
      },
      percentWidth() {
        let currentNumber = this.isEnd ? 0 : this.info.userInfo.totalNum
        let index = this.list && this.list.findIndex(item => item.state === 0)
        let percent = 0
        if (index > -1) {
          let prevNumber = index ? this.list[index - 1].amount : 0
          let nextNumber = this.list[index].amount
          let addPercent = ((currentNumber - prevNumber) / (nextNumber - prevNumber))
          if (index == 0) {
            percent = addPercent * 0.24
            return `${percent}rem`
          } else {
            percent = (addPercent / 3 + 2 / 3) * 1.44 + (index - 1) * 1.2
            return `${percent}rem`
          }
        } else {
          percent = 100
          return `${percent}%`
        }
      }
    },
    filters: {
      awardsNumberFilter(value) {
        return `${value / 10}元`
      }
    },
    mounted() {

    },
    methods: {
      conversion(value) {
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
      gameReceive(item) {
        this.$emit('gameReceive', item)
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
      width: 6.5rem;
      height: 3rem;
      background: #944F30;
      border-radius: .16rem;
      margin: 0.25rem auto 0;
      text-align: center;
      padding: 0.2rem 0 0;
      box-sizing: border-box;
      &.race1 {
        background: #5F5E84;
      }
      &.race2 {
        background: #D6993D;
      }
      &.end {
        height: 2.3rem;
        background: #0A0A37;
      }
      &:not(.showBtn) {
        height: 2.3rem;
      }
      .process-wrapper {
        position: relative;
        display: flex;
        align-content: center;
        align-items: center;
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
          position: relative;
          overflow-x: scroll;
          overflow-y: hidden;
          -webkit-overflow-scrolling: touch;
          display: flex;
          align-content: center;
          align-items: center;
          li:not(.percent-wrapper) {
            color: #CA9272;
            font-weight: bold;
            display: block;
            min-width: 1.2rem;
            max-width: 1.2rem;
            &.race1 {
              color: #AFB1C5;
            }
            &.race2 {
              color: #FFF0D5;
            }
            &.end {
              color: #7C7BA8;
            }
            .red-packet-content {
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              p {
                white-space: nowrap;
                display: flex;
                justify-content: center;
                align-items: center;
                line-height: 1;
                img {
                  width: .2rem;
                  height: .26rem;
                }
              }
              .red-packet-img {
                width: 0.72rem;
                height: 0.9rem;
                margin: 0.18rem 0 0.1rem;
                img {
                  width: 0.72rem;
                  height: 0.9rem;
                }
              }
              .bonus-btn {
                margin-top: .18rem;
                width: 1rem;
                height: .52rem;
                background: #80320C;
                text-align: center;
                line-height: .52rem;
                border-radius: .26rem;
                &.race1 {
                  background: #3A3769;
                }
                &.race2 {
                  background: #A93700;
                }
                &.receive {
                  color: #FFFFFF;
                  background: linear-gradient(0deg, #F13E41 0%, #FF7D7F 100%);
                }
                &.complete {
                  color: #AD0900;
                  background: linear-gradient(0deg, #FEEB4B, #FFC257);
                }
              }
            }
            &.opened {
              color: #feeb4e;
            }
          }
        }
        .percent-wrapper {
          position: absolute;
          top: 30%;
          margin-top: -0.04rem;
          left: 0;
          height: 0.14rem;
          background: #80320C;
          border-radius: 0.04rem;
          overflow: hidden;
          margin-left: 0;
          &.race1 {
            background: #3A3769;
          }
          &.race2 {
            background: #A93700;
          }
          &.end {
            top: 40%;
            background: #7C7BA8;
          }
          &:not(.showBtn) {
            top: 40%;
          }
          .percent {
            width: 0;
            max-width: 100%;
            height: 0.14rem;
            background: #FEE9D3;
            &.race1 {
              background: #AFB1C5;
            }
            &.race2 {
              background: #FFF0D5;
            }
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
