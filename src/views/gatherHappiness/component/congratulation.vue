<template>
  <div class="mask" v-if="isPopOpen">
    <!-- 第一种短背景 -->
    <div class="congra-bc" :class="{'congra2-bc':activityInfo.myBlessing>=10000}">
      <!-- 第二种长背景 -->
      <div class="congra-title">
        <img src="../img/congratulation/title.png" alt />
      </div>
      <div class="congra-inner-container">
        <!-- 里面固定高度的容器  切换这个容器 -->
        <div class="congra-inner">
          <div class="top-text">
            <span>您获得</span>
            <span>{{activityInfo.incrBlessing}}福气值</span>
          </div>
          <div class="congra-img">
            <img src="../img/congratulation/fudai.png" alt />
          </div>
          <!-- 共用底部三行 -->
          <div class="congra-bottom">
            <!-- 判断 恭喜1-->
            <div class="congra-1" v-if="activityInfo.myBlessing<10000">
              <div>
                <span>
                  就差一点明天返利
                  <span style="color:#feec21;font-size:0.24rem;">10倍</span>金叶
                </span>
              </div>
              <div @click="toMall()">
                <img src="../img/congratulation/button.png" alt />
              </div>
              <div>
                <span>福利记录页可查询获取历史</span>
              </div>
            </div>
            <!-- 恭喜2 -->
            <div v-if="activityInfo.myBlessing>=10000" class="congra-2">
              <div>
                <span>福气值已累计<em>10000</em>,今日游戏消耗</span><br>
                <span>金叶的<em>1%</em>将在明天返利</span>
              </div>
              <div @click="openGamePop()">
                <img src="../img/congratulation/goplay.png" alt />
              </div>
              <div @click="toMall()">
                <img src="../img/congratulation/continue.png" alt />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="congra-close" @click="close()">
      <img src="../img/comPop/close.png" alt />
    </div>
  </div>
</template>
<script>
/* eslint-disable no-undef */
export default {
  data () {
    return {
      isPopOpen: true
    }
  },
  methods: {
    close () {
      this.isPopOpen = false
    },
    openGamePop () {
      this.isPopOpen = false
      this.$emit('openGamePop')
    },
    toMall () {
      this.isPopOpen = false
      location.href = '/xmWap/#/payment/'
    }
  },
  mounted () {
    GLOBALS.marchSetsPoint('A_H5PT0234002734') // H5平台-集福气赢大奖页-福气值新增弹窗加载完成
  },
  props: {
    activityInfo: {
      type: Object,
      default: {}
    }
  }
}
</script>
<style lang="less" scoped>
.mask {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 5;
  background-color: rgba(0, 0, 0, 0.5);
  .congra-bc {
    background: url("../img/congratulation/bc.png");
    background-size: 100% 100% !important;
    width: 6.46rem;
    height: 9.72rem;
    margin: 0 auto;
    .congra-title {
      position: relative;
      top: 2.91rem;
      margin: 0 auto;
      display: flex;
      justify-content: center;
      width: 100%;
      img {
        width: 0.77rem;
        height: 0.38rem;
      }
    }
    .congra-inner-container {
      position: relative;
      top: 3.2rem;
      width: 75%;
      margin: 0 auto;
      .congra-inner {
        display: flex;
        justify-content: center;
        height: 4.7rem;
        .top-text {
          line-height: 0.34rem;
          span:first-child {
            color: #fff6df;
            font-size: 0.3rem;
            text-align: center;
            display: block;
          }
          span:last-child {
            display: block;
            color: #feec21;
            font-size: 0.3rem;
            text-align: center;
          }
        }
        .congra-img {
          position: absolute;
          top: 0.8rem;

          img {
            width: 1.66rem;
            height: 1.7rem;
          }
        }
        .congra-bottom {
          position: absolute;
          top: 2.75rem;
          .congra-1 :nth-child(1) {
            display: flex;
            justify-content: center;
            span:first-child {
              color: #fff6df;
              font-size: 0.24rem;
            }
          }
          .congra-1 :nth-child(2) {
            width: 3.28rem;
            // height: 0.98rem;
            display: flex;
            justify-content: center;
            img {
              width: 3.28rem;
              height: 0.98rem;
            }
          }
          .congra-1 :nth-child(3) {
            display: flex;
            justify-content: center;
            span {
              font-size: 0.2rem;
              font-weight: bold;
              color: rgba(255, 255, 255, 1);
            }
          }
        }
      }
    }

    &.congra2-bc {
      background-image: url("../img/congratulation/bc2.png");
      height: 10.12rem;
      .congra-inner-container {
        background: url("../img/congratulation/light.png");
        background-size: cover;
        background-position: center -1rem;
        .congra-inner {
          .congra-bottom {
            top: 2.6rem;
          }
          .congra-2 {
            margin: 0 auto;
            text-align: center;
            padding: 0 0.4rem;
            div {
              font-size: 0;
            }
            span {
              color: #fff6df;
              font-size: 0.24rem;
              line-height: 0.28rem;
            }
            em {
              color: #feec21;
              font-style: normal;
            }
            img {
              width: 3.28rem;
              height: 0.98rem;
            }
          }
        }
      }
    }
  }
  .congra-close {
    position: absolute;
    //   top: 11.43rem;
    left: 50%;
    -webkit-transform: translateX(-50%);
    transform: translateX(-50%);
    img {
      width: 0.52rem;
      height: 0.52rem;
    }
  }
}
</style>