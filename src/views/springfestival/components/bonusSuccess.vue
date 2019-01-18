<template>
    <div class="pop-window" v-if="show">
        <div class="pop-mask" @touchmove.prevent></div>

        <div class="bonus-success">
            <span>春节红包 <i>+</i> {{count}}</span>
            <div class="btnsure" @click="besure" >确认</div>
            <div class="close" @click="close"></div>
        </div>
    </div>
</template>
<script type="text/javascript">
    export default {
        data() {
            return {
                // show:false,
                count:0
            }
        },
        props:{
            show:{
                type: Boolean,
                default: false
            }
        },
        methods: {
            besure(){
                GLOBALS.buriedPoint(1207003042,'春节红包-加赠红包-红包获得弹窗-确认')
                this.$emit('close')
            },
            close(){
                GLOBALS.buriedPoint(1207003043,'春节红包-加赠红包-红包获得弹窗-关闭')
                this.$emit('close')
            }
        },
        mounted(){

        }
    }
</script>
<style lang="less" scoped>
    .pop-window {
        position: relative;
        z-index: 11;
        width: 100%;
        height: 100%;
        min-height: 100%;
        max-height: 100%;
        .pop-close {
            width: 0.68rem;
            height: 0.68rem;
            position: absolute;
            right: -0.34rem;
            top: -0.34rem;
        }
    }
    .pop-mask {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, .7);
        z-index: 10;
    }
    .bonus-success{
        position: fixed;
        top:50%;
        left: 50%;
        transform: translate(-50%,-50%);
        width: 4.6rem;
        height: 5.66rem;
        background: url("../images/pop/bonussuccess.png");
        background-size: 100% 100%;
        z-index: 11;
        span{
            width: 100%;
            position: absolute;
            top:3.88rem;
            font-size:.3rem;
            font-weight:500;
            color:rgba(255,255,255,1);
            display: flex;
            align-items: center;
            justify-content: center;
            i{
                margin:0 .1rem;
                font-size:.35rem;
                display: inline-block;
                transform: rotate(135deg);
            }
        }
        .btnsure{
            position: absolute;
            left: 1.07rem;
            bottom: .38rem;
            width: 2.52rem;
            height: .83rem;
            line-height: .83rem;
            text-align: center;
            background: url("../images/pop/btnsure.png");
            background-size: 100% 100%;
            font-size:.37rem;
            font-weight:bold;
            color:rgba(194,38,13,1);
        }
        .close{
            position: absolute;
            left: 2rem;
            bottom: -.8rem;
            width: .57rem;
            height: .57rem;
            background: url("../images/pop/close.png");
            background-size: 100% 100%;
        }
    }
</style>
