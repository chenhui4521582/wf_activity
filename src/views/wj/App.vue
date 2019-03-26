<template>
  <div id="app">
    <div class="wf-container">
      <div class="wf-pop" id="wf-pop">
        <div class="header">
          <div class="h-tx">
            <img :src="userInfo.head | filter" class="pic-tx pull-fl" v-if="userInfo&&userInfo.head"/>
            <img src="./images/img_photo.png" class="pic-tx pull-fl" v-else/>
            <div class="tx-box pull-fl" id="tx-box">
              <img src="./images/icon-leaf.png" class="pic-leaf" />
              <div class="leaf-num">{{userInfo&&userInfo.amount}}</div>
            </div>
          </div>
          <div class="wf-back" v-if="!isHideMenu" @click.stop="goMenu">
            <img src="./images/icon-home.png" alt="" class="icon-home" />游戏大厅
          </div>
        </div>
        <img src="./images/fighur.png" class="fighur" v-show="isFighur">
        <div class="n-tab">
          <ul>
            <li :class="curIndex==0 ? 'active':'' " @click="tabNav(0)">
              <img class="icon" src="./images/new/icon-rw-light.png" v-if="curIndex==0">
              <img class="icon" src="./images/new/icon-rw.png" v-else>
              <img src="./images/h5game-fuli.png" class="h5game-fuli" v-if="isDayTaskRed">
            </li>
            <li :class="curIndex==1 ? 'active':'' " @click="tabNav(1)">
              <img class="icon" src="./images/new/icon-lb-light.png" v-if="curIndex==1">
              <img class="icon" src="./images/new/icon-lb.png" v-else>
              <img src="./images/h5game-fuli.png" class="h5game-fuli" v-if="isCjTaskRed">
            </li>
          </ul>
        </div>
        <div class="groups g-item1" v-if="curIndex == 0">
          <div class="new-user-task" v-if="newTaskItems.isNew">
            <div class="box">
              <div class="bg-lines" :class="{'bg-height':motherTask.hasFinishedNum == motherTask.allTaskNum}">
                <div class="tips">
                  <img src="./img/tips.png" alt="">
                </div>
                <div class="text">
                  <img class="img1" src="./img/title1.png" alt="">
                  <img class="img2" src="./img/time-limit-bg.png" alt="">
                </div>
                <div class="time">
                  <img class="img3" src="./img/clock.png" alt="">
                  <span>{{newTaskItems.countDown | formatTime}}</span>
                </div>
                <div class="middle" >
                  <div class="finish-title" v-if="motherTask.hasFinishedNum != motherTask.allTaskNum">全部完成<i>再得5元话费</i></div>
                  <div class="finish-title" v-else>恭喜！完成了新人任务！</div>
                  <div class="probar-wrap">
                    <div class="probar-ball">
                      <div class="bar" :style="{width: motherTask.hasFinishedNum/motherTask.allTaskNum * 100 + '%' }"></div>
                    </div>
                  </div>
                  <div class="probar-text">
                    <span>{{motherTask.hasFinishedNum}}/{{motherTask.allTaskNum}}</span>
                    <span class="receive">已有{{newTaskItems.receiverCounter}}人领取</span>
                  </div>
                </div>
              </div>
              <ul class="bottom"
                  v-if="motherTask.hasFinishedNum != motherTask.allTaskNum"
                  @click="checkTaskStatus(newUserTaskobj,'new_user_task')
              ">
                <li class="description">
                  <div class="head-img">
                    <img :src="newUserTaskobj.icon | filter" alt="">
                  </div>
                  <div class="content">
                    <p>{{newUserTaskobj.taskName}}</p>
                    <div class="progress">
                      <div class="progress-bg">
                        <div class="progress-bar" :style="{width:newUserTaskobj.finishNum/newUserTaskobj.taskOps * 100 + '%'}"></div>
                        <span>{{transUint(newUserTaskobj.finishNum,newUserTaskobj.taskOps)}}</span>
                      </div>
                      <div class="num">
                        <img :src="newUserTaskobj.awardsImage | filter" alt="">
                        <span>{{newUserTaskobj.awardsName}}</span>
                      </div>
                    </div>
                  </div>
                </li>
                <li class="btn" v-if="newUserTaskobj.taskStatus == 0">领取</li>
                <li class="btn play" v-if="newUserTaskobj.taskStatus == 1">去完成</li>
                <span class="label">任务{{motherTask.hasFinishedNum + 1}}</span>
              </ul>
              <ul class="finish" v-else @click="receive(motherTask,'mother_task')">
                <li>
                  <div class="head-img">
                    <img src="./img/signIn-icon.png" alt="">
                  </div>
                  <div class="content">
                    <p>快领取话费奖励吧</p>
                    <p>{{motherTask.awardsName}}</p>
                  </div>
                </li>
                <li>领取</li>
              </ul>
              <poplog
                  v-if="isPopLog"
                  :awardItem="awardItem"
                  :motherTask="motherTask"
                  :masterTask="masterTask"
                  :newUserTaskFinish="newUserTaskFinish"
                  @close="closePopLog"
              >
              </poplog>
            </div>
          </div>
          <div v-else>
            <div  v-if="cjTaskItems&&cjTaskItems.length || dayTaskItems&&dayTaskItems.length">
              <h4 class="groups-title" v-if="cjTaskItems&&cjTaskItems.length">成就任务</h4>
              <ul class="task-list task-list-margin" v-if="cjTaskItems&&cjTaskItems.length">
                <li v-for="item in cjTaskItems" >
                  <div class="description">
                    <div class="head-img">
                      <img :src="item.icon | filter" alt="">
                    </div>
                    <div class="content">
                      <p v-html="item.taskDescShow"></p>
                      <div class="progress">
                        <div class="progress-bg">
                          <div class="progress-bar" :style="{width:item.finishNum/item.taskOps * 100 + '%'}"></div>
                          <span>{{transUint(item.finishNum,item.taskOps)}}</span>
                        </div>
                        <div class="num">
                          <img :src="item.awardsImage | filter" alt="">
                          <span>{{item.awardsName}}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="btn" v-if="item.taskStatus == 0" @click="receive(item,'dayTask')">领取</div>
                  <div class="btn play" v-if="item.taskStatus == 1" @click="goFinish(item)">去完成</div>
                  <div class="btn received" v-if="item.taskStatus == 2" >
                    已完成
                  </div>
                </li>
                <p class="cj-text-ys">温馨提示：成就任务的进度可能会受网络影响，会有几分钟的延迟。</p>
              </ul>

              <h4 class="groups-title" v-if="dayTaskItems&&dayTaskItems.length">每日任务</h4>
              <ul class="task-list" v-if="dayTaskItems&&dayTaskItems.length">
                <li v-for="item in dayTaskItems" >
                  <div class="description">
                    <div class="head-img">
                      <img :src="item.icon | filter" alt="">
                    </div>
                    <div class="content">
                      <p v-html="item.taskDescShow"></p>
                      <div class="progress">
                        <div class="progress-bg">
                          <div class="progress-bar" :style="{width:item.finishNum/item.taskOps * 100 + '%'}"></div>
                          <span>{{transUint(item.finishNum,item.taskOps)}}</span>
                        </div>
                        <div class="num">
                          <img :src="item.awardsImage | filter" alt="">
                          <span>{{item.awardsName}}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="btn" v-if="item.taskStatus == 0" @click="receive(item,'dayTask')">领取</div>
                  <div class="btn play" v-if="item.taskStatus == 1" @click="goFinish(item)">去完成</div>
                  <div class="btn received" v-if="item.taskStatus == 2" >
                    已完成
                  </div>
                </li>
              </ul>
            </div>
            <div class="nodata-box" v-else>
              <img src="./images/nodata.png" class="nodata">
              <p>暂无数据~</p>
            </div>
          </div>
        </div>
        <div class="groups g-item1" v-if="curIndex == 1">
          <div>
            <div class="wf-title">
              <a href="javascript:" class="pull-fr btn-useage" id="btn-useage" @click="handleTabUse">使用方法<em class="icon-ys" :class="isTabUse ? 'icon-sl':'icon-xl' "></em></a>
            </div>
            <div class="useage-methods" :class="isTabUse ? 'useage-tips':'' ">
              <span>复制礼包兑换码，在相应的游戏中找到兑换区域，输入兑换码,即可获得相应道具。</span>
            </div>
            <ul id="sUl" v-if="cdkArr && cdkArr.length">
              <li v-for="item in cdkArr">
                <div v-if="item.IF_GET">
                  <h4 class="g-title">{{item.gameCdkeyRsp.name}}</h4>
                  <p class="g-text">{{item.gameCdkeyRsp.description}}</p>
                  <div class="g-exchange">
                    <span>兑换码：<i>{{item.gameCdkeyRsp.cdKey}}</i></span>
                    <a href="javascript:" class="btn-fz"
                      v-clipboard:copy=item.gameCdkeyRsp.cdKey
                      v-clipboard:success="onCopy"
                      v-clipboard:error="onError"
                    >复制兑换码</a>
                  </div>
                </div>
                <div v-else>
                  <h4 class="g-title">{{item.gameCdkeyRsp.name}}
                    <a href="javascript:" class="btn-normal btn-lq btnLQ" @click="getAward(item)" v-if="item.gameCdkeyRsp.remainNum*100 > 0">免费领取</a>
                    <a href="javascript:" class="btn-normal btn-gq btnLQ" v-else>已领完</a>
                  </h4>
                  <p class="g-text">{{item.gameCdkeyRsp.description}}</p>
                  <div class="g-percent">
                    <div class="g-percent-bg" :style="{width: item.gameCdkeyRsp.remainNum*100+'%'}">{{item.gameCdkeyRsp.remainNum*100}}%剩余</div>
                  </div>
                </div>
              </li>
            </ul>
            <div class="nodata-box" v-else>
              <img src="./images/nodata.png" class="nodata">
              <p>礼包正在路上，下次再来看看吧~</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import '../../common/js/window'
import poplog from './poplog'
import common from "../../common/js/utils";
import base64url from 'base64-url';
export default {
  data() {
      return {
        userInfo: null,
        cdkArr: null,
        isTabUse: false,
        curlink: null,
        hideBackArr: ['100037','100033001'],
        curChannel: null,
        curToken: null,
        curIndex: 0,
        dayTaskItems: null,
        cjTaskItems: null,
        gameType: null,
        isFighur: false,
        timer1: null,
        cGameType: null,
        sdkBdWap: ['100039','100040','100041','100042','100045','100046',
            '100001','100022','100023','100026','100028','100027','100029','100035','100036','100038', '100006'],
		newTaskItems: false,
		awardItem: null,
		isNewTask: null,
		newUserTaskFinish: false,
		isPopLog: false,
		masterTask : false
      }
  },
  mounted() {
    this.curChannel = localStorage.getItem('APP_CHANNEL') ? localStorage.getItem('APP_CHANNEL'):this.getUrlParam('channel')
    this.curToken = localStorage.getItem('ACCESS_TOKEN') ? localStorage.getItem('ACCESS_TOKEN'):this.getUrlParam('token')
    this.cGameType = this.getUrlParam('gameType') || ''
    let cururl = window.location.href
    this.curlink = this.getUrlParam('wf_cur_link')
    if(this.curChannel && this.curChannel.indexOf('100') != -1) {
      this.getUserInfo()
      this.getCdkeyStatus()
      this.getDayTask()
      this.getPlatTaskByBatch()
      this.getNewTask()
    }
  },
  components: {
	poplog
  },
  computed: {
    isHideMenu() {
      return this.hideBackArr.includes(this.curChannel)
    },
    isDayTaskRed() {
      let newArr = []
      if(this.dayTaskItems && this.cjTaskItems) {
        newArr = newArr.concat(this.dayTaskItems).concat(this.cjTaskItems)
      }
      return newArr && newArr.filter((item)=> {
        return item.taskStatus == 0
      }).length
    },
    isCjTaskRed() {
      return this.cdkArr && this.cdkArr.filter((item)=> {
        return item.gameCdkeyRsp.remainNum*100 > 0
      }).length
    },
	motherTask () {
	  let list = this.newTaskItems && this.newTaskItems.taskList || []
	  let motherTask = list.filter(item=>{
		return item.subTask
	  })[0]
	  list = list.filter(item => {
		return !item.subTask
	  })
	  let finishedTaskNum = list.filter(item=>{
		return item.taskStatus == 2
	  }).length
	  if(motherTask) {
		motherTask.allTaskNum = list.length
		motherTask.hasFinishedNum = finishedTaskNum
		return motherTask
	  }
	  return ''
	},
	newUserTaskobj () {
	  let list = this.newTaskItems && this.newTaskItems.taskList || []
	  let taskObj = null
	  list = list.filter(item => { // 刷选出子任务
		return !item.subTask
	  })
	  // 找到当前需要展示的任务，第一个taskStatus不为2的任务
	  for(let i=0; i<list.length; i++){
		if(list[i].taskStatus != 2){  // taskStatus: 0-带领取 1-未完成 2-已领取
		  taskObj = list[i]
		  break
		}
	  }
	  return taskObj
	}
  },
  methods: {
    receive(item) {
        this.axios.post('//platform-api.beeplay123.com/task/api/usertask/finish', {
          taskId: item.taskId,
          taskLogId: item.taskLogId
        },{
            headers: {
                'App-Channel': this.curChannel,
                'Authorization': this.curToken
            }
        }).then((res)=> {
          if(res.data.code == 200) {
            this.$toast.show({
              message: '领取成功！',
              duration: 1500
            });
            item.taskStatus = 2;
            this.getPlatTaskByBatch()
            this.getDayTask()
          }
        })
    },
    goFinish({gameType, url, action, taskId},type) {
      let actionsArr = [39,35,34,32]
      // 跳转到首页（关闭）
      if(action == 36 || url == '/plat/') {
          parent.location.href = this.jumpToPlat()
          return
      }
      // 跳转商城
      if (gameType == 0 && actionsArr.includes(action)) {
          parent.location.href = 'https://wap.beeplay123.com/payment/#/mall'
          return
      }
      // 跳平台(关闭)
      if (gameType == 0 && action == 2) {
          parent.location.href = this.jumpToPlat()
          return
      }
      // 跳转固定入口
      if(url && url.indexOf('?fixedEntry') != -1) {
          let url1 = this.trimStr(url.replace('?fixedEntry','')) + '?channel=' + this.curChannel + '&token=' + this.curToken;
          parent.location.href = url1;
          return;
      }

      clearTimeout(this.timer1)
      this.isFighur = true
      this.timer1 = setTimeout(() => {
        this.isFighur = false
      }, 3000)

	  //其他外接游戏external=1
	  if (url && url.indexOf('external=1') != -1) {
		let gameUrl = this.trimStr(url) + '&channel=' + this.channel + '&token=' + this.token + '&gurl=' + url.split('?')[0] + '&pf=bdWap';
		return parent.location.href = gameUrl
	  }
	  parent.location.href = 'https://wap.beeplay123.com' + url + '?channel=' + this.channel + '&token=' + this.token;

    },
    trimStr:function(str) {
        return str.replace(/(^\s*)|(\s*$)/g, '')
    },
    jumpToGameUrl:function (item) {
        if (item && item.url.indexOf('external=1') != -1) {
            if (item.url.includes('?external=1')) {
                    return this.trimStr(item.url) +
                    '&channel=' +
                    this.curChannel +
                    '&token=' + this.curToken +
                    '&gurl=' +
                    item.url.split('?')[0] +
                    '&pf=wap'
            } else {
                return this.trimStr(item.url) +
                    '&channel=' +
                    this.curChannel +
                    '&token=' + this.curToken +
                    '&gurl=' +
                    base64url.encode(item.url.replace('?external=1', '').replace('&external=1', '')) +
                    '&pf=wap'
            }
            return
        }
        if (item && item.url.indexOf('databiger-h5') != -1) {
            return this.trimStr(item.url) +
                '?channel=' +
                this.curChannel +
                '&token=' + this.curToken
        }
        return item.url +
                '?channel=' +
                this.curChannel +
                '&token=' + this.curToken
    },
    jumpToPlat(){
        let baiduChannel = ['100039','100040','100041','100042','100045','100046',
                '100001','100022','100023','100026','100028','100027','100029','100035','100036','100038', '100006']
        if(baiduChannel.includes(this.curChannel)){
            return `https://wap.beeplay123.com/bdWap?channel=${this.curChannel}`
        } else if(this.curChannel == '700002'){
            return `https://wap.beeplay123.com/llwWap?channel=700002`
        }else{
           return `https://wap.beeplay123.com/wap/home?channel=${this.curChannel}`
        }
    },
    transUint(finishNum,taskOps){
        let finish = finishNum > 10000 ? (finishNum/10000).toFixed(2) + '万' : finishNum,
            ops = taskOps > 10000 ? taskOps/10000+'万' : taskOps
        return  finish+'/'+ops
    },
    getPlatTaskByBatch() {
      this.axios.post('//platform-api.beeplay123.com/task/api/usertask/platTaskByBatch', {
        value: this.cGameType+"-achievementTask",
        from: "sdk",
        gameType: this.cGameType || ''
      },{
            headers: {
                'App-Channel': this.curChannel,
                'Authorization': this.curToken
            }
        }).then((res) => {
        this.cjTaskItems = res.data.data
      })
    },
    getDayTask() {
      this.axios.post('//platform-api.beeplay123.com/task/api/usertask/platTaskByBatch', {
        value: this.cGameType+"-dayTask",
        from: "sdk",
        gameType: this.cGameType || ''
      },{
            headers: {
                'App-Channel': this.curChannel,
                'Authorization': this.curToken
            }
        }).then((res) => {
        this.dayTaskItems = res.data.data
      })
    },
    tabNav(idx) {
      this.curIndex = idx
    },
    //获取地址栏问号后面的参数值
    getUrlParam: function (ename) {
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
    goMenu() {
      localStorage.removeItem('gurlSDK')
      if(this.sdkBdWap.includes(this.curChannel)){
        top.location.href = 'https://wap.beeplay123.com/bdWap?channel='+this.curChannel
      }else {
        top.location.href = 'https://wap.beeplay123.com/wap/home?channel='+this.curChannel
      }
    },
    onCopy() {
      this.$toast.show({
        message: '复制成功！',
        duration: 1500
      });
    },
    onError() {
      this.$toast.show({
        message: '复制失败！',
        duration: 1500
      });
    },
    getAward(item) {
      this.axios.post('//ops-api.beeplay123.com/ops/api/cdkey/getAwards', {
        value: item.gameCdkeyRsp.batchId
      },{
            headers: {
                'App-Channel': this.curChannel,
                'Authorization': this.curToken
            }
        }).then((res)=> {
        if(res.data.code == 200) {
          this.$toast.show({
            message: '领取成功',
            duration: 1500
          })
          this.getCdkeyStatus()
        }
      })
    },
    handleTabUse() {
      this.isTabUse = !this.isTabUse
    },
    getUserInfo() {
      this.axios.post('//uic-api.beeplay123.com/uic/api/user/login/transInfo',{},{
            headers: {
                'App-Channel': this.curChannel,
                'Authorization': this.curToken
            }
        })
        .then((res)=> {
          if(res.data.code == 200) {
            this.userInfo = res.data.data
          }
        })
    },
    getCdkeyStatus() {
      this.axios.post('//ops-api.beeplay123.com/ops/api/cdkey/status', {
        value: this.curlink
      },{
            headers: {
                'App-Channel': this.curChannel,
                'Authorization': this.curToken
            }
        }).then((res)=> {
        if(res.data.code == 200) {
          this.cdkArr = res.data.data
        }
      })
    },
	getNewTask() {
	  this.axios.post('//platform-api.beeplay123.com/task/api/usertask/platNewUserStairTask',
      {
		value: 'NewUserStairTask'
	  },
      {
		headers: {
		  'App-Channel': this.curChannel,
          'Authorization': this.curToken
		}
	  }).then((res)=> {
		if(res.data.code == 200) {
		  this.newTaskItems = res.data.data
		}
		if(parent.LoadTaskFinish) {
		  parent.LoadTaskFinish()
		}
	  })
	},
	checkTaskStatus (item, type, index) {
	  if (item.taskStatus == 0) {
		this.receive(item, type, index)
	  } else if (type == 'day_task' || item.taskStatus == 1) {
		this.goFinish(item, type)
	  }
	},
	receive(item, type,index,medalimg) {
	  if(type == 'crush_task' || type == 'mother_crush_task'){
		item.awardsFlag = type
		item.index = index
		item.medalimg = medalimg
		GLOBALS.buriedPoint(1210040826, 'H5平台-游戏内成就任务页-领取', item.gameType,null,{taskId:item.taskId}) //事件ID 事件名称 游戏ID 游戏位置
	  }else{
		GLOBALS.thirdSetsPoint({
		  "event_name": "游戏内任务-去完成",
		  "task_id": item.taskId,
		  "event_id": 1210040803,
		  "project_id": item.gameType
		})
	  }
	  this.axios.post('//platform-api.beeplay123.com/task/api/usertask/finish', {
		taskId: item.taskId,
		taskLogId: item.taskLogId
      },{
        headers: {
          'App-Channel': this.curChannel,
          'Authorization': this.curToken
        }
      }).then((res)=> {
		if(res.data.code == 101) {
		  this.awardItem = item
		  switch(type) {
			case 'mother_task':
			  this.newUserTaskFinish = true
			  break;
			default:
			  item.taskStatus = 2
		  }
		  this.isPopLog = true
		}else{
		  this.$toast.show({
			message: res.data.message,
			duration: 1500
		  })
		}
	  })
	},
	goFinish({gameType, url, action, taskId},type) {
	  let actionsArr = [39,35,34,32]
	  GLOBALS.thirdSetsPoint({
		"event_name": "游戏内任务-去完成",
		"task_id": taskId,
		"event_id": 1210040803,
		"project_id": this.currentGameType,//当前游戏ID
		"target_project_id" : gameType//跳转到的游戏ID
	  })

	  setTimeout(() => {

		// 跳转到首页（关闭）
		if(action == 36 || url == '/plat/') {
		  parent.location.href = this.jumpToPlat()
		  return
		}
		// 跳转商城
		if (gameType == 0 && actionsArr.includes(action)) {
		  parent.location.href = 'https://wap.beeplay123.com/payment/#/mall'
		  return
		}
		// 跳平台(关闭)
		if (gameType == 0 && action == 2) {
		  parent.location.href = this.jumpToPlat()
		  return
		}
		// 跳转固定入口
		if(url && url.indexOf('?fixedEntry') != -1) {
		  let url1 = this.trimStr(url.replace('?fixedEntry','')) + '?channel=' + this.channel + '&token=' + this.token;
		  parent.location.href = url1;
		  return;
		}

		parent.location.href=common.jumpToGameUrl({url:url})
	  }, 500)

	},
	goTask () {
	  let baiduChannel = ['100039','100040','100041','100042','100045','100046',
		'100001','100022','100023','100026','100028','100027','100029','100035','100036','100038', '100006']
	  if(baiduChannel.includes(this.channel)){
		parent.location.href = `https://wap.beeplay123.com/bdWap/#/taskview?channel=${this.channel}`
	  } else if(this.channel == '700002'){
		parent.location.href = `https://wap.beeplay123.com/llwWap/#/taskview?channel=700002`
	  }else{
		parent.location.href = `https://wap.beeplay123.com/wap/home/#/taskview?channel=${this.channel}`
	  }
	},
	closePopLog(val) {
	  this.isPopLog = false
	  this.getNewTask()
      if(val){
        this.goTask()
      }
	}
  },
  filters:{
	formatTime (time) {
	  let days = time / 1000 / 3600 / 24
	  let day = Math.floor(days)
	  let hours = Math.ceil((days-day) * 24)
	  return `仅剩${day}天${hours}小时`
	}
  }
}

</script>
<style lang="less" scoped>
@import '../../common/css/base.css';
@import './wj.less';
.fighur {
  width: 0.87rem;
  position: fixed;
  left: 0;
  top: 50%;
  margin-top: -0.32rem;
  z-index: 100;
  animation: touch .6s ease-in-out alternate infinite;
}
@keyframes touch {
    0%{
        transform : translateX(.2rem) 
    }
    100%{
        transform : translateX(0) 
    }
}
.ball {
  width: 1.0rem;
  height: 1.0rem;
  background: #ccc;
  border-radius: 50%;
}

.wf-container {
  width: 100%;
  height: 100%;
  background: #eee;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  overflow-x: hidden;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
}

a {
  text-decoration: none;
  color: #fff;
}

img {
  border: none;
}

.useage-methods {
  width: 91%;
  font-size: .24rem;
  color: #CCDDFF;
  margin: 0 auto;
  box-sizing: border-box;
  line-height: .35rem;
  &.useage-tips {
    height: 0;
    overflow: hidden;  
  }
  
}

.useage-methods span {
  display: block;
  background: #1F2A4D;
  padding: .15rem .5rem .15rem .29rem;
  margin-bottom: .4rem;
}

.g-exchange {
  display: flex;
  justify-content: space-between;
  font-size: 0.24rem;
}
.g-exchange span {
  display: inline-block;
  max-width: 3.0rem;
  word-break:keep-all;
  white-space:nowrap;
  overflow:hidden;
  text-overflow:ellipsis; 
}
.g-exchange a {
  color: #FF9933;
}

.g-exchange i {
  font-style: normal;
  font-size: 0.22rem;
}

.wf-pop {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  overflow: hidden;
  background: #0F1B33;
  transition: right .2s;
}

.wf-pop .header {
  height: 1.08rem;
  background: linear-gradient(0deg, #132641, #183E68);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 0.3rem;
}

.pull-fl {
  float: left;
}

.pull-fr {
  float: right;
}

.wf-pop .h-tx {}

.wf-pop .h-tx .pic-tx {
  width: .48rem;
  height: .48rem;
  margin-right: 0.1rem;
}

.wf-pop .h-tx .tx-box {
  width: 2.16rem;
  height: .54rem;
  background: url(./images/leaf-bg.png) no-repeat;
  background-size: 100% 100%;
  display: flex;
  align-items: center;
}

.wf-pop .h-tx .pic-leaf {
  width: .20rem;
  height: .20rem;
  margin: 0 .07rem 0 .13rem;
}

.wf-pop .icon-add {
  width: .41rem;
  height: .4rem;
}

.wf-pop .leaf-num {
  width: 1.1rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: .22rem;
  color: #FFD997;
}

.wf-pop .wf-back {
  width: 1.36rem;
  height: .54rem;
  background: url(./images/back.png) no-repeat;
  background-size: 100% 100%;
  display: flex;
  align-items: center;
  font-size: .16rem;
  color: #FFD997;
  justify-content: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.wf-pop .wf-back .icon-home {
  width: .38rem;
  height: .38rem;
  margin-right: .03rem;
}

.wf-pop .icon-pac {
  width: .18rem;
  height: .18rem;
}

.wf-pop .wf-title {
  color: #fff;
  height: .45rem;
  position: relative;
  margin: 0 0 .22rem 0;
  display: flex;
  justify-content: center;
}

.wf-pop .wf-title h4 {
  font-size: .34rem;
  display: flex;
  align-items: center;
}

.wf-pop .wf-title .icon-pac {
  width: .41rem;
  height: .38rem;
  margin: 0 .07rem 0 .22rem;
}

.wf-pop .wf-title .btn-useage {
  font-size: .24rem;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
}

.wf-pop .btn-useage .icon-ys {
  display: inline-block;
  width: .18rem;
  height: .18rem;
  margin-left: .08rem;
}

.wf-pop .btn-useage .icon-xl {
  background: url('./images/icon-xl.png') no-repeat;
  background-size: 100% 100%;
}

.wf-pop .btn-useage .icon-sl {
  background: url('./images/icon-sl.png') no-repeat;
  background-size: 100% 100%;
}

.wf-pop .groups {
  width: 100%;
  text-align: left;
  margin-bottom: 0.2rem;
}

.wf-pop .groups li {
  width: 91%;
  background: #1F2A4D;
  color: #fff;
  margin: 0 auto .2rem;
  padding: 0.15rem 0.24rem;
  box-sizing: border-box;
  &:last-child {
    margin: 0 auto;
  };
}

.wf-pop .groups li h4 {
  font-size: .28rem;
}

.wf-pop .groups li a.btn-normal {
  display: block;
  /*width: 1.35rem;*/
  padding: 2% 3%;
  /*height: .45rem;*/
  /*line-height: .45rem;*/
  text-align: center;
  font-size: .22rem;
  font-weight: normal;
  border-radius:0.08rem;
}

.wf-pop .groups li a.btn-lq {
  background:rgba(238,111,11,1);
  background-size: 100% 100%;
}
.wf-pop .groups li a.btn-qwc {
  background: #1976D2;
  background-size: 100% 100%;
}
.wf-pop .groups li a.btn-gq {
  background:rgba(132,139,167,1);
  background-size: 100% 100%;
}



/*&.play{
    background: #1976D2;
}
&.gray{
    background: #fff;
    color: #141F33;
}
&.received{
    position: relative;
    background: #006083;
    color: #fff;
}*/

.h5game-fuli{
  width: 0.5rem;
  position: absolute;
  right: 18%;
  top: 0.05rem;
}

.wf-pop .groups .g-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: .2rem 0 .32rem 0;
}

.wf-pop .groups .g-text {
  font-size: .22rem;
  line-height: 0.35rem;
  color: #CCDDFF;
  margin-bottom: .1rem;
}

.wf-pop .groups .g-percent {
  height: .22rem;
  background: #0F1B33;
  border-radius: .1rem;
  margin-top: .23rem;
  position: relative;
}

.wf-pop .groups .g-percent .g-percent-bg {
  max-width: 100%;
  min-width: 30%;
  height: .22rem;
  line-height: .22rem;
  font-size: 0.2rem;
  background: #3A58B5;
  border-radius: .10rem;
  position: absolute;
  left: 0;
  top: 0;
  text-align: center;
}

.wf-pop .groups .nodata-box {
  text-align: center;
  p {
    font-size: 0.24rem;
    color: #CCDDFF;
    padding-top: 0.3rem
  }
}

.wf-pop .groups .nodata {
  font-size: .22rem;
  color: #CCDDFF;
  text-align: center;
  padding-top: 10%;

}

.wf-pop .groups .nodata img {
  display: block;
  margin: 0 auto .33rem;
}

.progress-bg{
    background: #0F1726;
    width: 90px;
    margin-right: 5px;
    position: relative;
    height: 15px;
    border-radius: 3px;
    overflow: hidden;
    .progress-bar{
        background: #507BCC;
        position: absolute;
        height: 100%;
        left: 0;
        width: 30%;
    }
    span{
        position: absolute;
        width: 100%;
        height: 100%;
        color: #fff;
        font-size: 11px;
        left: 0;
        line-height: 15px;
        text-align: center;
    }
}
.groups-title{
  font-size: 0.28rem;
  font-weight:bold;
  color:rgba(255,255,255,1);
  margin-left: 4.5%;
  margin-bottom: 0.3rem;
}
.task-list-margin{
  margin-bottom: 0.7rem;
}
.task-list{
        >li{
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 3%;
            background: #141F33;
            border-radius: 4px;
            position: relative;
            overflow: hidden;
            margin-bottom: 3%;
            .description{
                display: flex;
                justify-content: flex-start;
                align-items: center;
                width: 80%;
                .head-img{
                    width: 0.6rem;
                    height: 0.6rem;
                    border-radius: 6px;
                    overflow: hidden;
                    margin-right: 3%;
                    img{
                        width: 100%;
                        height: 100%;
                    }
                }
                .content{
                    >p{
                        font-size: 0.24rem;
                        font-weight: bold;
                        margin-bottom: 5%;
                    }
                    .progress{
                        display: flex;
                        align-items: center;

                        .num{
                            img{
                                height: 0.2rem;
                                display: inline;
                            }
                            span{
                                font-size: 0.2rem;
                                color: #FFD338;
                            }
                        }
                    }
                }
            }
            .btn{
                color: #fff;
                font-weight: bold;
                font-size: 0.2rem;
                background: #EE6F0B;
                padding:2% 3%;
                border-radius: 4px;
                text-align: center;
                box-sizing: border-box;
                width: 20%;
              word-break:keep-all;
              white-space:nowrap;
                &.play{
                    background: #1976D2;
                }
                &.gray{
                    background: #fff;
                    color: #141F33;
                }
                &.received{
                    position: relative;
                    background: #848BA7;
                    color: #fff;
                }
            }
            .in-game{
                position: absolute;
                bottom: -.25rem;
                left: .2rem;
                color: #2F3C49;
                font-size: .18rem;
            }
        }

    }
.cj-text-ys {
      font-size: .18rem;
      color: #394778;
      text-align: center;
      line-height: .35rem;
      padding: .1rem 3.5% 0;
    }




.new-user-task{
  padding: 4.5%;
  margin-top: 4%;
  .box{
    border-radius: 5px;
    position: relative;
  }
  .progress-bar{color: #507BCC !important}
  .bg-lines{
    position: relative;
    background:url(./img/bg.png) no-repeat;
    background-size: 100% 100%;
    height: 3.18rem;
    padding: 0 .21rem 0 .24rem;
    box-sizing: border-box;
    &.bg-height{
      height: 3.18rem;
    }
    .tips {
      animation: tips 4s infinite;
      position: absolute;
      right: 1.61rem;
      top: -.1rem;
      width: 1.31rem;
      height: .4rem;
      img {
        width: 100%;
        height: 100%;
        vertical-align: top;
      }
    }
    .text{
      position: absolute;
      top: 1.19rem;
      left: .24rem;
      display: flex;
      justify-content: left;
      align-items: flex-end;
      .img1{
        margin-right: .14rem;
        width: 1.9rem;
        height: .32rem;
        display: block;
      }
      .img2{
        width: .96rem;
        height: .26rem;
        display: block;
      }
    }
    .time{
      position: absolute;
      top: 1.2rem;
      right: .21rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1%;
      border-radius: 0 0 0 5px;
      .img3{
        display: inline;
        width: .22rem;
        height: .22rem;
        margin-right: .06rem;
      }
      span{
        font-size: .18rem ;
        color: #b48dd7;
      }
    }
  }
  .right-li{
    background: #7B38F4 !important;
    padding: .1rem .2rem !important;
    span{color: rgba(255,255,255,.5) !important}
  }
  .middle{
    padding-top: 1.88rem;
    font-size: .26rem;
    .finish-title{
      color: #fff;
      font-size: .26rem;
      margin-bottom: .18rem;
      i{
        margin-left: .1rem;
        color: #FFD338;
      }
    }
    .finish-get{
      display: flex;
      align-items: center;
      justify-content:center;
      .num{
        font-size: 40px;
        font-weight: bolder;
      }
      .text{
        line-height: normal;
        text-align: center;
        .p1{
          font-size: 8px;
          color: #5E7CAD;
          background: #fff;
          padding: 0;
          width: 100%;
          border-radius: 2px 2px 2px 0;
          // display: inline;
          text-align: center;
          // margin-bottom: 2px;
        }
        .p2{
          text-align: center;
          font-weight: bolder;
          font-size: 16px;
        }
      }
    }
    .probar-wrap{
      position: relative;
      width: 100%;
      margin-bottom: .13rem;
    }
    .probar-ball {
      width: 100%;
      height:.3rem;
      line-height: .3rem;
      text-align: center;
      background: #000;
      position: relative;
      border-radius: 4px;
      font-weight:normal;
      overflow:hidden;
      .bar{
        display: block;
        height:100%;
        background: #507BCC;
        position: absolute;
        left:0;
        top:0;
        border-radius: 4px 0 0 4px;
      }

      p {
        position: absolute;
        bottom: 0;
        z-index:2;
        height: 100%;
        width: 100%;
        line-height: .33rem;
        font-size: .18rem;
      }
    }
    .probar-text {
      color: #fff;
      display: flex;
      justify-content: space-between;
      align-items: center;
      span {
        font-size: .22rem;
      }
      .receive {
        font-size: .2rem;
      }
    }
  }
  .bottom{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 3%;
    background: #202a4d;
    border-radius:0 0 4px 4px;
    position: relative;
    overflow: hidden;
    .description{
      display: flex;
      justify-content: flex-start;
      align-items: center;
      width: 80%;
      margin: 0;
      padding: 0;
      background: none;
      .head-img{
        width: 44px;
        height: 44px;
        border-radius: 6px;
        overflow: hidden;
        margin-right: 3%;
        img{
          width: 100%;
          height: 100%;
        }
      }
      .content{
        >p{
          font-size: .26rem;
          margin-bottom: 5%;
        }
        .progress{
          display: flex;
          align-items: center;
          .progress-bg{
            background: #0F1726;
            width: 1.98rem;
            margin-right: 5px;
            position: relative;
            height: .3rem;
            border-radius: 3px;
            overflow: hidden;
            .progress-bar{
              background: #507BCC;
              position: absolute;
              height: 100%;
              left: 0;
              width: 30%;
            }
            span{
              position: absolute;
              width: 100%;
              height: 100%;
              color: #fff;
              font-size: 11px;
              left: 0;
              line-height: 15px;
              text-align: center;
            }
          }
          .num{
            img{
              height: 12px;
              display: inline;
            }
            span{
              font-size: 12px;
              color: #FFD338;
            }
          }
        }
      }
    }
    .btn{
      width: 1.2rem;
      height: .46rem;
      color: #fff;
      font-size: 12px;
      background: #EE6F0B;
      border-radius: 4px;
      text-align: center;
      line-height: .46rem;
      margin: 0;
      padding: 0;
      &.play{
        background: #1976D2;
      }
    }
    .label{
      color: #fff;
      background: #E64A19;
      width: 12%;
      font-size: 10px;
      position: absolute;
      text-align: center;
      padding: 2px 0;
      top: 0;
      left: 0;
      border-radius: 0 0 4px 0;
    }
  }
  .finish{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 3%;
    background: #202a4d;
    position: relative;
    overflow: hidden;
    li{
      word-break:keep-all;
      padding: 0;
      margin: 0;
      white-space:nowrap;
      &:first-child{
        display: flex;
        justify-content: flex-start;
        align-items: center;
        width: 80%;
        .head-img{
          width: 44px;
          height: 44px;
          border-radius: 6px;
          overflow: hidden;
          margin-right: 3%;
          img{
            width: 100%;
            height: 100%;
          }
        }
        .content{
          position: relative;
          p{
            font-size: .26rem;
            font-weight: bold;
            &:last-child{
              font-size: .22rem;
              margin-top: .16rem;
            }
          }
        }
      }
      &:last-child{
        color: #fff;
        font-weight: bold;
        width: 1.2rem;
        height: .46rem;
        text-align: center;
        line-height:.46rem;
        font-size: 12px;
        background: #EE6F0B;
        border-radius: 4px;
      }
    }
  }
}

@keyframes tips {
  0% {
    transform-origin: right bottom;
    transform: scale(0);
  }
  15% {
    transform-origin: right bottom;
    transform: scale(1);
  }
  30% {
    transform-origin: center bottom;
    transform: scale(1) rotate(-5deg);
  }
  45% {
    transform-origin: center bottom;
    transform: scale(1) rotate(0);
  }
  85% {
    transform-origin: center bottom;
    transform: scale(1) rotate(0);
  }
  100% {
    transform-origin: right bottom;
    transform: scale(0) rotate(0);
  }

}


</style>
