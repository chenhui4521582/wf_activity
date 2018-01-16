<template>
    <div id="app">
    </div>
</template>

<script>
    import utils from '../../common/js/utils.js'
    import AppCall from '../../common/js/AppCall.js';
    import API from '../../api';
    import * as cookie from 'js-cookie';
    export default {
        name: 'app',
        mounted(){
//        竞猜游戏loading登录页跳转规则：
//假设loading页地址为：https://wap.beeplay123.com/loading
//
//            1、链接为:https://wap.beeplay123.com/loading?type=home&channel=xxxxx&token=yyyyy，
//            对应跳转：https://databiger-h5.beeplay123.com/game/#/quizzes/hot?token=yyyyy&channel=xxxxx
//
//            2、链接为:https://wap.beeplay123.com/loading?type=match&channel=xxxxx&mid=zzzzz&token=yyyyy，
//            对应跳转：https://databiger-h5.beeplay123.com/football/#/guess/winFlatLoss?lotteryID=90&mid=zzzzz&isShowJingCai=1&token=yyyyy&channel=xxxxx
//
//            3、链接为:https://wap.beeplay123.com/loading?type=record&channel=xxxxx&token=yyyyy，
//            对应跳转：https://databiger-h5.beeplay123.com/game/#/betrecord?token=yyyyy&channel=xxxxx
//
//            4、链接为:https://wap.beeplay123.com/loading?type=recharge&channel=xxxxx&token=yyyyy，
//            对应跳转：https://wap.beeplay123.com/payment/#/shopping?channel=xxxxx&token=yyyyy
            let syBg = document.getElementById('app');

            if(localStorage.getItem('showLoadPage') != ''){
                localStorage.removeItem('showLoadPage')
                //setTimeout(() => {
                //syBg.style.display = 'none';
                //}, 1000)
            }else{
                //setTimeout(() => {
                //syBg.style.display = 'none';
                //}, 1000)
            }
            var urlObj = utils.getUrlParamObj();
            var that=this;
            var jumped = cookie.get('HASJUMPED');
            if (urlObj.channel) {
                AppCall.getAppData(function (params) {
                    if(params.islogin && !jumped){
                        that.qiukuAccessToken(params, urlObj);
                    }else{
                        AppCall.gameLogin();
                    }
                })
            }
        },
        methods: {
            qiukuAccessToken(cParams, urlObj){
                this.axios.post(API.UserLogin, {
                    token: cParams.token,
                    userID: cParams.UserID,
                    userType: cParams.usertype,
                    appVersion: cParams.appVersion,
                    platformCode: cParams.platformCode
                }).then(res => {
                    if (res.data.code == 200) {
                        this.axios.post(API.UserAccessToken, {
                            token: res.data.data,
                            type: 1
                        }).then((response) => {
                            if (response.data.code == 200) {
                                let accessToken = response.data.data && response.data.data.accessToken;
                                cookie.set('HASJUMPED', 1);
                                window.location.replace(this.getUrl(urlObj, accessToken));
                            }
                        });
                    }
                })
            },
            getUrl(urlObj, token) {//球酷要求的跳转地址
                if (urlObj.type == 'home') {
                    return `https://databiger-h5.beeplay123.com/game/#/quizzes/hot?token=${token}&channel=${urlObj.channel}`;
                }
                if (urlObj.type == 'match') {
                    return `https://databiger-h5.beeplay123.com/football/#/guess/winFlatLoss?lotteryID=90&mid=${urlObj.mid}&isShowJingCai=1&token=${token}&channel=${urlObj.channel}`
                }
                if (urlObj.type == 'record') {
                    return `https://databiger-h5.beeplay123.com/game/#/betrecord?token=${token}&channel=${urlObj.channel}`;
                }
                if (urlObj.type == 'recharge') {
                    return `https://wap.beeplay123.com/payment/#/shopping?token=${token}&channel=${urlObj.channel}`
                }
            }
        }
    }
</script>

<style lang="less" scoped>
    @import '../../common/css/base.css';

    #app {
        width: 100%;
        height: 100%;
        position: fixed;
        left: 0;
        top: 0;
        z-index: 100;
        background:url('./images/sy-bg.jpg') no-repeat;
        background-size: 100% 100%;
    }
</style>
