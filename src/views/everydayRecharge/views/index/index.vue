<template>
  <div class="everyday-recharge">
    <!-- 返回 -->
    <div class="back-btn" @click="backHome">返回</div>
    <!-- 规则 -->
    <div class="rule-btn" @click="openRule">规则</div>
    <!-- 倒计时 -->
    <count-down :time="info.countdown"/>
    <!-- tab -->
    <div class="tab">
      <div class="item day" v-show="currentIndex == 0" @click="handleNavClick(1)"></div>
      <div class="item week" v-show="currentIndex == 1" @click="handleNavClick(0)"></div>
    </div>
    <div class="list">
      <div class="top">·奖励请在 
        <span v-if="currentIndex == 0">每天24点</span>
        <span v-if="currentIndex == 1">{{info.endDate | formatTime('m:d')}}24点</span>
        前及时领取
      </div>
      <div class="item" v-for="(item, index) in list" :key="index">
        <div class="title">
          <div class="key">
            <span>累计充值{{item.limit}}元</span>
          </div>
          <div class="value">
            <span class="finish-num">{{item.recharge}}</span>/<span class="total-num">{{item.limit}}</span>
          </div>
        </div>
        <div class="content">
          <template v-for="(innerItem, innerIndex) in awardImg(item.awardsName)" >
            <div class="everyday" v-if="currentIndex == 0" :key="innerIndex">
              <div class="award-img">
                <img v-if="innerItem.img == 'hfq'" class="inner-img" src="./img/hfq.png" alt="">
                <img v-if="innerItem.img == 'jdk'" class="inner-img" src="./img/jdk.png" alt="">
              </div>
              <div class="award-name">{{innerItem.name}}</div>
            </div>
            <div class="week" v-if="currentIndex == 1" :key="innerIndex">
              <div class="award-img">
                <img v-if="innerItem.img == 'hfq'" class="inner-img" src="./img/hfq1.png" alt="">
                <img v-if="innerItem.img == 'jdk'" class="inner-img" src="./img/jdk.png" alt="">
              </div>
              <div class="award-name">{{innerItem.name}}</div>
            </div>
          </template>
          <div class="btns">
            <div class="finish" v-if="item.status == 1" @click="_receiveAward(item)">
              <img class="inner-img" src="./img/finish.png" alt="">
            </div>
            <div class="finished" v-if="item.status == 2">
              <img class="inner-img" src="./img/finished.png" alt="">
            </div>
            <div class="pay" v-if="item.status == 0" @click="jump(item, index)">
              <img class="inner-img" src="./img/gofinish.png" alt="">
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="bottom"></div>
    <!-- rule -->
    <rule v-model="showRule" :info="info"/>
    <!-- award -->
    <award v-model="showAward" :list="awardList"/>
  </div>
</template>
<script>
import Award from './components/award'
import Rule from './components/rule'
import CountDown from './components/countDown'
import Services from '../../services/services'
import _get from 'lodash.get'
export default {
  name: 'masterStrategy',
  data: ()=>({
    currentIndex: 0,
    info: {},
    awardList: [],
    showRule: false,
    showAward: false
  }),
  components: {
    CountDown,
    Rule,
    Award
  },
  computed: {
    nav () {
      return _get(this.info, 'categoryList', [])
    },
    list () {
      if(this.currentIndex == 0) {
        return _get(this.info, 'dayList', [])
      }
      return _get(this.info, 'weekList', [])
    }
  },
  methods: {
    handleNavClick (index) {
      this.currentIndex = index
      if(index == 1) {
        GLOBALS.marchSetsPoint('A_H5PT0283003398')
      }
    },
    /** 返回首页 **/
    backHome () {
      GLOBALS.marchSetsPoint('A_H5PT0283003399')
      window.location.href = "//wap.beeplaying.com/xmWap/"
    },
    /** 打开规则 **/
    openRule () {
      this.showRule = true
      GLOBALS.marchSetsPoint('A_H5PT0283003400')
    },
    awardImg (item) {
      const arr = item.split(';')
      let awardList = []
      arr.forEach(element => {
        awardList.unshift({
          img: element.split(':')[1],
          name: element.split(':')[0],
        })
      })
      return awardList
    },
    /** 获取活动信息 **/
    _getInfo () {
      Services.getInfo().then(res => {
        const {code, data, message} = _get(res, 'data')
        if (code == 200) {
          this.info = _get(res, 'data.data', {})
        }
      })
    },
    /** 领取奖励 **/
    _receiveAward (item) {
      Services.receiveAwards({
        level: item.level,
        type: this.currentIndex,
      }).then(res => {
        const {code, data, message} = _get(res, 'data')
        if(code == 200) {
          this.awardList = _get(res, 'data.data', [])
          this.showAward = true
          this._getInfo()
        }else {
          this.$toast.show({ message })
        }
        GLOBALS.marchSetsPoint('A_H5PT0283003401', {
          task_id: item.level,
          task_name: item.awardsName,
          awards_name: this.awardList
        })
      })
    },
    jump (item) {
      GLOBALS.marchSetsPoint('A_H5PT0283003401', {
        task_id: item.level,
        task_name: item.awardsName
      })
      window.location.href = 'https://wap.beeplaying.com/xmWap/#/payment/'
    },
    goRanking () {
      GLOBALS.marchSetsPoint('A_H5PT0282003392')
      this.$router.push({
        name: 'ranking'
      })
    }
  },
  mounted() {
    this._getInfo()
    GLOBALS.marchSetsPoint('P_H5PT0283', {
      source_address: document.referrer
    })
  }
}
</script>
<style lang="less" scoped>
.inner-img {
  vertical-align: top;
  width: 100%;
  height: 100%;
}
.everyday-recharge {
  position: relative;
  padding: 1.98rem 0 .28rem;
  min-height: 100%;
  background: url(./img/top.png) no-repeat center top #27040B;
  background-size: 100% auto;
  .back-btn,.rule-btn {
    position: absolute;
    top: .2rem;
    width: .8rem;
    height: .42rem;
    text-align: center;
    line-height: .44rem;
    font-size: .24rem;
    font-weight: bold;
    color: #fff;
    border-radius: .21rem;
  }
  .back-btn {
    left: .1rem;
    background: #68BEFE;
  }
  .rule-btn {
    right: .1rem;
    background: #A991FF;
  }
  .tab {
    margin: 0 auto .23rem;
    width: 5.8rem;
    height: .76rem;
    .day {
      width: 100%;
      height: 100%;
      background: url(./img/tab.png) no-repeat center top;
      background-size: 100% 100%;
    }
    .week {
      width: 100%;
      height: 100%;
      background: url(./img/tab1.png) no-repeat center top;
      background-size: 100% 100%;
    }
  }
  .list {
    overflow: hidden;
    margin: 0 auto;
    width: 6.8rem;
    background: url(./img/2.png) no-repeat center top;
    background-position-y: 1.35rem;
    background-size: 100% 100%;
    .top {
      margin: .2rem 0 0;
      text-align: center;
      height: 1.32rem;
      line-height: 1.32rem;
      color: #fff;
      background: url(./img/1.png) no-repeat center top;
      background-size: 100% 100%;
      span {
        padding: 0 .1rem;
        border-radius: .08rem;
        background: #4F1C95;
      }
    }
    .item {
      margin: 0 auto .25rem;
      width: 6rem;
      height: 2.22rem;
      background: url(./img/item.png) no-repeat center top;
      background-size: 100% 100%;
      &:last-child {
        margin-bottom: 0;
      }
      .title {
        padding: 0 .5rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: .44rem;
        background: url(./img/1.png) no-repeat center top;
        background: 100% 1.35rem;
        .key {
          color: #E96023;
        }
        .value {
          .finish-num {
            color: #FD0942;
          }
          .total-num {
            color: #6124C4;
          }
        }
      }
      .content {
        position: relative;
        margin-top: .2rem;
        padding: 0 .3rem 0 .13rem;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        .everyday {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          .award-img {
            width: 1.72rem;
            height: 1.53rem;
          }
          .award-name {
            font-size: .3rem;
            color: #fff;
            font-weight: bold;
            white-space: nowrap;
          }
        }
        .week {
          position: relative;
          margin-right: .1rem;
          .award-img {
            width: 1.53rem;
            height: 1.42rem;
          }
          .award-name {
            position: absolute;
            left: 0;
            bottom: 0;
            width: 100%;
            text-align: center;
            font-size: .24rem;
            color: #fff;
            font-weight: bold;
            white-space: nowrap;
          }
        }
        .btns {
          position: absolute;
          right: .3rem;
          top: .43rem;
          width: 1.68rem;
          height: .68rem;
          >div {
            width: 100%;
            height: 100%;
          }
        }
      }
    }

  }
  .bottom {
    margin: 0 auto;
    width: 6.8rem;
    height: .52rem;
    background: url(./img/3.png) no-repeat center top;
    background-size: 100% 100%;
  }
}
</style>