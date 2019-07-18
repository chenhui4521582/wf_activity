<template>
  <div class="dialog-warp" v-if="dialogShow">
    <div class="mask-warp"></div>
    <div class="content-warp">
      <div class="title-warp">
        <span>确认商品信息</span>
        <div class="close-icon" @click="dialogShow=false"><img src="./image/close-small.png" alt=""></div>
      </div>
      <div class="content">
        <div class="content-text">当前商品名称：{{detail&&detail.name}}<br>所需话费券：{{detail&&detail.purchasePrice*specNumber}}</div>
      </div>
      <div class="dialog-button">
        <div class="return base-button save" @click="goExchange">确认换取</div>
      </div>
    </div>
  </div>
</template>
<script>
  import {getUrlParam, marchSetsPoint} from "../../utils/common"

  export default {
    name: 'dialogPage',
    data() {
      return {
        dialogShow: this.value
      }
    },
    props: {
      value: {
        type: Boolean,
        default: true
      },
      detail:{
        type:Object,
        default:null
      },
      specNumber:{
        type:Number,
        default:1
      }
    },
    watch: {
      value(val) {
        this.dialogShow = val
      },
      dialogShow(val) {
        this.$emit('input', val)
      }
    },
    methods: {
      // 去赚话费
      async earnMoney() {
        this.dialogShow = false;
        await marchSetsPoint('A_H5PT0035000638', {
          residual_phone: this.$route.query['accountBalance']
        })
        switch (getUrlParam('from')) {
          case 'bdWap':
            parent.location.href = `https://wap.beeplay123.com/bdWap/?channel=${localStorage.getItem('APP_CHANNEL')}#/taskview`
            break
          case 'jsWap':
            parent.location.href = `https://wap.beeplay123.com/bdWap/?channel=${localStorage.getItem('APP_CHANNEL')}#/taskview`
            break
          case 'miniWap':
            parent.location.href = `https://wap.beeplay123.com/miniWap/?channel=${localStorage.getItem('APP_CHANNEL')}#/taskview`
            break
          default:
            parent.location.href = `https://wap.beeplay123.com/wap/home/?channel=${localStorage.getItem('APP_CHANNEL')}#/taskview`
        }
      },
      // 去看看其他
      async lookMall() {
        await marchSetsPoint('A_H5PT0035001268', {
          residual_phone: this.$route.query['accountBalance']
        })
        history.go(-1)
      },
      // 去领奖
      async checkprize() {
        this.dialogShow = false;
        await marchSetsPoint('A_H5PT0035001267', {
          residual_phone: this.$route.query['accountBalance']
        })
        this.$emit('on-checkprize')
      },
      goExchange() {
        this.dialogShow = false
        this.$emit('goExchange', true)
      }
    }
  }
</script>
<style lang="less" scoped>
  .mask-warp {
    height: 100vh;
    width: 100vw;
    background-color: rgba(0, 0, 0, 0.7);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9;
  }

  .content-warp {
    min-height: 4rem;
    width: 5.5rem;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #0F1726;
    z-index: 10;
    border-radius: 0.08rem;
    overflow: hidden;
  }
  .title-warp {
    position: relative;
    height: 0.8rem;
    width: 100%;
    line-height: 0.8rem;
    text-align: center;
    font-size: 0.26rem;
    color: #ffffff;
    background: rgba(20, 31, 51, 1);
    .close-icon {
      position: absolute;
      top: 0;
      right: 0;
      height: 0.8rem;
      width: 0.8rem;
      img {
        width: 0.2rem;
        height: 0.2rem;
      }
    }
  }

  .content {
    padding: 0.6rem .44rem 0 .44rem;
    box-sizing: border-box;
    img {
      width: 3.1rem;
    }
  }

  .content-text {
    font-size: 0.26rem;
    color: #ffffff;
  }

  .dialog-button {
    color: #ffffff;
    font-size: 0.28rem;
    font-weight: 500;
    text-align: center;
    position: absolute;
    bottom: .6rem;
    left: 0;
    right: 0;
    .base-button {
      display: inline-block;
      border-radius: 0.08rem;
      width: 1.8rem;
      height: 0.6rem;
      line-height: 0.6rem;
    }
    .return {
      background-color: #2B3A55;
      margin-right: 0.2rem;
    }
    .save {
      background-color: #EE6F0B;
      margin-left: 0.2rem;
    }
  }
</style>

