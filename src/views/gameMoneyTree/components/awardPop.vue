<template>
  <div class="pop-window">
    <div class="pop-mask" @touchmove.prevent :class="{type1:type==1,type2:type==2,type3:type==3,type4:type==4}"></div>
    <div class="bonus-success" :class="{type1:type==1,type2:type==2,type3:type==3,type4:type==4}">
      <div class="container">
        <scroll :data="awardsname" v-if="type==1">
          <div v-html="awardsname" style="line-height: .3rem"></div>
        </scroll>
        <template v-if="type==2">
          <div class="info">奖励还差{{awardsname}}个养料</div>
          <img src="../images/yangliao.png" alt="">
          <div class="btn btn_more" @click="close(0)">获取更多养料</div>
          <div class="btn btn_see" @click="gotoact">去活动页看看</div>
        </template>
        <template v-if="type==3">
          <div class="btn btn_more" @click="gotoact">去摇奖</div>
          <div class="btn btn_see" @click="close(0)">获取更多养料</div>
        </template>
      </div>
      <div class="close" @click="close(1)"></div>
    </div>
  </div>
</template>
<script type="text/javascript">
import scroll from './scroll'
export default {
  data () {
    return {
    }
  },
  props: {
    type: {
      type: Number,
      default: 0// 1.活动规则 2.砸金蛋还差养料 3.砸金蛋需要去活动页 4.砸金蛋结束
    },
    awardsname: {
      type: String,
      default: ''
    },
    gametype: {
      type: Number,
      default: 0
    }
  },
  components: { scroll },
  methods: {
    async close (flag) {
      if (this.type == 2) {
        if (flag) {
          this.$emit('close')
        } else {
          await GLOBALS.marchSetsPoint('A_H5PT0018001668', {
            from_project_id: this.gametype
          })
          this.$emit('gotoact', 3)
        }
      }
      if (this.type == 3) {
        if (flag) {
          this.$emit('close')
        } else {
          await GLOBALS.marchSetsPoint('A_H5PT0018001671', {
            from_project_id: this.gametype
          })
          this.$emit('gotoact', 3)
        }
      }
    },
    async gotoact () {
      if (this.type == 2) {
        await GLOBALS.marchSetsPoint('A_H5PT0018001669', {
          from_project_id: this.gametype
        })
      }
      if (this.type == 3) {
        await GLOBALS.marchSetsPoint('A_H5PT0018001672', {
          from_project_id: this.gametype
        })
      }
      this.$emit('gotoact', 3)
    }
  },
  mounted () {
    if (this.type == 2) {
      GLOBALS.marchSetsPoint('A_H5PT0018001667', {
        from_project_id: this.gametype
      })
    }
    if (this.type == 3) {
      GLOBALS.marchSetsPoint('A_H5PT0018001670', {
        from_project_id: this.gametype
      })
    }
  }
}
</script>
<style lang="less" scoped>
.pop-window {
  position: relative;
  z-index: 11;
  width: 100%;
  height: 100%;
  min-height: 100%;
  max-height: 100%;
  .pop-close {
    width: 0.68rem;
    height: 0.68rem;
    position: absolute;
    right: -0.34rem;
    top: -0.34rem;
  }
}

.pop-mask {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  z-index: 10;
  &.type4 {
    background: transparent;
  }
}
/* 坚屏模式 */
@media only screen and (orientation: portrait) {
  .bonus-success {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 4.91rem;
    height: 5.54rem;
  }
}
/* 横屏模式 */
@media screen and (orientation: landscape) {
  .bonus-success {
    position: fixed;
    top: 8%;
    left: 50%;
    transform: translateX(-50%);
    width: 4.91rem;
    height: 5.54rem;
  }
}
.bonus-success {
  &.type1 {
    background: url("../images/rulepop.png");
    background-size: 100% 100%;
    box-sizing: border-box;
    .container {
      position: absolute;
      top: 0.96rem;
      left: 0.47rem;
      bottom: 0.47rem;
      right: 0.47rem;
      overflow: hidden;
    }
  }
  &.type2 {
    background: url("../images/lesschuzpop.png");
    background-size: 100% 100%;
    .container {
      position: absolute;
      top: 0.26rem;
      left: 0;
      right: 0;
      bottom: 0.52rem;
      margin: auto;
      text-align: center;
      .info {
        font-size: 0.4rem;
        margin-bottom: 0.42rem;
      }
      img {
        width: 1.88rem;
        height: 1.88rem;
        margin-bottom: 0.53rem;
      }
    }
  }
  &.type3 {
    background: url("../images/actpop.png");
    background-size: 100% 100%;
    .container {
      padding-top: 3.48rem;
    }
  }
  &.type4 {
    background: url("../images/actendpop.png");
    background-size: 100% 100%;
    .container {
      position: absolute;
      top: 0.85rem;
      left: 0;
      right: 0;
      bottom: 0.52rem;
      margin: auto;
      text-align: center;
      .info {
        color: rgba(33, 107, 13, 1);
        margin-bottom: 2.16rem;
      }
      .info1 {
        color: rgba(128, 58, 7, 1);
        margin-bottom: 0.41rem;
      }
    }
  }
  z-index: 11;
  .btn {
    font-size: 0.3rem;
    width: 2.9rem;
    height: 0.68rem;
    line-height: 0.68rem;
    text-align: center;
    background: #ec8110;
    border-radius: 0.34rem;
    margin: auto;
    &.btn_more {
      background: #e55600;
    }
    &.btn_see {
      margin-top: 0.18rem;
      background: #ec8110;
    }
  }
  .close {
    position: absolute;
    width: 0.6rem;
    height: 0.6rem;
    background: url("../images/close.png");
    background-size: 100% 100%;
    left: 0;
    right: 0;
    margin: auto;
    bottom: -0.8rem;
  }
}
</style>
