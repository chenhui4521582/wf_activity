<template>
  <div>
    <div class="pop-mask" v-if="isDropDown" @touchmove.prevent></div>
    <transition name="fade">
      <div class="drop-down" v-if="isDropDown">
        <div class="drop-down-content">

          <div class="d-tab">
            <div style="position: absolute;width: 100%;left: 0;top: .1rem;;">
              <ul>
                <li @click="close"><img src="./images/decoration1.png" alt=""></li>
              </ul>
            </div>
          </div>
          <!-- 获取锤子组件 -->
          <getHammer :rules-explain="rulesExplain" :my-info="myInfo" :act-info="actInfo" v-if="curIndex == 0" @refresh="refresh" @showPop="$emit('showPop',4)"/>
        </div>
      </div>
    </transition>
    <div class="bottom-wrap" v-if="!isDropDown">
      <div class="tab profit" @click="outHandleTab(0)">
        <div class="right">
          <div class="main-text">
            <img src="./images/decoration0.png" alt="">
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
      rulesExplain: {
        type: String,
        default: ''
      },
      myInfo: {
        type: Object,
        default: null
      },
      actInfo: {
        type: Object,
        default: null
      }
    },
    components: {
      getHammer: () => import('./component/getHammer')
    },
    methods: {
      outHandleTab(idx) {
        GLOBALS.marchSetsPoint('A_H5PT0229002668')   // H5平台-双旦活动页-获得更多游戏币点击(展开)
        this.handleTab(idx)
        this.$emit('resetpop',true)
      },
      handleTab(idx) {
        this.isDropDown = true
        this.curIndex = idx
      },
      close() {
        this.isDropDown = false
        GLOBALS.marchSetsPoint('A_H5PT0229002669')   // H5平台-双旦活动页-获得抽奖机会页-点击收起
        this.$emit('resetpop',false)
      },
      refresh(num) {
        this.$emit('refresh', num)
      }
    },
    watch: {
      isDropDown(value) {
        if (value) {
          document.body.style.overflow = 'hidden';
          document.addEventListener('touchmove', this.move, {passive: false});
        } else {
          document.body.style.overflow = null;
          document.removeEventListener('touchmove', this.move, {passive: false});
        }
      }
    }
  }
</script>
<style lang="less" scoped>
  @import "./index.less";

  .fade-enter-active,
  .fade-leave-active {
    transition: all 0.5s;
  }

  /*低端机型之前的样式会有严重的展示问题，暂且用下面代替*/
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>
