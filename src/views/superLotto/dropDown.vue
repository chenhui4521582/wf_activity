<template>
  <div>
    <div class="pop-mask" v-if="isDropDown" @touchmove.prevent></div>
    <transition name="fade">
      <div class="drop-down" v-if="isDropDown">
        <div class="drop-down-content" :style="$moduleConfig.viruskill.dropDown.inner.bg">
          <div class="d-tab" :style="$moduleConfig.viruskill.dropDown.inner.tabBg">
            <ul style="height: 100%">
              <li @click="innerHandleTab(index)"
                v-for="(item,index) in $moduleConfig.viruskill.dropDown.inner.tabs.btnText"
                :style="$moduleConfig.viruskill.dropDown.inner.tabs[curIndex == index?'activeStyle':'btnDefaultStyle']">
                {{item}}
              </li>
            </ul>
          </div>
          <!-- 获取幸运币组件 -->
          <getHammer v-if="curIndex == 0" :countTime="countTime" @refresh="refresh"
            @showPop="showPop" />

          <!-- 排行榜 -->
          <profit v-if="curIndex == 1" :is-full="false" @refresh="refresh" :endDate="endDate"
            :time="countTime" />

          <!-- 右下角图标 -->
          <img src="./imgs/hide.png" class="icon-back" @click.stop="close">
        </div>
      </div>
    </transition>
    <div class="bottom-wrap" v-if="!isDropDown" :style="$moduleConfig.viruskill.dropDown.out.bg">
      <div class="tab" @click="outHandleTab(index)"
        v-for="(item,index) in $moduleConfig.viruskill.dropDown.out.tabs">
        <div class="hammer_icon" :style="item.icon"></div>
        <div class="right">
          <div class="main-text" v-if="item.mainText">
            已得<span>{{toDayUserCouponNum|filterPrice}}</span>个币</div>
          <div class="btn" :class="{hasMainTxt:item.mainText}" :style="item.btnStyle">
            {{item.btnText}}</div>
        </div>
      </div>
      <div class="line" :style="$moduleConfig.viruskill.dropDown.out.line"></div>
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
    countTime: {
      type: Number,
      default: 0
    },
    toDayUserCouponNum: {
      type: Number,
      default: 0
    },
    endDate: {
      type: String,
      default: ''
    }
  },
  components: {
    getHammer: () => import('./component/getHammer'),
    profit: () => import('./component/profit')
  },
  methods: {
    innerHandleTab (idx) {
      this.handleTab(idx)
    },
    outHandleTab (idx) {
      if (idx) {
        GLOBALS.marchSetsPoint('A_H5PT0248002909')   // H5平台-元宵活动-底部有奖排行点击
      } else {
        GLOBALS.marchSetsPoint('A_H5PT0248002908')   // H5平台-元宵活动-底部获取幸运币点击
      }
      this.handleTab(idx)
    },
    handleTab (idx) {
      this.isDropDown = true
      this.curIndex = idx
    },
    close () {
      this.isDropDown = false
    },
    refresh (data) {
      this.$emit('refresh', data)
    },
    showPop (data) {
      this.$emit('showPop', data)
    }
  }
}
</script>
<style lang="less" scoped>
@import './css/dropDown.less';

.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s;
}

/*低端机型之前的样式会有严重的展示问题，暂且用下面代替*/
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
