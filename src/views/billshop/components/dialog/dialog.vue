<template>
    <div class="dialog-warp" v-if="dialogShow">
        <div class="mask-warp"></div>
        <div class="content-warp">
            <div class="title-warp">
                <span>温馨提示</span>
                <div class="close-icon" @click="dialogShow=false"><img src="./image/close-small.png" alt=""></div>
            </div>
            <div class="content">
                <img v-if="statusCode===104" src="./image/out-of-stock.png" alt="">
                <img v-if="statusCode===102" src="./image/short.png" alt="">
                <img v-if="statusCode===200" src="./image/succecc.png" alt="">
                <img v-if="statusCode===103" src="./image/succecc.png"  style="width: 1.67rem;height: 1.72rem" alt="">
                
                <div v-if="statusCode===102" class="content-text"> 您的话费券不足以支付当前订单快去赚话费吧</div>
                <div v-if="statusCode===104" class="content-text">当前商品库存不足<br/>去看看其他商品吧</div>
                <div v-if="statusCode===103" class="content-text"> 每日限购一次，<br/>请明天再来~</div>
                <div v-if="statusCode===200" class="content-text">换取成功<br/>快去领取吧</div>
            </div>
            <div class="dialog-button">
                <div class="return base-button" @click="dialogShow=false">返回</div>
                <div class="save base-button" v-if="statusCode===102" @click="earnMoney">去赚话费</div>
                <div class="save base-button" v-if="statusCode===200" @click="checkprize">去领取</div>
                <div class="save base-button" v-if="statusCode===104" @click="lookMall">看看其他</div>
            </div>
        </div>
    </div>
</template>
<script>
import {getUrlParam,marchSetsPoint} from "../../utils/common"
export default {
    name:'dialogPage',
    data() {
        return {
            dialogShow:this.value
        }
    },
    props:{
       value:{
           type:Boolean,
           default:true
       },
       statusCode:{
           type:[Number,String],
           default:''
       },
    },
    watch: {
        value(val){
            this.dialogShow = val
        },
        dialogShow(val){
            this.$emit('input',val)
        }
    },
    methods: {
        // 去赚话费
        async earnMoney(){
            this.dialogShow = false;
            await marchSetsPoint('A_H5PT0035000638',{
                residual_phone:this.$route.query['accountBalance']
            })
            await marchSetsPoint('A_H5PT0035001268')
            switch (getUrlParam('from')) {
            case 'bdWap':
                parent.location.href = `https://wap.beeplay123.com/bdWap/?channel=${localStorage.getItem('APP_CHANNEL')}#/taskview`
            break
            case 'jsWap':
                parent.location.href = `https://wap.beeplay123.com/bdWap/?channel=${localStorage.getItem('APP_CHANNEL')}#/taskview`
            break
            case 'miniWap':
                parent.location.href = `https://wap.beeplay123.com/miniWap/?channel=${localStorage.getItem('APP_CHANNEL')}#/taskview`
            break
            default:
                parent.location.href = `https://wap.beeplay123.com/wap/home/?channel=${localStorage.getItem('APP_CHANNEL')}#/taskview`
            }
        },
        // 去看看其他
        async lookMall(){
            await marchSetsPoint('A_H5PT0035001268',{
                residual_phone:this.$route.query['accountBalance']
            })
            history.go(-1)
        },
        // 去领奖
        async checkprize(){
            this.dialogShow = false;
            await marchSetsPoint('A_H5PT0035001267',{
                 residual_phone:this.$route.query['accountBalance']
            })
            this.$emit('on-checkprize')
        },
    },
}
</script>
<style lang="less" scoped>
.mask-warp{
    height: 100vh;
    width: 100vw;
    background-color: rgba(0, 0, 0, 0.7);
    position: fixed;
    top:0;
    left: 0;
    z-index: 9;
}
.content-warp{
    min-height: 5.6rem;
    width: 6rem;
    position: fixed;
    top:50%;
    left: 50%;
    margin-left: -3rem;
    margin-top: -2.85rem;
    background-color: #0F1726;
    z-index: 10;
    border-radius: 0.08rem;
    overflow: hidden;
}
.title-warp{
    position: relative;
    height: 0.8rem;
    width: 100%;
    line-height: 0.8rem;
    text-align: center;
    font-size: 0.26rem;
    color: #ffffff;
    .close-icon{
        position: absolute;
        top:0;
        right: 0;
        height: 0.8rem;
        width: 0.8rem;
        img{
            width: 0.2rem;
            height: 0.2rem;
        }
    }
}
.content{
    text-align: center;
    padding: 0.4rem 1.2rem;
    box-sizing: border-box;
    img{
        width: 3.1rem;
    }
}
.content-text{
    font-size: 0.26rem;
    color: #ffffff;
}
.dialog-button{
    color: #ffffff;
    font-size: 0.28rem;
    font-weight: 500;
    text-align: center;
    margin-top: 0.1rem;
    .base-button{
        display: inline-block;
        border-radius: 0.08rem;
        width: 1.8rem;
        height: 0.6rem;
        line-height: 0.6rem;
    }
    .return{
        background-color: #2B3A55;
        margin-right: 0.2rem;
    }
    .save{
        background-color: #EE6F0B;
        margin-left: 0.2rem;
    }
}
</style>

