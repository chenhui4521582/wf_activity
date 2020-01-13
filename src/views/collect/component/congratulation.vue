<template>
  <div class="mask" v-if="popNumber==1&&closePop">
    <!-- 第一种短背景 -->
    <div class="congra-bc">
      <!-- 第二种长背景 -->
      <!-- <div class="congra2-bc" v-if="popNumber==2"> -->
      <div class="congra-title">
        <img src="../images/congratulation/title.png" alt />
      </div>

      <!-- 容器不变 -->

      <div class="congra-inner-container">
        <!-- 里面固定高度的容器  切换这个容器 ↓-->
        <div class="congra-inner">
          <div class="top-text">
            <span>您获得</span>
            <span>6666623福气值</span>
          </div>
          <div class="congra-img">
            <img src="../images/congratulation/fudai.png" alt />
          </div>
          <!-- 共用底部三行 -->
          <div class="congra-bottom">
            <!-- 判断 恭喜1-->
            <div class="congra-1" v-if="true">
              <div>
                <span>
                  就差一点明天返利
                  <span style="color:#feec21;font-size:0.24rem;">10倍</span>金叶
                </span>
              </div>
              <div>
                <img src="../images/congratulation/button.png" alt />
              </div>
              <div>
                <span>福利记录页可查询获取历史</span>
              </div>
            </div>
            <!-- 恭喜2 -->
            <div v-if="false" class="congra-2">
              <div>
                <span>
                  <span>福气值已累计</span>
                  <span style="color:#FEEC21;font-size:0.24rem">10000</span>
                  <span>,今日游戏消耗金叶的</span>
                  <span style="color:#FEEC21;font-size:0.24rem">1%</span>
                  <span>将在明天返利</span>
                </span>
              </div>
              <div>
                <img src="../images/congratulation/goplay.png" alt />
              </div>
              <div>
                <img src="../images/congratulation/continue.png" alt />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="congra-close" @click="congra_back">
      <img src="../images/comPop/close.png" alt />
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      close: false,
      //   control:true,
      closePop: true
    }
  },
  methods: {
    congra_back () {
      this.$emit('congra_back', this.close)
      this.closePop = false
      console.log(this.closePop)
    }
  },
  props: {
    popNumber: {
      type: Number,
      default: 0
    }
  }
}
</script>
<style lang="less">
.mask {
  width: 7.2rem;
  position: fixed;
  top: 0;
  height: 100vh;
  z-index: 5;
  background-color: rgba(0, 0, 0, 0.5);
  .congra2-bc {
    background: url("../images/congratulation/bc2.png") !important;
    background-size: 100% 100% !important;
    width: 6.46rem;
    height: 10.12rem;
    margin: 0 auto;
  }
  .congra-bc {
    background: url("../images/congratulation/bc.png");
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
          display: grid;
          //   width: 1.97rem;
          height: 0.8rem;
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
            // span:last-child{
            //     color: #feec21;
            //     font-size:0.24rem;

            // }
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
              font-family: PingFang SC;
              font-weight: bold;
              color: rgba(255, 255, 255, 1);
            }
          }
        }
        .congra-2 {
          width: 80%;
          margin: 0 auto;
          div {
            display: flex;
            justify-content: center;
          }
          span {
            color: #fff6df;
            font-size: 0.24rem;
            //   display: block;
          }
          img {
            width: 3.28rem;
            height: 0.98rem;
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