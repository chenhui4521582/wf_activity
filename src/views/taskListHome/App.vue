<template>
    <div id="app">
        <div class="title">
            <span class="btn-back" @click="backHome">
                <img src="./images/btn_back.png" alt="">
            </span>
            <img src="./images/title.png">
        </div>
        <div  class="task-wrap">
            <div v-for="(item,index) in allTaskList" :style="{'margin-bottom':'0.2rem'}">
                <div class="task-title" @click="showCurDetails(index,item)">
                    <img :src="item.bgIcon | filter" class="bg-task" :class="{'radius': !item.selected}">
                    <p class="left-part">
                        <span>当前进度</span>
                        <img :src="item.currentParentTask.statusIcon | filter" alt="">
                    </p>
                    <div class="right-part">
                        <span class="task-name">
                            <img :src="item.titleIcon | filter" alt="">
                            <em>共得{{item.reward}}奖励</em>
                        </span><br>
                        <p class="task-process">
                            <span class="process-bar">
                                <em class="in" :style="{'width': item.finishLength/item.currentLength * 100 +'%'}"></em>
                            </span>
                            <em>{{transUint(item.finishLength,item.currentLength)}}</em>
                        </p>
                        <span class="task-details" :class="{'reddot':item.isShowRed}">
                            查看详情<em class="btn-arrow" :class="{'rotate': item.selected}"></em>
                        </span>
                    </div>
                </div>
                <div v-if="item.selected">
                    <div v-if="item.hasFinishedTask != item.totalTask" >
                        <ul class="task-list" v-if="item.currentParentTask.parentTask.taskStatus == 1">
                            <li v-for="item1 in item.showSubMasterList" @click="checkTaskStatus(item1,item.batchId,item.currentParentTask)">
                                <div class="description" >
                                    <div class="head-img">
                                        <img :src="item1.icon | filter" alt="">
                                    </div>
                                    <div class="content">
                                        <p v-html="item1.taskDescShow"></p>
                                        <div class="progress">
                                            <div class="progress-bg">
                                                <div class="progress-bar" :style="{width:item1.finishNum/item1.taskOps * 100 + '%'}"></div>
                                                <span>{{transUint(item1.finishNum,item1.taskOps)}}</span>
                                            </div>
                                            <div class="num">
                                                <img :src="item1.awardsImage | filter" alt="">
                                                <span>{{item1.awardsName}}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="btn" v-if="item1.taskStatus == 0">领取</div>
                                <div class="btn play" v-if="item1.taskStatus == 1">去完成</div>
                                <div class="btn gray opacitying" v-if="item1.taskStatus == 2">已领取</div>
                            </li>
                        </ul>
                        <div class="medals-locked" v-else>
                            <img src="./images/chengjiu_bg.png">
                            <p class="btn" @click="receive(item.currentParentTask.parentTask,item.batchId,
                            'mother_crush_task',item.currentParentTask)">获取成就奖励</p>
                        </div>
                    </div>
                    <div class="task-finished" v-else>
                        <ul>
                            <li v-for="item2 in item.allTask">
                                <img :src="item2.medalIcon | filter" alt=""><br>
                                <span>{{item2.medalName}}</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <awardsPop v-if="showReceivePop" :receiveData="receiveData" @close="showReceivePop = false"></awardsPop>
    </div>
</template>

<script>
    import utils from '../../common/js/utils.js'
    import base64url from 'base64-url'
    export default {
        name: 'app',
        data(){
            return {
               crushTaskList : null,
               billTaskLIst :null,
               allTaskList : [],
               showDetatils : false,
               receiveData : {
                        awardsImage : '111',
                        awardsName : '222'
                    },
                showReceivePop :false,
                showTaskList : false,
                curMedelIcon : '',
                masterTaskNameList : ['fish-achievement','crush-achievement','bill-achievement']
            }
        },
        mounted(){
            this.getMasterTaskNameList()
        },
        components: {
            awardsPop :() =>import('./components/dialog'),
        },
        methods: {
            async getMasterTaskNameList(){
                let {data:data} = await this.axios.post('//platform-api.beeplay123.com/task/api/usertask/achievementTaskList')
                if(data.code ==200){
                    let list = data.data.batchIds 
                    let newlist = list.reverse()

                    list.map((item,index) => {
                        let val = index == 0 ? 'first' : ''
                        if(index == 0){
                            this.getMasterList(item,val)
                        }else{
                            setTimeout(() => {
                                this.getMasterList(item,val)
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
                location.href = `//wap.beeplay123.com${item.url}?channel=${localStorage.getItem('APP_CHANNEL')}&token=${localStorage.getItem('ACCESS_TOKEN')}`
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
            showCurDetails(i,item){
                this.allTaskList.map((item,index) => {
                    if(i == index){
                        if(item.selected){
                            this.$set(item,'selected',false)
                        }else{
                            this.$set(item,'selected',true)
                        }
                    }
                })
            },
            transUint(finishNum,taskOps){
                let finish = finishNum > 10000 ? (finishNum/10000).toFixed(2) + '万' : finishNum,
                    ops = taskOps > 10000 ? taskOps/10000+'万' : taskOps
                return  finish+'/'+ops
            },
            async getMasterList(val,type,item,otherStatus){
                
                let {data:data} = await this.axios.post('//platform-api.beeplay123.com/task/api/usertask/achievementTask', {value:val})
                
                if(data.code == 200 && data.data){
                    let showSubMasterList = [],masterList = data.data.list,currentParentTask,currentIndex,masterTaskList

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
                        finishLength = 0,unReceived = 0
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
                            }
                        })
                    }else{  
                        //已完成任务置底显示
                        if(masterTaskList.totalTask == masterTaskList.hasFinishedTask){
                            this.allTaskList.push(masterTaskList)
                        }else{
                             this.allTaskList.unshift(masterTaskList)
                        }
                    }
                    
                    // 首次请求任务默认第一位任务展开
                    setTimeout(() => {
                        if(type == 'first'){
                            // this.showCurDetails(0,this.allTaskList[0])
                            this.$set(this.allTaskList[0],'selected',true)
                        }
                    }, 200);
                }
            },
        },
        watch:{
            allTaskList(newIndex, oldIndex){},
        }
    }
</script>

<style lang="less" scoped>
    @import '../../common/css/base.css';
    @import './taskListHome.less';
</style>
