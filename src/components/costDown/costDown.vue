<template>
  <div class="cost-down">
    <div class="task" v-if="type==2">
      <span class="count-down">
        维护倒计时&nbsp;{{countdownTime}}&nbsp;
      </span>
      <span class="rule-icon" @click="openRule"></span>
    </div>
    <div class="task-home" v-else>
      <span class="count-down">
        维护倒计时&nbsp;{{countdownTime}}&nbsp;
      </span>
      <span class="rule-icon" @click="openRule"></span>
    </div>
    <commonPopNew
      v-if="showRule"
      title="温馨提示"
      btnName="知道了"
      @besure="hideRule"
      @close="hideRule"
    >
      <div class="text">
        成就任务即将在<span>{{countdownTime}}</span>进行维护，届时成就任务将不可见，请即使领取奖励。未领取奖励将在维护完成后才能领取。
      </div>
    </commonPopNew>
  </div>
</template>
<script>
import commonPopNew from '@/components/commonPopNew/commonPopNew'
export default {
  name: 'costDown',
  props: ['countDownNum', 'type'],
  data: ()=> ({
    countdownTime: '',
    showRule: false
  }),
  components: {
    commonPopNew
  },
  methods: {
    countDown(data) {
      if (!data) return false
      let date = data / 1000
      this.timer = setInterval(() => {
        date = date - 1
        if (date <= 0) {
          date = 0
          clearInterval(this.timer)
          this.$emit('hideMasterTask')
        }
        let day = Math.floor(date / 86400)
        let hour = Math.floor(parseInt(date / 60 / 60) % 24)
        let minute = Math.floor(parseInt(date / 60) % 60)
        let second = Math.floor(date % 60)
        let countDay = day >= 10 ? day : '0' + day
        let countHour = hour >= 10 ? hour : '0' + hour
        let countMinute = minute >= 10 ? minute : '0' + minute
        let countSecond = second >= 10 ? second : '0' + second
        if (day > 0) {
          this.countdownTime = `${countDay}天${countHour}:${countMinute}:${countSecond}`
        } else {
          this.countdownTime = `${countHour}:${countMinute}:${countSecond}`
        }
      }, 1000)
    },
    openRule() {
      this.showRule = true
    },
    hideRule() {
      this.showRule = false
    }
  },
  mounted() {
    this.countDownNum && this.countDown(this.countDownNum)
  },
  watch: {
    countDownNum(value) {
      value && this.countDown(value)
    }
  }
}
</script>
<style scoped lang="less">
.cost-down {

  .task {
    position: absolute;
    right: 0;
    top: 0;
    z-index: 10;
    display: flex;
    justify-content: center;
    align-items: center;
    width:2.72rem;
    height:.40rem;
    background:rgba(163,58,77,1);
    border-radius:0 0 0 .20rem;
    .count-down{
      font-size: .22px;
      color: #FEDFAC;
      line-height: 1;
    }
    .rule-icon{
      width: .25rem;
      height: .25rem;
      background: url(./img/rule-icon1.png) no-repeat center center / .24rem .24rem;
    }
  }
  .task-home {
    margin: 0 auto .2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    width:2.72rem;
    height:.40rem;
    background:#A33A4D;
    border-radius: .04rem;
    .count-down{
      font-size: .22px;
      color: #FEDFAC;
      line-height: 1;
    }
    .rule-icon{
      width: .25rem;
      height: .25rem;
      background: url(./img/rule-icon1.png) no-repeat center center / .24rem .24rem;
    }
  }

  .text {
    padding: .3rem;
    font-size: .24rem;
    color: #FFFFFF;
    line-height: .4rem;
    span {
      color: #FEE1B0;
    }
  }
}
</style>