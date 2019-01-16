<template>
    <div class="crush-master-wrap">
       <div class="head">
            <img :src="crushTaskList.bgIcon | filter" alt="">
           <p class="title">
               <span>
                   <i>成就任务</i>
                   <img class="name-title" :src="crushTaskList.gameNameIcon | filter" alt="">
                    <!-- <img v-for="item in nameList" v-if="item.name == currentName" :src="item.img" class="xunzhang-title"> -->
               </span>
               <span class="reware-bg">
                   共得<i>{{crushTaskList.reward}}</i>奖励
               </span>
           </p>
           <div class="process">
               <div class="probar-ball">
                    <div class="bar" :style="{width:crushTaskList.finishLength/crushTaskList.currentLength * 100 + '%'}"></div>
                </div>
                <p class="tips">
                    <span>{{transUint(crushTaskList.finishLength,crushTaskList.currentLength)}}</span>
                    <span>完成当前进度<i>加赠{{crushTaskList.currentParentTask.parentTask.awardsName}}</i></span>
                </p>
           </div>
       </div>
       <div class="crush-task-list">
           <ul class="master-task-list" v-if="isShowList">
                <li v-for="(item,index) in crushTaskList.showSubMasterList" v-if="item && index < 2"
                @click="checkTaskStatus(item,'crush_task')">
                    <div class="description" :class="{opacitying:item.taskStatus == 2}">
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
                    <div class="btn" v-if="item.taskStatus == 0">领取</div>

                    <div class="btn play" v-if="item.taskStatus == 1">去完成</div>
                    <div class="btn gray opacitying" v-if="item.taskStatus == 2">已领取</div>
                </li>
            </ul>

            <div class="medals-locked" v-if="isShowFinished">
                <img src="../img/crushMasterTask/chengjiu_bg.png">
                <p class="btn" @click="receive(crushTaskList.currentParentTask.parentTask,'mother_crush_task')">获取成就奖励</p>
            </div>
            <div class="medals-lock" v-if="isShowMasterLocked">
                <img src="../img/crushMasterTask/chengjiu_locked_title.png">
                <img :src="crushTaskList.currentParentTask.medalIcon | filter" class="medeal">
                <!-- <p>获取日期<br>2018-12-13</p> -->
            </div>
            <div class="medals-lock unlock" v-if="isShowMasterUnlocked ">
                <img src="../img/crushMasterTask/chengjiu_unlocked_title.png">
                <img :src="crushTaskList.currentParentTask.medalIcon | filter" class="medeal">
                <p>解锁前提条件<br>获得“{{crushTaskList.medalList[currentMedalList.index-1].medalName}}”称号</p>
            </div>
       </div>
       <div class="medal-wrap">
           <ul>
                <li v-for="(item,i) in crushTaskList.medalList" :class="{hightlight:item.selected}" @click="checkMedals(item)">
                   <img :src="item.statusIcon | filter" :class="{'animate':item.selected && showMedalAnimate}">
                </li>
           </ul>
       </div>
    </div>
</template>
<script>
import masterData from '../data.js'

export default {
    props:{
        crushTaskList: {
            default : null
        },
        showReceiveMedal: {
            default : false
        },
        showMedalAnimate: {
            default : false
        },
        currentMedalIndex: {
            default : 0
        },
    },
    data(){
        return{
            medalList : null, //勋章列表
            isShowMasterLocked :false, //是否显示已解锁勋章
            isShowFinished : false, //是否显示领取奖励
            isShowMasterUnlocked:false, //是否显示未解锁勋章
            currentMedalList : null, //当前点击勋章
            isShowList : true,//是否显示任务列表
            flag :1,
            changeAnimation : false,
            isMotherType : true,
            nameList : [
                {
                    name : '新贵',
                    img : require('../img/crushMasterTask/name_new.png')
                },
                {
                    name : '达人',
                    img : require('../img/crushMasterTask/name_daren.png')
                },
                {
                    name : '高手',
                    img : require('../img/crushMasterTask/name_higher.png')
                },
                {
                    name : '大师',
                    img : require('../img/crushMasterTask/name_master.png')
                },
            ],
        }
    },
    beforeMount(){
        //taskStatus 0 已完成未领取 1 去完成 2 已领取
        // 判断当前是第几个母任务类型;
        this.currentMedalList = this.crushTaskList.medalList[this.crushTaskList.currentIndex]
        this.checWhickTask(this.crushTaskList.currentParentTask,this.crushTaskList.currentIndex)
        GLOBALS.buriedPoint(1210040820,"H5平台-游戏内任务页-糖果成就任务加载成功");
        
    },
    computed:{
        currentName(){
            switch(this.currentMedalList.index){
                case 0:
                    GLOBALS.buriedPoint(1210040821,"H5平台-游戏内成就任务页-糖果新贵点击");
                    return '新贵'
                    break;
                case 1:
                    GLOBALS.buriedPoint(1210040822,"H5平台-游戏内成就任务页-糖果达人点击");
                    return '达人'
                    break;
                case 2:
                    GLOBALS.buriedPoint(1210040823,"H5平台-游戏内成就任务页-糖果高手点击");
                    return '高手'
                    break;
                case 3:
                    GLOBALS.buriedPoint(1210040824,"H5平台-游戏内成就任务页-糖果大师点击");
                    return '大师'
                    break;
            }
        }
    },
    methods:{
        // 显示获得勋章
        showReceivedMedal(){
            this.isShowList = false
            this.isShowMasterLocked = true
            this.isShowMasterUnlocked = false
            this.isShowFinished = false
        },
        // 显示正在进行
        ShowInTask(){
            this.isShowList = true
            this.isShowMasterLocked = false
            this.isShowMasterUnlocked = false
            this.isShowFinished = false
        },
        // 显示未解锁勋章
        showUnLockedMedal(){
            this.isShowList = false
            this.isShowMasterLocked = false
            this.isShowMasterUnlocked = true
            this.isShowFinished = false
        },
        // 显示领取奖励
        showReceiveAward(){
            this.isShowList = false
            this.isShowMasterLocked = false
            this.isShowMasterUnlocked = false
            this.isShowFinished = true
        },
        // 判断当前是第几个母任务类型
        checWhickTask(list,i){
            // 判断糖果大师任务已完成类型状态 
            if(i == 3 && list.parentTask.taskStatus != 1){
                let medalNum
                if(list.parentTask.taskStatus == 0){
                    this.showReceiveAward()
                }else{
                    this.showReceivedMedal()
                }
                return
            }
        },
        transUint(finishNum,taskOps){
            let finish = finishNum > 10000 ? (finishNum/10000).toFixed(2) + '万' : finishNum,
                ops = taskOps > 10000 ? taskOps/10000+'万' : taskOps
            return  finish+'/'+ops
        },
        // 点击切换显示勋章内容（已获得 未解锁 进行中）
        checkMedals(value){
            let index = value.index,
                currentStatus = index>0 && this.crushTaskList.allTask[index-1].parentTask.taskStatus,medalNum,
                status = this.crushTaskList.allTask[index].parentTask.taskStatus
            this.checkFinishedList(index,'checkMode')
            this.$emit('hideMedalAnimate')
            this.currentMedalList = value 
            // 未解锁勋章逻辑  前一任务未完成  即taskstatus=1
            if(index >0 && currentStatus == 1){// 
                this.showUnLockedMedal()
            }else{
                if(status == 1){ // 进行中
                    this.ShowInTask()
                }else if(status == 0){ //已完成未领取 -- 领取奖励tab
                    this.showReceiveAward()
                }else if(status == 2){//已完成 -- 完成勋章
                    this.showReceivedMedal()
                }else if(status == 4){
                    this.showUnLockedMedal()
                }
            }
        },
       checkFinishedList(i,type){
            this.$emit('refreshTask',i,type)
        },
        getCurentIcon(){
            let curMedelIcon
            if(this.crushTaskList.currentParentTask.medalIcon.includes('medal-1')){
                return this.crushTaskList.currentParentTask.medalIcon.replace('medal-1','medal-2')
            }
        },
        // 完成任务
        checkTaskStatus(item,type){
            this.$emit('checkTaskStatus',item,type,this.currentMedalList.index)
        },
        // 领取奖励
        receive(item,type){
            this.isMotherType = true
            this.$emit('receive',item,'mother_crush_task',this.currentMedalList.index,`//file.beeplay123.com${this.getCurentIcon()}`)
        }
    },
    watch:{
        medalList(newIndex, oldIndex){},
        showReceiveMedal(newIndex, oldIndex){
            if(newIndex){
                if(this.currentMedalIndex != 3){
                    this.checkFinishedList(this.currentMedalIndex+1)
                    this.ShowInTask()
                }else{
                    this.showReceivedMedal()
                }
            }
        },
        showMedalAnimate(newIndex, oldIndex){
            if(newIndex){
                this.showReceiveAward()
            }
        },
    }
}
</script>
<style lang="less" scoped>
div{box-sizing: border-box}
.master-task-list{
    background: #203252;
    padding: 4% 3%;
    >li{
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-radius: 4px;
        position: relative;
        overflow: hidden;
        padding: 0 ;
        background: transparent ;
        border-radius: 0;
        border-bottom: 1px solid #294575;
        padding-bottom: 4%;
        margin: 0;
        &:last-child{
            border: none;
            padding-top: 4% ;
            padding-bottom: 0;
        }
        .description{
            display: flex;
            justify-content: flex-start;
            align-items: center;
            width: 80%;
            .head-img{
                width: .6rem;
                height: .6rem;
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
                    font-size: .23rem;
                    font-weight: bold;
                    margin-bottom: 5%;
                }
                .progress{
                    display: flex;
                    align-items: center;

                    .num{
                        img{
                            width: .32rem;
                            height: .23rem;
                            display: inline;
                        }
                        span{
                            font-size: .2rem;
                            color: #FFD338;
                        }
                    }
                }
            }
        }
        .btn{
            color: #fff;
            font-weight: bold;
            font-size: .2rem;
            background: #EE6F0B;
            padding:2% 4%;
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
            &.opacitying{opacity: .5;}
        }
    }
}
.crush-master-wrap{
    margin-bottom: .2rem;
    width: 100%;
    height: auto;
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
            font-size: .2rem;
            left: 0;
            line-height: 15px;
            text-align: center;
        }
    }
    .head{
        position: relative;
        padding: .32rem .2rem;
        width: 100%;
        height: 1.45rem;
        img{
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 1.45rem;
        }
        // background: url(../img/crushMasterTask/master_head.png) no-repeat;
        // background-size: 100% 100%;
        .title{
            position: relative;
            z-index: 2;
            width: 100%;
            height: .45rem;
            margin-bottom: .17rem;
            span:first-child{
                position: relative;
                display: inline-block;
                width: 2.36rem;
                height: .45rem;
                i{
                    position: absolute;
                    right: .2rem;
                    top: -.02rem;
                    color: #FFEBCB;
                    font-size: .16rem;
                }
                .name-title{
                    float: left;
                    width: 1.4rem;
                    height: .45rem;
                }
                .xunzhang-title{
                    position: absolute;
                    right: 0;
                    bottom: .01rem;
                    width: .85rem;
                    height: .25rem;
                }

            }
            
            span:last-child{
                position: absolute;
                left: 1.5rem;
                bottom: 0;
                text-align: center;
                margin-top: -.05rem;
                color: #32344B;
                font-size: .16rem;
                width: 1.45rem;
                height: .24rem;
                line-height: .24rem;
                background: url(../../taskListHome/images/bg_awards.png);
                background-size: 100% 100%;
                i{
                    font-size: .22rem;
                    font-weight: bold;
                }
            }
        }
        .process{
            position: relative;
            z-index: 2;
        }
        .probar-ball{
            position: relative;
            width: 100%;
            height: .14rem;
            line-height: .14rem;
            background: #0F1726;
            border-radius: .08rem;
            font-size: .18rem;
            overflow: hidden;
            .bar{
                position: absolute;
                left: 0;
                top: 0;
                height: 100%;
                background: #FEDFAC;
                border-radius: .08rem 0 0 .08rem;
                z-index: 1;
            }
            p{
                position: absolute;
                width: 100%;
                text-align: center;
                z-index: 2;
                color: #4f5379
            }
        }
        .tips{
            margin-top: .06rem;
            span:first-child{
                margin-right: .06rem;
                float: left;
                font-size: .22rem;
            }
            span:last-child{
                float: right;
                font-size: .2rem;
                color: #666879;
                i{color: #E3E5F8}
            }
        }
    }
    .crush-task-list{
        background: #232432;
        .medals-locked{
            padding-bottom: .2rem;
            width: 100%;
            text-align: center;
            img{
                width: 3.29rem;
                height: 1.19rem;
                margin: .3rem auto .12rem;
            }
            p{
                margin: 0 auto;
                width: 1.32rem;
                height: .37rem;
                line-height: .37rem;
                font-size: .17rem;
                background: #EE6F0B;
                border-radius: .08rem;
            }
        }
        .medals-lock{
            position: relative;
            width: 100%;
            
            text-align: center;
            img{
                &:first-child{
                    position: absolute;
                    left: .22rem;
                    top: .3rem;
                    width: 1.38rem;
                    height: .34rem;
                }
                &.medeal{
                    margin: .3rem auto;
                    width: 1.16rem;
                    height: 1.56rem;
                }
            }
            p{
                position: absolute;
                right: .23rem;
                bottom: .3rem;
                font-size: .17rem;
                line-height: .25rem;
                color: #FFD338;
                text-align: right;
            }
            &.unlock{
                p{color: #4A4E73}
                >img.medeal{
                    width: 1.17rem;
                    height: 1.51rem;
                }
            }
        }
    }
    .master-task-list{
        background: #232432;
        height: 1.8rem;
        >li:not(:last-child){
            border-bottom: 1px solid #383A58;
        }
    }
    .medal-wrap{
        padding: 0 3%;
        width: 100%;
        height: 1.15rem;
        background: url(../img/crushMasterTask/master_bottom.png) no-repeat;
        background-size: 100% 100%;
        ul{
            li{
                position: relative;
                float: left;
                width: .99rem;
                height: 1.15rem;
                text-align: center;
                padding: .2rem 0;
                box-sizing: border-box;
                &:not(:last-child){
                    margin-right: .34rem;
                    &:after{
                        content: '';
                        position: absolute;
                        right: -.3rem;
                        top: .6rem;
                        width: .18rem;
                        height: .18rem;
                        background: url(../img/crushMasterTask/icon_arrow.png) no-repeat;
                        background-size: 100% 100%;
                    }
                }
                &.hightlight{
                    background: url(../img/crushMasterTask/highlight.png) no-repeat;
                    background-size: 100% 100%;
                }
                img{
                    width: .83rem;
                    height: .85rem;
                }
                
            }
        }
    }
    .animate{
        animation: scal 1s linear ;
    }
    @keyframes scal {
        0%{opacity: 0;transform: scale(0)}
        50%{transform: scale(1.2)}
		100%{opacity: 1;transform: scale(1)}
	}
}
</style>
