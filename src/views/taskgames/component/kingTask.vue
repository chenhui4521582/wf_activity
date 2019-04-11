<template>
    <div class="king-wrap">
       <div class="head">
          <!--<img :src="crushTaskList.bgIcon | filter" class="title-bg" alt="">-->
          <img src="../img/crushMasterTask/king-header-bg.png" class="title-bg" alt="" >
           <div class="title">
             <!--<img class="name-title" :src="taskview.crushTaskList.gameNameIcon | filter" alt="">-->
             <img class="name-title" src="../img/crushMasterTask/king-name.png" alt="" >
             <div class="text">
               <p><img src="../img/crushMasterTask/name-icon.png" alt=""><i>成就任务</i></p>
               <p>共得<i>{{crushTaskList.reward}}</i>奖励</p>
             </div>
           </div>
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
           <ul class="master-task-list" v-if="crushTaskList.currentParentTask.parentTask.taskStatus == 1">
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

            <div class="medals-locked" v-if="crushTaskList.currentParentTask.parentTask.taskStatus == 0">
                <img src="../img/crushMasterTask/chengjiu_bg.png">
                <p class="btn" @click="receive(crushTaskList.currentParentTask.parentTask,'mother_crush_task')">获取成就奖励</p>
            </div>
            <div class="medals-lock" v-if="crushTaskList.currentParentTask.parentTask.taskStatus == 2">
                <img src="../img/crushMasterTask/chengjiu_locked_title.png">
                <img :src="crushTaskList.currentParentTask.medalIcon | filter" class="medeal">
                <!-- <p>获取日期<br>2018-12-13</p> -->
            </div>
            <div class="medals-lock unlock" v-if="currentMedalList && currentMedalList.index > 0 && crushTaskList.currentParentTask.parentTask.taskStatus == 4 ">
                <!--<img src="../img/crushMasterTask/chengjiu_unlocked_title.png">-->
                <img src="../img/crushMasterTask/nostart.png">
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
        currentGameType: {
            default: null
        }
    },
    data(){
        return{
            medalList : null, //勋章列表
            isShowMasterLocked :false, //是否显示已解锁勋章
            isShowFinished : false, //是否显示领取奖励
            isShowMasterUnlocked:false, //是否显示未解锁勋章
            // currentMedalList : null, //当前点击勋章
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
    mounted(){
        //taskStatus 0 已完成未领取 1 去完成 2 已领取
        // setTimeout(() => {
        //     console.log(this.crushTaskList.currentIndex+'------');
        //     this.currentMedalList = this.crushTaskList.medalList[this.crushTaskList.currentIndex]
        // }, 0);
        GLOBALS.marchSetsPoint('S_00000000000009', { project_id: this.currentGameType, target_project_id: this.currentGameType}) // H5平台-游戏内SDK-页面
    },
    computed:{
        currentMedalList(){
            return this.crushTaskList.medalList[this.crushTaskList.currentIndex]
        }
    },
    methods:{
        transUint(finishNum,taskOps){
            let finish = finishNum > 10000 ? (finishNum/10000).toFixed(2) + '万' : finishNum,
                ops = taskOps > 10000 ? taskOps/10000+'万' : taskOps
            return  finish+'/'+ops
        },
        // 点击切换显示勋章内容（已获得 未解锁 进行中）
        checkMedals(value){
          let index = value.index
          let parentTask = this.crushTaskList.allTask[index].parentTask
          GLOBALS.marchSetsPoint('A_H5PT0061000539', { 
              project_id: parentTask.taskType,
              target_project_id: parentTask.taskType,
              task_id: parentTask.taskId,
              task_name: parentTask.taskName
            }) // H5平台-游戏内SDK-成就任务-勋章点击
            this.checkFinishedList(index,'checkMode')
            this.$emit('hideMedalAnimate')
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
                }
            }
        },
        showMedalAnimate(newIndex, oldIndex){
            if(newIndex){
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
        position: relative;
        overflow: hidden;
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
.king-wrap{
    margin-bottom: .2rem;
    width: 100%;
    height: auto;
    .progress-bg{
        background: #0F1726;
        width: 1.6rem;
        margin-right: 5px;
        position: relative;
        height: .25rem;
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
            line-height: .25rem;
            text-align: center;
        }
    }
    .head{
        position: relative;
        padding: .33rem .19rem .09rem .21rem;
        width: 100%;
        height: 1.45rem;
        .title-bg{
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
            margin-bottom: .19rem;
            overflow: hidden;
            .name-title{
              float: left;
              margin-right: .1rem;
              width: 1.79rem;
              height: .45rem;
            }
            .text {
              height: .45rem;
              float: left;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              p:first-child{
                i{
                  color: #232432;
                  font-size: .18rem;
                  vertical-align: top;
                }
                img {
                  margin-right: .06rem;
                  width: .26rem;
                  height: .16rem;
                }
                width: 3rem;
                height: .18rem;
                line-height: .18rem;
              }
              p:last-child{
                i{
                  font-size: .2rem;
                  font-weight: bold;
                }
                text-align: center;
                color: #EFCA85;
                font-size: .17rem;
                width: 1.77rem;
                height: .24rem;
                background: url(../img/crushMasterTask/price-bg.png);
                background-size: 100% 100%;

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
                color: #232432;
            }
            span:last-child{
                float: right;
                font-size: .2rem;
                color: #232432;
                i{
                  margin-left: .1rem;
                  color: #EC2F1B;
                }
            }
        }
    }
    .crush-task-list{
        background: #363952;
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
            background: #363952;
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
                    height: 1.6rem;
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
                p{
                  color: #7b7faa
                }
                >img.medeal{
                    width: 1.17rem;
                    height: 1.6rem;
                }
            }
        }
    }
    .master-task-list{
        background: #363952;
        height: 1.8rem;
        >li:not(:last-child){
            border-bottom: 1px solid #3D4059FF;
        }
    }
    .medal-wrap{
        padding: 0 3%;
        width: 100%;
        height: 1.15rem;
        background: #3B3E59;
        border-bottom-left-radius: 9px;
        border-bottom-right-radius: 9px;
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
                        background: #434766;
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
