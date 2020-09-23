<template>
  <section :class="getClassName('popTask')" :style="{zIndex:isShowPop?100:99}">
    <div class="pop-mask" v-if="isShowPop" @touchmove.prevent></div>
    <transition name="scalc">
      <div class="pop" v-if="isShowPop">
        <div :class="getClassName('wrap')">
          <div :class="getClassName('main')">
            <div :class="getClassName('container_compop')">
              <scroll>
                <div>
                  <task :selectedIndex="selectedIndex" :selectedItem="selectedItem"></task>
                </div>
              </scroll>
            </div>
          </div>
          <div class="close" @click="close">
          </div>
        </div>
      </div>
    </transition>
  </section>
</template>

<script>
  // import {getAwardsRecord, getHistoryRankList, gainAwardsRecord, getRankListPersonal} from '../utils/api'

  export default {
    name: 'comPop',
    data() {
      return {
        isShowPop: false,
      }
    },
    props: {
      selectedItem:{
        type:Object,
        default:null
      },
      selectedIndex:{
        type:Number,
        default:0
      }
    },
    components: {
      scroll: () => import('./scroll'),
      task:()=>import('./task')
    },
    methods: {
      getClassName(name) {
        return `${name} flag${this.popType}`
      },
      async showPop() {
        this.isShowPop = true
      },
      close() {
        this.$emit('close')
        this.isShowPop = false
      },
      move(e) {
        e.preventDefault()
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
  .popTask {
    position: fixed;
    left: 50%;
    top: .5rem;
    margin-left: -3.25rem;
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
        .main {
          height: 9rem;
          width: 6.5rem;
          font-size: 0.2rem;
          color: #fff;
          position: relative;
          top: -.1rem;
          padding: 2.2rem .2rem 0;
          box-sizing: border-box;
          .container_compop {
            box-sizing: border-box;
            position: absolute;
            left: 0;
            top: 0;
            height: 9rem;
            width: 6.5rem;
            border: 2px solid #FFAE66;
            background: #AC221E;
            border-radius: .4rem;
            overflow: hidden;
            p {
              color: rgba(255, 255, 255, 1);
              box-sizing: border-box;
              font-size: .26rem;
              line-height: .36rem;
              &.center {
                text-align: center;
                text-decoration: underline;
              }
              i {
                color: #FFE795;
                font-weight: bold;
              }
              span {
                font-weight: bold;
              }
            }
          }
          .myrank {
            height: .97rem;
            background: rgba(255, 255, 255, 1);
            border: .02rem solid rgba(255, 198, 169, 1);
            border-radius: 0 0 .2rem .2rem;
            display: flex;
            position: absolute;
            left: 0;
            right: 0;
            bottom: -.2rem;
            margin: auto;
            width: 5.86rem;
            justify-content: space-around;
            align-items: center;
            text-align: center;
            .item {
              font-size: .22rem;
              font-weight: 400;
              color: rgba(87, 42, 231, 1);
              .myrank_title {
                margin-bottom: .15rem;
                color: rgba(50, 30, 68, 1);
              }
            }
          }
        }
        .close {
          width: .6rem;
          height: .6rem;
          background: url("../images/close.png") no-repeat center
            center / 100% 100%;
          position: absolute;
          bottom: -.8rem;
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
