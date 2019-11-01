<template>
  <div class="cost-down" v-if="showFlag">
    <div class="task" v-if="type==2">
      <span class="count-down">
        维护倒计时{{countdownTime}}
      </span>
      <span class="rule-icon" @click="openRule"></span>
    </div>
    <div class="task-home" v-else>
      <span class="count-down">
        维护倒计时{{countdownTime}}
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
        成就任务即将在<span>{{countdownTime}}</span>之后进行维护，届时成就任务将不可见，请及时领取奖励。<br>
        未领取奖励将在维护完成后才能领取。
      </div>
    </commonPopNew>
  </div>
</template>
<script>
import _get from 'lodash.get'
import commonPopNew from '@/components/commonPopNew/commonPopNew'
export default {
  name: 'costDown',
  props: ['type'],
  data: ()=> ({
    showFlag: false,
    countDownNum: '',
    countdownTime: '',
    showRule: false
  }),
  components: {
    commonPopNew
  },
  methods: {
    _getCostDown() {
      let url = '//platform-api.beeplaying.com/task/api/achievement/hide'
      this.axios.post(url).then(res=> {
        let {code, data, message} = _get(res, 'data')
        if(code === 200) {
          this.countDownNum = _get(res, 'data.data.countdown') 
          let showFlag = _get(res, 'data.data.showFlag')
          if(!showFlag) {
            if(this.countDownNum > 0) {
              this.countDown(this.countDownNum)
              this.$emit('masterTaskStatus', true)
              this.showFlag = true
            }else {
              this.$emit('masterTaskStatus', false)
              this.showFlag = false
            }
          }else {
            this.showFlag = false
            this.$emit('masterTaskStatus', true)
          }
        }
      })
    },
    countDown(data) {
      if (!data) return false
      let date = data / 1000
      this.timer = setInterval(() => {
        date = date - 1
        if (date <= 0) {
          date = 0
          clearInterval(this.timer)
          this.$emit('masterTaskStatus', false)
          this.showFlag = false
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
    this._getCostDown()
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
      margin-right: .1rem;
      white-space: nowrap;
      font-size: .22rem;
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
      margin-right: .1rem;
      white-space: nowrap;
      font-size: .22rem;
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
    text-align: left;
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