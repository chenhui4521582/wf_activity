<template>
	<div class="pop-log">
		<div class="mask"></div>
        <div class="shine-box">
            <img class="shine"  src="./img/dialog/shine.png" alt="">
        </div>
        <div class="content-box master-box" v-if="masterTask">
            <img class="bg no-process" src="./img/dialog/bg.png">
            <div class="content" :class="{'big':awardItem.showMedalImg}">
                <img class="title" src="./img/dialog/congratulations-text.png" alt="">
                    <!-- 糖果勋章 -->
                <div v-if="awardItem.showMedalImg" class="crush-wrap">
                    <img class="medeal-icon" :src="awardItem.medalimg">
                </div>
                <img v-else  class="hb-icon" src="./img/crushMasterTask/task_huafei.png" alt="">
                <p class="num">{{awardItem.awardsName}}</p>
                <div class="close" @click="close">朕收下了</div>
            </div>
        </div>
        <div class="content-box" v-else >
            <img class="bg" src="./img/dialog/bg.png" alt="">
            <div class="content" v-if="!(newTaskItems&&newTaskItems.popUp)">
                <img class="title" src="./img/dialog/congratulations-text.png" alt="">
                <div class="icon" >
                    <img   class="hb-icon" :src="awardItem.awardsImage" alt=""  >
                </div>
                <p class="num">{{awardItem.awardsName}}</p>
                
                <div class="text progress" v-if="isNewTask && motherTask">
                    <p>任务进度</p>
                    <div class="progress-bg">
                    	<div class="progress-bar" :style="{width:motherTask.hasFinishedNum/motherTask.allTaskNum * 100 + '%'}"></div><span>{{motherTask.hasFinishedNum}}/{{motherTask.allTaskNum}}</span></div>
                </div>
                <div class="close" @click="close">朕收下了</div>
            </div>
            <div class="content" v-else>
                <img class="title" src="./img/dialog/new-user-task-text.png" alt="">
                <img class="hb-icon" src="./img/dialog/hb-icon.png" alt="">
                <p class="num">30元话费</p>
                <div class="text">完成新人任务即可获得话费</div>
                <div class="close" @click="close">朕知道了</div>
            </div>
        </div>
	</div>
</template>
<script type="text/javascript">
	export default {
		props: {
			awardItem: {
				default: null
			},
			motherTask: {
				default: null
			},
			newTaskItems: {
				default: null
            },
            crushTaskList: {
				default: null
            },
			isNewTask: {
				default: false
            },
            masterTask : {
				default: false
            },
		},
		mounted() {
            
		},
		methods: {
			close(){
                let index = this.awardItem && this.awardItem.index,
                    curTaskList = index && this.crushTaskList.allTask[index]
                if(this.awardItem.showMedalImg){
                    this.$emit('close','change')
                }else if(this.awardItem.awardsFlag == 'mother_crush_task'){
                    this.$emit('close','showReceiveMedal')
                }else if(curTaskList && curTaskList.parentTask.taskStatus == 0){
                    this.$emit('close','showMedalAnimate')
                }
				this.$emit('close')
			}
		}
	}
</script>

<style lang='less' scoped>
    .crush-wrap{
        margin: .4rem auto;
        width: 2.23rem;
        height: 2.3rem;
        text-align: center;
        background: #da4027;
        border-radius: .08rem;
        border: .01rem solid #fff;
    }
    .medeal-icon{
        width: 1.49rem;
        height: 1.98rem;
        margin: .15rem auto 0;
        display: block;
    }
    * {
        box-sizing: border-box;
    }
    .shine{
        display: block;
        width: 86%;
        animation: rotate 2s linear infinite;
        margin: 0 auto;
        
    }
    .shine-box {
        width: 100%;
        position: absolute;
        top: 5%;
        left: 0%;
        z-index: 6;
        overflow: hidden;
    }

    @keyframes rotate{
      from{transform:  rotate(0);}
      to{transform:  rotate(360deg);}
    }
    .mask {
    	width: 100%;
    	height: 100%;
    	position: fixed;
    	left: 0;
    	top: 0;
    	background: #000;
    	opacity: 0.6;
    	z-index: 5;
    }
    .content-box{
        position: absolute;
        width: 80%;
        left: 50%;
        margin-left: -40%;
        top: 10%;
        z-index: 7;
        -webkit-transform: scale(0.8);
        transform: scale(0.8);
        
        .bg{
            width: 100%;
            display: block;
        }
        .content{
            position: absolute;
            width: 100%;
            top: 0;
            padding: 10% 2%;
            padding-bottom: 8%;
            height: 100%;
            &.big{padding: 8% 2%;.close{margin-top: 7% !important;}}
            .title{
                height: 24px;
                display: block;
                margin: 0 auto;
            }
            .icon{
                width: 1.6rem;
                height: 1.6rem;
                margin: 0 auto;
                background: #FFD66D;
                border: 1px solid #fff;
                border-radius: 5px;
                margin-top: 10%;
                display: flex;
                justify-content: center;
                align-items: center;
                img{
                    width: 70%;
                    display: block;
                    margin: 0 auto;
                }
            }
            .hb-icon{
                width: 1.09rem;
                /*height: 1.6rem;*/
                margin: 0 auto;
                display: block;
                margin-top: 10%;
            }
            .num{
                font-size: .28rem;
                text-align: center;
                margin-top: 3%;
            }
            .text{
                font-size: 14px;
                text-align: center;
                margin-top: 6%;
                &.progress{
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    p{
                        font-size: .26rem;
                        margin-right: 4px;
                    }
                    .progress-bg{
                        background: #DD3317;
                        width: 46%;
                        position: relative;
                        height: .22rem;
                        border-radius: 3px;
                        overflow: hidden;
                        .progress-bar{
                            background: #FFCF52;
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
                            left: 0;
                            font-size: 0.22rem;
                            line-height: .22rem;
                            text-align: center;
                        }
                    }
                }
            }
            .close{
                color: #A34C00;
                font-size: .28rem;
                background: #FFCF52;
                width: 50%;
                font-weight: bold;
                margin: 0 auto;
                text-align: center;
                margin-top: 10%;
                padding: 3.5% 0;
                border-radius: 6px;
                
            }
        }
    }
</style>
