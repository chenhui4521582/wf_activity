<template>
  <div id="app" :class="{aoke:curChannel==100006&&isHasIframe}">
    <!--返回按钮-->
    <div class="back" @click="back"></div>
    <template v-if="detailData&&detailData.showFlag">
      <div class="section0"><span>截止时间：{{detailData.endDateTime}}</span></div>
      <!--签到-->
      <div class="section1" id="section1" v-if="signData&&[2500,5000,10000,25000].includes(signData.count)">
        <img class="title_bg" :src="require(`./images/package/signtab_${signData.count}.png`)">
        <div class="container">
          <ul class="signlist">
            <li v-for="(item,index) in signData.signInfoList">
              <img :src="require(`./images/package/${signData.count/5}.png`)" alt="" v-if="!item.status">
              <img src="./images/package/signed.png" alt="" v-if="item.status">
              <div>第{{index+1}}天</div>
            </li>
          </ul>
          <div class="btn" v-if="!signData.todayStatus" @click="sign(signData.count/5)">立即签到领取</div>
          <div class="btn signed" v-else>今日已经领取{{signData.count/5}}金叶</div>
        </div>
      </div>
      <!--充值加赠-->
      <div class="section2"
           id="section2"
           v-if="packageData&&!packageData.haveBuy&&packageData.list.length"
           :class="{package4:packageData&&packageData.list.length>2}"
      >
        <div class="container">
          <img :src="item.icon|filter" alt="" v-for="item in packageData.list" @click="gotopay(item)">
        </div>
      </div>
      <!--任务-->
      <div class="section3" id="section3" v-if="bonusData&&[35,70,175,340].includes(bonusData.totalAwardsNum)" :class="{hasbtn:bonusData&&bonusData.pointsExchangeTaskVOS&&bonusData.pointsExchangeTaskVOS[0]&&bonusData.pointsExchangeTaskVOS[0].status!=1}">
        <img class="title_bg" :src="require(`./images/package/dailytasktab_${bonusData.totalAwardsNum}.png`)">
        <div class="container">
          <div class="info">
            <span>任务累计积分：{{bonusData.points}}</span>
            <img src="./images/package/rule.png" alt="" @click="showrule">
          </div>
          <div class="bonus">
            <ul>
              <li v-for="(item,index) in bonusData.pointsExchangeTaskVOS">
                <div class="jifen">{{item.points}}积分</div>
                <div class="award_name">{{item.awardsName}}</div>
                <div class="award_status" :class="{gained:item.status==2}" @click="exchange(item,3)" v-if="item.status!=1"></div>
              </li>
            </ul>
            <div class="progress">
              <div class="progress-bar">
                <div class="progress-bar-len"
                     :style="{width:getpercent(bonusData.pointsExchangeTaskVOS,bonusData.points)}"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--更多游戏活动-->
      <div class="section4" id="section4" v-if="gameTasks">
        <div class="tabs">
          <ul>
            <li v-for="(item,index) in gamesArr" :class="{actived:currentGameTask==index}" @click="selectIndex(index)">
              <template v-if="item=='crush-daytask-pionts'">糖果</template>
              <template v-if="item=='bill-daytask-pionts'">桌球</template>
              <template v-if="item=='fish-daytask-pionts'">捕鱼</template>
              <template v-if="item=='marbles-daytask-pionts'">赏金</template>
            </li>
          </ul>
        </div>
        <div class="list">
            <div>
              <div class="game_item" v-for="item in gameTasks[gamesArr[currentGameTask]]">
                <img :src="item.icon|filter" alt="" class="pic">
                <div class="info">
                  <div class="title">{{item.taskName}}</div>
                  <div class="progress">
                    <div class="progressbar">
                      <div class="progress-bar-len" :style="{width:item.finishNum/item.taskOps * 100 + '%'}">
                        <span>{{transUint(item.finishNum,item.taskOps)}}</span>
                      </div>
                    </div>
                    <img src="./images/package/fen.png" alt="" class="fen">
                    <div class="name">{{item.awardsName}}</div>
                  </div>
                </div>
                <div class="btn btn0" v-if="item.taskStatus==0" @click="exchange(item,4)">领取积分</div>
                <div class="btn btn1" v-if="item.taskStatus==1" @click="gotoplay(item)">去完成</div>
                <div class="btn btn2" v-if="item.taskStatus==2">已领取</div>
              </div>
            </div>
        </div>
      </div>
      <!--充值加赠-->
      <div class="section5" id="section5" v-if="packageData&&packageData.haveBuy">
        <div class="container">
          <div class="text" style="font-size: .18rem;font-weight:300;color:rgba(222,201,169,1);">{{packageData.dateRange}}连续登录，分天到账加赠部分</div>
          <img src="./images/package/plusgained.png" alt="">
        </div>
      </div>
    </template>
    <!--以下都是弹窗-->
    <!--规则-->
    <rule v-if="showrulepop" @close="showrulepop=false"></rule>
    <!--奖品弹窗-->
    <award-pop v-if="showAwardPop" :awardsname="awardsname" :type="awardType" @close="closeAwardPop"></award-pop>
  </div>
</template>
<script>
  import '../../common/js/window.js';
  import rule from './components/rule'
  import awardPop from './components/awardPop'
  export default {
    data() {
      return {
        gameTasks: null,
        currentGameTask: 1,
        gamesArr:[],
        awardsname: '',
        showAwardPop: false,
        awardType: 0,//1.签到送叶子 2.加赠送叶子 3.任务积分领红包 4.游戏任务领积分
        detailData: null,//活动信息
        signData:null,//签到数据
        packageData: null,//礼包数据
        bonusData: null,
        curChannel: null,
        curToken: null,
        showrulepop: false
      }
    },
	components: {
	  rule, awardPop
	},
    methods: {
	  /** 请求封装方法 **/
	  fetch(url, params) {
		if (url.startsWith('/ops/api')) {
		  url = '//ops-api.beeplay123.com' + url
		}
		if (url.startsWith('/wap/api') || url.startsWith('/task/api')) {
		  url = '//platform-api.beeplay123.com' + url
		}
		if (url.startsWith('/shop/api')) {
		  url = '//shop-api.beeplay123.com' + url
		}
		return this.axios.post(url, params, {})
	  },
	  /** 获取myDetails数据POST **/
	  async myDetails() {
		try {
		  const res = await this.fetch('/ops/api/activity/points/activityLogin')
		  if (res.data.code == 200 && res.data.data) {
			this.detailData = res.data.data;
			if (this.detailData && this.detailData.showFlag) {
			  let arr = res.data.data.endDateTime.split(' ')
			  this.detailData.endDateTime = parseInt(arr[0].split('-')[1]) + '月' + parseInt(arr[0].split('-')[2]) + '日 ' + arr[1]
			  this.getSignList()//签到数据
			  this.getPackage()//加赠礼包数据
			  this.userPointTask()//活动信息
			  this.getGameTasks(-1)//游戏任务
			}
		  }
		} catch (e) {

		}
	  },
	  /** 获取签到列表**/
	  async getSignList(){
		try {
		  const res = await this.fetch('/ops/api/bigCustomersRecall/list')
		  if (res.data.code == 200 && res.data.data) {
			this.signData = res.data.data
		  }
		} catch (e) {

		}
	  },
	  /** 累计积分兑换话费查询 **/
	  async userPointTask() {
		try {
		  const res = await this.fetch('/ops/api/activity/points/userPointTask')
		  if (res.data.code == 200 && res.data.data) {
			this.bonusData = res.data.data
		  }
		} catch (e) {

		}
	  },
	  /** 签到 **/
	  async sign(num){
		GLOBALS.marchSetsPoint('A_H5PT0074001434')
		try {
		  const res = await this.fetch('/ops/api/bigCustomersRecall/sign')
		  if (res.data.code == 200 && res.data.data) {
			this.awardsname = `${num}金叶子`;
			this.awardType = 1;
			this.showAwardPop = true
			this.getSignList()//刷新签到数据
		  }
		} catch (e) {

		}
	  },
	  /** 获取礼包数据 **/
	  async getPackage() {
		try {
		  const {data: data} = await this.fetch('/shop/api/bigCustomer/bigCustomerRecallProducts')
		  if (data.code == 200) {
			this.packageData = data.data
			if(this.packageData&&this.packageData.haveBuy){
			  const {data:dataA}=await this.fetch('/shop/api/bigCustomer/sendBigCustomerAdditionalRewards')
              console.log(dataA)
			  if(dataA.code==200){
				this.awardType=2;
				let dailyAmount = dataA.data.dailyAmount > 10000 ? parseFloat((dataA.data.dailyAmount / 10000).toFixed(1)) + '万' : dataA.data.dailyAmount;
				let totalAmount = dataA.data.amount > 10000 ? parseFloat((dataA.data.amount / 10000).toFixed(1)) + '万' : dataA.data.amount;
				this.awardsname=`${dataA.data.dateRange};${totalAmount};${dailyAmount}金叶子`
				this.showAwardPop=true;
			  }
			}
		  }
		} catch (e) {
		}
	  },
	  /** 兑换话费 **/
	  async exchange(item,type) {//积分兑换话费
		if(type==3){
		  if (item.status == 2) {
			return
		  }
		  GLOBALS.marchSetsPoint('A_H5PT0074001437',{task_id:item.order,task_name:item.awardsName})
		  try {
			const res = await this.fetch('/ops/api/activity/points/points/exchange',{
			  order:item.order
			})
			if (res.data.code == 200 && res.data.data) {
			  this.awardsname = item.awardsName;
			  this.awardType = type;
			  this.showAwardPop = true
			}
		  } catch (e) {

		  }
		}
		if(type==4){
		  GLOBALS.marchSetsPoint('A_H5PT0074001440',{target_project_id:item.gameType,task_id:item.taskId,task_name:item.taskName})
		  try {
			const res = await this.fetch('/task/api/usertask/finish',{
			  taskId: item.taskId,
			  taskLogId: item.taskLogId
			})
			if (res.data.code == 200 && res.data.data) {
			  this.awardsname = item.awardsName;
			  this.awardType = type;
			  this.showAwardPop = true//领取积分
			  this.getGameTasks(this.awardType)//刷新游戏任务挣积分
			}
		  } catch (e) {
		  }
		}
	  },
	  /** 获取地址栏问号后面的参数值 **/
	  getUrlParam: function (ename) {
		// var url = document.referrer;
		var url = window.location.href;
		var Request = new Object();
		if (url.indexOf("?") != -1) {
		  var str = url.split('?')[1];
		  var strs = str.split("&");
		  for (var i = 0; i < strs.length; i++) {
			Request[strs[i].split("=")[0]] = (strs[i].split("=")[1]);
		  }
		} else {
		  return '';
		}
		return Request[ename];
	  },
      /** 单位转换 **/
      transUint (finishNum, taskOps) {
        let finish = finishNum > 10000 ? parseFloat((finishNum / 10000).toFixed(1)) + '万' : finishNum,
          ops = taskOps > 10000 ? taskOps / 10000 + '万' : taskOps
        return finish + '/' + ops
      },
      /** 去玩游戏 **/
      async gotoplay(item){
        GLOBALS.marchSetsPoint('A_H5PT0074001439',{target_project_id:item.gameType,task_id:item.taskId,task_name:item.taskName})
        await this.fetch('/task/api/usertask/cacheLastGameOfActivity',{value:this.gamesArr[this.currentGameTask]})
        GLOBALS.jumpOutsideGame(item.url)
      },
      /** 关闭奖励弹框 **/
      closeAwardPop(){
        this.showAwardPop=false;
        //1.签到送叶子 2.加赠送叶子 3.任务积分领红包 4.游戏任务领积分
        if(this.awardType==1){

        }else if(this.awardType==2){

        }else if(this.awardType==3){
          this.userPointTask()
        }else{
          this.userPointTask()//刷新积分兑换话费券接口
        }
      },
      /** 游戏切换 **/
      selectIndex(index) {
        GLOBALS.marchSetsPoint('A_H5PT0074001438',{target_project_id:this.gameTasks[this.gamesArr[index]][0]&&this.gameTasks[this.gamesArr[index]][0].gameType})
        this.currentGameTask=index
      },
      /** 去支付 **/
	  gotopay(val) {
		GLOBALS.marchSetsPoint('A_H5PT0074001435', {product_id: val.bizId})
		localStorage.setItem('JDD_PARAM', JSON.stringify(val))
        localStorage.setItem('originDeffer', location.href)
		if (window.linkUrl.getBackUrlFlag(this.curChannel) == 'bdWap' && this.curChannel != '100001') {
		  //好看、全民小视频
      top.location.href = 'https://wap.beeplay123.com/payment/#/bdPayment';
		} else {
		  top.location.href = 'https://wap.beeplay123.com/payment/#/payment';
		}
	  },
      /** 时间转换 **/
      getDateInfo(date) {
        let dateObj = new Date(date);
        let month = dateObj.getMonth() + 1;
        let day = dateObj.getDate();
        return `${month}月${day}日`
      },
      /** 显示规则 **/
      showrule() {
        GLOBALS.marchSetsPoint('A_H5PT0074001436')
        this.showrulepop = true
      },
	  /** 回到首页 **/
	  back() {
		GLOBALS.marchSetsPoint('A_H5PT0074001433')
		top.location.href = window.linkUrl.getBackUrl(this.curChannel)
	  },
      async getGameTasks(index=-1) {
        let {data: data} = await this.fetch('/task/api/usertask/dayTaskByBatch')
        if (data.code == 200) {
          this.gameTasks = data.data;
          if(index<0){
            let {data: dataA} = await this.fetch('/task/api/usertask/cacheLastGameOfActivity',{value:''})
            if(dataA.code == 200){
              if(dataA.data){
                this.gamesArr=[...new Set([dataA.data,...Object.keys(this.gameTasks)])]
                this.currentGameTask=this.gamesArr.indexOf(dataA.data)<0?0:this.gamesArr.indexOf(dataA.data)
              }else{
                this.gamesArr=['crush-daytask-pionts','bill-daytask-pionts','fish-daytask-pionts','marbles-daytask-pionts']
                this.currentGameTask=0
              }
            }
          }
        }
      },
	  getpercent(arr, jifen) {
		if (jifen == 0) {
		  return '0%'
		} else if (jifen < arr[0].points) {
		  return 4.0 * (jifen * 1.0 / arr[0].points) + '%'
		} else if (jifen == arr[0].points) {
		  return '11%'
		} else if (jifen < arr[1].points) {
		  return (11 + 15 * (jifen - arr[0].points) / (arr[1].points - arr[0].points)) + '%'
		} else if (jifen == arr[1].points) {
		  return '33%'
		} else if (jifen < arr[2].points) {
		  return (33.5 + 22 * (jifen - arr[1].points) / (arr[2].points - arr[1].points)) + '%'
		} else if (jifen == arr[2].points) {
		  return '62%'
		} else if (jifen < arr[3].points) {
		  return (62 + 25 * (jifen - arr[2].points) / (arr[3].points - arr[2].points)) + '%'
		} else {
		  return '100%'
		}
	  },
	  getComputedStyle(ele, attr) {
		return window.getComputedStyle(ele, null)[attr]
	  },
    },
	computed: {
	  isHasIframe() {
		return window != window.top
	  }
	},
	async mounted() {
	  GLOBALS.marchSetsPoint('A_H5PT0074001432')
	  this.curChannel = localStorage.getItem('APP_CHANNEL') ? localStorage.getItem('APP_CHANNEL') : this.getUrlParam('channel')
	  this.curToken = localStorage.getItem('ACCESS_TOKEN') ? localStorage.getItem('ACCESS_TOKEN') : this.getUrlParam('token')
	  //活动信息
	  this.myDetails();
	},
  }
</script>
<style lang="less" scoped>
  @import '../../common/css/base.css';

  #app {
    max-height: 23.61rem;
    min-height: 100%;
    background: #26262E;
    font-size: .24rem;
  }

  .aoke {
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    overflow-y: scroll;
  }

  .rule {
    font-size: .24rem;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    text-align: center;
    position: fixed;
    top: .18rem;
    right: .13rem;
    width: 1.08rem;
    height: .44rem;
    line-height: .44rem;
    background: rgba(47, 68, 235, 0.38);
    border-radius: .22rem;
    z-index: 10;
  }

  .back {
    position: fixed;
    top: .05rem;
    width: .51rem;
    height: .43rem;
    background: url("./images/package/back_bg.png");
    background-size: 100% 100%;
    z-index: 10;
  }

  .section0 {
    position: relative;
    width: 7.2rem;
    height: 2.86rem;
    background: url("./images/package/sec_bg.png");
    background-size: 100% 100%;
    span {
      position: absolute;
      top: 1.74rem;
      left: 0;
      right: 0;
      margin: auto;
      font-size: .3rem;
      font-weight: 300;
      color: rgba(222, 201, 169, 1);
      text-align: center;
    }
  }

  .section1 {
    position: relative;
    width: 7.2rem;
    height: 2.8rem;
    margin-bottom: .28rem;
    .title_bg{
      position: absolute;
      left: 0;
      right: 0;
      margin: auto;
      width: 6.09rem;
      height: .37rem;
    }
    .container {
      position: absolute;
      top: .6rem;
      width: 5.2rem;
      bottom: 0;
      left: 0;
      right: 0;
      margin: auto;
      .signlist {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 1.2rem;
        margin: auto;
        display: flex;
        justify-content: space-between;
        li {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
          img {
            width: .67rem;
            height: .67rem;
          }
          div {
            font-weight: 400;
            color: rgba(227, 211, 182, 1);
          }
        }
      }
      .btn {
        width: 4.98rem;
        height: 1.04rem;
        line-height: 1.04rem;
        text-align: center;
        background: url("./images/package/sign_btn.png");
        background-size: 100% 100%;
        position: absolute;
        bottom: 0;
        font-size: .3rem;
        font-weight: bold;
        color: rgba(57, 61, 80, 1);
        &.signed {
          background: url("./images/package/signed_btn.png");
          background-size: 100% 100%;
          color: rgba(57, 61, 80, 1);
        }
      }
    }
  }

  .section2 {
    position: relative;
    height: 4rem;
    &.package4{
      height: 6.52rem;
      margin-bottom: .28rem;
    }
    &:before {
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      margin: auto;
      width: 6.09rem;
      height: .66rem;
      background: url("./images/package/chongzhitips.png");
      background-size: 100% 100%;
    }
    .container {
      position: absolute;
      top: .82rem;
      bottom: 0;
      left: 1rem;
      right: 1.04rem;
      display: flex;
      flex-shrink: 0;
      flex-wrap: wrap;
      justify-content: space-between;
      img {
        width: 2.52rem;
        height: 2.81rem;
        margin-bottom: .1rem;
      }
    }
  }

  .section3 {
    position: relative;
    height: 2.75rem;
    &.hasbtn{
      height: 3rem;
      padding-bottom: .37rem;
    }
    .title_bg {
      position: absolute;
      left: 0;
      right: 0;
      margin: auto;
      width: 6.09rem;
      height: .36rem;
    }
    .container {
      position: relative;
      top: .63rem;
      bottom: 0;
      left: .53rem;
      width: 6.1rem;
      .info {
        height: .32rem;
        font-size: .28rem;
        font-weight: bold;
        color: rgba(227, 211, 182, 1);
        display: flex;
        align-items: center;
        img {
          margin-left: .23rem;
          width: .34rem;
          height: .32rem;
        }
      }
      .bonus {
        margin-top: .2rem;
        height: 1.85rem;
        position: relative;
        ul {
          display: flex;
          position: absolute;
          z-index: 1;
          li {
            display: flex;
            flex-direction: column;
            color: rgba(227, 211, 182, 1);
            align-items: center;
            position: relative;
            &:before {
              content: '';
              position: absolute;
              width: .39rem;
              height: .45rem;
              background: url("./images/package/bonus1.png");
              background-size: 100% 100%;
              top: .5rem;
            }
            &:nth-child(1) {
              margin-right: .38rem;
            }
            &:nth-child(2) {
              margin-right: .73rem;
            }
            &:nth-child(3) {
              margin-right: 1.03rem;
            }
            .jifen {
              font-size: .18rem;
              width: .99rem;
              height: .38rem;
              line-height: .35rem;
              text-align: center;
              background: url("./images/package/jifeninfo.png");
              background-size: 100% 100%;
              margin-bottom: .7rem;
            }
            .award_name {
              font-size: .2rem;
              font-weight: bold;
            }
            .award_status {
              margin-top: .13rem;
              width: .96rem;
              height: .52rem;
              background: url("./images/package/bonus_btn.png");
              background-size: 100% 100%;
              &.gained {
                margin-top: .18rem;
                width: .96rem;
                height: .4rem;
                background: url("./images/package/bonus_gain_btn.png");
                background-size: 100% 100%;
              }
            }
          }
        }
        .progress {
          position: absolute;
          top: .5rem;
          height: .45rem;
          left: 0;
          right: 0;
          display: flex;
          align-items: center;
          .progress-bar {
            height: .1rem;
            background: rgba(58, 64, 96, 1);
            border-radius: .05rem;
            width: 100%;
            position: relative;
            .progress-bar-len {
              height: 100%;
              background: rgba(209, 171, 142, 1);
              border-radius: .05rem;
            }
          }
        }
      }
    }
  }

  .section4 {
    position: relative;
    height: 6.6rem;
    padding-bottom: .28rem;
    .tabs {
      position: absolute;
      left: 0;
      right: 0;
      margin: auto;
      width: 6.11rem;
      height: .6rem;
      line-height: .6rem;
      background: rgba(57, 61, 80, 1);
      border: 1px solid rgba(222, 201, 170, 1);
      border-radius: .1rem;
      font-weight: bold;
      color: rgba(222, 201, 170, 1);
      ul {
        display: flex;
        li {
          flex: 1;
          text-align: center;
          &.actived {
            background: rgba(95, 101, 137, 1);
            border-radius: .1rem;
          }
        }
      }
    }
    .list {
      position: absolute;
      top: .8rem;
      width: 6.09rem;
      height: 5.8rem;
      left: 0;
      right: 0;
      margin: auto;
      .game_item {
        width: 6.09rem;
        height: 1.3rem;
        background: url("./images/package/game_bg.png");
        background-size: 100% 100%;
        margin-bottom: .2rem;
        padding: .2rem;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        align-items: center;
        &:last-child {
          margin-bottom: 0;
        }
        .pic {
          width: .88rem;
          height: .9rem;
        }
        .info {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: .73rem;
          .title {
            font-size: .26rem;
            font-weight: bold;
            color: rgba(239, 239, 239, 1);
          }
          .progress {
            display: flex;
            align-items: center;
            font-size: .24rem;
            font-weight: bold;
            color: rgba(241, 227, 215, 1);
            .progressbar {
              width: 2rem;
              height: .3rem;
              background: rgba(17, 25, 53, 1);
              border-radius: .08rem;
              .progress-bar-len {
                height: 100%;
                background: rgba(209, 171, 142, 1);
                border-radius: .08rem;
                position: relative;
                span{
                  position: absolute;
                  height: 100%;
                  line-height: .3rem;
                  text-align: center;
                  width: 2rem;
                  font-size:.22rem;
                  font-weight:500;
                  color:rgba(255,255,255,1);
                }
              }
            }
            img {
              margin-left: .13rem;
              margin-right: .07rem;
              width: .34rem;
              height: .34rem;
            }
          }
        }
        .btn {
          width: 1.2rem;
          text-align: center;
          height: .46rem;
          line-height: .46rem;
          font-weight: bold;
          color: rgba(42, 48, 68, 1);
          background: url("./images/package/gainjifen.png");
          background-size: 100% 100%;
          &.btn1{
            background: url("./images/package/goplay.png");
            background-size: 100% 100%;
          }
          &.btn2{
            background: url("./images/package/gained.png");
            background-size: 100% 100%;
          }
        }
      }
    }
  }

  .section5 {
    position: relative;
    height: 3.59rem;
    padding-bottom: .94rem;
    &:before {
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      margin: auto;
      width: 6.09rem;
      height: .66rem;
      background: url("./images/package/chongzhitips.png");
      background-size: 100% 100%;
    }
    .container {
      position: absolute;
      top: .47rem;
      bottom: 0;
      left: 1rem;
      right: 1.04rem;
      display: flex;
      flex-shrink: 0;
      flex-wrap: wrap;
      justify-content: center;
      background: #26262E;
      img {
        width: 2.47rem;
        height: 2.42rem;
      }
    }
  }
</style>
