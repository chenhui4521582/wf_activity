<template>
  <div class="task-games">
     <div class="header">
       <ul>
         <li class="leaf">{{userInfo&&userInfo.amount}}</li>
         <li class="hf-fragment">{{telFragment&&telFragment[0].price}}</li>
       </ul>
     </div>


     <div class="t-content" >
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
                  <div class="newTask"  v-if="motherTask&&(motherTask.hasFinishedNum != motherTask.allTaskNum)">完成任务必得<span>30元话费</span>
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
        :currentMedalIndex="currentMedalIndex" @checkTaskStatus="checkTaskStatus" @hideMedalAnimate="showMedalAnimate = false"></crush-master-task>
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
                <a href="javascript:" class="btn btn-receive" v-if="item.taskStatus == 0" @click="receive(item)">领取</a>
                <a href="javascript:" class="btn btn-play" v-if="item.taskStatus == 1" @click="goFinishs">去完成</a>
                <a href="javascript:" class="btn btn-gray" v-if="item.taskStatus == 2">已领取</a>
              </p>
            </li>
          </ul>
        </div>
        
        <div v-if="otherGamesItems">
          <!-- 其他任务 -->
          <h4 class="h-title h-third-title">其他任务</h4>
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
                <a href="javascript:" class="btn btn-receive" v-if="item.taskStatus == 0" @click="receive(item)">领取</a>
                <a href="javascript:" class="btn btn-play" v-if="item.taskStatus == 1" @click="goFinish(item)">去完成</a>
                <a href="javascript:" class="btn btn-gray" v-if="item.taskStatus == 2">已领取</a>
              </p>
            </li>
          </ul>
        </div>

        <poplog v-if="isPopLog" @close="closePopLog" :crushTaskList="crushTaskList" 
        :awardItem="awardItem" :motherTask="motherTask" :isNewTask="isNewTask" :masterTask="masterTask"></poplog>
        
     </div>
  </div>
</template>
<script type="text/javascript">
  import poplog from './poplog'
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
            masterTask : false
        }
    },
    mounted() {
      if(parent.loadTaksPage) {
        parent.loadTaksPage()
      }
      this.token = this.getUrlParam('token') ? this.getUrlParam('token') :localStorage.getItem('ACCESS_TOKEN')
      this.channel =  this.getUrlParam('channel') ? this.getUrlParam('channel') : localStorage.getItem('APP_CHANNEL')

      localStorage.setItem('ACCESS_TOKEN', this.token)
      localStorage.setItem('APP_CHANNEL', this.channel)

      this.getTransInfo()
      this.getDayTask()
      this.getNewTask()
      this.getPhoneFragment()
      if(this.getUrlParam('gametype') == 12) this.getCrushTask()
    },
    computed: {
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
    },
    methods: {
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
                "project_id": gameType
            })
            

            setTimeout(() => {

                // 跳转到首页（关闭）
                if(action == 36) {
                    parent.location.href = 'https://wap.beeplay123.com/bdWap/?channel=100039'
                    return
                }
                // 跳转商城
                if (gameType == 0 && actionsArr.includes(action)) {
                    parent.location.href = 'https://wap.beeplay123.com/payment/#/mall'
                    return
                }
                // 跳平台(关闭)
                if (gameType == 0 && action == 2) {
                    parent.location.href = 'https://wap.beeplay123.com/bdWap/?channel=100039'
                    return
                }
                // 跳转固定入口
                if(url && url.indexOf('?fixedEntry') != -1) {
                    let url1 = this.trimStr(url.replace('?fixedEntry','')) + '?channel=' + this.channel + '&token=' + this.token;
                    window.location.href = url1;
                    return;
                }

                // 球酷
                if (url && url.indexOf('databiger-h5') != -1) {
                    let gameUrl = this.trimStr(url) + '?channel=' + this.channel + '&token=' + this.token
                    return parent.location.href = gameUrl
                }
                //其他外接游戏external=1
                if (url && url.indexOf('external=1') != -1) {
                    let gameUrl = this.trimStr(url) + '&channel=' + this.channel + '&token=' + this.token + '&gurl=' + url.split('?')[0] + '&pf=bdWap';
                    return parent.location.href = gameUrl
                }
                parent.location.href = 'https://wap.beeplay123.com' + url + '?channel=' + this.channel + '&token=' + this.token;

            }, 500)

            
        },
        closePopLog(val) {
            this.showMedalAnimate = false
            this.isPopLog = false
            if(val == 'change'){
                // 显示获得勋章页
                this.showReceiveMedal = true
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
            
            this.axios.post('//platform-api.beeplay123.com/wap/api/usertask/finish', {
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
                        if(type != 'mother_crush_task') this.getCrushTask(this.currentMedalIndex)
                        break
                    default:
                        item.taskStatus = 2
                }

            }
            })
        },
        getNewTask() {
            this.axios.post('//platform-api.beeplay123.com/wap/api/usertask/platNewUserStairTask', {
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
            this.axios.post('//platform-api.beeplay123.com/wap/api/usertask/platTaskByBatch', {
            value: 'dayTask'
            }).then((res)=> {
            if(res.data.code == 200) {

                this.currentGamesItems = res.data.data.filter((item)=> {
                return (item.gameType == this.getUrlParam('gametype') && item.taskStatus != 2)
                })
                this.otherGamesItems = res.data.data.filter((item)=> {
                return (item.gameType != this.getUrlParam('gametype') && item.taskStatus != 2)
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
        async getCrushTask(finishindex){
            let {data:data} = await this.axios.post('//platform-api.beeplay123.com/wap/api/usertask/achievementTask', {value:'crush-achievement'})
            if(data.code == 200){

                    let showSubMasterList = [],crushList = data.data.list,currentParentTask,currentIndex
                    currentParentTask = crushList.find((item,index) =>{
                        if(index < 3){
                            // 此处逻辑是领取当前最后一个子任务后，停留在当前子任务
                            if(finishindex && crushList[finishindex].parentTask.taskStatus == 0){
                                return item.parentTask.taskStatus == 0
                            }else{
                                return item.parentTask.taskStatus == 1 
                            }
                        }else{
                            return crushList[index]
                        }
                    })

                    crushList.map((item,index) =>{
                        if(item && item.parentTask.taskName == currentParentTask.parentTask.taskName){
                            currentIndex = index
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

                    let crushTaskList = {
                        showSubMasterList : showSubMasterList, //外显子任务列表
                        hasFinishedTask : data.data.hasFinishedTask, // 已完成任务数量
                        totalTask : data.data.totalTask, // 总任务数量
                        currentIndex : currentIndex, // 当前任务索引
                        currentParentTask : currentParentTask, // 当前任务
                        allTask : data.data.list,// 总任务列表
                        finishLength : finishLength, // 当前已完成子任务
                        currentLength : currentLength, // 当前总任务
                    }
                    this.crushTaskList = crushTaskList
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
</style>