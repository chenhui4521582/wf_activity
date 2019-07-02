<template>
    <div class="pop-window">
        <div class="bonus-record">
            <div class="title">昵称</div>
            <div class="title">获取时间</div>
            <div class="title">奖励详情</div>
            <div class="content">
                <scroll :data="data">
                    <ul>
                        <li v-for="item in data">
                            <div style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width: 2rem">{{item.nickName||''}}</div>
                            <div style="width: 2rem;text-align: center;">{{item.receiveTime||''}}</div>
                            <div style="width: 1.8rem;text-align: right;">{{item.awardsName||''}}</div>
                        </li>
                    </ul>
                </scroll>
            </div>
        </div>
    </div>
</template>
<script type="text/javascript">
    import scroll from './scroll'
    export default {
        props:{
            data: {
                type: Array,
                default: []
            }
        },
        components:{
            scroll
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
    .bonus-record{
        position: absolute;
        z-index: 11;
        left: .6rem;
        right: .65rem;
        height: 4rem;
        top:1.18rem;
        .title{
            font-size:.24rem;
            font-weight:400;
            color:rgba(236,244,255,1);
            position: absolute;
            &:nth-child(1){
                left:0;
            }
            &:nth-child(2){
                left: 2.08rem;
            }
            &:nth-child(3){
                right: 0;
            }
        }
        .content{
            position: absolute;
            height: 3.5rem;
            top: .34rem;
            left: 0rem;
            right: 0;
            font-size: .18rem;
            font-weight:400;
            color:rgba(254,223,42,1);
            overflow: hidden;
            ul{
                display: flex;
                flex-direction: column;
                li{
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: .2rem;
                }
            }
        }
        .close{
            position: absolute;
            left: 2.63rem;
            bottom: -.9rem;
            width: .57rem;
            height: .57rem;
            background: url("../images/bonus/close.png");
            background-size: 100% 100%;
            font-size:.37rem;
            font-weight:bold;
            color:rgba(194,38,13,1);
        }
    }
</style>
