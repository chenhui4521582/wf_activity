<template>
    <div id="app">
        <div class="title">
            <span class="btn-back" @click="backHome" v-if="!getChannel">
                <img src="./images/btn_back.png" alt="">
            </span>
            <img src="./images/title.png">
        </div>
        <div  class="task-wrap">
            <div v-for="(item,index) in allTaskList" :style="{'margin-bottom':'0.2rem'}">
                <div @click="islock = !islock" style="color: #fff"> 切换</div>
                <crushTask
                    v-if="showCrushMasterTask"
                    :item="item"
                    :index="index"
                    @showCurDetails="showCurDetails"
                    @receive="receive"
                    @finish="finish"
                />
                <kingTask
                    v-if="showKingTask"
                    :item="item"
                    :index="index"
                    @showCurDetails="showCurDetails"
                    @receive="receive"
                    @finish="finish"
                />
            </div>
            <king-no-lock />
        </div>
        <awardsPop v-if="showReceivePop" :receiveData="receiveData" @close="showReceivePop = false"></awardsPop>
    </div>
</template>

<script>
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
                masterTaskNameList : ['fish-achievement','crush-achievement','bill-achievement'],
                curChannel: localStorage.getItem('APP_CHANNEL'),
                islock: true
            }
        },
        mounted(){
            this.getMasterTaskNameList()
        },
        components: {
            awardsPop :() =>import('./components/dialog'),
            crushTask :() =>import('./components/crushTask'),
            kingTask :() =>import('./components/kingTask'),
            kingNoLock :() =>import('./components/kingNoLock')
        },
        computed: {
            getChannel() {
              return this.curChannel == '100047001' || this.curChannel == '100048001'
            },
            // 显示大师任务
            showCrushMasterTask () {
                // return this.taskview.crushTaskList && this.taskview.crushTaskList.allTask && this.taskview.crushTaskList.allTask.length
                return this.allTaskList && this.allTaskList.length && !this.islock
            },
            // 显示王者任务
            showKingTask () {
                // return this.taskview.crushTaskList && this.taskview.crushTaskList.lock && this.taskview.crushTaskList.allTask && this.taskview.crushTaskList.allTask.length
                console.log(this.allTaskList && this.allTaskList.length && this.islock)
                return this.allTaskList && this.allTaskList.length && this.islock
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
            async getMasterList(val,type,item,otherStatus){
                let {data:data} = await this.axios.post('//platform-api.beeplay123.com/task/api/usertask/achievementTask', {value:val})
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
                    //模拟糖果王者数据
                    data.data.lock = true
                    data.data.kingBg =
                    console.log()

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
            showCurDetails(i){
                if(this.allTaskList[i].selected){
                    this.$set(this.allTaskList[i],'selected',false)
                }else{
                    this.$set(this.allTaskList[i],'selected',true)
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
    @import "./taskListHome.less";
</style>
