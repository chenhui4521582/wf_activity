<template>
    <div class="pop-window" v-if="show">
        <div class="pop-mask" @touchmove.prevent></div>

        <div class="bonus-opened">
            <div class="num">{{data.num}}个红包共开出</div>
            <div class="content" :class="{one:data.awardList.length==1,two:data.awardList.length==2}">
                <div class="item" v-for="(item,index) in data.awardList">
                    <div class="item_item">
                        <img src="../images/pop/leaf.png" alt="" v-if="item.awardName=='金叶子'">
                        <img src="../images/pop/jd.png" alt="" v-else-if="item.awardName=='京东卡'">
                        <img src="../images/pop/fee.png" alt="" v-else-if="item.awardName=='话费'">
                        <div>
                            {{item.awardName}} <br> <i>{{item.awardAmount}}</i><i class="danwei" v-if="item.awardName!='金叶子'">元</i>
                        </div>
                    </div>
                    <div class="line" v-if="index<data.awardList.length-1"></div>
                </div>
                <!--<div class="item">-->
                    <!--<div class="item_item">-->
                        <!--<img src="../images/pop/leaf.png" alt="">-->
                        <!--<div>-->
                            <!--金叶子 <br> <i>100000</i>-->
                        <!--</div>-->
                    <!--</div>-->
                    <!--<div class="line"></div>-->
                <!--</div>-->
                <!--<div class="item">-->
                    <!--<div class="item_item">-->
                        <!--<img src="../images/pop/fee.png" alt="">-->
                        <!--<div>-->
                            <!--话费碎片 <br><i>50</i><i class="danwei">元</i>-->
                        <!--</div>-->
                    <!--</div>-->
                    <!--<div class="line"></div>-->
                <!--</div>-->
                <!--<div class="item">-->
                    <!--<div class="item_item">-->
                        <!--<img src="../images/pop/jd.png" alt="">-->
                        <!--<div>-->
                            <!--京东卡 <br><i>100</i><i class="danwei">元</i>-->
                        <!--</div>-->
                    <!--</div>-->
                <!--</div>-->
            </div>
            <div class="btnsure" @click="btnsure">获取更多的红包</div>
            <div class="close" @click="close"></div>
        </div>
    </div>
</template>
<script type="text/javascript">
    export default {
        data() {
            return {
                // show:false
            }
        },
        props:{
            show:{
                type: Boolean,
                default: false
            },
            data: {
                type: Object,
                default: null
            }
        },
        methods: {
            btnsure(){
                GLOBALS.buriedPoint('1207003026','春节红包-开红包-获取更多红包')
                this.$emit('close')
                this.$emit('gainmore')
            },
            close(){
                GLOBALS.buriedPoint('1207003027','春节红包-开红包-关闭')
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
    .bonus-opened{
        position: fixed;
        top:50%;
        left: 50%;
        transform: translate(-50%,-50%);
        width: 7.2rem;
        height: 9.61rem;
        background: url("../images/pop/bonusopenedbottom.png");
        background-size: 100% 100%;
        z-index: 11;
        .num{
            position: absolute;
            top: 2.69rem;
            left: 1.74rem;
            width: 3.79rem;
            text-align: center;
            font-size: .36rem;
            color: rgba(207,61,38,1);
            font-weight: bold;
        }
        .content{
            position: absolute;
            top:3.58rem;
            left: 1.74rem;
            width:3.79rem;
            height: 1.67rem;
            display: flex;
            justify-content: space-between;
            .item{
                flex: 1;
                display: flex;
                align-items: center;
                .item_item{
                    display: flex;
                    flex-direction: column;
                    text-align: center;
                    justify-content: space-between;
                    height: 100%;
                    img{
                        width: 1.02rem;
                        height: 1.02rem;
                    }
                    div{
                        font-size:.21rem;
                        font-weight:bold;
                        color:rgba(181,123,31,1);
                        i{
                            font-size:.26rem;
                            color:rgba(184,42,1,1);
                            line-height:.35rem;
                            &.danwei{
                                font-size:.21rem;
                            }
                        }
                    }
                }
                .line{
                    width:.01rem;
                    height:1.22rem;
                    background:rgba(255,173,112,.7);
                    margin-left: .14rem;
                }
            }
            &.one .item{
                justify-content: center;
            }
            &.two .item{
                justify-content: space-around;
            }
        }
        .btnsure{
            position: absolute;
            left: 1.47rem;
            bottom: 1.68rem;
            width: 4.32rem;
            height: .83rem;
            line-height: .83rem;
            text-align: center;
            background: url("../images/pop/btn_bottom.png");
            background-size: 100% 100%;
            font-size:.37rem;
            font-weight:bold;
            color:rgba(194,38,13,1);
        }
    }
    .close{
        position: absolute;
        left: 3.34rem;
        bottom: .14rem;
        width: .57rem;
        height: .57rem;
        background: url("../images/pop/close.png");
        background-size: 100% 100%;
    }
</style>

