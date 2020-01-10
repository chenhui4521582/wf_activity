<template>
  <div>
    <div class="pop-mask" v-if="isDropDown"></div>
    <transition name="fade">
      <div class="drop-down" v-if="isDropDown">
        <div class="drop-down-content">

          <div class="d-tab">
            <div style="position: absolute;width: 100%;left: 0;top: 0;">
              <ul>
                <li @click="innerHandleTab(0)" :class="{'active':curIndex == 0}">获取锤子</li>
                <li @click="innerHandleTab(1)" :class="{'active':curIndex == 1}">有奖排行榜</li>
              </ul>
            </div>
          </div>
          <!-- 获取锤子组件 -->
          <getHammer v-if="curIndex == 0" :countTime="countTime" @refresh="refresh" @showPop="showPop"/>

          <!-- 排行榜 -->
          <profit v-if="curIndex == 1" :is-full="false" @refresh="refresh" :endDate="endDate"/>

          <!-- 右下角图标 -->
          <img src="./imgs/hide.png" class="icon-back" @click.stop="close">
        </div>
      </div>
    </transition>
    <div class="bottom-wrap" v-if="!isDropDown">
      <div class="tab get-hammer" @click="outHandleTab(0)">
        <div class="hammer_icon"></div>
        <div class="right">
          <div class="main-text">今日已得<span>{{toDayUserCouponNum}}</span>张券</div>
          <div class="btn">获取瓜分劵</div>
        </div>
      </div>
      <div class="tab profit" @click="outHandleTab(1)">
        <div class="hammer_icon"></div>
        <div class="right">
          <div class="main-text"><span>7日</span>累计瓜分券</div>
          <div class="btn">有奖排行榜</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
  import {userInfo} from './utils/api'

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
      endDate:{
        type: String,
        default: ''
      }
    },
    components: {
      getHammer: () => import('./component/getHammer'),
      profit: () => import('./component/profit')
    },
    methods: {
      innerHandleTab(idx) {
        this.handleTab(idx)
      },
      outHandleTab(idx) {
        if (idx) {
          GLOBALS.marchSetsPoint('A_H5PT0240002791')   // H5平台-元宵活动-底部有奖排行点击
        } else {
          GLOBALS.marchSetsPoint('A_H5PT0240002790')   // H5平台-元宵活动-底部获取瓜分券点击
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
      refresh(flag) {
        this.$emit('refresh', flag)
      },
      showPop(data) {
        this.$emit('showPop',data)
      }
    },
    watch: {
      isDropDown(value) {
        if(value) {
          document.body.style.overflow = 'hidden';
          document.addEventListener('touchmove', this.move, { passive: false });
        }else {
          document.body.style.overflow = null;
          document.removeEventListener('touchmove', this.move, { passive: false });
        }
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
