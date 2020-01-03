<template>
  <section class="rule1" :style="{zIndex:isShowPop?3:2}">
    <img src="../images/gonglue.png" alt="" @click="showPop" class="icon">
    <div class="pop-mask" v-if="isShowPop" @touchmove.prevent></div>
    <transition name="scalc">
      <div class="pop" v-if="isShowPop">
        <div class="wrap">
        </div>
        <div class="close-icon" @click="isShowPop = false"></div>
      </div>
    </transition>
  </section>
</template>

<script>
  import {betAwards} from '../utils/api'
  export default {
    name: "rule",
    data () {
      return {
        isShowPop: false,
        data:[]
      };
    },
    props: {
      ruleMain: {
        type: String,
        default: ""
      },
      from: {
        type: Number,
        default: 0
      }
    },
    components:{
      scroll:()=>import('./scroll')
    },
    methods: {
      async getBetAwards() {
        const {code, data} = await betAwards()
        if (code === 200) {
          this.data = data
        }
      },
      async showPop () {
        await this.getBetAwards()
        this.isShowPop = true
        GLOBALS.marchSetsPoint('A_H5PT0156001772')//H5平台-翻牌活动-中间区域-攻略按钮点击
      }
    }
  };
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .rule1 {
    position: fixed;
    top: 40%;
    left: 50%;
    margin-left: -2.86rem;
    margin-top:-3.94rem;
    img.icon {
      width: 0.84rem;
      height: 0.84rem;
      position: fixed;
      right: 0;
      top: 1.4rem;
    }

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
        width: 5.72rem;
        height:7.88rem;
        background: url("../images/pop/gonglue/bg.png") no-repeat center center /
        100% 100%;
        margin: 0 auto;
        box-sizing: border-box;
        padding: 2.72rem 0.56rem 0;
      }
      .close-icon {
        width: 0.6rem;
        height: 0.6rem;
        background: url("../pages/images/common/close.png") no-repeat center
          center / 100% 100%;
        margin:auto;
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
