<template>
    <main>
        <div class="mask"></div>
        <img class="shine" src="../img/dialog/shine.png" alt="">
        <div class="content-box">
            <img class="bg no-process" src="../img/dialog/bg.png">
            <div class="content">
                <img class="title" src="../img/dialog/congratulations-text.png" alt="">
                    <!-- 糖果勋章 -->
                <div v-if="receiveData.showMedalImg" class="crush-wrap">
                    <img class="medeal-icon" :src="receiveData.medalimg">
                </div>
                <img v-else  class="hb-icon" src="../img/dialog/leaf.png" alt="">
                <p class="num">{{receiveData.awardsName}}</p>
            </div>
                
            <div class="close" @click="close">朕收下了</div>
        </div>
    </main>
</template>

<script>
    import { mapState, mapActions, mapMutations } from 'vuex'
    export default {
        
        props: {
            receiveData: {
                default: false
            },
        },
        methods:{
            ...mapMutations({
                setDialog:'taskview/SET_SHOW_DIALOG'
            }),
            close () {
                let index = this.receiveData.index,curTaskList = this.taskview.crushTaskList.allTask[index]
                if(this.receiveData.showMedalImg){
                    this.$emit('showMedalPop','change')
                }else if(this.receiveData.awardsFlag == 'mother_crush_task'){
                    this.$emit('showMedalPop')
                }else if(curTaskList && curTaskList.parentTask.taskStatus == 1){
                    this.$emit('showMedalPop','showMedalAnimate')
                }
                this.setDialog(false)
            }
        },
        mounted() {
        },
    }
</script>
<style lang='less' scoped>
    * {
        box-sizing: border-box;
    }
    .medeal-icon{
        width: 1.49rem;
        height: 1.98rem;
        margin: .15rem auto 0;
        display: block;
    }
    .shine{
        position: fixed;
        z-index: 3;
        width: 130%;
        top: 0%;
        left: 50%;
        margin-left: -65%;
        animation: rotate 2s linear infinite;
    }
    .no-process{height: 5.3rem ;}
    
    .shine-box {
        width: 100%;
        position: fixed;
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
        position: fixed;
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
            
        }
        .close{
            color: #A34C00;
            font-size: 14px;
            background: #FFCF52;
            width: 50%;
            font-weight: bold;
            margin: 0 auto;
            text-align: center;
            position: absolute;
            left:50%;
            margin-left:-25%;
            bottom: 11%;
            padding: 3.5% 0;
            border-radius: 6px;
        }
    }
</style>
