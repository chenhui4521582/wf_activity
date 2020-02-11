<template>
  <div class="details">
    <div class="header" @click="openLogistics">
      <div class="left">春节期间快递停运通知</div>
      <div class="right">
        <span>点击查看</span>
        <span class="iconfont icon-next"></span>
      </div>
    </div>
    <div class="goods-img">
      <img :src="detail.picture | filter" alt="">
    </div>
    <div class="good-status">
      <div class="year-icon">
        <img src="./img/year-icon.png" alt="">
      </div>
      <div class="before" v-if="detail.status == 1">
        {{versionDate(detail.startTime)}}开抢
      </div>
      <div class="start" v-if="detail.status == 0">
        <div class="count-down">
          疯抢进行中 {{this.detail.countTime}}后结束
        </div>
        <div class="progress">
          <div class="number">已抢{{progress}}%</div>
          <div class="wrap">
            <div class="bg" :style="{width: progress+'%'}"></div>
          </div>
        </div>
      </div>
      <div class="end" v-if="detail.status == 2">

      </div>
    </div>
    <div class="goods-info">
      <div class="price">
        <div class="current-price">
          <em>秒杀价</em><span>{{ parseInt(detail.seckillPrice / 10) || 0}}</span><i>话费券</i>
        </div>
        <div class="mask-price">原价:{{ parseInt(detail.awardPrice / 10) || 0}}</div>
      </div>
      <div class="name">
        {{detail.title}}
      </div>
    </div>
    <div class="goods-message">
      <div class="type">
        <div class="key">规格</div>
        <div class="value">{{detail.specs}}</div>
      </div>
      <div class="select">
        <div class="key">已选</div>
        <div class="value">{{detail.specs}}</div>
      </div>
      <div class="number">
        <div class="key">数量</div>
        <field />
      </div>
    </div>
    <div class="goods-explain">
      <div class="key">保障</div>
      <div class="value">正品保障·全国联保·售后无忧</div>
    </div>
    <div class="goods-desc">
      <div class="title">商品详情</div>
      <div class="center">{{detail.desc}}</div>
    </div>
    <div class="tips" v-if="showTips">
      <div class="left" @click="hideTips">
        <span class="iconfont icon-close"></span>
        <span>温馨提示：您的话费券不足哦，快去赚话费吧~</span>
      </div>
      <div class="right" @click="goRing">
        <span>去赚话费</span>
        <span class="iconfont icon-next"></span>
      </div>
    </div>
    <div class="commit">
      <div class="before btn" v-if="detail.status == 1">
        {{versionDate(detail.startTime)}}开抢
      </div>
      <div class="start btn" v-if="detail.status == 0">
        <div class="no-goods" v-if="this.detail.awardNum == 0">
          商品已抢光
        </div>
        <div class="no-goods" v-else-if="this.detail.payStatus">
          该商品限购一次
        </div>
        <div class="has-goods" v-else @click="_commit">
          马上抢购
        </div>
      </div>
      <div class="end btn" v-if="detail.status == 2">
        本场秒杀已结束
      </div>
    </div>
    <!-- 没有库存Modal -->
    <modal v-model="noAwardModal" title="温馨提示" :type="2" closeText="看看其他活动" saveText="看看别的秒杀"
      @on-close="modalClose" @on-save="modalConfirm">
      <div class="noAwardModal">
        下手慢了哦，已经抢光了
      </div>
    </modal>
    <!-- 到时间的Modal -->
    <modal v-model="noTimesModal" title="温馨提示" :type="2" closeText="看看其他活动" saveText="看看别的秒杀"
      @on-close="modalClose" @on-save="modalConfirm">
      <div class="noTimeModal">
        抢购截止了，等待下一场吧~
      </div>
    </modal>
    <!-- 秒杀成功的Modal -->
    <awards-dialog v-model="successModal" :tipsTxt="'恭喜你秒杀成功'" :awards="AwardsData.awards"
      :explainText="AwardsData.explainText" :bottomLink="AwardsData.bottomLink"
      :confirmBtnText="'去查看'" @callback="awardsCallback" @closedCallback="closeCallback" />
    <!-- 话费卷不足的Modal -->
    <modal v-model="noChargeModal" title="温馨提示" :type="2" closeText="返回" saveText="去赚话费"
      @on-close="hideModal" @on-save="goRing">
      <div class="noChargeModal">
        <img src="./img/noChargeModal-icon.png" alt="">
        <p>您的话费券不足</p>
        <p>快去欢乐套圈快速赚话费吧</p>
      </div>
    </modal>
    <!-- 快递提示 -->
    <modal v-model="logisticsModal" title="快递停运通知" :type="2" :saveText="'确认'"
      :closeButtonShow="false" @on-save="hideModal">
      <div class="logisticsModal">
        <p>
          因疫情暂未好转，平台将全力做好疫情防控工作，最新发货通知如下：
        </p>
        <p>
          湖北全省快递暂时无法发出，其他城市根据当地疫情变化，以快递公司当天揽件情况安排，暂时无法保证发货和到货时间。
        </p>
        <p>
          快递恢复后，我们将第一时间处理订单，请您理解。
        </p>
        <p>
          感谢您等待，如有任何疑问，请及时联系在线客服。
        </p>
        <p>
          注意：如果疫情继续恶化，发货时间会根据实际情况做出调整，届时将发布新的通知，请及时关注。
        </p>
      </div>
    </modal>
  </div>
</template>
<script>
import Services from '../../services/services'
import _get from 'lodash.get'
import field from './components/field'
export default {
  name: 'sectillDetails',
  data: () => ({
    detail: {},
    showTips: false,
    ringData: null,
    noAwardModal: false,
    noTimesModal: false,
    successModal: false,
    noChargeModal: false,
    logisticsModal: false,
    AwardsData: {}
  }),
  components: {
    field
  },
  computed: {
    progress () {
      if (this.detail.status == 1) {
        return 0
      }
      if (this.detail.status == 2) {
        return 100
      }
      if (this.detail.status == 0) {
        let allNo = this.detail.awardNum + this.detail.useNum
        let proportion = (this.detail.useNum / allNo > 1) ? 1 : this.detail.useNum / allNo
        return Math.floor(proportion * 100)
      }
    }
  },
  methods: {
    _getActivityDetail () {
      let { id } = this.$route.query
      if (id) {
        Services.getActivityDetail({ value: id }).then(res => {
          let { code, data, message } = _get(res, 'data')
          if (code == 200) {
            let { fragment, periodInfo } = _get(res, 'data.data')
            this.detail = { ...{ fragment }, ...periodInfo }
            /** 秒杀进行中 倒计时逻辑 **/
            if (this.detail.status == 0) {
              let start = new Date().getTime()
              let endTime = this.detail.endTime.replace(/-/g, '/')
              let endTimeStamp = new Date(endTime).getTime()
              let coutDownTime = endTimeStamp - start
              this.cleartTime()
              this.initTime(coutDownTime)
              this.countDownTime(coutDownTime)
            }
            /** 秒杀没开始 倒计时逻辑 **/
            if (this.detail.status == 1) {
              let start = new Date().getTime()
              let endTime = this.detail.startTime.replace(/-/g, '/')
              let endTimeStamp = new Date(endTime).getTime()
              let coutDownTime = endTimeStamp - start
              this.cleartTime()
              this.initTime(coutDownTime)
              this.countDownTime(coutDownTime)
            }
            /** 没开始并且用户话费卷不足显示提示框 **/
            if (this.detail.status == 1 && this.detail.seckillPrice > this.detail.fragment) {
              this.showTips = true
            }
            // /** 用户已经买过的按钮变灰 **/
            // if(this.detail.payStatus) {
            //   this.detail.awardNum = 0
            // }
          }
        })
      }
    },
    /** 抢购 **/
    _commit () {
      if (this.detail.seckillPrice > this.detail.fragment) {
        this.noChargeModal = true
        return
      }
      if (this.lock) return false
      this.lock = true
      Services.commit({ value: this.detail.id }).then(res => {
        this.lock = false
        let { code, data, message } = _get(res, 'data')
        if (code == 200) {
          this.successModal = true
          this.AwardsData = {
            awards: {
              awardsImage: this.detail.icon,
              awardsName: this.detail.title
            },
            recommend: {
              cdnImage: '',
              url: ''
            },
            explainText: {
              html: '<p style="line-height: .4rem">请至 我的-我的资产 查看<br> 奖品发放可能会有延迟，请耐心等待</p>',
              color: '#ACACAC'
            },
            bottomLink: {
              text: '看看其他 >',
              callback: () => {
                this.$router.push({
                  name: 'index'
                })
                GLOBALS.marchSetsPoint('A_H5PT0237002756')
              }
            }
          }
        }
        /** 库存不足 **/
        else if (code == 103) {
          this.noAwardModal = true
          this.detail.awardNum = 0
        }
        /** 碎片不足 **/
        else if (code == 105) {
          this.noChargeModal = true
        }
        /** 已结束 **/
        else if (code == 106) {
          this.noTimesModal = true
          this.detail.status = 2
        } else {
          this.$toast.show({
            message,
            duration: 3000
          })
        }
        GLOBALS.marchSetsPoint('A_H5PT0237002755')
      })
    },
    _getRingServerStatus () {
      Services.getRingServerStatus().then(res => {
        let { data, code } = res.data
        if (code === 200) {
          if (data.type === '1' || (data.distanceStop < 0 && data.distanceStart >= 0)) {
            this.ringData = data
          }
        }
      })
    },
    /** 关闭Tips **/
    hideTips () {
      this.showTips = false
    },
    /** 去赚话费 **/
    goRing () {
      let channel = localStorage.getItem('APP_CHANNEL')
      if (this.ringData.type == 2) {
        window.location.href = `https://wap.beeplaying.com/ring2/?channel=${channel}&time=${Date.now}`
      } else {
        window.location.href = `https://wap.beeplaying.com/ring/?channel=${channel}&time=${Date.now}`
      }
      GLOBALS.marchSetsPoint('A_H5PT0237002754')
    },
    /** 返回首页 **/
    goHome () {
      window.location.href = `https://wap.beeplaying.com/xmWap/`
    },
    openLogistics () {
      this.logisticsModal = true
    },
    /** 关闭余额不住modal **/
    hideModal () {
      this.noChargeModal = false
      this.logisticsModal = false
    },
    /** 时间转换 **/
    versionDate (time) {
      time = time.replace(/-/g, '/')
      let timesTamp = new Date(time)
      let year = timesTamp.getFullYear()
      let mounth = timesTamp.getMonth() + 1
      let day = timesTamp.getDate()
      let hour = timesTamp.getHours()
      let minute = timesTamp.getMinutes()
      let second = timesTamp.getSeconds()
      let countMounth = mounth >= 10 ? mounth : '0' + mounth
      let countDay = day >= 10 ? day : '0' + day
      let countHour = hour >= 10 ? hour : '0' + hour
      let countMinute = minute >= 10 ? minute : '0' + minute
      let countSecond = second >= 10 ? second : '0' + second
      return `${year}年${countMounth}月${countDay}日 ${countHour}:${countMinute}:${countSecond}`
    },
    /** 初始化倒计时 **/
    initTime (info) {
      if (!info) return false
      if (info <= 0) {
        info = 0
      }
      let date = info / 1000
      let hour = Math.floor(parseInt(date / 60 / 60) % 24)
      let minute = Math.floor(parseInt(date / 60) % 60)
      let second = Math.floor(date % 60)
      let countHour = hour >= 10 ? hour : '0' + hour
      let countMinute = minute >= 10 ? minute : '0' + minute
      let countSecond = second >= 10 ? second : '0' + second
      this.$set(
        this.detail,
        'countTime',
        `${countHour}:${countMinute}:${countSecond}`
      )
    },
    /** 倒计时 **/
    countDownTime (info) {
      if (!info && info <= 0) return false
      let date = info / 1000
      this.timers = window.setInterval(() => {
        date = date - 1
        if (date <= 0) {
          date = 0
          window.clearInterval(this.timers)
          this._getActivityDetail()
        }
        let hour = Math.floor(parseInt(date / 60 / 60) % 24)
        let minute = Math.floor(parseInt(date / 60) % 60)
        let second = Math.floor(date % 60)
        let countHour = hour >= 10 ? hour : '0' + hour
        let countMinute = minute >= 10 ? minute : '0' + minute
        let countSecond = second >= 10 ? second : '0' + second
        this.$set(
          this.detail,
          'countTime',
          `${countHour}:${countMinute}:${countSecond}`
        )
      }, 1000)
    },
    /** 清除倒计时 **/
    cleartTime () {
      window.clearInterval(this.timers)
    },
    /** 看看其他活动 **/
    modalClose () {
      this.noAwardModal = false
      this.noTimesModal = false
      window.location.href = 'https://wap.beeplaying.com/activities/springfestivalunion.html'
      GLOBALS.marchSetsPoint('A_H5PT0237002758')
    },
    /** 看看别的秒杀 **/
    modalConfirm () {
      this.noAwardModal = false
      this.noTimesModal = false
      this.$router.push({
        name: 'index'
      })
      GLOBALS.marchSetsPoint('A_H5PT0237002759')
    },
    awardsCallback () {
      window.location.href = 'https://wap.beeplaying.com/xmWap/#/my/prize'
      GLOBALS.marchSetsPoint('A_H5PT0237002757')
    },
    closeCallback () {
      this._getActivityDetail()
    },
    /** 秒杀成功 或者 秒杀过的 状态重置成以结束**/
    init () {
      this._getActivityDetail()
      this._getRingServerStatus()
    }
  },
  mounted () {
    this.init()
  }
}
</script>
<style lang="less" scoped>
* {
  box-sizing: border-box;
}
.details {
  padding: 0.2rem 0.24rem 1.1rem;
  min-height: 100vh;
  background: #f7f7f7;
  .header {
    margin-bottom: 0.2rem;
    padding: 0 0.2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 0.6rem;
    font-size: 0.24rem;
    background: #ffecec;
    border-radius: 0.16rem;
    .left {
      color: #ff4141;
    }
    .right {
      color: #ff7800;
      .iconfont {
        font-size: 0.18rem;
      }
    }
  }
  .goods-img {
    background: #fff;
    border-radius: 0.16rem 0.16rem 0px 0px;
    height: 2.76rem;
    overflow: hidden;
    img {
      vertical-align: top;
      width: 100%;
      height: 2.76rem;
    }
  }
  .good-status {
    padding: 0.08rem 0.2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 0.6rem;
    background: url(./img/status-bg.png) no-repeat center center / 100% 100%;
    font-size: 0.24rem;
    .year-icon {
      width: 1.1rem;
      height: 0.44rem;
      img {
        vertical-align: top;
        width: 100%;
        height: 100%;
      }
    }
    .before {
      font-size: 0.24rem;
      color: #fff;
    }
    .start {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 0.24rem;
      color: #fff;
      .count-down {
        padding-right: 0.18rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 0.38rem;
        border-right: 1px solid #fff;
      }
      .progress {
        padding-left: 0.2rem;
        text-align: center;
        font-size: 0.2rem;
        color: #fff;
        .wrap {
          position: relative;
          height: 0.16rem;
          width: 1.3rem;
          background: #ffffff;
          border-radius: 0.08rem;
          overflow: hidden;
          .number {
            margin-bottom: 0.05rem;
          }
          .bg {
            position: absolute;
            left: 0;
            top: 0;
            height: 100%;
            background: #ffbc00;
          }
        }
      }
    }
  }
  .goods-info {
    margin-bottom: 0.2rem;
    padding: 0.22rem 0.2rem;
    border-radius: 0px 0px 16px 16px;
    background: #fff;
    .price {
      margin-bottom: 0.16rem;
      display: flex;
      justify-content: flex-start;
      align-items: flex-end;
      font-size: 0.2rem;
      color: #bbbbbb;
      .current-price {
        margin-right: 0.2rem;
        display: flex;
        justify-content: flex-start;
        align-items: flex-end;
        color: #ff4141;
        em {
          margin-right: 0.05rem;
          font-weight: bold;
          font-size: 0.32rem;
          color: #ff0036;
        }
        span {
          font-size: 0.42rem;
          line-height: 0.82;
        }
      }
      .mask-price {
        text-decoration: line-through;
      }
    }
    .name {
      font-weight: bold;
      font-size: 0.32rem;
      color: #000;
    }
  }
  .goods-message {
    margin-bottom: 0.2rem;
    padding: 0.32rem 0.2rem 0.28rem;
    background: #ffffff;
    border-radius: 0.16rem;
    .key {
      width: 0.7rem;
      font-size: 0.24rem;
      color: #888888;
    }
    .value {
      white-space: nowrap;
    }
    .type {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      margin-bottom: 0.2rem;
      height: 0.42rem;
      .value {
        width: 1.2rem;
        height: 0.42rem;
        line-height: 0.42rem;
        text-align: center;
        font-size: 0.24rem;
        color: #fff;
        background: #ff4141;
        border-radius: 0.1rem;
      }
    }
    .select {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      padding-bottom: 0.2rem;
      border-bottom: 1px solid #eeeeee;
      .value {
        width: 1.2rem;
        height: 0.42rem;
        line-height: 0.42rem;
        font-size: 0.24rem;
        color: #ff4141;
      }
    }
    .number {
      margin-top: 0.2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
  .goods-explain {
    margin-bottom: 0.2rem;
    padding-left: 0.2rem;
    height: 0.9rem;
    border-radius: 0.16rem;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    background: #fff;
    border-radius: 0.16rem;
    .key {
      width: 0.7rem;
      font-size: 0.24rem;
      color: #888888;
    }
    .value {
      white-space: nowrap;
      width: 1.2rem;
      height: 0.42rem;
      line-height: 0.42rem;
      font-size: 0.24rem;
      color: #000000;
    }
  }
  .goods-desc {
    padding: 0.26rem 0.2rem;
    background: #fff;
    border-radius: 0.16rem;
    .title {
      margin-bottom: 0.1rem;
      font-size: 0.28rem;
      color: #000000;
    }
    .center {
      line-height: 0.4rem;
      font-size: 0.24rem;
      color: #888888;
    }
  }
  .commit {
    .before {
      position: fixed;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 5;
      height: 0.9rem;
      line-height: 0.9rem;
      text-align: center;
      font-size: 0.24rem;
      background: #f0f0f0;
      color: #ff4141;
    }
    .start {
      position: fixed;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 5;
      height: 0.9rem;
      line-height: 0.9rem;
      text-align: center;
      font-size: 0.24rem;
      .no-goods {
        background: #fbafaf;
        color: #fff;
      }
      .has-goods {
        background: #ff4141;
        color: #fff;
      }
    }
    .end {
      position: fixed;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 5;
      height: 0.9rem;
      line-height: 0.9rem;
      text-align: center;
      font-size: 0.24rem;
      background: #fbafaf;
      color: #fff;
    }
  }
  .tips {
    position: fixed;
    left: 0.24rem;
    right: 0.24rem;
    bottom: 1.1rem;
    padding: 0 0.2rem;
    height: 0.6rem;
    line-height: 0.6rem;
    text-align: center;
    font-size: 0.2rem;
    display: flex;
    justify-content: space-between;
    background: rgba(0, 0, 0, 0.7);
    border-radius: 0.16rem;
    .left {
      color: #fff;
      .iconfont {
        font-size: 0.2rem;
      }
    }
    .right {
      color: #ffbc00;
      .iconfont {
        font-size: 0.2rem;
      }
    }
  }
  .noAwardModal,
  .noTimeModal {
    padding: 0.35rem 0;
    text-align: center;
    font-size: 0.24rem;
    color: #888;
  }
  .noChargeModal {
    padding: 0.2rem 0 0;
    text-align: center;
    img {
      margin-bottom: 0.26rem;
      width: 2.2rem;
      height: 1.24rem;
    }
    p {
      line-height: 0.4rem;
      font-size: 0.24rem;
      color: #888888;
    }
  }
  .logisticsModal {
    line-height: 0.4rem;
    font-size: 0.24rem;
    color: #888888;
  }
}
</style>