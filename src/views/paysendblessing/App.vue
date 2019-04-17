<template>
  <div class="pay-send-blessing" :class="{'no-scroll': noMove}">
    <blessing-header
      :userInfo="userInfo"
    />
    <div class="body">
        <img src="./images/new/fq-text.png" alt="" class="fq-text">
      <div class="time">活动时间：{{beforeTime | timeFormat('y-m-d')}} - {{endTime | timeFormat('y-m-d')}}</div>
      <blessing-ranking
        :rankingList="rankingList"
        @handleClick="showComponent"
      />
      <blessing-check-ranking
        :isRanking="isRanking"
        :rankingList="rankingList"
        @hideRankingList="hideComponent"
      />
      <blessing-rule
        :isRule="isRule"
        :beforeTime="beforeTime"
        :endTime="endTime"
        @hideRule="hideComponent"
      />
      <blessing-log
        :isLog="isLog"
        :logList="logList"
        @hideLog="hideComponent"
      />
    </div>
    <blessing-btn
      @handleClick="showComponent"
    />
  </div>
</template>

<script>
import common from '@/common/js/utils'
export default {
  name: 'paySendBlessings',
  data: () => ({
    isRanking: false,
	isRule: false,
	isLog: false,
    rankingList: [],
    userInfo: {},
	logList: [],
    bachId: null,
    ACCOUNT_TOKEN: null,
	APP_CHANNEL: null,
    beforeTime: '',
    endTime: '',
	noMove: false
  }),
  components: {
	blessingHeader: () => import('./component/blessingHeader'),
	blessingRanking: () => import('./component/blessingRanking'),
	blessingCheckRanking: () => import('./component/blessingCheckRanking'),
	blessingBtn: () => import('./component/blessingBtn'),
	blessingRule: () => import('./component/blessingRule'),
	blessingLog: () => import('./component/blessingLog'),
  },
  methods: {
    init () {
      this.getRankingList()
      this.getBlessingNum()
      //H5平台-充值送福气-页面  埋点
	  GLOBALS.marchSetsPoint('A_H5PT0074000678','A_H5PT0074000678')
    },
    getRankingList () {
	  let url = '//ops-api.beeplay123.com/ops/api/goodFortune/details';
	  this.axios.post(url, {
		batchId: this.batchId
	  }, {
		header: {
		  'App-Channel': this.APP_CHANNEL,
		  'Authorization': this.ACCOUNT_TOKEN
		}
	  }).then(res => {
	    let { code = '' } = res.data;
	    if (code == 200) {
		  let { data = {} } = res.data;
		  this.rankingList = data && data.rankingList || [];
		  this.userInfo = {
			amount: data && data.amount || 0,
			currentPrize: data && data.currentPrize || '暂无奖励',
			ranking: data && data.ranking || '暂未上榜'
		  }
		  this.beforeTime = data && data.beginTime,
		  this.endTime = data && data.endTime
        }
	  })

    },
    getLog () {
	  let url = '//ops-api.beeplay123.com/ops/api/goodFortune/history';
	  this.axios.post(url, {
		header: {
		  'App-Channel': this.APP_CHANNEL,
		  'Authorization': this.ACCOUNT_TOKEN
		}
	  }).then(res => {
		let { code = '' } = res.data;
		if ( code == 200 ) {
		  let { data = [] } = res.data;
		  this.logList = (data && data.length) && data || [];
		  this.isLog = true
		}
	  })
    },
	getBlessingNum () {
	  let isPaySendBlessingSuccess = localStorage.getItem('paySendBlessingSuccess');
	  if(!isPaySendBlessingSuccess || isPaySendBlessingSuccess == 'error')  return false
	  let url = '//ops-api.beeplay123.com/ops/api/goodFortune/latestBonus';
	  this.axios.post(url, {
		header: {
		  'App-Channel': this.APP_CHANNEL,
		  'Authorization': this.ACCOUNT_TOKEN
		}
	  }).then(res => {
		let { code = '' } = res.data;
		if ( code == 200 ) {
		  this.$toast.show({
			message: `恭喜您获得${res.data.data.amount}福气值`,
			duration: 3000
		  })
		  localStorage.setItem('paySendBlessingSuccess','error')
		}
	  })
	},
	showComponent (data) {
      this.noMove = true
      switch (data) {
        case 'ranking' :
          this.getRankingList()
		  this.isRanking = true
          break;
        case 'log' :
          this.getLog()
          break;
        case 'rule' :
          this.isRule = true
          break
		case 'back' :
		  window.history.back(-1);
		  break;
		case 'pay' :
		  window.location.href = 'https://wap.beeplay123.com/payment/#/mall'
		  break;
	  }
    },
	hideComponent (data) {
	  this.noMove = false
	  switch (data) {
		case 'ranking' :
		  this.isRanking = false
		  break;
		case 'log' :
		  this.isLog = false
		  break;
		case 'rule' :
		  this.isRule = false
		  break;
	  }
	}
  },
  mounted () {
    this.batchId = common.getUrlParam('batchId');
	this.APP_CHANNEL = localStorage.getItem('APP_CHANNEL') ? localStorage.getItem('APP_CHANNEL'):common.getUrlParam('channel')
	this.ACCOUNT_TOKEN = localStorage.getItem('ACCESS_TOKEN') ? localStorage.getItem('ACCESS_TOKEN'):common.getUrlParam('token')
    this.init()
  }
}
</script>

<style scoped type="less">
@import '../../common/css/base.css';
</style>

<style lang="less" scoped>
.pay-send-blessing {
  min-height: 100vh;
  font-family: "Helvetica";
  background: url("./images/new/bg.png") no-repeat center top / 100% auto #20017D;
    /*padding-bottom:0.85rem;*/
  &.no-scroll {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
  }
    .fq-text{
        width:4.7rem;
        height:2.05rem;
        position: absolute;
        left:50%;
        top:1.3rem;
        margin-left:-2.35rem;
    }
  .body {
    overflow: hidden;
    .time {
      margin: 0.5rem auto 2.48rem;
      width: 4.21rem;
      height: .5rem;
      text-align: center;
      line-height: .5rem;
      color: #fff;
        border-radius:.25rem;
        background:linear-gradient(0,rgba(53, 150, 240, 0.68),rgba(138, 28, 184, 0.68));
        position: relative;
        top:2.1rem;
    }
  }
}
</style>
