
<template>
  <div>
    <div class="pop-mask" v-if="isDropDown" @touchmove.prevent></div>
    <transition name="fade">
      <div class="drop-down" v-if="isDropDown">
        <!-- 点击上部空白也返回 -->
        <div class="close" @click.stop="close"></div>
        <div class="drop-down-content" :style="{height:curIndex==1?'9.24rem':''}">
          <div class="d-tab">
            <div style="position: absolute;width: 100%;left: 0;top: 0;">
              <ul>
                <li @click="innerHandleTab(0)" :class="{'active':curIndex == 0}">获取翻牌点</li>
                <li @click="innerHandleTab(1)" :class="{'active':curIndex == 1}">大奖排行榜</li>
              </ul>
            </div>
          </div>
          <!-- 获取锤子组件 -->
          <getHammer
            :pUserInfo="data"
            v-if="curIndex == 0"
            @getUserInfo="getUserInfo"
            @gotoplay="gotoplay"
          />

          <!-- 排行榜 -->
          <profit v-if="curIndex == 1" :is-full="false" :current="curIndex" />
          <!-- 右下角图标 -->
          <img src="../images/icon-back.png" class="icon-back" @click.stop="close" />
        </div>
      </div>
    </transition>
    <div
      class="bottom-wrap"
      :class="{header1:level==1,header2:level==2,header3:level==3}"
      v-if="!isDropDown"
    >
      <div class="tab get-hammer" @click="outHandleTab(0)" v-if="!end">
        <div class="hammer_icon"></div>
        <div class="right">
          <div class="main-text">
            剩余翻牌点
            <span>{{remanentNum}}</span>
          </div>
          <div class="btn">获取翻牌点</div>
        </div>
      </div>
      <div class="tab profit" @click="outHandleTab(1)">
        <div class="hammer_icon"></div>
        <div class="right">
          <div class="main-text">
            累计翻牌点
            <span>{{totalNum}}</span>
          </div>
          <div class="btn">有奖排行榜</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
import { userInfo } from "../utils/api";
export default {
  data() {
    return {
      curIndex: 0,
      isDropDown: false
    };
  },
  props: {
    rulesExplain: {
      type: String,
      default: ""
    },
    data: {
      type: Object,
      default: null
    },
    level: {
      type: Number,
      default: 1
    },
    end: {
      type: Boolean,
      default: () => false
    }
  },
  mounted() {},
  computed: {
    remanentNum() {
      return (this.data && this.data.remanentNum) || 0;
    },
    totalNum() {
      return (this.data && this.data.totalNum) || 0;
    }
  },
  components: {
    getHammer: () => import("./component/getHammer"),
    profit: () => import("./component/profit")
  },
  methods: {
    innerHandleTab(idx) {
      if (idx == 0 || idx == 1) {
        GLOBALS.marchSetsPoint("A_H5PT0075001466"); // H5平台-有奖排行榜
        // this.$router.push("/after");
        this.handleTab(idx);
        // } else {
        //   this.handleTab(idx);
        //   GLOBALS.marchSetsPoint("A_H5PT0075001470"); // H5平台-点击获取翻牌点
        //   console.log(this.isDropDown);
        // }
      }
    },
    outHandleTab(idx) {
      //H5平台-翻牌活动-底部获取翻牌点TAB点击(展开) A_H5PT0156002609
      //H5平台-翻牌活动-底部有奖排行榜TAB点击(展开) A_H5PT0156002610
      GLOBALS.marchSetsPoint(idx ? "A_H5PT0156002610" : "A_H5PT0156002609"); //H5平台-翻牌活动-中间区域-获得更多翻牌点点击
      if (idx == 0) {
        this.handleTab(idx);
      }
      if (idx == 1 && !this.end) {
        this.handleTab(idx);
      }
      if (idx == 1 && this.end) {
        this.$router.push("/after");
      }
    },

    handleTab(idx) {
      this.isDropDown = true;
      this.curIndex = idx;
    },
    close() {
      this.isDropDown = false;
      GLOBALS.marchSetsPoint("A_H5PT0156001775"); //H5平台-翻牌活动-底部弹窗-点击收起点击
      // this.init()
    },
    getUserInfo() {
      this.$emit("getUserInfo");
    },
    gotoplay() {
      this.isDropDown = false;
      this.$emit("gotoplay");
    }
  }
};
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
