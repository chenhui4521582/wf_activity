<template>
    <div v-if="islogin">
        <div class="page-login" ref="pageWrap" v-if="showindexpage">
            <div class="toppart">
                <div class="content">
                    <div class="selection-ways" v-if="!isWechatChannel">
                        <div class="vercode-load" :class="{selected:currentIndex==0}" @click="vercodeselect">验证码登录</div>
                        <div class="pwd-load" :class="{selected:currentIndex==1}" @click="pwdselect">账号密码登录</div>
                    </div>
                    <div class="line"></div>
                    <!--<div class="gap"></div>-->
                    <div class="form-groups" v-if="currentIndex==0" :class="{'grop-top':isWechatChannel}" >
                        <div class="group-input group-input1" style="background: #fff">
                            <div class="input-box  group-line">
                                <input type="tel" placeholder="请输入手机号码" maxlength="11" v-model="vAccount">
                            </div>
                        </div>
                        <div class="group-input group-input1" style="background: #fff">
                            <div class="input-box group-line">
                                <input type="tel" placeholder="请输入短信验证码" v-model="veCode" maxlength="6">
                                <div class="sendVECode" @click="sendcode" v-html="validatorText" v-if="validatorText=='获取验证码'"></div>
                                <div class="sendVECode"  v-html="validatorText" style="background: #808080" v-else></div>
                            </div>
                        </div>
                    </div>
                    <div class="form-groups" v-if="currentIndex==1">
                        <div class="group-input group-input1">
                            <div class="input-box  group-line">
                                <input type="tel" placeholder="请输入手机号码" maxlength="11" v-model="vAccount">
                            </div>

                        </div>
                        <div class="group-input group-input1">
                            <div class="input-box group-line">
                                <input :type="eyeclose?'password':'text'" placeholder="请输入密码" v-model="vCode" maxlength="16">
                                <div class="pwd-eye" :class="{pwdeyeopen:!eyeclose}" @click="eyeclose=!eyeclose"></div>
                            </div>
                        </div>
                    </div>
                    <div class="btn-box">
                        <a href="javascript:" :class="{'btn-login':isCanLoad,'btn-login-gray':!isCanLoad}" @click="submit">登录</a>
                    </div>
                    <div class="page-link" v-if="currentIndex==1">
                        <a class="forget-code" @click="forgetpwd">忘记密码</a>
                        <a class="free-regist" @click="freeregist">注册</a>
                    </div>
                    <div class="statement2" v-if=" !isWechatChannel && channel == '700003' "><div class="statement1">苏ICP备17060724号-1</div>@2017苏州玩蜂软件科技有限公司</div>
                    <div class="statement2" v-if="!isWechatChannel && channel == '700002'"><div class="statement1">蜀ICP备17017217号-1</div>@2018成都 六六五网络科技有限公司</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script type="text/javascript">
    import utils from '../../common/js/utils.js';
    export default {
        data() {
            return {
                title: '手机登录',
                popBtn: "确定",
                showPop: false,
                popContent: '',
                vAccount: '',
                vCode: '',
                veCode: '',
                channel: '',
                currentIndex: 0,//默认账号密码登录
                eyeclose: true,//默认密码不可见
                timer: null,
                validatorText: '获取验证码',
                isCanSend: 1,
                num: 0,
                backurl:'https://wap.beeplay123.com/wap/home',
                isWechatChannel : false,
                showPage : false,
                showindexpage:true,
                showforgetpwd:false,
                showregister:false,
                islogin: true
            }
        },
        beforeMount(){
            let isBind =localStorage.getItem('isBinding') === 'false' ? false : true
            this.showPage = true
        },
        mounted() {
            utils.getUrlParamObj('channel') && localStorage.setItem('APP_CHANNEL', utils.getUrlParamObj('channel'))
            if (utils.getUrlParamObj('token') && utils.getUrlParam("token").split("#/")[0]) {
                this.getAccessToken(utils.getUrlParamObj('token') && utils.getUrlParam("token").split("#/")[0]);
            } else {
                this.axios.post('//uic-api.beeplay123.com/uic/api/user/login/transInfo', {isShowTotast: "false"}).then((response) => {
                    if (response.data.code == 200) {
                        this.islogin = false;
                        this.token = localStorage.getItem('ACCESS_TOKEN')
                        this.back()
                    }
                })
            }
            this.channel = localStorage.getItem('APP_CHANNEL')
        },
        methods: {
            back(){
                location.replace('https://wap.beeplay123.com/llwWap?channel='+this.channel)
            },
            getUrlParam: function (ename) {
                var url = window.location.href;
                var Request = new Object();
                if (url.indexOf("?") != -1) {
                    var str = url.split('?')[1];
                    var strs = str.split("&");
                    for (var i = 0; i < strs.length; i++) {
                        Request[strs[i].split("=")[0]] = (strs[i].split("=")[1]);
                    }
                } else {
                    return '';
                }
                return Request[ename];
            },
            submit() {
                if (this.currentIndex == 0) {
                }
                if (this.currentIndex == 1) {
                }
                let vAccount = utils.checkValidate('phone', this.vAccount);
                let vCode = utils.checkValidate('pswd', this.vCode);
                let veCode = utils.checkValidate('code', this.veCode);
                if (this.vAccount == '') {
                    this.$toast.show({
                        message: '请输入您的手机号！',
                        duration: 1500
                    });
                    return;
                } else if (vAccount != '') {
                    this.$toast.show({
                        message: '手机号格式不正确！',
                        duration: 1500
                    });
                    return;
                }
                if (this.currentIndex == 0) {
                    if (this.veCode == '') {
                        this.$toast.show({
                            message: '验证码不得为空！',
                            duration: 1500
                        });
                        return;
                    } else if (veCode != '') {
                        this.$toast.show({
                            message: '验证码格式错误！',
                            duration: 1500
                        });
                        return;
                    }
                }
                if (this.currentIndex == 1) {
                    if (this.vCode == '') {
                        this.$toast.show({
                            message: '密码不得为空！',
                            duration: 1500
                        });
                        return;
                    } else if (vCode != '') {
                        this.$toast.show({
                            message: '密码格式错误！',
                            duration: 1500
                        });
                        return;
                    }
                }
                var requestTokenurl
                if(this.isWechatChannel){
                    requestTokenurl = '//uic-api.beeplay123.com/uic/api/user/login/sms/requestTokenWithBind'
                    var paramsObj = {
                        username: this.vAccount,
                        smsCode: this.veCode,
                        type: 4 //微信 openId
                    }
                }else{
                    requestTokenurl = this.currentIndex == 0 ? '//uic-api.beeplay123.com/uic/api/user/login/sms/requestToken' : '//uic-api.beeplay123.com/uic/api/user/login/requestToken';
                    var paramsObj = this.currentIndex == 0 ? {
                        username: this.vAccount,
                        smsCode: this.veCode,
                        visitorToken: ""
                    } : {username: this.vAccount, password: this.vCode};
                }
                this.axios.post(requestTokenurl, paramsObj).then((response) => {
                    if (response.data.code == 200) {
                        this.getAccessToken(response.data.data)
                    } else {
                        this.$toast.show({
                            message: response.data.message,
                            duration: 2000
                        });
                    }
                })
            },
            async getAccessToken(requestToken,isBinding){
                let res = await this.axios.post('//uic-api.beeplay123.com/uic/api/user/login/accessToken', {
                    token: requestToken,
                    type: 1
                })
                if (res.data.code == 200) {
                    let token = res.data.data.accessToken
                    localStorage.setItem('ACCESS_TOKEN', res.data.data.accessToken);

                    let {data:dataopenToken} = await this.axios.post('//uic-api.beeplay123.com/uic/api/user/sdk/openToken')
                    if (dataopenToken.code == 200) {
                        localStorage.setItem('OPEN_ACCESS_TOKEN', dataopenToken.data.token);
                    }

                    if(!this.isWechatChannel){
                        this.$toast.show({
                            message: '登录成功',
                            duration: 1500
                        });
                        setTimeout(() => {
                            this.back();
                        }, 1000);
                    }else{
                        this.axios.post('//platform-api.beeplay123.com/wap/api/oauth/wx/config', {
                            value: encodeURIComponent(window.location.href.split('#')[0])
                        }).then((res) => {
                            if(res.data.code != 200) {
                                return;
                            }
                            let params = res.data.data;
                            localStorage.setItem('title',params.title)
                            if(!isBinding){
                                location.href = params.auth+'default?accessToken='+token+'&act=bind'
                            }else{
                                setTimeout(() => {
                                    this.back();
                                }, 200);
                            }
                        })
                    }

                } else {
                    this.$toast.show({
                        message: res.data.message,
                        duration: 2000
                    });
                }
            },
            sendcode(){
                var self = this;
                var vAccount = utils.checkValidate('phone', this.vAccount);
                if (vAccount) {
                    self.$toast.show({
                        message: !this.vAccount ? '手机号不能为空' : vAccount,
                        duration: 1500
                    });
                } else {
                    this.SendVerificationCode(this.vAccount).then(function (res) {
                        let message = res.data.code == 200 ? '验证码已发送注意查收' : res.data.message;
                        if(res.data.code == 200){
                            self.isCanSend = 0;
                            self.validatorText = 60 + 's后重发';
                            self.timer = setInterval(function () {
                                self.num = self.num + 1;
                                if (self.num == 60) {
                                    clearInterval(self.timer);
                                    self.isCanSend = 1;
                                    self.validatorText = '获取验证码';
                                    self.num = 0;
                                } else {
                                    self.validatorText = 60 - self.num + 's后重发';
                                }
                            }, 1000);
                        }
                        self.$toast.show({
                            message: message,
                            duration: 1500
                        });
                    })
                }
            },
            SendVerificationCode: function (code) {
                return this.axios.post('//uic-api.beeplay123.com/uic/api/user/login/sendSmsCode', {
                    username: code,
                    receiveRange : 1
                });
            },
            forgetpwd(){
                location.replace('#/forgetpwd')
            },
            freeregist(){
                location.replace('#/register')
            },
            vercodeselect(){
                this.currentIndex=0;
            },
            pwdselect(){
                this.currentIndex=1;
            }
        },
        computed: {
            isCanLoad(){
                return (this.currentIndex == 0 && this.vAccount.length > 0 && this.veCode.length > 0) || (this.currentIndex == 1 && this.vAccount.length > 0 && this.vCode.length > 0)
            }
        },
        watch: {
            currentIndex(val){
                if (val == 1) {
                    this.veCode = '';
                    this.isCanSend = 1;
                }
            }
        }
    }
</script>
<style lang="less" scoped>
    a {
        text-decoration: none;
    }

    .page-header {
        width: 100%;
        height: 1.76/2rem;
        line-height: 1.76/2rem;
        position: relative;
        text-align: center;
        font-size: 0.68/2rem;
        color: #fff;

    }

    .page-header .page-back {
        width: 1.24/2rem;
        height: 1.76/2rem;
        position: absolute;
        left: 0;
        top: 0;
    }

    .page-header .h-back {
        width: 0.4/2rem;
        height: 0.68/2rem;
        float: right;
        margin-top: 0.54/2rem;
    }
    .grop-top{padding-top: .3/2rem;}
    .group-input {
        padding: 0 0 0 0.6/2rem;
        background: #193b73;
        position: relative;
        &.group-input1{
            /*position: absolute;*/
            /*left: .6rem;*/
            width: 6.3rem;
            height: .9rem;
            background: #fff;
            border: 1px solid #bdbdbd;
            border-radius: .45rem;
            display: -ms-flexbox;
            display: flex;
            -ms-flex-align: center;
            align-items: center;
            margin-bottom: .5rem;
            margin-left: .5rem;
            box-sizing: border-box;
        }
        &:nth-child(1):after {
            bottom: 0;
        }
    }

    .btn-verification {
        position: absolute;
        right: 0;
        top: .36/2rem;
        width: 3.8/2rem;
        height: 1.2/2rem;
        line-height: 1.2/2rem;
        box-sizing: border-box;
        border: 0.04/2rem solid #c04bb6;
        background: #440436;
        font-size: 0.48/2rem;
        color: #c04bb6;
        border-radius: 0.16/2rem;
        box-sizing: border-box;
        margin-right: 0.6/2rem;
        /*margin: 0 0.28/2rem 0 0.1/2rem;*/
        &.disabled {
            border-color: #736f95;
            color: #736f95;
        }
        i {
            font-style: normal;
        }
    }

    .input-box {
        position: relative;
        width: 100%;
        height: 2.26/2rem;
        line-height: 1.9/2rem;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        position: relative;
        &:nth-child(2) {
            height: 2.16/2rem;
        }
        .pwd-eye {
            width: .88/2rem;
            height: .88/2rem;
            //background: url(image/login/login_eye_close@2x.png) no-repeat;
            //background-size: 100% 100%;
            position: absolute;
            right: 2.5/2rem;
            top: 0.7/2rem;
            &.pwdeyeopen {
                //background: url(image/login/login_eye_open@2x.png) no-repeat;
                //background-size: 100% 100%;
            }
        }
        .group-name {
            float: left;
            width: 1.2/2rem;
            height: 1.2/2rem;
            //background: url(image/login/login-mobile@2x.png) no-repeat;
            //background-size: 100% 100%;
            &.group-password {
                //background: url(image/login/login-pwd@2x.png) no-repeat;
                //background-size: 100% 100%;
            }
            &.group-veword {
                //background: url(image/login/login-vecode@2x.png) no-repeat;
                //background-size: 100% 100%;
            }
        }
        .input-btn {
            display: block;
            height: 100%;
            flex: 1;

        }
        input {
            border: none;
            outline: none;
            height: 1.8/2rem;
            width: 5.5rem;
            line-height: 1.8/2rem;
            background-color: transparent;
            font-size: 0.64/2rem;
            font-family: PingFangSC-Regular;
            color: rgba(0,0,0, 1);
            margin-left: .42/2rem;
            &::placeholder {
                color: rgba(189, 189, 189, 1);
            }
        }
        .sendVECode {
            height: 1/2rem;
            border-radius: .2/2rem;
            line-height: 1.6/2rem;
            text-align: center;
            font-size: .32rem;
            font-family: PingFangSC-Regular;
            color: rgba(0,0,0, 1);
            line-height: 1/2rem;
            position: absolute;
            right: .5rem;
            top: 0.6/2rem;
        }
    }

    .page-login {
        width: 100%;
        height: 100%;
        min-height: 100%;
        max-height: 100%;
        position: fixed;
        left: 0;
        top: 0;
        padding-top: 3rem;
        display: flex;
        flex-direction: column;
        .toppart {
            flex: 5
        }
        .page-link {
            padding: 0.8/2rem 1.62/2rem;
            height: 0.5/2rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
            a {
                font-size: 0.48/2rem;
                color: #000;
                position: relative;
                &:after {
                    content: '';
                    width: 1.92/2rem;
                    height: .02/2rem;
                    display: block;
                    position: absolute;
                    /* bottom: 1.4/2rem; */
                    background: #000;
                    top: .75/2rem;
                }
                &.free-regist {
                    &:after {
                        content: '';
                        width: .96/2rem;
                    }
                }
            }
        }
        .btn-box {
            padding: 0 0 0.64/2rem 0;
        }
        .btn-login {
            display: block;
            width: 6.3rem;
            height: .9rem;
            line-height: 1.6/2rem;
            text-align: center;
            font-size: .32rem;
            color: #fff;
            border-radius: .45rem;
            margin: 0 auto;
            background: #3269e4;
        }
        .btn-login-gray {
            display: block;
            width: 6.3rem;
            height: .9rem;
            line-height: 1.6/2rem;
            text-align: center;
            font-size: .32rem;
            color: #ccc;
            border-radius: .45rem;
            margin: 0 auto;
            background: #3269e4;
            opacity: .3;
        }
        &:after {
            content: '';
            position: absolute;
            top: 2.15rem;
            left: 2.72rem;
            width: 1.99rem;
            height: .31rem;
            background: url('./images/desc.png') no-repeat;
            background-size: 100% 100%;
        }
    }

    .footer-box {
        width: 100%;
        flex: 1;
        text-align: center;
        position: relative;
        .footer-title {
            display: flex;
            align-items: center;
            justify-content: center;
            .f-line {
                display: block;
                height: 0.04/2rem;
                width: 4.5/2rem;
                background: #19366a;
            }
            .f-text {
                margin: 0 0.6/2rem;
                font-size: 0.48/2rem;
                color: #ccc;
            }
        }
        .qq-icon {
            width: 1.4/2rem;
            height: 1.4/2rem;
            margin: 1.1/2rem auto 2.0/2rem;
        }
        .statement {
            position: absolute;
            bottom: 0;
            color: #666;
        }
    }

    .content {
        height: 100%;
        /*background: linear-gradient(top, #1B427F, #0E172D);*/
        position: relative;
        .selection-ways {
            width: 100%;
            height: 1.8/2rem;
            padding: .62/2rem 1rem 0 .11rem;
            display: flex;
            justify-content: space-around;
            font-size: .56/2rem;
            font-family: PingFangSC-Regular;
            color: #000;
            box-shadow: 0 .4/2rem .4/2rem #FF000000;
            .selected {
                position: relative;
                color: rgba(255, 216, 61, 1);
                &:after {
                    content: '';
                    width: 3/2rem;
                    height: .04/2rem;
                    background: rgba(255, 216, 61, 1);
                    display: block;
                    position: absolute;
                    bottom: 0;
                }
            }
        }
        .gap {
            height: .4/2rem;
            background: #1B427F;
        }
        .statement1 {
            width: 100%;
            position: absolute;
            bottom: .5/2rem;
            height: 2/2rem;
            font-size: .4/2rem;
            font-family: PingFangSC-Regular;
            color: #666;
            text-align: center;
            transform: translateX(0%) !important;
            margin-bottom: 0.15/2rem;
        }
        .statement2 {
            width: 100%;
            position: fixed;
            bottom: .0/2rem;
            left: 0 !important;
            height: 2/2rem;
            font-size: .4/2rem;
            font-family: PingFangSC-Regular;
            color: #666;
            text-align: center;
            transform: translateX(0%) !important;
        }
    }

    @media only screen and (max-width: 320px) {
        .page-login .page-link a:after {
            top: .76/2rem;
        }

        /*.content .statement1 {*/
        /*transform: translateX(15%);*/
        /*}*/
        .input-box{
            left:0
        }
        .content .statement2 {
            transform: translateX(15%);
        }
        .input-box .pwd-eye,.input-box .sendVECode{
            right:1/2rem;
        }
    }
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
</style>

