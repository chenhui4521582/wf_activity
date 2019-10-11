<template>
  <section :class="getClassName('rule')">
    <div class="pop-mask" @touchmove.prevent></div>
    <transition name="scalc">
      <div class="pop">
        <div :class="getClassName('wrap')" @click="close(from)">
          <template v-if="from!=1">
            <div :class="getClassName('btn btn-yellow')" @click="btnyellowclick">
            </div>
            <div :class="getClassName('product-img')">
              <div class="item">
                <img :src="carddata.awardsImage|filter" alt="" v-if="carddata">
                <span>{{carddata&&carddata.awardsName}}</span>
              </div>
            </div>
            <template v-if="carddata">
              <div class="info" v-if="carddata.grandPrixFlag">
                恭喜您中奖啦！
              </div>
              <div class="info" v-else>
                很遗憾，<br>您与大奖擦肩而过~
              </div>
            </template>
          </template>
        </div>
        <div class="close-icon" @click="close(0)"></div>
      </div>
    </transition>
  </section>
</template>

<script>
  export default {
    name: "rule",
    data() {
      return {
        isShowPop: false
      };
    },
    props: {
      carddata: {
        type: Object,
        default: null
      }
    },
    methods: {
      close(flag) {
        this.$emit('close', flag)
      },
      getClassName(name) {
        if (this.from) {
          return `${name} flag${this.from}`
        } else {
          return name
        }
      },
      btnyellowclick() {
        this.$emit('close', 0)
      }
    },
    mounted() {
    }
  };
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .rule {
    position: fixed;
    top: 2.27rem;
    z-index: 2;
    .pop-mask {
      position: fixed;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.55);
    }
    .pop {
      position: relative;
      z-index: 10;
      .wrap {
        margin: 0 auto;
        box-sizing: border-box;
        padding: 1.06rem 0.2rem 0;
        .main {
          font-size: 0.2rem;
          font-weight: bold;
          color: rgba(236, 110, 71, 1);
          .text {
            display: flex;
            i {
              margin-top: .1rem;
              display: inline-block;
              width: .1rem;
              height: .1rem;
              background: rgba(236, 110, 71, 1);
              border-radius: 50%;
              margin-right: .18rem;
            }
            span {
              max-width: 4.2rem;
            }
            line-height: 0.3rem;
          }
        }
        padding: 2.9rem 0.2rem 0;
        width: 7.2rem;
        height: 8.26rem;
        background: url("./images/pop/bg.png") no-repeat center center /
        100% 100%;
        .gradationimg {
          position: absolute;
          top: 3rem;
          left: 0;
          right: 0;
          width: 3.51rem;
          height: 1.04rem;
          margin: auto;
        }
        .product-img {
          position: absolute;
          top: 2.7rem;
          left: 2rem;
          right: 2.15rem;
          text-align: center;
          font-size: .18rem;
          font-weight: 400;
          color: #3f1207;
          line-height: .3rem;
          height: 2.6rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .item {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            width: 100%;
            height: 2.6rem;
            align-items: center;
            img {
              height: 1.6rem;
            }
            span {
              width: 1.81rem;
              height: .48rem;
              line-height: .48rem;
              font-size: .32rem;
              font-weight: 400;
              color: rgba(255, 251, 172, 1);
              background: url("./images/pop/txtname.png");
              background-size: 100% 100%;
              overflow: hidden;
            }
          }
        }
        .btn {
          width: 4.9rem;
          height: 1.06rem;
          left: 50%;
          transform: translateX(-50%);
          &.btn-yellow {
            background: url("./images/pop/btn.png");
            background-size: 100% 100%;
            top: 6.43rem;
          }
          position: absolute;
          line-height: .7rem;
          text-align: center;
          font-size: .26rem;
          font-weight: bold;
          color: rgba(144, 79, 34, 1);
          padding-bottom: .2rem;
          box-sizing: border-box;
          &.btn-pink {
            background: url("./images/pop/btn.png");
            background-size: 100% 100%;
            bottom: 2rem;
            color: rgba(255, 210, 217, 1);
          }
        }
        .info {
          position: absolute;
          bottom: 2rem;
          left: 2rem;
          right: 2.15rem;
          text-align: center;
          font-size: .28rem;
          font-weight: 400;
          color: #ffffff;
          height: .8rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          line-height: .4rem;
        }
        .info1 {
          position: absolute;
          bottom: 2.75rem;
          left: 0;
          right: 0;
          text-align: center;
          font-size: .3rem;
          font-weight: 400;
          color: rgba(255, 98, 53, 1);
          line-height: .3rem;
        }
      }
      /*.close-icon {
        width: 0.6rem;
        height: 0.6rem;
        background: url("../pages/images/common/close.png") no-repeat center
          center / 100% 100%;
        margin: 0.4rem auto 0;
      }*/
    }
    .scalc-enter-active {
      animation: fadeAnimation 0.3s ease-in-out;
    }
    @keyframes fadeAnimation {
      0% {
        transform: scale(0);
      }
      50% {
        transform: scale(1.2);
      }
      100% {
        transform: scale(1);
      }
    }
  }
</style>
