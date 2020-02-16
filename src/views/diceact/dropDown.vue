<template>
  <div>
    <div class="pop-mask" v-if="isDropDown" @touchmove.prevent></div>
    <transition name="fade">
      <div class="drop-down" v-if="isDropDown">
        <div class="drop-down-content">

          <div class="d-tab">
            <div style="position: absolute;width: 100%;left: 0;top: 0;">
              <ul>
                <li @click="innerHandleTab(0)" :class="{'active':curIndex == 0}">获取幸运币</li>
                <li @click="innerHandleTab(1)" :class="{'active':curIndex == 1}">有奖排行榜</li>
              </ul>
            </div>
          </div>
          <!-- 获取幸运币组件 -->
          <getHammer v-if="curIndex == 0" :countTime="countTime" @refresh="refresh" @showPop="showPop"/>

          <!-- 排行榜 -->
          <profit v-if="curIndex == 1" :is-full="false" @refresh="refresh" :endDate="endDate" :time="countTime"/>

          <!-- 右下角图标 -->
          <img src="./imgs/hide.png" class="icon-back" @click.stop="close">
        </div>
      </div>
    </transition>
    <div class="bottom-wrap" v-if="!isDropDown">
      <div class="tab get-hammer" @click="outHandleTab(0)">
        <div class="hammer_icon"></div>
        <div class="right">
          <div class="main-text">今日已得<span>{{toDayUserCouponNum}}</span>个币</div>
          <div class="btn">获取幸运币</div>
        </div>
      </div>
      <div class="tab profit" @click="outHandleTab(1)">
        <div class="hammer_icon"></div>
        <div class="right">
          <div class="main-text"><span>7日</span>累计幸运币</div>
          <div class="btn">有奖排行榜</div>
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
      }
    },
    components: {
      getHammer: () => import('./component/getHammer'),
      profit: () => import('./component/profit'),
    },
    methods: {
      innerHandleTab(idx) {
        this.handleTab(idx)
      },
      outHandleTab(idx) {
        if (idx) {
          GLOBALS.marchSetsPoint('A_H5PT0240002791')   // H5平台-元宵活动-底部有奖排行点击
        } else {
          GLOBALS.marchSetsPoint('A_H5PT0240002790')   // H5平台-元宵活动-底部获取幸运币点击
        }
        this.handleTab(idx)
      },
      handleTab(idx) {
        this.isDropDown = true
        this.curIndex = idx
      },
      close() {
        this.isDropDown = false
      },
      refresh(num) {
        this.$emit('refresh', num)
      },
      showPop(data) {
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
