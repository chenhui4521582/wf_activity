<template>
  <section class="win_pop" :style="{zIndex:isShowPop?100:99}">
    <div class="pop-mask" v-if="isShowPop" @touchmove.prevent></div>
    <transition name="scalc">
      <div class="pop" v-if="isShowPop">
        <div class="wrap">
          <div class="main">
            <div class="container_winpop">
              <p class="title">恭喜抽中</p>
              <p class="bestname">上上签</p>
              <p class="content">奖励XX元话费券去竞技台球中消耗1000金叶子，即可获得~</p>
              <div class="btnred" @click="receive">立即完成</div>
            </div>
            <div class="footer" @click="openmine">可在活动页面-<i>我抽到的签查看>></i></div>
          </div>
          <div class="close" @click="close">
          </div>
        </div>
      </div>
    </transition>
  </section>
</template>

<script>
  import {getAllRecords} from '../utils/api'
  export default {
    name: 'winpop',
    data() {
      return {
        isShowPop: false
      }
    },
    props: {
      awardData: {
        type: Object,
        default: () => null
      },
      countTime: {
        type: String,
        default: ''
      },
      actInfoData: {
        type: Object,
        default: null
      }
    },
    components: {
      scroll: () => import('./scroll')
    },
    methods: {
      async showPop() {
        GLOBALS.marchSetsPoint('A_H5PT0274003246')
        this.isShowPop = true
      },
      close(data) {
        this.isShowPop = false
      },
      move(e) {
        e.preventDefault()
      },
      openmine() {
        this.isShowPop = false
        this.$emit('openmine')
      },
      receive(){
        //H5平台-上上签活动-立即抽签-抽中奖励弹窗-开心收下点击 A_H5PT0274003247
        //H5平台-上上签活动-立即抽签-抽中奖励弹窗-开心收下点击 A_H5PT0274003248
        GLOBALS.marchSetsPoint('A_H5PT0274003247')
      }
    },
    watch: {
      isShowPop(value) {
        if (value) {
          document.body.style.overflow = 'hidden'
          document.addEventListener('touchmove', this.move, {passive: false})
        } else {
          document.body.style.overflow = null
          document.removeEventListener('touchmove', this.move, {passive: false})
        }
      }
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .win_pop {
    position: fixed;
    top: 2.5rem;
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
      width: 7.2rem;
      .wrap {
        margin: 0 auto;
        box-sizing: border-box;
        .main {
          width: 3.34rem;
          height: 5.85rem;
          font-size: 0.2rem;
          background: url("../images/compop/popbg.png");
          background-size: 100% 100%;
          color: #fff;
          position: relative;
          left: 50%;
          margin-left: -1.67rem;
          box-sizing: border-box;
          .container_winpop {
            height: 100%;
            padding: .65rem .78rem .61rem .78rem;
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            align-items: center;
            font-weight: bold;
            font-size: .36rem;
            text-align: center;
            .title {
              color: rgba(139, 24, 36, 1);
              margin-bottom: .1rem;
            }
            .bestname, .content {
              display: flex;
              align-items: center;
              &.bestname {
                height: 1.78rem;
                color: rgba(254, 201, 171, 1);
              }
              &.content {
                height: 1.7rem;
                font-size: .24rem;
                color: rgba(150, 58, 21, 1);
              }
            }
            .btnred {
              width: 1.74rem;
              height: .6rem;
              background: #F8783F;
              font-size: .24rem;
              color: rgba(255, 252, 247, 1);
              line-height: .6rem;
              text-align: center;
              border-radius: .3rem;
            }
          }
          .footer {
            width: 6rem;
            position: absolute;
            bottom: -.6rem;
            font-size: .24rem;
            font-weight: bold;
            color: rgba(255, 252, 247, 1);
            i {
              text-decoration: underline;
            }
          }
        }
        .close {
          width: .6rem;
          height: .6rem;
          background: url("../images/compop/close.png") no-repeat center
            center / 100% 100%;
          position: absolute;
          bottom: -1.6rem;
          left: 0;
          right: 0;
          margin: auto;
        }
      }
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
