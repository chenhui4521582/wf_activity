<template>
  <div id="app">
    <div class="wf-container">
      <div class="wf-pop" id="wf-pop">
        <div class="header">
          <div class="h-tx">
            <img :src="userInfo.head | filter" class="pic-tx pull-fl"
              v-if="userInfo&&userInfo.head" />
            <img src="./images/img_photo.png" class="pic-tx pull-fl" v-else />
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
          <new-user-task :newTaskItems="newTaskItems" :motherTask="motherTask"
            :newUserTaskobj="newUserTaskobj" :channel="curChannel" @receive="receive"
            @goFinish="goFinish" @getList="getNewTask"
            v-if="showNewUserTask && newTaskItems.newVersion"></new-user-task>
          <div class="new-user-task" v-else-if="showNewUserTask && !newTaskItems.newVersion">
            <div class="box">
              <div class="bg-lines"
                :class="{'bg-height':motherTask.hasFinishedNum == motherTask.allTaskNum}">
                <div class="tips">
                  <img src="./img/tips-old.png" alt="">
                </div>
                <div class="text">
                  <img class="img1" src="./img/title1-old.png" alt="">
                  <img class="img2" src="./img/time-limit-bg.png" alt="">
                </div>
                <div class="time">
                  <img class="img3" src="./img/clock.png" alt="">
                  <span>{{newTaskItems.countDown | formatTime}}</span>
                </div>
                <div class="middle">
                  <div class="finish-title"
                    v-if="motherTask.hasFinishedNum != motherTask.allTaskNum">全部完成<i>再得3元话费</i>
                  </div>
                  <div class="finish-title" v-else>恭喜！完成了新人任务！</div>
                  <div class="probar-wrap">
                    <div class="probar-ball">
                      <div class="bar"
                        :style="{width: motherTask.hasFinishedNum/motherTask.allTaskNum * 100 + '%' }">
                      </div>
                    </div>
                  </div>
                  <div class="probar-text">
                    <span>{{motherTask.hasFinishedNum}}/{{motherTask.allTaskNum}}</span>
                    <span class="receive">已有{{newTaskItems.receiverCounter}}人领取</span>
                  </div>
                </div>
              </div>
              <ul class="bottom" v-if="motherTask.hasFinishedNum != motherTask.allTaskNum" @click="checkTaskStatus(newUserTaskobj,'new_user_task')
              ">
                <li class="description">
                  <div class="head-img">
                    <img :src="newUserTaskobj.icon | filter" alt="">
                  </div>
                  <div class="content">
                    <p>{{newUserTaskobj.taskName}}</p>
                    <div class="progress">
                      <div class="progress-bg">
                        <div class="progress-bar"
                          :style="{width:newUserTaskobj.finishNum/newUserTaskobj.taskOps * 100 + '%'}">
                        </div>
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
              <ul class="finish" v-else @click="receive1(motherTask,'mother_task')">
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

            </div>
          </div>
          <div v-if="isShowOther">
            <div v-if="cjTaskItems&&cjTaskItems.length || dayTaskItems&&dayTaskItems.length">
              <h4 class="groups-title" v-if="cjTaskItems&&cjTaskItems.length&&!isCjTaskAllComplete">
                成就任务</h4>
              <ul class="task-list task-list-margin"
                v-if="cjTaskItems&&cjTaskItems.length&&!isCjTaskAllComplete">
                <li v-for="(item,index) in cjTaskItems">
                  <div class="description">
                    <div class="head-img">
                      <img :src="item.icon | filter" alt="">
                    </div>
                    <div class="content">
                      <p v-html="item.taskDescShow"></p>
                      <div class="progress">
                        <div class="progress-bg">
                          <div class="progress-bar"
                            :style="{width:item.finishNum/item.taskOps * 100 + '%'}"></div>
                          <span>{{transUint(item.finishNum,item.taskOps)}}</span>
                        </div>
                        <div class="num">
                          <img :src="item.awardsImage | filter" alt="">
                          <span>{{item.awardsName}}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="btn" v-if="item.taskStatus == 0"
                    @click="receive(item,'cjTask',index)">领取</div>
                  <div class="btn play" v-if="item.taskStatus == 1"
                    @click="goFinish(item,'cjTask',index)">去完成</div>
                  <div class="btn received" v-if="item.taskStatus == 2">
                    已完成
                  </div>
                </li>
                <p class="cj-text-ys">温馨提示：成就任务的进度可能会受网络影响，会有几分钟的延迟。</p>
              </ul>

              <h4 class="groups-title" v-if="dayTaskItems&&dayTaskItems.length">每日任务</h4>
              <ul class="task-list" v-if="dayTaskItems&&dayTaskItems.length">
                <li v-for="(item,index) in dayTaskItems">
                  <div class="description">
                    <div class="head-img">
                      <img :src="item.icon | filter" alt="">
                    </div>
                    <div class="content">
                      <p v-html="item.taskDescShow"></p>
                      <div class="progress">
                        <div class="progress-bg">
                          <div class="progress-bar"
                            :style="{width:item.finishNum/item.taskOps * 100 + '%'}"></div>
                          <span>{{transUint(item.finishNum,item.taskOps)}}</span>
                        </div>
                        <div class="num">
                          <img :src="item.awardsImage | filter" alt="">
                          <span>{{item.awardsName}}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="btn" v-if="item.taskStatus == 0"
                    @click="receive(item,'dayTask',index)">领取</div>
                  <div class="btn play" v-if="item.taskStatus == 1"
                    @click="goFinish(item,'dayTask',index)">去完成</div>
                  <div class="btn received" v-if="item.taskStatus == 2">
                    已完成
                  </div>
                </li>
              </ul>
            </div>
            <div class="nodata-box" v-else-if="!showNewUserTask">
              <img src="./images/nodata.png" class="nodata">
              <p>暂无数据~</p>
            </div>
          </div>
          <poplog v-if="isPopLog" :awardItem="awardItem" :motherTask="motherTask"
            :masterTask="masterTask" :newUserTaskFinish="newUserTaskFinish" @close="closePopLog">
          </poplog>
        </div>
        <div class="groups g-item1" v-if="curIndex == 1">
          <div>
            <div class="wf-title">
              <a href="javascript:" class="pull-fr btn-useage" id="btn-useage"
                @click="handleTabUse">使用方法<em class="icon-ys"
                  :class="isTabUse ? 'icon-sl':'icon-xl' "></em></a>
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
                    <a href="javascript:" class="btn-fz" v-clipboard:copy=item.gameCdkeyRsp.cdKey
                      v-clipboard:success="onCopy" v-clipboard:error="onError">复制兑换码</a>
                  </div>
                </div>
                <div v-else>
                  <h4 class="g-title">{{item.gameCdkeyRsp.name}}
                    <a href="javascript:" class="btn-normal btn-lq btnLQ" @click="getAward(item)"
                      v-if="item.gameCdkeyRsp.remainNum*100 > 0">免费领取</a>
                    <a href="javascript:" class="btn-normal btn-gq btnLQ" v-else>已领完</a>
                  </h4>
                  <p class="g-text">{{item.gameCdkeyRsp.description}}</p>
                  <div class="g-percent">
                    <div class="g-percent-bg" :style="{width: item.gameCdkeyRsp.remainNum*100+'%'}">
                      {{item.gameCdkeyRsp.remainNum*100}}%剩余</div>
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
    <task-award-pop v-if="isDailyReceivePop" :awards="receiveAwards"
      @close="isDailyReceivePop=false"></task-award-pop>
  </div>
</template>
<script>
import '../../common/js/window'
import poplog from './poplog'
import common from '../../common/js/utils'
import base64url from 'base64-url'
export default {
  data () {
    return {
      userInfo: null,
      cdkArr: null,
      isTabUse: false,
      curlink: null,
      hideBackArr: ['100037', '100033001', '700003'],
      curChannel: null,
      curToken: null,
      curIndex: 0,
      dayTaskItems: null,
      cjTaskItems: null,
      isFighur: false,
      timer1: null,
      cGameType: null,
      newTaskItems: false,
      awardItem: null,
      isNewTask: null,
      newUserTaskFinish: false,
      isPopLog: false,
      masterTask: false,
      isDailyReceivePop: false,
      receiveAwards: null
    }
  },
  mounted () {
    this.curChannel = localStorage.getItem('APP_CHANNEL') ? localStorage.getItem('APP_CHANNEL') : this.getUrlParam('channel')
    this.curToken = localStorage.getItem('ACCESS_TOKEN') ? localStorage.getItem('ACCESS_TOKEN') : this.getUrlParam('token')
    this.cGameType = this.getUrlParam('gameType') || localStorage.getItem('wj_gameType') || ''
    let cururl = window.location.href
    this.curlink = this.getUrlParam('wf_cur_link')
    if (this.curChannel && (this.curChannel.indexOf('100') != -1 || this.curChannel.indexOf('700') != -1)) {
      this.getUserInfo()
      this.getCdkeyStatus()
      if (this.cGameType && this.cGameType != null && this.cGameType != 'null') {
        this.getDayTask()
        this.getPlatTaskByBatch()
      }
      this.getNewTask()
    }
  },
  components: {
    poplog,
    newUserTask: () => import('./component/newUserTask')
  },
  computed: {
    isCjTaskAllComplete () {
      return this.cjTaskItems && (this.cjTaskItems.filter((item) => {
        return item.taskStatus == 2
      }).length == this.cjTaskItems.length)
    },
    isHideMenu () {
      return this.hideBackArr.includes(this.curChannel)
    },
    isDayTaskRed () {
      let newArr = []
      if (this.dayTaskItems && this.cjTaskItems) {
        newArr = newArr.concat(this.dayTaskItems).concat(this.cjTaskItems)
      }
      return newArr && newArr.filter((item) => {
        return item.taskStatus == 0
      }).length
    },
    isCjTaskRed () {
      return this.cdkArr && this.cdkArr.filter((item) => {
        return item.gameCdkeyRsp.remainNum * 100 > 0
      }).length
    },
    motherTask () {
      let list = this.newTaskItems && this.newTaskItems.taskList || []
      let motherTask = list.filter(item => {
        return item.subTask
      })[0]
      list = list.filter(item => {
        return !item.subTask
      })
      let finishedTaskNum = list.filter(item => {
        return item.taskStatus == 2
      }).length
      if (motherTask) {
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
      for (let i = 0; i < list.length; i++) {
        if (list[i].taskStatus != 2) {  // taskStatus: 0-带领取 1-未完成 2-已领取
          taskObj = list[i]
          break
        }
      }
      return taskObj
    },
    // 显示新手任务
    showNewUserTask () {
      return this.newTaskItems && this.newTaskItems.isNew && this.newTaskItems.taskList.length > 0
    },
    isShowOther () {
      let isShow = false
      if (this.newTaskItems && this.newTaskItems.newVersion) {
        isShow = this.newTaskItems && this.newTaskItems.dayTaskVisibleFlag
      } else {
        isShow = this.newTaskItems && !this.newTaskItems.isNew
      }
      return isShow
    }
  },
  methods: {
    receive (item, type, index) {
      this.axios.post('//platform-api.beeplaying.com/task/api/usertask/finish', {
        taskId: item.taskId,
        taskLogId: item.taskLogId
      }, {
        headers: {
          'App-Channel': this.curChannel,
          'Authorization': this.curToken
        }
      }).then((res) => {
        if (res.data.code == 200) {
          // this.$toast.show({
          //   message: '领取成功！',
          //   duration: 1500
          // })
          this.receiveAwards = res.data.data
          this.isDailyReceivePop = true
          switch (type) {
            case 'cjTask':
              GLOBALS.marchSetsPoint('A_H5PT0121001154', {
                project_id: this.cGameType,
                position_id: index + 1,
                target_project_id: item.gameType,
                task_id: item.taskId,
                task_name: item.taskName
              }) // H5平台-H5游戏内SDK-任务-成就任务-去领取
              break
            case 'dayTask':
              GLOBALS.marchSetsPoint('A_H5PT0121001156', {
                project_id: this.cGameType,
                position_id: index + 1,
                target_project_id: item.gameType,
                task_id: item.taskId,
                task_name: item.taskName
              }) // H5平台-H5游戏内SDK-页面
              break
            default:
              break
          }
          item.taskStatus = 2
          this.getPlatTaskByBatch()
          this.getDayTask()
        }
      })
    },
    goFinish ({ gameType, url, action, taskId, taskName }, type, index) {
      let actionsArr = [39, 35, 34, 32]
      // 跳转到首页（关闭）
      if (action == 36 || url == '/plat/') {
        parent.location.href = this.jumpToPlat()
        return
      }
      // 跳转商城
      if (gameType == 0 && actionsArr.includes(action) && !url) {
        parent.location.href = 'https://wap.beeplaying.com/payment/#/mall'
        return
      }
      // 跳平台(关闭)
      if (gameType == 0 && action == 2) {
        parent.location.href = this.jumpToPlat()
        return
      }
      // 跳转固定入口
      if (url && url.indexOf('?fixedEntry') != -1) {
        parent.location.href = GLOBALS.getJumpToGameUrl(url)
        return
      }

      if (type == 'new_user_task') {
        // //其他外接游戏external=1
        // if (url && url.indexOf('external=1') != -1) {
        //   let gameUrl = this.trimStr(url) + '&channel=' + this.curChannel + '&token=' + this.curToken + '&gurl=' + url.split('?')[0] + '&pf=bdWap';
        //   return parent.location.href = gameUrl
        // }
        // parent.location.href = 'https://wap.beeplaying.com' + url + '?channel=' + this.curChannel + '&token=' + this.curToken;
        parent.location.href = GLOBALS.getJumpToGameUrl(url)
      } else {
        switch (type) {
          case 'cjTask':
            GLOBALS.marchSetsPoint('A_H5PT0121001153', {
              project_id: this.cGameType,
              position_id: index + 1,
              target_project_id: gameType,
              task_id: taskId,
              task_name: taskName
            }) // H5平台-H5游戏内SDK-任务-成就任务-去完成
            break
          case 'dayTask':
            GLOBALS.marchSetsPoint('A_H5PT0121001155', {
              project_id: this.cGameType,
              position_id: index + 1,
              target_project_id: gameType,
              task_id: taskId,
              task_name: taskName
            }) // H5平台-H5游戏内SDK-任务-每日任务-去完成
            break
          default:
            break
        }
        clearTimeout(this.timer1)
        this.isFighur = true
        this.timer1 = setTimeout(() => {
          this.isFighur = false
        }, 3000)
      }
    },
    trimStr: function (str) {
      return str.replace(/(^\s*)|(\s*$)/g, '')
    },
    jumpToPlat () {
      return window.linkUrl.getBackUrl(this.curChannel)
    },
    transUint (finishNum, taskOps) {
      let finish = finishNum > 10000 ? (finishNum / 10000).toFixed(2) + '万' : finishNum,
        ops = taskOps > 10000 ? taskOps / 10000 + '万' : taskOps
      return finish + '/' + ops
    },
    getPlatTaskByBatch () {
      this.axios.post('//platform-api.beeplaying.com/task/api/usertask/platTaskByBatch', {
        value: this.cGameType + '-achievementTask',
        from: 'sdk',
        gameType: this.cGameType || ''
      }, {
        headers: {
          'App-Channel': this.curChannel,
          'Authorization': this.curToken
        }
      }).then((res) => {
        this.cjTaskItems = res.data.data
      })
    },
    getDayTask () {
      this.axios.post('//platform-api.beeplaying.com/task/api/usertask/platTaskByBatch', {
        value: 'dayTask',
        from: 'sdk',
        gameType: this.cGameType || ''
      }, {
        headers: {
          'App-Channel': this.curChannel,
          'Authorization': this.curToken
        }
      }).then((res) => {
        this.dayTaskItems = res.data.data
      })
    },
    tabNav (idx) {
      this.curIndex = idx
      switch (idx) {
        case 0:
          GLOBALS.marchSetsPoint('A_H5PT0121001152', { project_id: this.cGameType }) // H5平台-H5游戏内SDK-任务
          break
        case 1:
          GLOBALS.marchSetsPoint('A_H5PT0121001157', { project_id: this.cGameType }) // H5平台-H5游戏内SDK-礼包
          break

        default:
          break
      }
    },
    // 获取地址栏问号后面的参数值
    getUrlParam: function (ename) {
      var url = window.location.href
      var Request = new Object()
      if (url.indexOf('?') != -1) {
        var str = url.split('?')[1]
        var strs = str.split('&')
        for (var i = 0; i < strs.length; i++) {
          Request[strs[i].split('=')[0]] = (strs[i].split('=')[1])
        }
      } else {
        return ''
      }
      return Request[ename]
    },
    async goMenu () {
      localStorage.removeItem('gurlSDK')
      await GLOBALS.marchSetsPoint('A_H5PT0121001151', { project_id: this.cGameType }) // H5平台-H5游戏内SDK-游戏大厅

      /** 返回小米平台 **/
      let APP_CHANNEL = window.GLOBALS.getUrlParam('channel') || localStorage.getItem('APP_CHANNEL')
      let XMCHANNEM = ['100051', '100051003', '100051005']
      let isxmChannel = XMCHANNEM.find(item => {
        return item == APP_CHANNEL
      })
      if (isxmChannel) {
        top.location.href = 'https://wap.beeplaying.com/xmWap/?channel=' + isxmChannel
      } else {
        if (APP_CHANNEL != 700002 && APP_CHANNEL != 700001) {
          top.location.href = window.linkUrl.getBackUrl(this.curChannel)
        } else {
          // 665e用700002 玩蜂700001
          if (APP_CHANNEL == 700002) {
            top.location.href = 'https://www.665e.com/'
          } else {
            top.location.href = 'https://beeplay123.com/'
          }
        }
      }
    },
    onCopy () {
      GLOBALS.marchSetsPoint('A_H5PT0121001159', { project_id: this.cGameType }) // H5平台-H5游戏内SDK-礼包-复制兑换码
      this.$toast.show({
        message: '复制成功！',
        duration: 1500
      })
    },
    onError () {
      this.$toast.show({
        message: '复制失败！',
        duration: 1500
      })
    },
    getAward (item) {
      this.axios.post('//ops-api.beeplaying.com/ops/api/cdkey/getAwards', {
        value: item.gameCdkeyRsp.batchId
      }, {
        headers: {
          'App-Channel': this.curChannel,
          'Authorization': this.curToken
        }
      }).then((res) => {
        if (res.data.code == 200) {
          // this.$toast.show({
          //   message: '领取成功',
          //   duration: 1500
          // })
          this.receiveAwards = item
          this.isDailyReceivePop = true
          this.getCdkeyStatus()
        }
      })
    },
    handleTabUse () {
      this.isTabUse = !this.isTabUse
      GLOBALS.marchSetsPoint('A_H5PT0121001158', { project_id: this.cGameType }) // H5平台-H5游戏内SDK-礼包-使用方法
    },
    getUserInfo () {
      this.axios.post('//uic-api.beeplaying.com/uic/api/user/login/transInfo', {}, {
        headers: {
          'App-Channel': this.curChannel,
          'Authorization': this.curToken
        }
      })
        .then((res) => {
          if (res.data.code == 200) {
            this.userInfo = res.data.data
            GLOBALS.marchSetsPoint('P_H5PT0121', { project_id: this.cGameType }) // H5平台-H5游戏内SDK-页面
          }
        })
    },
    getCdkeyStatus () {
      this.axios.post('//ops-api.beeplaying.com/ops/api/cdkey/status', {
        value: this.curlink
      }, {
        headers: {
          'App-Channel': this.curChannel,
          'Authorization': this.curToken
        }
      }).then((res) => {
        if (res.data.code == 200) {
          this.cdkArr = res.data.data
        }
      })
    },
    getNewTask () {
      this.axios.post('//platform-api.beeplaying.com/task/api/newuser/task',
        {
          value: 'NewUserStairTask'
        },
        {
          headers: {
            'App-Channel': this.curChannel,
            'Authorization': this.curToken
          }
        }).then((res) => {
          if (res.data.code == 200) {
            this.newTaskItems = res.data.data
          }
        })
    },
    checkTaskStatus (item, type, index) {
      if (item.taskStatus == 0) {
        this.receive1(item, type, index)
      } else if (type == 'day_task' || item.taskStatus == 1) {
        this.goFinish(item, type)
      }
    },
    receive1 (item, type, index, medalimg) {
      if (type == 'crush_task' || type == 'mother_crush_task') {
        item.awardsFlag = type
        item.index = index
        item.medalimg = medalimg
      } else {
        // 游戏内任务-去完成
      }
      this.axios.post('//platform-api.beeplaying.com/task/api/usertask/finish', {
        taskId: item.taskId,
        taskLogId: item.taskLogId
      },
        {
          headers: {
            'App-Channel': this.curChannel,
            'Authorization': this.curToken
          }
        }).then((res) => {
          if (res.data.code == 200) {
            this.awardItem = item
            switch (type) {
              case 'mother_task':
                this.newUserTaskFinish = true
                this.getNewTask()
                break
              default:
                item.taskStatus = 2
            }
            this.isPopLog = true
          } else {
            this.$toast.show({
              message: res.data.message,
              duration: 1500
            })
          }
        })
    },
    goTask () {
      parent.location.href = window.linkUrl.getBackUrl(this.curChannel, '', '', true, '#/taskview')
    },
    closePopLog (val) {
      this.isPopLog = false
      if (val) {
        this.goTask()
      }
    }
  },
  filters: {
    formatTime (time) {
      let days = time / 1000 / 3600 / 24
      let day = Math.floor(days)
      let hours = Math.ceil((days - day) * 24)
      return `仅剩${day}天${hours}小时`
    }
  }
}

</script>
<style lang="less" scoped>
@import "../../common/css/base.css";
@import "./wj.less";
.fighur {
  width: 0.87rem;
  position: fixed;
  left: 0;
  top: 50%;
  margin-top: -0.32rem;
  z-index: 100;
  animation: touch 0.6s ease-in-out alternate infinite;
}
@keyframes touch {
  0% {
    transform: translateX(0.2rem);
  }
  100% {
    transform: translateX(0);
  }
}
.ball {
  width: 1rem;
  height: 1rem;
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
  font-size: 0.24rem;
  color: #ccddff;
  margin: 0 auto;
  box-sizing: border-box;
  line-height: 0.35rem;
  &.useage-tips {
    height: 0;
    overflow: hidden;
  }
}

.useage-methods span {
  display: block;
  background: #1f2a4d;
  padding: 0.15rem 0.5rem 0.15rem 0.29rem;
  margin-bottom: 0.4rem;
}

.g-exchange {
  display: flex;
  justify-content: space-between;
  font-size: 0.24rem;
}
.g-exchange span {
  display: inline-block;
  max-width: 3rem;
  word-break: keep-all;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.g-exchange a {
  color: #ff9933;
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
  background: #0f1b33;
  transition: right 0.2s;
}

.wf-pop .header {
  height: 1.08rem;
  background: linear-gradient(0deg, #132641, #183e68);
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

.wf-pop .h-tx {
}

.wf-pop .h-tx .pic-tx {
  width: 0.48rem;
  height: 0.48rem;
  margin-right: 0.1rem;
}

.wf-pop .h-tx .tx-box {
  width: 2.16rem;
  height: 0.54rem;
  background: url(./images/leaf-bg.png) no-repeat;
  background-size: 100% 100%;
  display: flex;
  align-items: center;
}

.wf-pop .h-tx .pic-leaf {
  width: 0.2rem;
  height: 0.2rem;
  margin: 0 0.07rem 0 0.13rem;
}

.wf-pop .icon-add {
  width: 0.41rem;
  height: 0.4rem;
}

.wf-pop .leaf-num {
  width: 1.1rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 0.22rem;
  color: #ffd997;
}

.wf-pop .wf-back {
  width: 1.36rem;
  height: 0.54rem;
  background: url(./images/back.png) no-repeat;
  background-size: 100% 100%;
  display: flex;
  align-items: center;
  font-size: 0.16rem;
  color: #ffd997;
  justify-content: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.wf-pop .wf-back .icon-home {
  width: 0.38rem;
  height: 0.38rem;
  margin-right: 0.03rem;
}

.wf-pop .icon-pac {
  width: 0.18rem;
  height: 0.18rem;
}

.wf-pop .wf-title {
  color: #fff;
  height: 0.45rem;
  position: relative;
  margin: 0 0 0.22rem 0;
  display: flex;
  justify-content: center;
}

.wf-pop .wf-title h4 {
  font-size: 0.34rem;
  display: flex;
  align-items: center;
}

.wf-pop .wf-title .icon-pac {
  width: 0.41rem;
  height: 0.38rem;
  margin: 0 0.07rem 0 0.22rem;
}

.wf-pop .wf-title .btn-useage {
  font-size: 0.24rem;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
}

.wf-pop .btn-useage .icon-ys {
  display: inline-block;
  width: 0.18rem;
  height: 0.18rem;
  margin-left: 0.08rem;
}

.wf-pop .btn-useage .icon-xl {
  background: url("./images/icon-xl.png") no-repeat;
  background-size: 100% 100%;
}

.wf-pop .btn-useage .icon-sl {
  background: url("./images/icon-sl.png") no-repeat;
  background-size: 100% 100%;
}

.wf-pop .groups {
  width: 100%;
  text-align: left;
  margin-bottom: 0.2rem;
}

.wf-pop .groups li {
  width: 91%;
  background: #1f2a4d;
  color: #fff;
  margin: 0 auto 0.2rem;
  padding: 0.15rem 0.24rem;
  box-sizing: border-box;
  &:last-child {
    margin: 0 auto;
  }
}

.wf-pop .groups li h4 {
  font-size: 0.28rem;
}

.wf-pop .groups li a.btn-normal {
  display: block;
  /*width: 1.35rem;*/
  padding: 2% 3%;
  /*height: .45rem;*/
  /*line-height: .45rem;*/
  text-align: center;
  font-size: 0.22rem;
  font-weight: normal;
  border-radius: 0.08rem;
}

.wf-pop .groups li a.btn-lq {
  background: rgba(238, 111, 11, 1);
  background-size: 100% 100%;
}
.wf-pop .groups li a.btn-qwc {
  background: #1976d2;
  background-size: 100% 100%;
}
.wf-pop .groups li a.btn-gq {
  background: rgba(132, 139, 167, 1);
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

.h5game-fuli {
  width: 0.5rem;
  position: absolute;
  right: 18%;
  top: 0.05rem;
}

.wf-pop .groups .g-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.2rem 0 0.32rem 0;
}

.wf-pop .groups .g-text {
  font-size: 0.22rem;
  line-height: 0.35rem;
  color: #ccddff;
  margin-bottom: 0.1rem;
}

.wf-pop .groups .g-percent {
  height: 0.22rem;
  background: #0f1b33;
  border-radius: 0.1rem;
  margin-top: 0.23rem;
  position: relative;
}

.wf-pop .groups .g-percent .g-percent-bg {
  max-width: 100%;
  min-width: 30%;
  height: 0.22rem;
  line-height: 0.22rem;
  font-size: 0.2rem;
  background: #3a58b5;
  border-radius: 0.1rem;
  position: absolute;
  left: 0;
  top: 0;
  text-align: center;
}

.wf-pop .groups .nodata-box {
  text-align: center;
  p {
    font-size: 0.24rem;
    color: #ccddff;
    padding-top: 0.3rem;
  }
}

.wf-pop .groups .nodata {
  font-size: 0.22rem;
  color: #ccddff;
  text-align: center;
  padding-top: 10%;
}

.wf-pop .groups .nodata img {
  display: block;
  margin: 0 auto 0.33rem;
}

.progress-bg {
  background: #0f1726;
  width: 90px;
  margin-right: 5px;
  position: relative;
  height: 15px;
  border-radius: 3px;
  overflow: hidden;
  .progress-bar {
    background: #507bcc;
    position: absolute;
    height: 100%;
    left: 0;
    width: 30%;
  }
  span {
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
.groups-title {
  font-size: 0.28rem;
  font-weight: bold;
  color: rgba(255, 255, 255, 1);
  margin-left: 4.5%;
  margin-bottom: 0.3rem;
}
.task-list-margin {
  margin-bottom: 0.7rem;
}
.task-list {
  > li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 3%;
    background: #141f33;
    border-radius: 4px;
    position: relative;
    overflow: hidden;
    margin-bottom: 3%;
    .description {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      width: 80%;
      .head-img {
        width: 0.6rem;
        height: 0.6rem;
        border-radius: 6px;
        overflow: hidden;
        margin-right: 3%;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .content {
        > p {
          font-size: 0.24rem;
          font-weight: bold;
          margin-bottom: 5%;
        }
        .progress {
          display: flex;
          align-items: center;

          .num {
            img {
              height: 0.2rem;
              display: inline;
            }
            span {
              font-size: 0.2rem;
              color: #ffd338;
            }
          }
        }
      }
    }
    .btn {
      color: #fff;
      font-weight: bold;
      font-size: 0.2rem;
      background: #ee6f0b;
      padding: 2% 3%;
      border-radius: 4px;
      text-align: center;
      box-sizing: border-box;
      width: 20%;
      word-break: keep-all;
      white-space: nowrap;
      &.play {
        background: #1976d2;
      }
      &.gray {
        background: #fff;
        color: #141f33;
      }
      &.received {
        position: relative;
        background: #848ba7;
        color: #fff;
      }
    }
    .in-game {
      position: absolute;
      bottom: -0.25rem;
      left: 0.2rem;
      color: #2f3c49;
      font-size: 0.18rem;
    }
  }
}
.cj-text-ys {
  font-size: 0.18rem;
  color: #394778;
  text-align: center;
  line-height: 0.35rem;
  padding: 0.1rem 3.5% 0;
}

.new-user-task {
  padding: 4.5%;
  margin-top: 4%;
  .box {
    border-radius: 5px;
    position: relative;
  }
  .progress-bar {
    color: #507bcc !important;
  }
  .bg-lines {
    position: relative;
    background: url(./img/bg-old.png) no-repeat;
    background-size: 100% 100%;
    height: 3.18rem;
    padding: 0 0.21rem 0 0.24rem;
    box-sizing: border-box;
    &.bg-height {
      height: 3.18rem;
    }
    .tips {
      animation: tips 4s infinite;
      position: absolute;
      right: 1.61rem;
      top: -0.1rem;
      width: 1.31rem;
      height: 0.4rem;
      img {
        width: 100%;
        height: 100%;
        vertical-align: top;
      }
    }
    .text {
      position: absolute;
      top: 1.19rem;
      left: 0.24rem;
      display: flex;
      justify-content: left;
      align-items: flex-end;
      .img1 {
        margin-right: 0.14rem;
        width: 1.9rem;
        height: 0.32rem;
        display: block;
      }
      .img2 {
        width: 0.96rem;
        height: 0.26rem;
        display: block;
      }
    }
    .time {
      position: absolute;
      top: 1.2rem;
      right: 0.21rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1%;
      border-radius: 0 0 0 5px;
      .img3 {
        display: inline;
        width: 0.22rem;
        height: 0.22rem;
        margin-right: 0.06rem;
      }
      span {
        font-size: 0.18rem;
        color: #b48dd7;
      }
    }
  }
  .right-li {
    background: #7b38f4 !important;
    padding: 0.1rem 0.2rem !important;
    span {
      color: rgba(255, 255, 255, 0.5) !important;
    }
  }
  .middle {
    padding-top: 1.88rem;
    font-size: 0.26rem;
    .finish-title {
      color: #fff;
      font-size: 0.26rem;
      margin-bottom: 0.18rem;
      i {
        margin-left: 0.1rem;
        color: #ffd338;
      }
    }
    .finish-get {
      display: flex;
      align-items: center;
      justify-content: center;
      .num {
        font-size: 40px;
        font-weight: bolder;
      }
      .text {
        line-height: normal;
        text-align: center;
        .p1 {
          font-size: 8px;
          color: #5e7cad;
          background: #fff;
          padding: 0;
          width: 100%;
          border-radius: 2px 2px 2px 0;
          // display: inline;
          text-align: center;
          // margin-bottom: 2px;
        }
        .p2 {
          text-align: center;
          font-weight: bolder;
          font-size: 16px;
        }
      }
    }
    .probar-wrap {
      position: relative;
      width: 100%;
      margin-bottom: 0.13rem;
    }
    .probar-ball {
      width: 100%;
      height: 0.3rem;
      line-height: 0.3rem;
      text-align: center;
      background: #000;
      position: relative;
      border-radius: 4px;
      font-weight: normal;
      overflow: hidden;
      .bar {
        display: block;
        height: 100%;
        background: #507bcc;
        position: absolute;
        left: 0;
        top: 0;
        border-radius: 4px 0 0 4px;
      }

      p {
        position: absolute;
        bottom: 0;
        z-index: 2;
        height: 100%;
        width: 100%;
        line-height: 0.33rem;
        font-size: 0.18rem;
      }
    }
    .probar-text {
      color: #fff;
      display: flex;
      justify-content: space-between;
      align-items: center;
      span {
        font-size: 0.22rem;
      }
      .receive {
        font-size: 0.2rem;
      }
    }
  }
  .bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 3%;
    background: #202a4d;
    border-radius: 0 0 4px 4px;
    position: relative;
    overflow: hidden;
    .description {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      width: 80%;
      margin: 0;
      padding: 0;
      background: none;
      .head-img {
        width: 44px;
        height: 44px;
        border-radius: 6px;
        overflow: hidden;
        margin-right: 3%;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .content {
        > p {
          font-size: 0.26rem;
          margin-bottom: 5%;
        }
        .progress {
          display: flex;
          align-items: center;
          .progress-bg {
            background: #0f1726;
            width: 1.98rem;
            margin-right: 5px;
            position: relative;
            height: 0.3rem;
            border-radius: 3px;
            overflow: hidden;
            .progress-bar {
              background: #507bcc;
              position: absolute;
              height: 100%;
              left: 0;
              width: 30%;
            }
            span {
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
          .num {
            img {
              height: 12px;
              display: inline;
            }
            span {
              font-size: 12px;
              color: #ffd338;
            }
          }
        }
      }
    }
    .btn {
      width: 1.2rem;
      height: 0.46rem;
      color: #fff;
      font-size: 12px;
      background: #ee6f0b;
      border-radius: 4px;
      text-align: center;
      line-height: 0.46rem;
      margin: 0;
      padding: 0;
      &.play {
        background: #1976d2;
      }
    }
    .label {
      color: #fff;
      background: #e64a19;
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
  .finish {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 3%;
    background: #202a4d;
    position: relative;
    overflow: hidden;
    li {
      word-break: keep-all;
      padding: 0;
      margin: 0;
      white-space: nowrap;
      &:first-child {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        width: 80%;
        .head-img {
          width: 44px;
          height: 44px;
          border-radius: 6px;
          overflow: hidden;
          margin-right: 3%;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .content {
          position: relative;
          p {
            font-size: 0.26rem;
            font-weight: bold;
            &:last-child {
              font-size: 0.22rem;
              margin-top: 0.16rem;
            }
          }
        }
      }
      &:last-child {
        color: #fff;
        font-weight: bold;
        width: 1.2rem;
        height: 0.46rem;
        text-align: center;
        line-height: 0.46rem;
        font-size: 12px;
        background: #ee6f0b;
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
