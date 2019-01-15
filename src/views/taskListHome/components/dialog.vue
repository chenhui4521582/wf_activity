<template>
    <main>
        <div class="mask"></div>
        <img class="shine" src="../images/dialog/shine.png" alt="">
        <div class="content-box">
            <img class="bg" src="../images/dialog/bg.png">
            <div class="content" >
                <img class="title" src="../images/dialog/congratulations-text.png" alt="">
                <!-- 糖果勋章 -->
                <div v-if="showMedelPop" class="crush-wrap">
                    <img class="medeal-icon" :src="receiveData.medalimg | filter">
                </div>
                <div v-else>
                    <div class="common-wrap">
                        <img class="hb-icon" src="../images/dialog/leaf.png" alt="">
                    </div>
                    <p class="num">{{receiveData.awardsName}}</p>
                    <div class="text">可到我的页面中查看</div>
                </div>
                <div class="close" @click="close">朕收下了</div>
            </div>
        </div>
    </main>
</template>

<script>
    export default {
        props: {
            receiveData: {
                default: {}
            },
        },
        data(){
            return {
                showMedelPop : false,
                secondClose : false
            }
        },
        methods:{
            close () {
                if(this.receiveData.type == 'mother_crush_task' && !this.secondClose){
                    this.showMedelPop = true
                    this.secondClose = true
                }else{
                    this.secondClose = false
                    this.$emit('close')
                }
                
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
        position: fixed;
        z-index: 4;
        width: 70%;
        left: 50%;
        margin-left: -35%;
        top:20%;
        .bg{
            width: 100%;
            display: block;
            &.no-process{height: 5.3rem ;}
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
            .hb-icon{
                width: 1.09rem;
                /*height: 1.6rem;*/
                margin: 0 auto;
                display: block;
                margin-top: 10%;
            }
            .crush-wrap{
                margin: .4rem auto;
                width: 2.23rem;
                height: 2.3rem;
                text-align: center;
                background: #da4027;
                border-radius: .08rem;
                border: .01rem solid #fff;
            }
            .common-wrap{
                margin: .4rem auto;
                width: 1.48rem;
                height: 1.48rem;
                background: #FFD66D;
                border-radius: .12rem;
                border: .02rem solid #fff;
            }
            .medeal-icon{
                width: 1.49rem;
                height: 1.98rem;
                margin: .15rem auto 0;
                display: block;
            }
            .num{
                color: #fff;
                font-size: .28rem;
                font-weight: bold;
                text-align: center;
                margin-top: 3%;
            }
            .text{
                color: #fff;
                font-size: .24;
                text-align: center;
                margin-top: 5%;
                opacity: .5;
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
    }
@keyframes rotate{
    from{transform:  rotate(0);}
    to{transform:  rotate(360deg);}
}
</style>
