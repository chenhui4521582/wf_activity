<template>
  <div>
    <div class="pop-mask" v-if="isDropDown" @touchmove.prevent></div>
    <transition name="fade">
      <div class="drop-down" v-if="isDropDown">
        <div class="drop-down-content">
          <div class="d-tab">
            <div style="position: absolute;width: 100%;left: 0;top: 0;">
              <ul>
                <li>>>> <span>集鱼干，赢2000元猫币</span> <<<</li>
              </ul>
            </div>
          </div>
          <!-- 排行榜 -->
          <profit :is-full="false" />
          <!-- 右下角图标 -->
          <img src="./images/package/profit/icon-back.png" class="icon-back" @click.stop="close">
        </div>
      </div>
    </transition>
    <div class="bottom-wrap" v-if="!isDropDown">
      <div class="tab profit" @click="outHandleTab(1)">
        <div class="right">
          <img src="./images/index/decoration.png" alt="">
          <div class="main-text">>>> <span>集鱼干，赢2000元猫币</span> <<<</div>
          <div class="btn">猫币可兑换话费券、京东卡等丰厚物品</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
  import { userInfo } from '../utils/api'
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
      profit: () => import('./component/profit')
    },
    methods: {
      innerHandleTab (idx) {
        if (idx) {
          GLOBALS.marchSetsPoint('A_H5PT0075001466')   // H5平台-砸金蛋-获取锤子大浮层-点击有奖排行榜
        } else {
          GLOBALS.marchSetsPoint('A_H5PT0075001470')   // H5平台-砸金蛋-有奖排行榜大浮层-点击获取锤子
        }
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
  @import "./css/dropDown.less";
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

