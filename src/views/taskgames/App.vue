<template>
  <div class="task-games">
    <div class="header">
      <ul>
        <li class="leaf">{{userInfo&&userInfo.amount}}</li>
        <li class="hf-fragment"
          v-if="telFragment"
          @click="jumpMine">{{telFragment&&telFragment[0].price}}
          <i :class="{'huafeifont':!huafeiShow}"
            v-html="huafeiShow ? '(满'+huafeiNum+'可领)&nbsp':`&nbsp点击领取&nbsp`"></i>
        </li>
        <!--<p class="figure" v-if="!huafeiShow">-->
        <!--<img src="./images/fighur.png" class="touch">-->
        <!--快去领！-->
        <!--</p>-->
      </ul>
      <entrance-header @gotokf="kfclick"
        @getUserInfo="getTransInfo"
        :userInfo="userInfo"></entrance-header>
    </div>
    <!-- sdk 推广 -->
    <!-- <sdk-recommend :showCrushMasterTask = "showCrushMasterTask" :showKingTask = "showKingTask" :currentGameType = "currentGameType" :newUser = "newTaskItems" /> -->
    <!-- sdk 新版运营位 -->
    <sdk-tab-box :currentGameType='currentGameType'
      :id="userInfo&&userInfo.userId"
      @kickegg="kickegg">
      <div>
        <div class="t-content"
          v-if="!isTfStatus">
          <adventure-task :current-game-type="currentGameType"></adventure-task>
          <new-user-task :newTaskItems="newTaskItems"
            :motherTask="motherTask"
            :newUserTaskobj="newUserTaskobj"
            :channel="channel"
            @receive="receive"
            @goFinish="goFinish"
            @getList="getNewTask"
            v-if="showNewUserTask && newTaskItems.newVersion"></new-user-task>
          <div v-if="showNewUserTask && !newTaskItems.newVersion"
            class="new-user-task">
            <div class="tips">
              <img src="./img/tips-old.png"
                alt="">
            </div>
            <div class="new-task-header">
              <div class="new-task-inner">
                <h4 class="h-title h-new-title icon-tips">
                  <p class="h-subtitle">
                    <img src="./img/title1-old.png"
                      class="xr-icon">
                    <img src="./images/small-xs-tips.png"
                      class="small-xs-tips">
                  </p>
                  <div class="text"><img src="./images/cloak.png">{{newTaskItems.countDown | formatTime}}</div>
                </h4>
                <div class="newTask">
                  <div v-if="motherTask&&(motherTask.hasFinishedNum != motherTask.allTaskNum)"
                    class="title">
                    <span class="text">全部完成</span>
                    <span>再得{{motherTask.awardsNum / 10}}元话费</span>
                  </div>
                  <div class="title"
                    v-else>恭喜！新人任务已全部完成！</div>
                  <ul>
                    <li class="percent-lq">
                      <div class="percent-box">
                        <em :style="{width: motherTask.hasFinishedNum/motherTask.allTaskNum * 100 + '%' }"></em>
                      </div>
                    </li>
                  </ul>
                  <div class="explain">
                    <div class="text">{{motherTask.hasFinishedNum}}/{{motherTask.allTaskNum}}</div>
                    <div v-show="newTaskItems.receiverCounter"
                      class="receive">已有{{newTaskItems.receiverCounter}}人领取</div>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="motherTask.hasFinishedNum != motherTask.allTaskNum">
              <ul class="t-items">
                <li class="not-daily">
                  <div :class="{'actived': newUserTaskobj.taskStatus == 2}">
                    <div class="pic">
                      <img :src="newUserTaskobj.icon | filter"
                        alt="">
                      <span class="label">任务{{motherTask.hasFinishedNum + 1}}</span>
                    </div>
                    <div class="item-text">
                      <p class="title"
                        v-html="newUserTaskobj.taskName"></p>
                      <div class="percent-container">
                        <div class="percent-box">
                          <div class="text">{{newUserTaskobj.finishNum}}/{{newUserTaskobj.taskOps}}</div>
                          <em :style="{width:newUserTaskobj.finishNum/newUserTaskobj.taskOps * 100 + '%'}"></em>
                        </div>
                        <span class="item-award"><i><img :src="newUserTaskobj.awardsImage | filter"
                              alt="">{{newUserTaskobj.awardsName}}</i></span>
                      </div>
                    </div>
                  </div>
                  <p class="btn-box">
                    <a href="javascript:"
                      class="btn btn-receive"
                      v-if="newUserTaskobj.taskStatus == 0"
                      @click="receive(newUserTaskobj, 'newtask')">领取</a>
                    <a href="javascript:"
                      class="btn btn-play"
                      v-if="newUserTaskobj.taskStatus == 1"
                      @click="goFinish(newUserTaskobj,'newtask')">去完成</a>
                    <a href="javascript:"
                      class="btn btn-gray"
                      v-if="newUserTaskobj.taskStatus == 2">已领取</a>
                  </p>
                </li>
              </ul>
            </div>
            <div v-else>
              <ul class="finish">
                <li>
                  <div class="head-img">
                    <img src="./img/signIn-icon.png"
                      alt="">
                  </div>
                  <div class="f-content">
                    <p>快领取话费奖励吧</p>
                    <p>{{motherTask.awardsName}}</p>
                  </div>
                </li>
                <li @click="receive(motherTask,'motherTask')"
                  class="btn">领取</li>
              </ul>
            </div>
            <!-- 人人大恶魔勋章 -->
            <renren-mowang v-if="channel==='100049'"></renren-mowang>
          </div>
          <fixed-entrance @checkTaskStatus="goFinish"
            @close="closeFixedEntrance"
            v-if="isShowOther"></fixed-entrance>
          <!-- 人人大恶魔勋章 -->
          <renren-mowang v-if="channel==='100049'"></renren-mowang>
          <template v-if="isShowOther">
            <div class="wrap">
              <cost-down :type="2"
                @masterTaskStatus="masterTaskStatus"></cost-down>
              <div class="wrapper"
                v-if="MasterCostDown">
                <!-- 大师任务 -->
                <crush-master-task v-if="showCrushMasterTask "
                  :crushTaskList="crushTaskList"
                  :showReceiveMedal="showReceiveMedal"
                  :showMedalAnimate="showMedalAnimate"
                  :currentMedalIndex="currentMedalIndex"
                  :currentGameType="currentGameType"
                  @checkTaskStatus="checkTaskStatus"
                  @hideMedalAnimate="showMedalAnimate = false"
                  @receive="receive"
                  @refreshTask="refreshTask" />
                <!-- 王者任务 -->
                <king-task v-if="showKingTask"
                  :crushTaskList="crushTaskList"
                  :showReceiveMedal="showReceiveMedal"
                  :showMedalAnimate="showMedalAnimate"
                  :currentMedalIndex="currentMedalIndex"
                  :currentGameType="currentGameType"
                  @checkTaskStatus="checkTaskStatus"
                  @hideMedalAnimate="showMedalAnimate = false"
                  @receive="receive"
                  @refreshTask="refreshTask" />
              </div>
            </div>
          </template>
          <div v-if="currentGamesItems&&currentGamesItems.length && newTaskItems&&(isShowOther||currentGamesItems[0].flag)">
            <h4 class="h-title h-first-title">当前游戏每日任务</h4>
            <!-- 魅族渠道新手完成活动 下线时清删除 -->
            <div class="complete-task"
              v-if="completeData.show">
              <div style="display: flex;align-items: center;">
                <div class="pic">
                  <img src="./img/complete-icon.png"
                    alt="">
                </div>
                <div class="item-text">
                  <p class="title">做任务瓜分{{completeData.jackpotAmount || 2000}}奖池 </p>
                  <div class="percent-container">
                    <div class="percent-box">
                      <div class="text">{{completeData.userTaskFinishNum}}/{{completeData.taskNum}}</div>
                      <em :style="{width:completeData.userTaskFinishNum/completeData.taskNum * 100 + '%'}"></em>
                    </div>
                  </div>
                </div>
              </div>
              <p class="btn-box">
                <a href="javascript:"
                  class="btn btn-play1"
                  v-if="completeData.userTaskFinishAll"
                  @click="completeClick">完成</a>
                <a href="javascript:"
                  class="btn btn-play2"
                  v-else>未完成</a>
              </p>
            </div>
            <!-- 魅族渠道新手完成活动 下线时清删除 -->
            <ul class="t-items">
              <li v-for="(item, index) in currentGamesItems"
                :key="index">
                <div :class="{'actived': item.taskStatus == 2}"
                  style="display: flex;align-items: center;">
                  <div class="pic">
                    <img :src="item.icon | filter"
                      alt=""
                      v-if="item.action!=72">
                    <img :src="require(`./images/meizugg/${Math.round(Math.random()*7+1)}.gif`)"
                      alt=""
                      v-else>
                  </div>
                  <div class="item-text">
                    <p class="title"
                      v-html="item.taskDescShow"></p>
                    <div class="percent-container">
                      <div class="percent-box">
                        <div class="text">{{item.finishNum}}/{{item.taskOps}}</div>
                        <em :style="{width:item.finishNum/item.taskOps * 100 + '%'}"></em>
                      </div>
                      <div class="new-item-award">
                        <p><img :src="item.awardsImage | filter"
                            alt=""></p>
                        <span>{{item.awardsName}}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <p class="btn-box">
                  <a href="javascript:"
                    class="btn btn-receive"
                    v-if="item.taskStatus == 0"
                    @click="checkTaskStatus(item,'dayTask',index)">领取</a>
                  <a href="javascript:"
                    class="btn btn-play"
                    v-if="item.taskStatus == 1"
                    @click="goFinishs(item, index)">去完成</a>
                  <a href="javascript:"
                    class="btn btn-gray"
                    v-if="item.taskStatus == 2">已领取</a>
                  <span v-if="woolUserType && item.taskStatus == 0&&!item.flag"
                    class="in-game wool_user">看完广告获得奖励</span>
                </p>
              </li>
            </ul>
          </div>
          <template v-if="isShowOther">
            <div v-if="otherGamesItems">
              <!-- 其他任务 -->
              <h4 class="h-title h-third-title">更多每日任务</h4>
              <ul class="t-items">
                <li v-for="(item, index) in otherGamesItems"
                  :key="index">
                  <div :class="{'actived': item.taskStatus == 2}"
                    style="display: flex;align-items: center;">
                    <div class="pic">
                      <img :src="item.icon | filter"
                        alt=""
                        v-if="item.action!=72">
                      <img :src="require(`./images/meizugg/${Math.round(Math.random()*7+1)}.gif`)"
                        alt=""
                        v-else>
                    </div>
                    <div class="item-text">
                      <p class="title"
                        v-html="item.taskDescShow"></p>
                      <div class="percent-container">
                        <div class="percent-box"
                          :class="{'bigNum': item.taskOps > 10000}">
                          <div class="text">{{item.finishNum}}/{{item.taskOps}}</div>
                          <em :style="{width:item.finishNum/item.taskOps * 100 + '%'}"></em>
                        </div>
                        <div class="new-item-award">
                          <p><img :src="item.awardsImage | filter"
                              alt=""></p>
                          <span>{{item.awardsName}}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p class="btn-box">
                    <a href="javascript:"
                      class="btn btn-receive"
                      v-if="item.taskStatus == 0"
                      @click="checkTaskStatus(item,'dayTask',index)">领取</a>
                    <a href="javascript:"
                      class="btn btn-play"
                      v-if="item.taskStatus == 1"
                      @click="goFinish(item, 'dayTask')">去完成</a>
                    <a href="javascript:"
                      class="btn btn-gray"
                      v-if="item.taskStatus == 2"
                      @click="goFinish(item)">已完成</a>
                    <span v-if="woolUserType && item.taskStatus == 0"
                      class="in-game wool_user">看完广告获得奖励</span>
                    <span class="in-game"
                      v-if="item.taskStatus == 2">点击可进入</span>
                  </p>
                </li>
              </ul>
            </div>
          </template>
          <img src="./img/weekbetting.png"
            alt=""
            class="weekbetting"
            style="display: block;width: 100%;margin: .2rem 0"
            @click="gotoweekbetting"
            v-if="showWeekBetting">
          <poplog v-if="isPopLog"
            :crushTaskList="crushTaskList"
            :awardItem="awardItem"
            :motherTask="motherTask"
            :isNewTask="isNewTask"
            :masterTask="masterTask"
            :newUserTaskFinish="newUserTaskFinish"
            @close="closePopLog">
          </poplog>
          <!-- 新版奖励弹窗   -->
          <!--<daily-task-receive-pop v-if="isDailyReceivePop" :awards="receiveAwards" @closePop="closeDailyReceivePop"></daily-task-receive-pop>-->
          <task-award-pop v-if="isDailyReceivePop"
            :awards="receiveAwards"
            @close="closeDailyReceivePop"></task-award-pop>
          <!-- 踏青寻宝   活动特有  活动下线 删除-->
          <box-dialog v-if="showBoxDialog"
            :awardItem="awardItem"
            @closeBoxDialog="closeBoxDialog" />
          <!-- 踏青寻宝   活动特有  活动下线 删除-->
        </div>
        <div class="t-content"
          v-show="isTfStatus">
          <img src="./images/tf-task-bg.png"
            class="tf-task-bg">
        </div>
      </div>
    </sdk-tab-box>
    <common-pop title="温馨提示"
      @close="showzspop=false"
      btn-name="确定"
      v-if="showzspop"
      @besure="gotokf">
      <div class="common-pop-text"
        style="position: absolute;top:0;bottom: 0;left:0;right:0;margin: auto;line-height: 2.44rem">
        离开当前游戏 前往客服专区？
      </div>
    </common-pop>
    <!-- 人人中青渠道每日任务未完成情况点击弹出 -->
    <div class="rr-zq-mask"
      v-if="isRRZQPop">
      <div class="rr-zq-container">
        <img :src="quitConfig && quitConfig.taskImage | filter"
          class="wanliu">
        <a href="javascript:"
          class="rr-zq-close"
          @click.stop="closeRRZQPop"></a>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
import poplog from './poplog1'
export default {
  data () {
    return {
      newTaskItems: null,
      currentGamesItems: null,
      otherGamesItems: null,
      token: null,
      channel: null,
      userInfo: null,
      telFragment: null,
      awardItem: null,
      isPopLog: false,
      isNewTask: false,
      crushTaskList: null,
      currentMedalImg: '',
      showReceiveMedal: false,
      showMedalAnimate: false,
      currentMedalIndex: 0,
      receiveData: null,
      masterTask: false,
      currentGameType: 0,
      huafeiNum: 0,
      isTfStatus: false,
      showzspop: false,
      newUserTaskFinish: false,
      isRRZQPop: false,
      quitConfig: null,
      showBoxDialog: false, // 踏青寻宝   活动特有  活动下线 删除
      isDailyReceivePop: false,
      receiveAwards: {},
      selectItem: {},
      woolUserType: false,
      completeData: {}, // 魅族渠道新手完成活动 下线时清删除
      showWeekBetting: false,
      countdown: 5000,
      MasterCostDown: false
    }
  },
  mounted () {
    this.token = this.getUrlParam('token') ? this.getUrlParam('token') : localStorage.getItem('ACCESS_TOKEN')
    this.channel = this.getUrlParam('channel') ? this.getUrlParam('channel') : localStorage.getItem('APP_CHANNEL')
    this.currentGameType = this.getUrlParam('gametype')
    if (this.channel == '100047001' || this.channel == '100048001') {
      window.location.href = `https://wap.beeplaying.com/publicWap/taskgames.html?channel=${this.channel}&gametype=${this.currentGameType}`
      return
    }
    if (parent.loadTaksPage) {
      parent.loadTaksPage()
    }
    localStorage.setItem('ACCESS_TOKEN', this.token)
    localStorage.setItem('APP_CHANNEL', this.channel)
    this.init()
    this.getDegradeTaskStatus()
    this.getTransInfo()
    this.getPhoneFragment()
    this.getHuafeiNum()
    this.getCompleteData()
  },
  computed: {
    huafeiShow () {
      return this.telFragment && (this.telFragment[0].price.split('元')[0] < this.huafeiNum)
    },
    // 子任务
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
    // 母任务
    motherTask () {
      let list = this.newTaskItems && this.newTaskItems.taskList || []
      let motherTask = list.filter(item => {
        return item.subTask
      })[0]
      if (!this.newTaskItems.newVersion) {
        list = list.filter(item => {
          return !item.subTask
        })
      }
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
    // 显示大师任务
    showCrushMasterTask () {
      return this.crushTaskList && this.crushTaskList.achievementType == 1 && (this.crushTaskList.hasFinishedTask < this.crushTaskList.totalTask || this.currentMedalIndex == 3) && this.newTaskItems && !this.newTaskItems.isNew && GLOBALS.isWhiteUser
    },
    // 显示王者任务
    showKingTask () {
      return this.crushTaskList && this.crushTaskList.achievementType == 2 && !this.crushTaskList.lock && (this.crushTaskList.hasFinishedTask < this.crushTaskList.totalTask || this.currentMedalIndex == 3) && this.newTaskItems && !this.newTaskItems.isNew && GLOBALS.isWhiteUser
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
  filters: {
    formatTime (time) {
      let days = time / 1000 / 3600 / 24
      let day = Math.floor(days)
      let hours = Math.ceil((days - day) * 24)
      return `仅剩${day}天${hours}小时`
    },
    filter (url) {
      if (url && !url.includes('http')) {
        return '//file.beeplaying.com' + url
      } else {
        return url
      }
    }
  },
  components: {
    poplog,
    adventureTask: () => import('./component/adventureTask'),
    crushMasterTask: () => import('./component/crushMasterTask'),
    newUserTask: () => import('./component/newUserTask'),
    renrenMowang: () => import('./component/renrenMowang'),
    masterPop: () => import('./component/dialog'),
    commonPop: () => import('./component/commonPop'),
    boxDialog: () => import('./component/boxDialog'),
    kingTask: () => import('./component/kingTask'),
    sdkRecommend: () => import('./component/recommend'),
    dailyTaskReceivePop: () => import('./component/dailyTaskReceivePop'),
    sdkTabBox: () => import('./component/tabBox'),
    fixedEntrance: () => import('./component/fixedEntrance'),
    entranceHeader: () => import('./component/entranceHeader'),
    costDown: () => import('@/components/costDown/costDown')
  },
  methods: {
    initParentAd () {
      var iframeads = parent.document.querySelector('#iframe_ads')
      if (iframeads) {
        iframeads.parentNode.removeChild(iframeads)
      }
      var iframe = document.createElement('iframe')
      iframe.id = 'iframe_ads'
      iframe.name = 'iframe_ads'
      iframe.style.position = 'fixed'
      iframe.style.width = '100%'
      iframe.style.height = '100%'
      iframe.style.top = 0
      iframe.style.bottom = 0
      iframe.style.left = 0
      iframe.style.border = 'none'
      iframe.style.margin = 0
      iframe.style.padding = 0
      iframe.style['z-index'] = 10
      switch (this.channel) {
        case '100039':
        case '100042':
          iframe.src = 'https://wap.beeplaying.com/ads/bdAds.html'
          break
        case '100067':
          iframe.src = 'https://wap.beeplaying.com/ads/qttAds.html'
          break

        default:
          break
      }
      parent.document.body.appendChild(iframe)
    },
    init () {
      this.axios.post('//platform-api.beeplaying.com/wap/api/continuous/signIn/new/list')
        .then(res => {
          sessionStorage.removeItem('woolUserType')
          if (res.data.code == 200) {
            sessionStorage.woolUserType = res.data.data.userType
            this.woolUserType = this.channel === '100067' || (parseInt(sessionStorage.woolUserType || 0) && (this.channel === '100039' || this.channel === '100042')) || false
          }
        })
    },
    closeRRZQPop () {
      this.isRRZQPop = false
    },
    async jumpMine () {
      await GLOBALS.marchSetsPoint('A_H5PT0061000534', { project_id: this.currentGameType }) // H5平台-游戏内SDK-话费余额按钮
      let _url = '#/luckdraw'
      if (window.linkUrl.getBackUrlFlag(this.channel) === 'xmWap') {
        _url = '#/my'
      }
      parent.location.href = this.jumpToPlat() + _url
    },
    async getHuafeiNum () {
      let { data } = await this.axios.post('//trans-api.beeplaying.com/trans/api/fragment/getMinHFConvertAmount')
      this.huafeiNum = data.data
    },
    async gotokf () {
      await GLOBALS.marchSetsPoint('A_H5PT0061000536', { project_id: this.currentGameType }) // H5平台-游戏内SDK-客服前往-确定
      localStorage.setItem('originGame', parent.location.href)

      let _url = '#/problem?tab=contact_personal'
      if (window.linkUrl.getBackUrlFlag(this.channel) === 'xmWap') {
        _url = '#/my/customerService'
      }
      parent.location.href = window.linkUrl.getBackUrl(this.channel, '', '', false, _url)
    },
    async getCrushTask (finishindex, type, val, newuserfinish) {
      let { data } = await this.axios.post('//platform-api.beeplaying.com/task/api/usertask/achievementTask', { value: val })
      if (data.code == 200) {
        let showSubMasterList = [],
          crushList = data.data.list, currentParentTask, currentIndex,
          finishStatus = parseInt(finishindex) > -1 ? finishindex : -1,
          curType = type && type == 'checkMode'
        if (curType || finishStatus > -1) {
          currentParentTask = crushList[finishStatus]
        } else {
          currentParentTask = crushList.find((item, index) => {
            if (index < 3) {
              // 此处逻辑是领取当前最后一个子任务后，停留在当前子任务
              return item.parentTask.taskStatus == 1
            } else {
              return crushList[index]
            }
          })
        }
        crushList.map((item, index) => {
          if (item.parentTask.taskId == currentParentTask.parentTask.taskId) {
            currentIndex = index
            return
          }
        })
        let currentLength = currentParentTask.subListA.length + currentParentTask.subListB.length
        let finishLength = 0
        currentParentTask.subListA.map(item => {
          item.taskStatus == 2 ? finishLength += 1 : ''
        })
        currentParentTask.subListB.map(item => {
          item.taskStatus == 2 ? finishLength += 1 : ''
        })
        // 外显两条任务类型区分
        let type1 = currentParentTask.subListA.find(item => {
          return item.taskStatus != 2
        })
        let type2 = currentParentTask.subListB.find(item => {
          return item.taskStatus != 2
        })
        if (!type1) {
          type1 = currentParentTask.subListA[currentParentTask.subListA.length - 1]
        }
        if (!type2) {
          type2 = currentParentTask.subListB[currentParentTask.subListB.length - 1]
        }
        showSubMasterList.push(type1, type2)
        // 勋章List
        let medalList = []
        crushList.map((item, index) => {
          let list = {
            medalIcon: item.medalIcon,
            medalName: item.medalName,
            statusIcon: item.statusIcon,
            index: index,
            selected: false
          }
          medalList.push(list)
        })
        let checkMedalName
        if (!curType && currentIndex != 3 && currentParentTask.parentTask.taskStatus == 2) {
          checkMedalName = crushList[currentIndex + 1].medalName
        } else {
          checkMedalName = currentParentTask.medalName
        }
        medalList.map((val, index) => {
          if (val.medalName == checkMedalName) {
            val.selected = true
          } else {
            val.selected = false
          }
        })
        let crushTaskList = {
          showSubMasterList: showSubMasterList, // 外显子任务列表
          hasFinishedTask: data.data.hasFinishedTask, // 已完成任务数量
          totalTask: data.data.totalTask, // 总任务数量
          currentIndex: currentIndex, // 当前任务索引
          currentParentTask: currentParentTask, // 当前任务
          allTask: data.data.list, // 总任务列表
          finishLength: finishLength, // 当前已完成子任务
          currentLength: currentLength, // 当前总任务
          gameNameIcon: data.data.gameNameIcon, // 当前任务名称
          reward: data.data.reward, // 当前全部奖励
          bgIcon: data.data.bgIcon, // 当前任务背景
          medalList: medalList, // 勋章list
          lock: data.data.lock,
          achievementType: data.data.achievementType
        }
        this.crushTaskList = crushTaskList
      }
    },

    getDegradeTaskStatus () {
      this.axios.post('//platform-api.beeplaying.com/wap/api/degrade/task/status')
        .then(res => {
          if (res.data.code == 200) {
            this.isTfStatus = res.data.data.isOpen
            if (!this.isTfStatus) {
              this.getNewTask()
              this.getDayTask()
              if (this.checkCurrentTask() != '') {
                this.getCrushTask('', '', this.checkCurrentTask())
              }
            }
          }
        })
    },
    checkCurrentTask () {
      switch (this.currentGameType) {
        // 糖果
        case '12':
          return 'crush-king-achievement'
          break
        // 弹珠大师
        case '21':
          return 'marbles-achievement'
          break
        case '2':
          return 'bill-achievement'
          break
        // 捕鱼
        case '10':
          return 'fish-achievement'
          break
        case '5':
          return 'samguk-achievement'
          break
        case '8':
          return 'moto-achievement'
          break
        case '9':
          return 'kingdom-achievement'
          break
        case '13':
          return 'kingdom2-achievement'
          break
        case '18':
          return 'warrior-achievement'
          break
        default:
          return ''
      }
    },
    jumpToPlat () {
      return window.linkUrl.getBackUrl(this.channel)
    },
    checkTaskStatus (item, type, index) {
      switch (type) {
        case 'dayTask':
          GLOBALS.marchSetsPoint(item.flag && item.flag == 'ring2' ? 'A_H5PT0061001618' : 'A_H5PT0061001408', {
            position_id: index + 1,
            target_project_id: item.gameType,
            task_id: item.taskId,
            task_name: item.taskName
          })// H5平台-任务-每日任务-领取
          break
        case 'crush_task':
          GLOBALS.marchSetsPoint('A_H5PT0061000538', {
            project_id: item.gameType,
            target_project_id: item.gameType,
            task_id: item.taskId,
            task_name: item.taskName
          }) // H5平台-游戏内SDK-成就任务-去领取
          break
        case 'mother_crush_task':
          GLOBALS.marchSetsPoint('A_H5PT0061000538', {
            project_id: item.gameType,
            target_project_id: item.gameType,
            task_id: item.taskId,
            task_name: item.taskName
          }) // H5平台-游戏内SDK-成就任务-去领取
          break
        case 'newtask':
          GLOBALS.marchSetsPoint('A_H5PT0061000541', {
            project_id: item.gameType,
            target_project_id: item.gameType,
            task_id: item.taskId,
            task_name: item.taskName
          }) // H5平台-游戏内SDK-新人任务-去领取
          break
        default:
          break
      }
      if (item.taskStatus == 0) {
        localStorage.removeItem('ADSDATA')
        if ((this.woolUserType || item.action === 71) && type === 'dayTask' && !item.flag) {
          this.selectItem = { item, type, index }
          if (item.action === 71) {
            localStorage.removeItem('ENTRANCE')
            localStorage.setItem('ENTRANCE', '看视频任务')
          } else {
            localStorage.removeItem('ENTRANCE')
            localStorage.setItem('ENTRANCE', 'SDK内每日任务')
          }
          localStorage.setItem('ADSDATA', JSON.stringify(this.selectItem))
          // 为父窗口（游戏界面） 创建script
          try {
            this.initParentAd()
          } catch (error) {
            if (item.action === 71) {
              this.$toast.show({
                message: '广告填充中，请稍后再试',
                duration: 2000
              })
            } else {
              this.receive(item, type, index)
            }
          }
          return
        }
        this.receive(item, type, index)
      } else if (item.taskStatus == 1) {
        this.goFinishs(item, index, type)
      }
    },
    async goFinishs ({ gameType, url, action, taskId, taskName, flag }, index, type) {
      if (type == 'crush_task' || type == 'mother_crush_task') {
        GLOBALS.marchSetsPoint('A_H5PT0061000537', {
          project_id: gameType,
          target_project_id: gameType,
          task_id: taskId,
          task_name: taskName
        }) // H5平台-游戏内SDK-页面
      } else {
        GLOBALS.marchSetsPoint(flag && flag == 'ring2' ? 'A_H5PT0061001617' : 'A_H5PT0061000542', {
          position_id: index + 1,
          project_id: this.currentGameType,
          target_project_id: gameType,
          task_id: taskId,
          task_name: taskName
        }) // H5平台-游戏内SDK-每日任务-去完成
      }
      if (action == 72) {
        await this.axios.post('//platform-api.beeplaying.com/task/api/usertask/adTaskProcess', {
          value: taskId
        })
        await GLOBALS.marchSetsPoint('A_H5PT0142001564', { target_project_id: gameType, task_id: 2, task_name: '当前游戏每日任务列表', source_address: '当前游戏每日任务列表' })
        parent.location.href = `https://wap.beeplaying.com/activities/wfadver.html?adurl=${encodeURIComponent(url)}`
      }
      if (parent.closeTaksPage) {
        parent.closeTaksPage()
      }
    },
    getUrlParam: function (ename) {
      var url = window.location.href
      var Request = new Object()
      if (url && url.indexOf('?') != -1) {
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
    trimStr (str) {
      return str.replace(/(^\s*)|(\s*$)/g, '')
    },
    async goFinish ({ gameType, url, action, taskId, taskName }, type) {
      let actionsArr = [39, 35, 34, 32]
      if (type === 'newtask') {
        GLOBALS.marchSetsPoint('A_H5PT0061000540', {
          project_id: gameType,
          target_project_id: gameType,
          task_id: taskId,
          task_name: taskName
        }) // H5平台-游戏内SDK-新人任务-去完成
      } else if (type === 'dayTask') {
        GLOBALS.marchSetsPoint('A_H5PT0061000543', {
          project_id: this.currentGameType,
          target_project_id: gameType,
          task_id: taskId,
          task_name: taskName
        }) // H5平台-游戏内SDK-更多每日任务-去完成
        // 此处人人和中青调用的接口
        // if (localStorage.getItem('APP_CHANNEL') == '100049') {
        if (action == 72) {
          await this.axios.post('//platform-api.beeplaying.com/task/api/usertask/adTaskProcess', {
            value: taskId
          })
          await GLOBALS.marchSetsPoint('A_H5PT0142001564', { target_project_id: gameType, task_id: 2, task_name: '更多每日任务列表', source_address: '更多每日任务列表' })
          parent.location.href = `https://wap.beeplaying.com/activities/wfadver.html?adurl=${encodeURIComponent(url)}`
        } else {
          this.axios.post('//platform-api.beeplaying.com/wap/api/newUser/quit/config', {
            taskId: taskId
          }).then((res) => {
            if (res.data.code == 200) {
              this.quitConfig = res.data.data
              this.isRRZQPop = true
              return
            }
          })
        }
        // }
      } else if (type == 'new_user_task_fixed_entrance') {
        this.axios.post('//platform-api.beeplaying.com/wap/api/newUser/quit/config', {
          taskId: taskId
        }).then((res) => {
          if (res.data.code == 200) {
            this.quitConfig = res.data.data
            this.isRRZQPop = true
            GLOBALS.marchSetsPoint('A_H5PT0022001262')
            return
          }
        })
      }
      setTimeout(() => {
        // 跳转平台 并且弹出转盘
        if (url && url.indexOf('openturntable') > -1) {
          parent.location.href = url
          return false
        }
        if (url === 'openOneLottery') {
          this.backIndexPage(false, `#/?channel=${this.channel}&from=openOneLottery`)
          return
        }
        if (url === 'luckdraw') {
          this.backIndexPage(false, `#/luckdraw?channel=${this.channel}`)
          return
        }
        if (url === 'push_czhk') {
          this.backIndexPage(false, `#/?channel=${this.channel}&from=push_czhk`)
          return
        }
        // 跳转到首页（关闭）
        if (action == 36 || url == '/plat/') {
          this.backIndexPage()
          return
        }
        // 跳转商城
        if (gameType == 0 && actionsArr.includes(action)) {
          parent.location.href = 'https://wap.beeplaying.com/payment/#/mall'
          return
        }
        // 跳平台(关闭)
        if (gameType == 0 && action == 2) {
          // parent.location.href = 'https://wap.beeplaying.com/bdWap/?channel=100039'
          this.backIndexPage()
          return
        }
        // 跳转固定入口
        // if(url && url.indexOf('?fixedEntry') != -1) {
        //     let url1 = this.trimStr(url.replace('?fixedEntry','')) + '?channel=' + this.channel + '&opentoken=' + this.token;
        //     parent.location.href = url1;
        //     return;
        // }
        // // //其他外接游戏external=1
        // // if (url && url.indexOf('external=1') != -1) {
        // //   let gameUrl = this.trimStr(url) + '&channel=' + this.channel + '&token=' + this.token + '&gurl=' + url.split('?')[0] + '&pf=bdWap';
        // //   return parent.location.href = GLOBALS.jumpOutsideGame(url)
        // // }
        // // parent.location.href = 'https://wap.beeplaying.com' + url + '?channel=' + this.channel + '&token=' + this.token;
        // parent.location.href = GLOBALS.getJumpToGameUrl(url)
        if (url === 'prizesurvey') {
          if (window.linkUrl.getBackUrlFlag(localStorage.getItem('APP_CHANNEL')) == 'xmWap') {
            parent.location.href = 'https://wap.beeplaying.com/xmWap#/personalCenter/survey'
          } else {
            parent.location.href = 'https://wap.beeplaying.com/publicWap/personalCenter.html#/survey'
          }
          return
        }
        url && (parent.location.href = GLOBALS.getJumpToGameUrl(url))
      }, 500)
    },
    closePopLog (val) {
      this.showMedalAnimate = false
      this.showReceiveMedal = false
      this.isPopLog = false
      if (val == 'change') {
        // 显示获得勋章页
        setTimeout(() => {
          this.showReceiveMedal = true
        }, 0)
      } else if (val == 'showMedalAnimate') {
        setTimeout(() => {
          this.showMedalAnimate = true
        }, 0)
      } else if (val == 'showReceiveMedal') {
        setTimeout(() => {
          let medalList = {
            medalimg: this.currentMedalImg,
            showMedalImg: true
          }
          this.awardItem = medalList
          this.isPopLog = true
        }, 0)
      }
      if (val == 'reset') {
        this.newUserTaskFinish = false
        if (!this.crushTaskList) {
          this.goTask()
        }
      }
    },
    refreshTask (index, type, val) {
      this.getCrushTask(index, type, this.checkCurrentTask())
    },
    receive (item, type, index, medalimg, allFinish) {
      // console.log(index allFinish)
      // if(allFinish && index == 3) {
      //   this.currentMedalIndex = 0
      // }
      // return false
      this.showMedalAnimate = false
      this.axios.post(item.flag && item.flag == 'ring2' ? '//quoits-api.beeplaying.com/quoits/api/exchange' : '//platform-api.beeplaying.com/task/api/usertask/finish', item.flag && item.flag == 'ring2' ? { value: item.taskId } : {
        taskId: item.taskId,
        taskLogId: item.taskLogId
      }).then((res) => {
        if (res.data.code == 200) {
          // 弹窗弹出
          if (item.flag && item.flag == 'ring2') {
            item.awardsImage = res.data.data.awardsImg
            item.awardsNum = res.data.data.num
            item.flag = 'ring2'
          }
          this.awardItem = item
          this.getTransInfo()
          this.getPhoneFragment()
          switch (type) {
            case 'motherTask':
              this.newUserTaskFinish = true
              this.getNewTask()
              break
            case 'mother_crush_task':
            case 'crush_task':
              item.awardsFlag = type
              item.index = index
              item.medalimg = medalimg
              this.masterTask = true
              this.currentMedalImg = medalimg
              this.currentMedalIndex = index
              if (allFinish && index == 3) {
                this.currentMedalIndex = -1
              }
              this.getCrushTask(this.currentMedalIndex, '', this.checkCurrentTask())
              break
            case 'dayTask':
              this.getDayTask()
              break
            default:
              item.taskStatus = 2
          }
          if (res.data.data && res.data.data.awardsName) {
            if (item.flag && item.flag == 'ring2') {
              res.data.data.awardsImage = res.data.data.awardsImg
              res.data.data.awardsNum = res.data.data.num
              res.data.data.flag = 'ring2'
            }
            this.receiveAwards = res.data.data
            this.isDailyReceivePop = true
          } else {
            if (type == 'newtask') {
              this.isNewTask = true
            }
            // 踏青寻宝   活动特有  活动下线 删除
            if (type == 'dayTask' && item.awardsType == '32') {
              this.showBoxDialog = true
            } else {
              this.isPopLog = true
            }
            // 踏青寻宝   活动特有  活动下线 删除
          }
          this.getCompleteData()
        } else {
          this.$toast.show({
            message: res.data.message,
            duration: 1500
          })
        }
      })
    },
    getNewTask () {
      this.axios.post('//platform-api.beeplaying.com/task/api/newuser/task', {
        value: 'NewUserStairTask'
      }).then((res) => {
        if (res.data.data && res.data.data.isNew) {
          GLOBALS.marchSetsPoint('S_00000000000010', {
            project_id: this.currentGameType,
            target_project_id: this.currentGameType
          }) // H5平台-游戏内SDK-新人任务加载
        }
        if (res.data.code == 200) {
          this.newTaskItems = res.data.data
        }
        if (parent.LoadTaskFinish) {
          parent.LoadTaskFinish()
        }
      })
    },
    async getDayTask () {
      let arrring2 = []
      /**删除套圈任务**/
      // if (parent.location.href.includes('ring2')) {
      //   let { data: dataA } = await this.axios.post('//quoits-api.beeplaying.com/quoits/api/exchange/list')
      //   if (dataA.code == 200) {
      //     dataA.data.awardsList.map(item => {
      //       arrring2.push({
      //         'taskId': item.amount, 'taskName': item.description, 'gameType': this.currentGameType, 'taskDesc': item.description, 'icon': item.icon, 'taskOps': item.costNum, 'finishNum': item.currNum, 'taskStatus': item.costNum <= item.currNum ? 0 : 1, 'taskLogId': item.amount, 'cycle': 0, 'awardsType': 0, 'awardsName': item.awardsName, 'url': null, 'awardsImage': item.awardsImg, 'taskDescShow': item.description, 'awardsNum': 0, 'taskType': 0, 'subTask': '', 'preTask': null, 'action': 0, 'sort': 0, flag: 'ring2'
      //       })
      //     })
      //   }
      // }
      let { data: dataWeekBetting } = await this.axios.post('//platform-api.beeplaying.com/task/api/activity/week/task/info')
      if (dataWeekBetting.code == 200 && dataWeekBetting.data.openFlag) {
        this.showWeekBetting = true
      }
      if (this.showWeekBetting) {
        this.currentGamesItems = arrring2
        return
      }
      let { data } = await this.axios.post('//platform-api.beeplaying.com/task/api/usertask/platTaskByBatch', {
        value: 'dayTask',
        from: 'sdk',
        gameType: this.currentGameType
      })
      if (data.code == 200) {
        this.currentGamesItems = [...arrring2, ...data.data.filter((item) => {
          return (item.gameType == this.getUrlParam('gametype') && item.taskStatus != 2)
        })]
        if (this.currentGamesItems.filter(item => item.action == 72).length) {
          GLOBALS.marchSetsPoint('A_H5PT0142001563', { target_project_id: this.getUrlParam('gametype'), task_id: 2, task_name: '当前游戏每日任务列表', source_address: '当前游戏每日任务列表' })
        }
        this.otherGamesItems = data.data.filter((item) => {
          return (item.gameType != this.getUrlParam('gametype'))
        })
        if (this.otherGamesItems.filter(item => item.action == 72).length) {
          GLOBALS.marchSetsPoint('A_H5PT0142001563', { target_project_id: this.getUrlParam('gametype'), task_id: 2, task_name: '更多每日任务列表', source_address: '更多每日任务列表' })
        }
      }
    },
    getTransInfo () {
      this.axios.post('//uic-api.beeplaying.com/uic/api/user/login/transInfo').then((res) => {
        if (res.data.code == 200) {
          this.userInfo = res.data.data
        }
      })
    },
    getPhoneFragment () {
      this.axios.post('//trans-api.beeplaying.com/trans/api/fragment/richAndconvertList', {
        page: 1,
        pageSize: 10
      }).then((res) => {
        if (res.data.code == 200) {
          this.telFragment = res.data.data.filter((item) => {
            return item.fragmentId == 7
          })
          GLOBALS.marchSetsPoint('P_H5PT0061', { project_id: this.currentGameType, residual_phone: this.telFragment[0].price.split('元')[0] }) // H5平台-游戏内SDK-页面
        }
      })
    },
    backIndexPage (isAddChannel = true, param) { // 回到平台首页
      // if (parent.CONFIG && parent.CONFIG.onBackHome) { // cocos返回大厅的方法
      //   parent.CONFIG.onBackHome()
      // } else {
      parent.location.href = window.linkUrl.getBackUrl(this.channel, '', false, isAddChannel, param)
      // }
    },
    kfclick () {
      GLOBALS.marchSetsPoint('A_H5PT0061000535', { project_id: this.currentGameType }) // H5平台-游戏内SDK-客服按钮
      this.showzspop = true
    },
    goTask () {
      parent.location.href = window.linkUrl.getBackUrl(this.channel, '', '', true, '#/taskview')
    },
    closeNewUser () {
      if (parent.closeTaksPage) {
        parent.closeTaksPage()
      } else {
        console.log('没有找到closeTaksPage')
      }
    },
    closeBoxDialog () {
      this.showBoxDialog = false
    },
    closeDailyReceivePop () {
      this.isDailyReceivePop = false
    },
    closeFixedEntrance () {
      this.getTransInfo()
      this.getPhoneFragment()
    },
    kickegg (url) {
      if (parent.closeTaksPage) {
        parent.closeTaksPage()
        parent.GameEval('openweb', `${url}?channel=${this.channel}&token=${this.token}&gametype=${this.currentGameType}&isneedpayback=1&vt=${new Date().getTime()}`)
      }
    },
    // 魅族渠道新手完成活动 下线时清删除
    getCompleteData () {
      this.axios.post('//ops-api.beeplaying.com/ops/api/new-user-jackpot/user-info').then(res => {
        let { code, data } = res.data
        if (code === 200) {
          this.completeData = data
        }
      })
    },
    completeClick () {
      if (this.completeData.userTaskFinishAll) {
        parent.window.location.href = 'https://wap.beeplaying.com/xmWap/#/task'
        return false
      }
      parent.closeTaksPage()
    },
    // 魅族渠道新手完成活动 下线时清删除
    gotoweekbetting () {
      parent.location.href = '//wap.beeplaying.com/activities/weekbetting.html?vt=' + new Date().getTime()
    },
    masterTaskStatus (status) {
      this.MasterCostDown = status
    }
  }
}
</script>
<style lang="less" scoped>
@import "../../common/css/base.css";
@import "./index";
.wrap {
  position: relative;
}
.rr-zq-mask {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  position: fixed;
  left: 0;
  top: 0;
  z-index: 10;
  overflow: auto;
  .rr-zq-container {
    width: 3.88rem;
    position: relative;
    top: 15%;
    margin: 0 auto;
  }
  .wanliu {
    width: 100%;
  }
  .rr-zq-close {
    width: 0.7rem;
    height: 0.7rem;
    position: absolute;
    right: 0;
    top: 0;
  }
}
.huafeifont,
.figure {
  color: #ffd338;
}
.figure {
  display: inline-block;
  position: relative;
  padding-left: 0.5rem;
  margin-top: 0.03rem;
  margin-left: 0.05rem;
  font-size: 0.16rem;
  height: 0.4rem;
  line-height: 0.46rem;
  img {
    position: absolute;
    left: 0;
    width: 0.47rem;
    height: 0.38rem;
  }
  animation: touch 0.8s ease-in-out alternate infinite;
}
.tf-task-bg {
  width: 3.63rem;
  height: 3.71rem;
  display: block;
  margin: 2.1rem auto 0;
}
@keyframes touch {
  0% {
    transform: translateX(-0.2rem);
  }
  100% {
    transform: translateX(0);
  }
}
</style>
