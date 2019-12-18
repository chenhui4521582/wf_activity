<template>
  <div>
    <div class="pop-mask" v-if="isDropDown" @touchmove.prevent></div>
    <transition name="fade">
      <div class="drop-down" v-if="isDropDown">
        <div class="drop-down-content">
          <div class="d-tab">
            <div style="position: absolute;width: 100%;left: 0;top: 0;">
              <ul>
                <li><img src="./images/bottom-left.png" alt=""><span>点击获得更多游戏币</span><img src="./images/bottom-right.png" alt=""></li>
              </ul>
            </div>
          </div>
          <!-- 排行榜 -->
          <!--<profit :is-full="false" />-->
          <!-- 右下角图标 -->
          <!--<img src="./images/package/profit/icon-back.png" class="icon-back" @click.stop="close">-->
        </div>
        <rule from="1"></rule>
        <rule from="2"></rule>
      </div>
    </transition>
    <div class="bottom-wrap" v-if="!isDropDown">
      <div class="tab profit" @click="outHandleTab(1)">
        <div class="right">
          <!--<img src="./images/index/decoration.png" alt="">-->
          <div class="main-text"><img src="./images/bottom-left.png" alt=""><span>点击获得更多游戏币</span><img src="./images/bottom-right.png" alt=""></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
  export default {
    data () {
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
      }
    },
    components: {
      // profit: () => import('./component/profit'),
      // rule:()=>import('../components/rule')
    },
    methods: {
      innerHandleTab (idx) {
        this.handleTab(idx)
      },
      outHandleTab (idx) {
        GLOBALS.marchSetsPoint('A_H5PT0201002065')//H5平台-撸猫活动-排行榜展开点击(集鱼干赢猫币)
        this.handleTab(idx)
      },
      handleTab (idx) {
        this.isDropDown = true
        this.curIndex = idx
      },
      close () {
        this.isDropDown = false
        GLOBALS.marchSetsPoint('A_H5PT0201002066')//H5平台-撸猫活动-排行榜展开点击(集鱼干赢猫币)
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
  .fade-enter {
    transform: translateY(100%);
  }
  .fade-enter-to {
    transform: translateY(0);
  }
  .fade-leave {
    transform: translateY(0);
  }
  .fade-leave-to {
    transform: translateY(100%);
  }
</style>

