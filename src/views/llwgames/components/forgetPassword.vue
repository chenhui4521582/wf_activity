<template>
    <div class="forget-password">
        <headers text="重置密码"  linkHref="#/"></headers>
        <div class="r-phone">
            <div class="r-box">
                <div class="r-left">
                    +86
                </div>
                <div class="r-right">
                    <input type="text" placeholder="手机号" ref="rPhoneNumber" />
                </div>
            </div>
        </div>
        <input-text  :iVerification="true" :line="false" iName="验证码" iText="" iPlaceholder="请输入验证码"  @getCode="getCode" ref="dVerificationCode" @getVal="getVcode" :isShowVerification = "true"></input-text>
        <div class="f-space"></div>
        <input-text iName="新密码" iText="" iPlaceholder="长度为6-16个字符（不能包含空格）"  @getVal="getNewCode"  type="password"></input-text>
        <input-text :line="false" iName="确认密码" iText="" iPlaceholder="请重复新密码" @getVal="getOldVcode" type="password"></input-text>
        <a href="javascript:" class="btn-register" @click="submit">提交</a>
        <div class="statement2" v-if=" channel == '700003' "><div class="statement1">苏ICP备17060724号-1</div>@2017苏州玩蜂软件科技有限公司</div>
		<div class="statement2" v-if="host=='beeplay123'"><div class="statement1">苏ICP备17060724号-3<br/><a target="_blank" href="http://www.beian.miit.gov.cn/">增值电信业务经营许可证：苏B2-20190263</a><br/><a target="_blank" href="http://www.beian.miit.gov.cn/">苏网文 (2019) 1414-046号</a></div>©2017-2018 玩蜂科技（苏州）科技有限公司</div>        
		<div class="statement2" v-else><div class="statement1">蜀ICP备17017217号-1</div>@2018成都 六六五网络科技有限公司</div>
    </div>
</template>
<script type="text/javascript">
	import inputText from './inputText';
	import headers from './header';
	import utils from '../../../common/js/utils';
	export default {
		data() {
			return {
				vAccount: '',
				popBtn: "确定",
				showPop:false,
				vNewCode: '',
				vCode: '',
				oldCode: '',
				popContent: '',
				channel: localStorage.getItem('APP_CHANNEL'),
			}
		},
		mounted() {
//			Vue.http.headers.common['Authorization'] = localStorage.getItem('ACCESS_TOKEN') ? localStorage.getItem('ACCESS_TOKEN') :'';
//			Vue.http.headers.common['App-Channel'] = localStorage.getItem('APP_CHANNEL') ? localStorage.getItem('APP_CHANNEL'):'';
//
//			Vue.http.headers.common['App-Version'] = localStorage.getItem('APP_VERSION') ? localStorage.getItem('APP_VERSION'):'';
		},
		components: {
			headers,
			inputText,
		},
		computed: {
			host(){
                return utils.getUrlParamObj('host')
            }
		},
		methods: {
			submit() {
				var that = this;
				this.vAccount = this.$refs.rPhoneNumber.value;
				let vAccount = utils.checkValidate('phone',this.vAccount);
				let vNewCode = utils.checkValidate('pswd',this.vNewCode);
				let oldCode = utils.checkValidate('pswd',this.oldCode);
				if(this.vAccount == ''){
	                this.$toast.show({
						message: '请输入您的手机号！',
						duration: 1500
					});
	                return;
	            }else if(vAccount != '') {
	                this.$toast.show({
						message: '手机号格式不正确！',
						duration: 1500
					});
	                return;
	            }

	            if(this.vCode == '') {
					this.$toast.show({
						message: '请输入验证码',
						duration: 1500
					});
					return;
				}
				if(this.vNewCode == ''){
	                this.$toast.show({
						message: '请输入新密码',
						duration: 1500
					});
	                return;
	            }else if(vNewCode != ''){
	                this.$toast.show({
						message: '新密码格式不正确',
						duration: 1500
					});
	                return;
	            }

	            if(this.oldCode == ''){
	                this.$toast.show({
						message: '请重复新密码',
						duration: 1500
					});
	                return;
	            }else if(this.oldCode != this.vNewCode){
	                this.$toast.show({
						message: '两次密码输入不一致',
						duration: 1500
					});
	                return;
	            }

	            this.axios.post('//uic-api.beeplaying.com/uic/api/user/password/newPassword',{
	                "newPassword": this.vNewCode,
	                "smsCode": this.vCode,
	                "username": this.vAccount
	            }).then((response) => {
	            	if(response.data.code == 200) {
                        this.$toast.show({
							message: '密码重置成功！',
							duration: 1500
						});
						setTimeout(() => {
						  localStorage.setItem('ACCESS_TOKEN', '');
						  that.$router.replace('/');
						}, 2000);
	            	}else {
	            		this.$toast.show({
							message: response.data.message,
							duration: 1500
						});
	            	}
	            })

			},
			getCode() {
				this.vAccount = this.$refs.rPhoneNumber.value;
				let vAccount = utils.checkValidate('phone',this.vAccount);
				if(this.vAccount == ''){
	                this.$toast.show({
						message: '请输入您的手机号！',
						duration: 1500
					});
	                return;
	            }else if(vAccount != '') {
	                this.$toast.show({
						message: '手机号格式不正确！',
						duration: 1500
					});
	                return;
	            }

				this.axios.post('//uic-api.beeplaying.com/uic/api/user/password/sendForgetCode',{
	                username: this.vAccount
	            }).then((response) => {
	            	if(response.data.code == 200) {
						// 倒计时
	            		this.$refs.dVerificationCode.countDown();
	            	}else {
	            		this.$toast.show({
							message: response.data.message,
							duration: 1500
						});
	            	}
	            })
			},
			getNewCode(val) {
				this.vNewCode = val;
			},
			getVcode(val) {
				this.vCode = val;
			},
			getOldVcode(val) {
				this.oldCode = val;
			},
		}
	}
</script>
<style lang="less" scoped>
    .btn-register {
        display: block;
        width: 6.3rem;
        height: .9rem;
        line-height: .9rem;
        text-align: center;
        font-size: .32rem;
        color: #fff;
        border-radius: .45rem;
        margin: 0.8/2rem auto 0;
        background: #3269e4;
    }
    .f-space {
        height: 0.64/2rem;
    }
    .forget-password {
        width: 100%;
        height: 100%;
        position: fixed;
        left: 0;
        top: 0;
        &.list-fade-enter-active, &.list-fade-leave-active {
            transition: all 0.3s;
        }
        &.list-fade-enter, &.list-fade-leave-to {
            opacity: 0;
            transform: translate3d(0, 100%, 0);
        }
    }
    .r-phone {
        /*background: #193b73;*/
        margin-left: 1.2/2rem;
        width: 6.3rem;
        background: #fff;
        border: 1px solid #bdbdbd;
        border-radius: .45rem;
        height: 0.9rem;
        box-sizing: border-box;
        padding-left: .1rem;
        margin-bottom: .5rem;
    }
    .phone-tip {
        width: 0.48/2rem;
        height: 0.68/2rem;
        margin-right: 0.24/2rem;
    }
    .r-box {
        height: 1.9/2rem;
        display: flex;
        margin-bottom: 0.64/2rem;
        position: relative;
        .r-left {
            flex: 0 0 3.1/2rem;
            display: flex;
            align-items: center;
            font-size: .6/2rem;
            color: #000;
            &:after {
                content: '';
                width: 0.04/2rem;
                height: 0.66/2rem;
                background: #2b5bb3;
                position: absolute;
                left: 2.4/2rem;
                top: 50%;
                transform: translateY(-50%);
            };
        }
        .r-right {
            flex: 1;
            input {
                width: 90%;
                /*height: 1.9/2rem;*/
                /*background: #193b73;*/
                font-size: .6/2rem;
                color: #000;
                padding-top: .65/2rem;
            }
        }
    }
    .statement2 {
        width: 100%;
        position: fixed;
        bottom: 1rem;
        left: 0 !important;
        height: 2/2rem;
        font-size: .4/2rem;
        font-family: PingFangSC-Regular;
        color: #666;
        text-align: center;
		transform: translateX(0%) !important;
		line-height: 0.3rem;
    }
    .group-input{
        padding-left: .6rem;
    }
</style>
