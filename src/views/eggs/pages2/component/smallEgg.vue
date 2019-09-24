<template>
  <div class="small-egg-wrp" :class="{actived:isActived,opend:awardsItem.status}">
    <div class="small-egg" :class="{'s-big-egg':awardsItem.awardsLev===5}">
      <img :src="sEggrc" class="c-egg">
      <span v-if="awardsItem.status===1" class="s-text">{{awardsItem.awardsName}}</span>
      <span v-else class="s-text">{{awardsItem.consumeNum}}把</span>
      <!-- <a href="javascript:" class="hit-me-tips" v-if="awardsItem.awardsLev === 1 && !awardsItem.status&& !isActived "></a>
      <a href="javascript:" class="fear-tips" v-if="awardsItem.awardsLev === 2 && !awardsItem.status&& !isActived "></a>
      <a href="javascript:" class="klz-tips" v-if="awardsItem.awardsLev === 3 && !awardsItem.status&& !isActived "></a> -->
    </div>
  </div>
</template>
<script type="text/javascript">
export default {
  data () {
    return {
      sColorList: ['green', 'blue', 'purplish', 'red', 'big'],
    }
  },
  props: {
    awardsItem: {// 图标颜色
      type: Object,
      default: {}
    },
    isActived: { // 是否是大图标
      default: false
    }
  },
  computed: {
    sEggrc () {
      if (this.awardsItem.status) {
        return require(`../images/index/${this.sColorList[this.awardsItem.awardsLev - 1]}-egg${this.awardsItem.awardsType ? '-' + this.awardsItem.awardsType : ''}.png`)
      }
      return require(`../images/index/${this.sColorList[this.awardsItem.awardsLev - 1]}-egg${this.isActived ? '-actived' : ''}.png`)
    }
  },
  mounted () {
  }
}
</script>
<style lang="less" scoped>
.small-egg-wrp {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  &.actived {
    .small-egg {
      width: 1.85rem;
      &.s-big-egg {
        width: 3.14*.8rem;
        height: 2.68*.8rem;
      }
      .s-text {
        bottom: 0.5rem;
      }
    }
  }
  &.opend {
    .small-egg {
      width: 1.06rem;
    }
    .s-text {
      bottom: 0.06rem;
      background: #ffe361;
      color: #884300;
    }
  }
  .small-egg {
    width: 1.49rem;
    font-size: 0.2rem;
    position: relative;
    transition: width 0.1s;
    .fear-tips,
    .hit-me-tips,
    .klz-tips {
      width: 1.04rem;
      height: 0.8rem;
      position: absolute;
      top: -0.68rem;
    }
    .fear-tips {
      background: url(../images/index/fear-tips.png) no-repeat center top /
        100% 100%;
      left: -0.5rem;
    }
    .hit-me-tips {
      background: url(../images/index/hit-me-tips.png) no-repeat center
        top / 100% 100%;
      left: -0.5rem;
    }
    .klz-tips {
      background: url(../images/index/klz-tips.png) no-repeat center top /
        100% 100%;
      right: -0.35rem;
    }
    &.s-big-egg {
      width:3.02*0.8rem;
      height: 2.43*0.8rem;
      .c-egg {
        width: 100%;
        height: 100%;
      }
      .s-text {
        padding: 0 0.2rem;
        height: 0.49rem;
        line-height: 0.49rem;
        border-radius: 0.24rem;
        font-size: 0.32rem;
        bottom: 1rem;
      }
    }
  }
  .c-egg {
    width: 100%;
    height: 100%;
  }
  .s-text {
    display: block;
    min-width: 0.42rem;
    padding: 0 0.1rem;
    height: 0.3rem;
    line-height: 0.3rem;
    background: #f8b918;
    border-radius: 0.15rem;
    font-size: 0.2rem;
    font-weight: bold;
    color: #9a5015;
    text-align: center;
    position: absolute;
    left: 50%;
    bottom: 0;
    transform: translateX(-50%);
    white-space: nowrap;
    bottom: 25%;
  }
}
</style>
