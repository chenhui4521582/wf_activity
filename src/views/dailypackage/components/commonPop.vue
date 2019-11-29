<template>
  <section class="commonPop" @touchmove.prevent :class="{fail:fail}">
    <div class="pop-mask" v-if="isShowPop" @touchmove.prevent>
    </div>
    <transition name="scalc">
      <div class="pop" v-if="isShowPop">
        <div class="wrap" :class="{fail:fail}">
          <div class="main">
            <ul class="awards-list">
              <li>
                <div class="title" style="font-size: 0.48rem; font-weight: 400; color: rgb(169, 92, 23); height: .9rem; line-height: .8rem; padding-bottom: .1rem; box-sizing: border-box;font-weight: bold;">
                  <template v-if="fail&&surplus">很遗憾</template>
                  <template v-else>
                    <template v-if="fail">
                      是否兑换？
                    </template>
                    <template v-else>
                      兑换成功
                    </template>
                  </template>
                </div>
                <template v-if="fail&&surplus">
                  <img src="../images/sad.png" alt="" style="width: 1.73rem;height: 1.85rem;margin-top: .35rem">
                  <!--<div class="awardsname">您还差{{surplus}}勋章就可以领取<br>{{awardData.awardsName}}啦~</div>-->
                  <div class="info">幸运币不足</div>
                </template>
                <template v-else>
                  <img :src="awardData.awardsImg|filter" alt="" style="width: 2.7rem;">
                  <div class="info" :class="{success:!fail}">{{awardData.awardsName}}</div>
                  <p v-if="!fail" style="margin-bottom: .2rem;color:rgba(169,92,23,1);">请前往我的页面查询使用~</p>
                </template>
              </li>
            </ul>
          </div>
          <div class="hit-egg-btn" @click="closePop(1)">{{fail&&surplus?'获取幸运币':'确定'}}</div>
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
      type: Object,
      default: null
    },
    fail: {
      type: Boolean,
      default: true
    },
    surplus: {
      type: Number,
      default: 0
    },
    tabIndex: {
      type: Number,
      default: 0
    }
  },
  methods: {
    closePop (flag) {
      if(flag){
        if(this.fail&&this.surplus){
          this.$emit('gototask')
        }else{
          if(this.fail){
            this.$emit('exchange',this.awardData)
          }
        }
      }
      this.$emit('close-pop')
    },
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
      padding: 2.35rem 0.26rem 0;
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
              color:rgba(169,92,23,1);
              /*margin-top: .28rem;*/
              margin-bottom: .5rem;
              &.success{
                margin-bottom: .3rem;
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
