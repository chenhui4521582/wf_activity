<template>
    <div id="app" v-if="islogin">
        <div class="login-container">
            <div class="uername input">
                <input type="tel" name="uername" placeholder="请输入手机号" v-model="mobile" maxlength="11">
            </div>
            <div class="password input">
                <input type="password" name="password" placeholder="请输入验证码" v-model="code" maxlength="6">
                <div class="code" v-if="validatorText=='获取验证码'" @click="sendcode">{{validatorText}}</div>
                <div class="code" v-else>{{validatorText}}</div>
            </div>
            <div class="login" v-if="mobile&&code" @click="submit">
                登录
            </div>
            <div class="login login-gray" v-else>
                登录
            </div>
        </div>
        <div class="login-box">
            <div class="qqlogin">
                <div class="linel"></div>
                <span>第三方登录</span>
                <div class="liner"></div>
            </div>
            <button class="qq" @click="onQQLogin1">
            </button>
        </div>
    </div>
</template>

<script>
    import utils from '../../common/js/utils.js'
    import AppCall from '../../common/js/AppCall.js';
    import API from '../../api';
    import base64url from 'base64-url'
    export default {
        name: 'app',
        data(){
            return {
                mobile: '',
                code: '',
                msg: '获取验证码',
                token: '',
                timer: null,
                validatorText: '获取验证码',
                isCanSend: 1,
                num: 0,
                islogin: true
            }
        },
        methods: {
            onQQLogin1() {
                location.href = `//uic-api.beeplaying.com/uic/api/wap/qq/toLogin2?channel=${this.channel}&source=1&a=${new Date().getTime()}&redirectwfurl=${encodeURIComponent(location.href)}`
            },
            submit() {
                let vAccount = utils.checkValidate('phone', this.mobile);
                let veCode = utils.checkValidate('code', this.code);
                if (this.mobile == '') {
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
                if (this.code == '') {
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
                var requestTokenurl
                requestTokenurl = '//uic-api.beeplaying.com/uic/api/user/login/sms/requestToken';
                var paramsObj = {
                    username: this.mobile,
                    smsCode: this.code,
                    visitorToken: ""
                };
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
            // getAccessToken(requestToken){
            //     this.axios.post('//uic-api.beeplaying.com/uic/api/user/login/accessToken', {
            //         token: requestToken,
            //         type: 1
            //     }).then((res) => {
            //         if (res.data.code == 200) {
            //             this.token = res.data.data.accessToken
            //             localStorage.setItem('ACCESS_TOKEN', res.data.data.accessToken);
            //             this.$toast.show({
            //                 message: '登录成功',
            //                 duration: 1500
            //             });
            //             setTimeout(() => {
            //                 this.islogin = false;
            //                 this.back();
            //             }, 1000);
            //
            //         } else {
            //             this.$toast.show({
            //                 message: res.data.message,
            //                 duration: 2000
            //             });
            //         }
            //     })
            // },
            async getAccessToken(requestToken){
                let {data:data}=await this.axios.post('//uic-api.beeplaying.com/uic/api/user/login/accessToken', {
                    token: requestToken,
                    type: 1
                })
                if (data.code == 200) {
                    this.token = data.data.accessToken
                    localStorage.setItem('ACCESS_TOKEN', data.data.accessToken);
                    let {data:dataopenToken} = await this.axios.post('//uic-api.beeplaying.com/uic/api/user/sdk/openToken')
                    if (dataopenToken.code == 200) {
                        localStorage.setItem('OPEN_ACCESS_TOKEN', dataopenToken.data.token);
                        this.$toast.show({
                            message: '登录成功',
                            duration: 1500
                        });
                        setTimeout(() => {
                            this.islogin = false;
                            this.back(dataopenToken.data.token);
                        }, 1000);
                    }
                } else {
                    this.$toast.show({
                        message: data.message,
                        duration: 2000
                    });
                }
            },
            sendcode(){
                var self = this;
                var vAccount = utils.checkValidate('phone', this.mobile);
                if (vAccount) {
                    self.$toast.show({
                        message: !this.mobile ? '手机号不能为空' : vAccount,
                        duration: 1500
                    });
                } else {
                    this.SendVerificationCode(this.mobile).then(function (res) {
                        let message = res.data.code == 200 ? '验证码已发送注意查收' : res.data.message;
                        if (res.data.code == 200) {
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
                return this.axios.post('//uic-api.beeplaying.com/uic/api/user/login/sendSmsCode', {
                    username: code,
                    receiveRange: 1
                });
            },
            back(token){
                if(this.channel==100037){
                    window.location.href = `${this.gurl}&channel=${this.channel}&token=${token}&gurl=${utils.getUrlParamObj('extgameurl')}&pf=freeshop`
                }
                if(this.channel.includes('100038')||this.channel=='100060'||this.channel=='100051005'){
                    this.getJumpURL(this.platSource)
                }
            },
            async getJumpURL(val){
                let {data:data} = await this.axios.post('//platform-api.beeplaying.com/wap/api/plat/entranceRedirect', {
                    value: val,
                })
                if(data.code == 200){
                    data.data.gameListVersion&&localStorage.setItem('version_flag',data.data.gameListVersion)
                    if(localStorage.getItem('APP_CHANNEL') == 100033){
                        GLOBALS.jumpOutsideGame(data.data.redirect)
                    }else{
                        let params = data.data.redirect,
                            // 自己游戏跳转
                            keyWords = val && val.includes('inside'),
                            // 外部游戏跳转
                            outsideGame = val && val.includes('outside')

                        let llw = localStorage.getItem('APP_CHANNEL')
                        if(llw == '110002') {
                            llw = '110002002'
                        }

                        if(keyWords){
                            location.href = data.data.redirect+'?channel='+llw
                        } else if(outsideGame){
                            GLOBALS.jumpOutsideGame(data.data.redirect)
                        }else{
                            if(params == 'plat'){
                                if(localStorage.getItem('APP_CHANNEL') == 100001||this.channel.includes('100038')){
                                    location.href = 'https://wap.beeplaying.com/bdWap?channel='+llw+'&isNewLogin=1&from='+this.platSource
                                }else{
                                    location.href = 'https://wap.beeplaying.com/wap/home?channel='+llw+'&isNewLogin=1&from='+this.platSource

                                }
                            }else{
                                location.href = params+'?channel='+llw+'&isNewLogin=1&from='+this.platSource
                            }
                        }

                    }

                }
            },
        },
        computed: {
            channel(){
                return utils.getUrlParamObj('channel')||localStorage.getItem('APP_CHANNEL')
            },
            gurl(){
                return utils.getUrlParamObj('extgameurl') && base64url.decode(utils.getUrlParamObj('extgameurl'))
            },
            platSource(){
                return utils.getUrlParamObj('from')
            }
        },
        mounted(){
            utils.getUrlParamObj('channel') && localStorage.setItem('APP_CHANNEL', utils.getUrlParamObj('channel'))
            if (utils.getUrlParamObj('token') && utils.getUrlParam("token").split("#/")[0]) {
                this.getAccessToken(utils.getUrlParamObj('token') && utils.getUrlParam("token").split("#/")[0]);
            } else {
                this.axios.post('//uic-api.beeplaying.com/uic/api/user/login/transInfo', {isShowTotast: "false"}).then((response) => {
                    if (response.data.code == 200) {
                        this.islogin = false;
                        this.token = localStorage.getItem('ACCESS_TOKEN')
                        this.back()
                    }
                })
            }
        }
    }
</script>

<style lang="less" scoped>
    @import '../../common/css/base.css';

    #app {
        width: 100%;
        height: 100vh;
        /*position: absolute;
        left: 0;
        top: 0;*/
        &:before {
            content: '';
            position: absolute;
            top: 1.41rem;
            left: 3.01rem;
            width: 1.49rem;
            height: 1.49rem;
            background: url('./images/duoduowan.png') no-repeat;
            background-size: 100% 100%;
        }
        &:after {
            content: '';
            position: absolute;
            top: 3.15rem;
            left: 2.72rem;
            width: 1.99rem;
            height: .31rem;
            background: url('./images/desc.png') no-repeat;
            background-size: 100% 100%;
        }
    }

    .input {
        position: absolute;
        left: .6rem;
        width: 6.3rem;
        height: .9rem;
        background: #ffffff;
        border: 1px solid #BDBDBD;
        border-radius: .45rem;
        display: flex;
        align-items: center;
        input {
            width: 5.5rem;
            /* height: .7rem; */
            font-size: .32rem;
            color: #424242;
            margin-left: .4rem;
            &::placeholder {
                color: rgba(189, 189, 189, 1);
            }
        }
        &:nth-child(1) {
            top: 4.45rem;
        }
        &:nth-child(2) {
            top: 5.65rem;
            input {
                width: 3.5rem;
            }
            .code {
                position: absolute;
                left: 4.38rem;
                height: .9rem;
                line-height: .9rem;
                font-size: .32rem;
            }
        }
    }

    .login {
        position: absolute;
        left: .6rem;
        top: 6.85rem;
        width: 6.3rem;
        height: .9rem;
        background: rgba(50, 105, 228, 1);
        opacity: 1;
        border-radius: .45rem;
        line-height: .9rem;
        text-align: center;
        font-size: .32rem;
        color: rgba(255, 255, 255, 1);
        margin-bottom: 1.5rem;
        &.login-gray {
            opacity: .5;
        }
    }

    .qqlogin {
        /*position: absolute;
        bottom: 1.84rem;
        left: .6rem;
        right: .6rem;*/
        display: flex;
        align-items: center;
        margin-bottom: 0.6rem;
        .linel {
            flex: 1;
            height: .02rem;
            background: rgba(224, 224, 224, 1);
        }
        .liner {
            flex: 1;
            height: .02rem;
            background: rgba(224, 224, 224, 1);
        }
        span {
            flex: 1;
            font-size: .24rem;
            color: rgba(224, 224, 224, 1);
            text-align: center;
        }
    }

    .qq {
        /*position: absolute;
        bottom: .49rem;
        left: 3.15rem;*/
        width: .9rem;
        height: .9rem;
        background: url('./images/qq.png') no-repeat;
        background-size: 100% 100%;
    }
    .login-box{
        height: 4.0rem;
        text-align: center;
        padding: 0 0.6rem;
    }
    .login-container {
        width: 100%;
        height: 9rem;

    }
</style>
