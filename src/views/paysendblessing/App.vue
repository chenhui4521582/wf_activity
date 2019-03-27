<template>
  <div class="pay-send-blessing">
    <blessing-header
      :userInfo="userInfo"
    />
    <div class="body">
      <blessing-ranking />
      <blessing-check-ranking
        :isRanking="isRanking"
        :rankingList="rankingList"
        @hideRankingList="hideComponent"
      />
      <blessing-rule
        :isRule="isRule"
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
	APP_CHANNEL: null
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
      let url = '//ops-api.beeplay123.com/ops/api/goodFortune/details';
      this.axios.post(url,{
		batchId: this.batchId
      },{
        header: {
		  'App-Channel': this.APP_CHANNEL,
		  'Authorization': this.ACCOUNT_TOKEN
        }
      }).then(res => {
        let data = res.data.data;
        this.rankingList = data && data.rankingList || [];
        this.userInfo = {
		  amount: data && data.amount || 0,
		  currentPrize: data && data.currentPrize || '',
		  ranking: data && data.ranking || 0
		}
      })
    },
    getRankingList () {
      // rankinglist  初始化
	  this.isRanking = true
    },
    getLog () {
	  // log  初始化
	  this.isLog = true
    },
	showComponent (data) {
      console.log(data)
      switch (data) {
        case 'ranking' :
          this.getRankingList()
          break;
        case 'log' :
          this.getLog()
          break;
        case 'rule' :
          this.isRule = true
          break
	  }
    },
	hideComponent (data) {
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
	},
  },
  mounted () {
    // console.log(common.getUrlParam('batchId'))
    this.batchId = common.getUrlParam('batchId');
	this.APP_CHANNEL = localStorage.getItem('APP_CHANNEL') ? localStorage.getItem('APP_CHANNEL'):common.getUrlParam('channel')
	this.ACCOUNT_TOKEN = localStorage.getItem('ACCESS_TOKEN') ? localStorage.getItem('ACCESS_TOKEN'):common.getUrlParam('token')
    this.init()
  }
}
</script>

<style scoped type="less">
@import '../../common/css/base.css';
.pay-send-blessing{
  font-family: "Helvetica";
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: url("./images/bg.png") no-repeat center 0 /100% auto #20017D;
}
</style>
