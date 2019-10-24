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
                <img :src="awardData.awardsImg|filter" alt="" style="width: 2.98rem;height: 1.86rem">
                <template v-if="fail">
                  <div class="awardsname">您还差{{surplus}}勋章就可以领取<br>{{awardData.awardsName}}啦~</div>
                  <div class="info">快去完成任务吧！</div>
                </template>
                <template v-else>
                  <div class="awardsname">{{awardData.awardsName}}</div>
                </template>
              </li>
            </ul>
          </div>
          <div class="hit-egg-btn" @click="closePop(1)">{{fail?'去完成':'领取'}}</div>
        </div>
        <div class="close-icon" :class="{fail:fail}" @click="closePop(0)"></div>
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
        GLOBALS.marchSetsPoint(this.fail?'A_H5PT0199002023':'A_H5PT0199002021',{
          task_id:this.awardData&&this.awardData.id,
          task_name:`${this.awardData&&this.awardData.cost}勋章领取${this.awardData&&this.awardData.awardsName}`
        })
      }
      this.$emit('close-pop')
      if(this.fail){
        this.$emit('gototask')
      }
    },
  },
  mounted () {
  }
}
</script>

<style rel="stylesheet/less" lang="less" scoped>
.commonPop {
  position: fixed;
  top: 1.5rem;
  left: 50%;
  margin-left: -3rem;
  z-index: 10;
  &.fail{
    top:50%;
    margin-top: -2.8rem;
  }
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
      width: 6rem;
      height: 7.1rem;
      background: no-repeat center center / 100% 100%;
      background-image: url("../images/pop/award_success_pop.png");
      margin: 0 auto;
      box-sizing: border-box;
      padding: 3rem 0.26rem 0;
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
              color:rgba(21,0,43,0.6);
            }
          }
        }
      }
      .get-cz-btn,
      .hit-egg-btn {
        width: 4.8rem;
        height: 0.7rem;
        line-height: 0.7rem;
        border-radius: 0.34rem;
        font-weight:bold;
        color:rgba(21,0,43,1);
        font-size: 0.3rem;
        text-align: center;
        margin: 0.18rem auto 0;
        background: #FDED66;
      }
      &.fail{
        height: 5.6rem;
        background:rgba(255,255,255,1);
        border-radius:16px;
        padding: .4rem 0.26rem 0;
        box-sizing: border-box;
        .main .awards-list{
          min-height: 4rem;
        }
      }
    }
    .close-icon {
      width: 0.2rem;
      height: 0.2rem;
      background: url("../images/close.png") no-repeat center
        center / 100% 100%;
      position: absolute;
      right: .21rem;
      top: 2.17rem;
      &.fail{
        top: .2rem;
      }
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
