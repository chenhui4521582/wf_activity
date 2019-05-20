<template>
    <div id="app">
        <div class="title">
            <span class="btn-back" @click="backHome" v-if="!getChannel">
                <img src="./images/btn_back.png" alt="">
            </span>
            <img src="./images/title.png">
        </div>
        <!-- tab -->
        <task-tab v-model="tabSelected" :is-show-red-point="isShowRedPoint" />
        <div  class="task-wrap">
            <div v-for="(item,index) in allTaskList" :style="{'margin-bottom':'0.2rem'}" :key="index">
                <template v-if="tabSelected===0">
                    <crushTask
                        v-if="showCrushMasterTask(item)"
                        :item="item"
                        :index="index"
                        @showCurDetails="showCurDetails"
                        @receive="receive"
                        @finish="finish"
                    />
                </template>
                <template v-if="tabSelected===1">
                    <kingTask
                        v-if="showKingTask(item)"
                        :item="item"
                        :index="index"
                        @showCurDetails="showCurDetails"
                        @receive="receive"
                        @finish="finish"
                    />
                    <div @click="changeKingLock(item)">
                        <king-no-lock :item="item" v-if="showKingTaskNoLock(item)" />
                    </div>
                </template>
                
            </div>
            <div v-for="(item,index) in finishList" :style="{'margin-bottom':'0.2rem'}" :key="'finish'+index">
                <template v-if="tabSelected===0">
                    <crushTask
                        v-if="showCrushMasterTask(item)"
                        :item="item"
                        :index="index"
                        :type="'finishList'"
                        @showCurDetails="showCurDetails"
                        @receive="receive"
                        @finish="finish"
                    />
                </template>
                <template v-if="tabSelected===1">
                    <kingTask
                        v-if="showKingTask(item)"
                        :item="item"
                        :index="index"
                        :type="'finishList'"
                        @showCurDetails="showCurDetails"
                        @receive="receive"
                        @finish="finish"
                    />
                </template>
                
            </div>
        </div>
        <awardsPop v-if="showReceivePop" :receiveData="receiveData" @close="showReceivePop = false"></awardsPop>
        <king-mask v-model="maskShow" @lockKingTask="lockKingTask" />
    </div>
</template>

<script>
import { setTimeout } from 'timers';
const taskTab = ()=>import("./components/taskTab.vue")
const kingMask = ()=>import("./components/kingMask.vue")
export default {
    name: 'app',
    data(){
        return {
            crushTaskList : null,
            billTaskLIst :null,
            allTaskList : [],
            finishList:[],
            showDetatils : false,
            receiveData : {
                awardsImage : '111',
                awardsName : '222'
            },
            showReceivePop :false,
            showTaskList : false,
            curMedelIcon : '',
            masterTaskNameList : ['fish-achievement','crush-achievement','bill-achievement'],
            curChannel: localStorage.getItem('APP_CHANNEL'),
            tabSelected:localStorage.getItem('TAB_TASK_INDEX')?1:0,
            maskShow:false
            
        }
    },
    mounted(){
        this.getMasterTaskNameList()
    },
    components: {
        awardsPop :() =>import('./components/dialog'),
        crushTask :() =>import('./components/crushTask'),
        kingTask :() =>import('./components/kingTask'),
        kingNoLock :() =>import('./components/kingNoLock'),
        taskTab,
        kingMask
    },
    computed: {
        getChannel() {
            return this.curChannel == '100047001' || this.curChannel == '100048001'
        },
        isShowRedPoint(){
            let crushShow = 0;
            let kingShow = 0;
            for (let index = 0; index < this.allTaskList.length; index++) {
                const {isShowRed,achievementType} = this.allTaskList[index];
                // 大师完成未领取
                if(isShowRed&&achievementType===1){
                    crushShow++
                }
                // 王者完成未领取
                if(isShowRed&&achievementType===2){
                    kingShow++
                }
            }
            return [crushShow>0?true:false,kingShow>0?true:false];
        }
    },
    methods: {
        async getMasterTaskNameList(){
            let {data:data} = await this.axios.post('//platform-api.beeplay123.com/task/api/usertask/achievementTaskList')
            if(data.code ==200){
                let list = data.data.batchIds
                list.map((item,index) => {
                    if(index == 0){
                        this.getMasterList(item, 'first')
                    }else{
                        setTimeout(() => {
                            this.getMasterList(item, '')
                        }, 10);
                    }
                })
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
        backHome(){
            location.href = `//wap.beeplay123.com/${this.getUrlParam('from')}/#/taskview`
        },
        checkTaskStatus(item,type,curParentTask){
            if(item.taskStatus == 0){
                this.receive(item,type,'',curParentTask)
            }else if(item.taskStatus == 1){
                this.finish(item,type)
            }
        },
        async finish(item,type){
            let {data:data} = await this.axios.post('//platform-api.beeplay123.com/task/api/usertask/cacheGameType',{value : type})
            location.href = `//wap.beeplay123.com${item.url}?channel=${localStorage.getItem('APP_CHANNEL')}`
        },
        async receive(item, type , val , curParentTask){
            if(curParentTask.medalIcon.includes('medal-1')){
                this.curMedelIcon = curParentTask.medalIcon.replace('medal-1','medal-2')
            }
            let {taskId, taskLogId, awardsImage, awardsName, gameType} = item
            let {data:data} = await this.axios.post('//platform-api.beeplay123.com/task/api/usertask/finish', {
                taskId,
                taskLogId
            })
            if(data.code == 200){
                this.showReceivePop = true
                this.getMasterList(type,'refresh',item,val)
            }
        },
        async getMasterList(val,type,item,otherStatus){
            let {data:data} = await this.axios.post('//platform-api.beeplay123.com/task/api/usertask/achievementTaskInHall', {value:val})
            if(data.code == 200 && data.data){
                let showSubMasterList = [],
                    masterList = data.data.list,
                    currentParentTask,
                    masterTaskList;
                if(data.data.hasFinishedTask == data.data.totalTask){
                    currentParentTask = masterList[3]
                }else{
                    currentParentTask = masterList.find((item,index) =>{
                        return item.parentTask.taskStatus != 2
                    })
                }
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
                // 判断当前母任务完成情况
                let currentLength = currentParentTask.subListA.length + currentParentTask.subListB.length,
                    finishLength = 0,
                    unReceived = 0;
                currentParentTask.subListA.map(item => {
                    item.taskStatus == 2 ? finishLength += 1 : ''
                    item.taskStatus == 0 ? unReceived += 1 : ''
                })
                currentParentTask.subListB.map(item => {
                    item.taskStatus == 2 ? finishLength += 1 : ''
                    item.taskStatus == 0 ? unReceived += 1 : ''
                })

                //判断当前任务是否有已领取状态
                let isShowRed = currentParentTask.parentTask.taskStatus == 0 || unReceived != 0
                masterTaskList = {
                    showSubMasterList : showSubMasterList, //外显子任务列表
                    hasFinishedTask : data.data.hasFinishedTask, // 已完成任务数量
                    totalTask : data.data.totalTask, // 总任务数量
                    currentParentTask : currentParentTask, // 当前任务
                    finishLength : finishLength, // 当前已完成子任务
                    currentLength : currentLength, // 当前总任务
                    allTask : data.data.list,// 总任务列表
                    isShowRed : isShowRed , //是否显示红点
                    reward : data.data.reward,//当前奖励总数
                    bgIcon : data.data.bgIcon,// 背景图
                    gameNameIcon : data.data.gameNameIcon,//游戏
                    titleIcon : data.data.titleIcon,//游戏名称icon
                    batchId : data.data.batchId, // 当前游戏value
                    lock : data.data.lock,
                    achievementType : data.data.achievementType,
                    lockIcon : data.data.lockIcon,
                    lockBgIcon : data.data.lockBgIcon,
                    sort:data.data.sort // 排序
                }

                if(type == 'refresh'){
                    let {taskId, taskLogId, awardsImage, awardsName, gameType} = item
                    //刷新接口时替换当前任务显示位置
                    this.allTaskList.map((item,index) =>{
                        if(item.batchId == val){
                            this.allTaskList.splice(index,1,masterTaskList)
                            this.$set(this.allTaskList[index],'selected',true)
                            if(otherStatus == 'mother_crush_task'){
                                this.showReceivePop = true
                                this.receiveData = {
                                    awardsImage : awardsImage,
                                    awardsName : awardsName,
                                    type : otherStatus,
                                    medalimg : this.curMedelIcon
                                }
                            }else{
                                this.receiveData = {
                                    awardsImage : awardsImage,
                                    awardsName : awardsName,
                                    showMedalImg : null
                                }
                            }
                            if (masterTaskList.totalTask == masterTaskList.hasFinishedTask) {
                                this.$set(this.allTaskList[index],'selected',false)
                                this.allTaskList.splice(index,1)
                                this.finishList.push(masterTaskList)
                            }
                        }
                    })
                }else{
                    //已完成任务置底显示
                    if(masterTaskList.totalTask == masterTaskList.hasFinishedTask){
                        this.finishList.push(masterTaskList)
                    }else{
                        //未完成的,未解锁的置底
                        if(masterTaskList.achievementType == 2 && masterTaskList.lock){
                            this.allTaskList.push(masterTaskList)
                        }else{
                            this.allTaskList.unshift(masterTaskList)
                        }
                    }
                }
                // 添加排序
                this.taskSort();
            }
        },
        showCurDetails (i, type) {
            if (this.allTaskList[i].selected) {
                this.$set(this[type][i], 'selected', false)
            } else {
                this.$set(this[type][i], 'selected', true)
            }
        },
        taskSort(){
            this.finishList.sort((to,form)=>{
                return to['sort']-form['sort']--
            })
            this.allTaskList.sort((to,form)=>{
               return to['sort']-form['sort']
            })
            this.allTaskList.sort((to,form)=>{
                return to['achievementType']-form['achievementType']
            })
            this.$set(this.allTaskList[0],'selected',true)
            console.log( this.allTaskList)
        },
        // 显示大师任务
        showCrushMasterTask (item) {
            return item.achievementType == 1 && item.allTask && item.allTask.length
        },
        // 显示王者任务
        showKingTask (item) {
            return item.achievementType == 2 && item.allTask && item.allTask.length && !item.lock
        },
        // 显示王者未解锁状态
        showKingTaskNoLock (item) {
            return item.achievementType == 2 && item.lock
        },
        // 没有解锁的王者任务解锁
        changeKingLock(item){
            this.maskShow = true;
        },
        // 去解锁弹珠大师任务
        lockKingTask(type){
            let crushItem = this.allTaskList.find((item)=>{
                return item['batchId']===type
            })
            let currentChindTask = crushItem&&crushItem.showSubMasterList.length>0?crushItem.showSubMasterList:''
            if(currentChindTask){
                currentChindTask.sort((to,form)=>{
                    if(to['sort']<form['sort']){
                        return -1;
                    }
                })
                this.finish(currentChindTask[0],type)
            }
        },
        // 显示大师任务
        showCrushMasterTask (item) {
            return item.achievementType == 1 && item.allTask && item.allTask.length
        },
        // 显示王者任务
        showKingTask (item) {
            return item.achievementType == 2 && item.allTask && item.allTask.length && !item.lock
        },
        // 显示王者未解锁状态
        showKingTaskNoLock (item) {
            return item.achievementType == 2 && item.lock
        }
    }
  }
</script>

<style lang="less" scoped>
@import "../../common/css/base.css";
@import "./taskListHome.less";
</style>
