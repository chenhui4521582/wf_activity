<template>
  <div class="wrap">
    <div class="lottery-btn" v-if="info.lotteryStatus == 0" @click="getLottry">马上抽奖</div>
    <div class="disable" v-if="info.lotteryStatus == 1" @click="goTask">话费券不够，去赚话费</div>
    <div class="disable" v-if="info.lotteryStatus == 2" @click="goHome">今日抽奖次数已用完，去玩游戏吧</div>
  </div>
</template>
<script>
import Services from '../../../services/services'
import _get from 'lodash.get'
export default {
  name: 'buyBtn',
  props: {
    info: {
      type: Object,
      default: ()=> ({})
    }
  },
  methods: {
    getLottry() {
      GLOBALS.marchSetsPoint('A_H5PT0264003108', {
        awards_id: this.info.id,
        awards_name: this.info.name
      })
      this.$emit('getLottery')
    },
    goTask() {
      GLOBALS.marchSetsPoint('A_H5PT0264003109')
      window.location.href = "https://wap.beeplaying.com/xmWap/#/task"
    },
    goHome() {
      GLOBALS.marchSetsPoint('A_H5PT0264003110')
      window.location.href = "https://wap.beeplaying.com/xmWap/#/"
    }
  }
}
</script>
<style lang="less" scoped>
.wrap {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: .9rem;
  line-height: .9rem;
  text-align: center;
  font-size: .24rem;
  color: #fff;
  .lottery-btn {
    height: 100%;
    background: #FF4141;
  }
  .disable {
    height: 100%;
    background: #FF4141;
    opacity: .7;
  }
}

</style>