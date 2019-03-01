<template>
  <div class="pop-window">
    <div class="pop-mask" @touchmove.prevent></div>
    <div class="receive-pop" ref="receive-pop" :class="{'bigbg':title == '活动规则'}">
      <p ref="receive-pop-title"><i @click="close"></i>{{title}}</p>
      <div class="slot" ref="slot" style="position: relative">
        <slot></slot>
      </div>
      <template v-if="isShowBtn">
        <div class="besure" @click="besure" v-html="btnName" ref="besure"></div>
      </template>
    </div>
  </div>
</template>
<script type="text/javascript">
  export default {
    props: {
      title: {
        type: String,
        default: ''
      },
      btnName: {
        type: String,
        default: "确认"
      },
      isShowBtn: {
        default: true
      }
    },
    data() {
      return {
        convert: [],
        showReceivePop: false,
        awardsName: ''
      }
    },
    methods: {
      close(val) {
        if (val == 'back') {
          this.$emit('close', true);
        } else {
          this.$emit('close', false);
        }
      },
      besure() {
        this.$emit('besure');
      }
    },
    mounted() {
      let top = this.title == '活动规则' ? 54 * 1.5 : 0
      this.$nextTick(() => {
        if (this.isShowBtn) {
          this.$refs.slot.style.height = (this.$refs.besure.offsetTop - this.$refs["slot"].offsetTop + top) + 'px'
        }else{
          this.$refs.slot.style.height =(this.$refs['receive-pop'].offsetHeight-this.$refs['receive-pop-title'].offsetHeight)+'px'
        }
      })
    }
  }
</script>
<style lang="less" scoped>
  .pop-window {
    z-index: 13;
  }

  .pop-mask {
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    background: #000;
    opacity: 0.5;
    filter: alpha(opacity=50);
    z-index: 11;
  }

  .receive-pop {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 80%;
    min-height: 5.2rem;
    background: rgba(20, 31, 51, 1);
    text-align: center;
    z-index: 11;
    color: #fff;
    &.bigbg {
      width: 87%;
    }
    p:first-child {
      height: .8rem;
      line-height: .8rem;
      background: #141F33;
      font-size: .26rem;
      i {
        float: right;
        width: .4rem;
        height: .8rem;
        &::after {
          content: '';
          display: inline-block;
          margin-top: .25rem;
          margin-right: .2rem;
          width: .2rem;
          height: .2rem;
          vertical-align: top;
          background: url(commonpop_img/close-small.png) no-repeat;
          background-size: 100%;
        }
      }
    }
    p:nth-of-type(2) {
      padding: .7rem 0 1.1rem;
      font-size: .24rem;
      i {
        color: #FFD338
      }
    }
    div.besure {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      margin: 0 auto .4rem;
      width: 1.8rem;
      height: .6rem !important;
      line-height: .6rem;
      background: #EE6F0B;
      border-radius: .08rem;
      font-size: .28rem;
      font-weight: bold;
    }
  }
</style>
