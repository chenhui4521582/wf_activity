<template>
    <div class="entry">
        加载中...
    </div>
</template>
<script type="text/javascript">
    import utils from '../../../common/js/utils.js';
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
                backurl:'https://wap.beeplaying.com/wap/home',
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
                // this.getAccessToken(utils.getUrlParamObj('token') && utils.getUrlParam("token").split("#/")[0]);
                this.$router.push('/home')
            } else {
                this.axios.post('//uic-api.beeplaying.com/uic/api/user/login/transInfo', {isShowTotast: "false"}).then((response) => {
                    if (response.data.code == 200) {
                        this.islogin = false;
                        this.token = localStorage.getItem('ACCESS_TOKEN')
                        this.back()
                    }else {
                    	this.$router.push('/home')
                    }
                })
            }
            this.channel = localStorage.getItem('APP_CHANNEL')
        },
        methods: {
            back(){
                location.replace('https://wap.beeplaying.com/llwWap?channel='+this.channel)
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
                    requestTokenurl = '//uic-api.beeplaying.com/uic/api/user/login/sms/requestTokenWithBind'
                    var paramsObj = {
                        username: this.vAccount,
                        smsCode: this.veCode,
                        type: 4 //微信 openId
                    }
                }else{
                    requestTokenurl = this.currentIndex == 0 ? '//uic-api.beeplaying.com/uic/api/user/login/sms/requestToken' : '//uic-api.beeplaying.com/uic/api/user/login/requestToken';
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
            getAccessToken(requestToken,isBinding){
                this.axios.post('//uic-api.beeplaying.com/uic/api/user/login/accessToken', {
                    token: requestToken,
                    type: 1
                }).then((res) => {
                    if (res.data.code == 200) {
                        let token = res.data.data.accessToken
                        localStorage.setItem('ACCESS_TOKEN', res.data.data.accessToken);

                        if(!this.isWechatChannel){
                            this.$toast.show({
                                message: '登录成功',
                                duration: 1500
                            });
                            setTimeout(() => {
                                this.back();
                            }, 1000);
                        }else{
                            this.axios.post('//platform-api.beeplaying.com/wap/api/oauth/wx/config', {
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
                })
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
                return this.axios.post('//uic-api.beeplaying.com/uic/api/user/login/sendSmsCode', {
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
	.entry {
		font-size: 0.3rem;
	}
</style>

