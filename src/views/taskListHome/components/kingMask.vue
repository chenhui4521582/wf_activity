<template>
    <div class="mask-warp" v-if="maskShow">
        <div class="mask-bg"></div>
        <div class="mask-body">
            <div class="mask-title">
                <img src="../images/tab/king-text.png" alt="">
            </div>
            <div class="mask-content">
                <img src="../images/tab/king-icon.png" alt="">
                <img class="close" @click="maskShow=false" src="../images/tab/close.png" alt="">
                <div class="content-text">解锁条件：获取<span>“糖果大师” </span></div>
                <div class="lock-button" @click="goLock">去解锁</div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:'kingMask',
    data() {
        return {
            maskShow:this.value
        }
    },
    props:{
        value:{
            type:Boolean,
            default:false,
        }
    },
    watch:{
       value(val){
           this.maskShow = val
       },
       maskShow(val){
           this.$emit('input',val)
       }
    },
    methods:{
        goLock(){
            this.maskShow = false;
            this.$emit('lockKingTask','crush-achievement')
        }
    }

}
</script>
<style lang="less" scoped>
.mask-bg{
    position: fixed;
    left: 0;
    top:0;
    height: 100vh;
    width: 100vw;
    background-color: rgba(0,0,0,0.6);
    z-index: 10;
}
.mask-body{
    width: 4.8rem;
    height: 5.12rem;
    position: absolute;
    top:50%;
    left: 50%;
    background: url("../images/tab/mask-bg.png");
    background-size: 100% 100%;
    margin-left: -2.4rem;
    margin-top: -2.56rem;
    z-index: 11;
    .mask-title{
        height: 1rem;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items:center;
        position: relative;
        img{
            width:1.13rem;
            text-align: center;
            line-height: 1rem;
        }
    }
    .mask-content{
        padding-top:0.2rem;
        text-align: center;
        img{
            width: 1.73rem;
        }
        .close{
            position: absolute;
            top:0.2rem;
            right: 0.2rem;
            width: 0.17rem;
        }
        .content-text{
            font-size: 0.26rem;
            color: #ffffff;
            font-weight: 600;
            margin-top: 0.7rem;
            span{
                color: #FEDFAC;
            }
        }
    }
    .lock-button{
        width: 1.7rem;
        height: 0.6rem;
        font-size: 0.26rem;
        margin: 0.3rem auto;
        color: #1A1B29;
        line-height: 0.6rem;
        border-radius: 0.3rem;
        background-color:#FEDFAC;
    }
}
</style>


