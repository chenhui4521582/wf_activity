<template>
  <div>
    <div class="pop-mask" v-if="isDropDown" @touchmove.prevent></div>
    <transition name="fade">
      <div class="drop-down" v-if="isDropDown">
        <div class="drop-down-content">
          <div class="d-tab">
            <div style="position: absolute;width: 100%;left: 0;top: 0;">
              <ul>
                <li>>>> <span>集鱼干 冲榜赢大奖</span> <<<</li>
              </ul>
            </div>
          </div>
          <!-- 排行榜 -->
          <profit :is-full="false" @refresh="refresh" :endDate="endDate" @showPop="showPop"/>

          <!-- 右下角图标 -->
          <img src="./imgs/hide.png" class="icon-back" @click.stop="close">
        </div>
      </div>
    </transition>
    <div class="bottom-wrap" v-if="!isDropDown">
      <div class="tab profit" @click="outHandleTab(1)">
        <div class="right">
          <img src="./imgs/decoration.png" alt="">
          <div class="main-text">>>> <span>集鱼干 冲榜赢大奖</span> <<<</div>
          <div class="btn">
            <div class="item">
              当前排名:{{myInfo&&myInfo.myRank?myInfo.myRank:'暂未上榜'}}
            </div>
            <div class="item">
              当前奖励:{{myInfo&&myInfo.currentAwards||'暂无'}}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
  export default {
    data() {
      return {
        curIndex: 0,
        isDropDown: false,
        remanentNum: 0,
        totalNum: 0
      }
    },
    props: {
      countTime: {
        type: String,
        default: ''
      },
      toDayUserCouponNum: {
        type: Number,
        default: 0
      },
      endDate: {
        type: String,
        default: ''
      },
      myInfo:{
        type:Object,
        default:null
      }
    },
    components: {
      profit: () => import('./component/profit'),
    },
    methods: {
      innerHandleTab(idx) {
        this.handleTab(idx)
      },
      outHandleTab(idx) {
        GLOBALS.marchSetsPoint('A_H5PT0252003000')   // H5平台-元宵活动-底部有奖排行点击
        this.$emit('handleTab',idx)
      },
      handleTab(idx) {
        this.isDropDown = true
        this.curIndex = idx
      },
      close() {
        this.isDropDown = false
      },
      refresh(flag) {
        this.$emit('refresh', flag)
      },
      showPop(data) {
        console.log(data)
        this.$emit('showPop', data)
      }
    }
  }
</script>
<style lang="less" scoped>
  @import "./css/dropDown.less";

  .fade-enter-active,
  .fade-leave-active {
    transition: all 0.5s;
  }

  /*低端机型之前的样式会有严重的展示问题，暂且用下面代替*/
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>
