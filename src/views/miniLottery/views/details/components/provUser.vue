<template>
  <div class="lottery-status">
    <!-- 夺宝正在进行中 或者 没开始 -->
    <div class="lottery-run" v-if="(lastTreasurePassed || lastUserInfo) && !isAwards && (status == 0 || status == 3)">
        <div class="title">
          <span>上期幸运儿</span>
          <span class="prov-btn" @click="goLog">往期揭晓</span>
        </div>
        <div class="user" v-if="lastUserInfo">
          <div class="avatar">
            <img v-if="lastUserInfo.head_img" :src="lastUserInfo.head_img | filter" alt="">
            <img v-else src="https://file.beeplaying.com/cdn/common/images/common/img_photo.png" alt="">
          </div>
          <div class="text">
            <div class="name">获奖者：{{lastUserInfo.nickName}}</div>
            <div class="ip" v-if="lastUserInfo.ip && lastUserInfo.city">IP：{{lastUserInfo.ip}} {{lastUserInfo.city}}</div>
            <div class="ip" v-else>未知IP</div>
            <div class="people">参与次数：{{lastUserInfo.bettingCount}}人次</div>
            <div class="time">开奖时间：{{lastUserInfo.endTime | formatTime}}</div>
            <div class="award-num">幸运号码：{{code}}</div>
          </div>
        </div>
        <div class="pass" v-if="lastTreasurePassed">
          <p>上期流拍</p>
          <p>夺宝卡已经退回账户</p>
        </div>
    </div>
    <!-- 夺宝结束 -->
    <div class="lottery-end" v-if="!isAwards && status == 1">
      <div class="title">
        <span>本期夺宝</span>
        <i>至少开奖{{details.limitTotalAmount || 0}}次</i>
      </div>
      <!-- 中奖 -->
      <div class="me" v-if="isMe">
        <div class="avatar">
            <img v-if="lastUserInfo.head_img" :src="lastUserInfo.head_img | filter" alt="">
            <img v-else src="https://file.beeplaying.com/cdn/common/images/common/img_photo.png" alt="">
        </div>
        <p>恭喜你成为本期幸运儿</p>
        <p>幸运号码：{{code}}</p>
        <p>奖品{{details.title}}，请到我的奖品查看领取</p>
      </div>
      <!-- 我没有中奖 -->
      <div class="no-me" v-else>
        <div class="avatar">
            <img v-if="lastUserInfo.head_img" :src="lastUserInfo.head_img | filter" alt="">
            <img v-else src="https://file.beeplaying.com/cdn/common/images/common/img_photo.png" alt="">
        </div>
        <div class="text">
          <div class="name">获奖者：{{lastUserInfo.nickName}}</div>
          <div class="ip" v-if="lastUserInfo.ip && lastUserInfo.city">IP：{{lastUserInfo.ip}} {{lastUserInfo.city}}</div>
          <div class="ip" v-else>未知IP</div>
          <div class="people">参与次数：{{lastUserInfo.bettingCount}}次</div>
          <div class="time">开奖时间：{{lastUserInfo.endTime | formatTime}}</div>
          <div class="award-num">幸运号码：{{code}}</div>
        </div>
      </div>
      <div class="buy" :class="{'no-buy': !bettingCodesLength}">
        您已经参与：<span>{{bettingCodesLength}}</span>次
      </div>
      <div class="my-codes" v-if="bettingCodesLength">
        <div class="codes">
          您本期夺宝号码：
          <span v-for="(item, index) in bettingCodes" :key="index">{{item}}、</span>
        </div>
        <div class="btn" @click="openModal">我的夺宝号码</div>
      </div>
    </div>
    <!-- 流拍 -->
    <div class="lottery-pass" v-if="!isAwards && status == 2">
      <div class="title">
        <span>本期夺宝</span>
        <i>至少开奖{{details.limitTotalAmount || 0}}次</i>
      </div>
      <div class="center">
        <img src="../img/lottery-pass.png" alt="">
        <p>本期流拍</p>
      </div>
    </div>
    <!-- 开奖中 -->
    <div class="in-lottery" v-if="isAwards">
      <div class="title">
        <span>本期夺宝</span>
        <i>至少开奖{{details.limitTotalAmount || 0}}次</i>
      </div>
      <div class="center">
        <img src="../img/await-icon.png" alt="">
        <p>正在开奖，请耐心等待...</p>
      </div>
      <div class="buy" :class="{'no-buy': !bettingCodesLength}">
        您已经参与：<span>{{bettingCodesLength}}</span>次
      </div>
      <div class="my-codes" v-if="bettingCodesLength">
        <div class="codes">
          您本期夺宝号码：
          <span v-for="(item, index) in bettingCodes" :key="index">{{item}}、</span>
        </div>
        <div class="btn" @click="openModal">我的夺宝号码</div>
      </div>
    </div>
    <Modal title="本期我的夺宝号码" v-model="showModal" type="2" :closeButtonShow=false @on-save="hide">
      <div class="list">
        <span v-for="(item, index) in bettingCodes" :key="index">{{item}}、</span>
      </div>
    </Modal>
  </div>
</template>
<script>
import _get from 'lodash.get'
export default {
  name: 'provUser',
  props: {
    details: {
      type: Object,
      default: ()=> ({})
    },
    isAwards: {
      type: Boolean,
      default: false
    }
  },
  data: ()=> ({
    showModal: false
  }),
  computed: {
    lastUser() {
      return _get(this.details, 'lastPeriodInfo.lastWinnerInfo', {})
    },
    status() {
      return _get(this.details, 'currentPeriodStatus')
    },
    isMe() {
      return _get(this.details, 'lastPeriodInfo.winnerIsCurrentUser', false)
    },
    bettingCodesLength() {
      return this.bettingCodes.length || 0
    },
    bettingCodes() {
      let bettingCodes = _get(this.details, 'currentUserInfo.bettingCodes', [])
      if(bettingCodes) {
        return bettingCodes
      }else {
        return []
      }
    },
    code() {
      return _get(this.details, 'lastPeriodInfo.lastWinningCode', '')
    },
    lastUserInfo() {
      return _get(this.details, 'lastPeriodInfo.lastWinnerInfo', false)
    },
    lastTreasurePassed() {
      return _get(this.details, 'lastPeriodInfo.lastTreasurePassed', false)
    }
  },
  methods: {
    hide() {
      this.showModal = false
    },
    openModal() {
      this.showModal = true
    },
    goLog() {
      this.$router.push({
        name: 'log', 
        query: {
          from: 'historylog'
        }
      })
      GLOBALS.marchSetsPoint('A_H5PT0202002086', {
        task_id: this.details.currentPeriodStatus,
        task_name: this.details.currentPeriodStatus
      })
    }
  }
}
</script>
<style lang="less" scoped>
.lottery-run{
  margin-top: .2rem;
  padding: 0 .2rem .26rem;
  background: #fff;
  border-radius: .16rem;
  .title{
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: .84rem;
    font-size: .28rem;
    font-weight: bold;
    color: #000;
    .prov-btn {
      font-size: .24rem;
      color: #5186CA;
      font-weight: normal;
    }
  }
  .user {
    padding: .2rem;
    display: flex;
    justify-content: flex-start;
    background: #FFFDEF;
    .avatar {
      margin-right: .17rem;
      width: .8rem;
      height: .8rem;
      img {
        vertical-align: top;
        width: .8rem;
        height: .8rem;
      }
    }
    .text {
      font-size: .24rem;
      color: #888888;
      .name,.ip,.people,.time{
        margin-bottom: .14rem;
      }
      .award-num {
        color: #FF7800;
      }
    }
  }
  .pass {
    padding: .2rem;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    background: #FFFDEF;
    font-size: .24rem;
    color: #888;
    height: 2.1rem;
    p {
      margin-bottom: .15rem;
    }
  }
}
.lottery-pass{
  margin-top: .2rem;
  padding: 0 .2rem .26rem;
  background: #fff;
  border-radius: .16rem;
  .title{
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: .84rem;
    font-size: .28rem;
    font-weight: bold;
    color: #000;
    i {
      font-size: .24rem;
      color: #888888;
      font-weight: normal;
    }
  }
  .center {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    height: 2.22rem;
    background: #FFF2F2;
    img {
      margin-bottom: .1rem;
      width: .51rem;
      height: .51rem;
    }
    p {
      font-size: .24rem;
      color: #000000;
    }
  }
}
.lottery-end {
  margin-top: .2rem;
  padding: 0 .2rem .26rem;
  background: #fff;
  border-radius: .16rem;
  .title{
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: .84rem;
    font-size: .28rem;
    font-weight: bold;
    color: #000;
    i {
      font-size: .24rem;
      color: #888888;
      font-weight: normal;
    }
  }
  .no-me {
    padding: .2rem;
    display: flex;
    justify-content: flex-start;
    background: #FFF2F2;
    .avatar {
      margin-right: .17rem;
      width: .8rem;
      height: .8rem;
      img {
        vertical-align: top;
        width: .8rem;
        height: .8rem;
      }
    }
    .text {
      font-size: .24rem;
      color: #FF4141;
      .name,.ip,.people,.time{
        margin-bottom: .14rem;
      }
    }
  }
  .me {
    padding: .27rem 0 .18rem;
    background: #FFF2F2;
    .avatar {
      margin: 0 auto;
      width: .8rem;
      height: .8rem;
      img {
        vertical-align: top;
        width: .8rem;
        height: .8rem;
      }
    }
    p{
      text-align: center;
      font-size: .24rem;
      color: #FF4141;
      line-height: .36rem;
      &:last-child {
        opacity: .43;
        font-size: .20rem;
      }
    }
  }
  .buy {
    margin: .15rem 0 .12rem;
    color: #888888;
    font-size: .24rem;
    &.no-buy {
      margin: .15rem 0 0;
    }
    span {
      color: #FF4141;
    }
  }
  .my-codes {
    display: flex;
    justify-content: space-between;
    font-size: .24rem;
    color: #888888;
    .codes {
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .btn {
      margin-left: .1rem;
      color: #5186CA;
    }
  }
}
.in-lottery {
  margin-top: .2rem;
  padding: 0 .2rem .26rem;
  background: #fff;
  border-radius: .16rem;
  .title{
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: .84rem;
    font-size: .28rem;
    font-weight: bold;
    color: #000;
    i {
      font-size: .24rem;
      color: #888888;
      font-weight: normal;
    }
  }
  .center {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    height: 2.22rem;
    background: #FFF2F2;
    img {
      width: .39rem;
      height: .42rem;
      animation: rotate infinite 2s;
    }
    p {
      margin-top: .2rem;
      font-size: .24rem;
      color: #000000;
    }
  }
  .buy {
    margin: .15rem 0 .12rem;
    color: #888888;
    font-size: .24rem;
    &.no-buy {
      margin: .15rem 0 0;
    }
    span {
      color: #FF4141;
    }
  }
  .my-codes {
    display: flex;
    justify-content: space-between;
    font-size: .24rem;
    color: #888888;
    .codes {
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .btn {
      margin-left: .1rem;
      color: #5186CA;
    }
  }
}
.list {
  min-height: 1rem;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  span {
    width: 33.3%;
    font-size: .24rem;
    color: #888888;
    line-height: .4rem;
  }
}
@keyframes rotate {
  0%{
    transform: rotate(0deg)
  }
  100% {
    transform: rotate(360deg)
  }
}
</style>