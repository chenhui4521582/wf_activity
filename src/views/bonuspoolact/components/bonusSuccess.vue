<template>
    <div class="pop-window">
        <div class="pop-mask" @touchmove.prevent></div>
        <div class="bonus-success" v-if="count==0">
            <span class="title title0">活动规则</span>
            <div class="desc">
                <p>1. 活动时间：{{dataStr}}</p>
                <p>2. 参与方式：每天进入活动页面报名且当日付费任意大于2元金额即可获得瓜分机会</p>
                <p>3. 每日瓜分时间：每日22点整开始瓜分。</p>
                <p>4. 奖品发放：现金奖励为话费券，进入活动页面领取奖励，奖励发放至我的资产。活动期间内所得的奖励，若用户在活动结束时仍未领取，则自动失效。</p>
                <p>5. 如有其他疑问，请点击<i @click="concat">咨询客服</i>。活动最终解释权归平台所有</p>
            </div>
            <div class="close" @click="close(1)"></div>
        </div>
        <div class="bonus-success mobile" v-if="count==1">
            <div class="title">请输入接受短信通知的手机号码</div>
            <input ref="telPhone" type="tel" pattern="[0-9]*" maxlength="11" v-model="telPhone" class="mobile_input">
            <div class="btnsure" @click="besure" >确认</div>
            <div class="info">*开启短信通知会在奖池开启前半小时向您绑定的手机发送提醒消息。您可随时在当前页面取消订阅。</div>
            <div class="close" @click="close(0)"></div>
        </div>
    </div>
</template>
<script type="text/javascript">
    export default {
        data() {
            return {
                telPhone:''
            }
        },
        props:{
            count:{
                type:  Number,
                default: '0'
            },
            dataStr:{
                type: String,
                default: ''
            }
        },
        computed:{
            isRight () {
                let reg = /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/
                return this.telPhone && reg.test(this.telPhone)
            },
        },
        methods: {
            fetch(url, params) {
                if (url.startsWith('/ops/api')) {
                    url = '//ops-api.beeplay123.com' + url
                }
                if (url.startsWith('/wap/api')) {
                    url = '//platform-api.beeplay123.com' + url
                }
                if (url.startsWith('/wap/api')) {
                    url = '//shop-api.beeplay123.com' + url
                }
                return this.axios.post(url, params, {})
            },//请求封装方法
            async besure(){
                if (!this.isRight) {
                    this.$toast.show({
                        message:'请输入正确的手机号',
                        duration:2000
                    })
                    return
                }else{
                    //接口
                    let {data:data}=await this.fetch('/ops/api/jackpot/userOpenSms',{value:this.telPhone})
                    if(data.code==200){
                        this.$toast.show({
                            message:'提交成功',
                            duration:2000
                        })
                        this.$emit('refresh')
                        this.$emit('close')
                    }else{
                        this.$toast.show({
                            message:data.message,
                            duration:2000
                        })
                    }
                }
            },
            close(flag){
                if(flag){
                    this.$emit('close')
                }else{
                    this.$emit('closemobile')
                }
            },
            concat(){
                location.href=window.linkUrl.getBackUrl(localStorage.getItem('APP_CHANNEL'),'',false,false,'#/problem?tab=contact_personal')
            }
        },
        mounted(){
            this.$refs.telPhone&&this.$refs.telPhone.focus()
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
        width: 5.1rem;
        height: 5.98rem;
        background: url("../images/bonus/rule.png");
        background-size: 100% 100%;
        z-index: 11;
        &.mobile{
            background: url("../images/bonus/phonecheck.png");
            background-size: 100% 100%;
        }
        .title{
            position: absolute;
            top:.61rem;
            left: .9rem;
            right: 1.04rem;
            font-size:.36rem;
            font-weight:bold;
            color:rgba(255,247,243,1);
            text-align: center;
            &.title0{
                top:.34rem;
            }
        }
        .mobile_input{
            position: absolute;
            top: 2rem;
            height: .3rem;
            left: .9rem;
            width: 3.2rem;
            font-size: .3rem;
            background: transparent;
            font-weight:400;
            color:rgba(253,192,40,1);
        }
        .desc{
            position: absolute;
            top:1.11rem;
            left:.48rem;
            right:.45rem;
            font-size:.22rem;
            font-weight:400;
            color:rgba(255,230,167,1);
            line-height:.36rem;
            i{
                color: #5c0421;
                text-decoration: underline;
            }
        }
        .info{
            position: absolute;
            bottom: .95rem;
            left: .55rem;
            right: .45rem;
            font-size:.22rem;
            font-weight:400;
            color:rgba(255,223,142,1);
            line-height: .36rem;
        }
        .btnsure{
            position: absolute;
            left: .57rem;
            top: 2.87rem;
            line-height: .76rem;
            text-align: center;
            width:3.9rem;
            height:.76rem;
            background:rgba(253,192,40,1);
            border-radius:.38rem;
            font-size:.36rem;
            font-weight:bold;
            color:rgba(253,21,51,1);
        }
        .close{
            position: absolute;
            left: 2rem;
            bottom: -.8rem;
            width: .57rem;
            height: .57rem;
            background: url("../images/bonus/close.png");
            background-size: 100% 100%;
        }
    }
</style>
