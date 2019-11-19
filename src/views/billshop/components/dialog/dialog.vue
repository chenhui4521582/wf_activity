<template>
  <div class="dialog-warp" v-if="dialogShow">
    <div class="mask-warp"></div>
    <div class="content-warp">
      <div class="title-warp">
        <span>温馨提示</span>
        <div class="close-icon" @click="dialogShow=false"><img src="./image/close-small.png" alt=""></div>
      </div>
      <div class="content">
        <img v-if="statusCode===104||statusCode===103" src="./image/out-of-stock.png" alt="">
        <img v-if="statusCode===102 || statusCode===107" src="./image/short.png" alt="">
        <img v-if="statusCode===200" src="./image/succecc.png" alt="">
        <!--<img v-if="statusCode===103" src="./image/succecc.png"  style="width: 1.67rem;height: 1.72rem" alt="">-->

        <div v-if="statusCode===102" class="content-text"> 您的话费券不足<br />快去欢乐套圈快速赚话费吧</div>
        <div v-if="statusCode===104" class="content-text">当前商品库存不足<br />去看看其他商品吧</div>
        <div v-if="statusCode===103" class="content-text"> 今天已购买过了哟<br />明天再来吧~</div>
        <div v-if="statusCode===200" class="content-text">换取成功<br />快去领取吧</div>
        <div v-if="statusCode===107" class="content-text"> 完成新手任务后才可以领取，<br />快去完成新手任务吧</div>
      </div>
      <div class="dialog-button" v-if="statusCode===200 && awardsType==46">
        <div class="return base-button" @click="dialogShow=false">返回</div>
        <div class="save base-button" @click="goMiniLottery">去领取</div>
      </div>
      <div class="dialog-button" v-else>
        <div class="return base-button" @click="dialogShow=false">返回</div>
        <div class="save base-button" v-if="statusCode===102 || statusCode===200 && awardsType===1" @click="earnMoney">去赚话费</div>
        <div class="save base-button" v-if="statusCode===200 && awardsType!==1" @click="checkprize">去领取</div>
        <div class="save base-button" v-if="statusCode===104 || statusCode===103" @click="lookMall">看看其他</div>
        <div class="save base-button" v-if="statusCode===107" @click="earnMoney">去完成任务</div>
      </div>
    </div>
  </div>
</template>
<script>
import { getUrlParam, marchSetsPoint } from "../../utils/common"
export default {
  name: 'dialogPage',
  data () {
    return {
      dialogShow: this.value
    }
  },
  props: {
    value: {
      type: Boolean,
      default: true
    },
    statusCode: {
      type: [Number, String],
      default: ''
    },
    awardsType: {
      type: [Number, String],
      default: ''
    }
  },
  watch: {
    value (val) {
      this.dialogShow = val
    },
    dialogShow (val) {
      this.$emit('input', val)
    }
  },
  methods: {
    // 去赚话费
    async earnMoney () {
      this.dialogShow = false;
      await marchSetsPoint('A_H5PT0035000638', {
        residual_phone: this.$route.query['accountBalance']
      })
      this.goRing()
    },
    // 去看看其他
    async lookMall () {
      await marchSetsPoint('A_H5PT0035001268', {
        residual_phone: this.$route.query['accountBalance']
      })
      history.go(-1)
    },
    // 去领奖
    async checkprize () {
      this.dialogShow = false;
      await marchSetsPoint('A_H5PT0035001267', {
        residual_phone: this.$route.query['accountBalance']
      })
      this.$emit('on-checkprize')
    },
    //去小额夺宝
    goMiniLottery() {
      let CHANNEL = localStorage.getItem('APP_CHANNEL') || 100070
      let TOKEN = localStorage.getItem('ACCESS_TOKEN') || 100070
      window.location.href = `https://wap.beeplaying.com/activities/miniLottery.html#/?channel=${CHANNEL}&token=${TOKEN}`
    },
    _getRingServerStatus () {
      let url = '//quoits-api.beeplaying.com/quoits/api/quoitsgame/serverStatus'
      this.axios.post(url).then(res => {
        let { data, code } = res.data
        if (code === 200) {
          if (data.type === '1' || (data.distanceStop < 0 && data.distanceStart >= 0)) {
            this.ringData = data
          }
        }
      })
    },
    goRing() {
      GLOBALS.marchSetsPoint('A_H5PT0019002354')
      let url = this.ringData.type == 2 ? '/ring2/' : '/ring/'
      let APP_CHANNEL = localStorage.getItem('APP_CHANNEL')
      window.location.href = `https://wap.beeplaying.com${url}?channel=${APP_CHANNEL}&time=${new Date().getTime()}`
    }
  },
  mounted() {
    this._getRingServerStatus()
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
  min-height: 5.6rem;
  width: 6rem;
  position: fixed;
  top: 50%;
  left: 50%;
  margin-left: -3rem;
  margin-top: -2.85rem;
  background-color: #0f1726;
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
  text-align: center;
  padding: 0.4rem 1.2rem;
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
  margin-top: 0.1rem;
  .base-button {
    display: inline-block;
    border-radius: 0.08rem;
    width: 1.8rem;
    height: 0.6rem;
    line-height: 0.6rem;
  }
  .return {
    background-color: #2b3a55;
    margin-right: 0.2rem;
  }
  .save {
    background-color: #ee6f0b;
    margin-left: 0.2rem;
  }
}
</style>

