<template>
  <div class="task-games">
    <div class="header">
      <ul>
        <li class="leaf">{{userInfo&&userInfo.amount}}</li>
        <li class="hf-fragment" v-if="telFragment" @click= "jumpMine">{{telFragment&&telFragment[0].price}}
          <i :class="{'huafeifont':!huafeiShow}">{{huafeiShow ? '（满'+huafeiNum+'可领）':'点击领取'}}</i> 
      </li>
      <p class="figure" v-if="!huafeiShow">
          <img src="./images/fighur.png" class="touch">
          快去领！</p>
        <p class="figure1" style="display: inline-block;position: absolute;right:.2rem;top: 0.15rem;" @click="kfclick">
          <img src="./images/kf.png" style="width: .52rem;height: .52rem"></p>
      </ul>
    </div>

    <div class="t-content" v-if="!isTfStatus">
      <div v-if="newTaskItems && newTaskItems.isNew">
          <div class="new-task-header">
            <div class="new-task-inner">
                <h4 class="h-title h-new-title icon-tips">
                  <p class="h-subtitle">
                    <img src="./images/xr-icon.png" class="xr-icon">
                    <img src="./images/small-xs-tips.png" class="small-xs-tips">
                  </p>
                  <div class="text"><img src="./images/cloak.png">{{newTaskItems.countDown | formatTime}}</div>
                </h4>
                <div class="newTask"  v-if="motherTask&&(motherTask.hasFinishedNum != motherTask.allTaskNum)">全部完成<span>再得30元话费</span>
                    <ul >
                      <li class="percent-lq">
                        <div class="percent-box">
                              <div class="text">{{motherTask.hasFinishedNum}}/{{motherTask.allTaskNum}}</div>
                              <em :style="{width: motherTask.hasFinishedNum/motherTask.allTaskNum * 100 + '%' }"></em>
                          </div>
                          <span v-show="newTaskItems.receiverCounter">已有{{newTaskItems.receiverCounter}}人领取</span>
                      </li>
                    </ul>
                </div>
                  <div class="newTask" v-else>恭喜！新人任务已全部完成！</div>
              </div>
          </div>
          
          <div v-if="motherTask.hasFinishedNum != motherTask.allTaskNum">
            <ul class="t-items">
              <li >
                <div :class="{'actived': newUserTaskobj.taskStatus == 2}">
                  <div class="pic">
                    <img :src="newUserTaskobj.icon | filter" alt="">
                    <span  class="label">任务{{motherTask.hasFinishedNum + 1}}</span>
                  </div>
                  <div class="item-text">
                    <p class="title" v-html="newUserTaskobj.taskName"></p>
                    <div class="percent-container">
                      <div class="percent-box">
                          <div class="text">{{newUserTaskobj.finishNum}}/{{newUserTaskobj.taskOps}}</div>
                          <em :style="{width:newUserTaskobj.finishNum/newUserTaskobj.taskOps * 100 + '%'}"></em>
                      </div>
                      <span class="item-award"><i><img :src="newUserTaskobj.awardsImage | filter" alt="">{{newUserTaskobj.awardsName}}</i></span>
                    </div>
                  </div>
                </div>
                <p class="btn-box">
                    <a href="javascript:" class="btn btn-receive" v-if="newUserTaskobj.taskStatus == 0" @click="receive(newUserTaskobj, 'newtask')">领取</a>
                    <a href="javascript:" class="btn btn-play" v-if="newUserTaskobj.taskStatus == 1" @click="goFinish(newUserTaskobj)">去完成</a>
                    <a href="javascript:" class="btn btn-gray" v-if="newUserTaskobj.taskStatus == 2">已领取</a>
                </p>
              </li>
            </ul>
          </div>
          <div v-else>
              <ul class="finish">
                <li>
                      <div class="head-img">
                        <img src="./images/signIn-icon.png" alt="">
                    </div>
                      <div class="f-content">
                        <p>快领取话费奖励吧</p>
                        <p>{{motherTask.awardsName}}</p>
                    </div>
                </li>
                <li @click="receive(motherTask,'motherTask')">领取</li>
            </ul>
          </div>
      </div>

      <!-- 糖果大师任务 -->
      <crush-master-task v-if="crushTaskList && (crushTaskList.hasFinishedTask < crushTaskList.totalTask || currentMedalIndex == 3) && !newTaskItems.isNew"
      :crushTaskList="crushTaskList" @receive="receive" :showReceiveMedal="showReceiveMedal" :showMedalAnimate="showMedalAnimate" 
      :currentMedalIndex="currentMedalIndex" @checkTaskStatus="checkTaskStatus" @hideMedalAnimate="showMedalAnimate = false" :currentGameType="currentGameType"
      @refreshTask="refreshTask"></crush-master-task>
      <div v-if="currentGamesItems&&currentGamesItems.length">
        <h4 class="h-title h-first-title">当前游戏每日任务</h4>
        <ul class="t-items">
          <li v-for="item in currentGamesItems">
            <div :class="{'actived': item.taskStatus == 2}">
              <div class="pic">
                <img :src="item.icon | filter" alt="">
              </div>
              <div class="item-text">
                <p class="title" v-html="item.taskDescShow"></p>
                <div class="percent-container">
                  <div class="percent-box">
                      <div class="text">{{item.finishNum}}/{{item.taskOps}}</div>
                      <em :style="{width:item.finishNum/item.taskOps * 100 + '%'}"></em>
                  </div>
                  <span class="item-award"><i><img :src="item.awardsImage | filter" alt="">{{item.awardsName}}</i></span>
                </div>
              </div>
            </div>
            <p class="btn-box">
              <a href="javascript:" class="btn btn-receive" v-if="item.taskStatus == 0" @click="receive(item,'dayTask')">领取</a>
              <a href="javascript:" class="btn btn-play" v-if="item.taskStatus == 1" @click="goFinishs">去完成</a>
              <a href="javascript:" class="btn btn-gray" v-if="item.taskStatus == 2">已领取</a>
            </p>
          </li>
        </ul>
      </div>
      
      <div v-if="otherGamesItems">
        <!-- 其他任务 -->
        <h4 class="h-title h-third-title">更多每日任务</h4>
        <ul class="t-items">
          <li v-for="item in otherGamesItems" >
            <div :class="{'actived': item.taskStatus == 2}">
              <div class="pic">
                <img :src="item.icon | filter" alt="">
              </div>
              <div class="item-text">
                <p class="title" v-html="item.taskDescShow"></p>
                <div class="percent-container">
                  <div class="percent-box"  :class="{'bigNum': item.taskOps > 10000}">
                      <div class="text">{{item.finishNum}}/{{item.taskOps}}</div>
                      <em :style="{width:item.finishNum/item.taskOps * 100 + '%'}"></em>
                  </div>
                  <span class="item-award"><i><img :src="item.awardsImage | filter" alt="">{{item.awardsName}}</i></span>
                </div>
              </div>
            </div>
            <p class="btn-box">
              <a href="javascript:" class="btn btn-receive" v-if="item.taskStatus == 0" @click="receive(item,'dayTask')">领取</a>
              <a href="javascript:" class="btn btn-play" v-if="item.taskStatus == 1" @click="goFinish(item)">去完成</a>
              <a href="javascript:" class="btn btn-gray" v-if="item.taskStatus == 2" @click="goFinish(item)">已完成</a>
              <span class="in-game" v-if="item.taskStatus == 2">点击可进入</span>
            </p>
          </li>
        </ul>
      </div>

      <poplog v-if="isPopLog" @close="closePopLog" :crushTaskList="crushTaskList" 
      :awardItem="awardItem" :motherTask="motherTask" :isNewTask="isNewTask" :masterTask="masterTask"></poplog>
      
    </div>

    <div class="t-content"  v-show="isTfStatus">
      <img src="./images/tf-task-bg.png" class="tf-task-bg">
    </div>
    <common-pop title="温馨提示" @close="showzspop=false"  btn-name="确定" v-if="showzspop" @besure="gotokf">
      <div class="common-pop-text" style="position: absolute;top:0;bottom: 0;left:0;right:0;margin: auto;line-height: 2.44rem">
        离开当前游戏 前往客服专区？
      </div>
    </common-pop>
    <div class="newUser" v-if="showNewUser">
      <div class="mask"></div>
      <div class="content" @click.stop.prevent="closeNewUser">
        <div class="tips">
          <img src="./images/people.png" alt="">
          <p>点击任意区域继续您的新手引导</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
  import poplog from './poplog'
  import common from "../../common/js/utils";
  export default {
    data() {
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
            crushTaskList : null,
            currentMedalImg : '',
            showReceiveMedal :false,
            showMedalAnimate :false,
            currentMedalIndex : 0,
            receiveData : null,
            masterTask : false,
            currentGameType : 0,
            huafeiNum : 0,
            isTfStatus: false,
            showzspop:false
        }
    },
    mounted() {
        if(parent.loadTaksPage) {
            parent.loadTaksPage()
        }
        this.token = this.getUrlParam('token') ? this.getUrlParam('token') :localStorage.getItem('ACCESS_TOKEN')
        this.channel =  this.getUrlParam('channel') ? this.getUrlParam('channel') : localStorage.getItem('APP_CHANNEL')
        this.currentGameType = this.getUrlParam('gametype')
        localStorage.setItem('ACCESS_TOKEN', this.token)
        localStorage.setItem('APP_CHANNEL', this.channel)
        this.getDegradeTaskStatus()
        this.getTransInfo()
        this.getPhoneFragment()
        this.getHuafeiNum()
        
    //   if(this.currentGameType == 12) 
    },
    computed: {
        huafeiShow(){
            return this.telFragment&&(this.telFragment[0].price.split('元')[0] < this.huafeiNum)
        },

        // 子任务
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
        },
        // 母任务
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
        showNewUser () {
          let isShow = this.getUrlParam('isNewUser')
          if(isShow!='undefined'){
            if (isShow == 'true') {
              return true
            }
            return false
          }
        }

    },
    filters:{
        formatTime (time) {
            let days = time / 1000 / 3600 / 24
            let day = Math.floor(days)
            let hours = Math.ceil((days-day) * 24)
            return `仅剩${day}天${hours}小时`
        },
        filter(url) {
          if (url && !url.includes('http')) {
              return '//file.beeplay123.com' + url
          } else {
              return url
          }
        }
    },
    components: {
        poplog,
        crushMasterTask : ()=>import('./component/crushMasterTask'),
        masterPop :() =>import('./component/dialog'),
        commonPop:()=>import("./component/commonPop"),
    },
    methods: {
        getDegradeTaskStatus() {
          this.axios.post('//platform-api.beeplay123.com/wap/api/degrade/task/status')
                .then(res => {
                  if(res.data.code == 200) {
                    this.isTfStatus = res.data.data.isOpen
                    if(!this.isTfStatus) {
                        this.getDayTask()
                        this.getNewTask()
                        if(this.checkCurrentTask() != ''){
                            this.getCrushTask('','',this.checkCurrentTask())
                        }
                    }
                  }
                })
        },
        checkCurrentTask(){
            switch(this.currentGameType){
                // 糖果
                case '12' : 
                    GLOBALS.buriedPoint(1210040820,"H5平台-游戏内任务页-糖果成就任务加载成功");
                    return 'crush-achievement';
                    break;
                // 桌球
                case '2': 
                    GLOBALS.buriedPoint(1210040830,"H5平台-游戏内任务页-桌球成就任务加载成功");
                    return 'bill-achievement';
                    break;
                // 捕鱼
                case '10': 
                    GLOBALS.buriedPoint(1210040840,"H5平台-游戏内任务页-捕鱼成就任务加载成功");
                    return 'fish-achievement';
                    break;
                case '5':
                    return 'samguk-achievement';
                    break;
                case '8':
                    return 'moto-achievement';
                    break;
                case '9':
                    return 'kingdom-achievement';
                    break;
                case '13':
                    return 'kingdom2-achievement';
                    break;
                case '18':
                    return 'warrior-achievement';
                    break;
                default : 
                    return ''
            }
        },
        jumpMine(){
            parent.location.href = this.jumpToPlat()+'#/personal'
        },
        jumpToPlat(){
            let baiduChannel = ['100039','100040','100041','100042','100045','100046',
                    '100001','100022','100023','100026','100028','100027','100029','100035','100036','100038', '100006','100049']
            if(baiduChannel.includes(this.channel)){
                return `https://wap.beeplay123.com/bdWap?channel=${this.channel}`
            } else if(this.channel == '700002'){
                return `https://wap.beeplay123.com/llwWap?channel=700002`
            } else if(this.channel=='100047001' || this.channel=='100048001') {
                return `https://wap.beeplay123.com/miniWap?channel=${this.channel}`
            }else{
               return `https://wap.beeplay123.com/wap/home?channel=${this.channel}`
            }
        },
        async getHuafeiNum(){
            let {data:data} = await this.axios.post('//trans-api.beeplay123.com/trans/api/fragment/getMinHFConvertAmount')
            this.huafeiNum = data.data 
        },
        checkTaskStatus(item,type,index){
            if(item.taskStatus == 0){
                this.receive(item,type,index)
            }else if(item.taskStatus == 1){
                this.goFinishs(item,type)
            }
        },
        goFinishs({gameType, url, action, taskId},type) {
            if(type == 'crush_task' || type == 'mother_crush_task'){
                GLOBALS.buriedPoint(1210040825, 'H5平台-游戏内成就任务页-去完成', gameType,null,{taskId:taskId}) //事件ID 事件名称 游戏ID 游戏位置
            }
            if(parent.closeTaksPage) {
                parent.closeTaksPage()
            }
        },
        //获取地址栏问号后面的参数值
        getUrlParam: function (ename) {
            var url = window.location.href;
            var Request = new Object();
            if (url && url.indexOf("?") != -1) {
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
        trimStr(str) {
            return str.replace(/(^\s*)|(\s*$)/g, "")
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

                // // 球酷
                // if (url && url.indexOf('databiger-h5') != -1) {
                //     let gameUrl = this.trimStr(url) + '?channel=' + this.channel + '&token=' + this.token
                //     return parent.location.href = gameUrl
                // }
                // //其他外接游戏external=1
                // if (url && url.indexOf('external=1') != -1) {
                //     let gameUrl = this.trimStr(url) + '&channel=' + this.channel + '&token=' + this.token + '&gurl=' + url.split('?')[0] + '&pf=bdWap';
                //     return parent.location.href = gameUrl
                // }
                // parent.location.href = 'https://wap.beeplay123.com' + url + '?channel=' + this.channel + '&token=' + this.token;
                parent.location.href=common.jumpToGameUrl({url:url})
            }, 500)

            
        },
        closePopLog(val) {
            this.showMedalAnimate = false
            this.showReceiveMedal = false
            this.isPopLog = false
            if(val == 'change'){
                // 显示获得勋章页
                setTimeout(() => {
                    this.showReceiveMedal = true
                }, 0);
            }else if(val == 'showMedalAnimate'){
                setTimeout(() => {
                    this.showMedalAnimate = true
                }, 0);
            }else if(val == 'showReceiveMedal'){
                setTimeout(() => {
                    let medalList = {
                        medalimg : this.currentMedalImg,
                        showMedalImg: true
                    }
                    this.awardItem = medalList
                    this.isPopLog = true
                }, 0);
            }
            
        },
        refreshTask(index,type,val){
            this.getCrushTask(index,type,this.checkCurrentTask())
        },
        receive(item, type,index,medalimg) {
            this.showMedalAnimate = false
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
            }).then((res)=> {
            if(res.data.code == 200) {
                if(type == 'newtask') {
                    this.isNewTask = true
                }
                
                // 弹窗弹出
                this.awardItem = item
                this.isPopLog = true

                this.getTransInfo()
                this.getPhoneFragment()
                switch(type) {
                    case 'motherTask':
                        this.$toast.show({
                            message: '领取成功',
                            duration: 1500
                        })
                        this.getNewTask()
                        break;
                    case 'mother_crush_task':
                    case 'crush_task':
                        this.masterTask = true
                        this.currentMedalImg = medalimg
                        this.currentMedalIndex = index
                        this.getCrushTask(this.currentMedalIndex,'',this.checkCurrentTask())
                        break
                    case 'dayTask' : 
                        this.getDayTask()
                        break
                    default:
                        item.taskStatus = 2
                }

            }
            })
        },
        getNewTask() {
            this.axios.post('//platform-api.beeplay123.com/task/api/usertask/platNewUserStairTask', {
                value: 'NewUserStairTask'
            }).then((res)=> {
                if(res.data.code == 200) {
                this.newTaskItems = res.data.data
                }

                if(parent.LoadTaskFinish) {
                parent.LoadTaskFinish()
                }
            })
        },
        getDayTask() {
            this.axios.post('//platform-api.beeplay123.com/task/api/usertask/platTaskByBatch', {
                value: 'dayTask',
                from:'sdk',
                gameType:this.currentGameType
            }).then((res)=> {
            if(res.data.code == 200) {

                this.currentGamesItems = res.data.data.filter((item)=> {
                    return (item.gameType == this.getUrlParam('gametype') && item.taskStatus != 2)
                })
                this.otherGamesItems = res.data.data.filter((item)=> {
                    return (item.gameType != this.getUrlParam('gametype'))
                })

            }
            })
            
        },
        getTransInfo() {
            this.axios.post('//uic-api.beeplay123.com/uic/api/user/login/transInfo').then((res)=> {
            if(res.data.code == 200) {
                this.userInfo = res.data.data
            }
            })
        },
        getPhoneFragment() {
            this.axios.post('//trans-api.beeplay123.com/trans/api/fragment/richAndconvertList', {
            page: 1,
            pageSize: 10,
            }).then((res)=> {
            if(res.data.code == 200) {
                this.telFragment = res.data.data.filter((item)=> {
                return item.fragmentId == 7
                })
            }
            })
            
        },
        async getCrushTask(finishindex,type,val){
            let {data:data} = await this.axios.post('//platform-api.beeplay123.com/task/api/usertask/achievementTask', {value:val})
            if(data.code == 200){
                    let showSubMasterList = [],crushList = data.data.list,currentParentTask,currentIndex,
                        finishStatus = parseInt(finishindex) > -1 ? finishindex : -1,
                        curType = type && type == 'checkMode'
                        
                    if(curType || finishStatus > -1){
                        currentParentTask = crushList[finishStatus]
                    }else{
                        currentParentTask = crushList.find((item,index) =>{
                            if(index < 3){
                                // 此处逻辑是领取当前最后一个子任务后，停留在当前子任务
                                return item.parentTask.taskStatus == 1 
                            }else{
                                return crushList[index]
                            }
                        })
                    }
                    crushList.map((item,index) =>{
                        
                        if(item.parentTask.taskId == currentParentTask.parentTask.taskId){
                            currentIndex = index
                            return
                        }
                    })
                    let currentLength = currentParentTask.subListA.length + currentParentTask.subListB.length,
                        finishLength = 0
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
                    if(!type1){
                        type1 = currentParentTask.subListA[currentParentTask.subListA.length-1]
                    }
                    if(!type2){
                        type2 = currentParentTask.subListB[currentParentTask.subListB.length-1]
                    }
                    
                    showSubMasterList.push(type1,type2)

                    // 勋章List
                    let medalList = []
                    crushList.map((item,index) => {
                        let list = {
                            medalIcon : item.medalIcon,
                            medalName : item.medalName,
                            statusIcon : item.statusIcon,
                            index: index,
                            selected : false
                        }
                        medalList.push(list)
                    })
                    
                    let checkMedalName
                    if(!curType && currentIndex !=3 && currentParentTask.parentTask.taskStatus == 2){
                        checkMedalName = crushList[currentIndex+1].medalName
                    }else{
                        checkMedalName = currentParentTask.medalName
                    }
                    
                    medalList.map((val,index) =>{
                        if(val.medalName == checkMedalName){
                            val.selected = true
                        }else{
                            val.selected = false
                        }
                    })

                    let crushTaskList = {
                        showSubMasterList : showSubMasterList, //外显子任务列表
                        hasFinishedTask : data.data.hasFinishedTask, // 已完成任务数量
                        totalTask : data.data.totalTask, // 总任务数量
                        currentIndex : currentIndex, // 当前任务索引
                        currentParentTask : currentParentTask, // 当前任务
                        allTask : data.data.list,// 总任务列表
                        finishLength : finishLength, // 当前已完成子任务
                        currentLength : currentLength, // 当前总任务
                        gameNameIcon : data.data.gameNameIcon, // 当前任务名称
                        reward : data.data.reward, // 当前全部奖励
                        bgIcon : data.data.bgIcon, // 当前任务背景
                        medalList : medalList , //勋章list
                    }
                    this.crushTaskList = crushTaskList
                }
            
        },
        kfclick(){
          this.showzspop=true
        },
        gotokf(){
          let jsChannel = ['100001','100023','100027','100026','100028','100029','100022','100035','100036','100038','100006','100016'],
            baiduChannel = ['100039','100040','100041','100042','100049']
          if(jsChannel.includes(this.channel)){
            parent.location.href = `https://wap.beeplay123.com/bdWap/#/problem?tab=contact_personal&channel=${this.channel}`
          }else if(baiduChannel.includes(this.channel)){
            parent.location.href = `https://wap.beeplay123.com/bdWap/#/problem?tab=contact_personal&channel=${this.channel}`
          }else if(this.channel=='100047001' || this.channel=='100048001') {
            parent.location.href = `https://wap.beeplay123.com/miniWap/#/problem?tab=contact_personal&channel=${this.channel}`
          } else if(this.channel == '700002'){
            parent.location.href = `https://wap.beeplay123.com/llwWap?tab=contact_personal&channel=700002`
          }else{
            parent.location.href = `https://wap.beeplay123.com/wap/home/#/problem?tab=contact_personal&channel=${this.channel}`
          }
        },
        closeNewUser () {
          
          if(parent.closeTaksPage) {
              parent.closeTaksPage()
          }else{
            console.log('没有找到closeTaksPage');
          }
        }
    },
    watch:{
        crushTaskList(){}
    }
  }
</script>
<style lang="less" scoped>
@import '../../common/css/base.css';
@import './index';
.huafeifont,.figure{color: #FFD338}
.figure{
    display: inline-block;
    position: relative;
    padding-left: .5rem;
    margin-top: .03rem;
    margin-left: .05rem;
    font-size: .16rem;
    height: .4rem;
    line-height: .46rem;
    img{
        position: absolute;
        left: 0;
        width: .47rem;
        height: .38rem;
        
    }
    animation: touch .8s ease-in-out alternate infinite;
}
.tf-task-bg {
  width: 3.63rem;
  height: 3.71rem;
  display: block;
  margin: 2.1rem auto 0;
}
@keyframes touch {
    0%{
        transform : translateX(-.2rem) 
    }
    100%{
        transform : translateX(0) 

    }
}
</style>
