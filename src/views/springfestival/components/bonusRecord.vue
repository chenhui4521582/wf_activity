<template>
    <div class="pop-window" v-if="show">
        <div class="pop-mask" @touchmove.prevent></div>
        <div class="bonus-record">
            <div class="title">红包记录详情</div>
            <div class="title">时间</div>
            <div class="content">
                <scroll :data="list">
                    <ul>
                        <!--activityName: "参与“加赠红包，超值回馈”获得4个红包"-->
                        <!--amount: 4-->
                        <!--receiveTime: "2019-01-17 14:23:52"-->
                        <li v-for="item in list">
                            <div style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width: 3.2rem;height: 0.35rem;line-height: 0.35rem;">{{item.activityName}}</div>
                            <div>{{item.receiveTime&&item.receiveTime.split(' ')[0]||''}}</div>
                        </li>
                    </ul>
                </scroll>
            </div>
            <div class="close" @click="besure"></div>
        </div>
    </div>
</template>
<script type="text/javascript">
    import scroll from './scroll'
    export default {
        data() {
            return {
                // show:false,
                //list:[1,2,3,4,5,7]
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
        computed:{
            list(){
                return this.data&&this.data.logList||[]
            }
        },
        components:{
            scroll
        },
        methods: {
            besure(){
                GLOBALS.buriedPoint('1207003021','春节红包-红包记录-关闭')
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
    .bonus-record{
        position: fixed;
        top:50%;
        left: 50%;
        transform: translate(-50%,-50%);
        width: 5.77rem;
        height: 7.1rem;
        background: url("../images/pop/bonusrecordbottom.png");
        background-size: 100% 100%;
        z-index: 11;
        .title{
            font-size:.2rem;
            font-weight:bold;
            color:rgba(205,39,39,1);
            position: absolute;
            top:1.4rem;
            &:nth-child(1){
                left: 1.43rem;
            }
            &:nth-child(2){
                right: .9rem;
            }
        }
        .content{
            position: absolute;
            height: 4.9rem;
            top:1.8rem;
            left: .54rem;
            right: .64rem;
            font-size:.2rem;
            font-weight:bold;
            overflow: hidden;
            ul{
                display: flex;
                flex-direction: column;
                li{
                    display: flex;
                    justify-content: space-between;
                    color:rgba(196,119,35,1);
                    margin-bottom: .23rem;
                }
            }
        }
        .close{
            position: absolute;
            left: 2.63rem;
            bottom: -.9rem;
            width: .57rem;
            height: .57rem;
            background: url("../images/pop/close.png");
            background-size: 100% 100%;
            font-size:.37rem;
            font-weight:bold;
            color:rgba(194,38,13,1);
        }
        &:before{
            content: '';
            position: absolute;
            left: 3.88rem;
            top:1.43rem;
            width:.01rem;
            height:5.06rem;
            background:rgba(236,188,108,1);
        }
    }
</style>
