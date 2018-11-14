<template>
    <div>
        <div class="mask"></div>1111111111111111111
        <img class="shine"  src="../img/dialog/shine.png" alt="">
        <!-- <div class="content-box">
            <img class="bg" src="../img/dialog/bg.png" alt="">
            <div class="content" >
                <img class="title" src="../img/dialog/congratulations-text.png" alt="">
                <div class="icon" v-if="taskview.receiveData.awardsImage">
                    <img   class="hb-icon" src="../img/dialog/leaf.png" alt=""  v-show="isSignPart">
                    <img :src="taskview.receiveData.awardsImage | filter" alt=""  v-show="!isSignPart">
                </div>
                <img v-else  class="hb-icon" src="../img/dialog/leaf.png" alt="">
                <p class="num">10话费</p>
                
                <div class="text progress">
                    <p>任务进度</p>
                    <div class="progress-bg">
                        <div class="progress-bar"></div>
                        <span>1/10</span>
                    </div>
                </div>
                <div class="close" @click="close">朕收下了</div>
            </div> -->
            <!-- <div class="content" >
                <img class="title" src="../img/dialog/new-user-task-text.png" alt="">
                <img class="hb-icon" src="../img/dialog/hb-icon.png" alt="">
                <p class="num">30元话费</p>
                <div class="text">完成新人任务即可获得话费</div>
                <div class="close" @click="close">朕知道了</div>
            </div> -->
        </div>
    </div>
</template>

<script>
    export default {
        computed:{
        },
        props: {
            
        },
        methods:{
            close () {
                this.setDialog(false)
            }
        },
        mounted() {
            console.log('000000000000000000')
            alert(0)
        },
    }
</script>

<style lang='less' scoped>
    * {
        box-sizing: border-box;
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
                font-size: 16px;
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
