<template>
  <article class="rule">
    <div class="rule-icon" @click.stop="showPop()"></div>
    <transition name="mask">
      <section class="pop-wrapper" v-show="isShowPop">
        <div class="mask"></div>
        <div class="content-wrapper">
          <div class="content">
            1、活动时间：{{info.timeline}}<br />
            2、糖果萌消消、街机欢乐捕鱼、三国大作战各设置3天限时任务。任务开启依据时间轴，当时间结束前一个任务将自动失效，新游戏任务开启，直到9天活动时间结束；<br />
            3、3个游戏在其任务开启时所支持的金叶将会累计，达成梯度领取奖励；<br />
            4、游戏任务结束后，奖励仍可手动领取，领取后自动到账；<br />
            5、9天活动结束后，入口保留2天。请及时领取奖励。<br />
            6、游戏相关道具或任务，请至相应游戏内查看或完成。<br />
            <div class="close-icon" @click="closePop()">
              <img src="../../img/close-icon.png" alt="">
            </div>
          </div>
        </div>
      </section>
    </transition>
  </article>
</template>

<script>
/* eslint-disable no-undef */
export default {
  name: 'rule',
  props: {
    info: {
      type: Object,
      default: () => ({}),
    }
  },
  data () {
    return {
      isShowPop: false
    }
  },
  methods: {
    showPop () {
      this.isShowPop = true
      GLOBALS.marchSetsPoint('A_H5PT0332004184') // H5平台-超级任务活动页-规则按钮点击
    },
    closePop () {
      this.isShowPop = false
    }
  }
}
</script>

<style lang="less" scoped>
.backImg(@url) {
  background: url(@url) no-repeat center center;
  background-size: 100% 100%;
}
.rule {
  .rule-icon {
    position: absolute;
    right: -0.2rem;
    top: -0.2rem;
    width: 1.4rem;
    height: 1.4rem;
    .backImg('./img/rule-icon.png');
  }
  .pop-wrapper {
    .content-wrapper {
      .content {
        color: #d3a0ff;
        padding: 2rem 0.52rem 0 0.54rem;
        width: 5.7rem;
        height: 8.36rem;
        background: url(./img/rule-popup.png) no-repeat center center;
        background-size: 100% 100%;
        box-sizing: border-box;
        position: relative;
        line-height: 0.36rem;
        text-align: justify;
        .close-icon {
          position: absolute;
          margin: 0;
          bottom: 0;
          left: 50%;
          margin-left: -0.24rem;
        }
      }
    }
  }
}
</style>
