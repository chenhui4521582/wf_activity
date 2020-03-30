<template>
  <section class="commonPop" @touchmove.prevent :class="{fail:fail}">
    <div class="pop-mask" v-if="isShowPop" @touchmove.prevent>
    </div>
    <transition name="scalc">
      <div class="pop" v-if="isShowPop">
        <div class="wrap" :class="{jinbi:!fail&&awardData[0]&&awardData[0].awardsNum>0}">
          <div class="main">
            <ul class="awards-list">
              <li>
                <div class="title" style="font-size: 0.48rem; font-weight: 400; color: #fff; height: .9rem; line-height: .8rem; padding-bottom: .1rem; box-sizing: border-box;font-weight: bold;">
                  <template v-if="fail">很遗憾</template>
                  <template v-else>
                    恭喜获得
                  </template>
                </div>
                <template v-if="fail">
                  <img src="../images/sad.png" alt="" style="width: 2.2rem;height: 2.2rem;">
                  <div class="info">该礼包每天限购一次，请明天再来</div>
                </template>
                <template v-else>
                  <template v-if="awardData[0].awardsNum==0">
                    <div class="nojinbi">
                      <div class="item" v-for="(item,index) in awardData.slice(1)" :key="index">
                        <img :src="item.awardsImage|filter">
                        <div class="info" :class="{success:!fail}">{{item.awardsDesc}}</div>
                      </div>
                    </div>
                  </template>
                  <template v-else>
                    <div class="jinbi">
                      <div class="item" v-for="(item,index) in awardData" :key="index">
                        <img src="../images/jinbi.png" alt="" v-if="index==0">
                        <img :src="item.awardsImage | filter" v-else>
                        <div class="info" :class="{success:!fail}">{{item.awardsDesc}}</div>
                      </div>
                    </div>
                  </template>
                </template>
              </li>
            </ul>
          </div>
          <div class="hit-egg-btn" @click="closePop(1)">确定</div>
        </div>
        <div class="close-icon" @click="closePop(0)"></div>
      </div>
    </transition>
  </section>
</template>

<script>
export default {
  name: 'commonPop',
  data () {
    return {
      imgUrl: ''
    }
  },
  props: {
    isShowPop: {
      type: Boolean,
      default: false
    },
    awardData: {
      type: Array,
      default: []
    },
    fail: {
      type: Boolean,
      default: true
    },
    tabIndex: {
      type: Number,
      default: 0
    }
  },
  methods: {
    closePop (flag) {
      this.$emit('close-pop')
    }
  },
  mounted () {
  }
}
</script>

<style rel="stylesheet/less" lang="less" scoped>
.commonPop {
  position: fixed;
  top: 1rem;
  left: 50%;
  margin-left: -2.5rem;
  z-index: 10;
  .pop-mask {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.55);
    &.have-gif {
      background: rgba(0, 0, 0, 0.55) no-repeat center center / 100% 5.2rem;
      animation: bgChange 1s linear;
    }
    img {
      position: fixed;
      top: 50%;
      left: 50%;
      width: 100%;
      transform: translate(-50%, -50%);
    }
  }
  .pop {
    position: relative;
    z-index: 10;
    .wrap {
      width: 5.05rem;
      height: 7.68rem;
      background: no-repeat center center / 100% 100%;
      background-image: url("../images/pop/pop.png");
      margin: 0 auto;
      box-sizing: border-box;
      padding: 2.41rem 0.26rem 0;
      .main {
        font-size: 0.24rem;
        line-height: 0.3rem;
        letter-spacing: 0.02rem;
        font-weight: bold;
        color: red;
        .awards-list {
          min-height: 2.8rem;
          display: flex;
          align-content: center;
          justify-content: center;
          li {
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            align-items: center;
            .awardsname{
              font-size:.3rem;
              font-weight:bold;
              color:rgba(21,0,43,1);
              line-height: .4rem;
              text-align: center;
            }
            .info{
              font-size:.24rem;
              font-weight:bold;
              color:#fff;
              margin-top: .28rem;
              margin-bottom: .5rem;
              &.success{
                margin-top:0;
                margin-bottom:0;
              }
            }
            .jinbi{
              margin: .3rem auto .4rem;
              display: flex;
              flex-wrap: wrap;
              justify-content: space-between;
              align-items: flex-end;
              width: 3.5rem;
               .item{
                 text-align: center;
                 &:nth-child(1){
                   width: 100%;
                   position: relative;
                   img{
                    margin:0 auto .23rem;
                    display: block;
                    width: 1.28rem;
                    height: 1.28rem;
                   }
                   text-align: center;
                   &:before{
                     content: '';
                     position: absolute;
                     left: 35%;
                     width: .46rem;
                     height: .46rem;
                     background: no-repeat center center / 100% 100%;
                     background-image: url("../images/pop/plus.png");
                   }
                 }
                 &:nth-child(2){
                   img{
                     margin: .15rem 0;
                     width: 1.38rem;
                     height: 1.38rem;
                   }
                 }
                 &:nth-child(3){
                   position: relative;
                   img{
                      margin: .15rem 0;
                     width: 1.38rem;
                     height: 1.38rem;
                   }
                 }
               }
             }
            .nojinbi{
              width: 3.5rem;
              margin: .45rem auto .9rem;
              display: flex;
              flex-wrap: wrap;
              justify-content: space-between;
              align-items: flex-end;
              .item{
                text-align: center;
                &:nth-child(1){
                  img{
                    margin-bottom: .15rem;
                    width: 1.23rem;
                  }
                }
                &:nth-child(2){
                  position: relative;
                  img{
                    margin-bottom: .15rem;
                    width: 1.23rem;
                  }
                }
              }
            }
          }
        }
      }
      .get-cz-btn,
      .hit-egg-btn {
        width:2.96rem;
        height:.8rem;
        background:linear-gradient(0deg,rgba(249,104,48,1) 0%,rgba(234,62,98,1) 0%,rgba(254,160,117,1) 99%);
        border-radius:.4rem;
        line-height: 0.8rem;
        font-weight:bold;
        color:#fff;
        font-size: 0.32rem;
        text-align: center;
        margin: auto;
      }
      &.jinbi{
        height: 8.78rem;
        background: no-repeat center center / 100% 100%;
        background-image: url("../images/pop/pop_jinbi.png");
      }
    }
    .close-icon {
      width: 0.57rem;
      height: 0.57rem;
      background: url("../images/close.png") no-repeat center
        center / 100% 100%;
      margin:.2rem auto;
    }
  }
  .scalc-enter-active {
    animation: fadeAnimation 0.3s ease-in-out;
  }
  .scalcLong-enter-active {
    animation: fadeAnimation 1s ease-in-out;
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
