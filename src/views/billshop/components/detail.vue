<template>
	<div class="detail" v-if="cAward">
		<div class="detail-container">
			<headers title="奖品兑换" v-if="!getChannel"></headers>
			<div class="award-container">
				<div class="pic-box">
					<img :src="cAward.picture | filter">
				</div>
				<h4 class="d-title">{{cAward.name}}</h4>
				<div class="d-text">{{cAward.purchasePrice}}元话费券<a href="javascript:" class="d-original" v-if="cAward.marketPrice!=null">原价:{{cAward.marketPrice}}元</a></div>
			</div>
			<div class="xp-text">
				<h4>商品详情</h4>
				<p v-html="cAward.description"></p>
			</div>
			<!-- 兑换弹窗 -->
			<div class="result-container" v-if="isFragmentStatus">
        <template v-if="exchangeStatus == 1">
          <img src="../images/aperture.png" class="aperture">
          <div class="result-pop">
            <div v-show="exchangeStatus == 1">
              <img src="../images/pop-suc.png" class="p-status pop-suc">
              <div class="pic-box"><img :src="cAward.picture | filter"></div>
              <h4 class="r-title">{{cAward.name}}</h4>
              <p class="r-text">可到我的页面中查看</p>
              <a href="javascript:" class="btn-confirm" @click="checkprize(cAward)">查看奖品</a>
            </div>
            <div class="btn-close" @click="closePop"></div>
				  </div>
        </template>
        <common-pop title="" @close="closePop" :isShowBtn="false" v-else>
          <div class="common-pop-text" style="position: absolute;top:0;bottom: 0;left:0;right:0;margin: auto;font-size: .28rem;display: flex; flex-direction: column; justify-content: space-between; align-items: center;padding-bottom: .6rem;box-sizing: border-box">
            <template v-if="exchangeStatus == 4">
            很遗憾，该商品补货中
            <img src="../images/buhuo.png" alt="" style="width: 2.3rem;height: 1.6rem">
            <div class="btn" style="width: 1.8rem; height: .6rem !important; line-height: .6rem; background: #EE6F0B; border-radius: .08rem; font-size: .28rem; font-weight: bold;" @click="closePop">确定</div>
            </template>
            <template v-if="exchangeStatus == 3">
            今天已经兑换过，请明天再来~
            <img src="../images/yiduihuan.png" alt="" style="width: 1.67rem;height: 1.72rem">
            <div class="btn" style="width: 1.8rem; height: .6rem !important; line-height: .6rem; background: #EE6F0B; border-radius: .08rem; font-size: .28rem; font-weight: bold;" @click="closePop">确定</div>
            </template>
            <template v-if="exchangeStatus == 2">
              很遗憾，您的话费券不足
              <img src="../images/kong.png" alt="" style="width: 2.89rem;height: 1.86rem">
              <div class="btn" style="width: 1.8rem; height: .6rem !important; line-height: .6rem; background: #EE6F0B; border-radius: .08rem; font-size: .28rem; font-weight: bold;" @click="goTaskPage">补充话费券</div>
              <div style="font-size:.26rem;font-weight:400; text-decoration:underline; color:rgba(135,146,165,1);" @click="goMallIndex">去看看其他商品</div>
            </template>
          </div>
        </common-pop>
			</div>
		</div>
		<div class="btn-box" :class="{unexchange:isFragmentStatus}">
			<a href="javascript:" class="btn-submit" @click="goExchange">马上兑换</a>
		</div>
	</div>
</template>
<script type="text/javascript">
	import Headers from './Header'
	export default {
		data() {
			return {
				cAward: null,
				isFragmentStatus: false,
				exchangeStatus: 0,
        curChannel: localStorage.getItem('APP_CHANNEL')
			}
		},
		components: {
		  Headers,
      commonPop:()=>import("./commonPop"),
		},
		beforeMount() {
		},
		mounted() {
			this.$nextTick(() => {
				this.cAward = JSON.parse(decodeURIComponent(this.getUrlParam('parmas')))
			})
		},
    computed: {
      getChannel() {
        return this.curChannel == '100047001' || this.curChannel == '100048001'
      }
    },
		methods: {
			goMallIndex() {
				history.go(-1)
			},
			goTaskPage() {
				switch(this.getUrlParam('from')) {
			        case 'bdWap':
			          parent.location.href = `https://wap.beeplay123.com/bdWap/?channel=${localStorage.getItem('APP_CHANNEL')}#/taskview`
			          break;
			        case 'jsWap':
			          parent.location.href = `https://wap.beeplay123.com/bdWap/?channel=${localStorage.getItem('APP_CHANNEL')}#/taskview`
			          break;
              case 'miniWap':
                parent.location.href = `https://wap.beeplay123.com/miniWap/?channel=${localStorage.getItem('APP_CHANNEL')}#/taskview`
                break;
			        default:
			          parent.location.href = `https://wap.beeplay123.com/wap/home/?channel=${localStorage.getItem('APP_CHANNEL')}#/taskview`
			    }
			},
			close() {
				this.isFragmentStatus = false
				switch(this.getUrlParam('from')) {
			        case 'bdWap':
			          parent.location.href = 'https://wap.beeplay123.com/bdWap/#/personal?openMyWard=1'
			          break;
			        case 'jsWap':
			          parent.location.href = 'https://wap.beeplay123.com/bdWap/#/personal?openMyWard=1'
			          break;
              case 'miniWap':
                parent.location.href = 'https://wap.beeplay123.com/miniWap/#/personal?openMyWard=1'
                break;
			        default:
			          parent.location.href = 'https://wap.beeplay123.com/wap/home/#/personal?openMyWard=1'
			    }
			},
			//获取地址栏问号后面的参数值
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
		        let params = Request[ename] ? Request[ename].split('#')[0] : ''
		        return params;
		    },
		    goExchange() {
		    	this.axios.post('//ops-api.beeplay123.com/ops/api/exchangeMall/placeOrder', {
		    		productId: this.cAward.id
		    	})
		        .then(res => {
              // 101：其他
              // 102：账户余额不足
              // 103：今日已购买
              // 104：库存不足
              if(res.data.code == 200) {
		            this.exchangeStatus = 1
                this.isFragmentStatus = true
		          }else if(res.data.code ==102){
		          	this.exchangeStatus = 2
                this.isFragmentStatus = true
		          }else if(res.data.code ==103){
                this.exchangeStatus = 3
                this.isFragmentStatus = true
              }else if(res.data.code ==104){
                this.exchangeStatus = 4
                this.isFragmentStatus = true
              }else{
                this.exchangeStatus =0
                this.isFragmentStatus = false
                if(res.data.code !=105){
                  this.$toast.show({
                    message: res.data.message,
                    duration: 1500,
                    isShowMask:true
                  });
                }
              }
		        })
		    },
        closePop(){
          this.isFragmentStatus=false;
          this.exchangeStatus=0;
        },
        checkprize(item){
          this.isFragmentStatus = false
          if(item.phyAwardsType&&[1,26,32].includes(item.phyAwardsType)){
            switch(this.getUrlParam('from')) {
              case 'bdWap':
                parent.location.href = 'https://wap.beeplay123.com/bdWap/#/personal'
                break;
              case 'jsWap':
                parent.location.href = 'https://wap.beeplay123.com/jsWap/#/personal'
                break;
              case 'miniWap':
                parent.location.href = 'https://wap.beeplay123.com/miniWap/#/personal'
                break;
              default:
                parent.location.href = 'https://wap.beeplay123.com/wap/home/#/personal'
            }
          }else{
            switch(this.getUrlParam('from')) {
              case 'bdWap':
                parent.location.href = 'https://wap.beeplay123.com/bdWap/#/personal?openMyWard=1'
                break;
              case 'jsWap':
                parent.location.href = 'https://wap.beeplay123.com/jsWap/#/personal?openMyWard=1'
                break;
              case 'miniWap':
                parent.location.href = 'https://wap.beeplay123.com/miniWap/#/personal?openMyWard=1'
                break;
              default:
                parent.location.href = 'https://wap.beeplay123.com/wap/home/#/personal?openMyWard=1'
            }
          }
        }
		}
	}
</script>
<style lang="less" scoped>
	a {
		text-decoration: none;
	}
	.detail { 
		width: 100%;
		position: absolute;
		left: 0;
		top: 0;
		bottom: 1rem;
		overflow-y: scroll;
		.detail-container {
			padding: 0 0.3rem;	
		}
		.d-title {
			font-size: 0.36rem;
			font-weight: bold;
			color: #fff;
		}
		.award-container{
        	height: 4.43rem;
        	background: url(../images/award-bg.png) no-repeat center top;
        	background-size: 100% 100%;
        	margin: 0.27rem auto 0.34rem;
        	.pic-box {
        		width:3.05rem;
				height:3.05rem;
				margin: 0 auto;
				display: flex;
				align-items: center;
				justify-content: center;
				img {
					max-width: 100%;
					max-height: 80%;
				}
        	}
        	.d-text {
        		font-size: 0.32rem;
        		color: #EE6F0B;
        		font-weight: 500;
        		padding-top: 0.28rem;
        		display: flex;
        		align-items: center;
        		justify-content: center;
        		.d-original {
        			display: inline-block;
        			/*width: 1.33rem;*/
        			padding: 0 0.1rem;
        			height: 0.32rem;
        			line-height: 0.32rem;
        			background: #EE6F0B;
        			border-radius:0.16rem 0 0.16rem 0;
        			font-size: 0.24rem;
        			color: #0F1726;
        			text-align: center;
        			margin-left: 0.09rem;
        			text-decoration: line-through;
        		}
        	}
        }
        .xp-text {
        	text-align: left;
        	color: #fff;
        	background: #141F33;
        	padding: 0.29rem 0.3rem 0.8rem;
        	margin-bottom: 0.9rem;
        	h4 {
        		font-size: 0.32rem;
        		margin-bottom: 0.2rem;
        	}
        	p {
        		font-size: 0.24rem;
        		line-height: 0.32rem;
        	}
        }
        .btn-box {
          /*width: 100%;
          height:0.9rem;
          position: fixed;
          left: 0;
          bottom: 0.28rem;*/
          width: 100%;
          height:1.43rem;
          background:rgba(24,39,67,1);
          position: fixed;
          left: 0;
          bottom: 0;
          z-index: 10;
          &.unexchange{
            z-index: 4;
          }
        }
        .btn-submit {
          display: block;
          font-size: 0.28rem;
          font-weight: bold;
          display: block;
          width:91.67%;
          height:0.9rem;
          line-height:0.9rem;
          background:rgba(238,111,11,1);
          border-radius:0.08rem;
          margin: 0.26rem auto 0;
          text-align: center;
          color: #fff;
        }
        .result-container {
        	width: 100%;
        	height: 100%;
        	background: rgba(0,0,0,0.6);
        	position: fixed;
        	left: 0;
        	top: 0;
        	z-index: 5;
        	font-size: 0.26rem;
        	.pic-box {
        		width: 1.48rem;
        		height: 1.48rem;
        		background: #FFD66D;
        		border:0.02rem solid rgba(255,255,255,1);
            border-radius:0.12rem;
            margin: 0 auto 0.16rem;
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            img {
              max-width: 100%;
              max-height: 80%;
            }
        	}
        	.pop-suc {
        		width: 2.25rem;
        		height: 0.66rem;
        		margin: 0.4rem auto 0.42rem;
        	}
        	.pop-err {
        		width: 2.64rem;
        		height: 0.67rem;
        		margin: 0.4rem auto 0.43rem;
        	}
        }
        .result-pop {
        	width: 4.8rem;
        	height: 5.3rem;
        	background: url(../images/result-pop.png) no-repeat center top;
        	background-size: 100% 100%;
        	position: fixed;
        	left: 50%;
        	top: 50%;
        	margin-left: -2.4rem;
        	margin-top: -2.65rem;
        	z-index: 6;
        	.r-title {
        		font-size: 0.28rem;
        		color: #fff;
        		font-weight: bold;
        	}
        	.r-text {
        		font-size: 0.24rem;
        		color:rgba(255,255,255,0.5);
        		padding: 0.27rem 0 0.36rem 0;
        	}
        	.btn-confirm {
        		display: block;
        		width:2.4rem;
            height:0.62rem;
            line-height:0.62rem;
            background:rgba(255,207,82,1);
            border-radius:0.12rem;
            font-size: 0.26rem;
            font-weight: bold;
            color: #A34C00;
            text-align: center;
            margin: 0 auto;
            &.btn-jump {
              background:#FFFFFF;
              color: #A34C00;
              margin: 0.4rem auto 0.28rem;
            }
        	}
          .btn-close{
            position:absolute;
            top:.1rem;
            right:.1rem;
            width: .44rem;
            height: .44rem;
            background: url(../images/btn-close.png);
            background-size: 100% 100%;
          }
        }
        .aperture {
        	width: 100%;
        	position: fixed;
        	left: 0;
        	top: 50%;
        	margin-top: -55%;
        	z-index: 5;
        }
	}

</style>
